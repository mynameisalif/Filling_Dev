import { DataTypes } from "sequelize";
import sequelize from "../config/Database.js";


const Workshop = sequelize.define('Workshop', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nama: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  tanggal: {
    type: DataTypes.DATEONLY,
  },
  jam: {
    type: DataTypes.TIME,
  },
  tempat: {
    type: DataTypes.STRING(255),
  },
  harga: {
    type: DataTypes.DECIMAL(10, 2),
  },
  kuota:{
    type: DataTypes.INTEGER(5),
  },
  img: {
    type: DataTypes.STRING(255),
  },
  deskripsi: {
    type: DataTypes.TEXT,
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
  tableName: 'workshop',
  timestamps: false,
});



export default Workshop
