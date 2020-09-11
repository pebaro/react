import React from 'react';
import Modal from 'react-modal';

const modalStyles = {
    overlay: {
        background:     'rgb(0 40 80 / 74%)'
    },
    content: {
        top:            '15%',
        left:           '30%',
        right:          '30%',
        bottom:         'auto',
        padding:        '28px 50px 55px',
        color:          'rgb(188 218 255)',
        wordBreak:      'break-all',
        lineHeight:     '1.5rem',
        background:     '#333',
        border:         '1px solid rgb(188 218 255)',
        borderRadius:   '0px',
        boxShadow:      '0 0 28px 8px rgba( 0, 0, 0, 0.85 )'
    }
}

const TaskModal = ( props ) => (
    <Modal
        isOpen={ ! ! props.selectedTask }
        contentLabel="Randomly Selected Task"
        ariaHideApp={ false }
        style={ modalStyles }
    >
        <h2>Randomly Selected Task</h2>
        { props.selectedTask && <p>{ props.selectedTask }</p> }
        <button onClick={ props.clearRandomSelection } className="btn top-20">Let's Do It</button>
    </Modal>
);

export default TaskModal;