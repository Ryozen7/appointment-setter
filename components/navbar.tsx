// @ts-nocheck
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import veterinary from "./veterinary.json";
import Link from "next/link";

export default function Navbar() {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const options = useMemo(() => {
    return data.map((item, index) => {
      const clinic = veterinary?.[item?.clinicValue || 0];
      return {
        ...item,
        ...clinic,
      };
    });
  }, [data]);

  useEffect(() => {
    const fetchData = () => {
      const data = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      setLoading(true);
      fetch("/api/appointments", data)
        .then((res) => res.json())
        .then((res) => {
          setLoading(false);
          setData(res.data || []);
        })
        .catch(() => setLoading(false));
    };

    fetchData();
  }, []);
  console.log("data", data, options);

  const handleChange = (e) => {
    e.preventDefault();
    const val = e.target.value;
    setValue(e.target.value);
    const search = options.filter(
      (item) =>
        item.owner?.includes(val) ||
        item.title?.includes(val) ||
        item.petName?.includes(val) ||
        item.petAge?.includes(val) ||
        item.petGender.includes(val) ||
        item.start?.includes(val) ||
        item.end?.includes(val) ||
        item.veterinary_name?.includes(val) ||
        item.address?.includes(val) ||
        item.contact?.includes(val),
    );

    setSearchData(val.length > 1 ? search : []);
  };

  return (
    <div className="h-[116px] w-full flex justify-between items-center p-[40px] gap-[40px] border-b-[1.5px] border-gray-200">
      <div className="w-full border-2 relative">
        <input
          type="text"
          placeholder="Search here"
          className={"pl-2 py-2 w-full"}
          onChange={handleChange}
          value={value}
        />
        {searchData.length > 0 && (
          <div className="absolute h-[150px] p-2 overflow-y-auto z-10 bg-white mt-1  w-full">
            {searchData.map((item, index) => {
              const clinic = veterinary?.[item?.clinicValue || 0];
              return (
                <div
                  key={index}
                  className={
                    "flex flex-col hover:bg-gray-200 py-4 pl-2 text-md border-b-2 border-gray-200"
                  }
                >
                  <Link
                    href={{
                      pathname: "/appointments",
                      query: { id: item._id },
                    }}
                    className={"w-full h-full"}
                    onClick={() => setSearchData([])}
                  >
                    <div>Appointment Title: {item.title}</div>
                    <div>Owner: {item.owner}</div>
                    <div>Veterinary Name: {clinic.veterinary_name}</div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="w-[286px] flex gap-[10px]">
        <button className="flex gap-[10px] justify-center items-center">
          <div className="">
            <Image
              src={`/images/user-photo.png`}
              width={20}
              height={20}
              alt={"user"}
              priority={true}
            />
          </div>
          <span>Jane Dee</span>
        </button>
        <button>
          <Image
            src={`/images/notif-icon.svg`}
            width={36}
            height={36}
            alt={"notif"}
            priority={true}
          />
        </button>
        <button>
          <Image
            src={`/images/settings-icon.svg`}
            width={36}
            height={36}
            alt={"settings"}
            priority={true}
          />
        </button>
        <button>
          <Image
            src={`/images/download-icon.svg`}
            width={36}
            height={36}
            alt={"download"}
            priority={true}
          />
        </button>
      </div>
    </div>
  );
}
