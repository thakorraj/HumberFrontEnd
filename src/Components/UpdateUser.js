import React from 'react';
import Sidebar from './Sidebar';
import SideDrawer from './SideDrawer';
import Backdrop from './Backdrop';
import './AddUser.css';
import axios from 'axios';

class UpdateUser extends React.Component {

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

    componentDidMount() {
        console.log(this.props.match.params.id + "kjb");
        axios.get('http://localhost:4000/api/admin/getadmin/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    email: response.data.email,
                    password: response.data.password
                });
                console.log(response.data);
                console.log("KHB");
            })
            .catch((error) => {
                console.log(error);
            })
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

    // UpdateUsers(id) {
    //     axios.put('http://localhost:4000/api/admin/updateAdmin/'+id)
    //       .then(response => { console.log(response.data)});
    //       console.log("Update Success");
    //     this.setState({
    //     //   requests: this.state.requests.filter(el => el._id !== id)  
    //     })
    //   }


    handleSubmit(e) {
        e.preventDefault();

        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };

        console.log(user);

        axios.put('http://localhost:4000/api/admin/updateAdmin/' + this.props.match.params.id, user)
            .then(res => console.log(res.data));

        this.setState({
            name: '',
            email: '',
            password: ''
        });

        window.location = '/userHome';
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

export default UpdateUser;