import { DataTypes } from "sequelize";
import Role from "./RoleModel.js";
import sequelize from "../config/Database.js";

const User = sequelize.define('User', {
  id: {
    type: DataTypes.STRING(40),
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  last_name: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  npm: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  kelas: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  jurusan: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  line_account: {
    type: DataTypes.STRING(255),
  },
  wa_account: {
    type: DataTypes.STRING(255),
  },
  phone_number: {
    type: DataTypes.STRING(255),
  },
  img: {
    type: DataTypes.STRING(255),
  },
  role_id: {
    type: DataTypes.STRING(40),
    allowNull: false,
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
  tableName: 'users',
  timestamps: false,
});

User.belongsTo(Role, { foreignKey: 'role_id' });

export default User;
