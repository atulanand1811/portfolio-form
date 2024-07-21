import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import Loading from '../util/Loading';


function Projects({ updateProjects }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [techstack, setTechstack] = useState('');
    const [url, setUrl] = useState('');
    const [work, setWork] = useState([]);
    const [errorMsg, setErrorMsg] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [counters, setCounters] = useState(1);
    const navigate = useNavigate();

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };

    const addMore = () => {
        if (name !== '' && description !== '' && techstack !== '') {
            setErrorMsg(false);
            setCounters(counters + 1);
            const newWork = {
                name: name,
                description: description,
                techstack: techstack,
                url: url,
            };
            setWork([...work, newWork]);
            setName('');
            setDescription('');
            setTechstack('');
            setUrl('');
        } else {
            setErrorMsg(true);
        }
    }

    const handleSubmit = () => {
        if (work !== undefined && work.length > 0) {
            setIsLoading(true);
            updateProjects({ work });
            setTimeout(() => {
                navigate('/contact');
            }, 1000);
        }
    }
    const deleteWork = (indexToDelete) => {
        setWork(work.filter((_, index) => index !== indexToDelete));
    };


    return (

        <div className='container mt-5 mb-3'>
            <Loading isLoading={isLoading} />
            {work.length > 0 &&
                <table className='table mb-2'>
                    <thead>
                        <tr>
                            <th scope='col'>Project Name</th>
                            <th scope='col'>Description</th>
                            <th scope='col'>Technology Used</th>
                            <th scope='col'>URL</th>
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {work.map((w, i) => (
                            <tr key={i}>
                                <th scope='row'>{w.name}</th>
                                <td>{w.description}</td>
                                <td>{w.techStack}</td>
                                <td>{w.url}</td>
                                <td><button className='btn btn-danger' onClick={() => deleteWork(i)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                    </svg>
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
            <div className='mb-2'>
            <h1 className='my-3'>Personal Works</h1>
                {errorMsg && <div class="alert alert-danger" role="alert">
                    All Fields are Mandatory !!
                </div>}
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="name" placeholder='Your Name' value={name}
                        onChange={(e) => handleInputChange(e, setName)} />
                    <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea className="form-control" id="description" placeholder="Description" value={description}
                        onChange={(e) => handleInputChange(e, setDescription)} />
                    <label htmlFor="description">Description</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="techStack" placeholder='Technology Used' value={techstack}
                        onChange={(e) => handleInputChange(e, setTechstack)} />
                    <label htmlFor="techStack">Technology Used</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="url" placeholder='Url(If Deployed)' value={url}
                        onChange={(e) => handleInputChange(e, setUrl)} />
                    <label htmlFor="url">Url</label>
                </div>
                <button className="btn btn-info" onClick={addMore}>Add</button>

            </div>

            <button className="btn btn-success ml-5" onClick={handleSubmit}>Save</button>
        </div>
    )
}

export default Projects