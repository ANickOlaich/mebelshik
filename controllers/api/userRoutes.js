const router = require('express').Router();
const { Card, Deck, DeckCards, Faction, User, UserCards } = require('../../models');

// Creating a new user and logging them in
router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Confirming if a user exists within the database and logging them in
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.is_admin = userData.is_admin;
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// logout destroys the session data
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single user by their id with their deck, all the cards in their deck, and all of the user's cards
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Deck,
          include: {
            model: Card,
            include: {
              model: Faction,
            },
            through: {
              model: DeckCards,
            },
          },
        },
        {
          model: Card,
          include: {
            model: Faction,
          },
          through: {
            model: UserCards,
          }
        },
      ],
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to add card to user
router.post('/addcard', async (req, res) => {
  try {
    const entryData = await UserCards.create(req.body);
    res.status(200).json(entryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;