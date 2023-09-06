const router = require('express').Router();
const cardRoutes = require('./cardRoutes');
const deckRoutes = require('./deckRoutes');
const factionRoutes = require('./factionRoutes');
const userRoutes = require('./userRoutes');

router.use('/cards', cardRoutes);
router.use('/decks', deckRoutes);
router.use('/factions', factionRoutes);
router.use('/users', userRoutes);

module.exports = router;