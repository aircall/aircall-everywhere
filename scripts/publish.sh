#!/bin/bash

npx webpack --config scripts/webpack/webpack.dev.js

# deploy to gh-pages
gh-pages -d demo_dist