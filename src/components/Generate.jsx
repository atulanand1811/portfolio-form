import React, { useState } from 'react';

function Generate({ intro, work, contactInfo, experience, skills }) {
    const [user, setUser] = useState({
        intro,
        work,
        contactInfo,
        experience,
        skills
    });
    const [url, setUrl] = useState('');

    const buildBody = (user) => {
        let exp = [];
        let expCopy = experience.experience;
        for(let i=0; i<expCopy.length; i++) {
            let newExp = {
                organization:expCopy[i].organizations,
                timeToFrom:expCopy[i].timeToFrom,
                projects:expCopy[i].projects.project
            };
            exp.push(newExp);
        }

        let transformReq = {
            image:intro.image,
            userName: intro.userName,
            profession: intro.profession,
            summary: intro.summary,
            aboutMe: intro.aboutMe,
            skills: skills.skills,
            linkedIn: contactInfo.linkedIn,
            github: contactInfo.github,
            emailId: contactInfo.email,
            works: work.work,
            experience: exp
        };
        return transformReq;

    }

    const handleSubmit = async () => {
        const requestBody = buildBody(user);
        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.text();
            console.log(data);
            setUrl(data);
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
     };
    return (
        <div className="container">
            <h1>You are all set to generate you portfolio</h1>
            <p>Click on Generate button to get the URL</p>
            <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
            {url !== '' && <p>Your Portfolio URL : {url} </p>}
        </div>
    )
}

export default Generate