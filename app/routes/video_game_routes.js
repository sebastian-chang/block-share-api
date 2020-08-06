// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for Video Games
const VideoGame = require('../models/videoGame')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
const videoGame = require('../models/videoGame')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /video-games
router.get('/video-games', requireToken, (req, res, next) => {
  VideoGame.find()
    .then(videoGames => {
      // `videoGames` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return videoGames.map(videoGame => videoGame.toObject())
    })
    // respond with status 200 and JSON of the video games
    .then(videoGames => res.status(200).json({ videoGames: videoGames }))
    // if an error occurs, pass it to the handler
    .catch(next)
})
// INDEX for specific issue
// GET /video-games-user 
router.get('/video-games-user', requireToken, (req, res, next) => {
  VideoGame.find({owner: req.user.id})
    .then(videoGames => {
      // `videoGames` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return videoGames.map(videoGame => videoGame.toObject())
    })
    // respond with status 200 and JSON of the video games
    .then(videoGames => res.status(200).json({ videoGames: videoGames }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /video-games/5a7db6c74d55bc51bdf39793
router.get('/video-games/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  VideoGame.findById(req.params.id).populate('owner')
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "video game" JSON
    .then(videoGame => res.status(200).json({ videoGame: videoGame.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /video-games
router.post('/video-games', requireToken, (req, res, next) => {
  // set owner of new video game to be current user
  req.body.videoGame.owner = req.user.id

  VideoGame.create(req.body.videoGame)
    // respond to succesful `create` with status 201 and JSON of new "example"
    .then(videoGame => {
      console.log(videoGame)
      res.status(201).json({ videoGame: videoGame.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
// PATCH /video-games/5a7db6c74d55bc51bdf39793
router.patch('/video-games/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.videoGame.owner

  VideoGame.findById(req.params.id)
    .then(handle404)
    .then(videoGame => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, videoGame)

      // pass the result of Mongoose's `.update` to the next `.then`
      return videoGame.updateOne(req.body.videoGame)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /video-games/5a7db6c74d55bc51bdf39793
router.delete('/video-games/:id', requireToken, (req, res, next) => {
  VideoGame.findById(req.params.id)
    .then(handle404)
    .then(videoGame => {
      // throw an error if current user doesn't own `video games`
      requireOwnership(req, videoGame)
      // delete the video game ONLY IF the above didn't throw
      videoGame.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
