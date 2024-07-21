import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Loading from '../util/Loading';
import { useNavigate } from 'react-router-dom';

function Contact({ updateContactInfo }) {
    const [linkedIn, setLinkedIn] = useState('');
    const [email, setEmail] = useState('');
    const [github, setGithub] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };

    const handleSubmit = () => {
        if (linkedIn !== '' && github !== '' && email !== '' && phoneNumber !== '') {
            setIsLoading(true);
            setErrorMsg(false);
            updateContactInfo({
                linkedIn,
                github,
                email,
                phoneNumber
            })
            setTimeout(() => {
                navigate('/skills');
            }, 1000);
        }
        else {
            setErrorMsg(true);
        }
    }

    return (
        <div className='container mb-2'>
            <h1 className='my-3'>Contact Information</h1>
            {errorMsg && <div class="alert alert-danger" role="alert">
                All Fields are Mandatory !!
            </div>}
            <Loading isLoading={isLoading} />
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="linkedIn" placeholder='linkedIn' value={linkedIn}
                    onChange={(e) => handleInputChange(e, setLinkedIn)} />
                <label htmlFor="linkedIn">LinkedIn Url</label>
            </div>
            <div className="form-floating mb-3">
                <input type='email' className="form-control" id="email" placeholder="Email Id" value={email}
                    onChange={(e) => handleInputChange(e, setEmail)} />
                <label htmlFor="email">Email Id</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="github" placeholder='GitHub' value={github}
                    onChange={(e) => handleInputChange(e, setGithub)} />
                <label htmlFor="github">Github Url</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="phoneNumber" placeholder='phoneNumber' value={phoneNumber}
                    onChange={(e) => handleInputChange(e, setPhoneNumber)} />
                <label htmlFor="phoneNumber">Phone Number</label>
            </div>
            <button className="btn btn-info" onClick={handleSubmit}>Save</button>

        </div>

    )
}

export default Contact;