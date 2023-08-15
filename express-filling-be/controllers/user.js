import User from "../models/UserModel.js";
import Role from "../models/RoleModel.js";
import sequelize from "../config/Database.js";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";


// Create a user
export const createUser = async (req, res) => {
  try {
    const {filename} = req.file
    const { first_name, last_name, npm, kelas, jurusan, email, line_account, wa_account, phone_number, img, role_id  } = req.body;  
    const user = await User.create({ id:uuidv4(),first_name, last_name, npm, kelas, jurusan, email, line_account, wa_account, phone_number, img : filename, role_id });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' , error });
  }
};

// Get all users
export const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll({
      include: Role,
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' , error });
  }
};

// Get a user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// Update a user by ID
export const updateUserById = async (req, res) => {
  try {

    let filename = ''
    const { id } = req.params;
    const { first_name, last_name, npm, kelas, jurusan, email, line_account, wa_account, phone_number, img, role_id } = req.body;
    const user = await User.findByPk(id);

    if(!req.file) {
      filename = user.img;
    }
    else {
   
        const filepath = `./public/images/User/${user.img}`;
        filename=req.file.filename

        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }
    }

    if (user) {
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

      user.first_name = first_name;
      user.last_name = last_name;
      user.npm = npm;
      user.kelas = kelas;
      user.jurusan = jurusan;
      user.email = email;
      user.line_account = line_account;
      user.wa_account = wa_account;
      user.phone_number = phone_number;
      user.img = filename;
      user.role_id = role_id ? role_id : user.role_id;
      user.updated_at = new Date();
      await user.save();
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' , error });
  }
};

// Delete a user by ID
export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
      await user.destroy({ force: true, });
      res.status(200).json({ message: 'User deleted successfully' });
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' , error });
  }
};

