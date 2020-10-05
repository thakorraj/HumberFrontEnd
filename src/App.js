import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Footer from './Footer/Footer';
import AdminHome from './Components/AdminHome';
import UserHome from './Components/userHome';
import RoomHome from './Components/roomHome';
import Login from './Login/Login';
import AddUser from './Components/AddUser'
import AddRoom from './Components/AddRoom'
import UpdateUser from './Components/UpdateUser';
import UpdateRoom from './Components/UpdateRoom';
import Form from './Header/Form';
import Outlook from './Components/Outlook'
import HeaderControl from "./Header/HeaderControl";

function App() {
    return (
        <Router>
            <div className="App">
                <Route path="/Admin" component={AdminHome}/>
                <Route path="/AdminHome" component={Outlook}/>
                <Route path="/userHome" component={UserHome}/>
                <Route path="/roomHome" component={RoomHome}/>
                <Route path="/Home" component={Footer}/>
                <Route path="/Login" component={Login}/>
                <Route path="/AddUser" component={AddUser}/>
                <Route path="/AddRoom" component={AddRoom}/>
                <Route path="/UpdateUser/:id" component={UpdateUser}/>
                <Route path="/UpdateRoom/:id" component={UpdateRoom}/>
                <Route path="/Form" component={Form}/>
                <Route exact path="/" component={HeaderControl}/>
            </div>
        </Router>
    )
}

export default App;
