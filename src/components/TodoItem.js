import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import TodoTextInput from "./TodoTextInput";

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired
  };

  state = {
    editing: false
  };

  handleDoubleClick = () => {
    this.setState({ editing: true });
  };

  handleSave = (id, title) => {
    if (title.length === 0) {
      this.props.deleteTodo(id);
    } else {
      this.props.editTodo(id, title);
    }
    this.setState({ editing: false });
  };

  render() {
    const { todo, completeTodo, deleteTodo } = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput
          title={todo.title}
          editing={this.state.editing}
          onSave={title => this.handleSave(todo.id, title)}
        />
      );
    } else {
      element = (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            // onChange={() => completeTodo(todo.id)} />
            onChange={() => completeTodo(todo.id, !todo.completed)}
          />
          <label onDoubleClick={this.handleDoubleClick}>{todo.title}</label>
          <button className="destroy" onClick={() => deleteTodo(todo.id)} />
        </div>
      );
    }

    return (
      <li
        className={classnames({
          completed: todo.completed,
          editing: this.state.editing
        })}
      >
        {element}
      </li>
    );
  }
}
