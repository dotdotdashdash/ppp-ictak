require('dotenv/config');
const express = require(`express`);
const cors = require(`cors`);
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const authRouter = require(`./src/routes/auth-router`);
const adminRouter = require(`./src/routes/admin-router`);
const partnerRouter = require('./src/routes/partner-router');
const financeRouter = require('./src/routes/finance-router')

const app = new express();

const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI;
// const MONGODB_URI = 'mongodb://localhost:27017/partner-payments'

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((succ)=>{
  mongoDbServer = (MONGODB_URI == 'mongodb://localhost:27017/partner-payments')? 'Local' : 'Atlas'
  console.log(`MongoDB ${mongoDbServer} connected!`);
}).catch((err)=> {
  console.log(`MongoDB connection error! Can't connect`);
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyparser.urlencoded({ extended:true }));

//for work order pdf generation
app.set('views','./src/assets/work-orders/template-files/');
app.set('view engine','ejs'); 
app.use(express.static(path.join(__dirname , '/src/assets/work-orders/template-files/')));

//for hosting
app.use(express.static('./dist/partner-payments-ictak-frontend'));

app.use(`/api/auth`, authRouter);
app.use(`/api/admin`, adminRouter);
app.use(`/api/partner`, partnerRouter);
app.use(`/api/finance`, financeRouter);

app.get('/*', (req, res)=> {
  console.log(path.join(__dirname, './dist/partner-payments-ictak-frontend'));
  res.sendFile(path.join(__dirname, './dist/partner-payments-ictak-frontend'));
});

app.listen(PORT, ()=> {
  console.log(`Hi, I'm listening at ${PORT}`);
});