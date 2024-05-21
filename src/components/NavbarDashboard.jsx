import axios from "axios";
import React, { useEffect, useState } from "react";

const NavbarDashboard = () => {
  const [data, setData] = useState({});

  const fetchData = async () => {
    await axios
      .post("http://localhost:3000/userRoutes/userdata", {
        email: localStorage.getItem("email"),
      })
      .then((res) => {
        setData(res.data);
      });
  };

  useEffect(() => {
    setInterval(() => {
      fetchData();
    }, 1000);
  }, []);
  return (
    <div className="w-full flex items-center justify-between  shadow-sm	 shadow-[#dddada]   relative bg-white py-4 px-4 h-[10vh]">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 21 21"
          className="text-4xl text-black"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 6.5h12m-12.002 4h11.997M4.5 14.5h11.995"
          />
        </svg>
      </div>
      <div>
        <p className="text-3xl  pl-2 font-semibold bg-gradient-to-r from-[#32C5C5] via-[#32C5C5] to-[#436FE2] inline-block text-transparent bg-clip-text">
          CanVas
        </p>
      </div>
      <div className="flex items-center justify-center gap-3">
        <div>
          <h1>
            <h1 className="text-base ">{data.name}</h1>
          </h1>
        </div>
        <div>
          <img src={data.photo} className="w-12	h-12 rounded-full		" />
        </div>
      </div>
    </div>
  );
};

export default NavbarDashboard;
