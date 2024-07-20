

const { Pool } = require('pg'); 

const pool = 
new Pool({ user: 'postgres', 
host: 'localhost', 
database: 'postgres', 
password: '1234', 
port: '5432', 
max: 20, // Maximum number of clients in the pool 
idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed 
}); 
 
module.exports.execQuery = function(query){ 
return new Promise((resolve,reject)=>{ 
    pool.query(query, (err, result) => 

{ if (err) {
     reject('db error') } 
else { 
    resolve(result.rows) } 
})
})
}
