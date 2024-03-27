import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavLink from './NavLink';
import { useSelector } from 'react-redux';
export const NavBar = () => {
  const loggedIn = useSelector((state) => state.setLog.isLoggedIn);
  const role = useSelector((state) => state.setLog.role);
  // useEffect(() => {
  //   const nav = document.querySelector('nav');
  //   const sidebar = document.querySelector('.sidebar');

  //   const toggleSidebar = () => {
  //     sidebar.classList.toggle('toggled');
  //     const isToggled = sidebar.classList.contains('toggled');
  //     nav.style.transition = isToggled ? 'width 0.5s ease' : 'width 0.5s ease-out';
  //   };

  //   nav.addEventListener('mouseover', toggleSidebar);
  //   nav.addEventListener('mouseout', toggleSidebar);

  //   return () => {
  //     nav.removeEventListener('mouseover', toggleSidebar);
  //     nav.removeEventListener('mouseout', toggleSidebar);
  //   };
  // }, []);
  return (
    <nav className="navbar p-fixed toggled navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
      <div className="container-fluid d-flex flex-column p-0">
        <Link className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" to={'/'}>
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fa-solid fa-book-atlas"></i>
          </div>
          <div className="sidebar-brand-text mx-3">
            <span>EduSync-LMS</span>
          </div>
        </Link>
        <hr className="sidebar-divider my-0" />
        <ul className="navbar-nav text-light" id="accordionSidebar">
          {loggedIn && <>
            {role === "Admin" &&
              <>
                <NavLink icon="fas fa-tachometer-alt" path="/admin" name="Dashboard" />
              </>}
            {role === "Student" &&
              <>
                <NavLink icon="fas fa-user" path="/profile" name="Profile" />
                <NavLink icon="fas fa-book" path="/books" name="Library" />
                <NavLink icon="fas fa-book" path="/submit" name="Submit Book" />
                <NavLink icon="fas fa-table" path="/transaction" name="Book Requests" />
              <NavLink icon="fa-solid fa-indian-rupee-sign" path="/fine" name="Fine" />
              <NavLink icon="fa-regular fa-credit-card" path="/pay-fine" name="Pay Fine" />
              </>}
            {(role === "Admin" || role === "Teacher") &&
              <>
                <NavLink icon="fas fa-add" path="/add-book" name="Add Books" />
                <NavLink icon="fas fa-table" path="/books" name="Books List" />
                <NavLink icon="fas fa-table" path="/students" name="Student List" />
                <NavLink icon="fas fa-table" path="/faculty" name="Faculty List" />
              </>}
          </>}
          {!loggedIn && <>
            <NavLink icon="far fa-user-circle" path="/login" name="Login" />
            <NavLink icon="far fa-user-circle" path="/register" name="Register" />
          </>}

        </ul>
        
      </div>
    </nav>
  )
}
