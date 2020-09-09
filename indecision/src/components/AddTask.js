import React from 'react';

export default class AddTask extends React.Component {
    state = { error: undefined };

    handleAddTask = ( e ) => {
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
                    <button className="btn btn-flat-ls col-3">Add Task</button>
                </form>
            </div>
        );
    }
}
