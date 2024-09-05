const express = require('express');
const path = require('path');

const errorMiddleware = require('./middleware/errorMiddleware');

const ApiRoutes = require('./routes/apiRoutes');
const frontendRoutes = require('./routes/frontendRoutes');
const pdfRoutes = require('./routes/pdfRoutes')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); // Для работы с куками
const authMiddleware = require('./middleware/authMiddleware'); // Путь к middleware
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 80;

// Middleware для обработки JSON
//app.use(express.json());
app.use(bodyParser.json()); // Для обработки JSON запросов
app.use(bodyParser.urlencoded({ extended: true })); // Для обработки данных из форм
app.use(cookieParser());

// Настраиваем EJS как шаблонизатор
app.set('view engine', 'ejs');

// Настройка CORS
/*
app.use(cors({
  origin: 'http://localhost:3000', // Разрешите запросы только с этого адреса
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешенные методы
  allowedHeaders: ['Content-Type', 'Authorization'], // Разрешенные заголовки
}));
*/

// Используем middleware для проверки аутентификации
app.use(authMiddleware);

// Передаем состояние аутентификации во все шаблоны
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated;
  next();
});
// Использование маршрутов
app.use('/api',ApiRoutes);
app.use('/',frontendRoutes);
app.use('/generate-pdf',pdfRoutes);


// Серверуем статические файлы из директории build (если есть)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

// Обработка всех маршрутов, не совпадающих с API
/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});*/

// Middleware для обработки ошибок
app.use(errorMiddleware);


// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});