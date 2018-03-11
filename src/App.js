import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {content: ""};

        // This binding is necessary to make `this` work in the callback
        this.updateInputValue = this.updateInputValue.bind(this);
    }

    handleDownload(e) {
        let content = this.state.content;
        axios.post('/tts_convert',
            {
                "text": content
            })
            .then(function (response) {
                let data = response.data;
                if(data.status === 'success') {
                    window.open(data.url, '_blank');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    /*handleSpeak(e) {
        let content = this.state.content;
    }*/

    updateInputValue(event) {
        this.setState({
            content: event.target.value
        })
    }

    render() {
        return (
          <div className="App">
            <header className="App-header">
                <h3 class="text-success">TRANSKODER</h3>
                <hr/>
                <h1 className="App-title">Text to Speech Converter</h1>
            </header>
            <p>
                <br/><br/>
                <div class="row">
                    <div class="col-md-3"></div>
                    <div class="col-md-6" style={{paddingLeft: 20, paddingRight: 20}}>
                        <input class="form-control" type="text" onChange={this.updateInputValue}
                                    placeholder={"Enter the content to convert to speech"}
                               value={this.state.content}/> <br/>
                        {/*<button class="btn btn-primary" onClick={(e) => this.handleSpeak(e)}>
                            <i class="glyphicon glyphicon-volume-up"></i> Speak</button>*/}
                        <button class="btn btn-success" style={{marginLeft: 10}} onClick={(e) => this.handleDownload(e)}>
                            <i class="glyphicon glyphicon-cloud-download"></i> Convert & Download</button>
                    </div>
                    <div class="col-md-3">

                    </div>
                </div>
            </p>
          </div>
        );
    }
}

export default App;
