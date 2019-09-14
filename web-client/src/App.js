import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import io from "socket.io-client";

export default class App extends Component {
  componentDidMount() {
    const socket = io.connect("http://localhost:3000", () => {
      console.log("connected?");
    });
    console.log(socket);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
