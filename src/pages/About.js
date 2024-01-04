import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import SectionLink from "../components/SectionLink";
import { ReactComponent as LeftEye } from "../assets/left_eye.svg";
import { ReactComponent as RightEye } from "../assets/right_eye.svg";
import { ReactComponent as Pupil } from "../assets/pupil.svg";

import girl from "../assets/girl_color.png";
import mountainsLeft from "../assets/left_color.png";
import mountainsRight from "../assets/right_color.png";

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
    //scroll animation for eyes
    const handleScroll = () => {
      const newScroll =
        (window.scrollY * 4) /
        (document.body.offsetHeight - window.innerHeight);
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
        <div id="what_is_emdr" className="content__block">
          <h1>– Wait, what the heck is EMDR? Is it evidence-based?</h1>
          <p>
            <b>Eye Movement Desensitization and Reprocessing</b> (EMDR) is a
            scientifically validated psychotherapy type that helps to manage
            anxiety and trauma by enabling a unique state of mind that
            facilitates the reprocessing of memories. <br />
            This "reprocessing" allows individuals to re-evaluate or rethink how
            a memory affects them emotionally. It's achieved through specific
            eye movements or other forms of rhythmic, left-right (bilateral)
            stimulation that aids in processing triggers and painful emotions
            associated with distressing memories​​.
            <br />
            <br /> These movements are akin to the memory processing that occurs
            during the Rapid Eye Movement (REM) phase of sleep, crucial for
            memory integration​​. The lateral eye movements in EMDR are believed
            to foster distraction, and synchronization of the brain's two
            hemispheres, enhancing the processing of traumatic memories​​.{" "}
            <br />
            <br />
          </p>
        </div>
        <div id="how_to_use" className="content__block">
          <h1>– How can I use this tool?</h1>
          <p>
            The eye movement and bilateral tapping helpers within this tool can
            be employed during an anxiety episode or when a troubling memory
            surfaces, aiding in calming the nervous system and promoting
            emotional healing.
            <br />
            <br /> The tool is adapted for both desktop and mobile usage only
            for <b>Chrome and Safari.</b>
            <br />
            <b>
              It can be used for conducting remote (EMDR) therapy sessions as
              well! <br />
              <br />
            </b>
          </p>

          <h1 className="how-to__follow">Simply: Follow. The. Dot. </h1>
          <h2 className="how-to__follow__subtitle">until you feel better</h2>

          <div className="how-to__showcase">
            <div className="dot" />
          </div>

          <p className="how-to__speed">
            <b> Flip your phone horizontally!</b>
            <br />
            <br />
            The standard speed of the dot is set for 1 Hz by default = 1 cycle
            (from left - to right - back to left side of the screen). <br />{" "}
            Generally, the recommended speed falls between 1 and 2 Hz.
            <br />
          </p>
          <p className="how-to__speed">
            <b>PRO TIP:</b> Find a quite and safe environment; if you have a
            monitor - take advantage of a good posture.
          </p>

          <SectionLink to="/" variation="hyperlink">
            &#8594; THE TOOL &#8592;
          </SectionLink>
        </div>

        <div id="disclaimer" className="content__block">
          <p className={"disclaimer"}>
            <b>Disclaimer: </b>The information provided about EMDR is for
            educational purposes. It's crucial to conduct your own research and
            possibly consult with a professional therapist before engaging in
            self-administered EMDR, especially if dealing with severe trauma or
            PTSD.
          </p>
        </div>
      </div>

      <div className="art-composition">
        <img
          className="art-composition__center"
          alt="girl walking"
          src={girl}
        />
        <img
          className="art-composition__left"
          alt="mountains"
          src={mountainsLeft}
        />

        <img
          className="art-composition__right"
          alt="mountains"
          src={mountainsRight}
        />
      </div>

      <div className="content">
        <div className="created-by">
          <h2 className="created-by__text">
            From my journey of healing, I hope to delineate a path of
            tranquility for people grappling with anxiety and trauma.
            <br />
            Support the free tool and share it with others who may need it.
          </h2>
          <h3 className="created-by__signature">
            – Alisa, the developer of the tool
          </h3>
          <div className="created-by__links">
            <Link to="https://www.github.com/notsousual">github</Link>
            <Link to="https://www.linkedin.com/in/alisa-zakhtarenko-641604182/l">
              linkedIn
            </Link>
          </div>
          <p className="gratitude">
            <b>Special thanks to:</b> <br />
            Anastasiia Rogozhkina for manual testing of the tool <br />
            Janna Akimova, Fedor Fedorchuk for feedback and moral support
            <br />
            code sisters community members - for everything :) <br />
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;

// TODO: to implement

//font loader
// const [fontsLoaded, setFontsLoaded] = useState(false);

// useEffect(() => {
//   // Check if all fonts have been loaded
//   document.fonts.ready.then(() => {
//     setFontsLoaded(true); // Set to true only when fonts are loaded
//   });
// }, []);
