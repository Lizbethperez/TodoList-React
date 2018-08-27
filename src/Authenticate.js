import React from 'react';
import firebase from 'firebase';

class Authenticate extends React.Component{
    constructor (props){
        super(props);
        this.state={
            email:'',
            password:'',
            error:'',
        }
        this.handleEmailChange=this.handleEmailChange.bind(this);
        this.handlePasswordChange=this.handlePasswordChange.bind(this);
        this.handleCreateUser=this.handleCreateUser.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
    }

    handleEmailChange(e){
        this.setState({email:e.target.value})
    }
    handlePasswordChange(e){
        this.setState({password:e.target.value})
    }
    handleCreateUser(){
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch(error =>{
           this.setState({error:error.message})
        });

    }
    handleLogin(){
    
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch(error =>{
           this.setState({error:error.message})
        });

    }
    render(){
        return (
           <form>
                <div>{this.state.error}</div>
                     <h1 className="text-center"> TODO LIST</h1>
                     <h3 className="text-center"> BIENVENIDO</h3><br/><br/>
                    <div className="form-group row center-text">
                        <label htmlFor="inputEmail3" className="col-1 offset-3 col-form-label">Email</label>
                        <div className="col-6">
                            <input type="text" className="form-control" value={this.state.email} onChange={this.handleEmailChange} id="inputEmail3" placeholder="Email" />
                        </div>
                    </div><br/>
                    <div className="form-group row">
                        <label htmlFor="inputPassword" className="col-1 offset-3 col-form-label">Password</label>
                        <div className="col-6">
                            <input type="password" value={this.state.password} onChange={this.handlePasswordChange} className="form-control" id="inputPassword3" placeholder="Password" />
                        </div>
                    </div><br/><br/>
                <button type="button" className="btn btn-dark btn-lg col-3 offset-3" onClick={this.handleCreateUser}>New User</button>
                <button type="button" className="btn btn-dark btn-lg col-3 offset-1" onClick={this.handleLogin}>Login</button>
           </form>
        );
    }
}
export default Authenticate;