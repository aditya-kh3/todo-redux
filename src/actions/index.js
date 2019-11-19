import * as types from "../constants/ActionTypes";
import superagent from "superagent";

const BASE_URL = "https://jsonplaceholder.typicode.com/";

export const addTodo = title => {
  return dispatch => {
    return superagent
      .post(`${BASE_URL}` + "posts/")
      .send({ title: title, completed: false })
      .end((err, res) =>
        dispatch({
          type: types.ADD_TODO,
          id: res.body.id,
          title: title,
          completed: false
        })
      );
  };
};

export const deleteTodo = id => {
  return dispatch => {
    return superagent
      .delete(`${BASE_URL}` + "posts/" + `${id}`)
      .end((err, res) => dispatch({ type: types.DELETE_TODO, id }));
  };
};

export const editTodo = (id, title) => {
  return dispatch => {
    return superagent
      .patch(`${BASE_URL}` + "posts/" + `${id}`)
      .send({ title: title })
      .end((err, res) =>
        dispatch({ type: types.EDIT_TODO, id: id, title: title })
      );
  };
};

export const completeTodo = (id, state) => {
  return dispatch => {
    return superagent
      .patch(`${BASE_URL}` + "posts/" + `${id}`)
      .send({ completed: state })
      .end((err, res) =>
        dispatch({ type: types.COMPLETE_TODO, id: id, completed: state })
      );
  };
};

export const getTodos = () => {
  return dispatch => {
    return superagent.get(`${BASE_URL}` + "todos/").end((err, res) => {
      if (err) dispatch({ type: types.GET_TODOS, data: [] });
      else dispatch({ type: types.GET_TODOS, data: res.body });
    });
  };
};

export const completeAll = ids => {
  return dispatch => {
    var promises = ids.map(id => {
      return new Promise((resolve, reject) => {
        superagent
          .patch(`${BASE_URL}` + "todos/" + `${id}`)
          .send({ completed: true })
          .end((err, res) => resolve());
      });
    });
    Promise.all(promises).then(results =>
      dispatch({ type: types.COMPLETE_ALL })
    );
  };
};

export const clearCompleted = ids => {
  return dispatch => {
    var promises = ids.map(id => {
      return new Promise((resolve, reject) => {
        superagent
          .delete(`${BASE_URL}` + "posts/" + `${id}`)
          .end((err, res) => resolve());
      });
    });
    Promise.all(promises).then(results =>
      dispatch({ type: types.CLEAR_COMPLETED })
    );
  };
};
