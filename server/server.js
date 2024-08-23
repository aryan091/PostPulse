const express = require('express')
const app = express()
const mongoose = require("mongoose");
const path = require('path');


const userRoute = require('./src/routes/user.routes')
const postRoute = require('./src/routes/post.routes')
const commentRoute = require('./src/routes/comment.routes')

const dotenv = require('dotenv').config()
const bodyParser = require("body-parser");
const cors = require("cors");

const port = process.env.PORT || 3000

app.use(cors());
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/user",userRoute)
app.use("/api/v1/post",postRoute)
app.use("/api/v1/comment",commentRoute)

app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/health', (req, res) => {
    res.json({ 
        service:'Backend VerseVault Server',
        status:'ACTIVE',
        time:new Date() 
})
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'path/to/index.html'));
});


app.listen(port, () => {
  mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log(`Server is up on ${process.env.PORT} :)`))
      .catch((error) => console.log(error));
  });