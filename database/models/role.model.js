const { Model, DataTypes, Sequelize } = require('sequelize');

const ROLE_TABLE = 'roles'

const RoleModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
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

}

class Role extends Model {
    static associate(models) {
        // this.belongsTo(models.User, { 
        //     foreignKey: 'roleId',
        //     as: 'Users'
        // });
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: 'Role',
            tableName: ROLE_TABLE,
            timestamps: true,
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        }
    }
}

module.exports = {
    ROLE_TABLE,
    RoleModel,
    Role
}
