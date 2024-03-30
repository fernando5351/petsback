const { Role, RoleModel } = require('./role.model');
const { RolePermissions, RolePermissionModel } = require('./rolePermission.model');
const { User, UsersModel } = require('./user.model');
const {Directions,DirectionsModel} = require('./direction.model')

function modelsHandler(sequelize) {
    Role.init(RoleModel, Role.config(sequelize));
    RolePermissions.init(RolePermissionModel, RolePermissions.config(sequelize));
    User.init(UsersModel, User.config(sequelize));
    Directions.init(DirectionsModel,Directions.config(sequelize))

    //associations
    Role.associate(sequelize.models);
    RolePermissions.associate(sequelize.models);
    User.associate(sequelize.models);
    Directions.associate(sequelize.models)
}

module.exports = modelsHandler;