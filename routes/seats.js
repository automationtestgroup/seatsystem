var express = require('express');
var router = express.Router();
const db = require('../models/index');

/* GET users listing. */
router.get('/index',(req, res, next)=> {
  db.Seat.findAll().then(seats => {
    var data = {
      title: 'Seats/Index',
      content: seats
    }
    res.render('seats', data);
  });
});

// 出席登録
router.get('/add',(req, res, next)=> {
    var data = {
      title: '出席',
      form: new db.Seat(),
      login: req.session.login,
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
        res.redirect('/')
      })
      .catch(err=> {
        var data = {
          title: 'Seats/Add',
          form: form,
          err: err
        }
        res.render('seats/add', data);
      })
      )
  });

// 削除
  router.get('/delete',(req, res, next)=> {
    db.Seat.findByPk(req.query.id)
    .then(seats => {
      var data = {
        title: 'Seats/Delete',
        form: seats
      }
      res.render('seats/delete', data);
    });
  });

  router.post('/delete',(req, res, next)=> {
    db.sequelize.sync()
    .then(() => db.Seat.destroy({
      where:{id:req.body.id}
    }))
    .then(seats => {
      res.redirect('/');
    });
  });

// 検索
  router.get('/',(req, res, next)=> {
    const adid = req.query.adid
    db.Seat.findAll({
      where: {
        adid: adid
      }
    }).then(seats => {
      var data = {
        title: 'Seats/Index',
        content: seats
      }
      res.render('seats/index', data);
    });
  });
module.exports = router;