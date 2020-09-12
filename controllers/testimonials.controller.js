const Testimonial = require('../models/testimonial.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const tes = await Testimonial.findOne().skip(
      Math.floor(Math.random() * count)
    );
    if (tes) {
      res.json(tes);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getId = async (req, res) => {
  try {
    const tes = await Testimonial.findById(req.params.id);
    if (tes) {
      res.json(tes);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postOne = async (req, res) => {
  try {
    if (req.body.author && req.body.text) {
      const newPost = new Testimonial({
        author: sanitize(req.body.author),
        text: sanitize(req.body.text),
      });
      await newPost.save();
      res.json({ message: 'OK', data: newPost });
    } else {
      res.json({ message: 'FAILED' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.putId = async (req, res) => {
  try {
    const tes = await Testimonial.findById(req.params.id);
    if (tes && (req.body.author || req.body.text)) {
      if (req.body.author) {
        tes.author = sanitize(req.body.author);
      }
      if (req.body.text) {
        tes.text = sanitize(req.body.text);
      }
      await tes.save();
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
    const tes = Testimonial.findById(req.params.id);
    if (tes) {
      await tes.remove();
      res.json({ message: 'OK' });
    } else {
      res.json({ message: 'FAILED' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
