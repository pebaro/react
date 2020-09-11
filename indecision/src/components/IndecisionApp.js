import React        from 'react';
import ReloadDemo   from './ReloadDemo';    // ReloadDemo function
import AddTask      from './AddTask';       // AddTask class
import Header       from './Header';        // Header function
import Action       from './Action';        // Action function
import Tasks        from './Tasks';         // Tasks function (imports Task function)
import TaskModal    from './TaskModal';     // TaskModal function


export default class IndecisionApp extends React.Component {
    
    state = { 
        tasks:          this.props.tasks ,
        selectedTask:   undefined
    };

    // event handlers relating to tasks
    handleAddTask = ( task ) => {
        if ( ! task ) 
            return 'Please Enter Some Text To Create A New Task';

        else if ( this.state.tasks.indexOf( task ) > -1 ) 
            return 'This Task Already Exists';

        this.setState( previousState => ( { tasks: previousState.tasks.concat( task ) } ) );
    };
    handleDeleteSingleTask = ( taskToRemove ) => {
        this.setState( previousState => ( { tasks: previousState.tasks.filter( task => taskToRemove !== task ) } ) );
    };
    handleDeleteTasks = () => this.setState( () => ( { tasks: [] } ) );

    // event handlers relating to the modal
    handleRandomSelection = () => {
        const randomNumber      = Math.floor( Math.random() * this.state.tasks.length );
        const randomSelection   = this.state.tasks[ randomNumber ];

        this.setState( () => ( { selectedTask: randomSelection } ) );
    };
    handleClearRandomSelection = () => this.setState( () => ( { selectedTask: undefined } ) );

    // event handler to restore demo
    handleRestoreDemoData = () => {
        localStorage.clear(); 
        location.reload();
    };


    componentDidMount(){
        try {
            const json = localStorage.getItem( 'tasks' );
            const tasks = JSON.parse( json );
    
            if ( tasks ) this.setState( () => ( { tasks } ) );
            
            console.log( 'Component Mounted Using LocalStorage' );
        } 
        catch ( e ){
            console.log( 'something went wrong:', e );
        }
    }
    componentDidUpdate( previousProps, previousState ){
        if ( previousState.tasks.length !== this.state.tasks.length ){ 
            const json = JSON.stringify( this.state.tasks );
            localStorage.setItem( 'tasks', json );
            console.log( 'Saving Data To LocalStorage' ); 
        }
    }


    render(){
        const subtitle  = 'Choose A Task And Get It Done!';

        return (
            <div id="main-wrapper">
                <ReloadDemo handleRestoreDemoData={ this.handleRestoreDemoData } />
                <div id="entry-main">
                    <Header subtitle={ subtitle } />
                    <Action 
                        handleRandomSelection={ this.handleRandomSelection }
                        hasTasks={ this.state.tasks.length > 0 } 
                    />
                    <Tasks 
                        tasks={ this.state.tasks } 
                        handleDeleteTasks={ this.handleDeleteTasks }
                        handleDeleteSingleTask={ this.handleDeleteSingleTask }
                    />
                    <AddTask
                        handleAddTask={ this.handleAddTask }
                    />
                    <TaskModal 
                        selectedTask={ this.state.selectedTask }
                        clearRandomSelection={ this.handleClearRandomSelection }
                    />
                </div>
            </div>
        );
    }
}
IndecisionApp.defaultProps = { tasks: [] };