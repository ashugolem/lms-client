import sendEmail from "../EmailJS";
import CheckUser from "./CheckUser";

const SignUpApi = async (auth, signupForm, OTP_form, showError) =>{
    const value = await CheckUser(auth);
    if (value === 'exists') {
        console.log('inside 1')
        showError("User already exists! Please Login")
        setTimeout(() => {
            signupForm.reset();
        }, 1500);
    }
    else if (value === 'not-exists') {
        await sendEmail(rOTP, auth.email)
        signupForm.style.display = "none";
        OTP_form.style.visibility = "visible";
        return {success:true}
    }
    else if (value === 'no-match') {
        showError("Password does not match the confirm password.")
    }
}
export default SignUpApi;