const express = require('express')
const app = express()
const ClubEvent=require("./models/Clubs")
const mongoose = require('mongoose');
const cors = require('cors')
const passport = require('passport');
const cookieSession = require('cookie-session')
require('dotenv').config()
require('./passport-setup.js');
const bodyParser = require('body-parser')
app.use(cors())
app.use(express.static("public"))
app.set("view engine","ejs")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/ClubEvent', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  var db = mongoose.connection;

  db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))



app.get('/registraion/:id',()=>{
res.render(req.params.id)
})

app.post('/registraion',async(req,res)=>{
    try{ 

     let events=new ClubEvent({
          clubname:req.body.clubname,
          image:req.body.image,
          title:req.body.title,
          description:req.body.description,
          venue:req.body.venue,
          date:req.body.date,
          time:req.body.time,
       })
   events= await events.save();
       res.status(201).render("events",{events:events});
    }catch(error){
       res.status(400).send(error);
    }
 })

app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }))


const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.render("index.ejs"))
app.get('/failed', (req, res) => res.send('You Failed to log in!'))

// In this route you can see that if the user is logged in u can acess his info in: req.user
app.get('/good', isLoggedIn, (req, res) =>{
let pq=req.user.displayName
    res.render("chitram2.ejs",{pq:pq})
});


// Auth Routes
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    res.redirect('/good');
  }
);

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})


app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/clickev/register",(req,res)=>{
    res.render("rrr");
})


app.get("/registraion",(req,res)=>{
    res.render("registration")
})

app.get("/clickev",(req,res)=>{
    res.render("clickev")
})


app.get('/clubs', (req, res) => {
    res.render('clubs.ejs');
  });
  
app.get('/faqs', (req, res) => {
    res.render('faqs.ejs');
  });

  app.get('/clubs/prayatnam', (req, res) => {
    res.render('prayatnam.ejs');
  });
  
app.get('/clubs/chitram', (req, res) => {
    res.render('chitram.ejs');
  });
 app.get('/clubs/csea', (req, res) => {
    res.render('csea.ejs');
  });
  
  app.get('/clubs/physical-education', (req, res) => {
    res.render('physical-education.ejs');
  });
  
 app .get('/clubs/ee-association', (req, res) => {
    res.render('ee-association.ejs');
  });
  
  // app.get('/events', (req, res) => {
  //   res.render('events.ejs');
  // })

  // app.get('/events', async (req, res) => {
  //   try {
  //     const events = await ClubEvent.find({});
  //     res.render('events', { events });
  //   } catch (error) {
  //   res.render("events2");
  //   }
  // });
  

  app.get("/events",(req,res)=>{
    ClubEvent.find({}, (err, events) => {
        if (err) {
            console.log(err);
        } else {
            res.render("events", { events: events });
        }
    });
})










app.listen(3000, () => console.log(`Example app listening on por`))

