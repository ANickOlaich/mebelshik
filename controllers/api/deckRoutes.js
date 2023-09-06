const router = require('express').Router();
const { Card, Deck, DeckCards, Faction, User, UserCards } = require('../../models');

// Get all Decks and their cards
router.get('/', async (req, res) => {
  try {
    const deckData = await Deck.findAll({
      include: {
        model: Card,
        include: {
          model: Faction,
        },
        through: {
          model: DeckCards,
        },
      }
    });
    res.status(200).json(deckData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a Deck by its id and its cards
router.get('/:id', async (req, res) => {
  try {
    const deckData = await Deck.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Card,
        include: {
          model: Faction,
        },
        through: {
          model: DeckCards,
        },
      }
    });
    res.status(200).json(deckData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to add card to deck
router.post('/addcard', async (req, res) => {
  try {
    const entryData = await DeckCards.create(req.body);
    res.status(200).json(entryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to delete card from deck
router.delete('/removecard', async (req, res) => {
  try {
    const relationData = await DeckCards.findOne({
      where: {
        deck_id: req.body.deck_id,
        card_id: req.body.card_id
      }
    });
    await relationData.destroy();
    res.status(200).json(relationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;