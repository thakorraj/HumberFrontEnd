import React, {Component} from 'react'
import moment from 'moment'
import 'moment/locale/zh-cn';
import Scheduler, {CellUnits, DATE_FORMAT, DemoData, SchedulerData, ViewTypes} from 'react-big-scheduler'
import 'react-big-scheduler/lib/css/style.css'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import axios from 'axios';

var idslot = "";
let schedulerData;

class Schedule extends Component {
    constructor(props) {
        super(props);


        schedulerData = new SchedulerData(moment().format(DATE_FORMAT), ViewTypes.Custom, false, false, {
            headerEnabled: false,
            customCellWidth: 60,
            checkConflict: true,
            schedulerWidth: '870',
            dayStartFrom: 9,
            dayStopTo: 16,
            scrollToSpecialMomentEnabled: true,
            //  scrollToSpecialMomentEnabled: false,
            nonAgendaDayCellHeaderFormat: 'M/D|HH:mm',
            views: [
                //  {viewName: 'Two days', viewType: ViewTypes.Custom, showAgenda: false, isEventPerspective: false},
                // {viewName: 'Two weeks', viewType: ViewTypes.Custom1, showAgenda: false, isEventPerspective: false},
                // {viewName: 'Two months', viewType: ViewTypes.Custom2, showAgenda: false, isEventPerspective: false},
            ],
        }, {
            getCustomDateFunc: this.getCustomDate,
            isNonWorkingTimeFunc: this.isNonWorkingTime
        });

        schedulerData.localeMoment.locale('en');

        this.state = {
            resources: {
                id: '',
                name: ''
            },
            events: {
                _id: '',
                id: 0,
                start: '',
                end: '',
                resourceId: '',
                title: ''
            },
            viewModel: '',
            flag: false
        };

        // let resources = [
        //     {
        //         id: 'r1000',
        //         name: 'Demo',
        //         groupOnly: true,
        //     },
        // ];
        // schedulerData.setResources(resources);
        //
        // let events = [
        //     {
        //         _id: '5e7d32ffc232123bfc8c246b',
        //         id: 0,
        //         start: '2020-04-08 09:00:00',
        //         end: '2020-04-08 09:30:00',
        //         resourceId: 'r1000',
        //         title: 'I am finished',
        //         bgColor: '#D9D9D9',
        //         _v: 0
        //     }
        // ];
        // schedulerData.setEvents(events);

        axios.get('http://localhost:4000/api/room/list/')
            .then(response => {
                this.setState({requests: response.data});
                // console.log(response.data);

                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].Bookable === true) {
                        schedulerData.addResource({id: "r" + i, name: response.data[i].Room_ID});
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });

        axios.get('http://localhost:4000/api/event/list')
            .then(response => {
                //    this.setState({requests: response.data})
                this.setState({events: response.data});
                // console.log(response.data);
                // schedulerData.setEvents(response.data);

                for (let i = 0; i < response.data.length; i++) {
                    schedulerData.addEvent({
                        _id: response.data[i]._id,
                        id: response.data[i].id,
                        start: response.data[i].start,
                        end: response.data[i].end,
                        resourceId: response.data[i].resourceId,
                        title: response.data[i].title
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
// schedulerData.setEvents(events);
        this.state = {
            viewModel: schedulerData,
            requests: []
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({flag: true});
        }, 1000);
    }

    render() {
        const {viewModel} = this.state;
        console.log(viewModel);

        return (
            <div>
                {this.state.flag ?
                    <Scheduler schedulerData={viewModel} prevClick={this.prevClick}
                               nextClick={this.nextClick}
                               onSelectDate={this.onSelectDate} onViewChange={this.onViewChange}
                               eventItemClick={this.eventClicked} viewEventClick={this.ops1} viewEventText='Ops 1'
                               viewEvent2Text='Ops 2' viewEvent2Click={this.ops2}
                               updateEventStart={this.updateEventStart}
                               updateEventEnd={this.updateEventEnd} moveEvent={this.moveEvent} newEvent={this.newEvent}
                               onScrollLeft={this.onScrollLeft} onScrollRight={this.onScrollRight}
                               onScrollTop={this.onScrollTop} onScrollBottom={this.onScrollBottom}
                               slotClickedFunc={this.slotClickedFunc}/>
                    : null}
            </div>
        )
    }

    newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {

        if (window.confirm(`Do you want to book a Room? {Room ID: ${slotName}, Start Time: ${start}, End Time: ${end}}`)) {

            let newFreshId = 0;
            schedulerData.events.forEach((item) => {
                if (item.id >= newFreshId)
                    newFreshId = item.id + 1;
            });

            let newEvent = {
                id: newFreshId,
                title: '',
                start: start,
                end: end,
                resourceId: slotId,
                bgColor: 'red'
            }
            schedulerData.addEvent(newEvent);
            this.setState({
                viewModel: schedulerData
            })

            const eventRequest = {
                id: newFreshId,
                title: '',
                start: start,
                end: end,
                resourceId: slotId,
                bgColor: 'red'

            }

            this.props.callBackfromParent(idslot, slotName, start, end, slotId);
            // axios.post('http://localhost:4000/api/event/add', eventRequest)
            //     .then(res => {
            //         idslot = res.data._id;
            //         console.log(res.data._id)
            //         this.props.callBackfromParent(idslot, slotName, start, end);
            //     }
            //     );


        }
    }

    conflictOccurred = (schedulerData, action, event, type, slotId, slotName, start, end) => {
        alert(`Conflict occurred. {action: ${action}, event: ${event}`);
    };

    getCustomDate = (schedulerData, num, date = undefined) => {
        const {viewType} = schedulerData;
        let selectDate = schedulerData.startDate;
        if (date !== undefined)
            selectDate = date;
        let startDate = num === 0 ? selectDate :
            schedulerData.localeMoment(selectDate).add(2 * num, 'days').format(DATE_FORMAT),
            endDate = schedulerData.localeMoment(startDate).add(14, 'days').format(DATE_FORMAT),
            cellUnit = CellUnits.Hour;
        if (viewType === ViewTypes.Custom1) {
            let monday = schedulerData.localeMoment(selectDate).startOf('week').format(DATE_FORMAT);
            startDate = num === 0 ? monday : schedulerData.localeMoment(monday).add(2 * num, 'weeks').format(DATE_FORMAT);
            endDate = schedulerData.localeMoment(startDate).add(1, 'weeks').endOf('week').format(DATE_FORMAT);
            cellUnit = CellUnits.Day;
        } else if (viewType === ViewTypes.Custom2) {
            let firstDayOfMonth = schedulerData.localeMoment(selectDate).startOf('month').format(DATE_FORMAT);
            startDate = num === 0 ? firstDayOfMonth : schedulerData.localeMoment(firstDayOfMonth).add(2 * num, 'months').format(DATE_FORMAT);
            endDate = schedulerData.localeMoment(startDate).add(1, 'months').endOf('month').format(DATE_FORMAT);
            cellUnit = CellUnits.Day;
        }

        return {
            startDate,
            endDate,
            cellUnit
        };
    };

    isNonWorkingTime = (schedulerData, time) => {
        const {localeMoment} = schedulerData;
        if (schedulerData.cellUnit === CellUnits.Hour) {

            let hour = localeMoment(time).hour();
            if (hour < 9 || hour > 16)
                return true;
        } else {
            let dayOfWeek = localeMoment(time).weekday();
            if (dayOfWeek === 0 || dayOfWeek === 6)
                return true;
        }

        return false;
    };


    prevClick = (schedulerData) => {
        schedulerData.prev();
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    };

    nextClick = (schedulerData) => {
        schedulerData.next();
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    };

    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    };

    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    };

    DiscardEvent = (schedulerData, slotId, start, end, event) => {
        if (window.confirm(`Do you want to delete event? {slotId: ${slotId}, start: ${start}, end: ${end}`)) {

            // let newFreshId = 0;
            // schedulerData.events.forEach((item) => {
            //     if(item.id >= newFreshId)
            //         newFreshId = item.id + 1;
            // });

            // let DiscardEvent = {
            //     id: event.id,
            //     title: 'New event you just created',
            //     start: start,
            //     end: end,
            //     resourceId: slotId,
            //     bgColor: 'white'
            // }
            schedulerData.removeEvent(event);
            this.setState({
                viewModel: schedulerData
            })
            console.log("Event Deleted");
        }
    }


    eventClicked = (schedulerData, event) => {
        // alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
        // this.DiscardEvent(schedulerData, event.resourceId, event.start, event.end, event);
        // schedulerData.removeEventById(event.id);
    };

    ops1 = (schedulerData, event) => {
        // alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`);
    };

    ops2 = (schedulerData, event) => {
        // alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`);
    };


    updateEventStart = (schedulerData, event, newStart) => {
        if (alert(`Do you want to adjust the start of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newStart: ${newStart}}`)) {
            schedulerData.updateEventStart(event, newStart);
        }
        this.setState({
            viewModel: schedulerData
        })
    }

    updateEventEnd = (schedulerData, event, newEnd) => {
        if (alert(`Do you want to adjust the end of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newEnd: ${newEnd}}`)) {
            schedulerData.updateEventEnd(event, newEnd);
        }
        this.setState({
            viewModel: schedulerData
        })
    }

    // moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
    //     if(alert(`Do you want to move the event? {eventId: ${event.id}, eventTitle: ${event.title}, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`)) {
    //         schedulerData.moveEvent(event, slotId, slotName, start, end);
    //         this.setState({
    //             viewModel: schedulerData
    //         })
    //     }
    // }

    // onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
    //     if(schedulerData.ViewTypes === ViewTypes.Day) {
    //         schedulerData.next();
    //         schedulerData.setEvents(DemoData.events);
    //         this.setState({
    //             viewModel: schedulerData
    //         });

    //         schedulerContent.scrollLeft = maxScrollLeft - 10;
    //     }
    // }

    // onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {

    //     if(schedulerData.ViewTypes === ViewTypes.Day) {
    //         schedulerData.prev();
    //         schedulerData.setEvents(DemoData.events);
    //         this.setState({
    //             viewModel: schedulerData
    //         });

    //         schedulerContent.scrollLeft = 10;
    //     }
    // }

    // onScrollTop = (schedulerData, schedulerContent, maxScrollTop) => {
    //     console.log('onScrollTop');
    // }

    // onScrollBottom = (schedulerData, schedulerContent, maxScrollTop) => {
    //     console.log('onScrollBottom');
    // }

    toggleExpandFunc = (schedulerData, slotId) => {
        schedulerData.toggleExpandStatus(slotId);
        this.setState({
            viewModel: schedulerData
        });
    }
}

export default DragDropContext(HTML5Backend)(Schedule)