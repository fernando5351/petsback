const { Model, DataTypes } = require('sequelize');
const { OWNERS_TABLE } = require('./owner.model');
const { SPECIES_TABLE } = require('./specie.model');

const PETS_TABLE = 'Pets';

const PetsModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    specieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'specie_id',
        references: {
            model: SPECIES_TABLE,
            key: 'id'
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    },
    breed: {
        type: DataTypes.STRING,
        allowNull: true
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true
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
        onDelete: 'CASCADE'
    },
    status: {
        type: DataTypes.STRING,
        validate: {
          isIn: [['available', 'adoptable', 'death', 'healthy']],
        },
        defaultValue: 'available'
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

class Pets extends Model {
    static associate(models) {
        this.belongsTo(models.Owner, { foreignKey: 'ownerId', as: 'Owner' });
        this.belongsTo(models.Specie, { foreignKey: 'specieId', as: 'Specie' });
        this.belongsTo(models.Actions, { foreignKey: 'petId', as: 'Action' });
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: 'Pet',
            tableName: PETS_TABLE,
            timestamps: true,
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        };
    }
}

module.exports = {
    PETS_TABLE,
    PetsModel,
    Pets
};
