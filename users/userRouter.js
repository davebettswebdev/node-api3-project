const express = require('express');
const Users = require('./userDb.js')
const Posts = require('../posts/postDb.js')
const router = express.Router();
// Tested
router.post('/', validateUser,  (req, res) => {
  // do your magic!
    const newUser = req.body
    Users.insert(newUser)
      .then(user => {
        res.status(201).json(user)
      })
      .catch( err => {
        console.log(err)
        res.status(404).json({ error: "user could not be added."})
      })
});
// Tested
router.post('/:id/posts', validatePost,  (req, res) => {
  // do your magic!
  const { id } = req.params
  const newPost = {...req.body, user_id: id}
  console.log(newPost)
    Posts.insert(newPost) //the problem lies here
      .then(post => {
        res.status(201).json(post)
      })
      .catch( err => {
        console.log(err)
        res.status(404).json({ error: "post could not be added."})
      })
});
// Tested
router.get('/',  (req, res) => {
  // do your magic!
  Users.get()
  .then(users => {
    res.status(201).json(users)
  })
  .catch( err => {
    console.log(err)
    res.status(404).json({ error: "users could not be found."})
  })
});
// Tested
router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  const{ id } = req.params
  Users.getById(id)
  .then(users => {
    res.status(201).json(users)
  })
  .catch( err => {
    console.log(err)
    res.status(404).json({ err: "users could not be found."})
  })
});
// Tested
router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  const{ id } = req.params
  Users.getUserPosts(id)
  .then(users => {
    res.status(201).json(users)
  })
  .catch( err => {
    console.log(err)
    res.status(404).json({ err: "users could not be found."})
  })
  
});
router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params
  Users.remove(id)
    .then(removed => {
      console.log(removed)
      res.status(201).json({ message: `this user has been deleted`})
    })
    .catch(err => {
      res.status(404).json({ err: "couldn't delete user", err})
    })
});
router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params
  const userUpdate = req.body
  Users.update(id, userUpdate)
    .then(updated => {
      res.status(200).json(updated)
    })
    .catch(err => {
      res.status(404).json({ err: "couldn't update user", err})
    })
});
//custom middleware
// validates the user id on every request that expects a user id parameter
function validateUserId(req, res, next) {
  const { id } = req.params
  if (id){
     req.user = req.body
  } else {
    return res.status(400).json({ message: "invalid user id"});
  }
  next();
}
// validates the body on a request to create a new user
function validateUser(req, res, next) {
  // do your magic!
  if(!req.body){
    res.status(400).json({ message: "missing user data" });
 } else if (!req.body.name){
    res.status(400).json({ message: "missing required name field" });
 } else{
  next();
}
}
// validates the body on a request to create a new post
function validatePost(req, res, next) {
  // do your magic!
  if(!req.body){
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text){
    res.status(400).json({ message: "missing required text field" });
  } else{
    next();
  }
}
module.exports = router;