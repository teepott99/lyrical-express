const express    = require('express');
const router     = express.Router();

// Literature model
const Literature = require('../models/lit-model');

// Add lit to db
router.post('/lit-post', (req, res, next) => {
  const {title, author, type, text} =  req.body;
  const user = req.session.passport.user;

  const newLit = new Literature ({
    user,
    title,
    author,
    type,
    text
  });

  newLit.save((err) => {
    if (err) {
      res.status(400).json({ message: 'Something went wrong' });
      return;
    }

    req.login(newLit, (err) => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong' });
        return;
      }
      res.status(200).json(req.user);
    });
  });
});

// Get lit by id
router.get('/:id', (req, res, next) => {
  Literature.findById(req.params.id)
    .then(lit => { res.status(200).json(lit) })
    .catch(err => { res.status(500).json(err) })
});

// Update literature
router.put('/:id', (req, res, next) => {
  if(req.isAuthenticated()) {
    const litId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(litId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    const { title, author, type, text } = req.body;

    Literature.findByIdAndUpdate( litId, { title, author, type, text })
      .then(lit => {
        return res.json({ message: "Literature successfully updated" });
      })
      .catch(error => next(error));
    return;
  }

  res.status(403).json({ message: "Not Authorized" });
});




module.exports = router;