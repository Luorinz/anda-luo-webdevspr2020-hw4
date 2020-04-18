import React from 'react';
import Axios from "axios";


export default class Urls extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this._fetchUrlList();
    }


    _fetchUrlList() {
        Axios.get('/api/url').then((res) => {
            if (!res.data) return;
            this.setState({urls: res.data});
        }, err => console.log(err));
    }

    _renderUrlList() {

        if (!this.state.urls) return;
        const urlRows = this.state.urls.map(url => (
            <tr key={url.shortUrl}>
                <td><a href={url.longUrl}>{url.longUrl}</a></td>
                <td><a onClick={() => {this.props.history.push('url/' + url.shortUrl);}} href=''>{'https://' + location.host + '/url/' + url.shortUrl}</a></td>
                <td><button><a href={'/url/' + url.shortUrl + "/edit"}>edit</a></button></td>
            </tr>
        ));
        return (
            <table frame="box" rules="all">
                <thead>
                <tr>
                    <th>Long Url</th>
                    <th>Short Url</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {urlRows}
                </tbody>
            </table>
        );
    }


    render() {
        return (
            <div>
                <label>Url: </label>
                <input type="text" value={this.state.longUrl}
                       onChange={(e) => this.setState({longUrl: e.target.value})}/>
                <br/>
                <br/>
                <label>Short Url: </label>
                <input type="text" value={this.state.shortUrl} onChange={e => this.setState({shortUrl: e.target.value})}/>
                <button onClick={() => {
                    console.log("onclick");
                    Axios.post('/api/url', {long: this.state.longUrl, short: this.state.shortUrl}).then(
                        (res) => this._fetchUrlList())
                }}>Submit</button>
                <br/>
                <br/>
                <div>{this._renderUrlList()}</div>
            </div>
        );
    }

}