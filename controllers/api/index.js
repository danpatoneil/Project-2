const router = require('express').Router();
const userRoutes = require('./userRoutes');
const friendRoutes = require('./friendRoutes');
const partyRoutes = require('./partyRoutes');
const hardwareRoutes = require('./hardwareRoutes');

router.use('/users', userRoutes);
router.use('/friends', friendRoutes);
router.use('/parties', partyRoutes);
router.use('/hardware', hardwareRoutes);

module.exports = router;
