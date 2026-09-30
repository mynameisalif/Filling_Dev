import Workshop from "../models/WorkshopModel.js";
import Payment from "../models/PaymentModel.js";
import User from "../models/UserModel.js";
import { Sequelize } from "sequelize";
import fs from "fs";

// Create a workshop
export const createWorkshop = async (req, res) => {
  try {
    const filename = req.file ? req.file.filename : null;
    const { nama, tanggal, jam, tempat, harga, kuota, deskripsi } = req.body;
    const workshop = await Workshop.create({ 
      nama, 
      tanggal, 
      jam, 
      tempat, 
      kuota: kuota ? Number(kuota) : null, 
      harga: harga ? Number(harga) : 0, 
      img: filename, 
      deskripsi 
    });
    res.status(201).json(workshop);
  } catch (error) {
    console.error("Error in createWorkshop:", error);
    res.status(500).json({ error: 'Failed to create workshop', details: error.message });
  }
};

// Get all workshops
export const getAllWorkshops = async (req, res) => {
  try {
    const workshops = await Workshop.findAll({where : {deleted_at : null}});
    res.status(200).json(workshops);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workshops' });
  }
};

// Get all workshops
export const getWorkshopNotPay = async (req, res) => {
  try {
    const {user_id} = req.params
   
    const payment = await Payment.findAll({where:{deleted_at : null ,user_id:user_id ,  status: {
      [Sequelize.Op.not]: 'Rejected'
    }}})  
    const user_ids = payment.map(e => e.workshop_id)
    const workshops = await Workshop.findAll({
      where: {
        id: {
          [Sequelize.Op.notIn]: user_ids
        }
      }
    });
    
    res.status(200).json(workshops);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workshops' });
  }
};

export const getWorkshopPay = async (req, res) => {
  try {
    const {user_id} = req.params
   
    const payment = await Payment.findAll({ include: [User , Workshop],where:{user_id:user_id ,  status: {
      [Sequelize.Op.not]: 'Rejected'
    }}})  
   
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workshops' });
  }
};

// Get a workshop by ID
export const getWorkshopById = async (req, res) => {
  try {
    const { id } = req.params;
    const workshop = await Workshop.findOne({where:{id : id , deleted_at : null }});
    if (workshop) {
      res.status(200).json(workshop);
    } else {
      res.status(404).json({ error: 'Workshop not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workshop' });
  }
};

// Update a workshop by ID
export const updateWorkshopById = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, tanggal, jam, tempat, harga, kuota, deskripsi } = req.body;
    const workshop = await Workshop.findOne({ where: { id: id, deleted_at: null } });

    if (!workshop) {
      return res.status(404).json({ error: 'Workshop not found' });
    }

    let filename = workshop.img;

    if (req.file) {
      filename = req.file.filename;

      if (workshop.img) {
        const filepath = `./public/images/Workshop/${workshop.img}`;
        if (fs.existsSync(filepath)) {
          try {
            fs.unlinkSync(filepath);
          } catch (unlinkErr) {
            console.warn("Failed to delete previous image:", unlinkErr.message);
          }
        }
      }
    }

    workshop.nama = nama;
    workshop.tanggal = tanggal;
    workshop.jam = jam;
    workshop.tempat = tempat;
    workshop.harga = harga ? Number(harga) : workshop.harga;
    workshop.kuota = kuota ? Number(kuota) : workshop.kuota;
    workshop.img = filename;
    workshop.deskripsi = deskripsi;
    workshop.updated_at = new Date();
    await workshop.save();

    res.status(200).json(workshop);
  } catch (error) {
    console.error("Error in updateWorkshopById:", error);
    res.status(500).json({ error: 'Failed to update workshop', details: error.message });
  }
};

// Delete a workshop by ID
export const deleteWorkshopById = async (req, res) => {
  try {
    const { id } = req.params;
    const workshop = await Workshop.findByPk(id);
    // if (workshop) {
    //   await workshop.destroy();
    //   const filepath = `./public/images/Workshop/${workshop.img}`;
    //   if (fs.existsSync(filepath)) {
    //       fs.unlinkSync(filepath);
    //   }

    //   res.status(200).json({ message: 'Workshop deleted successfully' });
    // } else {
    //   res.status(404).json({ error: 'Workshop not found' });
    // }

    if (workshop) {    
      workshop.deleted_at = new Date();
      await workshop.save();
      res.status(200).json(workshop);
    } else {
      res.status(404).json({ error: 'Workshop not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workshop' });
  }
};