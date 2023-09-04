module.exports = {
  overrides: [
    {
      files: ['*.js', '*.ts', '*.tsx'],
      extends: 'standard-with-typescript',
      rules: {
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        '@typescript-eslint/no-useless-constructor': 'off',
        '@typescript-eslint/semi': 'off',
      },
    },
  ],
};
