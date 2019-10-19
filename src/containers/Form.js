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
        const {error}=this.props
        switch(true){
            case visible:
                return <div className='formInf'>
                    <div>
                        <h2 className='formName'>Please sign in to continue</h2>
                    </div>
                    <div className='inputs'>
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
                    {!!error ? <div className='error'>{error}</div> : null }
                    <div>
                        <Login email={email} password={password} login={loginAction}/>
                        <button className='formClick' onClick={this.handleClicker}>Нет аккаунта?</button>
                    </div>
                </div>
            case !visible:
                return <div className='formInf'>
                    <div>
                        <h2 className='formName'>Please sign in to continue</h2>
                    </div>
                    <div className='inputs'>
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
                    {!!error ? <div className='error'>{error}</div> : null }
                    <div>
                        <SignUp email={email} password={password} name={name}
                                signUp={signUpAction}/>
                        <button className='formClick' onClick={this.handleClicker}>Есть аккаунт?</button>
                    </div>
                </div>
            default:
                return null
        }
    }
    render(){

        return (
            <div className='formBlock'>
                <form className='form'>
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
