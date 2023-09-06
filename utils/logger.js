const colors = require('colors')

const logger = (req,res,next)=>{
    console.log(colors.bgGreen.black(`ReqURL:${req.originalUrl}`))
    next()
}

module.exports = logger