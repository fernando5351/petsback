const { Model, DataTypes } = require('sequelize');
const { Owners, Actions } = require('./owners.model');

const SANCTIONS_TABLE = 'Sanctions';

const SanctionsModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sanction_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sanction_description: {
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
    },
    action_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
};

class Sanctions extends Model {
    static associate(models) {
        Sanctions.belongsTo(models.Owners, { foreignKey: 'owner_id', as: 'owner' });
        Sanctions.belongsTo(models.Actions, { foreignKey: 'action_id', as: 'action' });
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: 'Sanctions',
            tableName: SANCTIONS_TABLE,
            timestamps: false
        };
    }
}

module.exports = {
    SANCTIONS_TABLE,
    SanctionsModel,
    Sanctions
};
