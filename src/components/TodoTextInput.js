import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class TodoTextInput extends Component {
  static propTypes = {
    onSave: PropTypes.func.isRequired,
    title: PropTypes.string,
    placeholder: PropTypes.string,
    editing: PropTypes.bool,
    newTodo: PropTypes.bool
  };

  state = {
    title: this.props.title || ""
  };

  handleSubmit = e => {
    const title = e.target.value.trim();
    if (e.which === 13) {
      this.props.onSave(title);
      if (this.props.newTodo) {
        this.setState({ title: "" });
      }
    }
  };

  handleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleBlur = e => {
    if (!this.props.newTodo) {
      this.props.onSave(e.target.value);
    }
  };

  render() {
    return (
      <input
        className={classnames({
          edit: this.props.editing,
          "new-todo": this.props.newTodo
        })}
        type="title"
        placeholder={this.props.placeholder}
        autoFocus="true"
        value={this.state.title}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
      />
    );
  }
}
