#!/usr/bin/env bash
SCRIPT_ROOT=$(cd $(dirname $0); pwd)

cd $SCRIPT_ROOT

npx eslint -c eslint.config.js > $SCRIPT_ROOT/lint.log

# check if no-console rule is working

TEST_NO_CONSOLE=$(grep "no-console" $SCRIPT_ROOT/lint.log | wc -l)

if [ "$TEST_NO_CONSOLE" -eq "5" ]; then
  echo "Rule 'no-console' test passed"
else
  echo "Rule 'no-console' test failed"
  exit 1
fi

# check if max-lines rule is working

TEST_MAX_LINES=$(grep -E "max-lines$" $SCRIPT_ROOT/lint.log | wc -l)

if [ "$TEST_MAX_LINES" -eq "1" ]; then
  echo "Rule 'max-lines' test passed"
else
  echo "Rule 'max-lines' test failed"
  exit 1
fi

# check if @typescript-eslint/no-explicit-any rule is working

TEST_MAX_LINES=$(grep -E "@typescript-eslint/no-explicit-any$" $SCRIPT_ROOT/lint.log | wc -l)

if [ "$TEST_MAX_LINES" -eq "2" ]; then
  echo "Rule '@typescript-eslint/no-explicit-any' test passed"
else
  echo "Rule '@typescript-eslint/no-explicit-any' test failed"
  exit 1
fi
