const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const axios = require('axios'); // Для загрузки изображения
const { Project, ProjectMaterial, Material } = require('../models'); // Предположим, что это ваши модели

// Функция для загрузки изображения и получения его в виде буфера
async function fetchImageBuffer(url) {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return response.data;
}

// Функция для генерации PDF
const generatePDF = async (req, res) => {
    try {
        // Извлечение данных из базы данных
        const projectId = req.params.projectId; // Получение projectId из параметров запроса
        const project = await Project.findByPk(projectId, {
            include: {
                model: ProjectMaterial,
                as: 'ProjectMaterials',
                include: {
                    model: Material,
                    as: 'Material'
                }
            }
        });

        if (!project) {
            return res.status(404).send('Проект не найден');
        }

        // Создание директории, если она не существует
        const pdfDir = path.join(__dirname, '../../pdfs');
        if (!fs.existsSync(pdfDir)) {
            fs.mkdirSync(pdfDir, { recursive: true });
        }

        // Создание нового PDF-документа
        const doc = new PDFDocument();
        const pdfFilePath = path.join(pdfDir, `${project.name}.pdf`);

        // Установите имя файла, который вы хотите сохранить, и путь к нему
        const writeStream = fs.createWriteStream(pdfFilePath);
        doc.pipe(writeStream);

        // Подключение шрифта, поддерживающего кириллицу
        const fontPath = path.join(__dirname, '../../fonts/DejaVuSans.ttf'); // Путь к вашему шрифту
        doc.font(fontPath);

        // Заголовок
        doc.fontSize(18).text(`Материалы в проекте: ${project.name}`, {
            align: 'center'
        });

        // Пробел перед таблицей
        doc.moveDown(2);

        // Таблица данных
        for (const pm of project.ProjectMaterials) {
            const material = pm.Material;

            // Добавляем заголовок для каждого материала
            doc.fontSize(14).text(`${pm.name}`, { underline: true });

            doc.moveDown(0.5); // Небольшой отступ перед контентом

            // Проверяем, есть ли изображение
            if (material.image) {
                try {
                    // Загружаем изображение и добавляем его
                    const imageBuffer = await fetchImageBuffer(material.image);

                    // Сохраняем текущее положение для текста
                    const currentY = doc.y;

                    // Устанавливаем изображение слева
                    doc.image(imageBuffer, {
                        fit: [100, 100], // Ограничиваем размеры изображения
                        align: 'left',
                        valign: 'top'
                    });

                    // Устанавливаем положение текста рядом с изображением
                    const imageWidth = 110; // Ширина изображения + отступ
                    doc.x += imageWidth;

                    // Добавляем кликабельное название материала
                    doc.fontSize(12).fillColor('blue').text(material.name, {
                        link: material.link, // URL для перехода
                        underline: true
                    });

                    // Добавляем оставшуюся текстовую информацию о материале
                    doc.fillColor('black'); // Сброс цвета шрифта на черный
                    doc.text(`Поставщик: ${material.supplier}`);
                    doc.text(`Артикул: ${material.articleNumber}`);

                    // Восстанавливаем начальное положение X для следующего блока контента
                    doc.x = 72; // Начальное значение отступа слева по умолчанию
                    doc.y = Math.max(currentY + 110, doc.y); // Смещение Y на высоту изображения + отступ

                } catch (error) {
                    console.error('Ошибка при загрузке изображения:', error);
                    doc.text('Не удалось загрузить изображение');
                }
            } else {
                // Если изображения нет, добавляем только текст
                doc.fontSize(12).fillColor('blue').text(material.name, {
                    link: material.link, // URL для перехода
                    underline: true
                });

                // Добавляем оставшуюся текстовую информацию о материале
                doc.fillColor('black'); // Сброс цвета шрифта на черный
                doc.text(`Поставщик: ${material.supplier}`);
                doc.text(`Артикул: ${material.articleNumber}`);
            }

            // Добавляем отступ после каждого материала
            doc.moveDown();
        }

        // Закрыть документ и сохранить
        doc.end();

        writeStream.on('finish', () => {
            // Отправка файла клиенту
            res.download(pdfFilePath, `${project.name}.pdf`, (err) => {
                if (err) {
                    console.error('Ошибка при отправке PDF файла:', err);
                    res.status(500).send('Ошибка при отправке PDF файла');
                }

                // Удаление файла после отправки
                fs.unlink(pdfFilePath, (err) => {
                    if (err) {
                        console.error('Ошибка при удалении PDF файла:', err);
                    }
                });
            });
        });

        writeStream.on('error', (err) => {
            console.error('Ошибка при создании PDF:', err);
            res.status(500).send('Ошибка при создании PDF');
        });

    } catch (error) {
        console.error('Ошибка при создании PDF:', error);
        res.status(500).send('Ошибка при создании PDF');
    }
};

module.exports = {
    generatePDF
};
