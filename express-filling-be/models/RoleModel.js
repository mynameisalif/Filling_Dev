import User from "./UserModel.js"
import { DataTypes } from "sequelize";
import sequelize from "../config/Database.js";


const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.STRING(40),
    primaryKey: true,
  },
  nama: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  deskripsi: {
    type: DataTypes.STRING(255),
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
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'roles',
  paranoid: true, // Enable soft delete
  timestamps: false, // Enable createdAt and updatedAt timestamps
});

// Role.hasMany(User, { foreignKey: 'role_id' });

export default Role
