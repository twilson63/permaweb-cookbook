# Contributing to the Cookbook

👍🎉First off, thanks for taking the time to contribute🎉👍

The following is a set of guidelines on how to contribute

## What should I know before I get started?

### Permaweb Cookbook Layout

The cookbook is layed out in 5 different sections.

| Section         | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| Getting Started | Resources for starting development on Permaweb                    |
| Core Concepts   | Building blocks of Permaweb that are good to know for development |
| Guides          | Snack-sized guides about different tools for development          |
| References      | References to commonly needed code snippets                       |
| Kits            | Starter Kits with development frameworks                          |

Depending on what you are writing, it will live in one of these sections

#### References

References are an overarching topic with a list of references of how to do
things under that topic. The general structure is the following:

```
Code Reference Title

Short Summary (Include why to use this ref)

Code Snippet
```

#### Guides

Guides are longer form informational documentation on various topics.
The general structure for writing a guide is the following:

```
Brief Summary/TLDR

Why should I use this guide

Fact Sheet

Deep Dive

Other Resources
```

### Building

```
cd docs
yarn
yarn dev
```

It will take some time to start, the documentation can then be viewed
at (http://localhost:8080/)

## How Can I Contribute?

### Adding Content

There's a list of needed content tracked on the [project board](https://github.com/users/twilson63/projects/2) of this repository.
The board is kept up to date with all work being worked on.

To start work, do the following:

1. Create an issue and/or comment on an existing issue to state you've started working
2. Create a PR during or when complete

### Request Missing Content

Missing something on the cookbook? Please create an issue and we'll try to get it added!

## Committing

We are using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
for this repository.

General flow for making a contribution:

1. Fork the repo on GitHub
2. Clone the project to your own machine
3. Commit changes to your own branch
4. Push your work back up to your fork
5. Submit a Pull request so that we can review your changes

**NOTE**: Be sure to merge the latest from "upstream" before making a
pull request!
