import emailjs from '@emailjs/browser';

const sendEmail = async (OTP, email) => {
    const template_params = {
        to_name: OTP,
        to_email: email,
    }
    try {
        await emailjs.send(
            'service_1lyrnnu',
            'template_nrnrb9m', template_params, '7nHBX1UsG2x5f04Rm')
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
