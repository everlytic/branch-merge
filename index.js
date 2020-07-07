const github = require('@actions/github')
const core = require('@actions/core');

async function run() {
    const token = core.getInput('github_token')
    const target_branch = core.getInput('target_branch')
    const source_ref = core.getInput('source_ref')
    const octokit = github.getOctokit(token);

    const repo = github.context.repo

    try {
        await octokit.repos.merge({
            owner: repo.owner,
            repo: repo.repo,
            base: target_branch,
            head: source_ref,
            commit_message: `Merged '${source_ref}' into '${target_branch}'.`
        })
    } catch (e) {
        core.setFailed(e.message)
    }
}

// noinspection JSIgnoredPromiseFromCall
run();