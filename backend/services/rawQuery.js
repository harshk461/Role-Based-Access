const { sequelize } = require('../models');

exports.insertIntoRoles = async (userId, role) => {
  try {
    const query = `
      INSERT INTO Roles (user_id, role, createdAt)
      VALUES (?, ?, NOW());
    `;

    const [results, metadata] = await sequelize.query(query, {
      replacements: [userId, role], 
      type: sequelize.QueryTypes.INSERT,
    });

    console.log('Insertion successful:', results);
    return results;
  } catch (error) {
    console.error('Error inserting into Roles:', error);
    throw error
  }
};
