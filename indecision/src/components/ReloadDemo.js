import React from 'react';

const ReloadDemo = ( props ) => ( 
    <div className="fl-left">
        <button onClick={ props.handleRestoreDemoData } className="btn-restore">
            Load Demo
        </button>
    </div> 
);

export default ReloadDemo;