import React    from 'react';
import Task     from './Task';   // Task function

const Tasks = ( props ) => (
    <div id="tasks-wrapper" className="row">
        <div className="flex-row">
            <span id="tasks-count">
            {
                props.tasks.length > 0
                    ? <p>Your Tasks Are . . .</p> 
                    : <p>No Tasks Exist</p>
            }
            </span>
            <button 
                onClick={ props.handleDeleteTasks } 
                disabled={ props.tasks.length === 0 } 
                className="btn col-3"
            >
                Remove All
            </button>
        </div>

        <div className="row btm-20">
            { props.tasks.length === 0 && <p>Create your first task by entering some text below</p> }

            <ol id="tasks" className="col-12">
                {
                    props.tasks.map( ( task, index ) => (
                        <Task 
                            key={ index + '-' + task } 
                            taskText={ task } 
                            handleDeleteSingleTask={ props.handleDeleteSingleTask }
                        />
                    ) )
                }
            </ol>
        </div>
    </div>
);

export default Tasks;