import React from 'react';
import './App.css';
import MicApp from "./components/mic/MicApp";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div className="App">
            {/*<Counter/>*/}
            <MicApp/>
        </div>
    );
}

/*
class LearningComponents extends Component {
    render() {
        return (
            <div className="App">
                <FirstComponent></FirstComponent>
                <SecondComponent></SecondComponent>
                <ThirdComponent/>
            </div>
        );
    }
}*/

export default App;
