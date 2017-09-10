import React, {Component} from 'react';
import './App.css';

class TodoItems extends Component {
    render() {
        let todoEntries = this.props.entries;
        let listItems = todoEntries.sort((a, b) => b.id - a.id).map((item) =>
            <li key={item.id}>
                <div className={"task-id"}>{item.id}</div>
                <p className={'task-content'}>{item.text}</p>
                <div className={'task-date'}>{item.date}</div>
            </li>
        );
        return (
            <ul className={"list"}>
                {listItems}
            </ul>
        )
    }
}

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
        this.addItem = this.addItem.bind(this);
        this.submitWithKey = this.submitWithKey.bind(this);
    }

    submitWithKey(e) {
        e.preventDefault();
        if (e.shiftKey && e.keyCode === 13) {
            this.addItem();
            console.log("Pressed");
        }
    };

    addItem(e) {
        if(e){
            e.preventDefault();
        }
        let tasks = this.state.items;
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;
        console.log(dateTime);
        tasks.push({
            id: tasks.length,
            text: this._inputElement.value.trim(),
            date: dateTime
        });

        this.setState({
            items: tasks
        });
        console.log("1");
        this._inputElement.value = '';
        console.log(tasks);

    }

    render() {

        return (
            <div>
                <form className={"todo-list"} onSubmit={this.addItem}>
                    <textarea ref={(a) => this._inputElement = a} type="text" placeholder={"Enter task"}
                              onKeyUp={this.submitWithKey}/>
                    <button type="submit">Add</button>
                </form>
                <TodoItems entries={this.state.items}/>
            </div>
        )
    }
}

class App extends Component {
    render() {
        return (
            <div className={"container"}>
                <TodoList/>
            </div>
        );
    }
}

export default App;
