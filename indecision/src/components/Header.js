import React from 'react';

const Header = ( props ) => (
    <div id="entry-header">
        <h1>{ props.title }</h1>
        { 
            props.subtitle && 
                <h2>{ props.subtitle }&nbsp; <span>--react -webpack -babel</span></h2> 
        }
    </div>
);
Header.defaultProps = {
    title: 'Indecision'
}

export default Header;