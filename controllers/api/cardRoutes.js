const router = require('express').Router();
const { Card, Deck, DeckCards, Faction, User, UserCards } = require('../../models');

// Get all Cards
router.get('/', async (req, res) => {
  try {
    const cardData = await Card.findAll({
      include: {
        model: Faction,
      },
    });
    res.status(200).json(cardData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get card data by id
router.get('/:id', async (req, res) => {
  try {
    const cardData = await Card.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Faction,
      },
    });
    res.status(200).json(cardData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to add card to the database
router.post('/', async (req, res) => {
  try {
    const entryData = await Card.create(req.body);
    res.status(200).json(entryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to add card to deck
router.post('/todeck', async (req, res) => {
  try {
    const entryData = await DeckCards.create(req.body);
    res.status(200).json(entryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to add card to user
router.post('/touser', async (req, res) => {
  try {
    const entryData = await UserCards.create(req.body);
    res.status(200).json(entryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;