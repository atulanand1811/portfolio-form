import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import Loading from '../util/Loading';

function Introduction({ updateIntroData }) {
    const [userName, setUserName] = useState('');
    const [profession, setProfession] = useState('');
    const [summary, setSummary] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };

    const handleSubmit = () => {
        if (userName !== '' && profession !== '' && summary !== '' && aboutMe !== '' && image !== '') {
            setErrorMsg(false);
            setIsLoading(true); // Set loading to true
            updateIntroData({
                userName,
                profession,
                summary,
                aboutMe,
                image
            });
            setTimeout(() => {
                navigate('/projects');
            }, 1000);
        }
        else {
            setErrorMsg(true);
        }

    }

    return (
        <div className='container mt-5'>
            <h1 className='my-3'>Personal Information</h1>
            <Loading isLoading={isLoading} />
            {errorMsg && <div class="alert alert-danger" role="alert">
                All Fields are Mandatory !!
            </div>}
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="userName" placeholder='Your Name' value={userName} onChange={(e) => handleInputChange(e, setUserName)} />
                <label htmlFor="userName">Name</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="profession" placeholder='Profession' value={profession} onChange={(e) => handleInputChange(e, setProfession)} />
                <label htmlFor="profession">Profession</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="summary" placeholder='Short Description' value={summary} onChange={(e) => handleInputChange(e, setSummary)} />
                <label htmlFor="summary">Summary</label>
            </div>
            <div className="form-floating mb-3">
                <textarea className="form-control" id="aboutMe" placeholder="Write about yourself..." value={aboutMe} onChange={(e) => handleInputChange(e, setAboutMe)} />
                <label htmlFor="aboutMe">Description</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="image" placeholder='Image' value={image} onChange={(e) => handleInputChange(e, setImage)} />
                <label htmlFor="image">Profile Image Url</label>
            </div>
            <button onClick={handleSubmit} className="btn btn-primary"> Save </button>
        </div>
    );
}

export default Introduction;