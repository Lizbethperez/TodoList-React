import React from "react";

class InputText extends React.Component {

    constructor(props){
        super(props);
        this.state={
            text:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClickAdd = this.handleClickAdd.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        
    }
    render(){
        return   (
            <div className="input-group mb-3">
                <input type="text" className="form-control col-6 offset-3" value={this.state.text} onKeyUp={this.handleKeyUp} onChange={this.handleChange} placeholder="Escribe Tarea" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.handleClickAdd} id="button-addon2">Añadir Tarea</button>
                    </div>
            </div>
        );
    }

    handleKeyUp(e){
		if(e.keyCode===13) this.handleClickAdd();
    }
    
    handleChange(event){
        this.setState({text:event.target.value} );
    }
    handleClickAdd(){
        this.props.onInputText(this.state.text);
        this.setState({text:""});
    }

}

export default InputText;