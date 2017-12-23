# JSON Resume Kards Theme 

This is a theme for [JSON Resume](http://jsonresume.org/) based on [Kards design](https://www.styleshout.com/free-templates/kards/) by [styleshout](https://www.styleshout.com/).

|  |  |
| --- | --- |
| [![Example resume (intro)](https://xuluwarrior.github.io/jsonresume-theme-kards/resume-1.png)](https://xuluwarrior.github.io/jsonresume-theme-kards/resume.html) | [![Example resume (about)](https://xuluwarrior.github.io/jsonresume-theme-kards/resume-2.png)](https://xuluwarrior.github.io/jsonresume-theme-kards/resume.html#about) |
| [![Example resume (profile)](https://xuluwarrior.github.io/jsonresume-theme-kards/resume-3.png)](https://xuluwarrior.github.io/jsonresume-theme-kards/resume.html#about) | [![Example resume](https://xuluwarrior.github.io/jsonresume-theme-kards/resume-4.png)](https://xuluwarrior.github.io/jsonresume-theme-kards/resume.html#resume) |

## Getting started

### Install the command line

Install [resume-cli](https://github.com/jsonresume/resume-cli) to render your resume.

```
sudo npm install -g resume-cli
```

### Serve theme
```
resume serve --theme kards --resume <path_to_resume.json>
```

You should now see this message:

```
Preview: http://localhost:4000
Press ctrl-c to stop
```

The resume should open in a new tab in your default browser

## Editing template
### Get source from GitHub
```
git clone https://github.com/XuluWarrior/jsonresume-theme-kards.git
cd jsonresume-theme-orbit
```

### Serve theme
```
resume serve
```
This will use the local version of the theme to render the resume.json
If there is a local copy of resume.json this will be used.  Otherwise, it will use the default resume.json from [jsonresume.org](https://jsonresume.org/)

### Change background images
In order for the generated html to be self contained this theme ships with the background images embedded in the css.
To change the images, edit **Kards10/less/config.less**
```
@bg-img-url: "data:image/...";
@intro-bg-img-url: "data:image/...";
@logo-img-url: "data:image/...";
```
and then rebuild styles.css
```
npm run build:styles
```

### Extra sections
The original Kards design included extra sections such as [Portfolio](https://www.styleshout.com/templates/preview/Kards10/#portfolio) and [Services](https://www.styleshout.com/templates/preview/Kards10/index.html#services).  These don't map directly to jsonresume and so are commented out in the template.

To include them in your template, edit **resume.hbs** and uncomment the appropriate sections and personalise the content e.g.

```
<!--&lt;!&ndash; Portfolio Section-->
<!--================================================== &ndash;&gt;-->
<!--<section id="portfolio">-->

 ...

<!--</section> &lt;!&ndash; /portfolio &ndash;&gt;-->  
```
 
|  |  |
| --- | --- |
| [![Portfolio section](https://xuluwarrior.github.io/jsonresume-theme-kards/resume-portfolio.png)](https://www.styleshout.com/templates/preview/Kards10/#portfolio) | [![Services section](https://xuluwarrior.github.io/jsonresume-theme-kards/resume-services.png)](https://www.styleshout.com/templates/preview/Kards10/index.html#services) |

## License
Template design is available under [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/) attributed to [styleshout](https://www.styleshout.com/)

Source code for generating resume is available under [the MIT license](http://mths.be/mit).
