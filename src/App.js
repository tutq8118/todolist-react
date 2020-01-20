import React, { Component } from "react";
import classNames from "classnames";
import "./App.scss";

import TodoItems from "./components/TodoItems";

import tick from "./img/tick.svg";

class App extends Component {
    constructor() {
        super();
        let allNewTask =
            JSON.parse(window.localStorage.getItem("todoItems")) !== null
                ? JSON.parse(window.localStorage.getItem("todoItems"))
                : [];
        this.state = {
            newItem: "",
            todoItems: allNewTask,
            filterMode: "all"
        };
        this.onItemClicked = this.onItemClicked.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onCheckAll = this.onCheckAll.bind(this);
        this.onClearCompleted = this.onClearCompleted.bind(this);
        this.onFilter = this.onFilter.bind(this);
    }
    onItemClicked(item) {
        const { todoItems } = this.state;
        return event => {
            const isComplete = item.isComplete;
            let allNewTask =
                JSON.parse(window.localStorage.getItem("todoItems")) !== null
                    ? JSON.parse(window.localStorage.getItem("todoItems"))
                    : [];
            const index = allNewTask.findIndex(e => e.title === item.title);
            allNewTask = allNewTask.map(function(el, i) {
                if (i === index) {
                    el.isComplete = !isComplete;
                }
                return el;
            });
            window.localStorage.setItem(
                "todoItems",
                JSON.stringify(allNewTask)
            );
            this.setState({
                todoItems: todoItems.map(function(el, i) {
                    if (i === index) {
                        el.isComplete = !isComplete;
                    }
                    return el;
                })
            });

            if (event.target.tagName.toLowerCase() === "button") {
                allNewTask = allNewTask.filter(function(e) {
                    return allNewTask.indexOf(e) !== index;
                });
                window.localStorage.setItem(
                    "todoItems",
                    JSON.stringify(allNewTask)
                );
                this.setState({
                    todoItems: todoItems.filter(function(e) {
                        return todoItems.indexOf(e) !== index;
                    })
                });
            }
        };
    }

    onCheckAll(event) {
        let allNewTask =
            JSON.parse(window.localStorage.getItem("todoItems")) !== null
                ? JSON.parse(window.localStorage.getItem("todoItems"))
                : [];

        if (event.target.checked === true) {
            allNewTask = allNewTask.map(function(e) {
                return {
                    ...e,
                    isComplete: true
                };
            });
            window.localStorage.setItem(
                "todoItems",
                JSON.stringify(allNewTask)
            );
            this.setState({
                todoItems: allNewTask
            });
        } else {
            allNewTask = allNewTask.map(e => ({ ...e, isComplete: false }));
            window.localStorage.setItem(
                "todoItems",
                JSON.stringify(allNewTask)
            );
            this.setState({
                todoItems: allNewTask
            });
        }
    }

    onKeyUp(event) {
        let text = event.target.value;
        if (event.keyCode === 13) {
            if (!text) {
                return;
            }
            text = text.trim();
            if (!text) {
                return;
            }
            const newTask = {
                title: text,
                isComplete: false
            };

            window.localStorage.setItem("newTask", JSON.stringify(newTask));
            const allNewTask =
                JSON.parse(window.localStorage.getItem("todoItems")) !== null
                    ? JSON.parse(window.localStorage.getItem("todoItems"))
                    : [];
            allNewTask.push(newTask);
            window.localStorage.setItem(
                "todoItems",
                JSON.stringify(allNewTask)
            );
            this.setState({
                newItem: "",
                todoItems: allNewTask
            });
        } else {
        }
    }
    onChange(event) {
        this.setState({
            newItem: event.target.value
        });
    }
    onClearCompleted(event) {
        let allNewTask =
            JSON.parse(window.localStorage.getItem("todoItems")) !== null
                ? JSON.parse(window.localStorage.getItem("todoItems"))
                : [];
        allNewTask = allNewTask.filter(function(e) {
            return e.isComplete === false;
        });
        window.localStorage.setItem("todoItems", JSON.stringify(allNewTask));
        this.setState({
            todoItems: allNewTask.filter(function(e) {
                return e.isComplete === false;
            })
        });
    }
    onFilter(event) {
        switch (event.target.hash) {
            case "#active":
                this.setState({
                    filterMode: "active"
                });
                break;
            case "#completed":
                this.setState({
                    filterMode: "completed"
                });
                break;
            default:
                this.setState({
                    filterMode: "all"
                });
        }
    }
    render() {
        const { newItem, todoItems, filterMode } = this.state;
        const ClearCompleteButton = props => {
            return (
                <button className="App-clearCompleted" onClick={props.onClick}>
                    Clear completed
                </button>
            );
        };
        const CheckAllInput = props => {
            return (
                <input
                    type="checkbox"
                    id="check-all"
                    checked={props.checked}
                    onChange={this.onCheckAll}
                />
            );
        };
        return (
            <div className="App">
                <div className="App-logo">
                    <h1>TODOLIST</h1>
                </div>
                <div className="App-header">
                    {todoItems.length > 0 &&
                        todoItems.filter(e => e.isComplete === false).length ===
                            0 && (
                            <CheckAllInput
                                type="checkbox"
                                id="check-all"
                                checked={true}
                                onChange={this.onCheckAll}
                            />
                        )}
                    {todoItems.length > 0 &&
                        todoItems.filter(e => e.isComplete === false).length >
                            0 && (
                            <CheckAllInput
                                type="checkbox"
                                id="check-all"
                                checked={false}
                                onChange={this.onCheckAll}
                            />
                        )}

                    <label htmlFor="check-all">
                        <img
                            src={tick}
                            width={32}
                            height={32}
                            alt="check-all"
                        />
                    </label>
                    <input
                        type="text"
                        placeholder="Add a new task..."
                        value={newItem}
                        onChange={this.onChange}
                        onKeyUp={this.onKeyUp}
                    />
                </div>
                {todoItems.length > 0 &&
                    filterMode === "all" &&
                    todoItems.map((item, index) => (
                        <TodoItems
                            key={index}
                            item={item}
                            onClick={this.onItemClicked(item)}
                        />
                    ))}
                {todoItems.length > 0 &&
                    filterMode === "active" &&
                    todoItems
                        .filter(item => {
                            return item.isComplete === false;
                        })
                        .map((item, index) => (
                            <TodoItems
                                key={index}
                                item={item}
                                onClick={this.onItemClicked(item)}
                            />
                        ))}
                {todoItems.length > 0 &&
                    filterMode === "completed" &&
                    todoItems
                        .filter(item => {
                            return item.isComplete === true;
                        })
                        .map((item, index) => (
                            <TodoItems
                                key={index}
                                item={item}
                                onClick={this.onItemClicked(item)}
                            />
                        ))}
                <div className="App-footer">
                    <ul className="App-filter" onClick={this.onFilter}>
                        <li>
                            <a
                                href="#all"
                                className={classNames({
                                    current: filterMode === "all"
                                })}
                            >
                                All
                            </a>
                        </li>
                        <li>
                            <a
                                href="#active"
                                className={classNames({
                                    current: filterMode === "active"
                                })}
                            >
                                Active
                            </a>
                        </li>
                        <li>
                            <a
                                href="#completed"
                                className={classNames({
                                    current: filterMode === "completed"
                                })}
                            >
                                Completed
                            </a>
                        </li>
                    </ul>
                    <span className="App-count">
                        {
                            todoItems.filter(item => item.isComplete === false)
                                .length
                        }
                        &nbsp;items left
                    </span>

                    {todoItems.findIndex(e => e.isComplete === true) !== -1 ? (
                        <ClearCompleteButton onClick={this.onClearCompleted} />
                    ) : (
                        ""
                    )}
                </div>
            </div>
        );
    }
}

export default App;
