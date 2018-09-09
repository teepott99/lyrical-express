const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
// const ensureLogin = require("connect-ensure-login");

// Literature model
const Literature = require('../models/lit-model');

// Add lit to db
router.post('/', (req, res, next) => {
  const {user, title, author, type, text, notes} =  req.body;
  // const user = req.passport.user;
  // console.log("user", user);

  // if (!title || !author || !text) {
  //   res.status(400).json({ message: 'Please fill in all fields.' });
  //   return;
  // }

  const newLit = new Literature ({
    user,
    title,
    author,
    type,
    text,
    notes
  });

  newLit.save((err) => {
    if (err) {
      res.status(400).json({ message: 'Something went wrong', err });
      return;
    }

    req.login(newLit, (err) => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong', err });
        return;
      }
      res.status(200).json(lit);
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