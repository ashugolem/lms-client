import React, { useRef } from 'react';

import './OTPForm.css';

export default function OTPForm(props) {
    const { email, rOTP, uOTP, setuOTP, verification } = props;
    const inputs = useRef([]);
    
    const clear = () =>{
        setuOTP('')
        for (let i=0;i<inputs.current.length;i++)  
            inputs.current[i].value=''  
        console.log(uOTP)
    };
    // Function to handle the onChange event of each input field
    const focusNextInput = (index) => {
        if (inputs.current[index + 1]) {
            inputs.current[index + 1].focus();
        }
    };
    const handleChange = (e, index) => {
        const value = e.target.value;
        // Create a copy of the current OTP
        let updatedROTP = uOTP ? uOTP.toString() : '';
        // Update the digit at the current index
        updatedROTP = updatedROTP.substring(0, index) + value + updatedROTP.substring(index + 1);
        // Set the updated OTP state
        setuOTP(updatedROTP);

        // Move focus to the next input if value is entered and there's a next input
        if (value && index < 3) {
            focusNextInput(index);
        }
        // If this is the last input field and there's a value, trigger the verification
        if (index === 3 && value) {
            // Perform OTP verification
            setuOTP(updatedROTP);
        }
    };


    
    return (
        <div className="otpContainer" >
            <form className="OTPForm" id='OTP_Form' onSubmit={verification}>
                <div className="info">
                    <span className="title">Email Verification</span>
                    <p className="description">Enter the OTP sent on <span>{email}</span> </p>
                </div>
                <div className="input-fields">
                    {[0, 1, 2, 3].map((index) => (
                        <input
                            key={index}
                            ref={(el) => (inputs.current[index] = el)}
                            placeholder=""
                            type="tel"
                            maxLength="1"
                            onChange={(e) => handleChange(e, index)}
                        />
                    ))}
                </div>
                <div className="action-btns">
                    <button className="verify" type='submit'>
                        Verify
                    </button>
                    <a className="clear" onClick={clear}>
                        Clear
                    </a>
                </div>
            </form>
        </div>
    );
}
