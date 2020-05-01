const router = require('express').Router();
let User = require('../models/user.model');

//get users list
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// add user
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const dob = req.body.dob;

  const newUser = new User({
    username,
    description,
    dob,
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//update user
router.route('/update/:id').post((req, res) => {
  User.findById(req.params.id)
  .then(user => {
    user.username = req.body.username;
    user.description = req.body.description;
    user.dob = Date.parse(req.body.dob);

    user.save()
    .then(() => res.json('user updated!'))
    .catch((err) => res.status(400).json('error :' + err))
  })
  .catch((err) => res.status(400).json('error :' + err))
})

//delete user
router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('username Deleted!'))
    .catch((err) => res.status(400).json('error :' + err))
})

//fetch user
router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then((username) => res.json(username))
    .catch((err) => res.status(400).json('error :' + err))
})

module.exports = router;