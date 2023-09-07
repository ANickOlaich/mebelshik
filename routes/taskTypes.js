const router = require('express').Router();
const {User, Task, TaskType} = require('../models/index');

// Все типы
router.get('/', async (req, res) => {
  try {
    const Data = await TaskType.findAll();
    res.status(200).json(Data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async(req,res)=>{
  try {
    const entryData = await TaskType.create(req.body);
    const TaskData = await TaskType.findByPk(entryData.id)
    console.log(TaskData);
    res.status(200).json(TaskData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.delete('/', async(req,res)=>{
  try {
    const response = await TaskType.destroy({
      where: {
        id:req.body.id,
      },
    })
    res.status(200).json(response);
  } catch(err){
    console.log(err);
    res.status(500).json(err);
  }
})

router.put('/', async(req,res)=>{
  try{
  const response = await TaskType.update({
    name:req.body.name,
    description:req.boy.description
  },{
    where:{
      id:req.body.id
    }
  })
  res.status(200).json(response)
  } catch(err){
    res.status(500).json(err)
  }
})

module.exports = router;