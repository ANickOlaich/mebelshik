const router = require('express').Router();
const { User, Project, Task } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  const dataProjects = await Project.findAll({
    where:{
      public:true
    },
  });
  console.log(dataProjects);
    try {
      res.render('index', {
        logged_in: req.session.logged_in,
        is_admin: req.session.is_admin,
        title:"Главная",
        projects:dataProjects
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.get('/3d-test', async (req, res) => {
    try {
      res.render('3d-test', {
        logged_in: req.session.logged_in,
        is_admin: req.session.is_admin,
        title:"3D test"
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/my-projects',withAuth, async (req, res) => {
    try {
      res.render('my-projects', {
        userId:req.session.user_id,
        logged_in: req.session.logged_in,
        is_admin: req.session.is_admin,
        title:"Мои проекты"
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/project/:id',withAuth, async (req, res) => {
    const id=req.params.id
    try {
      res.render('project', {
        projectData:await Project.findByPk(id),
        userId:req.session.user_id,
        logged_in: req.session.logged_in,
        is_admin: req.session.is_admin,
        title:"Проект"
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/tasks/:id',withAuth, async (req, res) => {
    const id=req.params.id
    try {
      res.render('tasks', {
        projectData:await Project.findByPk(id),
        userId:req.session.user_id,
        logged_in: req.session.logged_in,
        is_admin: req.session.is_admin,
        title:"Тех задания"
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/auth', (req, res) => {
    // if the session confirms that the user is logged in redirect to the homepage
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('auth',{
        logged_in: req.session.logged_in,
        is_admin: req.session.is_admin,
        title:"Авторизация"
    });
  });

  router.get('/registration', (req, res) => {
    // if the session confirms that the user is logged in redirect to the homepage
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('registration',{
        logged_in: req.session.logged_in,
        is_admin: req.session.is_admin,
        title:"Авторизация",
        message:''
    });
  });

  router.get('/view-project/:id', async (req, res) => {
    const id=req.params.id
    const projectData = await Project.findByPk(id)
    const Author = await User.findByPk(projectData.author_id)
    projectData.Author = Author.name
    const tasks = await Task.findAll({
      where:{
        project_id:id,
        //public:true,
        //deleted:false,
        //visible_for_customer:true
      }
    })
    .then(res => {
      return res.map(row => {
        return row.dataValues
      });
    })
    console.log(projectData);
    try {
      res.render('view-project', {
        project:projectData,
        tasks:tasks,
        userId:req.session.user_id,
        logged_in: req.session.logged_in,
        is_admin: req.session.is_admin,
        title:"Проект"
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;