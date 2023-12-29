import React from 'react'

export default function FormField(props) {
  return (
    <div className="mb-3">
      <input
        className="shadow-sm form-control"
        style={{ borderRadius: "5px" }}
        autoComplete='false'
        minLength={props.minLength}
        onChange={props.onChange}
        type={props.type || props.name}
        id={props.name}
        name={props.name}
        placeholder={props.placeholder || props.name[0].toUpperCase() + props.name.slice(1)} />
    </div>
  )
}
