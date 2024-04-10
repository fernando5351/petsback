const { Model, DataTypes, Sequelize } = require('sequelize');

const DIRECTIONS_TABLE = 'Directions';

// model
const DirectionsModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    street: {
        type: DataTypes.STRING,
        allowNull: true
    },
    colonia: {
        type: DataTypes.STRING,
        allowNull: true
    },
    home: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    reference: {
        type: DataTypes.STRING,
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

class Directions extends Model {
    static associate(models) {
        // this.hasOne(models.Owner, { foreignKey: 'directionId', as: 'Owner' });
         this.hasOne(models.Pet, { foreignKey: 'directionId', as: 'Pet' });
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: 'Direction',
            tableName: DIRECTIONS_TABLE,
            timestamps: true,
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        };
    }
}

module.exports = {
    DIRECTIONS_TABLE,
    DirectionsModel,
    Directions
};
