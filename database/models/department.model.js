const { Sequelize, DataTypes, Model } = require('sequelize');
const { USERS_TABLE } = require('./user.model');

const DEPARTMENT_TABLE = 'deparment';

const DepartmentModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: USERS_TABLE,
            key: 'id'
        },
        onDelete: "RESTRICT",
        onUpdate: "NO ACTION"
    },
    code: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
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

class Department extends Model {
    static associate(models) {
        this.hasMany(models.District, {
            foreignKey: 'idDepartment',
            as: 'Districts'
        });
        this.belongsTo(models.User, {
            foreignKey: 'createdBy',
            as: 'CreatedBy'
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: 'Department',
            tableName: DEPARTMENT_TABLE,
            timestamps: true,
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        };
    }
}

module.exports = {
    DEPARTMENT_TABLE,
    DepartmentModel,
    Department
}