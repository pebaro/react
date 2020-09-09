import React from 'react';

const Action = ( props ) => (
    <div className="btm-20">
        <button 
            disabled={ ! props.hasTasks } 
            onClick={ props.handleRandomSelection } 
            className="btn col-12"
        >
            Choose A Task At Random
        </button>
    </div>
);
export default Action;