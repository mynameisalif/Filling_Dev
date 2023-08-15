import { DataTypes } from "sequelize";
import sequelize from "../config/Database.js";
import User from "./UserModel.js";
import Role from "./RoleModel.js";

const Auths = sequelize.define('Auth', {
  id: {
    type: DataTypes.STRING(40),
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  user_id: {
    type: DataTypes.STRING(40),
    references: {
      model: User,
      key: 'id',
    },
  },
  role_id : {
    type: DataTypes.STRING(40),
    references: {
      model: Role,
      key: 'id',
    },
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
  deleted_at: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'auth',
  timestamps: false,
});

Auths.belongsTo(User, { foreignKey: 'user_id' });


export default Auths;
