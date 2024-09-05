// controllers/projectMaterialController.js
const { ProjectMaterial, Material, Project } = require('../models');

exports.addProjectMaterial = async (req, res) => {
    try {
        const { name, projectId, materialId, note } = req.body;

        console.log('--------------------------------------');
        console.log(req.body);

        // Проверка наличия необходимых данных
        if (!name || !projectId || !materialId) {
            return res.status(400).json({ message: 'Необходимые данные отсутствуют: имя, ID проекта или ID материала.' });
        }

        // Добавление нового материала к проекту
        const newProjectMaterial = await ProjectMaterial.create({
            name,
            projectId,
            materialId,
            note
        });

        return res.status(201).json(newProjectMaterial);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.changeMaterial = async (req, res) => {
    try {
        const { id, materialId, note } = req.body;

        // Найдем материал в базе данных по его ID
        const material = await ProjectMaterial.findByPk(id);

        if (!material) {
            return res.status(404).json({ message: 'Материал не найден.' });
        }

        // Обновляем данные материала
        material.materialId = materialId || material.materialId;
        material.note = note || material.note;

        // Сохраняем изменения в базе данных
        await material.save();

        console.log('Материал обновлен:', material);

        // Возвращаем успешный ответ
        return res.status(200).json({ message: 'Материал успешно обновлен.', material });
    } catch (error) {
        console.error('Ошибка при редактировании материала:', error);
        return res.status(500).json({ error: error.message });
    }
};


exports.deleteProjectMaterial = async (req, res) => {
    try {
        const { id } = req.params;

        // Поиск и удаление материала по ID
        const projectMaterial = await ProjectMaterial.findByPk(id);
        if (!projectMaterial) {
            return res.status(404).json({ message: 'Материал не найден.' });
        }

        await projectMaterial.destroy();
        return res.status(200).json({ message: 'Материал успешно удалён.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};



exports.getAllProjectMaterials = async (req, res) => {
    try {
        const { projectId } = req.params;

        // Получение всех материалов проекта по его ID
        const projectMaterials = await ProjectMaterial.findAll({
            where: { projectId },
            include: [
                { model: Material, as: 'Material' },
                { model: Project, as: 'Project' }
            ]
        });

        return projectMaterials;
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getAllProjectMaterialNames = async (req, res) => {
    try {
        const { projectId } = req.params;

        // Получение всех названий материалов для указанного проекта
        const projectMaterials = await ProjectMaterial.findAll({
            where: { projectId },
            attributes: ['name'],
            raw: true
        });

        const materialNames = projectMaterials.map(pm => pm.name);

        return materialNames;
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
