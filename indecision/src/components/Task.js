import React from 'react';

const Task = ( props ) => ( 
    <li className="">
        { props.taskText } <span className="faint left-10">&mdash;</span> 
        <button 
            onClick={ e => {
                props.handleDeleteSingleTask( props.taskText );
            } } 
            className="left-10"
        >
            Remove
        </button>
    </li> 
);

export default Task;