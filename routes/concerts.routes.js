const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/', (req, res) => {
  res.json(db.concerts);
});

router.get('/:id', (req, res, next) => {
  const post = db.concerts.find((post) => post.id.toString() === req.params.id);
  if(post) {
    res.json(post);
  } else {
    res.json({ message: 'FAILED' });
  }
});

router.post('/', (req, res) => {
  if (req.body.performer && req.body.genre  && req.body.price && req.body.day && req.body.image) {
    const newPost = {
      id: db.concerts[db.concerts.length - 1].id + 1,
      performer: req.body.performer,
      genre: req.body.genre,
      price: req.body.price,
      day: req.body.day,
      image: req.body.image,
    };
    db.concerts.push(newPost);
    res.json({ message: 'OK' });
  } else {
    res.json({ message: 'FAILED' });
  }
});

router.put('/:id', (req, res) => {
  const index = db.concerts.findIndex(
    (post) => post.id.toString() === req.params.id
  );
  if (index >= 0 && (req.body.performer || req.body.genre  || req.body.price || req.body.day || req.body.image)) {
    if (req.body.performer) {
      db.concerts[index].performer = req.body.performer;
    }
    if (req.body.genre) {
      db.concerts[index].genre = req.body.genre;
    }
    if (req.body.price) {
      db.concerts[index].price = req.body.price;
    }
    if (req.body.day) {
      db.concerts[index].day = req.body.day;
    }
    if (req.body.image) {
      db.concerts[index].image = req.body.image;
    }
    res.json({ message: 'OK' });
  } else {
    res.json({ message: 'FAILED' });
  }
});

router.delete('/:id', (req, res) => {
  const index = db.concerts.findIndex(
    (post) => post.id.toString() === req.params.id
  );
  if (index >= 0) {
    db.concerts.splice(index, 1);
    res.json({ message: 'OK' });
  } else {
    res.json({ message: 'FAILED' });
  }
});

module.exports = router;
