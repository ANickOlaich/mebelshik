const fs =require('fs')
const path = require('path');
const express = require('express');
const session = require('express-session');
var favicon = require('serve-favicon')
//const ejs = require('ejs');
//const exphbs = require('express-handlebars');
//const routes = require('./controllers');
const routes = require('./routes')
const helpers = require('./utils/helpers');
var bodyParser = require ('body-parser');
// const stripeSecretKey = process.env.STRIPE_SECRET_KEY
// const stripePublicKey = process.env.STRIPE_PUBLIC_KEY


const stripeSecretKey = 'sk_test_51InahGB6LddKk5YMPkuGj9mL7H5ffe87vqVfInCiku6gS0QdccGqtPdb6H2STV859p8gSgGhdoPRK2HxuM9ONCrg00lgNT3IxG'
const stripePublicKey = 'pk_test_51InahGB6LddKk5YMUfGYmn8pfJ93YWYEfdsfqeRm8pMdeHBexmIsnjibJ60ZRmaKdxCWeBQeG416YNUM0Xri2OA2009caNhR8A'

const stripe = require('stripe')('sk_test_51InahGB6LddKk5YMPkuGj9mL7H5ffe87vqVfInCiku6gS0QdccGqtPdb6H2STV859p8gSgGhdoPRK2HxuM9ONCrg00lgNT3IxG') 

const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const logger = require('./utils/logger')

const app = express();
const PORT = process.env.PORT || 3001;

//const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'ucb project 2',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

//app.engine('handlebars', hbs.engine);
//app.set('view engine', 'handlebars');

app.set('view engine' , 'ejs')
//app.set('views' , 'ejs')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger)


app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(80, () => console.log('Now listening'));
});


/*app.get('/store', function (req,res){
    
  res.render('/store')    
    
})


app.post('/charge', (req,res)=>{
 

  console.log(req.body)
  const amount = 500

  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer => stripe.charges.create({
    amount: amount,
    description: 'Card Booster Pack',
    currency:'usd',
    customer: customer.id
  }))
  .then(charge => res.render('confirmation'))

  })

*/