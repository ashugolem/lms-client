import React, { useEffect, useState } from 'react'

export default function FormField(props) {
  const {type, name, value, icon, handleBlur,  handleChange, error, touched} = props;
  const [message, setMessage] = useState(null);
  const [label, setLabel] = useState(null);
  useEffect(() => {
    if(name==="admissionNo"){
      setMessage("Enter Admission Number");
      setLabel("Admission No.");
    }
    else{
      setLabel(name[0].toUpperCase() + name.slice(1));
      setMessage(`Enter ${name[0].toUpperCase() + name.slice(1)}`);
    }
  },[])
  return (
    <div>
      <div className="flex-column text-start">
        <label>{label} </label>
      </div>
      <div className="inputForm">
        <i className={`${icon} mt-1`}></i>
        <input
          type={type}
          className="input"
          name={name}
          placeholder={message}
          value={value}
          onBlur={handleBlur}
          autoComplete='true'
          onChange={handleChange}
        />
      </div>
      {error && touched? (
        <p className="form-error text-start text-danger">{error}</p>
      ) : null}
    </div>
  )
}
