const db = require('../config/db');

async function createService(name) {
  const [result] = await db.execute(
    `INSERT INTO services (name) VALUES (?)`,
    [name]
  );
  return result.insertId;
}


async function selecionarServices (){

   const [result] = await db.query(`SELECT * FROM services`);
   return result;


   

}






module.exports = {createService, selecionarServices};