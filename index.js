const github = require('@actions/github')
const core = require('@actions/core');

async function run() {
    try {
        const token = core.getInput('github_token')
        const target_branch = core.getInput('target_branch')
        const source_ref = core.getInput('source_ref')
        const commit_message_template = core.getInput('commit_message_template')
        const octokit = github.getOctokit(token);

        const repo = github.context.repo

        let commitMessage = commit_message_template
            .replace('{source_ref}', source_ref)
            .replace('{target_branch}', target_branch);

        await octokit.rest.repos.merge({
            owner: repo.owner,
            repo: repo.repo,
            base: target_branch,
            head: source_ref,
            commit_message: commitMessage
        })

    } catch (e) {
        core.setFailed(e.message)
    }
}

// noinspection JSIgnoredPromiseFromCall
run();
