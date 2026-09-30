import Payment from "../models/PaymentModel.js";
import User from "../models/UserModel.js";
import Workshop from "../models/WorkshopModel.js";
import sequelize from "../config/Database.js";
import nodemailer from "nodemailer"

import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { analyzePaymentReceipt } from "../services/geminiService.js";


const sendEmail = (to , subject , body)=>{

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
       user: "bisamotivasi@gmail.com",
       pass: process.env.EMAIL_APP
    }
 });

const mailOptions = {
    from: "bisamotivasi@gmail.com",
    to: to,
    subject: subject,
    html: body
 };
 
 transporter.sendMail(mailOptions, function(error, info){
    if(error){
       console.log(error);
    }else{
       console.log("Email sent: " + info.response);
    }
 });

}
 

// Create a new payment
export const createPayment = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Bukti pembayaran wajib diunggah' });
      }
      const { filename } = req.file;
      const { user_id, workshop_id, status, uniq_code, metode_pembayaran } = req.body;
      const newPayment = await Payment.create({ 
        user_id, 
        workshop_id, 
        status: status || 'Bayar', 
        uniq_code: (uniq_code === 'null' || !uniq_code) ? null : uniq_code, 
        metode_pembayaran: metode_pembayaran || 'transfer', 
        bukti_pembayaran: filename 
      });
    
      res.status(201).json(newPayment);
    } catch (error) {
      console.error('Error in createPayment:', error);
      res.status(500).json({ error: 'Failed to create payment', details: error.message });
    }
  };


  // Get all payments
export const getAllPayment = async (req, res) => {
    try {
      console.log(process.env.EMAIL_APP)
      const paymentList = await Payment.findAll( {
        include: [User , Workshop],
        
      });
      const rearrangedArray = paymentList.map((obj) => ({
        id: obj.id,
        user_id: obj.user_id,
        User: obj.User,
        workshop_id: obj.workshop_id,
        Workshop: obj.Workshop,
        status : obj.status,
        uniq_code: obj.uniq_code,
        metode_pembayaran: obj.metode_pembayaran,
        bukti_pembayaran: obj.bukti_pembayaran,
        created_at: obj.created_at,
        updated_at: obj.updated_at,
        deleted_at: obj.deleted_at,
      }));
      res.status(200).json(rearrangedArray);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch payments' });
    }
  };

    // Get all payments
export const getPaymentApprove = async (req, res) => {
  try {
    const paymentList = await Payment.findAll( {
      include: [User , Workshop],
      where:{
        status : 'Bayar'
      }
    });
    const rearrangedArray = paymentList.map((obj) => ({
      id: obj.id,
      user_id: obj.user_id,
      User: obj.User,
      workshop_id: obj.workshop_id,
      Workshop: obj.Workshop,
      status : obj.status,
      uniq_code: obj.uniq_code,
      metode_pembayaran: obj.metode_pembayaran,
      bukti_pembayaran: obj.bukti_pembayaran,
      created_at: obj.created_at,
      updated_at: obj.updated_at,
      deleted_at: obj.deleted_at,
    }));
    res.status(200).json(rearrangedArray);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
};



// Get a single payment by ID
export const getPaymentById = async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await Payment.findByPk(id);
      if (payment) {
        res.status(200).json(payment);
      } else {
        res.status(404).json({ message: 'Payment not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch payment' });
    }
  };

  // Get a single payment by ID
export const checkUniqCode = async (req, res) => {
  try {
    const {uniq_code} = req.params;
    const payment = await Payment.findOne( {
      include: [User , Workshop],
      where:{
        status : 'Lunas',
        uniq_code : uniq_code
      }
    });
    if (payment) {
      res.status(200).json(payment);
    } else {
      res.status(404).json({ message: 'Payment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payment' });
  }
};

// Validasi & Ambil Detail E-Sertifikat Publik berdasarkan uniq_code
export const getCertificateByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const payment = await Payment.findOne({
      include: [
        {
          model: User,
          attributes: ['id', 'first_name', 'last_name', 'npm', 'jurusan', 'kelas', 'email'],
        },
        {
          model: Workshop,
          attributes: ['id', 'nama', 'tanggal', 'jam', 'tempat', 'deskripsi'],
        },
      ],
      where: {
        status: 'Lunas',
        uniq_code: code,
      },
    });

    if (!payment) {
      return res.status(404).json({
        valid: false,
        message: 'Sertifikat tidak ditemukan atau status pembayaran belum divalidasi.',
      });
    }

    const getParticipantFullName = (user) => {
      if (!user) return 'Peserta FILING';
      const fromFirstLast = `${user.first_name || ''} ${user.last_name || ''}`.trim();
      if (fromFirstLast) return fromFirstLast;
      if (user.nama || user.name) return user.nama || user.name;
      if (user.email) {
        const usernamePart = user.email.split('@')[0];
        const cleaned = usernamePart
          .replace(/[0-9]/g, '')
          .replace(/[._-]/g, ' ')
          .trim();
        if (cleaned) {
          return cleaned
            .split(' ')
            .filter(Boolean)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
        }
      }
      return 'Peserta FILING';
    };

    const participantName = getParticipantFullName(payment.User);

    const certYear = payment.updated_at ? new Date(payment.updated_at).getFullYear() : 2026;
    const certNumber = `CERT/FILING/${certYear}/${String(payment.id).padStart(5, '0')}`;

    return res.status(200).json({
      valid: true,
      certificate_number: certNumber,
      payment_id: payment.id,
      uniq_code: payment.uniq_code,
      status: payment.status,
      recipient: {
        id: payment.User?.id,
        name: participantName,
        npm: payment.User?.npm || '-',
        jurusan: payment.User?.jurusan || '-',
        kelas: payment.User?.kelas || '-',
        email: payment.User?.email,
      },
      workshop: {
        id: payment.Workshop?.id,
        title: payment.Workshop?.nama || 'Workshop FIKTI Learning',
        date: payment.Workshop?.tanggal || '-',
        time: payment.Workshop?.jam || '-',
        location: payment.Workshop?.tempat || 'Online / Jakarta',
      },
      issue_date: payment.updated_at,
      issuer: 'BEM FIKTI Universitas Gunadarma - FIKTI Learning (FILING)',
    });
  } catch (error) {
    console.error('Error in getCertificateByCode:', error);
    res.status(500).json({ valid: false, error: 'Gagal memverifikasi sertifikat' });
  }
};




  export const updatePaymentById = async (req, res) => {
    try {
      let filename = ''
      const { id } = req.params;
      const { user_id, workshop_id, status, uniq_code = null, metode_pembayaran, bukti_pembayaran } = req.body;
      const paymentToUpdate = await Payment.findByPk(id , {
        include: [User, Workshop] // Include the User model
      });

      if(!req.file) {
        filename = paymentToUpdate.bukti_pembayaran;
      }
      else {
     
          const filepath = `./public/images/Payment/${paymentToUpdate.bukti_pembayaran}`;
   
          filename=req.file.filename
  
          if (fs.existsSync(filepath)) {
              fs.unlinkSync(filepath);
          }
       
      }
      let uuid= uuidv4() ;
      if (paymentToUpdate) {
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        if(status === 'Lunas') {
          sendEmail(paymentToUpdate.User.email , "Payment valid" , `<h1>Payment Success!</h1>
                                                                          <p>Dear Customer,</p>
                                                                          <p>Your payment was successfully processed.</p>
                                                                          
                                                                          <div class="payment-details">
                                                                            <p>Workshop: ${paymentToUpdate.Workshop.nama}</p>                                                                          
                                                                            <p><span class="amount">Rp.${paymentToUpdate.Workshop.harga}</span> has been deducted from your account.</p>
                                                                            <p>Transaction ID: ${paymentToUpdate.id}</p>
                                                                            <p>Uniq Code: ${uuid}</p>                                                                            
                                                                          </div>                                                                          
                                                                          <p class="thank-you">Thank you for your payment!</p>` )
        }else{
          sendEmail(paymentToUpdate.User.email , "Payment Rejected" ,  `<h1>Payment Rejected!</h1>
                                                                            <p>Dear Customer,</p>
                                                                            <p>Your payment was rejected.</p>
                                                                            
                                                                            <div class="payment-details">
                                                                              <p>Workshop: ${paymentToUpdate.Workshop.nama}</p>                                                                                                                                                       
                                                                              <p>Transaction ID: ${paymentToUpdate.id}</p>                                                                                                                                               
                                                                            </div>                                                                          
                                                                            ` )
        }
        paymentToUpdate.user_id = user_id;
        paymentToUpdate.workshop_id = workshop_id;
        paymentToUpdate.status = status;
        paymentToUpdate.uniq_code = uniq_code == 'null' ?  null : uuid ;
        paymentToUpdate.metode_pembayaran = metode_pembayaran;
        paymentToUpdate.bukti_pembayaran = filename;
        await paymentToUpdate.save();
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        res.status(200).json(paymentToUpdate);
      } else {
        res.status(404).json({ message: 'Payment not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update payment' , error });
    }
  };



// Delete a payment by ID (Soft Delete)
export const deletePaymentById = async (req, res) => {
    try {
      const { id } = req.params;
      const paymentToDelete = await Payment.findByPk(id);
      if (paymentToDelete) {
        paymentToDelete.deleted_at = new Date();
        await paymentToDelete.save();
        res.status(204).json();
      } else {
        res.status(404).json({ message: 'Payment not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete payment' });
    }
  };

// Verifikasi Bukti Pembayaran menggunakan Gemini AI OCR
export const verifyPaymentWithAI = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id, {
      include: [User, Workshop],
    });

    if (!payment) {
      return res.status(404).json({ error: "Data pembayaran tidak ditemukan" });
    }

    if (!payment.bukti_pembayaran) {
      return res.status(400).json({ error: "Bukti pembayaran belum diunggah untuk transaksi ini" });
    }

    // Cek lokasi file
    const possiblePaths = [
      path.resolve('public/images/Payment', payment.bukti_pembayaran),
      path.resolve('./public/images/Payment', payment.bukti_pembayaran),
      `./public/images/Payment/${payment.bukti_pembayaran}`,
      `public/images/Payment/${payment.bukti_pembayaran}`,
    ];

    let filepath = possiblePaths.find((p) => fs.existsSync(p));

    if (!filepath) {
      return res.status(404).json({ error: `File bukti pembayaran (${payment.bukti_pembayaran}) tidak ditemukan di server.` });
    }

    const participantName = payment.User 
      ? `${payment.User.first_name || ''} ${payment.User.last_name || ''}`.trim()
      : 'Peserta';

    const aiResult = await analyzePaymentReceipt({
      imagePath: filepath,
      expectedAmount: payment.Workshop ? Number(payment.Workshop.harga) : 0,
      workshopName: payment.Workshop ? payment.Workshop.nama : 'Workshop',
      participantName: participantName || payment.User?.email,
    });

    return res.status(200).json({
      payment_id: payment.id,
      current_status: payment.status,
      workshop: {
        id: payment.Workshop?.id,
        nama: payment.Workshop?.nama,
        harga: payment.Workshop?.harga,
      },
      user: {
        id: payment.User?.id,
        name: participantName || payment.User?.email,
        email: payment.User?.email,
      },
      bukti_pembayaran: payment.bukti_pembayaran,
      ai_analysis: aiResult.data,
      model_used: aiResult.model_used,
    });
  } catch (error) {
    console.error("Error in verifyPaymentWithAI:", error);
    return res.status(500).json({ 
      error: "Gagal memproses verifikasi AI", 
      details: error.message 
    });
  }
};