// @ts-nocheck
import React from "react";
import Image from "next/image";
import veterinary from "./veterinary.json";

export default function AppointmentView({
  event,
  onCancelEvent,
  onScheduleEvent,
  setToastOpen,
}) {
  const clinic = veterinary[event?.clinicValue || 0];
  return (
    <div className="w-full h-full flex flex-col p-2 items-center">
      <div className="w-full border-b-2 pb-4 border-gray-200 h-[100px] flex justify-between items-center">
        <div className="h-[80px] w-[80px] flex justify-center">
          <Image
            src={`/images/client.png`}
            height={80}
            width={80}
            alt="client"
            priority={true}
          />
        </div>
        <div className="w-[150px] pl-[15px]">
          <div className="text-[18px]">{event.owner || "Anonymous"}</div>
          <div className="text-[14px] text-gray-500">Client</div>
        </div>
        <div className="h-[20px]">
          <Image
            src={`/images/three-dots.svg`}
            height={20}
            width={20}
            alt="dots"
            priority={true}
          />
        </div>
      </div>

      <div className="w-full py-2 border-b-2 border-gray-200 flex flex-col gap-[5px]">
        <div className="text-[14px] text-gray-500">CONTACT INFORMATION</div>
        <div className="flex">
          <div className="h-[20px] w-[20px] mr-2 mt-[2px]">
            <Image
              src={`/images/email.svg`}
              height={20}
              width={20}
              alt="email"
              priority={true}
            />
          </div>
          <div className="text-[16px] text-gray-500 w-[50px]">Email</div>
          <div className="text-[16px] text-primary ml-[10px]">
            chrissielee@gmail.com
          </div>
        </div>
        <div className="flex">
          <div className="h-[20px] w-[20px] mr-2 mt-[2px]">
            <Image
              src={`/images/phone.svg`}
              height={20}
              width={20}
              alt="phone"
              priority={true}
            />
          </div>
          <div className="text-[16px] text-gray-500 w-[50px]">Phone</div>
          <div className="text-[16px] text-primary ml-[10px]">
            +01 234 567 8910
          </div>
        </div>
        <div className="flex">
          <div className="h-[20px] w-[20px] mr-2 mt-[2px]">
            <Image
              src={`/images/address.svg`}
              height={20}
              width={20}
              alt="address"
              priority={true}
            />
          </div>
          <div className="text-[16px] text-gray-500">Address</div>
          <div className="text-[16px] text-primary w-[200px] ml-[10px]">
            1st Avenue, Golden Street, Springville Village, San Diego,
            California
          </div>
        </div>
      </div>

      <div className="w-full text-[14px] py-2 border-b-2 border-gray-200 flex flex-col gap-[5px]">
        <div className="text-gray-500">CLINIC DETAILS</div>
        <div className="w-full h-[80px] flex items-center">
          <div className="h-[60px] w-[60px] flex justify-center">
            <Image
              src={`/images/clinic.png`}
              height={60}
              width={60}
              alt="clinic"
              priority={true}
            />
          </div>
          <div className="w-[150px] pl-[15px]">
            <div className="text-[18px]">{clinic.veterinary_name}</div>
            <div className="text-[14px] text-gray-500">{clinic.building}</div>
          </div>
        </div>
        <div className="flex">
          <div className="h-[20px] w-[20px] mr-2 mt-[2px]">
            <Image
              src={`/images/email.svg`}
              height={20}
              width={20}
              alt="email"
              priority={true}
            />
          </div>
          <div className="text-[16px] text-gray-500 w-[50px]">Email</div>
          <div className="text-[16px] text-primary ml-[10px]">
            branch1@gmail.com
          </div>
        </div>
        <div className="flex">
          <div className="h-[20px] w-[20px] mr-2 mt-[2px]">
            <Image
              src={`/images/phone.svg`}
              height={20}
              width={20}
              alt="phone"
              priority={true}
            />
          </div>
          <div className="text-[16px] text-gray-500 w-[50px]">Phone</div>
          <div className="text-[16px] text-primary ml-[10px]">
            {clinic.contact_number}
          </div>
        </div>
        <div className="flex">
          <div className="h-[20px] w-[20px] mr-2 mt-[2px]">
            <Image
              src={`/images/address.svg`}
              height={20}
              width={20}
              alt="address"
              priority={true}
            />
          </div>
          <div className="text-[16px] text-gray-500">Address</div>
          <div className="text-[16px] text-primary w-[200px] ml-[10px]">
            {clinic.building}, {clinic.address}{" "}
          </div>
        </div>
      </div>

      <div className="w-full py-2 border-b-2 border-gray-200 flex flex-col gap-[5px]">
        <div className="text-[14px] text-gray-500">PET DETAILS</div>
        <div className="w-full h-[80px] flex items-center">
          <div className="h-[60px] w-[60px] flex justify-center">
            <Image
              src={`/images/pet.png`}
              height={60}
              width={60}
              alt="clinic"
              priority={true}
            />
          </div>
          <div className="w-[150px] pl-[15px]">
            <div className="text-[20px]">
              {event.petName || "Anonymous Pet"}
            </div>
            <div className="text-[16px] text-gray-500">
              {event.breed || "NA"}
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="h-[20px] w-[20px] mr-2 mt-[2px]">
              <Image
                src={`/images/breed.svg`}
                height={20}
                width={20}
                alt="breed"
                priority={true}
              />
            </div>
          <div className="text-[16px] text-gray-500 w-[50px]">Breed</div>
          <div className="text-[16px] text-primary ml-[10px]">
            {event.breed || "NA"}
          </div>
        </div>
        <div className="flex">
          <div className="h-[20px] w-[20px] mr-2 mt-[2px]">
            <Image
              src={`/images/sex.svg`}
              height={20}
              width={20}
              alt="sex"
              priority={true}
            />
          </div>
          <div className="text-[16px] text-gray-500 w-[50px]">Sex</div>
          <div className="text-[16px] text-primary ml-[10px]">
            {event.petGender || "NA"}
          </div>
        </div>
        <div className="flex">
          <div className="h-[20px] w-[20px] mr-2 mt-[2px]">
            <Image
              src={`/images/age.svg`}
              height={20}
              width={20}
              alt="age"
              priority={true}
            />
          </div>
          <div className="text-[16px] text-gray-500 w-[50px]">Age</div>
          <div className="text-[16px] text-primary ml-[10px]">
            {event.petAge || "NA"}
          </div>
        </div>
        <div className="flex">
          <div className="h-[20px] w-[20px] mr-2 mt-[2px]">
            <Image
              src={`/images/birthday.svg`}
              height={20}
              width={20}
              alt="birthday"
              priority={true}
            />
          </div>
          <div className="text-[16px] text-gray-500 w-[50px]">Birthday</div>
          <div className="text-[16px] text-primary ml-[10px]">
            {event.petBirth || "NA"}
          </div>
        </div>
      </div>
      <div className="mt-[20px]">
        <button
          onClick={onScheduleEvent}
          className="bg-secondary text-white text-sm  w-full py-2 rounded-lg text-center"
        >
          RESCHEDULE APPOINTMENT
        </button>
        <button
          onClick={onCancelEvent}
          className="bg-gray-100 text-gray-700 text-center text-sm  rounded-lg py-2 text-gray-600 mt-[20px] border-2 w-full"
        >
          CANCEL APPOINTMENT
        </button>
        <button
          onClick={() => setToastOpen(false)}
          className="bg-red-100 text-gray-700 text-center text-sm  rounded-lg py-2 mb-4 text-red-600 mt-[20px] border-2 w-full"
        >
          CLOSE
        </button>
      </div>
    </div>
  );
}
