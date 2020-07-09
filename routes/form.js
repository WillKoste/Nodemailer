const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.get('/', (req, res) => {
  res.render('contact', {layout: false});
});

router.post('/send',async (req, res) => {
  try {
    const {name, email, phone, company, message} = req.body;
    
    const output = `
      <p>You have a new contact request!</p>
      <h1>Contact Details</h1>
      <ul>
        <li>Name: ${name} </li>
        <li>Company: ${company} </li>
        <li>Email: ${email} </li>
        <li>Phone: ${phone} </li>
      </ul>
      <h2>Message</h2>
      <p>${message}</p>
    `;
    
    let transporter = nodemailer.createTransport({
      host: "mail.doobiedalmatian.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'test@doobiedalmatian.com', 
        pass: 'My2dogs95', 
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Will Koste" <test@doobiedalmatian.com>', // sender address
      to: `Simplicitly, simplicitly.dev@gmail.com`, // list of receivers
      subject: "It Would Be Really Cool If This Worked :)", // Subject line
      text: "Hello world?", // plain text body
      html: output, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
   
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.send('Okay It should have worked');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;