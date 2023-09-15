// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Page, snackbar, Eventcalendar, getJson, Toast, CalendarNav, Button, CalendarToday, SegmentedGroup, SegmentedItem } from '@mobiscroll/react';
import AppointmentView from "../../components/appointment-view";
import AppointmentForm from "../../components/appointment-form";
import moment from 'moment';
import Image from 'next/image';
import {useRouter} from 'next/router';

const colors = ['#ffeb3c', '#ff9900', '#f44437', '#ea1e63', '#9c26b0', '#3f51b5', '', '#009788', '#4baf4f', '#7e5d4e'];
const initialValues = {
  breed: "", 
  clinicValue: null, 
  color : null, 
  description : "",
  end : null,
  id: null,
  owner: "",
  petAge: "",
  petGender : "",
  petName: "",
  start: null,
  title: ""
}
export default function Appointments() {
 const today = moment(new Date()).format('MMM DD, yyyy');
  const [data, setData] = useState([]);
  const [tempEvent, setTempEvent] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [isToastOpen, setToastOpen] = React.useState(false);
  const [eventData, setEventData] = useState({});
  const [viewType, setViewType] = useState('day');
  const [actionType, setActionType] = useState('view');
  const [formValues, setFormValues] = useState({});
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const router = useRouter();
  console.log("router", router)

  useEffect(() => {
    if (router.query?.id && data.some(item => item?._id === router.query.id)) {
      const findQuery = data.find(item => item?._id === router.query.id)
      setEventData(findQuery)
      setActionType('view');
      setToastOpen(true);
    }
  }, [router, data])
  const view = React.useMemo(() => {
        return {
            schedule: { type: viewType, allDay: false }
        };
  }, [viewType]);
  
  const onEventClick = React.useCallback((event) => {
      setEventData(event?.event);
      setActionType('view')
      if (event?.event?.id === eventData.id) {
        setToastOpen(v => !v);
      } else setToastOpen(v => true);
  }, [eventData]);

  useEffect(() => {
    const fetchData = () => {
        const data = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
        setLoading(true);
        fetch("/api/appointments", data)
        .then(res => res.json())
        .then(res => { 
          setLoading(false);
          setData(res.data ||  [])
        })
        .catch(() => setLoading(false));
    }

    fetchData();
  }, [])

  const createEventApi = (values) => {
        const data = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        }
        setLoading(true);
        fetch("/api/appointments", data)
        .then(res => res.json())
        .then(res => { 
          setLoading(false);
          setData(res.data?.map(item => ({...item, start: item.start ? moment(item.start).local().format() : "2023-09-14T07:00:00.000Z", end: item.end? moment(item.end).local().format() : "2023-09-14T09:00:00.000Z"})) ||  [])
        })
        .catch(() => setLoading(false));
  }


  const deleteEventApi = (values) => {
    console.log("values", values)
        const data = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        }
        setLoading(true);
        fetch("/api/appointments", data)
        .then(res => res.json())
        .then(res => { 
          setLoading(false);
          console.log("res", res)
        })
        .catch(() => setLoading(false));
  }

  const updateEventApi = (values) => {
    console.log("values", values)
        const data = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        }
        setLoading(true);
        fetch("/api/appointments", data)
        .then(res => res.json())
        .then(res => { 
          setLoading(false);
          console.log("res", res)
        })
        .catch(() => setLoading(false));
  }

  const saveEvent = React.useCallback(() => {
        const random = Math.floor(Math.random() * colors.length);
        const randomId = Math.floor(Math.random() * 99999999);
        const newEvent = {
            ...formValues,
            id : tempEvent.id || `${randomId}`,
            title: formValues.title || '',
            description: formValues?.description || formValues?.owner,
            start: formValues?.start || "2023-09-14T07:00:00.000Z",
            end: formValues?.end || "2023-09-14T09:00:00.000Z",
            color: formValues?.color || colors[random] || '#fff',
        };
        if (actionType === 'edit') {
            // update the event in the list
            const index = data.findIndex(x => x._id === tempEvent._id);
            const newEventList = [...data];

            newEventList.splice(index, 1, newEvent);
            setData(newEventList);
            updateEventApi(newEvent)
            // here you can update the event in your storage as well
            // ...
        } else {
            // add the new event to the list
            setData([...data, newEvent]);
            createEventApi(newEvent);
            
            // here you can add the event to your storage as well
            // ...
        }
        // close the popup
        setToastOpen(false);
    }, [actionType, data, tempEvent, formValues]);

  const onEventCreated = React.useCallback((args) => {
        console.log("event args", args)
        setTempEvent(args.event);
        setActionType('add');
        setToastOpen(true);
    }, []);

    const deleteEvent = React.useCallback((event) => {
        setData(data.filter(item => item._id !== event._id));

        deleteEventApi(event);
        setTimeout(() => {
            snackbar({
                button: {
                    action: () => {
                        setData(prevEvents => [...prevEvents, event]);
                    },
                    text: 'Undo'
                },
                message: 'Event cancelled'
            });
        });
    }, [data]);
    const onEventDeleted = React.useCallback((args) => {
        deleteEvent(args.event)
    }, [deleteEvent]);

    

    const onEventUpdated = React.useCallback((args) => {
        // here you can update the event in your storage as well, after drag & drop or resize
        // ...
    }, []);

    const getNextDay = React.useCallback((d, prev) => {
 
        const diff = d.getDate() + (prev ? -1 : 1);
        return new Date(d.setDate(diff));
    }, []);

     const changeView = React.useCallback((event) => {
        switch (event.target.value) {
            case 'month':
                setViewType('month');
                break;
            case 'day':
                setViewType('day')
                break;
        }

    }, [viewType]);

    const navigatePage = React.useCallback((prev) => {
        if (viewType == 'month') {
            const prevNextPage = new Date(currentDate.getFullYear(), currentDate.getMonth() + (prev ? -1 : 1), 1);
            setCurrentDate(prevNextPage);
        } else {
            const prevNextDay = getNextDay(currentDate, prev);
            setCurrentDate(prevNextDay);
        }
    }, [viewType, currentDate, setCurrentDate, getNextDay]);

    const onSelectedDateChange = React.useCallback((event) => {
        setCurrentDate(event.date);
    }, [setCurrentDate]);
    
    const customWithNavButtons = () => {
        return <div className="w-full flex justify-between">
            <div>
                <div className="flex">
                    <CalendarNav className="md-custom-header-nav text-primary" />
                    <Button onClick={() => navigatePage(true)} icon="material-arrow-back" variant="rounded" className="md-custom-header-button"></Button>
                    <Button onClick={() => navigatePage(false)} icon="material-arrow-forward" variant="rounded" className="md-custom-header-button"></Button>
                </div>
            
                <div className="md-custom-header-controls ml-4 -mt-1 flex text-center  items-center">
                    <CalendarToday className="md-custom-header-today bg-transparent" /> 
                    <span className="ml-2">is {today}</span>
                </div>
            </div>
           
            <div className="md-custom-header-view">
                <SegmentedGroup value={viewType} onChange={changeView}>
                    <SegmentedItem value="day" icon="material-list" />
                    <SegmentedItem value="month" icon="calendar" />
                </SegmentedGroup>
            </div>

            <div className="flex">
                <Button 
                onClick={() => {setToastOpen(true); setActionType('add'); setFormValues(initialValues)}} 
                variant="rounded" 
                className="md-custom-header-button bg-secondary h-[40px] rounded-lg text-white"
                > 
                    New Appointment 
                </Button>
            </div>
        </div>;
    }

    const renderScheduleEvent = React.useCallback((data) => {
        const dayType = viewType === 'day';

        if(data.isMultiDay) {
           return <div style={{background:data.original.color, color:'#000'}} className="multi-day-event">{data.original.title}</div>
        }
        else {
            return <div className={`pl-2 h-full overflow-hidden relative`}>
                <div className="absolute left-[20px] h-full w-full rounded-lg border-2 opacity-30 hover:opacity-50 -ml-2" style={{background:data.original.color}}></div>
                <div className="single-day-event-dot " style={{background:data.original.color}}></div>
                <div aria-hidden={true}>
                  <div className="single-day-event pt-1 pl-3 font-medium" style={{color:'#000'}}>{data.original.title}</div>
                <div className="single-day-event flex pl-3" style={{color:'#000'}}>
                  <div className="">
                  {data.start}
                  </div>
                  <div>{data.end}</div>
                </div>
                {dayType && (
                   <div className="single-day-event flex pl-3" style={{color:'#000'}}>
                  <div className="h-[20px] w-[20px] mr-3">
                  <Image
                    src={`/images/client.png`}
                    height={20}
                    width={20}
                    alt="client"
                    priority={true}
                  />
                  </div>
                  <div>{data.original.owner}</div>
                </div>
                )}
                </div>
            </div>
        }
      });

    const onCancelEvent = () => {
      deleteEvent(eventData)
      setToastOpen(false);
    }

    const onScheduleEvent = () => {
      setActionType("edit");
      setTempEvent(eventData);
      setFormValues(eventData);
      setToastOpen(true);
    }

  return (
    <div className={`w-full flex h-full`}>
      <div className={`w-full m-[20px] overflow-x-auto ${isToastOpen ?  'customWrap' : 'appointmentWrap'}`}>
        <Eventcalendar
          theme="ios" 
          themeVariant="light"
          clickToCreate={"double"}
          dragToCreate={false}
          dragToMove= {true}
          dragToResize={false}
          eventDelete={false}
          data={data}
          view={view}
          className="md-custom-header"
          onSelectedDateChange={onSelectedDateChange}
          selectedDate={currentDate}
          renderHeader={customWithNavButtons}
          renderScheduleEvent={renderScheduleEvent}
          onEventClick={onEventClick}
          onEventCreated={onEventCreated}
          onEventDeleted={onEventDeleted}
          onEventUpdated={onEventUpdated}
        />
      </div>
      

      {isToastOpen && (
        <div className={`w-[240px] overflow-y-auto`}>
          {actionType === 'view' ?
            <AppointmentView 
            event={eventData} 
            onCancelEvent={onCancelEvent} 
            onScheduleEvent={onScheduleEvent}
            setToastOpen={setToastOpen}
          />
          : 
            <AppointmentForm 
              formValues={formValues} 
              setFormValues={setFormValues} 
              saveEvent={saveEvent}
              setToastOpen={setToastOpen}
            />
          } 
        </div>
      )}
    </div>
  )
}