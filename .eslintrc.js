module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['prettier'],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'no-console': ['error', { allow: ['tron', 'disableYellowBox'] }],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
};
