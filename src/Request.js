import React, {Component} from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Button from '@material-ui/core/Button';
import {createStyles, makeStyles} from "@material-ui/core/styles";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EventNoteIcon from '@material-ui/icons/EventNote';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventBusyIcon from '@material-ui/icons/EventBusy';

const cookies = new Cookies();

var link1;

let a = 'Bearer ' + cookies.get('Token') + "";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': a
};

const Pendingcolumns = [
    {id: 'firstname', label: 'First Name', minWidth: 170},
    {id: 'lastname', label: 'Last Name', minWidth: 170},
    {
        id: 'room_id',
        label: 'Room id',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString(),
    },
    {
        id: 'email',
        label: 'Email',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString(),
    },
    {
        id: 'start_time',
        label: 'Start Time',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
    {id: 'end_time', label: 'End Time', align: 'right', minWidth: 170},
    {id: 'status', label: 'Status', align: 'right', minWidth: 170},
    {
        id: 'user_type',
        label: 'User Type',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString(),
    },
    {
        id: 'description',
        label: 'Description',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString(),
    },
    {
        id: 'people',
        label: 'People',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    }
];

const Level = props => (
    <p>
        <Grid container spacing={3}>
            <Grid item xs={2}><Paper>{props.products.categories}</Paper></Grid>
            <Grid item xs={2}><Paper>{props.products.attendees[0].emailAddress.name}</Paper></Grid>
            <Grid item xs={3}><Paper>{props.products.attendees[0].emailAddress.address}</Paper></Grid>
            <Grid item xs={2}><Paper>{props.products.start.dateTime.substring(0, 10)}</Paper></Grid>
            <Grid item xs={1}><Paper>{props.products.start.dateTime.substring(11, 16)}</Paper></Grid>
            <Grid item xs={1}><Paper>{props.products.end.dateTime.substring(11, 16)}</Paper></Grid>
            <Grid item xs={1}><Paper><Button type="submit" onClick={() => {
                props.deleteProduct(props.products.id)
            }} variant="contained" color="secondary" startIcon={<DeleteIcon/>}>Delete Event</Button></Paper></Grid>
            <Grid item xs={2}>
            </Grid>
        </Grid>
    </p>
);

const useStyles = makeStyles((theme) =>
    createStyles({
        button: {
            display: 'block',
            marginTop: theme.spacing(2),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
    }),
);

let b;

var fabid = '';
var insid = '';
var twitid = '';
var entreid = '';
var banid = '';


export default class ProductList extends Component {

    constructor(props) {
        super(props);


        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);

        this.state = {

            event: [],
            selectedOption: 'G105 - Focus Group Room',
            age: 'pending',
            open: false,
            page: 0,
            rowsPerPage: 10,
            product: [],
            entrepreneurs: '',
            twitter: '',
            instagram: '',
            facebook: '',
            banner: '',
        }
    }

    handleChange(event) {
        this.setState({age: event.target.value});
    };

    handleClose() {
        this.setState({open: false})
    };

    handleOpen() {
        this.setState({open: true})
    };

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage})
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({rowsPerPage: event.target.value})
        this.setState({page: 0})
    };


    EventAccepted(id, eid, fname, lname, roomID, Email, startTime, endTime, description, people) {
        const accepted = {
            status: "Accepted"
        };

        axios.put('http://localhost:4000/api/booking/status/' + id, accepted)
            .then(response => {
                this.setState({requests: response.data})
            })
            .catch((error) => {
                console.log(error);
            });
        var name = fname + " " + lname;
        this.EventMailAccepted(id, name, startTime, endTime, Email, roomID, description, people);
    }

    // EventTentative(id,eid, fname,lname,roomID, Email,startTime, endTime, description, people){
    //     // console.log(ab.target.id);
    //     const tentative = {
    //         status: "Tentative"
    //     }
    //
    //
    //     alert(Email)
    //
    //     axios.put('http://localhost:4000/api/booking/status/'+id,tentative)
    //         .then(response => {
    //             this.setState({ requests: response.data })
    //             console.log(response.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    //     var name=fname+" "+lname;
    //     this.Tentative(id, fname, startTime, endTime, Email, roomID, description, people);
    // }

    EventTentative(id, eid, fname, lname, roomID, Email, startTime, endTime, description, people) {

        const tentative = {
            status: "Tentative"
        }

        this.TentativeEvent(id, fname, startTime, endTime, Email, roomID, description, people);

        axios.put('http://localhost:4000/api/booking/status/' + id, tentative)
            .then(response => {
                this.setState({requests: response.data})
            })
            .catch((error) => {
                console.log(error);
            })


    }

    DeleteEvent(id, eid, fname, lname, roomID, Email, startTime, endTime, description, people) {

        axios.delete('http://localhost:4000/api/booking/' + id)
            .then(response => {
                console.log(response.data)
            });

        this.Decline(id, fname, startTime, endTime, Email, roomID, description, people);
    }


    //Rejected Ahiya che


    handleOptionChange(e) {
        this.setState({selectedOption: e.target.value});
    }

    deleteProduct(id) {
        axios.delete("https://graph.microsoft.com/v1.0/me/calendars/" + link1 + "/events/" + id, {
            headers: headers
        })
            .then(response => {
                console.log("Deleted");
            });
        alert('Room Booking has been deleted.');

    }


    handleFormSubmit = (formSubmitEvent) => {
        formSubmitEvent.preventDefault();

        console.log('You have selected:', this.state.selectedOption);
        var cat = this.state.selectedOption;

        if (cat === "G306 - Session Room") {
            link1 = "AAMkAGU5OTZlNDk1LTJlNmUtNGY1Ny1iYmMwLTU1ZmIzM2ZhNmJlMwBGAAAAAACKGeDzotHGRajMauDc_qmOBwBqw_J8OsbUQLCfJtoX9jrqAAAAAAEGAABqw_J8OsbUQLCfJtoX9jrqAAAOEcbSAAA="
        } else if (cat === "G305 - Session Room") {
            link1 = "AAMkAGU5OTZlNDk1LTJlNmUtNGY1Ny1iYmMwLTU1ZmIzM2ZhNmJlMwBGAAAAAACKGeDzotHGRajMauDc_qmOBwBqw_J8OsbUQLCfJtoX9jrqAAAAAAEGAABqw_J8OsbUQLCfJtoX9jrqAAAOEcbTAAA=";
        } else if (cat === "G304 – Boardroom") {
            link1 = "AAMkAGU5OTZlNDk1LTJlNmUtNGY1Ny1iYmMwLTU1ZmIzM2ZhNmJlMwBGAAAAAACKGeDzotHGRajMauDc_qmOBwBqw_J8OsbUQLCfJtoX9jrqAAAAAAEGAABqw_J8OsbUQLCfJtoX9jrqAAAOEcbUAAA=";
        } else if (cat === "G303 - Media Production Space") {
            link1 = "AAMkAGU5OTZlNDk1LTJlNmUtNGY1Ny1iYmMwLTU1ZmIzM2ZhNmJlMwBGAAAAAACKGeDzotHGRajMauDc_qmOBwBqw_J8OsbUQLCfJtoX9jrqAAAAAAEGAABqw_J8OsbUQLCfJtoX9jrqAAAOEcbVAAA=";
        } else if (cat === "G206 - Multipurpose Room") {
            link1 = "AAMkAGU5OTZlNDk1LTJlNmUtNGY1Ny1iYmMwLTU1ZmIzM2ZhNmJlMwBGAAAAAACKGeDzotHGRajMauDc_qmOBwBqw_J8OsbUQLCfJtoX9jrqAAAAAAEGAABqw_J8OsbUQLCfJtoX9jrqAAAOEcbWAAA=";
        } else if (cat === "G204 – Boardroom") {
            link1 = "AAMkAGU5OTZlNDk1LTJlNmUtNGY1Ny1iYmMwLTU1ZmIzM2ZhNmJlMwBGAAAAAACKGeDzotHGRajMauDc_qmOBwBqw_J8OsbUQLCfJtoX9jrqAAAAAAEGAABqw_J8OsbUQLCfJtoX9jrqAAAOEcbXAAA=";
        } else if (cat === "G205 – Focus Group Control Room") {
            link1 = "AAMkAGU5OTZlNDk1LTJlNmUtNGY1Ny1iYmMwLTU1ZmIzM2ZhNmJlMwBGAAAAAACKGeDzotHGRajMauDc_qmOBwBqw_J8OsbUQLCfJtoX9jrqAAAAAAEGAABqw_J8OsbUQLCfJtoX9jrqAAAOEcbYAAA=";
        } else if (cat === "G105 - Focus Group Room") {
            link1 = "AAMkAGU5OTZlNDk1LTJlNmUtNGY1Ny1iYmMwLTU1ZmIzM2ZhNmJlMwBGAAAAAACKGeDzotHGRajMauDc_qmOBwBqw_J8OsbUQLCfJtoX9jrqAAAAAAEGAABqw_J8OsbUQLCfJtoX9jrqAAAOEcbZAAA=";
        }

        axios.get('https://graph.microsoft.com/v1.0/me/calendars/' + link1 + '/events', {
            headers: headers
        })
            .then(response => {
                this.setState({event: response.data});
            });
    };


    EventMailAccepted(ids, name, startTime, endTime, Email, roomID, description, people) {

        const user = {
            id: ids,
            room_id: roomID,
            start_time: startTime,
            end_time: endTime,
            email: Email,
            status: "Accepted",
            user_type: "Student",
            description: description,
            people: people
        };

        axios.put('http://localhost:4000/api/booking/' + ids, user)

        let cat = roomID;
        let link1;
        if (cat === "G306") {
            link1 = "AAMkAGU5OTZlNDk1LTJlNmUtNGY1Ny1iYmMwLTU1ZmIzM2ZhNmJlMwBGAAAAAACKGeDzotHGRajMauDc_qmOBwBqw_J8OsbUQLCfJtoX9jrqAAAAAAEGAABqw_J8OsbUQLCfJtoX9jrqAAAOEcbSAAA="
        } else if (cat === "G305") {
            link1 = "AAMkAGU5OTZlNDk1LTJlNmUtNGY1Ny1iYmMwLTU1ZmIzM2ZhNmJlMwBGAAAAAACKGeDzotHGRajMauDc_qmOBwBqw_J8OsbUQLCfJtoX9jrqAAAAAAEGAABqw_J8OsbUQLCfJtoX9jrqAAAOEcbTAAA=";
        } else if (cat === "G304") {
            link1 = "AAMkAGU5OTZlNDk1LTJlNmUtNGY1Ny1iYmMwLTU1ZmIzM2ZhNmJlMwBGAAAAAACKGeDzotHGRajMauDc_qmOBwBqw_J8OsbUQLCfJtoX9jrqAAAAAAEGAABqw_J8OsbUQLCfJtoX9jrqAAAOEcbUAAA=";
        } else if (cat === "G303") {
            link1 = "AAMkAGU5OTZlNDk1LTJlNmUtNGY1Ny1iYmMwLTU1ZmIzM2ZhNmJlMwBGAAAAAACKGeDzotHGRajMauDc_qmOBwBqw_J8OsbUQLCfJtoX9jrqAAAAAAEGAABqw_J8OsbUQLCfJtoX9jrqAAAOEcbVAAA=";
        } else if (cat === "G206") {
            link1 = "AAMkAGU5OTZlNDk1LTJlNmUtNGY1Ny1iYmMwLTU1ZmIzM2ZhNmJlMwBGAAAAAACKGeDzotHGRajMauDc_qmOBwBqw_J8OsbUQLCfJtoX9jrqAAAAAAEGAABqw_J8OsbUQLCfJtoX9jrqAAAOEcbWAAA=";
        } else if (cat === "G204") {
            link1 = "AAMkAGU5OTZlNDk1LTJlNmUtNGY1Ny1iYmMwLTU1ZmIzM2ZhNmJlMwBGAAAAAACKGeDzotHGRajMauDc_qmOBwBqw_J8OsbUQLCfJtoX9jrqAAAAAAEGAABqw_J8OsbUQLCfJtoX9jrqAAAOEcbXAAA=";
        } else if (cat === "G205") {
            link1 = "AAMkAGU5OTZlNDk1LTJlNmUtNGY1Ny1iYmMwLTU1ZmIzM2ZhNmJlMwBGAAAAAACKGeDzotHGRajMauDc_qmOBwBqw_J8OsbUQLCfJtoX9jrqAAAAAAEGAABqw_J8OsbUQLCfJtoX9jrqAAAOEcbYAAA=";
        } else if (cat === "G105") {
            link1 = "AAMkAGU5OTZlNDk1LTJlNmUtNGY1Ny1iYmMwLTU1ZmIzM2ZhNmJlMwBGAAAAAACKGeDzotHGRajMauDc_qmOBwBqw_J8OsbUQLCfJtoX9jrqAAAAAAEGAABqw_J8OsbUQLCfJtoX9jrqAAAOEcbZAAA=";
        }

        var accepted = "<!DOCTYPE html><html><head><title>Email Page</title><style type='text/css'></style></head><body><div align=justify><p>Hi " + name + ",</p><p><b>Your room booking for " + roomID + " at " + startTime.substring(0, 10) + "," + startTime.substring(11, 16) + " to " + endTime.substring(11, 16) + " has been confirmed. </b>Please note, the confirmation applies to the first three hours of your request. Should the room be available following your booking, you are welcome to use it until the next scheduled room booking.<p>ROOM BOOKING TERMS AND CONDITIONS: Students, alumni, faculty, administration and community* members may request meeting room space in G-building under the following conditions:</p><ol><li>Requestors must be members of the CfE.</li><br><li>Same day requests are not processed. Forms received after 4:00pm, booking for the next business day, is considered a same day request.</li><br><li>Rooms can be booked up to two weeks in advance.</li><br><li>Rooms may be booked for up to three hours. Requests outside of the restriction will only be considered for the first three hours.</li><br><li>Rooms cannot be booked on a consecutive or recurring basis</li><br><li>Room bookings cannot exceed the seating capacity of the room.</li><br><li>Audio-visual equipment cannot be moved from the room. For all A/V issues contact IT at 416-675-6622 x8888.</li><br><li>Rooms must be left clean with no damage. Users agree to cover all damages and losses resulting from room use. Please advise the CfE team of any pre-existing damages within the first 10 minutes of the reservation.</li><br><li>Room bookings will be relinquished after the first 15 minutes if unoccupied.</li><br><li>Booking privileges will be suspended for contravention of these conditions or for no-show (15 minutes late)</li></ol><br><p>Please let us know if there are any changes.<br><br>Regards,<br><b style=color: #173F5F;>Centre for Entrepreneurship (CfE) Team</b><br>Humber Institute of Technology & Advanced Learning<br>17 Colonel Samuel Smith Park Drive, G-building<br>Toronto, ON M8V 4B6<br>Phone: 416-675-6622 x3490<br>Email:<a href=mailto:cfe@humber.ca>cfe@humber.ca</a><br> <a href=https://www.humber.ca/cfe>www.humber.ca/cfe</a></p><p><img src='cid:entrepreneurs'><br><br><a href=https://www.facebook.com/humbercfe><img src='cid:facebook'></a><a href=https://twitter.com/humbercfe><img src='cid:twitter'></a><a href=https://www.instagram.com/humbercfe/><img src='cid:instagram'></a><br><br><img src='cid:banner'></p><p style=color: #20639B; align=justify>CONFIDENTIALITY NOTICE:<br>This email and attached material are intended for the use of the individual or organization to whom they are addressed and may not be distributed, copied, or disclosed to other unauthorized persons. Thismaterial may contain confidential and/or personal information subject to the provisions of the Freedom of Information and Protection of Privacy Act, the Municipal Freedom of Information and Protection ofPrivacy Act, and/or the Personal Health Information Protection Act. If you receive this transmission in error, please notify me immediately and delete this message. Do not email, print, copy, distribute, or disclose this email or its contents further. Thank you for your co-operation and assistance.</p></div></body></html>";

        const Event = {
            subject: name,
            body: {
                contentType: "HTML",
                content: accepted
            },
            categories: [cat],
            start: {
                dateTime: startTime,
                timeZone: "Eastern Standard Time"
            },
            end: {
                dateTime: endTime,
                timeZone: "Eastern Standard Time"
            },
            hasAttachments: true,
            location: {
                displayName: "Humber College"
            },
            attachments: [

                {
                    "contentType": "image/png",
                    "contentId": "facebook",
                    "isInline": true,
                    "@odata.type": "#Microsoft.OutlookServices.FileAttachment",
                    "contentBytes": fabid,
                    "name": "name.jpg"
                },
                {
                    "contentType": "image/png",
                    "contentId": "instagram",
                    "isInline": true,
                    "@odata.type": "#Microsoft.OutlookServices.FileAttachment",
                    "contentBytes": insid,
                    "name": "name.jpg"
                },


                {
                    "contentType": "image/png",
                    "contentId": "twitter",
                    "isInline": true,
                    "@odata.type": "#Microsoft.OutlookServices.FileAttachment",
                    "contentBytes": twitid,
                    "name": "name.jpg"
                },
                {
                    "contentType": "image/png",
                    "contentId": "enterpreneurs",
                    "isInline": true,
                    "@odata.type": "#Microsoft.OutlookServices.FileAttachment",
                    "contentBytes": entreid,
                    "name": "name.jpg"
                },
                {
                    "contentType": "image/png",
                    "contentId": "banner",
                    "isInline": true,
                    "@odata.type": "#Microsoft.OutlookServices.FileAttachment",
                    "contentBytes": banid,
                    "name": "name.jpg"
                }
            ],
            attendees: [
                {
                    emailAddress: {
                        address: Email,
                        name: name
                    },
                    type: "required"
                }
            ]
        }//,
        // attachments: [
        //   {
        //     contentType: "image/png",
        //     contentId: "yourcid",
        //     isInline: true,
        //     "@odata.type ": "#Microsoft.OutlookServices.FileAttachment",
        //     contentBytes: "iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAGYktHRAD/AP8A/6C9p5MAAAPhSURBVEhL3ZVpbJVFFIbf6y3QAoUgCiJL3DAIiiAYDQYTjEswEn4IginhhxSxUKD8sDFgNalbgkSjmIBCUCyWPVAx2gpUrNBWrVop2oIU04VuoKYsbUl7eX1nueS23BJDTX/wJPN958w3M2fmnDnnC1CgG7nOv7uNa9/g/xbDVZ8Dm/OBv84BQR1jQG8g4SFg2TQ/IIwx2FUmLCVTPyYbm3yHaDxPvriBvD/Fd3i6bPCpl8ituV4RW/a7FsbIZkyYLsWwpBzopxWemQIcrwTGzAQqTwIVakYurwJmPQL01ZiiUjfnUgx3fQ1k7fO3KGAeVyYmCJyoBtKXAZPGA9OTgNVpwIib3feKGmDJa1pzDZBbCBwqAtKS9cEYzMomZ8wjz5wjq2vJqhqyto481dB5a1GM5il21RprmDrbvSN58ln3rjpJLkx1sj3Q9wf1OKNT7gSG3gQMGwK09gV+bgGOtEZvxWrBXsDfp80KQLz8FAo5OcxZndIQFyunNTnZGmyTsU82ADUVwHK5yBDfE/ihDMgrAfJ/v7ztlYtuuAU4kO3GL3gOSJqrWB5V07yU54Eh2vTBb4Ds3cBdt7pxNoavLAKSXwYG6WRZmRqwA3jvM6BnnPQ8oPGsYtbDTTBcuADcMQKYfC+QqDx78yM3t/SwvLRJi+oOPC3jd45RfiqufeK1mVQ/2Rh8fQFZX20kR1kxmTCRrKt0+k/5ZM5Oct8e8qvt5PFS1797PZk2l5w/hTyqOf8Fa/DtRLKhyurtWPggmScDhrpfySNbyKZ6p7+bpLbIyW2t2vQccvk08tN0MkOtptx964iNYa+2yzOhTBdp+GDgcA6QuQIYPFa5NUtjBwFvyY0D+yv29bo0uhjBGGBFBvDqViBWK7IZuF4ujoqx+qHcctq7z5DzDrnyca+IL1aSq54gc9eQ6Tp1yV7XX3tM8b+PPPad0w2HMsj8TV6JgjW4MUG1T/kXlrclOzmSBi1etJlsbvQdnoshufZh8sD7Ti/cSBaohnaGdWms/Nl8Clg3GRitMjVztT18O24cCUyYrbH9fIcnoBVSvpVrlT57dNtjlIs9rlSpjNUv55NrR6pqFNpNXDW/rCM/GEb+luk7omBPGPhHp1JyDn3A7uGqGZeoupoiQf/EzrCJv1+3bpKSN67DzQopwQuWykWqGO1QGQuqXE18w+sR/KGKFdItHSX3RsMaLF6i38xo4LYXfG8EDT+q/qlmtkMGA/pbDLzb6xEUTAduX6zK86jv6IA1eFFFumgq0PKnW+gSCr4p0FExxVoeiITK5wGPAfes9x1RsAa93C3YS9OdXOsGgX8BSggK5Mn13yYAAAAASUVORK5CYII=",
        //     name: "name.jpg"
        //   }
        // ]
        // https://graph.microsoft.com/v1.0/me/calendars/AAMkAGViNDU7zAAAAAGtlAAA=/events

        axios.post('https://graph.microsoft.com/v1.0/me/calendars/' + link1 + '/events', Event, {
            headers: headers
        });
        // .then(res => console.log(res.data));
        alert("Accepted Event has been send");
    }


    TentativeEvent(ids, name, startTime, endTime, email, FirstName, LastName, roomID, description, people) {

        var tentative = "<!DOCTYPE html><html><head><title>Email Page</title><style type='text/css'></style></head><body><div align=justify><p>Hi " + name + ",</p><p><b>Your room booking has been tentatively confirmed. </b>Please note, the confirmation applies to the first three hours of your request. Should the room be available following your booking, you are welcome to use it until the next scheduled room booking.<p>ROOM BOOKING TERMS AND CONDITIONS: Students, alumni, faculty, administration and community* members may request meeting room space in G-building under the following conditions:</p><ol><li>Requestors must be members of the CfE.</li><br><li>Same day requests are not processed. Forms received after 4:00pm, booking for the next business day, is considered a same day request.</li><br><li>Rooms can be booked up to two weeks in advance.</li><br><li>Rooms may be booked for up to three hours. Requests outside of the restriction will only be considered for the first three hours.</li><br><li>Rooms cannot be booked on a consecutive or recurring basis</li><br><li>Room bookings cannot exceed the seating capacity of the room.</li><br><li>Audio-visual equipment cannot be moved from the room. For all A/V issues contact IT at 416-675-6622 x8888.</li><br><li>Rooms must be left clean with no damage. Users agree to cover all damages and losses resulting from room use. Please advise the CfE team of any pre-existing damages within the first 10 minutes of the reservation.</li><br><li>Room bookings will be relinquished after the first 15 minutes if unoccupied.</li><br><li>Booking privileges will be suspended for contravention of these conditions or for no-show (15 minutes late)</li></ol><br><p>Please let us know if there are any changes.<br><br>Regards,<br><b style=color: #173F5F;>Centre for Entrepreneurship (CfE) Team</b><br>Humber Institute of Technology & Advanced Learning<br>17 Colonel Samuel Smith Park Drive, G-building<br>Toronto, ON M8V 4B6<br>Phone: 416-675-6622 x3490<br>Email:<a href=mailto:cfe@humber.ca>cfe@humber.ca</a><br> <a href=https://www.humber.ca/cfe>www.humber.ca/cfe</a></p><p><img src='cid:entrepreneurs'><br><br><a href=https://www.facebook.com/humbercfe><img src='cid:facebook'></a><a href=https://twitter.com/humbercfe><img src='cid:twitter'></a><a href=https://www.instagram.com/humbercfe/><img src='cid:instagram'></a><br><br><img src='cid:banner'></p><p style=color: #20639B; align=justify>CONFIDENTIALITY NOTICE:<br>This email and attached material are intended for the use of the individual or organization to whom they are addressed and may not be distributed, copied, or disclosed to other unauthorized persons. Thismaterial may contain confidential and/or personal information subject to the provisions of the Freedom of Information and Protection of Privacy Act, the Municipal Freedom of Information and Protection ofPrivacy Act, and/or the Personal Health Information Protection Act. If you receive this transmission in error, please notify me immediately and delete this message. Do not email, print, copy, distribute, or disclose this email or its contents further. Thank you for your co-operation and assistance.</p></div></body></html>";

        const Email = {
            "message": {
                "subject": "Booking Tentative",
                "toRecipients": [{"emailAddress": {"address": email}}],
                "body": {
                    "contentType": "html",
                    // "content": "<div>This is a small jpeg: <img src=\"cid:yourcid\" height='50' width='50'><img src=\"cid:yourcid2\" height='50' width='50'></div>"
                    "content": tentative
                },
                attachments: [
                    {
                        "contentType": "image/png",
                        "contentId": "facebook",
                        "isInline": true,
                        "@odata.type": "#Microsoft.OutlookServices.FileAttachment",
                        "contentBytes": fabid,
                        "name": "name.jpg"
                    },
                    {
                        "contentType": "image/png",
                        "contentId": "instagram",
                        "isInline": true,
                        "@odata.type": "#Microsoft.OutlookServices.FileAttachment",
                        "contentBytes": insid,
                        "name": "name.jpg"
                    },


                    {
                        "contentType": "image/png",
                        "contentId": "twitter",
                        "isInline": true,
                        "@odata.type": "#Microsoft.OutlookServices.FileAttachment",
                        "contentBytes": twitid,
                        "name": "name.jpg"
                    },
                    {
                        "contentType": "image/png",
                        "contentId": "enterpreneurs",
                        "isInline": true,
                        "@odata.type": "#Microsoft.OutlookServices.FileAttachment",
                        "contentBytes": entreid,
                        "name": "name.jpg"
                    },
                    {
                        "contentType": "image/png",
                        "contentId": "banner",
                        "isInline": true,
                        "@odata.type": "#Microsoft.OutlookServices.FileAttachment",
                        "contentBytes": banid,
                        "name": "name.jpg"
                    }
                ]
            }
        };
        axios.post('https://graph.microsoft.com/v1.0/me/sendMail', Email, {
            headers: headers
        });
        // .then(res =>
        //     console.log(res.data)
        // );
        alert("Tentative Email has been send");
    }


    Decline(ids, name, startTime, endTime, email, FirstName, LastName, roomID, description, people) {
        // console.log("z");
        //  alert(name)
        var decline = "<!DOCTYPE html> <html> <head> <title>Email Page</title> <style type='text/css'></style> </head> <body> <div align=justify> <p>Hi " + name + ",</p> <p><b>Thank you for your room booking request</b>.<p>Unfortunately, one or more of our Terms and Conditions was not met:</p><ol> <li> Same day requests are not processed. Forms received after 4:00pm booking for the following day are considered same day requests.</li><br><li> Rooms may be booked for up to three hours.</li><br><li> Rooms may not be booked on a consecutive or recurring basis.</li><br><li> Rooms can be requested up to two weeks in advance. </li><br><li> Room bookings cannot exceed the seating capacity of the room.</li><br><li> Room has already been booked for the time period requested</li><br><li> The rooms in CfE (G-building) are designated for entrepreneurial activities, training or encouragement of entrepreneurship with a primary mandate to support student-led entrepreneurial ventures.</li><br></ol><br><p>To re-submit your request once it adheres to all terms and conditions outlined on the CfE Room Booking Request form, click <a href=https://humber.ca/cfe/room-booking>here</a>.<br><br>Regards,<br><b style=color: #173F5F;>Centre for Entrepreneurship (CfE) Team</b><br>Humber Institute of Technology & Advanced Learning<br>17 Colonel Samuel Smith Park Drive, G-building<br>Toronto, ON M8V 4B6<br>Phone: 416-675-6622 x3490<br>Email:<a href=mailto:cfe@humber.ca>cfe@humber.ca</a><br> <a href=https://www.humber.ca/cfe>www.humber.ca/cfe</a></p><p><img src='cid:entrepreneurs'><br><br><a href=https://www.facebook.com/humbercfe><img src='cid:facebook'></a><a href=https://twitter.com/humbercfe><img src='cid:twitter'></a><a href=https://www.instagram.com/humbercfe/><img src='cid:instagram'></a><br><br><img src='cid:banner'></p><p style=color: #20639B; align=justify>CONFIDENTIALITY NOTICE:<br>This email and attached material are intended for the use of the individual or organization to whom they are addressed and may not be distributed, copied, or disclosed to other unauthorized persons. Thismaterial may contain confidential and/or personal information subject to the provisions of the Freedom of Information and Protection of Privacy Act, the Municipal Freedom of Information and Protection ofPrivacy Act, and/or the Personal Health Information Protection Act. If you receive this transmission in error, please notify me immediately and delete this message. Do not email, print, copy, distribute, or disclose this email or its contents further. Thank you for your co-operation and assistance.</p></div></body></html>";
        const Email = {
            "message": {
                "subject": "Booking Cancelled",
                "toRecipients": [{"emailAddress": {"address": email}}],
                "body": {
                    "contentType": "html",
                    // "content": "<div>This is a small jpeg: <img src=\"cid:yourcid\" height='50' width='50'><img src=\"cid:yourcid2\" height='50' width='50'></div>"
                    "content": decline
                },
                attachments: [

                    {
                        "contentType": "image/png",
                        "contentId": "facebook",
                        "isInline": true,
                        "@odata.type": "#Microsoft.OutlookServices.FileAttachment",
                        "contentBytes": fabid,
                        "name": "name.jpg"
                    },
                    {
                        "contentType": "image/png",
                        "contentId": "instagram",
                        "isInline": true,
                        "@odata.type": "#Microsoft.OutlookServices.FileAttachment",
                        "contentBytes": insid,
                        "name": "name.jpg"
                    },


                    {
                        "contentType": "image/png",
                        "contentId": "twitter",
                        "isInline": true,
                        "@odata.type": "#Microsoft.OutlookServices.FileAttachment",
                        "contentBytes": twitid,
                        "name": "name.jpg"
                    },
                    {
                        "contentType": "image/png",
                        "contentId": "enterpreneurs",
                        "isInline": true,
                        "@odata.type": "#Microsoft.OutlookServices.FileAttachment",
                        "contentBytes": entreid,
                        "name": "name.jpg"
                    },
                    {
                        "contentType": "image/png",
                        "contentId": "banner",
                        "isInline": true,
                        "@odata.type": "#Microsoft.OutlookServices.FileAttachment",
                        "contentBytes": banid,
                        "name": "name.jpg"
                    }
                ]
            }
        };
        axios.post('https://graph.microsoft.com/v1.0/me/sendMail', Email, {
            headers: headers
        });
        // .then(res => console.log(res.data));
        alert("Decline Email has been send");
    }


    Accepted() {
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>

                    <RadioGroup aria-label="Rooms" name="gender1" value={this.state.selectedOption}
                                onChange={this.handleOptionChange}>
                        <FormControlLabel value="G306 - Session Room" control={<Radio/>} label="G306 - Session Room"/>
                        <FormControlLabel value="G305 - Session Room" control={<Radio/>} label="G305 - Session Room"/>
                        <FormControlLabel value="G304 – Boardroom" control={<Radio/>} label="G304 – Boardroom"/>
                        <FormControlLabel value="G303 - Media Production Space" control={<Radio/>}
                                          label="G303 - Media Production Space"/>
                        <FormControlLabel value="G206 - Multipurpose Room" control={<Radio/>}
                                          label="G206 - Multipurpose Room"/>
                        <FormControlLabel value="G204 – Boardroom" control={<Radio/>} label="G204 – Boardroom"/>
                        <FormControlLabel value="G205 – Focus Group Control Room" control={<Radio/>}
                                          label="G205 – Focus Group Control Room"/>
                        <FormControlLabel value="G105 - Focus Group Room" control={<Radio/>}
                                          label="G105 - Focus Group Room"/>
                    </RadioGroup>

                    <Button type="submit" variant="outlined" color="primary">
                        Find
                    </Button>
                    <br/>
                </form>
                <br/>
                <Grid container spacing={3}>
                    <Grid item xs={2}><Paper>Room No</Paper></Grid>
                    <Grid item xs={2}><Paper>Name</Paper></Grid>
                    <Grid item xs={3}><Paper>Email</Paper></Grid>
                    <Grid item xs={2}><Paper>Date</Paper></Grid>
                    <Grid item xs={1}><Paper>Start Time</Paper></Grid>
                    <Grid item xs={1}><Paper>End Time</Paper></Grid>
                    <Grid item xs={1}><Paper>Action</Paper></Grid>
                </Grid>
                <br/>
                {this.state.event.value !== undefined ? this.state.event.value.map(data => <Level products={data}
                                                                                                  deleteProduct={this.deleteProduct}/>) : console.log("Undefined")}
            </div>
        )
    }


    //Accepted Ahiya che


    Pending() {
        axios.get('http://localhost:4000/api/booking/status/Pending')
            .then(response => {
                this.setState({
                    product: response.data
                });

            });
        return (
            <Paper className={useStyles.root}>
                <TableContainer className={useStyles.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <div>
                                <TableRow>
                                    {Pendingcolumns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{minWidth: column.minWidth}}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                    <TableCell
                                        align='right'
                                        style={{minWidth: 300}}>
                                        Action
                                    </TableCell>
                                </TableRow>
                            </div>
                        </TableHead>
                        <TableBody>
                            {/* {console.log(this.state.product.value!=undefined)} */}
                            {/* {console.log(rows)} */}
                            {/*{console.log(this.state.product)}*/}
                            {/* {console.log(this.state.rowsPerPage)} */}
                            {/* {console.log(rows[1])} */}

                            {this.state.product.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row) => {
                                return (
                                    <div>
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {Pendingcolumns.map((column) => {
                                                const value = row[column.id];
                                                return (

                                                    <TableCell key={column.id} align={column.align}
                                                               style={{minWidth: column.minWidth}}>
                                                        {value}
                                                    </TableCell>


                                                );
                                            })}
                                            <TableCell align='right'
                                                       style={{minWidth: 170}}>
                                                <Button type="submit" variant="contained"
                                                    // color="primary"
                                                        class="btn btn-success"
                                                        startIcon={<EventAvailableIcon/>}
                                                        style={{marginBottom: 5}}
                                                        onClick={() => this.EventAccepted(row['_id'], row['id'],
                                                            row['firstname'],
                                                            row['lastname'],
                                                            row['room_id'],
                                                            row['email'],
                                                            row['start_time'],
                                                            row['end_time'],
                                                            row['status'],
                                                            row['user_type'],
                                                            row['description'],
                                                            row['people'])}>Accept Event</Button>
                                                <Button type="submit" variant="contained"
                                                    // color="default"
                                                        class="btn btn-primary"
                                                        style={{marginBottom: 5}}
                                                        startIcon={<EventNoteIcon/>}
                                                        onClick={() => this.EventTentative(row['_id'], row['id'],
                                                            row['firstname'],
                                                            row['lastname'],
                                                            row['room_id'],
                                                            row['email'],
                                                            row['start_time'],
                                                            row['end_time'],
                                                            row['status'],
                                                            row['user_type'],
                                                            row['description'],
                                                            row['people'])}>Tentative Event</Button>
                                                <Button type="submit" variant="contained"
                                                    // color="secondary"
                                                        class="btn btn-danger"
                                                        startIcon={<EventBusyIcon/>}
                                                        onClick={() => this.DeleteEvent(row['_id'], row['id'],
                                                            row['firstname'],
                                                            row['lastname'],
                                                            row['room_id'],
                                                            row['email'],
                                                            row['start_time'],
                                                            row['end_time'],
                                                            row['status'],
                                                            row['user_type'],
                                                            row['description'],
                                                            row['people'])}>Delete Event</Button>
                                            </TableCell>
                                        </TableRow>
                                    </div>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/*<TablePagination*/}
                {/*    rowsPerPageOptions={[10, 25, 100]}*/}
                {/*    component="div"*/}
                {/*    count={this.state.product.length}*/}
                {/*    rowsPerPage={this.state.rowsPerPage}*/}
                {/*    page={this.state.page}*/}
                {/*    onChangePage={this.handleChangePage}*/}
                {/*    onChangeRowsPerPage={this.handleChangeRowsPerPage}*/}
                {/*/>*/}
            </Paper>
        )
    }


////Tentative


    Tentative() {
        axios.get('http://localhost:4000/api/booking/status/Tentative')
            .then(response => {
                this.setState({
                    product: response.data
                });

            });
        let value;

        return (
            <Paper className={useStyles.root}>
                <TableContainer className={useStyles.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <div>
                                <TableRow>
                                    {Pendingcolumns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{minWidth: column.minWidth}}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                    <TableCell
                                        align='right'
                                        style={{minWidth: 300}}>
                                        Action
                                    </TableCell>
                                </TableRow>
                            </div>
                        </TableHead>
                        <TableBody>
                            {/* {console.log(this.state.product.value!=undefined)} */}
                            {/* {console.log(rows)} */}
                            {console.log(this.state.product)}
                            {/* {console.log(this.state.rowsPerPage)} */}
                            {/* {console.log(rows[1])} */}
                            {this.state.product.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row) => {
                                return (
                                    <div>
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>

                                            {Pendingcolumns.map((column) => {
                                                value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}
                                                               style={{minWidth: column.minWidth}}>
                                                        {value}
                                                    </TableCell>
                                                );
                                            })}

                                            <TableCell align='right'
                                                       style={{minWidth: 300}}>
                                                <Button type="submit" variant="contained" class="btn btn-success"
                                                        startIcon={<EventAvailableIcon/>}
                                                        style={{marginBottom: 5}}
                                                        onClick={() => this.EventAccepted(row['_id'], row['id'],
                                                            row['firstname'],
                                                            row['lastname'],
                                                            row['room_id'],
                                                            row['email'],
                                                            row['start_time'],
                                                            row['end_time'],
                                                            row['status'],
                                                            row['user_type'],
                                                            row['description'],
                                                            row['people'])}>Accept</Button>
                                                <Button type="submit" variant="contained" class="btn btn-danger"
                                                        startIcon={<EventBusyIcon/>}
                                                        style={{marginBottom: 5}}
                                                        onClick={() => this.DeleteEvent(row['_id'], row['id'],
                                                            row['firstname'],
                                                            row['lastname'],
                                                            row['room_id'],
                                                            row['email'],
                                                            row['start_time'],
                                                            row['end_time'],
                                                            row['status'],
                                                            row['user_type'],
                                                            row['description'],
                                                            row['people'])}>Reject</Button>
                                            </TableCell>
                                        </TableRow>
                                    </div>

                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/*<TablePagination*/}
                {/*    rowsPerPageOptions={[10, 25, 100]}*/}
                {/*    component="div"*/}
                {/*    count={this.state.product.length}*/}
                {/*    rowsPerPage={this.state.rowsPerPage}*/}
                {/*    page={this.state.page}*/}
                {/*    onChangePage={this.handleChangePage}*/}
                {/*    onChangeRowsPerPage={this.handleChangeRowsPerPage}*/}
                {/*/>*/}
            </Paper>
        )
    }


    componentDidMount() {
        let entrepreneurs = '', twitter = '', instagram = '', facebook = '', banner = '', requests = '', events = '';
        axios.post('http://localhost:4000/img', {img: 'We are Entrepreneurs.png'})
            .then(res => {
                // this.setState({entrepreneurs: res.data});
                entrepreneurs = res.data;
                // entreid = this.state.entrepreneurs;
            });

        axios.post('http://localhost:4000/img', {img: 'twitter.png'})
            .then(res => {
                // this.setState({twitter: res.data});
                twitter = res.data
                // twitid = this.state.twitter;
            });

        axios.post('http://localhost:4000/img', {img: 'instagram.png'})
            .then(res => {
                // this.setState({instagram: res.data});
                instagram = res.data
                // insid = this.state.instagram;
            });

        axios.post('http://localhost:4000/img', {img: 'facebook.png'})
            .then(res => {
                // this.setState({facebook: res.data});
                facebook = res.data
                // fabid = this.state.facebook;
            });

        axios.post('http://localhost:4000/img', {img: 'Eventbrite Banner Career Recharge.png'})
            .then(res => {
                // this.setState({banner: res.data});
                banner = res.data
                // banid = this.state.banner;
            });

        const accepted = {
            status: "Pending"
        };

        axios.post('http://localhost:4000/api/booking/status', accepted)
            .then(response => {
                // this.setState({requests: response.data});
                requests = response.data
            })
            .catch((error) => {
                console.log(error);
            });

        axios.get('http://localhost:4000/api/event/list')
            .then(response => {
                // this.setState({events: response.data});
                events = response.data
            })
            .catch((error) => {
                console.log(error);
            })

        setTimeout(() => {
            this.setState({
                entrepreneurs: entrepreneurs,
                twitter: twitter,
                instagram: instagram,
                facebook: facebook,
                banner: banner,
                requests: requests,
                events: events
            })
        }, 2000);
    }

    render() {
        console.log('Hello')
        console.log(this.state)
        if (this.state.age === "pending") {
            b = this.Pending();
        } else if (this.state.age === "accepted") {
            b = this.Accepted();
        } else if (this.state.age === "tentative") {
            b = this.Tentative();
        }
        return (
            <div style={{width: '90%', marginLeft: 50}}>
                <br/><br/><br/><br/>
                <h1 style={{"text-align": "center"}}>Booking Requests</h1>
                <FormControl className={useStyles.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">Status</InputLabel>
                    <br/>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        value={this.state.age}
                        onChange={this.handleChange.bind(this)}>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="accepted">Accepted</MenuItem>
                        <MenuItem value="tentative">Tentative</MenuItem>
                    </Select>
                </FormControl>
                <br/>
                <br/>
                {b}
            </div>
        );
    }
}