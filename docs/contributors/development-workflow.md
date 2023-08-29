---
sidebar_position: 1
sidebar_label: Development Workflow
title: Nitrox development and workflow crash course
---

## Welcome contributors!

This page will help you with using git in a (more) optimal way.

## Before you start

- Fork the Nitrox repo on GitHub to your own account. Use this fork to pull/push changes.
- If you're on GitHub then please share your account name with us so we know who's working on what.

## Improving git workflow

In case you want to learn more about git and its workflows, https://git-scm.com/book is an excellent place to start

### Tips

- Keep your local repo's master branch the same as the main repo of Nitrox. Create new local branches with git and commit your work on them. This will make it easier to try out the latest Nitrox code without having to delete, reset or stash your work.

### Run these commands once

- `git remote add upstream https://github.com/SubnauticaNitrox/Nitrox.git` - Add Nitrox main repo as a remote so you can synchronize with changes from Nitrox

### Run these optional commands once to speed up workflow

```sh
# Shortens `git push`-ing changes to remote branches by using the same branch name you're currently on by default.
git config --global push.default current
# If you forgot some changes after you made a commit then use this alias to quickly add the changes to the last commit: git amend
git config --global alias.amend 'commit -a --amend --no-edit'
# Checkout PR code by passing the PR number to this command: `git pr 1337`
git config --global alias.pr '!f() { git fetch upstream "pull/$1/head" && git checkout FETCH_HEAD; }; f'
```

### Remembering these git commands will make it easier to manage your local forked repository of Nitrox

- `git fetch --all` - Refresh git cached index with changes from remote repositories. This is required before merging/rebasing from a remote repo to get latest changes.
- `git pull --rebase upstream master` - Make sure you are on **the local master branch** when pulling in changes from the main Nitrox repo.
- `git merge upstream/master` - Merge changes from the Nitrox master branch to the currently active branch. This creates a new merge commit.
- `git rebase upstream/master` - _Don't do this when someone else is working on **your specific** branch._ Applies changes from the Nitrox master branch to the current branch you're on and then reapplies the changes you've made on-top.
- `git push <github-repo-url-ending-on-.git> HEAD:<name-of-pr-branch>` - Push a detached HEAD (anonymous branch) to the remote branch on someone's GitHub repo. Useful for adding your work on a to-be-merged PR that isn't your own.

#### Git extras

<details>
  <summary>Git alias to synchronize local working branch with remote (upstream/origin) default branch</summary>

Add following to a .sh file and register the alias like: `git config --global alias.sync "!sh -c '~/gitaliases/sync.sh'"`

```sh
set -e

has_uncommitted_changes() {
  (( $(git status --porcelain=v1 2>/dev/null | wc -l) > 0 ))
}

get_local_active_branch() {
  git branch --show
}

get_local_default_branch() {
  git config --get init.defaultBranch
}

# Sourced from: https://stackoverflow.com/a/61357104/1277156
get_upstream_remote_name() {
  git remote | egrep -o '(upstream|origin)' | tail -1
}

# Sourced from: https://stackoverflow.com/a/61357104/1277156
get_upstream_remote_default_branch() {
  git remote show "$(get_upstream_remote_name)" | awk '/HEAD branch/ {print $NF}'
}

throw_error() {
  echo "Sync aborted: $1" >&2
  exit 1
}

# Store computed git info into variables and do error handling
local_working_branch=$(get_local_active_branch)
[[ "${local_working_branch}" == "" ]] && throw_error "Synchronizing to detached HEAD is unsupported"
has_uncommitted_changes && throw_error "Uncommitted changes on active branch '${local_working_branch}'"
local_default_branch=$(get_local_default_branch)
[[ "${local_default_branch}" == "" ]] && throw_error "Local default branch is unknown"
remote_name="$(get_upstream_remote_name)"
[[ "${remote_name}" == "" ]] && throw_error "Remote name is unknown"
remote_default_branch="$(get_upstream_remote_default_branch)"
[[ "${remote_default_branch}" == "" ]] && throw_error "Remote default branch is unknown"

# Execute fetch from upstream/default-branch
echo "Updating local default branch '${local_default_branch}' with changes from '${remote_name}/${remote_default_branch}'"
[[ "${local_working_branch}" == "${local_default_branch}" ]] || git checkout "${local_default_branch}"
git pull --rebase "${remote_name}" "${remote_default_branch}"
[[ "$(get_local_active_branch)" == "${local_working_branch}" ]] || git checkout "${local_working_branch}"

# (Optional) Execute merge from local default branch to working branch (if different)
if [[ "${local_working_branch}" != "${local_default_branch}" ]]; then
  git merge "${local_default_branch}"
fi
```

</details>

## Submitting and managing pull requests

Merging your changes into the Nitrox repository is done through Pull Requests (PRs). You can create a PR from one of your own branches through the GitHub UI. Make sure you specify the target branch as `master` while making a PR.

Once the PR is created it will be visible to review. If a reviewer requests changes, and you agree, you should make the changes on the same branch that you used for the PR. Commit and push this branch and it will update the PR with your changes.

---

Suggestions for this crash course are appreciated.
