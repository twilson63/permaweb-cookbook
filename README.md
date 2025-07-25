# Permaweb Cookbook

The Permaweb Cookbook is designed to house concepts, guides, and small digestible code snippets
for someone that has no experience with blockchain or the Permaweb to be able to
learn from and build with.

## Contributing

The Cookbook is welcome to any and all contributions. Please refer to
the project's style when contributing new snippets of code.

### Structure

The main content for the cookbook is under the `/src` directory and split into
different sections.

#### Fundamentals

These are the core concepts which underpin Arweave and the Permaweb.

#### Guides

These are structured guides for building on the Permaweb, which assume
no prior knowledge of Arweave or AO.

#### Tooling

These are specific examples on how to use different tools to accomplish tasks on
the Permaweb, such as deployment, uploading data, etc. You can think of them as
smaller recipes compared to guides.

#### References

References contain definitions and documentation for the Permaweb.

### Building the Permaweb Cookbook

You need to have Node v16 installed. You can get the latest version at https://nodejs.org.

From the root directory, run:

```sh
yarn
yarn dev
```

which will install all relevant dependencies and start the local development server.

### Translation

Learn more about translating the cookbook [here](./languages/README.md).

### Audit

If you find a tool or guide out of date, please create an issue on the project board so that it can be removed or updated.

### Committing

We are using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
for this repository.

To choose a task or make your own, do the following:

1. [Add an issue](https://github.com/twilson63/permaweb-cookbook/issues/new) for the task and assign it to yourself or comment on the issue
2. Make a draft PR referencing the issue.

The general flow for making a contribution:

1. Fork the repo on GitHub
2. Clone the project to your own machine
3. Commit changes to your own branch
4. Push your work back up to your fork
5. Submit a Pull request so that we can review your changes

**NOTE**: Be sure to merge the latest from "upstream" before making a
pull request!

You can find tasks on the [project board](https://github.com/users/twilson63/projects/2)
or create an issue and assign it to yourself.

Happy Cooking!

### Deploy Instructions

```sh
touch wallet.json
# add wallet info
yarn deploy
```
