
var express = require('express');
var router = express.Router();
const db = require('../models/index');

/* GET users listing. */
router.get('/index',(req, res, next)=> {
  db.User.findAll().then(usrs => {
    var data = {
      title: 'Users/Index',
      content: usrs
    }
    res.render('users', data);
  });
});

// ユーザ新規登録
router.get('/add',(req, res, next)=> {
  var data = {
    title: 'アカウント作成',
    form: new db.User(),
    err:null
  }
  res.render('users/add', data);
});

router.post('/add',(req, res, next)=> {
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
      res.render('users/add', data);
    })
    )
});

// ユーザログイン
router.get('/login', (req, res, next) => {
  var data = {
     title:'ログイン',
     content:'ADIDを入力下さい。'
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
        content:'ADIDに問題があります。再度入力またはアカウント作成を実施して下さい。'
      }
      res.render('users/login', data);
    }
  })
});

// 出席
// router.get('/attend',(req, res, next)=> {
//   var data = {
//     title: 'Users/Attend',
//     form: new db.User(),
//     err:null
//   }
//   res.render('users/attend', data);
// });

// router.post('/attend',(req, res, next)=> {
//   const form = {
//     number: req.body.number,
//     adid: req.body.adid,
//   };
//   db.sequelize.sync()
//     .then(() => db.User.create(form)
//     .then(usr=> {
//       res.redirect('/users')
//     })
//     .catch(err=> {
//       var data = {
//         title: 'アカウント作成',
//         form: form,
//         err: err
//       }
//       res.render('users/add', data);
//     })
//     )
// });

module.exports = router;
