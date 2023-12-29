import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function(props) {
    const location = useLocation()
    return (
        <li className="nav-item">
            <Link className={`nav-link ${location.pathname===props.path?"active":""}`} to={props.path}>
                <i className={props.icon} />
                <span>{props.name}</span>
            </Link>
        </li>
    )
}
