var fs = require("fs");
var path = require('path');
var Handlebars = require("handlebars");
var utils = require('handlebars-utils');
var marked = require('marked').marked;
var moment = require('moment');

Handlebars.registerHelper('markdown', function (str, locals, options) {
    if (typeof str !== 'string') {
        options = locals;
        locals = str;
        str = true;
    }

    if (utils.isOptions(locals)) {
        options = locals;
        locals = {};
    }

    var ctx = utils.context(this, locals, options);
    var val = utils.value(str, ctx, options);

    // Convert wonky string-objects to actual strings
    if (val === '[object Object]' && typeof ctx === 'object') {
        const values = Object.values(ctx);

        // Only do the conversion if every value of the object is a string.
        if (values.every(v => typeof v === 'string')) {
            val = Object.values(ctx).join('');
        }
    }

    var markup = marked(val);

    markup = markup.replace(/\*\[([^\]]+)\](:|\()([\s\w]+)\)?/, (_a, abbrev, _b, description) => {
        return `<abbr title="${description}">${abbrev}</abbr>`;
    });

    // If we end up with a string wrapped in one <p> block, remove it so we don't create a new text block
    var startEndMatch = markup.match(/^<p>(.*)<\/p>\n$/);
    return startEndMatch && startEndMatch[1].indexOf("<p>") === -1 ?
        startEndMatch[1] :
        markup;
});

Handlebars.registerHelper('paragraphs', function (str) {
    return str.split('\n').filter(p => p.trim().length > 0);
});

Handlebars.registerHelper('displayUrl', function (str) {
    return str.replace(/https?:\/\//, "");
});

Handlebars.registerHelper('toLowerCase', function (str) {
    return str.toLowerCase();
});

Handlebars.registerHelper('date', function (str) {
    if (str) {
        var m = moment(str);
        return m.format("MMM YYYY");
    } else {
        return "Present"
    }
});

Handlebars.registerHelper('isodate', function (str) {
    return moment(str).format('YYYY-MM-DD');
});

Handlebars.registerHelper('now', function (context) {
    return moment(new Date()).format(context);
});

Handlebars.registerHelper('award', function (str) {
    switch (str.toLowerCase()) {
        case "bachelor":
        case "master":
            return str + "s";
        default:
            return str;
    }
});

Handlebars.registerHelper('skillLevel', function (str) {
    switch (str.toLowerCase()) {
        case "beginner":
            return "25";
        case "intermediate":
            return "50";
        case "advanced":
            return "75";
        case "master":
            return "100";
        default:
            return parseInt(str, 10)
    }
});

Handlebars.registerHelper('hostname', function(str) {
    if (!str) {
        return '';
    }

    var url = new URL(str);
    var hostname = url.hostname;
    if (hostname.startsWith('www.')) {
        hostname = hostname.substring(4);
    }

    return hostname;
});

// Resume.json used to have website property in some entries.  This has been renamed to url.
// However the demo data still uses the website property so we will also support the "wrong" property name.
// Fix the resume object to use url property
function fixResume(resume) {
    if (resume.basics.website) {
        resume.basics.url = resume.basics.website;
        delete resume.basics.website
    }

    fixEntries(resume.work);
    fixEntries(resume.volunteer);
    fixEntries(resume.publications);
    fixEntries(resume.projects);

    resume.work = sort(resume.work, false, w => w.startDate);
    resume.volunteer = sort(resume.volunteer, false, v => v.startDate);
    resume.publications = sort(resume.publications, false, p => p.releaseDate);
    resume.projects = sort(resume.projects, false, p => p.startDate);
}

function fixEntries(entries) {
    if (entries) {
        for (var i = 0; i < entries.length; i++) {
            var entry = entries[i];

            for (var key in entry) {
                const value = entry[key];
                if (typeof value !== 'string') {
                    continue;
                }

                entry[key] = value.replace('™️', '<sup>&trade;</sup>');
            }

            if (entry.website) {
                entry.url = entry.website;
                delete entry.website;
            }

            if (entry.company) {
                entry.name = entry.company;
                delete entry.company;
            }
        }
    }
}

function sort(array, ascending, field) {
    return array.sort((a, b) => {
        af = field(a);
        bf = field(b);

        if (af < bf) {
            return ascending ? -1 : 1;
        }

        if (af > bf) {
            return ascending ? 1 : -1;
        }

        return 0;
    });
}

function render(resume) {
    var css = fs.readFileSync(__dirname + "/Kards10/css/styles.css", "utf-8");
    var mainJs = fs.readFileSync(__dirname + "/Kards10/js/main.js", "utf-8");
    var pluginsJs = fs.readFileSync(__dirname + "/Kards10/js/plugins.js", "utf-8");
    var tpl = fs.readFileSync(__dirname + "/Kards10/views/resume.hbs", "utf-8");

    fixResume(resume);

    var partialsDir = path.join(__dirname, 'Kards10/views/partials');
    var filenames = fs.readdirSync(partialsDir);

    filenames.forEach(function (filename) {
        var matches = /^([^.]+).hbs$/.exec(filename);
        if (!matches) {
            return;
        }
        var name = matches[1];
        var filepath = path.join(partialsDir, filename);
        var template = fs.readFileSync(filepath, 'utf8');

        Handlebars.registerPartial(name, template);
    });

    const packageJSON = require("./package");

    return Handlebars.compile(tpl)({
        css: css,
        mainJs: mainJs,
        pluginsJs: pluginsJs,
        resume: resume,
        meta: {
            packageName: packageJSON.name,
            version: packageJSON.version
        }
    });
}

module.exports = {
    render: render,
    pdfRenderOptions: {
        format: 'A4',
        mediaType: 'print',
        pdfViewport: { width: 1920, height: 1280 },
        margin: {
            top: '1cm',
            bottom: '1cm',
            left: '1cm',
            right: '1cm',
        },
    },
};
