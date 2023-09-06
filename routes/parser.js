const router = require('express').Router();
const kronos = require('../parsers/kronas');
const owwa = require('../parsers/owwa');
const parser = require('../parsers/index')


router.post('/', async(req,res)=>{
  try {
    const data = await parser(req.body.url)
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})


module.exports = router;