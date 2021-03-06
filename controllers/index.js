const router = require('express').Router();
const apiRoutes = require('./api/api-routes');
const homeRoutes = require('./home-routes');
const userRoutes = require('./user-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/user-page', userRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;