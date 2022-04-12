var express = require('express');
var router = express.Router();
const db = require('../models/index');

/* GET users listing. */
router.get('/index',(req, res, next)=> {
  db.Seatinfo.findAll().then(seatinfos => {
    var data = {
      title: 'Seatinfo/Index',
      content: seatinfos
    }
    res.render('seatinfos', data);
  });
});


// 出席登録
router.get('/add',(req, res, next)=> {
    var data = {
      title: '座席情報',
      form: new db.Seatinfo(),
      err:null
    }
    res.render('seatinfos/add', data);
  });
  
  router.post('/add',(req, res, next)=> {
    const form = {
      number: req.body.number,
      x: req.body.x,
      y: req.body.y
    };
    db.sequelize.sync()
      .then(() => db.Seatinfo.create(form)
      .then(seatinfo=> {
        res.redirect('/seatinfos/index')
      })
      .catch(err=> {
        var data = {
          title: 'Seatinfos/Add',
          form: form,
          err: err
        }
        res.render('seatinfos/add', data);
      })
      )
  });

// 更新
  router.get('/edit',(req, res, next)=> {
    db.Seatinfo.findByPk(req.query.id)
    .then(seatinfos => {
      var data = {
        title: 'Seatinfos/Edit',
        form: seatinfos
      }
      res.render('seatinfos/edit', data);
    });
  });

  router.post('/edit',(req, res, next)=> {
    db.Seatinfo.findByPk(req.body.id)
    .then(seatinfos => {
      seatinfos.number = req.body.number;
      seatinfos.x = req.body.x;
      seatinfos.y = req.body.y;
      seatinfos.save().then(()=>res.redirect('/seatinfos'));
    });
  });
module.exports = router;