
var express = require('express');
const { status } = require('express/lib/response');
var router = express.Router();
const db = require('../models/index');

/* GET users listing. */
router.get('/index',(req, res, next)=> {
  db.User.findAll().then(usrs => {
    var data = {
      title: 'ユーザ情報',
      content: usrs
    }
    res.render('users', data);
  });
});

// ユーザ新規登録
router.get('/register',(req, res, next)=> {
  var data = {
    title: 'アカウント作成',
    form: new db.User(),
    err:null
  }
  res.render('users/register', data);
});

router.post('/register',(req, res, next)=> {
  const form = {
    adid: req.body.adid,
    name: req.body.name
  };
  db.sequelize.sync()
    .then(() => db.User.create(form)
    .then(usr=> {
      res.redirect('/users/login')
    })
    .catch(err=> {
      var data = {
        title: 'アカウント作成',
        form: form,
        err: err
      }
      res.render('users/register', data);
    })
    )
});

// ユーザログイン
router.get('/login', (req, res, next) => {
  var data = {
     title:'ログイン',
     content:'UserIDを入力してください'
  }
  res.render('users/login', data);
});

router.post('/login', (req, res, next) => {
  db.User.findOne({
    where:{
      adid:req.body.adid
    }
  }).then(usr=>{
    if (usr != null) {
      req.session.login = usr;
      let back = req.session.back;
      if (back == null){
        back = '/';
      }
      res.redirect(back);
    } else {
      var data = {
        title:'ログイン',
        content:'UserIDに問題があります。再度入力またはアカウント作成を実施して下さい。'
      }
      res.render('users/login', data);
    }
  })
});

// addによるレコードの作成
router.get('/add',(req, res, next)=> {
  var data = {
    title: 'ユーザ登録',
    form: new db.User(),
    err:null
  }
  res.render('users/add', data);
});

router.post('/add',(req, res, next)=> {
  const form = {
    adid: req.body.adid,
    name: req.body.name,
    status: req.body.status
  };
  db.sequelize.sync()
    .then(() => db.User.create(form)
    .then(usr=> {
      res.redirect('/users/index')
    })
    .catch(err=> {
      var data = {
        title: 'ユーザ登録',
        form: form,
        err: err
      }
      res.render('users/add', data);
    })
    )
});

// editによるレコードの編集
router.get('/edit',(req, res, next)=> {
  db.User.findByPk(req.query.id)
  .then(usr => {
    var data = {
      title: 'ユーザ編集',
      form: usr,
      err:null
    }
    res.render('users/edit', data);
  });
});

router.post('/edit',(req, res, next)=> {
  db.User.findByPk(req.body.id)
  .then(usr => {
    usr.adid = req.body.adid,
    usr.name = req.body.name,
    usr.status = req.body.status
    usr.save().then(()=>res.redirect('/users/index'))
    .catch(err=> {
      var data = {
        title: 'ユーザ編集',
        form: usr,
        err: err
      }
      res.render('users/edit', data);
    })
  });
});

// deleteによるレコードの削除
router.get('/delete',(req, res, next)=> {
  db.User.findByPk(req.query.id)
  .then(usr => {
    var data = {
      title: 'ユーザ削除',
      form: usr
    }
    res.render('users/delete', data);
  });
});

router.post('/delete',(req, res, next)=> {
  db.User.findByPk(req.body.id)
  .then(usr => {
    usr.destroy().then(()=>res.redirect('/users/index'));
  });
});

module.exports = router;
