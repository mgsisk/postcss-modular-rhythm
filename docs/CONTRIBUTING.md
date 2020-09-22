# Contributing

Contributions are always welcome. Please read the [code of conduct][] before you
begin.

## [Issues][]

Issues are for discussing specific topics, organizing them with labels,
assigning them to a contributor, and grouping them into milestones to help drive
development. Before submitting an issue, please search existing issues to see if
someone has already submitted your issue. This doesn't always work, and it's ok
to submit a duplicate issue, but a quick search could save everyone some time.

**If you believe submitting your issue publicly presents a security risk,
please read the [security policy][] for information on how to report security
issues.**

### Bug report

If something doesn't seem to be working right with this project, submit a bug
report. The [bug report template][] will help you provide the information
required to assess the bug. Fill out each section of the template as best you
can; the more information you can provide, the better the chance of having the
bug addressed.

### Feature request

If you have an idea to enhance this project, submit a feature request. The
[feature request template][] will help you provide the information required to
asses your idea. Fill out each section of the template as best you can; the
more information you can provide, the better the chance of having your idea
addressed.

### Support question

If you have a general question or would like to start a discussion related to
this project, submit a support question. The [support question template][] will
help you provide the information required. Before submitting a support question,
check the [support resources][] to make sure this is the best place to get an
answer or receive feedback.

## [Pulls][]

Pull requests are the primary change mechanism for this project. If you'd like
to contribute a change, first select or submit an issue to work on. Having an
issue associated with your pull request helps document the reason for the
request, keep changes focused, and improve your chance of merging.

### Change

Start by [forking this repository][], [creating a branch][], and making some
changes. Branch names should be descriptive, use `-` separators, and may
optionally include an issue ID prefix (e.g. `42-making-changes`). [Node][] and
[npm-scripts][] provide the tools required to maintain a consistent coding
style and automate essential development tasks. Install the project
dependencies with `npm install`, then use `npm run` to see a list of available
tasks.

A [Vagrant][] environment using the [VirtualBox][] provider is available if
you're unwilling or unable to install Node. Run `vagrant up` and then use
`vagrant ssh` to connect to the virtual machine or issue commands directly.

### Test

Changes must adhere to this project's coding and documentation standards. All
`lint` tasks should run without generating errors or warnings. Add tests to an
appropriate suite in `/test` to cover your changes, then use `npm test` to make
sure all tests pass.

Add yourself to the list of [contributors][], optionally linked to your
personal site or a social profile, if you'd like recognition for your
contributions. List notable changes in the Unreleased section of the
[changelog][].

### Merge

When you're ready, [create a pull request][] against the `master` branch with [a
good commit message][]. The [pull request template][] will help you provide the
information required to review your request. Fill out each section of the
template as best you can; the more information you can provide, the better the
chance of having your changes merged.

Always use rebase to bring the latest changes from `master` to your branch
before submitting your request. Squash commits into logical units of work; when
in doubt, squash to a single commit.

## [Funding][]

Direct financial support from the community is always a great way to contribute
to this project; it provides essential monetary support and encourages ongoing
development. If you'd like to fund a specific issue with this project, please
use [IssueHunt][]. If you'd like to fund this project's maintainer and their
ongoing work on this and other projects, please use [Liberapay][].

[a good commit message]: https://chris.beams.io/posts/git-commit
[bug report template]: https://github.com/mgsisk/postcss-modular-rhythm/blob/master/.github/ISSUE_TEMPLATE/bug-report.md
[changelog]: https://github.com/mgsisk/postcss-modular-rhythm/blob/master/docs/CHANGELOG.md
[code of conduct]: https://github.com/mgsisk/postcss-modular-rhythm/blob/master/docs/CODE_OF_CONDUCT.md
[contributors]: https://github.com/mgsisk/postcss-modular-rhythm/blob/master/docs/AUTHORS.md
[create a pull request]: https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests
[creating a branch]: https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-and-deleting-branches-within-your-repository
[feature request template]: https://github.com/mgsisk/postcss-modular-rhythm/blob/master/.github/ISSUE_TEMPLATE/feature-request.md
[forking this repository]: https://help.github.com/en/github/getting-started-with-github/fork-a-repo
[funding]: https://liberapay.com/mgsisk
[issuehunt]: https://issuehunt.io/r/mgsisk
[issues]: https://github.com/mgsisk/postcss-modular-rhythm/issues
[liberapay]: https://liberapay.com/mgsisk
[node]: https://nodejs.org
[npm-scripts]: https://docs.npmjs.com/misc/scripts
[pull request template]: https://github.com/mgsisk/postcss-modular-rhythm/blob/master/.github/PULL_REQUEST_TEMPLATE.md
[pulls]: https://github.com/mgsisk/postcss-modular-rhythm/pulls
[security policy]: https://github.com/mgsisk/postcss-modular-rhythm/blob/master/docs/SECURITY.md
[support question template]: https://github.com/mgsisk/postcss-modular-rhythm/blob/master/.github/ISSUE_TEMPLATE/support-question.md
[support resources]: https://github.com/mgsisk/postcss-modular-rhythm/blob/master/docs/SUPPORT.md
[vagrant]: https://www.vagrantup.com
[virtualbox]: https://www.virtualbox.org
