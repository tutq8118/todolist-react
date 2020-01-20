import React, { Component } from "react";
import classNames from "classnames";
import "./TodoItems.scss";
import checkImg from "../img/check.svg";
import checkImgComplete from "../img/check-complete.svg";

class TodoItem extends Component {
    render() {
        const { item, onClick } = this.props;
        let imgUrl = checkImg;
        if (item.isComplete) {
            imgUrl = checkImgComplete;
        }
        return (
            <div
                className={classNames("TodoItem", {
                    "TodoItem-complete": item.isComplete
                })}
            >
                <img
                    onClick={onClick}
                    src={imgUrl}
                    width={32}
                    height={32}
                    alt=" "
                />
                <p>{this.props.item.title}</p>
                <button onClick={onClick} className="TodoItem-close">
                    ×
                </button>
            </div>
        );
    }
}

export default TodoItem;
