import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavLink from './NavLink';
import { useSelector } from 'react-redux';
export const NavBar = () => {
  const loggedIn = useSelector((state) => state.setLog.isLoggedIn);
  const role = useSelector((state) => state.setLog.role);
  useEffect(() => {
    const sidebarToggleBtn = document.getElementById('sidebarToggle');

    const toggleSidebar = () => {
      const sidebar = document.querySelector('.sidebar');
      sidebar.classList.toggle('toggled');

    };

    sidebarToggleBtn.addEventListener('click', toggleSidebar);

    return () => {
      // Cleanup: Remove the event listener when the component is unmounted
      sidebarToggleBtn.removeEventListener('click', toggleSidebar);
    };
  }, []);
  return (
    <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
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
                <NavLink icon="fas fa-book" path="/table" name="Lent Book" />
                <NavLink icon="fas fa-book" path="/table" name="Submit Book" />
                <NavLink icon="fas fa-table" path="/table" name="Record" />
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
        <div className="text-center d-none d-md-inline">
          <button className="btn rounded-circle border-0" id="sidebarToggle" type="button"></button>
        </div>
      </div>
    </nav>
  )
}
