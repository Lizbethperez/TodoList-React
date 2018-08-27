import React from 'react';

class Task extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            textNewInput:''
        }
       this.editChangeState=this.editChangeState.bind(this);
       this.handleEditTask=this.handleEditTask.bind(this);
       this.handleInputNewEdit=this.handleInputNewEdit.bind(this);
       this.handleCancelEdit=this.handleCancelEdit.bind(this);
       this.handleKeyUp = this.handleKeyUp.bind(this);
    }

editChangeState(event){
    event.preventDefault();
    this.setState({edit: true, textNewInput: this.props.text});
}

handleEditTask(){
  this.props.onEditButton(this.state.textNewInput, this.props.id);
  this.setState({edit:false});
}

handleInputNewEdit(e){
  this.setState({textNewInput: e.target.value});
}

handleCancelEdit(){
  this.setState({edit: false});
}
handleKeyUp(e){
  if(e.keyCode===13) this.handleEditTask();
  }
  
//rendereando el input de editar y los botomes de , editar, borrar, guardar y cancelar. 
    render(){
    if(this.state.edit){
    return(
      <section className="row">
        <input  type="text" className="form-control col-5 offset-3 shadow-lg mb-2" value={this.state.textNewInput} onKeyUp={this.handleKeyUp} onChange={this.handleInputNewEdit}  aria-label="Recipient's username" aria-describedby="button-addon2"/><br/>
        <button type="button" className="btn-dark  btn-small m-1 col-1" onClick={this.handleEditTask}>Guardar</button>
        <button type="button" className="btn-dark btn-small m-1 col-1" onClick={this.handleCancelEdit}>Cancelar</button>
      </section>);
    }else{
    return (
        <section className="row">
            <li  className="taskParent shadow-lg p-4 mb-4 bg-white rounded col-5 offset-3" id={this.props.id}>   
             <input type="checkbox" aria-label="Checkbox for following text input" id={`check-${this.props.id}`} onChange={this.props.onCheck}  className="col-1 p-1" defaultChecked={this.props.check} />
             {this.props.text}
             </li>
            <div className="taskParentDeleteButton" id={this.props.id}>
             <button type="button" className="btn dark btn-lg m-1" onClick={this.editChangeState}>Editar</button>
             <button type="button" className="btn dark btn-lg m-1" onClick={this.props.onDelete}>Borrar</button>
            </div>
        </section>
          );
    }
  }
}
export default Task;