import Attendance from "../models/UserAttendanceModel.js";
import User from "../models/UserModel.js";
import Workshop from "../models/WorkshopModel.js";

// Create an attendance
export const createAttendance = async (req, res) => {
  try {
    const { user_id, workshop_id, kesimpulan_materi, image } = req.body;
    const attendanceone = await Attendance.findOne({where:{user_id, workshop_id}})
    if(attendanceone){
      return res.status(401).json({ message: "User already attend" });
    }
    const attendance = await Attendance.create({
      user_id,
      workshop_id,
      kesimpulan_materi,
      image :  req.file ? req.file.filename : null,
    });
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: "Failed to create attendance"  , error});
  }
};

// Get all attendances
export const getAllAttendance = async (req, res) => {
  try {
    const attendances = await Attendance.findAll(
      {
        include: [User , Workshop],
        
      },
      
    );
    const rearrangedArray = attendances.map((obj) => ({
      id: obj.id,
      user_id: obj.user_id,
      User: obj.User,
      workshop_id: obj.workshop_id,
      Workshop: obj.Workshop,
      kesimpulan_materi: obj.kesimpulan_materi,
      image: obj.image,
      created_at: obj.created_at,
      updated_at: obj.updated_at,
      deleted_at: obj.deleted_at,
    }));
    res.status(200).json(rearrangedArray);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch attendances" });
  }
};

// Get an attendance by ID
export const getAttendanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const attendance = await Attendance.findByPk(id);
    if (attendance) {
      res.status(200).json(attendance);
    } else {
      res.status(404).json({ error: "Attendance not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch attendance" });
  }
};

// Update an attendance by ID
export const updateAttendanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, workshop_id, kesimpulan_materi, image } = req.body;
    const attendance = await Attendance.findByPk(id);
    if (attendance) {
      attendance.user_id = user_id;
      attendance.workshop_id = workshop_id;
      attendance.kesimpulan_materi = kesimpulan_materi;
      attendance.image = image;
      attendance.updated_at = new Date();
      await attendance.save();
      res.status(200).json(attendance);
    } else {
      res.status(404).json({ error: "Attendance not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update attendance" });
  }
};

export const deleteAttendanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const attendance = await Attendance.findByPk(id);
    if (attendance) {
      attendance.deleted_at = new Date();
      await attendance.save();
      res.status(204).json();
    } else {
      res.status(404).json({ message: "Payment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete attendance" });
  }
};
