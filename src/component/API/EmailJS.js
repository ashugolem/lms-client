import emailjs from '@emailjs/browser';

const sendEmail = async (OTP, email) => {
    const template_params = {
        from_name: "LMS",
        from_email: "support@LMS.com",
        to_name: OTP,
        to_email: email,
        message: "You have successfully signedup for Library Management System"
    }
    try {
        await emailjs.send(
            'service_nsrsn9x',
            'template_4psni0f', template_params, 'jXanXICKxj_3RRQNF')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
                console.log('FAILED...', error);
            });
    } catch (error) {
        console.log(error.message)
    }

}

export default sendEmail;
