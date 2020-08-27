'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * INDECISION APP
 */

var IndecisionApp = function (_React$Component) {
    _inherits(IndecisionApp, _React$Component);

    function IndecisionApp(props) {
        _classCallCheck(this, IndecisionApp);

        var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

        _this.handleAddTask = _this.handleAddTask.bind(_this);
        _this.handleRandomSelection = _this.handleRandomSelection.bind(_this);
        _this.handleDeleteTasks = _this.handleDeleteTasks.bind(_this);
        _this.handleDeleteSingleTask = _this.handleDeleteSingleTask.bind(_this);
        _this.handleRestoreDemoData = _this.handleRestoreDemoData.bind(_this);

        _this.state = { tasks: props.tasks };
        return _this;
    }

    _createClass(IndecisionApp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            try {
                var json = localStorage.getItem('tasks');
                var tasks = JSON.parse(json);

                if (tasks) this.setState(function () {
                    return { tasks: tasks };
                });

                console.log('Component Mounted Using LocalStorage');
            } catch (e) {
                console.log('something went wrong:', e);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(previousProps, previousState) {
            if (previousState.tasks.length !== this.state.tasks.length) {
                var json = JSON.stringify(this.state.tasks);
                localStorage.setItem('tasks', json);
                console.log('Saving Data To LocalStorage');
            }
        }
    }, {
        key: 'handleAddTask',
        value: function handleAddTask(task) {
            if (!task) return 'Please Enter Some Text To Create A New Task';else if (this.state.tasks.indexOf(task) > -1) return 'This Task Already Exists';

            this.setState(function (previousState) {
                return { tasks: previousState.tasks.concat(task) };
            });
        }
    }, {
        key: 'handleRandomSelection',
        value: function handleRandomSelection() {
            var randomNumber = Math.floor(Math.random() * this.state.tasks.length);
            var randomSelection = this.state.tasks[randomNumber];

            alert(randomSelection);
        }
    }, {
        key: 'handleDeleteTasks',
        value: function handleDeleteTasks() {
            this.setState(function () {
                return { tasks: [] };
            });
        }
    }, {
        key: 'handleDeleteSingleTask',
        value: function handleDeleteSingleTask(taskToRemove) {
            this.setState(function (previousState) {
                return {
                    tasks: previousState.tasks.filter(function (task) {
                        return taskToRemove !== task;
                    })
                };
            });
        }
    }, {
        key: 'handleRestoreDemoData',
        value: function handleRestoreDemoData() {
            localStorage.clear();location.reload();
        }
    }, {
        key: 'render',
        value: function render() {
            var subtitle = 'Make some choices!';

            return React.createElement(
                'div',
                { id: 'main-wrapper' },
                React.createElement(ReloadDemo, { handleRestoreDemoData: this.handleRestoreDemoData }),
                React.createElement(
                    'div',
                    { id: 'entry-main' },
                    React.createElement(Header, { subtitle: subtitle }),
                    React.createElement(Action, {
                        handleRandomSelection: this.handleRandomSelection,
                        hasTasks: this.state.tasks.length > 0
                    }),
                    React.createElement(Tasks, {
                        tasks: this.state.tasks,
                        handleDeleteTasks: this.handleDeleteTasks,
                        handleDeleteSingleTask: this.handleDeleteSingleTask
                    }),
                    React.createElement(AddTask, {
                        handleAddTask: this.handleAddTask
                    })
                )
            );
        }
    }]);

    return IndecisionApp;
}(React.Component);

IndecisionApp.defaultProps = { tasks: [] };

var Header = function Header(props) {
    return React.createElement(
        'div',
        { id: 'entry-header' },
        React.createElement(
            'h1',
            null,
            props.title
        ),
        props.subtitle && React.createElement(
            'h2',
            null,
            props.subtitle,
            '\xA0 ',
            React.createElement(
                'span',
                null,
                '--react-built'
            )
        )
    );
};
Header.defaultProps = {
    title: 'Indecision'
};

var Action = function Action(props) {
    return React.createElement(
        'div',
        { className: 'btm-20' },
        React.createElement(
            'button',
            {
                disabled: !props.hasTasks,
                onClick: props.handleRandomSelection,
                className: 'btn col-12'
            },
            'Choose A Task At Random'
        )
    );
};

var Tasks = function Tasks(props) {
    return React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'span',
                { id: 'tasks-count', className: 'col-9' },
                props.tasks.length > 0 ? React.createElement(
                    'p',
                    null,
                    'Your Tasks Are . . .'
                ) : React.createElement(
                    'p',
                    null,
                    'No Tasks Exist'
                )
            ),
            React.createElement(
                'button',
                {
                    onClick: props.handleDeleteTasks,
                    disabled: props.tasks.length === 0,
                    className: 'btn col-3'
                },
                'Remove All'
            )
        ),
        React.createElement(
            'div',
            { className: 'row btm-20' },
            props.tasks.length === 0 && React.createElement(
                'p',
                null,
                'Create your first task by entering some text below'
            ),
            React.createElement(
                'ol',
                { id: 'tasks', className: 'col-12' },
                props.tasks.map(function (task, index) {
                    return React.createElement(Task, {
                        key: index + '-' + task,
                        taskText: task,
                        handleDeleteSingleTask: props.handleDeleteSingleTask
                    });
                })
            )
        )
    );
};

var Task = function Task(props) {
    return React.createElement(
        'li',
        { className: '' },
        props.taskText,
        ' ',
        React.createElement(
            'span',
            { className: 'faint left-10' },
            '\u2014'
        ),
        React.createElement(
            'button',
            {
                onClick: function onClick(e) {
                    props.handleDeleteSingleTask(props.taskText);
                },
                className: 'left-10'
            },
            'Remove'
        )
    );
};

var AddTask = function (_React$Component2) {
    _inherits(AddTask, _React$Component2);

    function AddTask(props) {
        _classCallCheck(this, AddTask);

        var _this2 = _possibleConstructorReturn(this, (AddTask.__proto__ || Object.getPrototypeOf(AddTask)).call(this, props));

        _this2.handleAddTask = _this2.handleAddTask.bind(_this2);

        _this2.state = { error: undefined };
        return _this2;
    }

    _createClass(AddTask, [{
        key: 'handleAddTask',
        value: function handleAddTask(e) {
            e.preventDefault();

            var taskValue = e.target.taskinput.value.trim();
            var error = this.props.handleAddTask(taskValue);

            this.setState(function () {
                return { error: error };
            });

            if (!error) e.target.taskinput.value = '';
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'row' },
                this.state.error && React.createElement(
                    'p',
                    null,
                    this.state.error
                ),
                React.createElement(
                    'form',
                    { onSubmit: this.handleAddTask },
                    React.createElement('input', { className: 'col-9', type: 'text', name: 'taskinput' }),
                    React.createElement(
                        'button',
                        { className: 'btn col-3' },
                        'Add Task'
                    )
                )
            );
        }
    }]);

    return AddTask;
}(React.Component);

var ReloadDemo = function ReloadDemo(props) {
    return React.createElement(
        'div',
        { className: 'fl-left' },
        React.createElement(
            'button',
            { onClick: props.handleRestoreDemoData, className: 'btn-restore' },
            'Restore Demo'
        )
    );
};

// SEND TO THE BROWSER
ReactDOM.render(React.createElement(IndecisionApp, { tasks: ['Click the \'Remove All\' button to clear the example tasks', 'Create your own tasks using the input field and \'Add Task\' button', 'If you can\'t decide what to do then use the button \'Choose A Task At Random\'', 'Go ahead and to have fun using the Indecision App'] }), document.getElementById('app'));
