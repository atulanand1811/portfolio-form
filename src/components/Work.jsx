import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function Work({ updateWorkData }) {
    const [name, setName] = useState('');
    const [responsibility, setResponsibility] = useState('');
    const [techStack, setTechStack] = useState('');
    const [role, setRole] = useState('');
    const [project, setproject] = useState([]);
    const [errorMsg, setErrorMsg] = useState(false);

    const addMore = () => {
        if (name !== '' && responsibility !== '' && techStack !== '' && role !== '') {
            setErrorMsg(false);
            const newWork = {
                name: name,
                responsibility: responsibility,
                techstack: techStack,
                role: role,
            };
            setproject([...project, newWork]);
            handleSubmit();
            // Reset the form fields after adding the work
            setName('');
            setResponsibility('');
            setTechStack('');
            setRole('');
            setErrorMsg(false);
        } else {
            setErrorMsg(true);
        }
    }
    const deleteWork = (indexToDelete) => {
        setproject(project.filter((_, index) => index !== indexToDelete));
    };

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };


    const handleSubmit = () => {
        if (project !== undefined && project.length > 0) {
            updateWorkData({ project });
        }else{
            setErrorMsg(true);
        }
    }

    return (
        <div className='container mt-5 mb-3'>
            <h2 className='my-1'>Work Details</h2>
            {project.length > 0 &&
                <table className='table mb-2'>
                    <thead>
                        <tr>
                            <th scope='col'>Project Name</th>
                            <th scope='col'>Responsibility</th>
                            <th scope='col'>Technology Used</th>
                            <th scope='col'>Role</th>
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {project.map((w, i) => (
                            <tr key={i}>
                                <th scope='row'>{w.name}</th>
                                <td>{w.responsibility}</td>
                                <td>{w.techStack}</td>
                                <td>{w.role}</td>
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
                
                {errorMsg && <div class="alert alert-danger" role="alert">
                    All Fields are Mandatory !!
                </div>}
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="name" placeholder='Your Name' value={name}
                        onChange={(e) => handleInputChange(e, setName)} />
                    <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea className="form-control" id="responsibility" placeholder="Responsibility" value={responsibility}
                        onChange={(e) => handleInputChange(e, setResponsibility)} />
                    <label htmlFor="responsibility">Responsibility</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="techStack" placeholder='Technology Used' value={techStack}
                        onChange={(e) => handleInputChange(e, setTechStack)} />
                    <label htmlFor="techStack">Technology USed</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="role" placeholder='Role' value={role}
                        onChange={(e) => handleInputChange(e, setRole)} />
                    <label htmlFor="role">Role</label>
                </div>
                <button className="btn btn-info" onClick={addMore}>Add</button>

            </div>

            <button className="btn btn-success" onClick={handleSubmit}>Save</button>
        </div>
    )
}

export default Work