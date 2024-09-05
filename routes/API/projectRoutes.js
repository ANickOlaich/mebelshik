// routes/projectRoutes.js
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/authenticateUser');
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectsPaginated,
  updateProjectStatus,
  updateProjectisTemplate,
  createProjectTemplated,
} = require('../../controllers/projectController');

const {
  getTodosByProject,
  createTodo,
  updateTodo,
  deleteTodo
} = require('../../controllers/todoController');



// Получить все проекты (или только свои)
router.get('/', auth, getProjectsPaginated);
router.get('/all', auth, getAllProjects);
// Получить проект по ID
router.get('/:id', auth, getProjectById);
router.post('/:id/todos', createTodo);

router.post('/:id/todos', async (req,res)=>{
  createTodo(reg,res);
}
 );

// Создать новый проект
router.post(
  '/', createProject
);

// Обновить проект
router.put(
  '/:id',
  [
    auth,
    check('name', 'Name is required').optional(),
    check('status', 'Status is required').optional()
  ],
  updateProject
);
router.post('/:id/status', updateProjectStatus);
router.post('/:id/istemplate',updateProjectisTemplate);

// Удалить проект
router.delete('/:id', auth, deleteProject);

//Создаать новый проект на основе шаблона
router.post('/template',createProjectTemplated)

module.exports = router;
