const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    const seats = await Seat.find();
    res.json(seats);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getId = async (req, res, next) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (seat) {
      res.json(seat);
    } else {
      res.json({ message: 'FAILED' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postOne = async (req, res) => {
  if (req.body.day && req.body.seat && req.body.client && req.body.email) {
    try {
      if (await Seat.findOne({ day: req.body.day, seat: req.body.seat })) {
        res.status(409).json({ message: 'The slot is already taken...' });
      } else {
        const newSeat = new Seat({
          day: req.body.day,
          seat: req.body.seat,
          client: req.body.client,
          email: req.body.email,
        });
        await newSeat.save();
        const seats = await Seat.find();
        req.io.emit('seatsUpdated', seats);
        res.json({ message: 'OK' });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  } else {
    res.json({ message: 'FAILED' });
  }
};

exports.putId = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (
      seat &&
      (req.body.day || req.body.seat || req.body.client || req.body.email)
    ) {
      if (req.body.day) {
        seat.day = req.body.day;
      }
      if (req.body.seat) {
        seat.seat = req.body.seat;
      }
      if (req.body.client) {
        seat.client = req.body.client;
      }
      if (req.body.email) {
        seat.email = req.body.email;
      }
      await seat.save();
      res.json({ message: 'OK' });
    } else {
      res.json({ message: 'FAILED' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteId = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (seat) {
      seat.remove();
      res.json({ message: 'OK' });
    } else {
      res.json({ message: 'FAILED' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
