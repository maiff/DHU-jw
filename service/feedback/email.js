var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: 'QQ',
    auth: {
        user: '864306867@qq.com',
        pass: 'kydemmrxynzcbdah'
    }
});


// setup e-mail data with unicode symbols
exports = module.exports =function sendEmail(from_email,content){
    var mailOptions = {
        from: '"反馈意见" <864306867@qq.com>', // sender address
        to: '864306867@qq.com', // list of receivers
        subject: `"反馈意见" 来自${from_email}`, // Subject line
        text: '成功！ 🐴', // plaintext body
        html: content // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}