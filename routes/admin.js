var express = require('express');
var router = express.Router();
const db = require('../models/index');

// 管理者ログインチェック
function check(req,res) {
  if (req.session.login.status == null) {
    req.session.back = '/';
    res.redirect('/');
    return true;

  } else {
    return false;

  }
}

router.get('/index', (req, res, next) => {
  if (check(req,res)){ return };
    var data = {
       title:'管理者ページ',
       content: req.session.login.status
    }
    res.render('admin', data);
  });

module.exports = router;