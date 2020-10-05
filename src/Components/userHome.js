import React from 'react';
import Sidebar from './SideBarUser';
import SideDrawer from './SideDrawer';
import Backdrop from './Backdrop';
import User from '../User';

class userHome extends React.Component {
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
                <User/>
            </div>
        );
    }
}

export default userHome;