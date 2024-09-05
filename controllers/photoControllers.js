// controllers/photoController.js
const { Photo } = require('../models'); // Подключение модели Photo
const path = require('path');
const fs = require('fs');
const multer = require('multer');
// Настройка хранилища для загружаемых файлов
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('Saving to uploads/'); // Логируем путь сохранения
      cb(null, 'uploads/')  // Путь к директории для сохранения файлов
  },
  filename: function (req, file, cb) {
    const projectId = req.body.projectId;  // Получаем projectId из тела запроса
    const uniqueSuffix = Date.now();  // Используем текущее время как уникальный суффикс
    const fileExtension = file.originalname.split('.').pop();  // Получаем оригинальное расширение файла
    const filename = `${projectId}-${uniqueSuffix}.${fileExtension}`;  // Формируем имя файла
    console.log(`Saving file as: ${filename}`);  // Логируем имя файла
    cb(null, filename);  // Возвращаем сформированное имя файла
}


});

// Настройка `multer` с хранилищем и ограничением на количество файлов
const upload = multer({ storage: storage }).array('files', 10);  // Разрешить до 10 файлов в поле 'files'


// Загрузка фото на сервер
exports.uploadPhoto = async (req, res) => {
  // Загрузка файлов с использованием multer
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json({ success: false, message: err.message });
    } else if (err) {
        return res.status(500).json({ success: false, message: "Произошла ошибка при загрузке." });
    }

    // Получение текстовых данных из `req.body`
    const description = req.body.description;
    const projectId = req.body.projectId;

    //console.log('Описание:', description);
    //console.log('ID проекта:', projectId);

    if (req.files && req.files.length > 0) {
      try {
        for (const file of req.files) {
          //console.log('Загруженный файл:', file.filename);

          // Сохранение информации о файле в базе данных
          await Photo.create({
            projectId: projectId,
            description: description,
            url: file.filename,
          });
        }

        // Ответ после успешной загрузки
        res.status(200).json({ success: true, message: "Фото успешно загружено!" });
      } catch (dbError) {
        console.error("Ошибка при сохранении в базу данных:", dbError);
        res.status(500).json({ success: false, message: "Ошибка при сохранении данных в базу." });
      }
    } else {
      res.status(400).json({ success: false, message: "Файлы для загрузки не найдены." });
    }
  });
};

exports.deletePhoto = async (req, res) => {
  try {
      const photoId = req.params.id;

      // Найти фото по ID
      const photo = await Photo.findByPk(photoId);
      if (!photo) {
          return res.status(404).json({ success: false, message: "Фото не найдено." });
      }

      // Удалить файл с сервера
      const filePath = path.join(__dirname, '../uploads/', photo.url);
      fs.unlink(filePath, (err) => {
          if (err) {
              console.error("Ошибка при удалении файла:", err);
              return res.status(500).json({ success: false, message: "Ошибка при удалении файла." });
          }

          // Удалить запись из базы данных
          photo.destroy();

          res.status(200).json({ success: true, message: "Фото успешно удалено." });
      });

  } catch (error) {
      console.error("Ошибка при удалении фото:", error);
      res.status(500).json({ success: false, message: "Произошла ошибка при удалении." });
  }
};
  // controllers/photoController.js
exports.getAllPhotos = async (req, res) => {
    try {
      const photos = await Photo.findAll();
      res.status(200).json(photos);
    } catch (error) {
      console.error('Ошибка при получении всех фото:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  };
  // controllers/photoController.js
exports.getPhotosByProject = async (req, res) => {
    try {
      const { projectId } = req.params;
      const photos = await Photo.findAll({ where: { projectId } });
  
  
      return photos;
    } catch (error) {
      console.error('Ошибка при получении фото проекта:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  };
  // controllers/photoController.js
exports.updatePhotoDescription = async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
  
      // Поиск фото по ID
      const photo = await Photo.findByPk(id);
  
      if (!photo) {
        return res.status(404).json({ message: 'Фото не найдено' });
      }
  
      // Обновление описания фото
      photo.description = description;
      await photo.save();
  
      res.status(200).json(photo);
    } catch (error) {
      console.error('Ошибка при обновлении описания фото:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  };
  
  
  
  