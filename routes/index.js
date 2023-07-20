// PART I

// here we're going to set up all the routes for the index of the application
// for now a single route as our route

const express = require('express')
// because we use express for our entire app
const router = express.Router()
// and get the router portion of that express variable

// with that router variable, we can create our route
router.get('/', (req, res) => {
    // res.send('Hello world')
    res.render('index')
})
// use the "get" action in order to get a route
// this is going to be the very root of our app (here localhost:3000) > '/'
// and we pass it a function with 2 parameters :
    // the actual request of the request
    // the response which we're sending back
// we're just, for now sending a basic default response

// if we refresh, nothing still happens in the browser because we haven't hooked up our app to use this router (our server doesn't know yet that this router exists)

// so we import this router into our server > see server.js

// we want to export this router that we've created
module.exports = router
// now, whenever we import this file inside our app, such as in server.js, the indexRouter variable there, is going to be set to this router variable in here


