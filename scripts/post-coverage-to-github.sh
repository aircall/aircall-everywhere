#!/bin/bash
#
# Post a comment to the PR for the current branch with the current code coverage.
# If there is no PR opened for this branch, do nothing.
#
# Usage: ./post-coverage-to-github.sh BRANCH_NAME
#
# Requires the following environment variables to be set
#   - GITHUB_BOT_CREDENTIALS: with github credentials following this format: 'username:personal_token'
#     (see https://github.com/settings/tokens to generate a new personal_token)


################################################################
# Check env variables & params
################################################################

# Check if env variables are set set
if [ -z ${GITHUB_BOT_CREDENTIALS} ]; then
  echo "Environment variable GITHUB_BOT_CREDENTIALS is not set"
  exit 1
fi

# Set the branch (it should be given as a parameter)
if [ $# -ne 1 ]; then
  echo "Usage: $0 BRANCH_NAME"
  exit 1
fi
BRANCH=$1


################################################################
# Fetch PRs from Github
################################################################

# Retrieve pull requests matching current branch from GitHub
PULL_REQUESTS_OUT=./pull_requests.json
echo -n "Retrieving pull requests for branch ${BRANCH}... "
curl -s -u "$GITHUB_BOT_CREDENTIALS" -H "Accept:application/vnd.github.v3+json" "https://api.github.com/repos/aircall/aircall-everywhere/pulls?head=aircall:${BRANCH}&state=open" > ${PULL_REQUESTS_OUT}

# Github returns an error
if jq -e 'type != "array" and has("message")' ${PULL_REQUESTS_OUT} > /dev/null; then
  echo "Could not retrieve pull requests from Github"
  cat ${PULL_REQUESTS_OUT}
  rm ${PULL_REQUESTS_OUT}
  exit 1
fi

# Returns no pull requests
if jq -e 'length != 1' ${PULL_REQUESTS_OUT} > /dev/null; then
  echo "No pull requests found for branch ${BRANCH}"
  rm ${PULL_REQUESTS_OUT}
  exit 0 # not an error
fi

# Get the pull request ID
PULL_REQUEST_ID=$(jq '.[0].number' ${PULL_REQUESTS_OUT})
echo "PR #${PULL_REQUEST_ID}"

# Get other PR infos
PULL_REQUEST_USER_NAME=$(jq -r '.[0].user.login' ${PULL_REQUESTS_OUT})
PULL_REQUEST_USER_IMAGE=$(jq -r '.[0].user.avatar_url' ${PULL_REQUESTS_OUT})
PULL_REQUEST_URL=$(jq -r '.[0].html_url' ${PULL_REQUESTS_OUT})
PULL_REQUEST_TITLE=$(jq -r '.[0].title' ${PULL_REQUESTS_OUT})
PULL_REQUEST_REPO=$(jq -r '.[0].head.repo.name' ${PULL_REQUESTS_OUT})
PULL_REQUEST_REPO_URL=$(jq -r '.[0].head.repo.html_url' ${PULL_REQUESTS_OUT})

rm ${PULL_REQUESTS_OUT} # We don't need this file anymore


################################################################
# Fetch coverage of master
################################################################


# Get the current coverage of master branch
MASTER_COVERAGE_RATIO=$(git show origin/gh-pages:tests/coverage-summary.json | jq '.total.statements.pct')
echo "Coverage master: ${MASTER_COVERAGE_RATIO}"


################################################################
# Fetch coverage of current branch
################################################################

# Fetch coverage for current branch
echo -n "Retrieving coverage for ${BRANCH}... "
COVERAGE_OUT=./coverage/coverage-summary.json
COVERAGE_RATIO=$(jq '.total.statements.pct' ${COVERAGE_OUT})
echo ${COVERAGE_RATIO}

# Build payload
LINE1="The code coverage of this PR is **${COVERAGE_RATIO}%**"
if [ $(echo $COVERAGE_RATIO'<'$MASTER_COVERAGE_RATIO | bc -l) -eq 1 ]; then
  EMOJI=":warning:"
  COLOR="danger"
else
  EMOJI=":white_check_mark:"
  COLOR="good"
fi
LINE2="_Coverage for \`master\` is ${MASTER_COVERAGE_RATIO}%_."
COMMENT_PAYLOAD="{\"body\": \"${LINE1}\n${EMOJI} ${LINE2}\"}"


################################################################
# Post comment to Github
################################################################

# Post comment
COMMENT_OUT=./comment_out.json
echo -n "Posting comment to Github... "
curl -s -u "$GITHUB_BOT_CREDENTIALS" -H "Accept:application/vnd.github.v3+json" -H "Content-Type: application/json" -d "${COMMENT_PAYLOAD}" https://api.github.com/repos/aircall/aircall-everywhere/issues/${PULL_REQUEST_ID}/comments > ${COMMENT_OUT}

# Github returns an error
if jq -e 'type != "array" and has("message")' ${COMMENT_OUT} > /dev/null; then
  echo "Could not post comment to Github"
  cat ${COMMENT_OUT}
  rm ${COMMENT_OUT}
  exit 1
fi

# All good!
echo "ok"
rm ${COMMENT_OUT}