const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  res.json(db.testimonials);
});

router.get('/random', (req, res) => {
  const id = Math.floor(Math.random() * db.testimonials.length) + 1;
  res.json(db.testimonials.filter((post) => post.id == id));
});

router.get('/:id', (req, res, next) => {
  const post = db.testimonials.find((post) => post.id.toString() === req.params.id);
  if(post) {
    res.json(post);
  } else {
    res.json({ message: 'FAILED' });
  }
});

router.post('/', (req, res) => {
  if (req.body.author && req.body.text) {
    const newPost = {
      id: db.testimonials[db.testimonials.length - 1].id + 1,
      author: req.body.author,
      text: req.body.text,
    };
    db.testimonials.push(newPost);
    res.json({ message: 'OK' });
  } else {
    res.json({ message: 'FAILED' });
  }
});

router.put('/:id', (req, res) => {
  const index = db.testimonials.findIndex(
    (post) => post.id.toString() === req.params.id
  );
  if (index >= 0 && (req.body.author || req.body.text)) {
    if (req.body.author) {
      db.testimonials[index].author = req.body.author;
    }
    if (req.body.text) {
      db.testimonials[index].text = req.body.text;
    }
    res.json({ message: 'OK' });
  } else {
    res.json({ message: 'FAILED' });
  }
});

router.delete('/:id', (req, res) => {
  const index = db.testimonials.findIndex(
    (post) => post.id.toString() === req.params.id
  );
  if (index >= 0) {
    db.testimonials.splice(index, 1);
    res.json({ message: 'OK' });
  } else {
    res.json({ message: 'FAILED' });
  }
});

module.exports = router;