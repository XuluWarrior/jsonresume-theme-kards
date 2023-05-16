# JSON Resume Golden Theme

[![This project is using Percy.io for visual regression
testing.][percy-badge]][percy-link]
[![Build status][build-badge]][build-link]

This is a theme for [JSON Resume][jsonresume] based on the [Kards design][kards]
by [styleshout], heavily modified to fit the needs of [asbjor.nu][asbjornu].

|                                         |                                      |
| --------------------------------------- | ------------------------------------ |
| [![Intro][intro-img]][intro-link]       | [![About][about-img]][about-link]    |
| [![Profile][profile-img]][profile-link] | [![Resume][resume-img]][resume-link] |

## Getting started

### Serve theme

If you have JSON Resume and this theme installed locally (through NPM or
similar), you can run the following command to serve up a `resume.json` file:

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

### Serve it up

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
License](cc) attributed to [styleshout].

The source code for generating resume is available under [the MIT
license][mit].

The background image is by [StockSnap] from [Pixabay].

[about-img]: https://asbjornu.github.io/jsonresume-theme-golden/resume-2.png
[about-link]: https://asbjornu.github.io/jsonresume-theme-golden/resume.html#about
[asbjornu]: https://asbjor.nu/
[build-badge]: https://github.com/asbjornu/jsonresume-theme-golden/actions/workflows/build.yml/badge.svg
[build-link]: https://github.com/asbjornu/jsonresume-theme-golden/actions/workflows/build.yml
[cc]: http://creativecommons.org/licenses/by/3.0/
[intro-img]: https://asbjornu.github.io/jsonresume-theme-golden/resume-1.png
[intro-link]: https://asbjornu.github.io/jsonresume-theme-golden/resume.html
[jsonresume]: http://jsonresume.org/
[kards]: https://www.styleshout.com/free-templates/kards/
[mit]: http://mths.be/mit
[percy-badge]: https://percy.io/static/images/percy-badge.svg
[percy-link]: https://percy.io/asbjornu/jsonresume-theme-golden
[pixabay]: https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2589504
[profile-img]: https://asbjornu.github.io/jsonresume-theme-golden/resume-3.png
[profile-link]: https://asbjornu.github.io/jsonresume-theme-golden/resume.html#about
[resume-img]: https://asbjornu.github.io/jsonresume-theme-golden/resume-4.png
[resume-link]: https://asbjornu.github.io/jsonresume-theme-golden/resume.html#resume
[stocksnap]: https://pixabay.com/users/stocksnap-894430/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2589504
[styleshout]: https://www.styleshout.com/
