module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            components: './src/components',
            configs: './src/configs',
            enums: './src/enums',
            forms: './src/forms',
            hooks: './src/hooks',
            Images: './src/Images',
            locales: './src/locales',
            pages: './src/pages',
            routes: './src/routes',
            services: './src/services',
            store: './src/store',
            styles: './src/styles',
            utils: './src/utils',
          },
        },
      ],
      '@babel/plugin-proposal-unicode-property-regex',
      'react-native-reanimated/plugin',
    ],
  };
};
