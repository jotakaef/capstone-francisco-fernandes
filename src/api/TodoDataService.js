import axios from "axios";
import {API_URI} from "../Constants";

class TodoDataService {
    retrieveAllTodos(name) {
        return axios.get(`${API_URI}/users/${name}}/todos`);
    }

    deleteTodo(name, id) {
        return axios.delete(`${API_URI}/users/${name}}/todos/${id}`);
    }

    retrieveTodo(name,id) {
        return axios.get(`${API_URI}/users/${name}}/todos/${id}`);
    }

    updateTodo(name,id, todo) {
        return axios.put(`${API_URI}/users/${name}}/todos/${id}`, todo);
    }

    createTodo(name,todo) {
        return axios.post(`${API_URI}/users/${name}}/todos`, todo);
    }
}

export default new TodoDataService();
