import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Work from './Work';
import Loading from '../util/Loading';
import { useNavigate } from 'react-router-dom';

function Experience({ updateExperienceData }) {
    const [organization, setOrganization] = useState('');
    const [timeToFrom, setTimeToFrom] = useState('');
    const [enableButton, setEnableButton] = useState(true);
    const [experience, setExperience] = useState([]);
    const [projects, setProjects] = useState([]);
    const [errorMsg, setErrorMsg] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };

    const updateWorkData = (data) => {
        setProjects(prevState => ({ ...prevState, ...data }));
    }

    const addMore = () => {
        console.log(organization, projects, timeToFrom);
        if (organization !== '' && timeToFrom !== '' && projects.length !== 0) {
            const newExp = {
                organizations: organization,
                timeToFrom: timeToFrom,
                projects: projects
            }
            setExperience([...experience, newExp]);
            alert(organization + " added to your experience !!")
            setOrganization('');
            setTimeToFrom('');
            setProjects([]);
            setEnableButton(true);
            setErrorMsg(false);

        } else {
            if (organization !== '' && timeToFrom !== '' && (projects === undefined || projects.length <= 0)) {
                alert('Please add your work for ' + organization + '!! Click on Add Projects Button!!')
            }
            setErrorMsg(true);
        }
    }

    const handleSubmit = () => {
        if (experience.length > 0) {
            const newExp = {
                organizations: organization,
                timeToFrom: timeToFrom,
                projects: projects
            }
            setExperience([...experience, newExp]);
            updateExperienceData({ experience });
            setExperience([]);
            setIsLoading(true);
            setTimeout(() => {
                navigate('/generate');
            }, 1000);
        } else {
            alert("You cannot add empty work experience! Add Projects also for the respective organization!!")
            setErrorMsg(true);
        }

    }

    const enableProject = () => {
        if (organization !== '' && timeToFrom !== '') {
            setEnableButton(false);
            setErrorMsg(false);
        } else {
            alert("First Add Organization Details !! ")
            setEnableButton(true);
            setErrorMsg(true);
        }
    }

    return (
        <div className='container'>
            <h1 className='my-3'>Work Experience</h1>
            {errorMsg && <div class="alert alert-danger" role="alert">
                All Fields are Mandatory !!
            </div>}
            <Loading isLoading={isLoading} />
            <div className='mb-2'>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="organization" placeholder='Company Name' value={organization}
                        onChange={(e) => handleInputChange(e, setOrganization)} />
                    <label htmlFor="name">Organization Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input className="form-control" id="timeToFrom" placeholder="time" value={timeToFrom}
                        onChange={(e) => handleInputChange(e, setTimeToFrom)} />
                    <label htmlFor="description">Description</label>
                </div>
                {enableButton ?
                    <button className="btn btn-info" onClick={enableProject}>Add Projects</button> :
                    <Work updateWorkData={updateWorkData} />
                }

            </div>
            {projects.length !== 0 && <>
                <button className="btn btn-primary" onClick={addMore}>Save Organization Details</button>
                <br />
            </>
            }
            <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Experience