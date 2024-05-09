const { Role, RoleModel } = require('./role.model');
const { RolePermissions, RolePermissionModel } = require('./rolePermission.model');
const { User, UsersModel } = require('./user.model');
const {Directions,DirectionsModel} = require('./direction.model')
const {Owner,OwnersModel} = require('./owner.model')
const {Species,SpeciesModel} = require('./specie.model')
const {Pets,PetsModel} = require('./pet.model');
const { Department, DepartmentModel } = require('./department.model');
const { District, DistrictModel } = require('./district.model');

function modelsHandler(sequelize) {
    Role.init(RoleModel, Role.config(sequelize));
    RolePermissions.init(RolePermissionModel, RolePermissions.config(sequelize));
    User.init(UsersModel, User.config(sequelize));
    Directions.init(DirectionsModel,Directions.config(sequelize));
    Owner.init(OwnersModel,Owner.config(sequelize))
    Species.init(SpeciesModel, Species.config(sequelize));
    Pets.init(PetsModel, Pets.config(sequelize));
    Department.init(DepartmentModel, Department.config(sequelize));
    District.init(DistrictModel, District.config(sequelize));

    //associations models
    Role.associate(sequelize.models);
    RolePermissions.associate(sequelize.models);
    User.associate(sequelize.models);
    Directions.associate(sequelize.models); 
    Owner.associate(sequelize.models);
    Species.associate(sequelize.models);
    Pets.associate(sequelize.models);
    Department.associate(sequelize.models);
    District.associate(sequelize.models);
}

module.exports = modelsHandler;