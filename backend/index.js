// server.js
require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors")

const app = express();
app.use(cors())

// Middleware
app.use(bodyParser.json());

//cors
app.use(
  cors({
      origin: process.env.CLIENT_BASE_URL,
      methods: ['GET', 'POST', 'DELETE', 'PUT'],
      allowedHeaders: [
          "Content-Type",
          'Authorization',
          'Cache-Control',
          'Expires',
          'Pragma'
      ],
      credentials: true
  })
);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connection Successfull")
})

// Define Schema
const blogSchema = new mongoose.Schema({
  newTitle: String,
  newContent: String,
  date:String,
  likes:Number
});

const Blog = mongoose.model('Blog', blogSchema);

// Routes
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find({});
    console.log(blogs)
    res.send(blogs)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.patch('/api/blogs/like/:id', async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
  
      // Increment the likes of the blog post
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        { $inc: { likes: 1 } },
        { new: true } 
      );
  
      res.json(updatedBlog);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

app.post('/api/blogs', async (req, res) => {

  const blog = new Blog({
    newTitle: req.body.newTitle,
    newContent: req.body.newContent,
    date:req.body.date,
    likes:req.body.likes
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port 5000'));
