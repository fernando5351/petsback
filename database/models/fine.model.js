const { Model, DataTypes } = require('sequelize');
const { Owners, FineAmount } = require('./owner.model');

const FINES_TABLE = 'Fines';
// model
const FinesModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fine_amount_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
};

class Fines extends Model {
    static associate(models) {
        Fines.belongsTo(models.Owners, { foreignKey: 'owner_id', as: 'owner' });
        Fines.belongsTo(models.FineAmount, { foreignKey: 'fine_amount_id', as: 'fine_amount' });
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: 'Fines',
            tableName: FINES_TABLE,
            timestamps: false
        };
    }
}

module.exports = {
    FINES_TABLE,
    FinesModel,
    Fines
};
