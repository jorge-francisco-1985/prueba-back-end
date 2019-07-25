import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import socketIOClient from "socket.io-client";
import Nombre from './Nombre';
import Chat from './Chat';
class Rutas extends Component {
  constructor(props) {
    super(props);
    this.state = {
        mensajes:[],
        socket:null,
        mensaje:"",
        response: false,
        endpoint: "http://127.0.0.1:4000"
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket=socketIOClient(endpoint);
    this.setState({socket:socket });
  }
  
  
  render() {
    var chat=()=>{return(<Chat socket={this.state.socket}></Chat>)};
    var nombre=()=>{return (<Nombre socket={this.state.socket}></Nombre>)}
    console.log(nombre);
    
    return (
        <div >
            <Router>
                <div>
                    <Header />

                    <Route exact path="/" component={nombre} />
                    <Route path="/chat" component={chat} />
                </div>
            </Router>
            
        </div>
    );
  }
   
};

  function Header() {
    return (
      <ul>
        <li>
          <Link to="/">Nombre</Link>
        </li>
        <li>
          <Link to="/chat">Chat</Link>
        </li>
      </ul>
    );
  }
export default Rutas;