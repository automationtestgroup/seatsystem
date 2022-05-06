var express = require('express');
var router = express.Router();
const db = require('../models/index');
const seatinfo = require('../models/seatinfo');

/* GET seats listing. */
router.get('/index',(req, res, next)=> {
  db.Seat.findAll().then(seats => {
    var data = {
      title: '座席一覧',
      content: seats
    }
    res.render('seats', data);
  });
});

// 座席表＿ユーザ
router.get('/index_user',(req, res, next)=> {
  db.Seat.findAll().then(seats => {
    var data = {
      title: '座席一覧',
      content: seats
    }
    res.render('seats/index_user', data);
  });
});

// 出席登録＿ユーザ
router.get('/add_user',(req, res, next)=> {
  db.Seatinfo.findAll().then(seatinfo => {
    var data = {
      title: '出席',
      form: new db.Seat(),
      login: req.session.login,
      seatdata: seatinfo,
      err:null
    }
    res.render('seats/add_user', data);
    });
  });

  router.post('/add_user',(req, res, next)=> {
    const form = {
      number: req.body.number,
      adid: req.body.adid   
    };
    db.sequelize.sync()
      .then(() => db.Seat.create(form)
      .then(seats=> {
        res.redirect('/')
      })
      .catch(err=> {
        var data = {
          title: 'Seats/Add',
          form: form,
          err: err
        }
        res.render('seats/add_user', data);
      })
      )
  });

// 削除＿ユーザ
  router.get('/delete_user',(req, res, next)=> {
    db.Seat.findByPk(req.query.id)
    .then(seats => {
      var data = {
        title: 'Seats/Delete',
        form: seats
      }
      res.render('seats/delete_user', data);
    });
  });

  router.post('/delete_user',(req, res, next)=> {
    console.log(req.body);
    if (req.body.adid != undefined && req.body.number != undefined){
      db.sequelize.sync()
      .then(() => db.Seat.destroy({
        where:{adid:req.body.adid, number:req.body.number}
      }))
      .then(seats => {
        res.json(seats);
      });
    } else if (req.body.adid != undefined){
      db.sequelize.sync()
      .then(() => db.Seat.destroy({
        where:{adid:req.body.adid}
      }))
      .then(seats => {
        res.redirect('/');
      });
    } else {
      res.redirect('/');
    }
  });

  // addによるレコードの作成
router.get('/add',(req, res, next)=> {
  var data = {
    title: '座席登録',
    form: new db.Seat(),
    err:null
  }
  res.render('seats/add', data);
});

router.post('/add',(req, res, next)=> {
  const form = {
    number: req.body.number,    
    adid: req.body.adid
  };
  db.sequelize.sync()
    .then(() => db.Seat.create(form)
    .then(seats=> {
      res.redirect('/seats/index')
    })
    .catch(err=> {
      var data = {
        title: '座席登録',
        form: form,
        err: err
      }
      res.render('seats/add', data);
    })
    )
});

// editによるレコードの編集
router.get('/edit',(req, res, next)=> {
  db.Seat.findByPk(req.query.id)
  .then(seats => {
    var data = {
      title: '座席編集',
      form: seats,
      err:null
    }
    res.render('seats/edit', data);
  });
});

router.post('/edit',(req, res, next)=> {
  db.Seat.findByPk(req.body.id)
  .then(seats => {
    seats.number = req.body.number,
    seats.adid = req.body.adid,
    seats.save().then(()=>res.redirect('/seats/index'))
    .catch(err=> {
      var data = {
        title: '座席編集',
        form: seats,
        err: err
      }
      res.render('seats/edit', data);
    })
  });
});

// deleteによるレコードの削除
router.get('/delete',(req, res, next)=> {
  db.Seat.findByPk(req.query.id)
  .then(seats => {
    var data = {
      title: '座席削除',
      form: seats
    }
    res.render('seats/delete', data);
  });
});

router.post('/delete',(req, res, next)=> {
  db.Seat.findByPk(req.body.id)
  .then(seats => {
    seats.destroy().then(()=>res.redirect('/seats/index'));
  });
});

module.exports = router;