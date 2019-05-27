#!/bin/bash

npx webpack --config scripts/webpack/webpack.publish.js

# deploy doc to gh-pages
gh-pages -d demo_dist

# deploy tests to gh-pages
npm run coverage
gh-pages -d coverage -e tests
