# Auto Release

To perform versioning, changelog creation and publication on NPM, we use [Auto](https://intuit.github.io/auto/index).

In our GitHub actions, there is one called [Release CI](https://github.com/ipetinate/clingon/actions/workflows/release.yml), which is dedicated to this release stage, where auto comes into action and does all the magic.

Auto uses PR labels to perform semantic versioning:

- They do not publish new versions
  - `documentation`: used when you update some documentation or readme, something like that, and don't want a new release to be executed.
  - `internal`: for some internal correction or reorganization, something that does not impact correction or does not change anything in the use of the tool.
- Who publish new versions (follow semver to use these labels):
  - `patch`: 0.0.X
  - `minor`: 0.X.0
  - `major`: X.0.0
  - For bug or other issues
  - `bug`
