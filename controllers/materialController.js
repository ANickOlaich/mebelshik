// controllers/materialController.js
const axios = require('axios');
const cheerio = require('cheerio');
const { Material, MaterialType } = require('../models');

// Добавить новый материал
exports.addMaterial = async (req, res) => {
    try {
        const { name, link, supplier, articleNumber, image } = req.body;
        

        // Проверка наличия необходимой информации
        if (!name) {
            return res.status(400).json({ message: 'Имя материала обязательно.' });
        }

        // Проверка, существует ли материал с таким же именем, поставщиком и артикульным номером
        const existingMaterial = await Material.findOne({
            where: {
                name,
                supplier,
                articleNumber
            }
        });

        if (existingMaterial) {
            return res.status(201).json(existingMaterial);
        }

        // Создание нового материала
        const newMaterial = await Material.create({
            name,
            link,
            supplier,
            articleNumber,
            image
        });

        return res.status(201).json(newMaterial);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


// Удалить материал по ID
exports.deleteMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        const material = await Material.findByPk(id);

        if (!material) {
            return res.status(404).json({ message: 'Материал не найден.' });
        }

        await material.destroy();
        return res.status(200).json({ message: 'Материал удален.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Редактировать материал по ID
exports.updateMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, materialTypeId, link, supplier, articleNumber, image } = req.body;

        const material = await Material.findByPk(id);

        if (!material) {
            return res.status(404).json({ message: 'Материал не найден.' });
        }

        // Обновление полей материала
        material.name = name || material.name;
        material.link = link || material.link;
        material.supplier = supplier || material.supplier;
        material.articleNumber = articleNumber || material.articleNumber;
        material.image = image || material.image;

        await material.save();
        return res.status(200).json(material);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.getMaterial = async(req,res)=>{
    try {
        
        const { id } = req.params;
        const material = await Material.findByPk(id);
        if (!material) {
            return res.status(404).json({ message: 'Материал не найден.' });
        }
        return res.status(200).json(material);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// Получить все материалы
exports.getAllMaterials = async (req, res) => {
    try {
        const materials = await Material.findAll({
        });
        return res.status(200).json(materials);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Получить все имена материалов
exports.getAllMaterialNames = async (req, res) => {
    try {
        const materialNames = await Material.findAll({
            attributes: ['name'],
            order: [['name', 'ASC']]
        });

        // Извлекаем только имена из результата
        const names = materialNames.map(material => material.name);
        return names;
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.checkMaterialExists = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ message: 'Не указано имя материала.' });
        }

        const material = await Material.findOne({ where: { name } });
       

        if (material) {
            return res.json({ exists: true , material: material});
        } else {
            return res.json({ exists: false });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


// Парсинг страницы сайта для получения данных о материале
exports.parseMaterialData = async (req, res) => {
    const { url: pageUrl } = req.body;
  
    try {
      // Получаем HTML страницы
      const { data } = await axios.get(pageUrl);
      const $ = cheerio.load(data);
  
      // Извлечение данных из HTML
      const materialName = $('h1.product__title-text').text().trim();
      const materialType = ''; // Если тип материала отсутствует
      const supplier = new URL(pageUrl).hostname; // Доменное имя страницы
      const articleNumber = $('span#ms_prod_code').text().trim();
      const imageUrl = $('img.product-slider__img').attr('src').trim();
  
      // Формируем полный URL картинки
      const baseUrl = new URL(pageUrl).origin;
      const fullImageUrl = baseUrl + imageUrl;
  
      // Отправляем парсенные данные в ответе
      res.json({
        materialName,
        materialType,
        supplier,
        articleNumber,
        imageUrl: fullImageUrl
      });
    } catch (error) {
      console.error('Error parsing material data:', error);
      res.status(500).json({ error: 'Error parsing material data' });
    }
  };

