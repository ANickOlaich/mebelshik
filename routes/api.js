const router = require('express').Router();
const taskRouter = require('./task')
const taskTypes = require('./taskTypes')
const parserRoutes = require('./parser')
const ralRoutes = require('./ral')
const { User, Project } = require('../models/index');
const { request } = require('express');

router.use('/task',taskRouter)
router.use('/task-types',taskTypes)
router.use('/parser',parserRoutes)
router.use('/ral',ralRoutes)

// Все проекты
router.get('/projects', async (req, res) => {
  console.log('GET ALL PROJECTS');
  try {
    const ProjectsData = await Project.findAll();
    res.status(200).json(ProjectsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Все проекты автора
router.get('/user-projects', async (req, res) => {
  try {
    const ProjectsData = await Project.findAll({
      where:{
        author_id:req.session.user_id
      }
    });
    res.status(200).json(ProjectsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/projects', async(req,res)=>{
  console.log("POST PROJECT");
  req.body.author_id=req.session.user_id;
  req.body.image_url="/images/void.jpg";
  console.log(req.body);
  try {
    const entryData = await Project.create(req.body);
    console.log(entryData);
    res.status(200).json(entryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

})

router.post('/projects/in-arhive', async(req,res)=>{
  console.log("ARCHIVE PROJECT");
  console.log(req.body);
   try {
    const result = await Project.update(
      { is_actual:false },
      { where: { id: req.body.id } }
    )
    const data = await Project.findByPk(req.body.id)
    console.log(data);
    res.status(200).json(data);
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.post('/project', async (req, res) => {
  try {
    const id=req.body.id
    console.log("PROJECT DATA "+id);
    const ProjectData = await Project.findByPk(id)
    console.log(ProjectData);
    res.status(200).json(ProjectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Меняе статус проекта
router.post('/projects/status', async(req,res)=>{
  console.log("ARCHIVE PROJECT");
  console.log(req.body);
   try {
    const result = await Project.update(
      { status:req.body.status },
      { where: { id: req.body.id } }
    )
    const data = await Project.findByPk(req.body.id)
    console.log(data);
    res.status(200).json(data);
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.put('/project',async(req,res)=>{
  console.log("PUT PROJECT");
  console.log(req.body);
  try {
    const result = await Project.update(
      req.body,
      {where:{id:req.body.id}}
    )
  } catch(err){
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;