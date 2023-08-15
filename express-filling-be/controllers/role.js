import Role from "../models/RoleModel.js";
import {DataTypes} from "sequelize"
import { v4 as uuidv4 } from "uuid";

export const roles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const add = async (req, res) => {
  try {
    const { nama, deskripsi } = req.body;
    const uuid = uuidv4();
    const role = await Role.create({ id: uuid, nama, deskripsi });
    res.json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { nama, deskripsi } = req.body;
  try {
    const role = await Role.findByPk(id);
    if (role) {
      role.nama = nama;
      role.deskripsi = deskripsi;
      await role.save();
      return res.json(role);
    }
    return res.status(404).json({ message: "Role not found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



export const remove = async (req, res) => {
    const { id } = req.params;
    try {
      const role = await Role.findByPk(id);
      if (role) {
        await role.destroy() //, jika hard delete
        // role.deleted_at = new Date();
        // await role.save();
        res.json({ message: 'Role deleted' });
      } else {
        res.status(404).json({ message: 'Role not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  

