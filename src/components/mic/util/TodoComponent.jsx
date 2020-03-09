import React, {Component} from "react";
import moment from "moment";
import {ErrorMessage, Field, Form, Formik} from "formik";
import TodoDataService from "../../../api/TodoDataService";
import AuthenticationService from "../../../api/AuthenticationService";

class TodoComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            description: "",
            targetDate : moment(new Date()).format("YYYY-MM-DD")
        }
    }

    componentDidMount() {

        if (this.state.id <= 0) {
            return
        }

        TodoDataService.retrieveTodo(AuthenticationService.getLoggedInUserName(),this.state.id).then(
          response => this.setState({
            description: response.data.description,
            targetDate: moment(response.data.targetDate).format("YYYY-MM-DD")
          })
        );
    }

    onSubmit = (values) => {
        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        };

        if (this.state.id <= 0) {
            TodoDataService.createTodo(AuthenticationService.getLoggedInUserName(), todo ).then(() => this.props.history.push("/todos"));
        } else {
            TodoDataService.updateTodo(AuthenticationService.getLoggedInUserName(), this.state.id, todo).then(() => this.props.history.push("/todos"));
        }
    }

    validate = (values) => {
        let errors = {};

        if (!values.description) {
            errors.description = "Enter a description!";
        } else if (values.description.length<5) {
            errors.description = "Description should have at least 5 characters";
        }

        if (!moment(values.targetDate).isValid()) {
            errors.description = "Enter a valid Target Date";
        }

        console.log(values);
        return errors;
    }

    render() {
       let {description, targetDate} = this.state;
        return (

            <div>
                <h1>Scan</h1>
                <div className="container"></div>
                <Formik
                    initialValues={{description,targetDate}}
                    onSubmit={this.onSubmit}
                    validate={this.validate}
                    validateOnChange={false}
                    validateOnBlur={false}
                    enableReinitialize={true}
                >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name={"description"} component={"div"} className={"alert alert-warning"}></ErrorMessage>
                                <fieldset className={"form-group"}>
                                    <Field id="outlined-basic" class="form-control"  label="Description" name={"description"} />
                                </fieldset>
                                <fieldset className={"form-group"}>
                                    <Field label="targetDate" class="form-control" format="MM/dd/yyyy" type={"date"} autoOk={true} name={"targetDate"}/>
                                </fieldset>
                                <fieldset>
                                    <Field component="select" className="form-control">
                                        <option>Default select</option>
                                    </Field>
                                </fieldset>
                                <button className={"btn btn-success"} type={"submit"}>Save</button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        );
    }
}

export default TodoComponent;

