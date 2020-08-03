# Merge Branch
Automate merging of a source branch into a target branch.

## Usage

```yaml
on:
  push:
    branches:
      - "release/*"
jobs:
  merge-branch:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: everlytic/branch-merge@1.1.0
        with:
          github_token: ${{ github.token }}
          source_ref: ${{ github.ref }}
          target_branch: 'master'
          commit_message_template: '[Automated] Merged {source_ref} into target {target_branch}'
```

## Inputs

### `github_token`
**Required** - The GitHub Personal Access Token used to perform the merge action. 
This can be the [Token provided by GitHub Workflows](https://docs.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token), 
or a custom token set at a [workflow secret](https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets).

A custom token may be useful if performing actions that require Administrative privileges, such as overriding 
branch protection rules.

### `source_ref`
**Required** - The source ref or branch name that you wish to merge into the `target_branch`.

### `target_branch`
**Required** - The target branch you are merging into.

### `commit_message_template`
**Optional** - Customize the commit message that gets added to the merge commit. This allows for templates enclosed in 
curly braces `{}`. 

The only templates allowed at this time are `{source_ref}` and `{target_branch}`.
