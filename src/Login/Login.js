import React from 'react';
import axios from 'axios';

import './Login.css'

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            email: '',
            password: ''
        }
    }

    onChangeUsername(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword(e) {
        console.log(e.target.value);
        this.setState({
            password: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password

        };

        console.log(user);

        axios.post('http://localhost:4000/api/admin/login/', user)
            .then(res => console.log(res.data));

        this.setState({
            email: '',
            password: ''
        })
    }

    render() {
        return (
            <section class="main">
                <section class="image-section">
                    <img src="https://source.unsplash.com/user/erondu/1600x900/?nature" id="mainimage"
                         alt="Humber background"></img>
                </section>
                <section class="form-section">
                    <div class="form-wrapper">
                        <div class="humber-logo">
                            <a href="https://cdpn.io/boomboom/v2/index.html?key=iFrameKey-b59ce6c3-46b2-b79b-8ef7-0717ff7b0937#"><img
                                src="https://humber.ca/cfe/sites/default/files/cfe-logo-white.png" alt="Logo"></img></a>
                        </div>
                        <br></br>
                        <div class="form-information">
                            <div class="form-title">
                                <h3 class="form-title--content">
                                    Sign in
                                </h3>
                            </div>

                            <div class="humber-account">
                                <p>
                                    With your Admin Account.
                                </p>
                            </div>
                        </div>
                        <form id="fm1" class="signin-form" onSubmit={this.handleSubmit}>
                            <br/>
                            <div class="input-wrapper">
                                <label htmlFor="username">
                                    <p>
                                        <span class="accesskey">U</span>sername:
                                    </p>
                                    {/* <a href="https://hloc.humber.ca/HLoc/forgotUserId">
                                        Don't know your username?
                      </a> */}
                                </label>
                                <input id="username" name="username" class="required" tabIndex="1"
                                       placeholder="Username" type="text" size="25" autoComplete="off"
                                       value={this.state.email} onChange={this.onChangeUsername}/>
                            </div>

                            <div class="input-wrapper">
                                <label htmlFor="password">
                                    <p>
                                        <span class="accesskey">P</span>assword:
                                    </p>
                                    <a href="https://mypassword.humber.ca">
                                        Forgot password?
                                    </a>
                                </label>
                                <input id="password" name="password" class="required" tabIndex="2"
                                       placeholder="Password" type="password" size="25" autoComplete="off"
                                       value={this.state.password} onChange={this.onChangePassword}/>
                            </div>

                            <section class="row btn-row sign">
                                <input type="hidden" name="lt" value="LT-481010-dVhpibsFkrdfYCGZMZblZKb3ShiLCX"/>
                                <input type="hidden" name="execution" value="e4s1"/>
                                <input type="hidden" name="_eventId" value="submit"/>

                                <input name="submit" value="Sign in" tabIndex="3" type="submit"/>

                            </section>

                        </form>
                        {/* <div class="support-assistance">
                            <p>
                                For further assistance, contact the <a href="https://its.humber.ca/about-us/contact">IT Support Centre.</a>
                            </p>
                        </div> */}
                    </div>
                </section>
            </section>
        );
    }
}

export default Login;