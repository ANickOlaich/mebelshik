const router = require('express').Router();
const withAuth = require('../utils/auth');

const apiRoutes = require('./api');
const homeRoutes = require('./home');
const adminRoutes = require('./admin')
const userRoutes = require('./userRoutes')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/admin',withAuth,adminRoutes);
router.use('/user',userRoutes)

module.exports = router;