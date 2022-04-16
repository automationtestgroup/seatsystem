const express = require('express');
const router = express.Router();
const db = require('../models/index');
const { Op } = require("sequelize");

const pnum = 10;

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
    db.Seat.findAll().then(seats => {
      var data = {
        title: '座席表',
        content: seats,
        login: req.session.login
      }
      res.render('index', data);
    });
});
module.exports = router;
