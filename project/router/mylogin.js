const express = require('express')
const https = require('https')
const util = require('util')

var router = express.Router()

let cfggithub = {
    url: 'https://github.com/login/oauth/authorize',
    tokenurl: 'https://github.com/login/oauth/access_token',
    redirecturi: 'http://172.16.64.92/login/github/callback',
    clientid: 'aa1bd897e98454d5f70a',
    scope: 'user',
    secretid: '74a3381bbbad4b281e47bddb5a237761641478c2',
}

router.get('/github', (req, res) => {
    let path = util.format('%s?client_id=%s&scope=%s&redirect_uri=%s&state=%s',
        cfggithub.url, cfggithub.clientid, cfggithub.scope,
        cfggithub.redirecturi, (new Date()).valueOf())
    console.log(path)
    res.redirect(path);
})

router.get('/github/callback', (req, res) => {
    let state = req.query.state    
    
    let path = util.format('%s?client_id=%s&client_secret=%s&redirect_uri=%s&code=%s',
        cfggithub.tokenurl, cfggithub.clientid, cfggithub.secretid,
        cfggithub.redirecturi, req.query.code)
    console.log(path);

    var req = https.get(path, function (restoken) {
        restoken.setEncoding('utf8')
        console.log('get token step1 ok');
        restoken.on('data', function (data) {

            console.log('get token step2 ok');
            var args = data.split('&');
            var tokenInfo = args[0].split("=");
            var token = tokenInfo[1];
            console.log(token);

            let options = {
                method: 'GET',
                hostname: 'api.github.com',
                port: 443,
                path: '/user?access_token=' + token,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'
                }
            }
            var url = "https://api.github.com/user?access_token=" + token
            console.log(url)

            https.get(options, function (resuser) {
                resuser.on('data', function (userInfo) {
                    console.log(userInfo.toString());
                    res.write(userInfo.toString())
                });
                resuser.on('end', () => {
                    console.log('response end')
                    res.end()
                })
            }).on('error', (err) => {
                console.log(err)
                res.send('error get userinfo')
            });
        })
    }).on('error', (err) => {
        console.log(err)
        res.send('error get token')
    });
})


module.exports = router