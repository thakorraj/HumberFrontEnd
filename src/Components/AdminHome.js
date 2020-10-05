import React from 'react';
import Sidebar from './Sidebar';
import SideDrawer from './SideDrawer';
import Backdrop from './Backdrop';
import Request from '../Request';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

cookies.set('Token', window.location.pathname.toString().substring(7), {path: '/'});
console.log(cookies.get('Token'));
// let a = 'Bearer ' + window.location.pathname.toString().substring(7) + "";
// let id = "thakorraj1998@gmail.com"
// const headers = {
//     'Content-Type': 'application/json',
//     'Authorization': a
// };
// console.log(a);

class AdminHome extends React.Component {


    state = {
        sideDrawerOpen: false,
    };


    drawerToggleClickHandler = () => {
        this.setState(prevState => {
            console.log("kkb");
            return {sideDrawerOpen: !prevState.sideDrawerOpen}
        })
    };

    backdropClickHandler = () => {
        console.log("hi");
        console.log(window.location.pathname.toString().substring(7));
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
                <Request/>
            </div>
        );
    }
}

export default AdminHome;