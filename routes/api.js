const fs = require('fs');
const multer = require('multer')
const router = require('express').Router();
const taskRouter = require('./task')
const taskTypes = require('./taskTypes')
const parserRoutes = require('./parser')
const ralRoutes = require('./ral')
const imageTypesRoutes = require('./imageTypes')
const galleryRoutes = require('./gallery')
const { User, Project } = require('../models/index');
const { request } = require('express');

router.use('/task',taskRouter)
router.use('/task-types',taskTypes)
router.use('/parser',parserRoutes)
router.use('/ral',ralRoutes)
router.use('/image-types',imageTypesRoutes)
router.use('/gallery',galleryRoutes)


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

const storage = multer.memoryStorage(); // Используем память для временного хранения файлов
const upload = multer({ storage: storage });


router.post('/project/image', upload.single('image'), async (req, res) => {
  try {
    const id = req.body.id;
    const image = req.file; // Изображение доступно как req.file
    console.log('ID:', id);
    console.log('Изображение:', image);
    // Сгенерируйте уникальное имя файла, например, на основе текущей даты и времени
    const uniqueFileName = "project_"+id+".jpg"

     // Путь для сохранения файла (поменяйте на путь к вашей директории)
     const filePath = 'public/project/' + uniqueFileName;

     // Сохраните файл на сервере
     fs.writeFileSync(filePath, image.buffer);
 
     // Верните адрес сохраненного файла в ответе
     const fileUrl = `/project/${uniqueFileName}`;
     res.status(200).json({ 
      url:fileUrl });
  } catch (err) {
    console.error('Ошибка:', err);
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