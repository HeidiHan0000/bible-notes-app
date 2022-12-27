const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  `mongodb+srv://Heidi:heidipassword@biblenotes.z63zyxo.mongodb.net/test`, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log("Connected to DB"))
    .catch(console.error);


const DailyNote = require('./models/DailyNote.js');

app.get('/dailynotes', async (req, res) => {
  //so if we make a get request to localhost:3000/dailynotes, it will
  //find our dailynotes using our model which is connected to the 
  //mongoose DB and it will show all that it finds
  const dailyNotes = await DailyNote.find();
  res.json(dailyNotes);
});

app.post('/dailynote/new', (req, res) => {
  const dailyNote = new DailyNote({
    bodyText: req.body.bodyText, 
    category: req.body.category,
    prayers: req.body.prayers
  });
  dailyNote.save();
  res.json(dailyNote);
});

//the :id is a URL parameter - dynamic, we pass thru in the URL
app.delete('/dailynote/delete/:id', async (req, res) => {
  const result = await DailyNote.findByIdAndDelete(req.params.id);
  res.json(result);
});

app.put('/dailynote/editBody/:id', async (req, res) => {
  const dailyNote = await DailyNote.findById(req.params.id);
  if (req.body.bodyText){
    dailyNote.bodyText = req.body.bodyText;
  }
  dailyNote.save();
  res.json(dailyNote);
});

app.put('/dailynote/changeCategory/:id', async (req, res) => {
  const dailyNote = await DailyNote.findById(req.params.id);
  if (req.body.category){
    dailyNote.category = req.body.category;
  }
  dailyNote.save();
  res.json(dailyNote);
});

app.put('/dailynote/addPrayers/:id', async (req, res) => {
  const dailyNote = await DailyNote.findById(req.params.id);
  if (req.body.prayers){
    dailyNote.prayers = dailyNote.prayers.concat(req.body.prayers);
  }
  dailyNote.save();
  res.json(dailyNote);
});
//to delete, i think if the prayers list is kept in the added order
// maybe from front end we can pass the index of the prayer

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});