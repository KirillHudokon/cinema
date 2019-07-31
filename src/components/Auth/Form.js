import React from 'react';
import {connect} from 'react-redux'
import {signUp} from "../../actions/UserAction";
import {login} from "../../actions/UserAction";
import image from '../../img/bg.jpg'
import Login from './Login'
import SignUp from './SignUp'
class Form extends React.Component{
    state={
        email:'',
        password:'',
        name:''
    }
    cambiar_login=(e)=> {
        e.preventDefault()
        document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";
        document.querySelector('.cont_form_login').style.display = "block";
        document.querySelector('.cont_form_sign_up').style.opacity = "0";

        setTimeout(function() {
            document.querySelector('.cont_form_login').style.opacity = "1";
        }, 400);

        setTimeout(function() {
            document.querySelector('.cont_form_sign_up').style.display = "none";
        }, 200);
    }
    cambiar_sign_up=(e)=> {
        e.preventDefault()
        document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
        document.querySelector('.cont_form_sign_up').style.display = "block";
        document.querySelector('.cont_form_login').style.opacity = "0";

        setTimeout(function() {
            document.querySelector('.cont_form_sign_up').style.opacity = "1";
        }, 100);

        setTimeout(function() {
            document.querySelector('.cont_form_login').style.display = "none";
        }, 400);

    }
    ocultar_login_sign_up=(e)=>{
        e.preventDefault()
        document.querySelector('.cont_forms').className = "cont_forms";
        document.querySelector('.cont_form_sign_up').style.opacity = "0";
        document.querySelector('.cont_form_login').style.opacity = "0";

        setTimeout(function() {
            document.querySelector('.cont_form_sign_up').style.display = "none";
            document.querySelector('.cont_form_login').style.display = "none";
        }, 500);

    }

    handleChanger = (e) =>{
        e.preventDefault()
        this.setState({[e.target.name]:e.target.value})
    }
    render(){
        const {loginAction,signUpAction,user} = this.props
        return (
            <div>
                <form>
                    <div className="cotn_principal">
                        <div className="cont_centrar">
                            <div className="cont_login">
                                <div className="cont_info_log_sign_up">
                                    <div className="col_md_login">
                                        <div className="cont_ba_opcitiy">
                                            <h2>Войти</h2>
                                            <p>У вас уже есть логин?</p>
                                            <button className="btn_login" onClick={this.cambiar_login}>Войти</button>
                                        </div>
                                    </div>
                                    <div className="col_md_sign_up">
                                        <div className="cont_ba_opcitiy">
                                            <h2>Регистрация</h2>
                                            <p>Нет логина?</p>
                                            <button className="btn_sign_up" onClick={this.cambiar_sign_up}>Зарегистрироваться</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="cont_back_info">
                                    <div className="cont_img_back_grey">
                                        <img src={image}  />
                                    </div>
                                </div>
                                <div className="cont_forms">
                                    <div className="cont_img_back_">
                                        <img src={image} />
                                    </div>
                                    <div className="cont_form_login">
                                        <a href="#" onClick={this.ocultar_login_sign_up}><i className="material-icons">&#xE5C4;</i></a>
                                        <h2>Войти</h2>
                                        <input type="text" placeholder="E-mail" name='email' onChange={this.handleChanger} value={this.state.email} />
                                        <input type="password" placeholder="Пароль" name='password' onChange={this.handleChanger} value={this.state.password} />
                                        <Login email={this.state.email} password={this.state.password} login={loginAction} />
                                    </div>
                                    <div className="cont_form_sign_up">
                                        <a href="#" onClick={this.ocultar_login_sign_up}><i className="material-icons">&#xE5C4;</i></a>
                                        <h2>Регистрация</h2>
                                        <input type="text" placeholder="E-mail" name='email' onChange={this.handleChanger} value={this.state.email} />
                                        <input type="text" placeholder="Логин" name='name' onChange={this.handleChanger} value={this.state.name} />
                                        <input type="password" placeholder="Пароль" name='password' onChange={this.handleChanger} value={this.state.password} />
                                        <SignUp email={this.state.email} password={this.state.password} name={this.state.name} signUp={signUpAction}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
