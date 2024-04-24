// Подключение модуля 'path' для работы с путями файлов
const path = require('node:path');

// Подключение плагина CopyPlugin для копирования файлов из одного места в другое
const CopyPlugin = require('copy-webpack-plugin');

// Подключение плагина HtmlPlugin для генерации HTML-файла на основе шаблона
const HtmlPlugin = require('html-webpack-plugin');

// Экспорт настроек Webpack
module.exports = {
  // Точка входа в приложение
  entry: './src/main.js',

  // Настройки выходного файла
  output: {
    // Имя выходного файла с хешем контента для кэширования
    filename: 'bundle.[contenthash].js',
    // Путь к выходному файлу
    path: path.resolve(__dirname, 'build'),
    // Очистка директории сборки перед каждой сборкой
    clean: true,
  },

  // Настройка исходного кода для отладки
  devtool: 'source-map',

  // Настройка плагинов
  plugins: [

    // Использование плагина HtmlPlugin для генерации HTML-файла на основе шаблона
    new HtmlPlugin({
      template: 'public/index.html',
    }),

    // Использование плагина CopyPlugin для копирования файлов из директории 'public', игнорируя файл index.html
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
  ],

  // Настройка модулей
  module: {
    // Правила для модулей
    rules: [
      {
        // Применение правила к файлам с расширением .js
        test: /\.js$/,
        // Исключение node_modules из обработки этим правилом
        exclude: /(node_modules)/,
        // Использование Babel для транспиляции JavaScript
        use: {
          loader: "babel-loader",
          options: {
            // Использование пресета @babel/preset-env для поддержки современного JavaScript
            presets: ['@babel/preset-env']
          },
        },
      },
    ]
  }
};
