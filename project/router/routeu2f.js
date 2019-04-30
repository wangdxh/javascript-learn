const express = require('express')

// from https://github.com/ashtuchkin/u2f
const u2f = require('../u2f')

var APP_ID = "https://172.16.64.92:4430"


var router = express.Router()

var one_user_registerrequest = {};
var one_user_publickey = {};
var one_user_keyhandler = {};
var one_user_authrequest = {};

router.get('/reg', (req, res) => {
    const registrationRequest = u2f.request(APP_ID);
    // by wxh req.session.registrationRequest = registrationRequest;
    one_user_registerrequest = registrationRequest;
    // 3. Send the registration request to the client, who will use the Javascript U2F API to sign
    // the registration request, and send it back to the server for verification. The registration
    // request is a JSON object containing properties used by the client to sign the request.
    return res.json({registrationRequest});
})

router.post('/reg', (req, res) => {
    // 4. Verify the registration response from the client against the registration request saved
    // in the server-side session.
    const result = u2f.checkRegistration(one_user_registerrequest, req.body.registrationResponse);

    if (result.successful) {
        // Success!
        // Save result.publicKey and result.keyHandle to the server-side datastore, associated with
        // this user.
        one_user_publickey = result.publicKey
        one_user_keyhandler = result.keyHandle
    }

    // result.errorMessage is defined with an English-language description of the error.
    return res.json({ result });
})

router.get('/auth', (req, res) => {
     // 1. Check that the user is logged in using password authentication.

  // 2. Fetch the user's key handle from the server-side datastore. This field should have been
  // saved after the registration procedure.
  const keyHandle = one_user_keyhandler

  // 3. Generate an authentication request and save it in the session. Use the same app ID that
  // was used in registration!
  const authRequest = u2f.request(APP_ID, keyHandle);
  one_user_authrequest = authRequest
  //req.session.authRequest = authRequest;

  // 4. Send the authentication request to the client, who will use the Javascript U2F API to sign
  // the authentication request, and send it back to the server for verification.
  return res.json({authRequest});
})

router.post('/auth', (req, res) => {
     // 5. Fetch the user's public key from the server-side datastore. This field should have been
  // saved after the registration procedure.
  const publicKey = one_user_publickey

  // 6. Verify the authentication response from the client against the authentication request saved
  // in the server-side session.
  const result = u2f.checkSignature(one_user_authrequest, req.body.authResponse, publicKey);

  if (result.successful) {
    // Success!
    // User is authenticated.
    // send jwt token    
  }

  // result.errorMessage is defined with an English-language description of the error.
  return res.json(result);
})


module.exports = router