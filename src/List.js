import React from 'react';
import firebase from 'firebase';
import InputText from './InputText';
import Task from './Task'
class List extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tasks:[],   
        };//Para atrapar el id del usuario que se encuentra logeado.
        
    const dataBase=firebase.database();
    this.tasksRef = dataBase.ref().child(`tasks/${this.props.user.uid}`);

    //Bindeando los eventos para que cuando suceda una accion actue de cierta forma. 
    this.handleChildAdd=this.handleChildAdd.bind(this);
    this.handleAddTask=this.handleAddTask.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.hadleEditButton=this.hadleEditButton.bind(this);
    this.handleChildEditChanged = this.handleChildEditChanged.bind(this);
    this.handleChildDelete=this.handleChildDelete.bind(this);
    this.handleDeleteButton=this.handleDeleteButton.bind(this); 
   }
   
 //Funcion para evitar agregar tareas a un componente que aun no se encuentra.
    componentDidMount(){
       
        this.tasksRef.on('child_added', this.handleChildAdd);
        this.tasksRef.on('child_changed', this.handleChildEditChanged);
        this.tasksRef.on('child_removed', this.handleChildDelete);
    }
    
    //Acciones que se efectuan para agregar las nuevas tareas a firebase.
    handleAddTask(text){
        if (!text.length) {
            return;
		}
        var key = this.tasksRef.push().key;
        this.tasksRef.child(key).set({
        id: key,
        text: text,
        check:false});
    }

    //Accion que Busca Si se agrego una tarea nueva en firebase y lo recupera. 
    handleChildAdd(data){
        var newTask=data.val();
        newTask.id=data.key;
        var newTasks=this.state.tasks.concat(newTask);
        this.setState({tasks:newTasks});
    }

    //Acciones que se efectuan para agregar  true o false cuando la tarea fue checkeada o no, a firebasae.
    handleCheck(e){
        var parentTask = e.target.closest('.taskParent');
        const taskRef = this.tasksRef.child(parentTask.id);
        taskRef.update({
            check: e.target.checked
        });
    }
    //Acciones que se efectuan para agregar las  tareas Editadas a firebase.
    hadleEditButton(text,id){
        var taskRef = this.tasksRef.child(id);
        taskRef.update({
            text: text
        });
    }

    //Accion que Busca Si hubo un cambio en la tarea(Si se edito tarea) en firebase y lo recupera. 
    handleChildEditChanged(data) {
        var newTask = data.val();
        newTask.id = data.key
        var newTasks = this.state.tasks.concat([]);
        var index = newTasks.findIndex(task => task.id === data.key);
        newTasks.splice(index, 1, newTask);
        this.setState({ tasks: newTasks })
    }

    //Acciones que se efectuan para eliminar las  tareas de firebase.
     handleDeleteButton(event) {
         event.preventDefault();
        var parentTask = event.target.closest('.taskParentDeleteButton');
        var taskRef = this.tasksRef.child(parentTask.id);
        taskRef.remove();
    }
    //Accion que busca si se elimino uno de los datos de firebase y se refleja. 
    handleChildDelete(data) {
        var newTasks = this.state.tasks.concat([]);//se conocatena un arreglo vacio para provocar que se haga una copia del mismo y se ejecute el cambio d estado.
        var index = newTasks.findIndex(task => task.id === data.key);//Regresa el indice donde la el Key y el Id sean iguales 
        newTasks.splice(index, 1);
        this.setState({ tasks: newTasks })
    }

    render(){
        return (
        <section>
            <section>
            <button type="button" className="btn btn-dark btn-lg col-2 offset-1" onClick={()=>firebase.auth().signOut()}>Logout</button><br/>
            <h1 className="text-center"> TODO LIST</h1>
            <h3 className="text-center">TUS TAREAS</h3><br/><br/>
                <h4>BIENVENIDO:</h4>
                <h4>{this.props.user.email}</h4><br/>
            </section>
            <section className="list">
                <InputText onInputText={this.handleAddTask}/>
                <TaskList tasks={this.state.tasks} onEditButton={this.hadleEditButton} onCheck={this.handleCheck} onDelete={this.handleDeleteButton}/>
            </section> 
        </section>
        );
    }   
} 

function TaskList(props){
    return (<ul><br/>
           {props.tasks.map(task=>(
               <Task key={task.id}  
               text={task.text} 
               check={task.check}
               id={task.id}
               onCheck={props.onCheck}
               onDelete={props.onDelete}
               onEditButton={props.onEditButton}/>
           ))}
        </ul>
    );
}
/*
function Task(props){
 
    return (
        <section className="row">
            <li  className="taskParent shadow-lg p-4 mb-4 bg-white rounded col-5 offset-3" id={props.id}>   
             <input type="checkbox" aria-label="Checkbox for following text input" id={`check-${props.id}`} onChange={props.onCheck}  className="col-1 p-1" defaultChecked={props.check} />
             {props.text}
             </li>
             <button type="button" className="btn dark btn-lg m-1">Editar</button>
             <button type="button" className="btn dark btn-lg m-1">Borrar</button>
        </section>
          );

}
*/
export default List;