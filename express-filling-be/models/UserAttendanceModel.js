import { DataTypes } from "sequelize";
import sequelize from "../config/Database.js";
import User from "./UserModel.js";
import Workshop from "./WorkshopModel.js";

const Attendance = sequelize.define('Attendance', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.STRING(40),
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  workshop_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Workshop,
      key: 'id',
    },
  },
  kesimpulan_materi: {
    type: DataTypes.STRING(255),
  },
  image: {
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
  },
}, {
  tableName: 'attendance',
  timestamps: false,
});

Attendance.belongsTo(User, { foreignKey: 'user_id' });
Attendance.belongsTo(Workshop, { foreignKey: 'workshop_id' });



export default Attendance
