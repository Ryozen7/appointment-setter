import React from "react";
import { Eventcalendar, snackbar, setOptions, Popup, Button, Input, Textarea, Switch, Datepicker, SegmentedGroup, SegmentedItem } from '@mobiscroll/react';
import veterinary from './veterinary.json';
import Select from 'react-select';
import moment from 'moment';

export default function AppointmentForm({ formValues, setFormValues, saveEvent, setToastOpen }) {
  const [start, startRef] = React.useState(null);
  const [end, endRef] = React.useState(null);
  const [popupEventDate, setDate] = React.useState([formValues.start || null, formValues.end || null]);

  const onChangeValues = (e) => {
    const name = e.target?.name || 'clinicValue';
    const value = e.target?.value || e.value;
    setFormValues(prev => ({ ...prev, [name]: value}))
  }

  const onDateChange = e => {
    console.log("utc date", { 
      start: 
        e.value?.[0] ? 
          moment(e.value?.[0]).utc().format()
        : null, 
      end: 
        e.value?.[1] ? 
          moment(e.value?.[1]).utc().format()
        : null,
      })
    setDate(e.value)
    setFormValues(prev => ({ ...prev, start: e.value?.[0], end: e.value?.[1]}))
  }

  return (
    <div className="w-full h-full flex justify-center p-2">
     <form className="flex flex-col gap-[15px] mb-2" onSubmit={saveEvent} >
      <label> Clinic Details:
      <Select name="clinicValue" options={veterinary.map((item, index) => {
        return  {
          value: index,
          label: (<div key={index} className={"flex flex-col auto text-sm"}>
          <div>Veterinary Name: {item.veterinary_name}</div>
          <div>Address: {item.building}, {item.address}</div>
          <div>Contact: {item.contact_number}</div>
          </div>)
        }
      })}  className="w-full" onChange={onChangeValues} />
        
      </label>
      <label> Title:
      <input type="text" name="title" value={formValues.title} onChange={onChangeValues} />
      </label>
      <Input ref={startRef} label="Start Date" className="text-primary" />
      <Input ref={endRef} label="End Date" />
      <Datepicker
        select="range"
        controls={['datetime']}
        touchUi={true}
        startInput={start}
        endInput={end}
        showRangeLabels={false}
        responsive={{
          medium: {
              controls: ['calendar', 'time'],
              touchUi: false
          }
        }}
        onChange={onDateChange}
        value={popupEventDate}
      />
      <label> Owner Name:
      <input type="text" name="owner" value={formValues.owner} onChange={onChangeValues} />
      </label>
      <div className="flex flex-col">
        <span>Pet Information</span>
        
        <label>Pet Name:
          <input type="text" name="petName" value={formValues.petName} onChange={onChangeValues} />
        </label>
        <label>Breed:
          <input type="text" name="breed" value={formValues.breed} onChange={onChangeValues} />
        </label>
        <label> Age:
          <input type="text" name="petAge" value={formValues.petAge} onChange={onChangeValues} />
        </label>
        <label> Gender:
          <input type="text" name="petGender" value={formValues.petGender} onChange={onChangeValues} />
        </label>
        <label> Image:
          <input type="text" name="petImage" value={formValues.petImage} onChange={onChangeValues} />
        </label>
      </div>
      <label> Consultation:
      <input type="text" name="consultation" value={formValues.consultation} onChange={onChangeValues} />
      </label>
      <button onClick={saveEvent} className="bg-secondary text-white text-sm  w-full py-2 rounded-lg text-center">Submit</button>
      <button onClick={() => setToastOpen(false)} className="bg-white text-gray-700 text-center text-sm  rounded-lg py-2 mb-[10px] text-gray-600 border-2 w-full">Cancel</button>
     </form>
    </div>
  )
}