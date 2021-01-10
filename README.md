<h1 align="center">gatsby-course-starter</h1> <br>

<p align="center">
  A Gatsby starter to get you started creating educational materials using Markdown
</p>

## Get Started

1. `npm install --global gatsby-cli` - make sure you're on Gatsby v2+
   - See [docs here](https://next.gatsbyjs.org/docs/) if you need help
1. `gatsby new course-website https://github.com/btholt/gatsby-course-starter`
1. `cd course-website`
1. `npm run dev`
1. Open http://localhost:8000 in your browser

## Lessons

The crux of this site is are the lessons. Provided are two examples. Each lesson needs a [frontmattter](https://github.com/gatsbyjs/gatsby/blob/master/docs/docs/adding-markdown-pages.md#note-on-creating-markdown-files) `path`, `order`, and `title`. Generally you should make the `path` and the file name match for ease of finding it.

- `path` - needs a leading slash. This will be slug of the lesson
- `title` - will be the title displayed on the Table of Contents and on the page itself
- `order` - the order of which the item should appear in the table of contents. should in `<number><capital letter>` format where the number corresponds to the section it's and the letter corresponds to the order of the lesson inside the section, e.g. `3B`
- `section` - the title of the section that the article is in. Only the first lesson for each section will be used.
- `description` – a one-to-three sentence summary of the lesson. used for the meta tag for social shares and SEO. if no description is given, the `siteMetadata.description` for the site is used

## Config

Inside of `gatsby-config.js` be sure to fill out the `siteMetadata` fields, including `title`, `subtitle`, `description`, and `keywords`.

## GitHub Pages

If you do want to deploy to GitHub pages, make sure you add the name of the repo to the `pathPrefix` property in `gatsby-config.js` so that it will correctly make all the links.

## GitHub Actions

This site is ready to deployed to GitHub Pages out of the box with GitHub Actions. If you do not want to deploy this to GitHub Pages, delete the `.github` directory.

If you do want to deploy this to GitHub Pages with GitHub Actions, you need to do a few things.

1. Create a [personal access token](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line) with rights to read and write to repos.
1. Put that token in your repos secrets. Click the Settings tab and paste your access token in the Secrets tab with the key `ACCESS_TOKEN`.
1. Now once you commit your code, it should automatically deploy your GitHub Pages site should deploy automatically!

## Example Sites

- [This repo itself](https://btholt.github.io/gatsby-course-starter/)
- [Complete Intro to Containers](https://btholt.github.io/complete-intro-to-containers/)
- [Complete Intro to React v5](https://btholt.github.io/complete-intro-to-react-v5/)
- [Complete Intro to Web Dev v2](https://btholt.github.io/intro-to-web-dev-v2/)
- [Four Semesters of Computer Science in Five Hours Part II](https://btholt.github.io/four-semesters-of-cs-part-two/)

## CSV

If you run `npm run csv`, a CSV will be generated with all the various lessons' frontmatter outputted to `public/lessons.csv`. You can change the path by changing the `OUTPUT_CSV_PATH` environment variable.

Another CSV will be output to `public/links.csv` where it pull all the links out of each lesson and put them into a CSV. This path can be modified by setting the `LINKS_CSV_PATH` environment variable.

## License

The **code** is this repo is licensed under the Apache 2.0 license.

I include the CC-BY-NC-4.0 license for the content; this is what I recommend you license your **content** under: anyone can use and share the content but they cannot sell it; only you can.
