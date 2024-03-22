const { Model, DataTypes, Sequelize } = require('sequelize');
const { ROLE_TABLE } = require('./role.model');

const USERS_TABLE = 'users';

const UsersModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'role_id',
        references: {
            model: ROLE_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        onUpdate: Sequelize.NOW
    }
};

class User extends Model {
    static associate(models) {
        this.belongsTo(models.Role, { 
            foreignKey: 'roleId',
            as: 'Role'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: 'User',
            tableName: USERS_TABLE,
            timestamps: true,
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        };
    }
}

module.exports = {
    USERS_TABLE,
    UsersModel,
    User
};
