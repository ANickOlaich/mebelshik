const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect('/auth');
  } else {
    next();
  }
};

module.exports = withAuth;