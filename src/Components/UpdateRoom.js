import React from 'react';
import Sidebar from './Sidebar';
import SideDrawer from './SideDrawer';
import Backdrop from './Backdrop';
import './AddUser.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

class AddRoom extends React.Component {

    constructor(props) {
        super(props);

        this.onChangeRoomId = this.onChangeRoomId.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCapacity = this.onChangeCapacity.bind(this);
        this.onChangeBookable = this.onChangeBookable.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            room_id: '',
            name: '',
            description: '',
            capacity: '',
            bookable: "",
            sideDrawerOpen: false,
            room_id_error: '',
            nameError: '',
            descriptionError: '',
            capacityerror: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/room/roomfetch/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    room_id: response.data.Room_ID,
                    name: response.data.Name,
                    description: response.data.Description,
                    capacity: response.data.Capacity,
                    bookable: response.data.Bookable,
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    validate = () => {
        let room_id_error = '';
        let nameError = '';
        let descriptionError = '';
        let capacityerror = '';

        if (!this.state.room_id) {
            room_id_error = "Room ID cannot be empty";
        }

        if (!this.state.name) {
            nameError = "Room Name cannot be empty";
        }

        if (!this.state.description) {
            descriptionError = "Description cannot be empty";
        }

        if (!this.state.capacity) {
            capacityerror = "Capacity cannot be empty";
        }

        if (room_id_error || nameError || descriptionError || capacityerror) {
            this.setState({room_id_error, nameError, descriptionError, capacityerror});
            return false;
        }

        return true;
    };

    onChangeRoomId(e) {
        this.setState({
            room_id: e.target.value
        })
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeCapacity(e) {
        this.setState({
            capacity: e.target.value
        })
    }

    onChangeBookable(e) {
        this.setState({
            bookable: e.target.value === "true"
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        const isValid = this.validate();

        if (isValid) {

            const room = {
                room_id: this.state.room_id,
                name: this.state.name,
                description: this.state.description,
                capacity: this.state.capacity,
                bookable: this.state.bookable
            };

            axios.put('http://localhost:4000/api/room/update/' + this.props.match.params.id, room)
                .then(res => console.log(res.data));

            this.setState({
                room_id: '',
                name: '',
                description: '',
                capacity: '',
                bookable: null
            });

            window.location = '/roomHome';
        }
    }

    drawerToggleClickHandler = () => {
        this.setState(prevState => {
            return {sideDrawerOpen: !prevState.sideDrawerOpen}
        })
    };

    backdropClickHandler = () => {
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

                <div className="user">
                    <div className="co">
                        <div className="container">
                            <br/>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Form.Label column="column" sm={2}>
                                        Room ID
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" placeholder="Room ID" value={this.state.room_id}
                                                      onChange={this.onChangeRoomId}/>
                                        <p style={{color: "red"}}>  {this.state.room_id_error}</p>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Form.Label column="column" sm={2}>
                                        Room Name
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" placeholder="Room Name" value={this.state.name}
                                                      onChange={this.onChangeName}/>
                                        <p style={{color: "red"}}>  {this.state.nameError}</p>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
                                    <Form.Label column="column" sm={2}>
                                        Room Description
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control rows={3} as="textarea" placeholder="Room Description"
                                                      value={this.state.description}
                                                      onChange={this.onChangeDescription}/>
                                        <p style={{color: "red"}}>  {this.state.descriptionError}</p>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Form.Label column="column" sm={2}>
                                        Room Capacity
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="number" placeholder="Room Capacity"
                                                      value={this.state.capacity} onChange={this.onChangeCapacity}/>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formHorizontalPassword">
                                    <Form.Label column="column" sm={2}>
                                        Bookable
                                    </Form.Label>
                                    <Col sm={10}>
                                        <FormControlLabel value={true} control={<Radio color="primary"/>} label="Yes"
                                                          labelPlacement="end" onChange={this.onChangeBookable}
                                                          checked={this.state.bookable === true}/>
                                        <FormControlLabel value={false} control={<Radio color="primary"/>} label="No"
                                                          labelPlacement="end" onChange={this.onChangeBookable}
                                                          checked={this.state.bookable === false}/>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row}>
                                    <Col sm={{
                                        span: 10,
                                        offset: 2
                                    }}>
                                        <Button type="submit">Update</Button>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddRoom;