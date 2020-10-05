import React from 'react';
import Header from './Header';
import HeaderDrawer from './HeaderDrawer';
import BackdropHeader from './BackdropHeader';
import Footer from '../Footer/Footer';
import '../Request.css';
import '../Login/Login.css'
import 'react-accessible-accordion/dist/fancy-example.css';
import axios from 'axios';

const initialState = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    radioButton: '',
    emailError: '',
    passwordError: '',
    firstnameError: '',
    lastnameError: '',
    reqid: ''
}

var roomName = "";
var startTime = "";
var endTime = "";
var idEvent = "";
var resoid = "";

class Form extends React.Component {

    state = initialState;

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeFirstNAme = this.onChangeFirstNAme.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            description: '',
            emailError: '',
            passwordError: '',
            firstnameError: '',
            lastnameError: '',
            radioButton: '',
            sideDrawerOpen: false,
            reqid: ''
        }
    }

    componentDidMount() {
        // const { slotName } = this.props.location.query
        console.log(this.props.location.query);
        console.log(document.getElementById("description").value);
        roomName = this.props.location.query.slotName;
        startTime = this.props.location.query.start;
        endTime = this.props.location.query.end;
        idEvent = this.props.location.query.idSlot;
        resoid = this.props.location.query.slotId;
    }

    OnRadioButton = (e) => {
        this.setState({radioButton: e.target.value})
    }


    drawerToggleClickHandler = () => {
        this.setState(prevState => {
            return {sideDrawerOpen: !prevState.sideDrawerOpen}
        })
    }

    backdropClickHandler = () => {
        this.setState({sideDrawerOpen: false})
    }

    validate = () => {
        let emailError = '';
        let passwordError = '';
        let firstnameError = '';
        let lastnameError = '';

        if (!this.state.firstname) {
            firstnameError = "First Name cannot be empty";
        }

        if (!this.state.lastname) {
            lastnameError = "Last Name cannot be empty";
        }

        if (!this.state.password) {
            passwordError = "Humber ID cannot be empty";
        }

        if (!this.state.email.includes("@")) {
            emailError = "Not Valid Email Address";
        }

        if (firstnameError || lastnameError || passwordError || emailError) {
            this.setState({firstnameError, lastnameError, passwordError, emailError});
            return false;
        }

        return true;
    };

    onChangeUsername(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onChangeFirstNAme(e) {
        this.setState({
            firstname: e.target.value
        })
    }

    onChangeLastName(e) {
        this.setState({
            lastname: e.target.value
        })
    }


    handleSubmit(e) {
        e.preventDefault();

        const isValid = this.validate();

        if (isValid) {
            const eventRequest = {
                id: Math.random() * 10,
                title: '',
                start: startTime,
                end: endTime,
                resourceId: resoid,
                bgColor: 'red'
            }

            axios.post('http://localhost:4000/api/event/add', eventRequest)
                .then(res => {
                    console.log(res.data._id)
                    this.setState({reqid: res.data.id})
                });

            if (this.state.reqid != null) {
                const user = {
                    id: Math.random() * 10,
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    room_id: roomName,
                    start_time: startTime,
                    end_time: endTime,
                    email: this.state.email,
                    status: "Pending",
                    user_type: "Student",
                    description: document.getElementById("description").value,
                    people: document.querySelector('input[name=number_people]:checked').value
                }

                axios.post('http://localhost:4000/api/booking/', user)
                    .then(res => console.log(res.data));

                this.setState(initialState);

                axios.post('http://localhost:4000/mail', user)
                    .then(res => console.log(res.data));
            }

            window.location = '/';
        }
    }

    render() {
        let backdrop

        if (this.state.sideDrawerOpen) {
            backdrop = <BackdropHeader click={this.backdropClickHandler}/>
        }
        return (
            <div id="main">
                <Header drawerClickHandler={this.drawerToggleClickHandler}/>
                <HeaderDrawer show={this.state.sideDrawerOpen}/>

                <section className="main">
                    <section className="image-section">
                        <img src="https://source.unsplash.com/user/erondu/1600x900/?nature" id="mainimage"
                             alt="Humber background"></img>
                    </section>
                    <section className="form-section">
                        <div className="form-wrapper">
                            <br/>
                            <br/>
                            <div className="form-information">
                                <div className="form-title">
                                    <h3 className="form-title--content">
                                        Booking Information
                                    </h3>
                                </div>
                            </div>
                            <form id="fm1" className="signin-form" onSubmit={this.handleSubmit}>

                                <div className="input-wrapper">
                                    <label htmlFor="humberID">
                                        <p>
                                            <span className="accesskey">H</span>umber ID:
                                        </p>
                                    </label>
                                    <div style={{color: "red"}}>{this.state.passwordError}</div>
                                    <input id="username" name="username" className="required" tabIndex="1"
                                           placeholder="Humber ID" type="text" size="25" autoComplete="off"
                                           value={this.state.password} onChange={this.onChangePassword}/>
                                </div>

                                <div className="input-wrapper">
                                    <label htmlFor="firstname">
                                        <p>
                                            <span className="accesskey">F</span>irst Name:
                                        </p>
                                    </label>
                                    <div style={{color: "red"}}>{this.state.firstnameError}</div>
                                    <input id="firstname" name="firstname" className="required" tabIndex="2"
                                           placeholder="First Name" type="text" size="25" autoComplete="off"
                                           value={this.state.firstname} onChange={this.onChangeFirstNAme}/>
                                </div>

                                <div className="input-wrapper">
                                    <label htmlFor="lastname">
                                        <p>
                                            <span className="accesskey">L</span>ast Name:
                                        </p>
                                    </label>
                                    <div style={{color: "red"}}>{this.state.lastnameError}</div>
                                    <input id="lastname" name="lastname" className="required" tabIndex="2"
                                           placeholder="Last Name" type="text" size="25" autoComplete="off"
                                           value={this.state.lastname} onChange={this.onChangeLastName}/>
                                </div>

                                <div className="input-wrapper">
                                    <label htmlFor="email">
                                        <p>
                                            <span className="accesskey">E</span>mail:
                                        </p>
                                    </label>
                                    <div style={{color: "red"}}>{this.state.emailError}</div>
                                    <input id="email" name="email" className="required" tabIndex="2" placeholder="Email"
                                           type="text" size="25" autoComplete="off" value={this.state.email}
                                           onChange={this.onChangeUsername}/>
                                </div>
                                <div className="input-wrapper">
                                    <div className="form-group">
                                        <div className="select-list">
                                            <label htmlFor="password">
                                                <p>
                                                    <span className="accesskey">D</span>escription of Meeting:
                                                </p>
                                            </label>
                                            <select name="time" id="description" required>
                                                <option value="Entrepreneur Meeting">Entrepreneur Meeting</option>
                                                <option value="Mentor Meeting">Mentor Meeting</option>
                                                <option value="Idea Generation">Idea Generation</option>
                                                <option
                                                    value="Marketing/Venture Research (eg. Focus Group)">Marketing/Venture
                                                    Research (eg. Focus Group)
                                                </option>
                                                <option
                                                    value="Promotional/Prototype Creation (eg. Video/3D Print)">Promotional/Prototype
                                                    Creation (eg. Video/ 3D
                                                    Print)
                                                </option>
                                                <option value="Entrepremeurial Skills Workshop">Entrepremeurial Skills
                                                    Workshop
                                                </option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-radio">
                                    <label htmlFor="password">
                                        <p>
                                            <span className="accesskey">H</span>ow many people will be using the space?
                                        </p>
                                    </label>
                                    <div className="radio-item-list">
                                    <span className="radio-item">
                                        <input type="radio" name="number_people" value="1-4" id="number_people_2"
                                               style={{width: '35px'}} onChange={this.OnRadioButton}/>
                                        <label htmlFor="number_people_2">1-4</label>
                                    </span>
                                        <span className="radio-item active">
                                        <input type="radio" name="number_people" value="5-8" id="number_people_4"
                                               onChange={this.OnRadioButton}/>
                                        <label htmlFor="number_people_4">5-8</label>
                                    </span>
                                        <span className="radio-item">
                                        <input type="radio" name="number_people" value="9-12" id="number_people_6"/>
                                        <label htmlFor="number_people_6">9-12</label>
                                    </span>
                                        <span className="radio-item">
                                        <input type="radio" name="number_people" value="13-16" id="number_people_8"/>
                                        <label htmlFor="number_people_8">13-16</label>
                                    </span>
                                        <span className="radio-item">
                                        <input type="radio" name="number_people" value="16+" id="number_people_10"/>
                                        <label htmlFor="number_people_10">16+</label>
                                    </span>
                                    </div>
                                </div>


                                <section className="row btn-row sign">
                                    <input type="hidden" name="lt" value="LT-481010-dVhpibsFkrdfYCGZMZblZKb3ShiLCX"/>
                                    <input type="hidden" name="execution" value="e4s1"/>
                                    <input type="hidden" name="_eventId" value="submit"/>

                                    <input name="submit" value="Submit" tabIndex="3" type="submit"/>
                                </section>
                            </form>
                        </div>
                    </section>
                </section>
                {backdrop}
                <Footer/>
            </div>
        );
    }
}

export default Form;