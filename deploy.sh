#!/bin/bash
yarn codecov
git stash --all
git checkout master
git push -f deploy master