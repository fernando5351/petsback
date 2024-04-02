const { Model, DataTypes, Sequelize } = require('sequelize');


const OWNERS_TABLE = 'Owner';

const OwnersModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dui: {
        type: DataTypes.CHAR(10),
        unique: true,
        allowNull: false
    },
    phoneCod: {
        type: DataTypes.INTEGER,
        field: 'phone_cod',
        defaultValue: 503
    },
    phone: {
        type: DataTypes.CHAR(9),
        allowNull: true
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

class Owner extends Model {
    static associate(models) {
       // this.belongsTo(models.Direction, { foreignKey: 'directionId', as: 'Direction' });
        this.hasMany(models.Pet, { foreignKey: 'ownerId', as: 'Pets' });
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: 'Owner',
            tableName: OWNERS_TABLE,
            timestamps: true,
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        };
    }
}

module.exports = {
    OWNERS_TABLE,
    OwnersModel,
    Owner
};
