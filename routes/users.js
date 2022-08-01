var express = require('express');
var router = express.Router();

var uid2 = require('uid2');
var bcrypt = require('bcrypt');

// var uid2 = require('uid2')
// var bcrypt = require('bcrypt');

var userModel = require('../models/users')
//-------ROUTE SIGN-UP - POST
//DONNEES d'ENTREE: req.body.emailFromFront, req.body.usernameFromFront, req.body.passwordFromFront
//DONNEES DE SORTIE: {user : avatar, username,token, description, premium status}
// Copier collé correction Mornings News Part 4



//-------------------------------------------------route sign up-----------------------------------------------
router.post('/sign-up', async function (req, res, next) {
  //ajouter une verification d'unicité du username cf code Dylan

  //pour envoyer les messages d'err
  var error = []
  //pour dire si l'utilisater est connecter ou pas 
  var result = false
  //pour verifier si l'utilisateur est enregistrer en BDD
  var saveUser = null
  var username
  //pour avoir un token unique
  var token = null

  //verifier qu'un utilisateur n'a pas le mail deja dans la BDD --------------
  const data = await userModel.findOne({
    email: req.body.emailFromFront
  })
  if (data != null) {
    error.push('utilisateur déjà présent')
  }
  //-------------------------------------------------------------------
  
  //verifier que les champs de saisie sont pas vide
  if (req.body.usernameFromFront == ''
    || req.body.emailFromFront == ''
    || req.body.passwordFromFront == ''
  ) {
    error.push('champs vides')
  }
  console.log(req.body.passwordFromFront);
  console.log(req.body.confirmPasswordFromFront);
  
  if (req.body.passwordFromFront != req.body.confirmPasswordFromFront) {
    error.push('les deux mot de passe sont pas bon')
  }

  //pour cree un nouvelle utilisateur dans la BDD
  if (error.length == 0) {
    //hasher le mot de passe 
    var hash = bcrypt.hashSync(req.body.passwordFromFront, 10);
    var newUser = new userModel({
      username: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      password: hash,
      token: uid2(32),
    })


    //enregistrer l'utilisateur en BDD
    saveUser = await newUser.save()

    //si l'utilisateur est bien enregistrer dans la BDD alors l'utilisateur est connecter (le result)
    if (saveUser) {
      result = true
      username = saveUser.username
      token = saveUser.token
    }
  }

  res.json({ result, error, token ,username,})
})

//-------ROUTE SIGN-IN
//DONNEES d'ENTREE: req.body.emailFromFront, req.body.passwordFromFront
//DONNEES DE SORTIE: {user : avatar, username,token, description, premium status}


//-------------------------------------------------route sign in-----------------------------------------------
router.post('/sign-in', async function (req, res, next) {

  var result = false
  var user = null
  var error = []
  var token = null

  if (req.body.emailFromFront == ''
    || req.body.passwordFromFront == ''
  ) {
    error.push('champs vides')
  }

  if (error.length == 0) {
    user = await userModel.findOne({
      email: req.body.emailFromFront,
    })

    //si user est dans la BDD (l'utilisateur est bien la)
    if (user) {
      //si le mot de passe est bon l'utilisateur est la (et result est true)
      if (bcrypt.compareSync(req.body.passwordFromFront, user.password)) {
        result = true
        token = user.token
        //sinon le mot de pas est incorrect 
      } else {
        result = false
        error.push('mot de passe incorrect')
      }
      //sinon l'utilisateur est pas dans la BDD du coup email incorrect
    } else {
      error.push('email incorrect')
    }
  }

  res.json({ result, user, error, token })
})



module.exports = router;
