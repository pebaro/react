import React from 'react';

const ReloadDemo = ( props ) => ( 
    <button onClick={ props.handleRestoreDemoData } className="btn-restore">
        Load Demo
    </button>
);

export default ReloadDemo;