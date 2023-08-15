import { DataTypes } from "sequelize";
import sequelize from "../config/Database.js";
import User from "./UserModel.js";
import Workshop from "./WorkshopModel.js";

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  status: {
    type: DataTypes.STRING(255),
  },
  uniq_code: {
    type: DataTypes.STRING(255),
  },
  metode_pembayaran: {
    type: DataTypes.STRING(255),
  },
  bukti_pembayaran: {
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
  },
}, {
  tableName: 'payment',
  timestamps: false,
});


Payment.belongsTo(User, { foreignKey: 'user_id' });
Payment.belongsTo(Workshop, { foreignKey: 'workshop_id' });

export default Payment;
