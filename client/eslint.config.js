// eslint.config.js

module.exports = [
  {
    ignores: ['node_modules/**'],
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    parser: '@babel/eslint-parser',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
      requireConfigFile: false,
    },
    plugins: ['react', 'react-native'],
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/react-in-jsx-scope': 'off', // If you're using React 17 or newer
    },
  },
];
