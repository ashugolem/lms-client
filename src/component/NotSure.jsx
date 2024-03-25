import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";

function NotSure(props) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
      <section className="py-xl-2 w-100 mt-2 mb-5">
        <div className="container">
          <div className="text-white bg-primary border rounded border-0 border-primary d-flex flex-column justify-content-between align-items-center flex-lg-row p-4 p-md-5" data-aos="fade" style={{ borderRadius: '10px!important' }}>
            <div className="pb-2 pb-lg-1">
              <h2 className="fw-bold text-warning mb-2 text-center">{props.heading}</h2>
              <p className="mb-0">{props.description}</p>
            </div>
            <div className="my-2"><a className="btn btn-light fs-5 py-2 px-4" role="button" data-aos="fade-in" data-aos-delay="150" to={'/contact'} style={{ borderRadius: '5rem' }}>Contact us</a></div>
          </div>
        </div>
      </section>
  );
}

export default NotSure;
