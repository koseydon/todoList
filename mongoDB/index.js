const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = require('express')();
var cors = require('cors')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors());

// connect to Mongo daemon
mongoose
  .connect(
    'mongodb://localhost:27017/',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// DB schema
const ItemSchema = new mongoose.Schema({
  title: String,
  content: String,
  due: String,
  status: String,
  person: String
});

Item = mongoose.model('item', ItemSchema);
mongoose.set('useFindAndModify', false);

//Post route
app.post('/add', (req, res) => {
  console.log(req.body)
  const newItem = new Item({
    title: req.body.title,
    content: req.body.content,
    due: req.body.due,
    status: req.body.status,
    person: req.body.person
  });

  newItem.save()
    .then(item => console.log(item));
  res.json({ success: true });
});

//Get route
app.get('/item', (req, res) => {
  Item.find().then(items => res.json(items));
});

//Get route for single item
app.get('/single-item/:id', (req, res) => {
  Item.findById(req.params.id).then(items => res.json(items));
});

//Put route
app.put('/item/:id', (req, res) => {
  Item.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function (item) { });
  res.send({ success: true });
});

//Delete route
app.delete('/item/:id', (req, res) => {
  Item.findByIdAndRemove({ _id: req.params.id }).then(function (item) { });
  res.send({ success: true });
});

const port = 3000;
app.listen(port, () => console.log('Server running...'));
