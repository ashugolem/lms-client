import React, { useState } from 'react'
import ScrollTrigger from 'react-scroll-trigger'
import CountUp from "react-countup";

export default function Counter(props) {
    const [CounterOn, setCounterOn] = useState(false)
    let end = props.end;
    return (
        <ScrollTrigger onEnter={() => { setCounterOn(true) }} onExit={() => { setCounterOn(false) }}>
            <div
                className="text-light text-larger fw-bold h6 mb-0"
                data-aos="zoom-out"
                data-aos-duration="950"
                data-aos-delay="300">
                <span>
                    {CounterOn && <CountUp start={0} end={end} delay={0.1} />}{props.text}
                </span>
            </div>
        </ScrollTrigger>
    )
}
