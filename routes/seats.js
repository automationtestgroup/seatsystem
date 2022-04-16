var express = require('express');
var router = express.Router();
const db = require('../models/index');
const seatinfo = require('../models/seatinfo');

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
  db.Seatinfo.findAll().then(seatinfo => {
    var data = {
      title: '出席',
      form: new db.Seat(),
      login: req.session.login,
      seatdata: seatinfo,
      err:null
    }
    res.render('seats/add', data);
    });
  });
  
  router.post('/add',(req, res, next)=> {
    db.sequelize.sync()
    .then(() => db.Seat.create({
      number: req.body.number,
      adid: req.body.adid      
    }))
    .then(seats=> {
      res.redirect('/');
    });
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