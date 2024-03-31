const { Model, DataTypes } = require('sequelize');
const { Pets, Owners } = require('./pets.model');
const { PETS_TABLE } = require('./pet.model');
const { OWNERS_TABLE } = require('./owner.model');

const ACTIONS_TABLE = 'Actions';

//action model
const ActionsModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    action_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    action_description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    action_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    petId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'pet_id',
        references: {
            model: PETS_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    },
    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'owner_id',
        references: {
            model: OWNERS_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    }
};

class Actions extends Model {
    static associate(models) {
        this.belongsTo(models.Pet, { foreignKey: 'petId', as: 'Pet' });
        this.belongsTo(models.Owner, { foreignKey: 'ownerId', as: 'Owner' });
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: 'Actions',
            tableName: ACTIONS_TABLE,
            timestamps: false
        };
    }
}

module.exports = {
    ACTIONS_TABLE,
    ActionsModel,
    Actions
};
