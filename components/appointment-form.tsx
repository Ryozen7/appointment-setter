// @ts-nocheck
import React from "react";
import { Input, Datepicker } from "@mobiscroll/react";
import veterinary from "./veterinary.json";
import Select from "react-select";
import moment from "moment";

export default function AppointmentForm({
  formValues,
  setFormValues,
  saveEvent,
  setToastOpen,
}) {
  const [start, startRef] = React.useState(null);
  const [end, endRef] = React.useState(null);
  const [popupEventDate, setDate] = React.useState([
    formValues.start || null,
    formValues.end || null,
  ]);
  const inputClass = "border-[1.5px] border-gray-400 ml-2 rounded-sm w-full";
  const onChangeValues = (e) => {
    const name = e.target?.name || "clinicValue";
    const value = e.target?.value || e.value;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const onDateChange = (e) => {
    console.log("utc date", {
      start: e.value?.[0]
        ? moment(e.value?.[0])
            .utc()
            .format()
        : null,
      end: e.value?.[1]
        ? moment(e.value?.[1])
            .utc()
            .format()
        : null,
    });
    setDate(e.value);
    setFormValues((prev) => ({
      ...prev,
      start: e.value?.[0],
      end: e.value?.[1],
    }));
  };

  return (
    <div className="w-full h-full flex justify-center p-2">
      <form
        className="flex flex-col gap-[15px] mb-2 font-semibold"
        onSubmit={saveEvent}
      >
        <label className="text-lg font-semibold">
          {" "}
          Clinic Details:
          <Select
            name="clinicValue"
            options={veterinary.map((item, index) => {
              return {
                value: index,
                label: (
                  <div key={index} className={"flex flex-col auto text-sm"}>
                    <div>Veterinary Name: {item.veterinary_name}</div>
                    <div>
                      Address: {item.building}, {item.address}
                    </div>
                    <div>Contact: {item.contact_number}</div>
                  </div>
                ),
              };
            })}
            className="w-full"
            onChange={onChangeValues}
          />
        </label>
        <label className="flex">
          {" "}
          Title:
          <input
            type="text"
            name="title"
            value={formValues.title}
            className={inputClass}
            onChange={onChangeValues}
          />
        </label>
        <Input
          ref={startRef}
          label={<>Start Date</>}
          className="text-primary"
        />
        <Input ref={endRef} label={<>End Date</>} />
        <Datepicker
          select="range"
          controls={["datetime"]}
          touchUi={true}
          startInput={start}
          endInput={end}
          showRangeLabels={false}
          responsive={{
            medium: {
              controls: ["calendar", "time"],
              touchUi: false,
            },
          }}
          onChange={onDateChange}
          value={popupEventDate}
        />
        <label className="flex">
          {" "}
          Owner Name:
          <input
            type="text"
            name="owner"
            className={inputClass}
            value={formValues.owner}
            onChange={onChangeValues}
          />
        </label>
        <div className="flex flex-col gap-[15px] mb-1">
          <div>Pet Information</div>

          <label className="flex">
            Pet Name:
            <input
              type="text"
              name="petName"
              className={inputClass}
              value={formValues.petName}
              onChange={onChangeValues}
            />
          </label>
          <label className="flex">
            Breed:
            <input
              type="text"
              name="breed"
              className={inputClass}
              value={formValues.breed}
              onChange={onChangeValues}
            />
          </label>
          <label className="flex">
            {" "}
            Age:
            <input
              type="text"
              name="petAge"
              className={inputClass}
              value={formValues.petAge}
              onChange={onChangeValues}
            />
          </label>
          <label className="flex">
            {" "}
            Gender:
            <input
              type="text"
              name="petGender"
              className={inputClass}
              value={formValues.petGender}
              onChange={onChangeValues}
            />
          </label>
        </div>
        <label className="flex">
          {" "}
          Consultation:
          <input
            type="text"
            name="consultation"
            className={inputClass}
            value={formValues.consultation}
            onChange={onChangeValues}
          />
        </label>
        <button
          onClick={saveEvent}
          className="bg-secondary text-white text-sm  w-full py-2 rounded-lg text-center"
        >
          Submit
        </button>
        <button
          onClick={() => setToastOpen(false)}
          className="bg-white text-gray-700 text-center text-sm  rounded-lg py-2 mb-[10px] text-gray-600 border-2 w-full"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
