const { Model, DataTypes,Sequelize } = require('sequelize');

const SPECIES_TABLE = 'Species';
// model
const SpeciesModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sexo: {
        type: DataTypes.STRING,
        validate: {
          isIn: [['male', 'female']],
        },
        allowNull: false
    },
    classification: {
        type: DataTypes.STRING,
        validate: {
          isIn: [['cat', 'dog']],
        },
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
};

class Species extends Model {
    static associate(models) {
        this.hasMany(models.Pet, { foreignKey: 'specieId', as: 'Pet' });
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: 'Specie',
            tableName: SPECIES_TABLE,
            timestamps: true,
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        };
    }
}

module.exports = {
    SPECIES_TABLE,
    SpeciesModel,
    Species
};
