# website

[@josephearl](https://github.com/josephearl)’s website <https://www.josephearl.co.uk>.

Built using [Astro](https://astro.build) and served with [Netlify](https://www.netlify.com).

## How it works

Content is stored as plain old Markdown in the `src/content` directory.

Static HTML is generated from the content using [Astro](https://astro.build) and saved into the `dist` directory.

[Netlify](https://www.netlify.com) detects changes to the Git repository and continually builds and deploys the site, as well as managing SSL certificates with Lets Encrypt.

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3000`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run format`          | Format your code                                 |
| `npm run check`           | Check your code for errors                       |
| `npm run a11y`            | Run accessibility tests against the local server |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
