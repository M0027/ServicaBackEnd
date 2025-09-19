const db = require('../config/db');

async function createProfile(data) {
  const [result] = await db.query(
    `INSERT INTO professional_profiles 
     (user_id, service_id, description, address, image_url, status)
     VALUES (?, ?, ?, ?, ?,'pendente')`,
    [data.user_id, data.Service_id, data.description, data.address, data.image_url, data.status]
  );

  // actualizar o role do user para profissional
  const role = "profissional";
  const [result2] = await db.query(
    `UPDATE users SET role = ? WHERE id = ?`,[role, data.user_id]);

  

  filUser_serviceTable(data.user_id, data.Service_id)
  return result.insertId;
}

async function updare_user_serviceTable(user, service){
   const user_id = user;
   const service_id = service;
   const [result] = await db.query(`
    UPDATE user_services SET service_id = ? WHERE user_id = ?`,[service_id,user_id]);

 return result.insertId

}


async function filUser_serviceTable(id, service){
  const user_id = id;
  const service_id = service
  const [result] = await db.query(
    `INSERT INTO user_services (user_id, service_id) 
    VALUES (?,?)`,[user_id, service_id]
  );

  return result.insertId
}

async function getProfileByUserId(user_id) {
  const [rows] = await db.query(
    `SELECT * FROM professional_profiles WHERE user_id = ?`,
    [user_id]
  );

  console.log("aqui linha",rows[0]?.service_id)

  if (rows.length === 0) {
    return null; // Retorna null se nenhum perfil for encontrado
  }

 const service = parseInt(rows[0]?.service_id)

  const [rowBrute] = await db.query(
    `SELECT * FROM users WHERE id = ?`,
    [user_id]
  );

  const [serviceRows] = await db.query(
    `SELECT name AS service_name FROM services WHERE id = ?`,
    [service]
  );

  console.log("aqui",serviceRows)

  const rows2 = rowBrute.map(({ password, ...rest }) => rest);
  
  if (rows.length > 0 && rows2.length > 0) {
    return { ...rows[0], ...rows2[0], ...serviceRows[0] };
  }
  // return rows[0];
}

async function updateProfile(user_id, data) {
  await db.query(
    `UPDATE professional_profiles SET 
      service_id = ?, 
      description = ?, 
      address = ?, 
      image_url = ?, 
      updated_at = NOW()
     WHERE user_id = ?`,
    [data.service_type, data.description, data.address, data.image_url, user_id]
  );

  updare_user_serviceTable(user_id, data.Service_id)
}

module.exports = {
  createProfile,
  getProfileByUserId,
  updateProfile
};
