const { Sequelize, DataTypes, Model } = require('sequelize');
const { DEPARTMENT_TABLE } = require('./department.model');
const { USERS_TABLE } = require('./user.model');

const DISTRICT_TABLE = 'district';

const DistrictModel = {
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
    idDepartment: {
        type: DataTypes.INTEGER,
        references: {
            model: DEPARTMENT_TABLE,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
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

class District extends Model {
    static associate(models) {
        this.belongsTo(models.Department, {
            foreignKey: 'idDepartment',
            as: 'Department'
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: 'District',
            tableName: DISTRICT_TABLE,
            timestamps: true,
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        };
    }
}

module.exports = {
    DISTRICT_TABLE,
    DistrictModel,
    District
}