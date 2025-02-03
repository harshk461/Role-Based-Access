const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'name',
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
                field: 'email',
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'password',
            },
            role: {
                type: DataTypes.ENUM('ADMIN', 'USER'),
                allowNull: false,
                field: 'role',
            },
            status: {
                type: DataTypes.ENUM('ACTIVE', 'INACTIVE'),
                defaultValue: 'ACTIVE',
                field: 'status',
            },
            createdAt: {
                type: DataTypes.DATE,
                field: 'created_at',
            },
            updatedAt: {
                type: DataTypes.DATE,
                field: 'updated_at',
            },
            deletedAt: {
                type: DataTypes.DATE,
                field: 'deleted_at',
            },
        },
        {
            underscored: true,
            paranoid: true,
            timestamps: true,
            hooks: {
                beforeCreate: async (user) => {
                    if (user.password) {
                        const salt = await bcrypt.genSalt(10);
                        user.password = await bcrypt.hash(user.password, salt);
                    }
                },
                beforeUpdate: async (user) => {
                    if (user.changed('password')) {
                        const salt = await bcrypt.genSalt(10);
                        user.password = await bcrypt.hash(user.password, salt);
                    }
                },
            },
        },
    );

    return User;
};
