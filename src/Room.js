import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Request.css';
import axios from 'axios';

const Exercise = props => (
    <tr>
        <td>{props.request.Room_ID}</td>
        <td>{props.request.Name}</td>
        <td>{props.request.Description}</td>
        <td>{props.request.Capacity}</td>
        <td>{String(props.request.Bookable)}</td>
        <td>
            <button class="buttonM"><Link to={"/UpdateRoom/" + props.request._id} className="buttonM">Update</Link>
            </button>
            | <button class="buttonR"><a href="#" onClick={() => {
            props.deleteExercise(props.request._id)
        }} className="buttonR">Remove</a></button>
        </td>
    </tr>
);

export default class Room extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this)
        this.state = {requests: []}
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/room/list/')
            .then(response => {
                this.setState({requests: response.data});
                console.log(response.data);

            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteExercise(id) {
        axios.delete('http://localhost:4000/api/room/delete/' + id)
            .then(response => {
                console.log(response.data)
            });
        console.log("Delete Success");
        this.setState({
            requests: this.state.requests.filter(el => el._id !== id)
        })
    }

    requestList() {
        return this.state.requests.map(currentexercise => {
            return <Exercise request={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
    }

    render() {
        return (
            <div>
                <div className="table">

                    <center>Rooms</center>
                    <table>
                        <thead>
                        <tr>
                            <th>Room Number</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Capacity</th>
                            <th>Bookable</th>
                            <th>Actions</th>

                        </tr>
                        </thead>
                        <tbody>
                        {this.requestList()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

