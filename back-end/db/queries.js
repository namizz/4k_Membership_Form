const getAllInfo = `select * from members`;
const checkEmail = `select * from members where phone = $1`;
const getByID = `select * from members where id=$1`;
const createMember = `
  INSERT INTO members ( firstname, lastname, date_of_birth, church, country, phone, region, email, department, batch, img, fav_verse ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;

const updateMember = `UPDATE members 
set firstname = CASE WHEN firstname IS DISTINCT FROM $1 THEN $1 ELSE firstname END, 
lastname = CASE WHEN lastname IS DISTINCT FROM $2 THEN $2 ELSE lastname END,
date_of_birth = CASE WHEN date_of_birth IS DISTINCT FROM $3  THEN $3 ELSE date_of_birth END,
church = CASE WHEN church IS DISTINCT FROM $4 THEN $4 ELSE church END,
country = CASE WHEN country IS DISTINCT FROM $5 THEN $5 ELSE country END,
phone = CASE WHEN phone IS DISTINCT FROM $6 THEN $6 ELSE phone END,
region = CASE WHEN region IS DISTINCT FROM $7 THEN $7 ELSE region END,
email = CASE WHEN email IS DISTINCT FROM $8 THEN $8 ELSE email END,
department = CASE WHEN department IS DISTINCT FROM $9 THEN $9 ELSE department END,
batch = CASE WHEN batch IS DISTINCT FROM $10 THEN $10 ELSE batch END,
img = CASE WHEN img IS DISTINCT FROM $11  THEN $11 ELSE img END,
fav_verse = CASE WHEN fav_verse IS DISTINCT FROM $12  THEN $12 ELSE fav_verse END 
where phone = $13;



`;
module.exports = {
  getAllInfo,
  checkEmail,
  createMember,
  getByID,
  updateMember,
};
