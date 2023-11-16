/** @type {import('eslint').Linter.Config} */
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ["sznm/react", "plugin:react/jsx-runtime"],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-console': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'func-names': 'off',
    'react/no-array-index-key': 'off',
    'radix': 'off',
    'no-unsafe-optional-chaining': 'off',
    'no-nested-ternary': 'off', // Turn off no-nested-ternary rule
    'react/prop-types': 'off', // Turn off react/prop-types rule
    '@typescript-eslint/no-shadow': 'off', // Turn off @typescript-eslint/no-shadow rule
    'complexity': 'off',
    'no-underscore-dangle': 'off',
    'no-plusplus': 'off',
  },
};
