import React from 'react';
import Sidebar from './Sidebar';
import SideDrawer from './SideDrawer';
import Backdrop from './Backdrop';
import './AddUser.css';
import axios from 'axios';

class AddUser extends React.Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            password: '',
            sideDrawerOpen: false
        }
    }

    onChangeUsername(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeEmail(e) {
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
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
            // "subject": "Let's go for lunch",
            // "body": {
            //     "contentType": "HTML",
            //     "content": "Does late morning work for you?"
            // },
            // "start": {
            //     "dateTime": "2020-04-15T12:00:00",
            //     "timeZone": "Pacific Standard Time"
            // },
            // "end": {
            //     "dateTime": "2020-04-15T14:00:00",
            //     "timeZone": "Pacific Standard Time"
            // },
            // "location": {
            //     "displayName": "Harry's Bar"
            // },
            // "attendees": [
            //     {
            //         "emailAddress": {
            //             "address": "harsh.thakkar.1511@gmail.com",
            //             "name": "Harsh Thakkar"
            //         },
            //         "type": "required"
            //     }
            // ]
        };

        console.log(user);

        // const headers = {
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJub25jZSI6ImxHX2t2VC1SMnNmcGx0TFNmZGo1YnlvSVNlUGg2SGFDLW1iWlUzazRZQVkiLCJhbGciOiJSUzI1NiIsIng1dCI6IkhsQzBSMTJza3hOWjFXUXdtak9GXzZ0X3RERSIsImtpZCI6IkhsQzBSMTJza3hOWjFXUXdtak9GXzZ0X3RERSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8zYjg1YTkwYS1kMGU0LTRmMmEtYmJjMS03OTExYzIzNmI2N2EvIiwiaWF0IjoxNTgzNTIwNjIyLCJuYmYiOjE1ODM1MjA2MjIsImV4cCI6MTU4MzUyNDUyMiwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IjQyTmdZUEM2bFZ6cEdmay8vNUhUSjA5aDcwL3lQa0Yyb2JlNU56dFdMNXh4czdkNTcxTUEiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IlRlc3QgQXBwIiwiYXBwaWQiOiJjZDkwMmNhZS0zNjMzLTRlZWItOWVjZS05ODA4NjIwMGJlOTkiLCJhcHBpZGFjciI6IjEiLCJmYW1pbHlfbmFtZSI6IlBhdGVsIiwiZ2l2ZW5fbmFtZSI6IkhhcnNoaWwiLCJpcGFkZHIiOiI5OS4yNTIuNDYuMTYxIiwibmFtZSI6IkhhcnNoaWwgUGF0ZWwiLCJvaWQiOiJlNmZhOGIwNC1lMDRjLTRmN2ItYWNkYi05OThjYTc1MTc0ZDgiLCJwbGF0ZiI6IjMiLCJwdWlkIjoiMTAwMzIwMDA5RkY1RUQyQSIsInNjcCI6IkNhbGVuZGFycy5SZWFkIENhbGVuZGFycy5SZWFkLlNoYXJlZCBDYWxlbmRhcnMuUmVhZFdyaXRlIENhbGVuZGFycy5SZWFkV3JpdGUuU2hhcmVkIENvbnRhY3RzLlJlYWQgZW1haWwgTWFpbC5SZWFkIE1haWwuUmVhZFdyaXRlIE1haWwuU2VuZCBNYWlsYm94U2V0dGluZ3MuUmVhZCBNYWlsYm94U2V0dGluZ3MuUmVhZFdyaXRlIG9wZW5pZCBwcm9maWxlIFVzZXIuUmVhZCIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6IjFsOTk0ZW1aRGFBVVF4c080ckNTbTl0bUpfOXFVS2tJcGhRRW9XX0RwanciLCJ0aWQiOiIzYjg1YTkwYS1kMGU0LTRmMmEtYmJjMS03OTExYzIzNmI2N2EiLCJ1bmlxdWVfbmFtZSI6InBhdGVsaGFyc2hpbEBwYXRlbGhhcnNoaWwub25taWNyb3NvZnQuY29tIiwidXBuIjoicGF0ZWxoYXJzaGlsQHBhdGVsaGFyc2hpbC5vbm1pY3Jvc29mdC5jb20iLCJ1dGkiOiJkOVNwWmV3NG5rZXUzUTZvS0tZd0FBIiwidmVyIjoiMS4wIiwid2lkcyI6WyI2MmU5MDM5NC02OWY1LTQyMzctOTE5MC0wMTIxNzcxNDVlMTAiXSwieG1zX3N0Ijp7InN1YiI6Imx5ak5nVUdidXhudUlKTjUwSGZrc0JNd3Z2NEVtbnZqVGdkWUtEUkxIZkkifSwieG1zX3RjZHQiOjE1ODMzNzU5NDl9.cQeh2exFxle-9vWdjg_LS4nbUx6SFg_BzCKv_nm4qsxNzF-kEFRmmPlWtAuUbx3SbJmEjFB75boKMKp4kAiyc63HiPuDyB4kf2FFhDTDLqS5us9FphmQfZUBZZcDYZkhBR9Ep58tRFyKbnL2Sv39A8hGxZ1JMql9aZ2INb_WeWkLtLtrhPV5XQiduWEwjTj80NTN2h--GrQpmBfQBnMahtV7CxWVDXDwF0ei2jnaJ1cnMiDwSTcdGmsxZn4dN4tie9TZ2fUxcCq_Bd4UIpj8h4-m4VeiIhXo9Eqm87r2_s-VrSbUSsN2EpqRbhL-MzrWTrLhYppm0bQqPSFHIH2tXw'
        // }

        axios.post('http://localhost:5000/api/admin/add/', user)
            .then(res => console.log(res.data));

        // axios.post('https://graph.microsoft.com/v1.0/me/events',user, {headers:headers})
        //     // 'Content-Type': 'application/json',
        //     // 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJub25jZSI6ImxHX2t2VC1SMnNmcGx0TFNmZGo1YnlvSVNlUGg2SGFDLW1iWlUzazRZQVkiLCJhbGciOiJSUzI1NiIsIng1dCI6IkhsQzBSMTJza3hOWjFXUXdtak9GXzZ0X3RERSIsImtpZCI6IkhsQzBSMTJza3hOWjFXUXdtak9GXzZ0X3RERSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8zYjg1YTkwYS1kMGU0LTRmMmEtYmJjMS03OTExYzIzNmI2N2EvIiwiaWF0IjoxNTgzNTIwNjIyLCJuYmYiOjE1ODM1MjA2MjIsImV4cCI6MTU4MzUyNDUyMiwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IjQyTmdZUEM2bFZ6cEdmay8vNUhUSjA5aDcwL3lQa0Yyb2JlNU56dFdMNXh4czdkNTcxTUEiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IlRlc3QgQXBwIiwiYXBwaWQiOiJjZDkwMmNhZS0zNjMzLTRlZWItOWVjZS05ODA4NjIwMGJlOTkiLCJhcHBpZGFjciI6IjEiLCJmYW1pbHlfbmFtZSI6IlBhdGVsIiwiZ2l2ZW5fbmFtZSI6IkhhcnNoaWwiLCJpcGFkZHIiOiI5OS4yNTIuNDYuMTYxIiwibmFtZSI6IkhhcnNoaWwgUGF0ZWwiLCJvaWQiOiJlNmZhOGIwNC1lMDRjLTRmN2ItYWNkYi05OThjYTc1MTc0ZDgiLCJwbGF0ZiI6IjMiLCJwdWlkIjoiMTAwMzIwMDA5RkY1RUQyQSIsInNjcCI6IkNhbGVuZGFycy5SZWFkIENhbGVuZGFycy5SZWFkLlNoYXJlZCBDYWxlbmRhcnMuUmVhZFdyaXRlIENhbGVuZGFycy5SZWFkV3JpdGUuU2hhcmVkIENvbnRhY3RzLlJlYWQgZW1haWwgTWFpbC5SZWFkIE1haWwuUmVhZFdyaXRlIE1haWwuU2VuZCBNYWlsYm94U2V0dGluZ3MuUmVhZCBNYWlsYm94U2V0dGluZ3MuUmVhZFdyaXRlIG9wZW5pZCBwcm9maWxlIFVzZXIuUmVhZCIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6IjFsOTk0ZW1aRGFBVVF4c080ckNTbTl0bUpfOXFVS2tJcGhRRW9XX0RwanciLCJ0aWQiOiIzYjg1YTkwYS1kMGU0LTRmMmEtYmJjMS03OTExYzIzNmI2N2EiLCJ1bmlxdWVfbmFtZSI6InBhdGVsaGFyc2hpbEBwYXRlbGhhcnNoaWwub25taWNyb3NvZnQuY29tIiwidXBuIjoicGF0ZWxoYXJzaGlsQHBhdGVsaGFyc2hpbC5vbm1pY3Jvc29mdC5jb20iLCJ1dGkiOiJkOVNwWmV3NG5rZXUzUTZvS0tZd0FBIiwidmVyIjoiMS4wIiwid2lkcyI6WyI2MmU5MDM5NC02OWY1LTQyMzctOTE5MC0wMTIxNzcxNDVlMTAiXSwieG1zX3N0Ijp7InN1YiI6Imx5ak5nVUdidXhudUlKTjUwSGZrc0JNd3Z2NEVtbnZqVGdkWUtEUkxIZkkifSwieG1zX3RjZHQiOjE1ODMzNzU5NDl9.cQeh2exFxle-9vWdjg_LS4nbUx6SFg_BzCKv_nm4qsxNzF-kEFRmmPlWtAuUbx3SbJmEjFB75boKMKp4kAiyc63HiPuDyB4kf2FFhDTDLqS5us9FphmQfZUBZZcDYZkhBR9Ep58tRFyKbnL2Sv39A8hGxZ1JMql9aZ2INb_WeWkLtLtrhPV5XQiduWEwjTj80NTN2h--GrQpmBfQBnMahtV7CxWVDXDwF0ei2jnaJ1cnMiDwSTcdGmsxZn4dN4tie9TZ2fUxcCq_Bd4UIpj8h4-m4VeiIhXo9Eqm87r2_s-VrSbUSsN2EpqRbhL-MzrWTrLhYppm0bQqPSFHIH2tXw'

        //     .then(res => console.log(res.data));

        this.setState({
            name: '',
            email: '',
            password: ''
        });

        window.location = "/userHome";
    }

    // state = {
    //     sideDrawerOpen: false,
    // }

    drawerToggleClickHandler = () => {
        this.setState(prevState => {
            console.log("kkb");
            return {sideDrawerOpen: !prevState.sideDrawerOpen}
        })
    };

    backdropClickHandler = () => {
        console.log("hi");
        this.setState({sideDrawerOpen: false})
    };

    render() {
        let backdrop;

        if (this.state.sideDrawerOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler}/>
        }
        return (
            <div id="main">
                <Sidebar drawerClickHandler={this.drawerToggleClickHandler}/>
                <SideDrawer show={this.state.sideDrawerOpen} click={this.backdropClickHandler}/>

                {backdrop}
                <div class="user">
                    {/* <header class="user__header">       
                        <h1 class="user__title">Add User Form</h1>
                    </header> */}

                    <form class="form" onSubmit={this.handleSubmit}>
                        <div class="form__group">
                            <input type="text" placeholder="Username" class="form__input" value={this.state.name}
                                   onChange={this.onChangeUsername}/>
                        </div>

                        <div class="form__group">
                            <input type="email" placeholder="Email" class="form__input" value={this.state.email}
                                   onChange={this.onChangeEmail}/>
                        </div>

                        <div class="form__group">
                            <input type="password" placeholder="Password" class="form__input"
                                   value={this.state.password} onChange={this.onChangePassword}/>
                        </div>

                        <button class="btn" type="submit">Register</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddUser;