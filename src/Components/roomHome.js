import React from 'react';
import SidebarRoom from './SidebarRoom';
import SideDrawer from './SideDrawer';
import Backdrop from './Backdrop';
import Room from '../Room';

class roomHome extends React.Component {
    state = {
        sideDrawerOpen: false,
    };

    drawerToggleClickHandler = () => {
        this.setState(prevState => {
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
                <SidebarRoom drawerClickHandler={this.drawerToggleClickHandler}/>
                <SideDrawer show={this.state.sideDrawerOpen} click={this.backdropClickHandler}/>

                {backdrop}

                <Room/>
            </div>
        );
    }
}

export default roomHome;