import React, {Component} from "react";
import TodoDataService from "../../../api/TodoDataService";
import AuthenticationService from "../../../api/AuthenticationService";
import moment from "moment";
import Quagga from "quagga";
import {TextareaAutosize} from "@material-ui/core";

export class ListTodosComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            message : null,
            ret : ""
        }
    }

    componentDidMount() {
        this.refreshTodos();
    }

    refreshTodos = () => {
        TodoDataService.retrieveAllTodos(AuthenticationService.getLoggedInUserName()).then(
            response => {
                this.setState({todos: response.data})
            }
        );
    }

    deleteTodo = (id) => {
        TodoDataService.deleteTodo(AuthenticationService.getLoggedInUserName(), id).then(
            response => {
                this.setState({message: `Delete of the Todo ${id}`});
                this.refreshTodos();
            }
        );
    }

    updateTodo = (id) => {
        this.props.history.push(`/todos/${id}`);
    }

    addTodo = () => {
        this.props.history.push("/todos/-1");
    }

    qOndec = (result) => {
        let code = result.codeResult.code;
        console.log(result.codeResult.code);
        console.log(result);
        this.setState({ret: this.state.ret + " " + result.codeResult.code});
    }

    addTodo2 = () => {
        Quagga.init({
            inputStream : {
                name : "Live",
                type : "LiveStream",
                target: document.querySelector('#barcode')    // Or '#yourElement' (optional)
            },
            decoder : {
                readers : ["ean_reader"]
            }
        }, function(err) {
            if (err) {
                console.log(err);
                return
            }
            console.log("Initialization finished. Ready to start");
            Quagga.start();
        });

        Quagga.onProcessed(function(result) {
            let drawingCtx = Quagga.canvas.ctx.overlay,
                drawingCanvas = Quagga.canvas.dom.overlay;

            if (result) {
                if (result.boxes) {
                    drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                    result.boxes.filter(function (box) {
                        return box !== result.box;
                    }).forEach(function (box) {
                        Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
                    });
                }

                if (result.box) {
                    Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
                }

                if (result.codeResult && result.codeResult.code) {
                    Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
                }
            }
        });

        Quagga.onDetected(this.qOndec);
    }




    render = () => {
        return (
            <div>
                <h1>List Todo</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Description</th>
                            <th>Date</th>
                            <th>IsCompleted</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.todos.map(
                                todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{moment(todo.targetDate).format("YYYY-MM-DD")}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td><button className="btn btn-success" onClick={()=> this.updateTodo(todo.id)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={()=> this.deleteTodo(todo.id)}>Delete</button></td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <div className={"row"}>
                        <button className={"btn btn-success"} id={"abc"} onClick={this.addTodo2}>Add</button>
                    </div>
                    <TextareaAutosize value={this.state.ret}>

                    </TextareaAutosize>

                    <br/>

                    <div id={"barcode"}>

                    </div>


                </div>
            </div>
        );
    }
}
