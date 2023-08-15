import { DataTypes } from "sequelize";
import sequelize from "../config/Database.js";
import Workshop from "./WorkshopModel.js";

const Kuota = sequelize.define('Kuota', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  workshop_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Workshop,
      key: 'id',
    },
  },
  total: {
    type: DataTypes.INTEGER,
  },
  sisa: {
    type: DataTypes.INTEGER,
  },
  terjual: {
    type: DataTypes.INTEGER,
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
  tableName: 'kuota',
  timestamps: false,
});

export default Kuota
