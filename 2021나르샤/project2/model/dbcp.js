const mariadb=require('mariadb')

const pool=mariadb.createPool({
    host:'localhost',
    port: 3306,
    database:'test',
    user:'root',
    password:'05jijj!^^',
    connectionLimit:4
});

module.exports.getConnection=async()=>{
    return await pool.getConnection();
}