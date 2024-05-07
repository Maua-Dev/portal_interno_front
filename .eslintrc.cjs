module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier', '@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    semi: 'off',
    quotes: ['warn', 'single'],
    'prettier/prettier': 'warn',
    'comma-dangle': 'warn',
    'no-new': 'off',
    'no-unused-vars': 'off',
    'no-unused-expressions': 'warn',
    'no-unused-labels': 'warn',
    'accessor-pairs': 'off',
    camelcase: 'off',
    'no-useless-constructor': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'off'
  }
}
