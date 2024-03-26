import { Routes, Route } from 'react-router-dom';
import { NavBar } from './component/NavBar';
import Content from './component/Content';
import Table from './component/Table';
import Signup from './component/SignUp/Signup';
import Login from './component/Login/Login';
import Pending from './component/Pending';
import Blocked from './component/Blocked';
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollTrigger from "react-scroll-trigger";
import { useEffect } from 'react';
import AddBooks from './component/Add-Books/AddBooks';
import { PrimeReactProvider } from 'primereact/api';
import Alerts from './component/Alerts/Alerts'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Profile from './component/Profile/Profile';
import { CookiesProvider } from 'react-cookie';
import ProtectedRoute from './ProtectedRoute';
import Fine from './component/Fine/Fine';
import BookTransaction from './component/Transactions/BookTransaction';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <>
      <ScrollTrigger>
        <CookiesProvider>
          <PrimeReactProvider value={{ styled: false }}>

            <div id="wrapper">
              <NavBar />
              <Routes>
                <Route exact path="/register" element={<Signup />} />
                <Route exact path="/login" element={<Login />} />
                {/* Protected Routes */}
                <Route exact path="/admin" element={
                  <ProtectedRoute roles={['Admin']}>
                    <Content />
                  </ProtectedRoute>
                } />
                <Route exact path="/books" element={
                  <ProtectedRoute roles={['Admin', 'Teacher', 'Student']}>
                    <Table />
                  </ProtectedRoute>
                } />
                <Route exact path="/" element={
                  <ProtectedRoute roles={['Admin', 'Teacher', 'Student']}>
                    <Table />
                  </ProtectedRoute>
                } />
                <Route exact path="/profile" element={
                  <ProtectedRoute roles={['Admin', 'Teacher', 'Student']}>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route exact path="/request" element={
                  <ProtectedRoute roles={['Admin']}>
                    <Alerts/>
                  </ProtectedRoute>
                } />
                <Route exact path="/add-book" element={
                  <ProtectedRoute roles={['Admin', 'Teacher']}>
                    <AddBooks />
                  </ProtectedRoute>
                } />
                <Route exact path="/transaction" element={
                  <ProtectedRoute roles={['Admin', 'Teacher', 'Student']}>
                    <BookTransaction />
                  </ProtectedRoute>
                } />
                <Route exact path="/fine" element={
                  <ProtectedRoute roles={['Admin', 'Teacher', 'Student']}>
                    <Fine />
                  </ProtectedRoute>
                } />
                <Route exact path="/pending" element={<Pending />} />
                <Route exact path="/blocked" element={<Blocked />} />
              </Routes>
            </div>

          </PrimeReactProvider>

        </CookiesProvider>
      </ScrollTrigger>
    </>
  )
}

export default App
