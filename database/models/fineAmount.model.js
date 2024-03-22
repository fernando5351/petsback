const { Model, DataTypes } = require('sequelize');

const FINE_AMOUNT_TABLE = 'FineAmount';

const FineAmountModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
};

class FineAmount extends Model {
    static associate(models) {
        // Definir asociaciones si es necesario
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: 'FineAmount',
            tableName: FINE_AMOUNT_TABLE,
            timestamps: false
        };
    }
}

module.exports = {
    FINE_AMOUNT_TABLE,
    FineAmountModel,
    FineAmount
};
