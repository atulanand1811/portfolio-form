import React from 'react';
import { ClipLoader } from 'react-spinners';
import '../App.css';

const Loading = ({ isLoading }) => {
 if (!isLoading) return null;

 return (
    <div className="loading-overlay">
      <div className="loading-content">
        <ClipLoader color="#000" loading={isLoading} size={50} />
      </div>
    </div>
 );
};

export default Loading;