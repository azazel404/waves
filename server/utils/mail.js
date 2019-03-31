const nodemailer = require('nodemailer');
require('dotenv').config();


const getEmailData = (to, name, token, template) => {
    let data = null;
    switch (template) {
        case "welcome":
            data = {
                from: '"Fred Foo 👻" <foo@example.com>', // sender address
                to,
                subject: 'Hello ✔', // Subject line
                text: 'Hello world?', // plain text body
                html: '<b>Hello world?</b>' // html body
            }
            break;
        default:
            data;
    }
    return data;
}

const sendEmailRequest = (to, name, token, type) => {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: "zeblogicsoftwarehouse@gmail.com", // generated ethereal user
            pass: "pencarinafkah02" // generated ethereal password
        }
    })
    const mail = getEmailData(to, name, token, type);

    transporter.sendMail(mail, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        transporter.close();
    });

}


module.exports = { sendEmailRequest }