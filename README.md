# JSON Resume Golden Theme

[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/asbjornu/jsonresume-theme-golden)

This is a theme for [JSON Resume](http://jsonresume.org/) based on the [Kards design](https://www.styleshout.com/free-templates/kards/) by [styleshout](https://www.styleshout.com/), heavily modified to fit the needs of [asbjor.nu](https://asbjor.nu/).

|  |  |
| --- | --- |
| [![Example resume (intro)](https://asbjornu.github.io/jsonresume-theme-golden/resume-1.png)](https://asbjornu.github.io/jsonresume-theme-golden/resume.html) | [![Example resume (about)](https://asbjornu.github.io/jsonresume-theme-golden/resume-2.png)](https://asbjornu.github.io/jsonresume-theme-golden/resume.html#about) |
| [![Example resume (profile)](https://asbjornu.github.io/jsonresume-theme-golden/resume-3.png)](https://asbjornu.github.io/jsonresume-theme-golden/resume.html#about) | [![Example resume](https://asbjornu.github.io/jsonresume-theme-golden/resume-4.png)](https://asbjornu.github.io/jsonresume-theme-golden/resume.html#resume) |

## Getting started

### Serve theme

If you have JSON Resume and this theme installed locally, you can run the
following command to serve up a `resume.json` file:

```sh
resume serve --theme golden --resume <path/to/resume.json>
```

You should now see this message:

```sh
Preview: http://localhost:4000
Press ctrl-c to stop
```

The resume should open in a new tab in your default browser.

## Editing template

If you need to edit the template to suit your needs, you can do so by following
the below instructions.

### Get source from GitHub

```sh
git clone https://github.com/asbjornu/jsonresume-theme-golden.git
cd jsonresume-theme-golden
```

### Serve theme

```sh
npx resume serve --theme . --resume <path/to/resume.json>
```

This will use the local version of the theme to render the `resume.json` file.
If there is a local copy of resume.json this will be used.  Otherwise, it will
use the default resume.json from [jsonresume.org](https://jsonresume.org/).

### Change background images

In order for the generated html to be self contained this theme ships with the
background images embedded in the css. To change the images, edit the file
`Kards10/less/config.less`:

```sh
@bg-img-url: "data:image/...";
@intro-bg-img-url: "data:image/...";
@logo-img-url: "data:image/...";
```

Then rebuild:

```sh
npm run build
```

Then serve again:

```sh
npx resume serve --theme . --resume <path_to_resume.json>
```

## License and credits

The template design is available under [Creative Commons Attribution 3.0
License](http://creativecommons.org/licenses/by/3.0/) attributed to
[styleshout](https://www.styleshout.com/)

The source code for generating resume is available under [the MIT
license](http://mths.be/mit).

The background image is by [StockSnap](https://pixabay.com/users/stocksnap-894430/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2589504) from [Pixabay](https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2589504).
