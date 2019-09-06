import React from 'react';
import {connect} from 'react-redux'
import {signUp} from "../actions/UserAction";
import {login} from "../actions/UserAction";
import SignUp from '../components/Auth/SignUp'
import Login from "../components/Auth/Login";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faKey,faUser} from '@fortawesome/free-solid-svg-icons'
class Form extends React.Component{
    state={
        email:'',
        password:'',
        name:'',
        visible:true
    }
    handleClicker=(e)=>{
        e.preventDefault()
        this.setState({visible:!this.state.visible})
    }
    handleChanger = (e) =>{
        e.preventDefault()
        this.setState({[e.target.name]:e.target.value})
    }
    renderFormInf=()=>{
        const {loginAction,signUpAction} = this.props
        const {visible,email,password,name}=this.state
        switch(true){
            case visible:
                return <div className='formInf'>
                    <div>
                        <h2 className='formName'>Войти</h2>
                    </div>
                    <div>
                        <div className='iconContainer'>
                            <FontAwesomeIcon className='icon' icon={faEnvelope}/>
                            <input type="text" placeholder="E-mail" name='email' onChange={this.handleChanger}
                                   value={email}/>
                        </div>
                        <div className='iconContainer'>
                            <FontAwesomeIcon className='icon' icon={faKey}/>
                            <input type="password" placeholder="Пароль" name='password' onChange={this.handleChanger}
                                   value={password}/>
                        </div>
                    </div>
                    <div>
                        <Login email={email} password={password} login={loginAction}/>
                        <button className='formClick' onClick={this.handleClicker}>Нет аккаунта?</button>
                    </div>
                </div>
            case !visible:
                return <div className='formInf'>
                    <div>
                        <h2 className='formName'>Регистрация</h2>
                    </div>
                    <div>
                        <div className='iconContainer'>
                            <FontAwesomeIcon className='icon' icon={faEnvelope}/>
                            <input type="text" placeholder="E-mail" name='email' onChange={this.handleChanger}
                                   value={email}/>
                        </div>
                        <div className='iconContainer'>
                            <FontAwesomeIcon className='icon' icon={faUser}/>
                            <input type="text" placeholder="Логин" name='name' onChange={this.handleChanger}
                                   value={name}/>
                        </div>
                        <div className='iconContainer'>
                            <FontAwesomeIcon className='icon' icon={faKey}/>
                            <input type="password" placeholder="Пароль" name='password' onChange={this.handleChanger}
                                   value={password}/>
                        </div>
                    </div>
                    <div>
                        <SignUp email={email} password={password} name={name}
                                signUp={signUpAction}/>
                        <button className='formClick' onClick={this.handleClicker}>Есть аккаунт?</button>
                    </div>
                </div>
        }
    }
    render(){

        return (
            <div className='formBlock'>
                <form>
                    {this.renderFormInf()}
                </form>
            </div>
        );
    }
}

export const mapStateToProps = store =>({
    user: store.user
})
export const mapDispatchToProps = dispatch =>({
    loginAction: (email,password)=>dispatch(login(email,password)),
    signUpAction: (email,password,name)=>dispatch(signUp(email,password,name))
})
export default connect(mapStateToProps,mapDispatchToProps)(Form);
