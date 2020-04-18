import React from 'react';
import Axios from "axios";


export default class Url extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        console.log(this.props.match.params.shortUrl);
        Axios.get("/api/url/short/" + this.props.match.params.shortUrl).then(res => {
            console.log(res.data);
            this.setState({
                long: res.data.longUrl,
                short: this.props.match.params.shortUrl
            })
        }, err => {
            console.log(err);
            this.props.history.push("/urls")
        });
    }


    render() {
        return (
            <div>
                <h1>Edit</h1>
                <h3>{this.state.short}</h3>
                <input value={this.state.long}
                       onChange={e => this.setState({long: e.target.value})}/>
                <button onClick={() => {
                    Axios.put("/api/url", {
                        short: this.state.short,
                        long: this.state.long
                    })
                }}>Update
                </button>
                <button onClick={() => {
                    Axios.delete("/api/url", {
                        data: {
                            short: this.state.short
                        }
                    }).then(res => this.props.history.push("/urls"));
                }}>Delete
                </button>
            </div>
        );
    }

}