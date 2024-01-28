# bvdget

A money tracking app to make it easy to keep a handle on your money habits.

## Developing

You will need the [LTS version of Node.js](https://nodejs.org) to run this project.

```bash
# install dependencies
npm install
```

Before running the project for the first time, you will need to set up some environment variables. Copy the contents of `.env.example` into a file called `.env`, and fill in the values based on the comments telling you where to find the secrets.

Now you should be able to start the development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production build:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Deploying

The production app is deployed to Netlify on every push to `main`. Deploy previews are deployed for all pull requests against `main`. The environment variables that you use for local development match the ones used for deploy previews, so that test data should be available both locally and in previews. The production environment is kept separate and those environment variables should only be used locally to fix production-specific issues.

## Linting & Testing

Every PR requires the `lint` and `test` scripts to succeed before merging.

```bash
# run the linters
npm run lint

# format files with prettier
npm run format

# run unit tests
npm run test
```

## Conventional Commits

This project uses [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/), and any PRs with non-conforming commit messages will need to be updated before merging to `main`.
