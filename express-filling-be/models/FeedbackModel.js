import { DataTypes } from "sequelize";
import sequelize from "../config/Database.js";
import User from "./UserModel.js";
import Workshop from "./WorkshopModel.js";

const Feedback = sequelize.define('Feedback', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.STRING(40),
  },
  workshop_id: {
    type: DataTypes.INTEGER,
  },
  feedback: {
    type: DataTypes.TEXT,
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
  tableName: 'feedback',
  timestamps: false,
});

Feedback.belongsTo(User, { foreignKey: 'user_id' });
Feedback.belongsTo(Workshop, { foreignKey: 'workshop_id' });

export default Feedback
