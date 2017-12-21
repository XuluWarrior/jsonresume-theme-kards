var fs = require("fs");
var path = require('path');
var Handlebars = require("handlebars");
var markdown = require('helper-markdown');
var moment = require('moment');

Handlebars.registerHelper('markdown', function() {
	var markup = markdown().apply(this, arguments);

	// If we end up with a string wrapped in one <p> block, remove it so we don't create a new text block
	var startEndMatch = markup.match(/^<p>(.*)<\/p>\n$/);
	return startEndMatch && startEndMatch[1].indexOf("<p>") === -1 ?
		startEndMatch[1] :
		markup;
});

Handlebars.registerHelper('displayUrl', function(str) {
	return str.replace(/https?:\/\//, "");
});

Handlebars.registerHelper('toLowerCase', function(str) {
	return str.toLowerCase();
});

Handlebars.registerHelper('date', function(str) {
	if (str) {
		var m = moment(str);
		return m.format("MMM YYYY");
	} else {
		return "Present"
	}
});

Handlebars.registerHelper('award', function(str) {
	switch (str.toLowerCase()) {
		case "bachelor":
		case "master":
			return str + "s";
		default:
			return str;
	}
});

Handlebars.registerHelper('skillLevel', function(str) {
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
			return parseInt(str)
	}
});

// Resume.json used to have website property in some entries.  This has been renamed to url.
// However the demo data still uses the website property so we will also support the "wrong" property name.
// Fix the resume object to use url property
function fixResume(resume) {
	if (resume.basics.website) {
		resume.basics.url = resume.basics.website;
		delete resume.basics.website
	}
	fixAllEntries(resume.work);
	fixAllEntries(resume.volunteer);
	fixAllEntries(resume.publications);
	fixAllEntries(resume.projects);

	fixWork(resume.work);
}

function fixAllEntries(entries) {
	if (entries) {
		for (var i=0; i < entries.length; i++) {
			var entry = entries[i];
			if (entry.website) {
				entry.url = entry.website;
				delete entry.website;
			}
		}
	}
}

// work.company has been renamed as work.name in v1.0.0
function fixWork(work) {
	if (work) {
		for (var i=0; i < work.length; i++) {
			var entry = work[i];
			if (entry.company) {
				entry.name = entry.company;
				delete entry.website;
			}
		}

	}
}

function render(resume) {
	var css = fs.readFileSync(__dirname + "/Kards10/css/styles.css", "utf-8");
	var mainJs = fs.readFileSync(__dirname + "/Kards10/js/main.js", "utf-8");
	var pluginsJs = fs.readFileSync(__dirname + "/Kards10/js/plugins.js", "utf-8");
	var tpl = fs.readFileSync(__dirname + "/resume.hbs", "utf-8");

	fixResume(resume);

	//var partialsDir = path.join(__dirname, 'partials');
	//var filenames = fs.readdirSync(partialsDir);
    //
	//filenames.forEach(function (filename) {
	//  var matches = /^([^.]+).hbs$/.exec(filename);
	//  if (!matches) {
	//    return;
	//  }
	//  var name = matches[1];
	//  var filepath = path.join(partialsDir, filename);
	//  var template = fs.readFileSync(filepath, 'utf8');
    //
	//  Handlebars.registerPartial(name, template);
	//});

	return Handlebars.compile(tpl)({
		css: css,
		mainJs: mainJs,
		pluginsJs: pluginsJs,
		resume: resume
	});
}

module.exports = {
	render: render
};