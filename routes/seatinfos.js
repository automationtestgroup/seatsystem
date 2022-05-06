var express = require('express');
var router = express.Router();
const db = require('../models/index');

/* GET users listing. */
router.get('/index',(req, res, next)=> {
  db.Seatinfo.findAll().then(seatinfos => {
    var data = {
      title: '座席情報',
      content: seatinfos
    }
    res.render('seatinfos', data);
  });
});


// 座席追加
router.get('/add',(req, res, next)=> {
    var data = {
      title: '座席追加',
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
          title: '座席追加',
          form: form,
          err: err
        }
        res.render('seatinfos/add', data);
      })
      )
  });

// 編集
  router.get('/edit',(req, res, next)=> {
    db.Seatinfo.findByPk(req.query.id)
    .then(seatinfos => {
      var data = {
        title: '座席編集',
        form: seatinfos,
        err:null
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
      seatinfos.save().then(()=>res.redirect('/seatinfos/index'))
      .catch(err=> {
        var data = {
          title: '座席編集',
          form: seatinfos,
          err: err
        }
        res.render('seatinfos/edit', data);
      })
    });
  });

// deleteによるレコードの削除
router.get('/delete',(req, res, next)=> {
  db.Seatinfo.findByPk(req.query.id)
  .then(seatinfos => {
    var data = {
      title: '座席削除',
      form: seatinfos
    }
    res.render('seatinfos/delete', data);
  });
});

router.post('/delete',(req, res, next)=> {
  db.Seatinfo.findByPk(req.body.id)
  .then(seatinfos => {
    seatinfos.destroy().then(()=>res.redirect('/seatinfos/index'));
  });
});
module.exports = router;