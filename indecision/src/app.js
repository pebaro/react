/**
 * INDECISION APP
 */

class IndecisionApp extends React.Component {
    constructor( props ){
        super( props );

        this.handleAddTask          = this.handleAddTask.bind( this );
        this.handleRandomSelection  = this.handleRandomSelection.bind( this );
        this.handleDeleteTasks      = this.handleDeleteTasks.bind( this );
        this.handleDeleteSingleTask = this.handleDeleteSingleTask.bind( this );
        this.handleRestoreDemoData  = this.handleRestoreDemoData.bind( this );

        this.state                  = { tasks: props.tasks };
    }

    componentDidMount(){
        try {
            const json = localStorage.getItem( 'tasks' );
            const tasks = JSON.parse( json );
    
            if ( tasks ) this.setState( () => ( { tasks } ) );
            
            console.log( 'Component Mounted Using LocalStorage' );

        } catch ( e ){
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

    handleAddTask( task ){
        if ( ! task ) return 'Please Enter Some Text To Create A New Task';

        else if ( this.state.tasks.indexOf( task ) > -1 ) return 'This Task Already Exists';

        this.setState( previousState => ( { tasks: previousState.tasks.concat( task ) } ) );
    }
    handleRandomSelection(){
        const randomNumber      = Math.floor( Math.random() * this.state.tasks.length );
        const randomSelection   = this.state.tasks[ randomNumber ];

        alert( randomSelection );
    }
    handleDeleteTasks(){ 
        this.setState( () => ( { tasks: [] } ) );
    }
    handleDeleteSingleTask( taskToRemove ){
        this.setState( previousState => ( {
            tasks: previousState.tasks.filter( task => {
                return taskToRemove !== task;
            } )
        } ) );
    }

    handleRestoreDemoData(){
        localStorage.clear(); location.reload();
    }

    render(){
        const subtitle  = 'Make some choices!';

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
                </div>
            </div>
        );
    }
}
IndecisionApp.defaultProps = { tasks: [] }

const Header = ( props ) => {
    return (
        <div id="entry-header">
            <h1>{ props.title }</h1>
            { 
                props.subtitle && 
                    <h2>{ props.subtitle }&nbsp; <span>--react-built</span></h2> 
            }
        </div>
    );
}
Header.defaultProps = {
    title: 'Indecision'
}

const Action = ( props ) => {
    return (
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
}

const Tasks = ( props ) => {
    return (
        <div className="row">
            <div className="row">
                <span id="tasks-count" className="col-9">
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
}

const Task = ( props ) => {
    return ( 
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
}

class AddTask extends React.Component {
    constructor( props ){
        super( props );

        this.handleAddTask = this.handleAddTask.bind( this );

        this.state = { error: undefined }
    }
    handleAddTask( e ){
        e.preventDefault();

        const taskValue = e.target.taskinput.value.trim();
        const error     = this.props.handleAddTask( taskValue );

        this.setState( () => ( { error } ) );

        if ( ! error ) e.target.taskinput.value = '';
    }
    render(){
        return (
            <div className="row">
                { this.state.error && <p>{ this.state.error }</p> }
                <form onSubmit={ this.handleAddTask }>
                    <input className="col-9" type="text" name="taskinput"/>
                    <button className="btn col-3">Add Task</button>
                </form>
            </div>
        );
    }
}


const ReloadDemo = ( props ) => {
    return ( 
        <div className="fl-left">
            <button onClick={ props.handleRestoreDemoData } className="btn-restore">
                Restore Demo
            </button>
        </div> 
    );
}


// SEND TO THE BROWSER
ReactDOM.render( <IndecisionApp tasks={ [ 
    'Click the \'Remove All\' button to clear the example tasks', 
    'Create your own tasks using the input field and \'Add Task\' button', 
    'If you can\'t decide what to do then use the button \'Choose A Task At Random\'', 
    'Go ahead and to have fun using the Indecision App' 
] } />, document.getElementById( 'app' ) );
