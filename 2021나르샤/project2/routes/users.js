var express = require('express');
const dbcp=require('../model/dbcp');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const conn=await dbcp.getConnection();
  const rows=await conn.query('select * from user');//알고 싶은 sql문을 줌
  conn.end();
  //const rows=[{userId:'11',name:"aa"}]
  res.render('users',{users:rows});
});

router.get('/login', (req, res)=>{
  res.render('login');
});

router.post('/login', async(req, res)=>{
  const {userId, password} = req.body;
  let result='';
  //console.log(userId);
  //console.log(password);

  const conn=await dbcp.getConnection();
  const rows = await conn.query('select userId, password from user where userId=?',[userId])//?표에 들어갈 것은 다음 명령어? 배열에서 알려줌
  //'select userId, password from user where userId='+userId (sql 문)
  //console.log(rows);
  conn.end();

  if(rows.length==0){
    //회원 가입한 적이 없는 사람
    result='등록되지 않은 사용자 입니다.';
  }
  else {
    const db_user=rows[0];
    if(db_user.password==password){
      result='반갑습니다.';
      req.session.userId=userId;//req.session.는 정해져 있는 것, userId부분은 내가 정하는 것(변수 하나 지정, 변수 호출)
    }
    else
      result='비밀번호 오류입니다.';
  }
 
  res.render('login', {result:result});
});

router.get('/logout',(req,res)=>{
  req.session.destroy((err)=>{
      res.redirect('/');//로그아웃하면 항상 홈으로 돌아감
  });
});

//회원 가입 폼 출력
router.get('/register',(req,res)=>{
  res.render("register");
});
//db에 사용자 추가. session 추가 후 메인 페이지로 이동
router.post('/register',async(req,res)=>{
  const {userId,name,password}=req.body;
  const conn=await dbcp.getConnection();
  let sql = 'insert into user (userId,name,password) '
  sql+='values(?,?,?)'
  const rows=await conn.query(sql,[userId,name,password]);
  req.session.userId=userId;
  res.redirect('/');
});
module.exports = router;