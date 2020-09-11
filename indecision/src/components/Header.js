import React from 'react';

const Header = ( props ) => (
    <div id="entry-header">
        <h1>{ props.title }</h1>
        { 
            props.subtitle && 
                <div className="flex-row"><h2>{ props.subtitle }&nbsp; </h2> <span>--react -webpack -babel -sass</span></div>
        }
    </div>
);
Header.defaultProps = {
    title: 'Indecision'
}

export default Header;