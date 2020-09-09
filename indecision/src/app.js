import React            from 'react';                       // react
import ReactDOM         from 'react-dom';                   // react DOM
import IndecisionApp    from './components/IndecisionApp';  // Indecision App class

import './styles/main.scss';                                 // main stylesheet


ReactDOM.render( <IndecisionApp tasks={ [ 
    'Click the \'Remove All\' button to clear the example tasks', 
    'Create your own tasks using the input field and \'Add Task\' button', 
    'If you can\'t decide what to do then use the button \'Choose A Task At Random\'', 
    'Go ahead and to have fun using the Indecision App' 
] } />, document.getElementById( 'app' ) );
