const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const igdbRoutes = require('./igdb')


router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/igdb', igdbRoutes);

module.exports = router;
