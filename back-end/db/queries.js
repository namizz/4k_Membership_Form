const getAllInfo = `select * from members`;
const checkEmail = `select * from members where phone = $1`;
const getByID = `select * from members where id=$1`;
const createMember = `
  INSERT INTO members ( firstname, lastname, date_of_birth, church, country, phone, region, email, department, batch, img, fav_verse ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;
module.exports = {
  getAllInfo,
  checkEmail,
  createMember,
  getByID,
};
