import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
class Nombre extends Component {
  constructor() {
    super();
    this.state = {
        nombre:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    
  }
  handleChange(event) {
    
    this.setState({nombre: event.target.value});
    
    return <Redirect to='/' />
  }
  handleSubmit(event) {
    this.props.socket.emit('nuevo_usuario',this.state.nombre);
    event.preventDefault();
  }
  
  render() {
    
    return (
        <div >
            <div className="container">                
                
                <form  className="form-inline" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="form-group col-sm-10">
                            <input type="text" value={this.state.nombre} onChange={this.handleChange} className="form-control" style={{width:"100%"}}   placeholder="Ingrese su Nombre"/>
                        </div>
                        <div className="form-group col-sm-2">
                            <button type="submit" className="btn btn-primary">Guardar</button>
                        </div>
                    </div>
                    
                    
                </form>
            </div>
            
        </div>
    );
  }
}
export default Nombre;