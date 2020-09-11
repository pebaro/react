import React from 'react';

const Task = ( props ) => ( 
    <div className="flex-row">
        <li>{ props.taskText }</li> 

        <div>
            <span className="faint right-20">&mdash;</span>

            <button 
                onClick={ e => {
                    props.handleDeleteSingleTask( props.taskText );
                } } 
                className="left-10"
            >
                Remove
            </button>
        </div>
    </div>
);

export default Task;