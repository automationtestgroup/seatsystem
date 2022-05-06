const express = require('express');
const router = express.Router();
const db = require('../models/index');
const { Op } = require("sequelize");

// ログインのチェック
function check(req,res) {
  if (req.session.login == null) {
    req.session.back = '/';
    res.redirect('/users/login');
    return true;

  } else {
    return false;

  }
}

// トップページにページ番号をつけてアクセス
router.get('/',(req, res, next)=> {
  if (check(req,res)){ return };
  var data = {
    title: '座席表',
    login: req.session.login
  }
  res.render('index', data);
});

router.get('/getuser',(req, res, next)=> {
  if (check(req,res)){ return };
  db.User.findAll().then(users => {
    res.json(users);
  });
});

router.get('/getseat',(req, res, next)=> {
  if (check(req,res)){ return };
  db.Seat.findAll().then(seats => {
    res.json(seats);
  });
});

router.get('/getseatinfo',(req, res, next)=> {
  if (check(req,res)){ return };
  db.Seatinfo.findAll().then(infos => {
    res.json(infos);
  });
});

module.exports = router;
