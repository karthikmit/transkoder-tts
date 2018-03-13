import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import AudioPlayerDOM from "./audio_player";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {content: "", loading: false, convertedUrl: ""};

        // This binding is necessary to make `this` work in the callback
        this.updateInputValue = this.updateInputValue.bind(this);
    }

    handleConvert(e, urlHandler) {
        if(this.state.loading === true) {
            alert("Please wait, previous operation is in progress ...");
            return;
        }

        if(this.state.content === "") {
            alert("Please enter some English content to convert to speech.");
            return;
        }

        let content = this.state.content;
        this.setState({
           loading: true
        });

        let that = this;
        axios.post('/tts_convert',
            {
                "text": content
            })
            .then(function (response) {

                let data = response.data;
                if(data.status === 'success') {
                    that.setState({
                        loading: false,
                        content: "",
                        convertedUrl: data.url
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
                alert("Oops! I am sorry, an Error occurred. Please try later. \n" + error);
                that.setState({
                    loading: false,
                    content: "",
                    convertedUrl: ""
                });
            });
    }

    updateInputValue(event) {
        this.setState({
            content: event.target.value
        })
    }

    render() {
        const {loading} = this.state;

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
                        {loading ? <b><i class="glyphicon glyphicon-refresh gly-ani"></i> Processing ...</b> : ""}
                        <button class="btn btn-success" style={{marginLeft: 10}} onClick={(e) => this.handleConvert(e, this.openUrl)}>
                            <i class="glyphicon glyphicon-cloud-download"></i> Convert</button>
                        <br/><br/>
                        <div  style={this.state.convertedUrl === '' ? { display: 'none' } : {}}>
                            <AudioPlayerDOM src={this.state.convertedUrl}/>
                        </div>
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
