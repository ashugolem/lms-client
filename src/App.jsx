import { Routes, Route } from 'react-router-dom';
import { NavBar } from './component/NavBar';
import Content from './component/Content';
import Table from './component/Table';
import Signup from './component/SignUp/Signup';
import Login from './component/Login';
import Pending from './component/Pending';
import Blocked from './component/Blocked';
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollTrigger from "react-scroll-trigger";
import { useEffect } from 'react';
import AddBooks from './component/Add-Books/AddBooks';
import { PrimeReactProvider } from 'primereact/api';

import "primereact/resources/themes/lara-light-cyan/theme.css";
import Profile from './component/Profile/Profile';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <>
      <ScrollTrigger>

        <PrimeReactProvider value={{styled: false}}>

          <div id="wrapper">
            <NavBar />
            <Routes>
              <Route exact path="/admin" element={<Content />} />
              <Route exact path="/" element={<Content />} />
              <Route exact path="/books" element={<Table />} />
              <Route exact path="/register" element={<Signup />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/add-book" element={<AddBooks />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/pending" element={<Pending />} />
              <Route exact path="/blocked" element={<Blocked />} />
            </Routes>
          </div>

        </PrimeReactProvider>


      </ScrollTrigger>
    </>
  )
}

export default App
