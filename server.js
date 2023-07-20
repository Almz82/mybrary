        // after PART I
        // simple check of our environement in order to have the correct DATABASE_URL (local during development or on internet when deploying)
        if (process.env.NODE_ENV !== 'production') {
            // if we're in developement mode, we want to load up our variables from our .env file and import them into our process.env variable in our app
            require('dotenv').config()
        }

// PART I : setting up our server

const express = require ('express')
//imports express from the express library that we installed via npm
const app = express()
// to get the app portion of that by calling this function of express
const expressLayouts = require('express-ejs-layouts')
// gets the express layouts package that we installed

    // written afer PART I : telling the server to use our router index.js
    const indexRouter = require('./routes/index')
    // ./ meaning relative to where we are

// then we configure our express app
app.set('view engine', 'ejs')
// first we set our view engine, we'll use ejs
app.set('views', __dirname + '/views')
// sets from where ours views are coming from
    // we'll put them in the "views" directory
    // __dirname > our current directory name

app.set('layout', 'layouts/layout')
// sets from where our layouts are coming from
    // the idea is that every single file is going to be put inside of this layouts file, so that we don't have to duplicate all the beginning or ending of our html files (header, footer)
app.use(expressLayouts)
// we need to tell our express app that we want to use express layouts
    // we pass "expressLayouts" variable that we imported from our library
app.use(express.static('public'))
// tells express where our public files are going to be (stylesheets, javascript, images)

        // setting up our database (we've imported mongoose to interact with mongoDB easily by running "npm i mongoose")
        const mongoose = require('mongoose') // we import mongoose from the library we've just installed
        // now we're setting up our connexion to the database
        mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })  // inside connect() we put the url for our connection, but since you never want actually to hardcode your connection, you want it to be dependant on your environement (connect to your local mongoDB server when developing, and connect to a server somewhere on the internet when deploying)
        // so here we pass a string for the url which is going to come from our environement variables
        // (process.env.DATABASE_URL, { useNewUrlParser: default }) and some options on how we want to set up mongoDB inside of our app (depending on the version of mongoDB, this may or not be set to "true" or "default") : this is just because the mongoose chain by default is using an older way of accessing data in mongoDB which is now deprecated)
        // last thing is we want to log if we're actually connected or not to our db
        const db = mongoose.connection
        db.on('error', error => console.error(error))   // print the error in red in case of an error
        db.once('open', () => console.log('Connected to Mongoose'))   // print just once, when the connection is done
        // if we run this, we have an error because our app doesn't actually the variable for this DATABASE_URL, so we need to set up that now
        // to do that we're going to use a library called dotenv which will allow us to load in environement variables into our application
        // run > npm i --save-dev dotenv      (since we only want it to be locally that we use this)
        // create the .env file inside of which we put our different variables, here : DATABASE_URL = mongodb://127.0.0.1:27017/mybrary (127.0.0.1 = localhost + port de mongodb)
        // all we need to do is tell our app to load that into it
        // on top of our server.js, a simple check of our environement





    // written after PART I : tells our application to use the router index.js
    app.use('/', indexRouter)
    // telling the route path that it's coming from (in our case the root of our app '/', and we tell what router we want to handle that route > 'indexRouter')

app.listen(process.env.PORT || 3000)
// tells the app that we want to listen on a certain port
    // process.env.PORT > is going to pull from an environement variable for when we deploy, the server is going to tell what port it is listening to, not use
    // but for development we just default this to port 3000 since the server is not telling us anything for our hosting platform
// that's all we need to get our server up and running







