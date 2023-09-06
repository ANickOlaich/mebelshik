const router = require('express').Router();
const {User, Task, TaskType} = require('../models/index');

// Все задания
router.get('/', async (req, res) => {
  try {
    const TasksData = await Task.findAll();
    res.status(200).json(TasksData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Все Задания проекта
router.get('/:id', async (req, res) => {
    const id=req.params.id
  try {
    const TasksData = await Task.findAll({
      where:{
        project_id:id
      }, 
      include: [{
        model: User,
        attributes: ['name']},
        {
        model:TaskType,
        attributes: ['name','sort']
      }]
      
    });
    //console.log(TasksData);
    for (const task of TasksData) {
      task.dataValues.taskType = task['task-type'].name;
      task.dataValues.sortType = task['task-type'].sort;
    }
    console.log(TasksData);

    
    res.status(200).json(TasksData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/status', async(req,res)=>{
  const id=req.body.id
  const checked=req.body.checked
  console.log('STATUS '+id);
  try{
      const response=await Task.update(
          {checked:checked},
          {where:{id:id}}
      )
      res.status(200).json(response);

  }catch(err){
      console.log(err);
  }
})

router.get('/delete/:id', async(req,res)=>{
    const id=req.params.id
  
    try{
        const response=await Task.update(
            {deleted:true},
            {where:{id:id}}
        )
       
        res.status(200).json(response);

    }catch(err){
        console.log(err);
    }
})

router.post('/', async(req,res)=>{
 
  req.body.author_id=req.session.user_id;
  try {
    const entryData = await Task.create(req.body);
    const TaskData = await Task.findByPk(entryData.id,{
        include: {
            model: User,
            attributes: ['name']
          },
    })
   
    res.status(200).json(TaskData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

})



/*

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
*/
module.exports = router;