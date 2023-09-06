const router = require('express').Router();
const { Card, Deck, DeckCards, Faction, User, UserCards } = require('../../models');

// Get all Factions
router.get('/', async (req, res) => {
  try {
    const factionData = await Faction.findAll();
    res.status(200).json(factionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get faction by id and all cards related to the faction
router.get('/:id', async (req, res) => {
  try {
    const factionData = await Faction.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Card,
      },
    });
    res.status(200).json(factionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to add a faction to the database
router.post('/', async (req, res) => {
  try {
    const entryData = await Faction.create(req.body);
    res.status(200).json(entryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;