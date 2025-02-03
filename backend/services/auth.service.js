const db = require('../models/index');

class AuthService {
  insertIntoRoles(id, role) {
    return new Promise((resolve, reject) => {
      db.roles
        .create({
          user_id: id,
          role: role,
        })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }
}

const authService=new AuthService();

module.exports=authService;
