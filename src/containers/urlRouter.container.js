import React from 'react';
import Axios from "axios";


export default class UrlRouter extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        Axios.get("/api/url/short/" + this.props.match.params.shortUrl).then(res => {
            window.location.href = res.data.longUrl;
        }, err => {
            console.log(err);
            this.props.history.push("/urls")
        });
    }


    render() {
        return <br/>;
    }

}