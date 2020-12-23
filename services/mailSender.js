const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'spyder.project.company@gmail.com',
    pass: 'Spider1234!'
  }
});

const sendEmail = (ownerEmail) => {
    const mailOptions = {
        from: 'spyder.project.company@gmail.com',
        to: ownerEmail,
        subject: 'Notification from Spyer',
        text: 'Your Request for data collecting has successful finished',
      };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
}

module.exports = sendEmail