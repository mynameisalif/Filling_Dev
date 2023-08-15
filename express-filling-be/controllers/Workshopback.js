// import Workshop from "../models/WorkshopModel.js";
// import path from "path";
// import fs from "fs";
// import { QueryTypes } from 'sequelize';
// import db from "../config/Database.js"


// const success = {
//   status: 200,
//   data: [],
// };
// const error = {
//   status: 500,
//   message: [],
// };

// export const getAllWorkShop = async (req, res, next) => {
//   try {
//     const rest = await Workshop.findAll();
//     return res.json({ ...success, data: rest });
//   } catch (err) {
//     res.status(500);
//     res.json({ ...error, message: err.message });
//   }
// };

// export const getWorkshopById = async (req, res) => {
//   try {
//     const { id } = req.query || req.params;
//     const rest = await Workshop.findOne({
//       where: {
//         id,
//       },
//     });
//     return res.json({ ...success, data: rest });
//   } catch (err) {
//     res.status(500);
//     res.json({ ...error, message: err.message });
//   }
// };

// export const saveWorkshop = async (req, res) => {
//   try {
//     const { name, tanggal, jam, tempat, harga, filename, desc } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ message: "Please upload a file" });
//     }

//     if (req.file.size > 5000000)
//       return res.status(422).json({ msg: "Image must be less than 5 MB" });

//     const rest = await Workshop.create({
//       name,
//       tanggal,
//       jam,
//       tempat,
//       harga,
//       image: filename,
//       desc,
//     });

//     return res.json({ ...success, data: rest });
//   } catch (err) {
//     res.status(500);
//     res.json({ ...error, message: err.message });
//   }

// };

// export const updateWorkshop = async (req, res) => {
//   try {
//     let { id, name, tanggal, jam, tempat, filename = '',harga, desc } = req.body;


//     const workshopbyid = await Workshop.findOne({ where: { id } });
//     console.log(filename)
//     //kalo workshopnya tidak ada
//     if (!workshopbyid) return res.status(404).json({ message: "No Data Found" });

//     if(filename == '') {
//       console.log('1')
//       filename = workshopbyid.image;
//     }
//     else {
//         console.log('kesini')
//         filename = req.file.filename;
//         const filepath = `./public/images/Workshop/${workshopbyid.image}`;
//         if (fs.existsSync(filepath)) {
//             fs.unlinkSync(filepath);
//         }
//     }
//     console.log('kesinis')
//     const rest = await Workshop.update(
//       {
//         name: name,
//         tanggal: tanggal,
//         jam: jam,
//         tempat: tempat,
//         harga: harga,
//         image: filename,
//         desc: desc,
//       },
//       { where: { id } }
//     );
//     return res.json({ ...success, data: rest });
//   } catch (err) {
//     res.status(500);
//     res.json({ ...error, message: err.message });
//   }
// };

// export const deleteWorkshop = async (req, res) => {
//   try {
//     const { id } = req.query;
//     const workshop = await Workshop.findOne({
//       where: {
//         id,
//       },
//     });

//     if (!workshop) return res.status(404).json({ msg: "No Data Found" });

//     const filepath = `./public/images/Workshop/${workshop.image}`;
//     if (fs.existsSync(filepath)) {
//         fs.unlinkSync(filepath);
//     }

//     const rest = await Workshop.destroy({
//       where: {
//         id,
//       },
//     });
//     res.json({ ...success, data: rest });
//   } catch (err) {
//     res.status(500);
//     res.json({ ...error, message: err.message });
//   }
// };

// export function validateIndex(req, res, next) {
//   if (
//     req.query.index !== undefined &&
//     contacts[req.query.index] === undefined
//   ) {
//     res.send({ success: false });
//   } else {
//     next();
//   } 
// }


// export async function save(req, res, next){
//   try {

//     const users = await db.query("SELECT * FROM `users`", { type: QueryTypes.SELECT });

//   } catch (error) {
    
//   }
// }
