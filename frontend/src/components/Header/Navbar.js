import React, { Component } from "react";
import "./Navbar.css"
import white from "../../images/white.png"

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="nav">

                <a href="/"><img src={white} alt="spacex" ></img></a>

                <ul>
                    <li><a href="/">HOME</a></li>
                    <li><a href="/rockets">ROCKETS</a></li>
                    <li><a href="/ship">SHIPS</a></li>
                </ul>

            </div>
        );
    }
}

export default Navbar;