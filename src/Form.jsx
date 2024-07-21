import React, { useState } from 'react';
import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';
import Introduction from './components/Introduction';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Generate from './components/Generate';

function Form() {
  const [intro, setIntro] = useState({
    userName: '',
    profession: '',
    image: '',
    summary: '',
    aboutMe: '',
  });
  const [work, setWork] = useState([]);
  const [contactInfo, setContactInfo] = useState({
    linkedIn: '',
    github: '',
    emailId: '',
    phoneNumber: ''
  });
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState("");

  const updateIntroData = (data) => {
    setIntro(prevState => ({ ...prevState, ...data }));
  };
  const updateProjects = (data) => {
    setWork(prevState => ({ ...prevState, ...data }));
  };
  const updateContactInfo = (data) => {
    setContactInfo(prevState => ({ ...prevState, ...data }));
  };
  const updateExperienceData = (data) => {
    setExperience(prevState => ({ ...prevState, ...data }));
  }
  const updateSkillsData = (data) => {
    setSkills(prevState => ({ ...prevState, ...data }));
  }
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="*" element={<Introduction updateIntroData={updateIntroData} />} />
          <Route path="/projects" element={<Projects updateProjects={updateProjects} />} />
          <Route path="/contact" element={<Contact updateContactInfo={updateContactInfo} />} />
          <Route path="/experience" element={<Experience updateExperienceData={updateExperienceData} />} />
          <Route path="/skills" element={<Skills updateSkillsData={updateSkillsData} />} />
          <Route path="/generate" element={<Generate intro={intro} work={work} contactInfo={contactInfo} experience={experience} skills={skills} />} />
        </Switch>
      </Router>
    </>
  );
}

export default Form;