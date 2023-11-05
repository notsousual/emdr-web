import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import SectionLink from "../components/SectionLink";
import { ReactComponent as LeftEye } from "../assets/left_eye.svg";
import { ReactComponent as RightEye } from "../assets/right_eye.svg";
import { ReactComponent as Pupil } from "../assets/pupil.svg";

import "./About.scss";

function About() {
  const [scroll, setScroll] = useState(0);
  const [navHeight, setNavHeight] = useState(200);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      let elem = document.getElementById(location.hash.slice(1));
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const newScroll =
        window.scrollY / (document.body.offsetHeight - window.innerHeight);
      setScroll(newScroll);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const elementRef = useRef(null);

  useEffect(() => {
    // Function to update the CSS variable with the element's current height
    const updateHeightVariable = () => {
      const height = elementRef.current.clientHeight;

      setNavHeight(height);
      document.documentElement.style.setProperty("--nav-height", `${height}px`);
    };

    // Initial update
    updateHeightVariable();

    // Set up a ResizeObserver to listen for changes in the element's height
    const resizeObserver = new ResizeObserver(() => {
      updateHeightVariable();
    });

    // Start observing the element
    resizeObserver.observe(elementRef.current);

    // Clean up the observer on component unmount
    return () => resizeObserver.disconnect();
  }, []); // Empty dependency array ensures this effect runs once on mount
  return (
    <div className="About">
      <div
        className="introduction"
        style={{ "--nav-height": `${navHeight}px` }}
      >
        <div className={"eyes"} style={{ "--scroll": scroll }}>
          <div className="eye eye-left">
            <LeftEye className="eye-svg" />
            <Pupil className="pupil" />
          </div>
          <div className="eye eye-right" style={{ marginBottom: 8 }}>
            <RightEye className="eye-svg" />
            <Pupil className="pupil" />
          </div>
        </div>

        <div className="paragraph">
          <SectionLink to="/" variation="hyperlink">
            &#8594; THE TOOL &#8592;
          </SectionLink>
          <p>
            In light of the ongoing global wars and the burgeoning need for
            accessible mental health resources in 2023, I developed this
            platform. It’s designed to provide a free, self-administered version
            of EMDR therapy techniques for managing anxiety, trauma responses
            and calming the nervous system down.
          </p>
        </div>
      </div>

      <div className="navigation" ref={elementRef}>
        <SectionLink to={"/about#what_is_emdr"}>What is EMDR?</SectionLink>
        <SectionLink to={"/about#how_to_use"}>How to use</SectionLink>
        <SectionLink to={"/about#disclaimer"} variation="disclaimer">
          DISCLAIMER
        </SectionLink>
      </div>

      <div className="content">
        <div id="what_is_emdr">
          <h2>– Wait, what the heck is EMDR? Is it evidence-based?</h2>
          <p>
            <b>Eye Movement Desensitization and Reprocessing</b> (EMDR) is a
            scientifically validated psychotherapy type that helps to manage
            anxiety and trauma by enabling a unique state of mind that
            facilitates the reprocessing of memories. This "reprocessing" allows
            individuals to re-evaluate or rethink how a memory affects them
            emotionally. It's achieved through specific eye movements or other
            forms of rhythmic, left-right (bilateral) stimulation that aids in
            processing memories, triggers, and painful emotions associated with
            trauma or other distressing conditions​​.
            <br />
            <br /> These movements are akin to the memory processing that occurs
            during the Rapid Eye Movement (REM) phase of sleep, crucial for
            memory integration​1​. The lateral eye movements in EMDR are
            believed to foster distraction, relaxation, and synchronization of
            the brain's two hemispheres, enhancing the processing of traumatic
            memories and aiding in coping with anxiety and PTSD effectively​​.{" "}
            <br />
            <br />
            EMDR changes how the memories are stored and processed in the brain,
            ultimately reducing or eliminating the problematic symptoms​.
          </p>
        </div>
        <div id="how_to_use">
          <h2>– How can I use this tool?</h2>
          <p>
            The eye movement and bilateral tapping/movement helpers within this
            tool can be employed during a panic attack, anxiety episode, or when
            a troubling memory surfaces, aiding in calming the nervous system
            and promoting emotional healing. The platform also offers guides on
            performing these techniques.
            <br />
            <br /> The tool website is adapted for both desktop and mobile
            usage.
            <br />
            <br />
            <b>
              This tool can be used for conducting remote (EMDR) therapy
              sessions as well!
            </b>
          </p>
        </div>

        <p id="disclaimer" className="disclaimer">
          <b>Disclaimer: </b>The information provided about EMDR is for
          educational purposes. It's crucial to conduct your own research and
          possibly consult with a professional therapist before engaging in
          self-administered EMDR, especially if dealing with severe trauma or
          PTSD.
        </p>
      </div>
    </div>
  );
}

export default About;
