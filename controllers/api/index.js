const router = require('express').Router();
const userRoutes = require('./userRoutes');
const friendRoutes = require('./friendRoutes');
// const partyRoutes = require('./partyRoutes');
// const controllerRoutes = require('./controllerRoutes');
// const gameUserRoutes = require('./gameUserRoutes');
// // const controllerUserRoutes = require('./controllerUserRoutes');
// const consoleControllerRoutes = require('./consoleControllerRoutes');

router.use('/users', userRoutes);
router.use('/friends', friendRoutes);
// router.use('/parties', partyRoutes);
// router.use('/controllers', controllerRoutes);
// router.use('/gameUsers', gameUserRoutes);
// // router.use('/controllerUsers', controllerUserRoutes);
// router.use('/consoleControllers', consoleControllerRoutes);

module.exports = router;
