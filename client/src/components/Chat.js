import React, { Component } from "react";
import './Chat.css';
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
        mensajes:[],
        mensaje:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
   
    if(this.props.socket){
        this.props.socket.on("mensaje", data => {
            this.setState({mensajes:[data,...this.state.mensajes] });
            
        });
    }
  }
  handleChange(event) {
    this.setState({mensaje: event.target.value});
  }
  handleSubmit(event) {
    this.props.socket.emit('mensaje',{mensaje:this.state.mensaje});
    event.preventDefault();
  }
  
  render() {
    var mensajes=this.state.mensajes.map((element,i)=>{
        return(
            <div key={i}>
                <div>{element.nombre}: </div>
                <div>{element.mensaje}</div>
            </div>
            
        )
    })
    return (
        <div >
            <div className="container">                
                <div className="card">
                <div className="chat" >{mensajes}</div>
                    
                </div>
                <form  className="form-inline" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="form-group col-sm-10">
                            <input type="text" value={this.state.mensaje} onChange={this.handleChange} className="form-control" style={{width:"100%"}}   placeholder="Ingrese su mensaje"/>
                        </div>
                        <div className="form-group col-sm-2">
                            <button type="submit" className="btn btn-primary">Enviar mensaje</button>
                        </div>
                    </div>
                    
                    
                </form>
            </div>
            
        </div>
    );
  }
}
export default Chat;