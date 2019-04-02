const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const GitHubStrategy = require('passport-github2').Strategy
const passportjwt = require('passport-jwt')

var router = express.Router()
var secretOrPrivateKey = 'this is my name'

passport.use(
    new GitHubStrategy({
        clientID: 'aa1bd897e98454d5f70a',
        clientSecret: '74a3381bbbad4b281e47bddb5a237761641478c2',
        callbackURL: 'http://172.16.64.92:8080/login/github/callback'
    },
        (accessToken, refreshToken, profile, done) => {
            console.log(accessToken, refreshToken)
            //console.log(profile)
            process.nextTick(function () {
                // To keep the example simple, the user's GitHub profile is returned to
                // represent the logged-in user.  In a typical application, you would want
                // to associate the GitHub account with a user record in your database,
                // and return that user instead.
                return done(null, profile);
            })
        })
)

router.get('/github', passport.authenticate('github',
    { scope: ['user:email'], state:new Date().getTime()})
)

router.get('/github/callback',
    passport.authenticate('github', { session: false, failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication
        //{"id":"5762153","displayName":"wangxiaohui","username":"wangdxh","profileUrl":"
        res.json({
            id: req.user.id,
            displayName: req.user.displayName,
            id: req.user.id,
            username: req.user.username,
            profileUrl: req.user.profileUrl,
            token: sign(req.user.displayName, req.user.id)
        })
    });

router.get('/', (req, res) => {
    res.send('this is login html, <a href="/login/github">github</a>')
})

//------------------------------jwt

function sign(name, id) {
    return jwt.sign({ name: name, id: id }, secretOrPrivateKey, { expiresIn: 120 * 1 })
}

router.get('/jwt', (req, res) => {
    if (!req.query.uname || !req.query.upwd) {
        res.send('error')
        return
    }
    let token = sign(req.query.uname, '22345676')
    console.log(token)
    res.json({ token })
})

let JwtStrategy = passportjwt.Strategy
let ExtractJwt = passportjwt.ExtractJwt

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromUrlQueryParameter('token')
opts.secretOrKey = secretOrPrivateKey
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    console.log('in get user', jwt_payload);
    done(null, jwt_payload)
}))

module.exports = { router, passport }