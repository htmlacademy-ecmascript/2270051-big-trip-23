// Подключение модуля 'path' для работы с путями файлов
const path = require('node:path');

// Подключение плагина CopyPlugin для копирования файлов из одного места в другое
const CopyPlugin = require('copy-webpack-plugin');

// Экспорт настроек Webpack
module.exports = {
  // Точка входа в приложение
  entry: './src/main.js',

  // Настройки выходного файла
  output: {
    // Имя выходного файла
    filename: 'bundle.js',
    // Путь к выходному файлу
    path: path.resolve(__dirname, 'build'),
    // Очистка директории сборки перед каждой сборкой
    clean: true,
  },

  // Настройка исходного кода для отладки
  devtool: 'source-map',

  // Настройка плагинов
  plugins: [
    // Использование плагина CopyPlugin для копирования файлов из директории 'public'
    new CopyPlugin({
      patterns: [{ from: 'public' }],
    }),
  ],
};
