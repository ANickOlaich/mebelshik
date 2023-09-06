const router = require('express').Router();
const { User, Project, Task  } = require('../models');
const withAuth = require('../utils/auth');

// render homepage
router.get('/', async (req, res) => {
  try {
    res.render('admin/admin', {
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
      title: 'Главная', 
      active: 'admin'
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/*router.get('/',async(req,res)=>{
    res.render('admin/admin',{title: 'Главная', active: 'admin'})
})*/

router.get('/users',async(req,res)=>{
    res.render('admin/users',{
        logged_in: req.session.logged_in,
        is_admin: req.session.is_admin,
        title: 'Пользователи', 
        active: 'users'})
})

router.get('/projects',async(req,res)=>{
    res.render('admin/projects',{
        logged_in: req.session.logged_in,
        is_admin: req.session.is_admin,
        title: 'Проекты', 
        active: 'projects'})
})

router.get('/tasks',async(req,res)=>{
    res.render('admin/tasks',{
        logged_in: req.session.logged_in,
        is_admin: req.session.is_admin,
        title: 'Задания', 
        active: 'tasks'})
})

router.get('/task-type',async(req,res)=>{
  res.render('admin/taskType',{
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
      title: 'Типы заданий', 
      active: 'task-type'})
})

router.get('/user/:id',async(req,res)=>{
  const userData = await User.findOne({
    where: {
      id: req.params.id,
    }
  })
  const projects = await Project.findAll({
    where: {
      author_id: req.params.id
    }
  })
  const tasks = await Task.findAll({
    where:{
      author_id: req.params.id,
      checked:false
    }
  })
  res.render('admin/user',{
      user:userData,
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
      title: 'Пользователи', 
      active: 'user',
      projects:projects,
      tasks:tasks
    })
})

module.exports = router;