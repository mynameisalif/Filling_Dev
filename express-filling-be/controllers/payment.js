import Payment from "../models/PaymentModel.js";
import User from "../models/UserModel.js";
import Workshop from "../models/WorkshopModel.js";
import sequelize from "../config/Database.js";
import nodemailer from "nodemailer"

import { v4 as uuidv4 } from "uuid";


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
      const {filename} = req.file
      const { user_id, workshop_id, status, uniq_code, metode_pembayaran, bukti_pembayaran } = req.body;
      const newPayment = await Payment.create({ user_id, workshop_id, status, uniq_code, metode_pembayaran, bukti_pembayaran : filename });
    
      res.status(201).json(newPayment);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create payment' , error });
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