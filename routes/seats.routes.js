const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/', (req, res) => {
  res.json(db.seats);
});

router.get('/:id', (req, res, next) => {
  const post = db.seats.find((post) => post.id.toString() === req.params.id);
  if(post) {
    res.json(post);
  } else {
    res.json({ message: 'FAILED' });
  }
});

router.post('/', (req, res) => {
  if (req.body.day && req.body.seat && req.body.client && req.body.email) {
    if(db.seats.some(item => item.day === req.body.day && item.seat === req.body.seat)) {
      res.status(409).json({ message: 'The slot is already taken...' });
    } else {
      const newPost = {
        id: db.seats[db.seats.length - 1].id + 1,
        day: req.body.day,
        seat: req.body.seat,
        client: req.body.client,
        email: req.body.email,
      };
      db.seats.push(newPost);
      res.json({ message: 'OK' });
    }
  } else {
    res.json({ message: 'FAILED' });
  }
});

router.put('/:id', (req, res) => {
  const index = db.seats.findIndex(
    (post) => post.id.toString() === req.params.id
  );
  if (index >= 0 && (req.body.day || req.body.seat || req.body.client || req.body.email )) {
    if (req.body.day) {
      db.seats[index].day = req.body.day;
    }
    if (req.body.seat) {
      db.seats[index].seat = req.body.seat;
    }
    if (req.body.client) {
      db.seats[index].client = req.body.client;
    }
    if (req.body.email) {
      db.seats[index].email = req.body.email;
    }
    res.json({ message: 'OK' });
  } else {
    res.json({ message: 'FAILED' });
  }
});

router.delete('/:id', (req, res) => {
  const index = db.seats.findIndex(
    (post) => post.id.toString() === req.params.id
  );
  if (index >= 0) {
    db.seats.splice(index, 1);
    res.json({ message: 'OK' });
  } else {
    res.json({ message: 'FAILED' });
  }
});

module.exports = router;
