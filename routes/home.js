const router = require('express').Router();
const { User, Project, Task } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  const dataProjects = await Project.findAll({
    where:{
      public:true
    },
  });
  console.log(dataProjects);
    try {
      res.render('index', {
        logged_in: req.session.logged_in,
        is_admin: req.session.is_admin,
        title:"Главная",
        projects:dataProjects
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.get('/3d-test', async (req, res) => {
    try {
      res.render('3d-test', {
        logged_in: req.session.logged_in,
        is_admin: req.session.is_admin,
        title:"3D test"
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/my-projects',withAuth, async (req, res) => {
    try {
      res.render('my-projects', {
        userId:req.session.user_id,
        logged_in: req.session.logged_in,
        is_admin: req.session.is_admin,
        title:"Мои проекты"
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/project/:id',withAuth, async (req, res) => {
    const id=req.params.id
    try {
      res.render('project', {
        projectData:await Project.findByPk(id),
        userId:req.session.user_id,
        logged_in: req.session.logged_in,
        is_admin: req.session.is_admin,
        title:"Проект"
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/tasks/:id',withAuth, async (req, res) => {
    const id=req.params.id
    try {
      res.render('tasks', {
        projectData:await Project.findByPk(id),
        userId:req.session.user_id,
        logged_in: req.session.logged_in,
        is_admin: req.session.is_admin,
        title:"Тех задания"
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/auth', (req, res) => {
    // if the session confirms that the user is logged in redirect to the homepage
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('auth',{
        logged_in: req.session.logged_in,
        is_admin: req.session.is_admin,
        title:"Авторизация"
    });
  });

  router.get('/registration', (req, res) => {
    // if the session confirms that the user is logged in redirect to the homepage
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('registration',{
        logged_in: req.session.logged_in,
        is_admin: req.session.is_admin,
        title:"Авторизация",
        message:''
    });
  });

// render homepage
/*
router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render the user's collection page
router.get('/collection', withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        id: req.session.user_id,
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
    const user = userData.get({ plain: true });
    res.render('collection', {
      user,
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render the admin page
/*
router.get('/admin', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll();
    const deckData = await Deck.findAll();
    const cardData = await Card.findAll();

    const users = userData.map(user => user.get({plain: true}));
    const decks = deckData.map(deck => deck.get({ plain: true }));
    const cards = cardData.map(card => card.get({ plain: true }));

    res.render('admin', {
      users,
      decks,
      cards,
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});*/
/*
// Render login screen
router.get('/auth', (req, res) => {
  // if the session confirms that the user is logged in redirect to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('auth');
});

// Confirmation screen
router.get('/confirmation', withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        id: req.session.user_id,
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
    const user = userData.get({ plain: true });
    res.render('confirmation', {
      user,
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Card Creation Screen
router.get('/create', withAuth, async (req, res) => {
  try {
    res.render('create', {
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Deck view screen
router.get('/deck', withAuth, async (req, res) => {
  try {
    const userData = await User.findOne(
      {
        where: {
          id: req.session.user_id,
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
      }
    );
    const user = userData.get({ plain: true });
    res.render('deck', {
      user,
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// game play screen
router.get('/play', withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        id: req.session.user_id,
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
    const user = userData.get({ plain: true });
    res.render('play', {
      user,
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Store render screen
router.get('/store', withAuth, async (req, res) => {
  try {
    const factionData = await Faction.findAll({
      include: {
        model: Card,
      },
    });
    const factions = factionData.map(faction => faction.get({ plain: true }));
    res.render('store', {
      factions,
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
*/
module.exports = router;