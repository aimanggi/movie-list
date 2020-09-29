import React from 'react';

const Card = ({data, type}) => {
    return (
        <div className={`card ${type}`}>
           <img src="https://picsum.photos/seed/picsum/300/500" alt="test" /> 
           <div className="card-title"> test</div>
        </div>
    );
};

export default Card;