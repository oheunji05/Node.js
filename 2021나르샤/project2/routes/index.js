var express = require('express');
const dbcp=require('../model/dbcp');

var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  // const conn = await dbcp.getConnection();//데이터 베이스 접속
  // if(conn==null)
  //   console.log('fail');
  // else{                                                          
  //     console.log('success');
  //     const rows=await conn.query('select * from user');//알고 싶은 sql문을 줌
  //     console.log(rows);//select문은 거의 다 배열로 저장
  //     conn.end();
  // }
  const userId=req.session.userId;
  const array=['abc', 'def', 'ghi']
  res.render('index', { title: 'Express', array:array,userId:userId });
});

module.exports = router;