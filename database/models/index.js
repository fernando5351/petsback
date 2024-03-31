const { Role, RoleModel } = require('./role.model');
const { RolePermissions, RolePermissionModel } = require('./rolePermission.model');
const { User, UsersModel } = require('./user.model');

function modelsHandler(sequelize) {
    Role.init(RoleModel, Role.config(sequelize));
    RolePermissions.init(RolePermissionModel, RolePermissions.config(sequelize));
    User.init(UsersModel, User.config(sequelize));

    //associations models
    Role.associate(sequelize.models);
    RolePermissions.associate(sequelize.models);
    User.associate(sequelize.models);
}

module.exports = modelsHandler;