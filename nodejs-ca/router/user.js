const express = require('express')

var router = express.Router()

const tokens = {
    admin: {
      token: 'admin-token'
    },
    editor: {
      token: 'editor-token'
    }
}

const users = {
    'admin-token': {
      roles: ['admin'],
      introduction: 'I am a super administrator',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'Super Admin'
    },
    'editor-token': {
      roles: ['editor'],
      introduction: 'I am an editor',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'Normal Editor'
    }
}

router.post('/login', (req, res)=>{
    let token = tokens[req.body.username];
    return res.json({
        code: 20000,
        data: token
    });
})

router.get('/info', (req, res)=>{
    let info = users[req.query.token]
    return res.json({
        code: 20000,
        data: info
      })
})

router.post('/logout', (req, res)=>{
    return res.json({
        code: 20000,
        data: 'success'
      })
})



module.exports = router