const express = require('express');
const router = express.Router();
const {
    getProjectById,
    getUserProjects
  } = require('../controllers/projectController');

  const {
    getTodosByProject,
  } = require('../controllers/todoController');

  const {
    getAllSizeNames,
    getSizesByProject
  } = require('../controllers/sizeController');

  const {
    getAllMaterialNames,
  } = require('../controllers/materialController');
  const {
    getAllProjectMaterials,
    getAllProjectMaterialNames
  } = require('../controllers/projectMaterialController')

  const {
    getPhotosByProject
  } = require('../controllers/photoControllers')
  

// Страница проекта
router.get('/:id', async (req,res)=>{
  try {
  const project = await getProjectById(req,res);

  req.params.projectId = project.id;
  const todos = await getTodosByProject(req,res);
  const sizes = await getSizesByProject(req,res);
  const sizeNames = await getAllSizeNames(req,res);
  const materialNames = await getAllMaterialNames(req,res);
  const projectMaterials = await getAllProjectMaterials(req,res);
  const projectMaterialsNames = await getAllProjectMaterialNames(req,res);
  const photos = await getPhotosByProject(req,res);
  res.render('tech-task',{project,todos,sizes,sizeNames,materialNames,projectMaterials,projectMaterialsNames,photos })
  }catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).send('Server Error'); // Отправка ошибки на клиентскую сторону в случае ошибки

  }
}
 );

module.exports = router;