import React from 'react';
import Header from './Header';
import HeaderDrawer from './HeaderDrawer';
import BackdropHeader from './BackdropHeader';
import '../Request.css';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import Schedule from './Schedule';
import {Link} from 'react-router-dom';


class HeaderControl extends React.Component {
    state = {
        sideDrawerOpen: false,
        slo: "",
        startTime: "",
        endTime: "",
        sid: "",
        resid: ""
    }

    drawerToggleClickHandler = () => {
        this.setState(prevState => {
            console.log("Harsh")
            return {sideDrawerOpen: !prevState.sideDrawerOpen}

        })
    }

    backdropClickHandler = () => {
        console.log("Rangeen");
        this.setState({sideDrawerOpen: false})

    }

    myCallBack = (idSlo, slotId, start, end, resoId) => {
        console.log(start);
        console.log(end);
        console.log(slotId);

        this.setState({slo: slotId});
        this.setState({startTime: start});
        this.setState({endTime: end});
        this.setState({sid: idSlo});
        this.setState({resid: resoId});


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
                <img class="image"
                     src="http://humber.ca/cfe/sites/default/files/styles/1920x696/public/uploads/images/header/room960.png?itok=g_Pik76Z"
                     alt="Meeting room with chairs, table and large window"/>
                <br></br>
                <br></br>
                <div class="content">
                    <div class="firstcontent">
                        <p><strong>Please review the room booking protocol and room descriptions before <a
                            href="https://humber.ca1.qualtrics.com/jfe/form/SV_07BZKnqwJqggb4h">booking your room</a>. A
                            follow-up email will be sent to you upon submission of the request.​</strong></p>
                        <br></br>
                        <h2>Protocol:</h2>
                        <p align="justify">The Centre for Entrepreneurship (CfE) is dedicated to supporting
                            entrepreneurs by providing entrepreneurship training and events for Humber students,
                            graduates, faculty and staff.The rooms at CfE (G building) are <strong>designated for
                                entrepreneurial activities, training or encouragement of entrepreneurship with a primary
                                mandate to support student-led entrepreneurial ventures</strong>. The rooms are not to
                            be used to co-locate college or other services, as additional academic classrooms or as
                            administrative meeting places.
                            <br></br><br></br>This protocol applies to all those booking spaces at the Centre for
                            Entrepreneurship. This document establishes the appropriate areas for room bookings within
                            the G Building, Lakeshore Campus (excluding G Commons).</p>
                        <div className="acc">
                            <Accordion allowZeroExpanded="true">
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            First Floor
                                            G105 - Focus Group Room – Capacity: 16 people
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <p>
                                            The focus group room is a multi-purpose space wired to accommodate remote
                                            viewing of focus groups. <br></br>Installed technology include cameras in
                                            all four corners of the room and wiring for microphones for listening to
                                            focus group conversation.<br></br> Feeds for audio and video goes to room
                                            G205 on the second floor (northeast corner room). <br></br>Other technology
                                            includes data projection and screen, as well as two large monitors, mounted
                                            strategically to allow viewing by all members of a group seated boardroom
                                            style in the room. The room has a wet service counter which includes a sink
                                            and electrical outlets to accommodate food service. Furniture consists of
                                            tables that can be used in multiple configurations including a boardroom
                                            style set-up, and comfortable, movable, adjustable chairs and a mounted
                                            whiteboard. Lighting in the room is uniform, bright but dimmable, and
                                            suitable for videoing meeting participants.
                                        </p>
                                    </AccordionItemPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            G205 – Focus Group Control Room - Capacity: 4 people
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <p>
                                            The focus group control room is wired to accommodate remote viewing of the
                                            focus group room.
                                        </p>
                                    </AccordionItemPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            G204 – Boardroom - Capacity: 16 people
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <p>
                                            This Board Room is a multi-purpose space primarily used for larger meetings.
                                            Furniture for the room includes tables that can be used in multiple
                                            configurations including a boardroom style set-up, and comfortable, movable,
                                            adjustable chairs. There is a large wall mounted touchscreen, as well as
                                            speakers. The floor is soundproof to ensure there is no sound transfer to
                                            the focus group room below. The room has a wet service counter that includes
                                            a sink and electrical outlets to accommodate food service.
                                        </p>
                                    </AccordionItemPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            G206 - Multipurpose Room – Capacity: 8 people
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <p>
                                            This room is a multi-purpose space primarily used for smaller meetings. Both
                                            a large screen and whiteboard is mounted in the room. The room has modular
                                            furniture - tables and chairs - that can be configured to provide seating
                                            for individuals in small groups.
                                        </p>
                                    </AccordionItemPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            Third Floor<br/>
                                            G303 - Media Production Space - Capacity: 5 people
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <p>
                                            The space is soundproof and is fully equipped with video lighting, cameras
                                            and a green screen.
                                        </p>
                                    </AccordionItemPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            G304 – Boardroom - Capacity: 16 people
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <p>
                                            This Session Room is a multi-purpose space primarily used for larger
                                            meetings. Furniture for the room includes tables that can be used in
                                            multiple configurations including a boardroom style set-up, and comfortable,
                                            movable, adjustable chairs and a podium. A Whiteboard is mounted on the side
                                            wall, and there is a large wall mounted touchscreen. The room has a wet
                                            service counter which includes a sink and electrical outlets to accommodate
                                            food service.
                                        </p>
                                    </AccordionItemPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            G305 - Session Room – Capacity: 8 people (adjoining door)
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <p>
                                            There is an adjoining door linking this room to G304, but this room can be
                                            booked separately. A Whiteboard is mounted on the side wall, and there is a
                                            large wall-mounted screen. The room has modular furniture - tables and
                                            chairs - that can be configured to provide seating for individuals or small
                                            groups.
                                        </p>
                                    </AccordionItemPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            G306 - Session Room – Capacity: 8 people
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <p>
                                            This room is a multi-purpose space primarily used for smaller meetings. Both
                                            a large screen and whiteboard is mounted in the room. The room has modular
                                            furniture - tables and chairs - that can be configured to provide seating
                                            for individuals in small groups.
                                        </p>
                                    </AccordionItemPanel>
                                </AccordionItem>
                            </Accordion>
                        </div>
                        <Schedule callBackfromParent={this.myCallBack}/>
                        <div className="proceed">
                            <Link to={{
                                pathname: '/Form',
                                query: {
                                    idSlot: this.state.sid,
                                    slotName: this.state.slo,
                                    start: this.state.startTime,
                                    end: this.state.endTime,
                                    slotId: this.state.resid

                                }
                            }}>Proceed</Link>
                            {/* <Link to="/Form">
                        Proceed
            </Link>*/}
                        </div>
                    </div>
                    <div class="secondcontent">
                        <ul>
                            <h3><b>General Booking Rules:</b></h3>
                            <li>All student, alumni, and community requests must be made using the <strong><a
                                href="http://humber.ca1.qualtrics.com/jfe/form/SV_07BZKnqwJqggb4h" target="_blank">CfE
                                Room Booking Request form</a>.</strong></li>
                            <li>Requests from Humber Faculty and Staff are made through the Outlook Calendar. After the
                                request, the Room Booking Form will be emailed to you.
                            </li>
                            <li>Community members and Alumni must complete the <a
                                href="/cfe/sites/default/files/uploads/documents/Temporary%20Use%20of%20Space%20for%20Event%20Application%20Form_FINAL2.pdf"
                                target="_blank"><strong>Temporary Use of Space for Event Application
                                Form</strong></a> to obtain <strong>Permit </strong>(this will be emailed to you upon
                                room booking request).
                            </li>
                            <li>Room bookings are subject to availability.</li>
                            <li>Rooms may be booked up to two weeks in advance.</li>
                            <li>Same-day requests are not processed. Requests made after <strong>4:00 PM </strong>are
                                considered same-day requests.
                            </li>
                            <li>Rooms may be booked for up to three hours within a 24 hour period.</li>
                            <li>Rooms may not be booked on a consecutive or recurring basis.</li>
                            <li>Room bookings <strong>cannot exceed the seating capacity </strong>of the room due to
                                fire regulations.
                            </li>
                            <li>Audio-visual equipment should not be tampered with. Audio-visual equipment cannot be
                                moved from the room. For all A/V issues contact IT at x8888.
                            </li>
                            <li>If the reserved room is locked, <strong>after staffing hours</strong>, users should
                                contact Campus Security at x8500 to unlock the door. Room Booking Confirmation and ID
                                will be required.
                            </li>
                            <li>Priority will be given to student entrepreneurial and related purposes.</li>
                            <li>Booking requests for purposes unrelated to appropriate entrepreneurship activities may
                                be declined.
                            </li>
                            <li>Rooms <strong>must be left clean</strong> with no damage and users <strong>agree to
                                cover all damages and losses</strong> resulting from room use.
                            </li>
                            <li>There is no custodial service in between bookings.</li>
                            <li>Booking privileges may be revoked for contraventions of these conditions or for a
                                no-show (15 minutes late).
                            </li>
                            <li>Signs and posters are limited to our posting policy; signs may be affixed to displays
                                and tables that are being used for events and functions. Signs/posters/etc. should not
                                be posted on the walls, concrete columns or plant wall glass.
                            </li>
                            <li>Animals are not permitted in the building, with the exception of those on duty providing
                                disability support.
                            </li>
                            <li>Tape should not be used on the floors with the exception of Gaffer tape which may be
                                used for securing equipment wiring.
                            </li>
                        </ul>
                    </div>
                </div>
                {backdrop}
            </div>
        );
    }
}

export default HeaderControl;