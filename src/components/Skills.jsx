import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Loading from '../util/Loading';
import { useNavigate } from 'react-router-dom';

export default function Skills({ updateSkillsData }) {
    const [technical, setTechnical] = useState("");
    const [soft, setSoft] = useState("");
    const [errorMsg, setErrorMsg] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };

    const handleSubmit = () => {
        if (technical === "" || soft === "") {
            setErrorMsg(true);
        } else {
            const newSkills = technical.concat(",", soft);
            setIsLoading(true);
            updateSkillsData({ skills: newSkills });
            setTimeout(() => {
                navigate('/experience');
            }, 1000);
        }
    }

    return (
        <div className="container">
            <h1 className='my-3'>Skills</h1>
            {errorMsg && <div class="alert alert-danger" role="alert">
                All Fields are Mandatory !!
            </div>}
            <div className='mb-2'>

                <Loading isLoading={isLoading} />
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="technical" placeholder='Technical Skills(seperate with commas)' value={technical}
                        onChange={(e) => handleInputChange(e, setTechnical)} />
                    <label htmlFor="technical">Technical Skills</label>
                </div>
                <div className="form-floating mb-3">
                    <input className="form-control" id="soft" placeholder="Add Soft Skills(seperate with commas)" value={soft}
                        onChange={(e) => handleInputChange(e, setSoft)} />
                    <label htmlFor="soft">Soft Skills</label>
                </div>
                <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}
