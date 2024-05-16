import axios from "axios";
import React, { useEffect, useState } from "react";

const Navbar = ({ clickButton }) => {
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
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
  const login = localStorage.getItem("login");
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleSignout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("login");
    window.location.reload();
  };
  return (
    <div className="fixed w-full  z-[100]">
      <div className="w-full flex items-center justify-between  shadow-lg shadow-[#dddada]   relative bg-white">
        <div className="flex gap-10 items-center justify-center py-3 px-3">
          <div>
            <p className="text-3xl  pl-2 font-semibold bg-gradient-to-r from-[#32C5C5] via-[#32C5C5] to-[#436FE2] inline-block text-transparent bg-clip-text">
              Can<span className="font-bold">Vas</span>
            </p>
          </div>
          <div>
            <p className="text-lg text-[#626262]"> Features</p>
          </div>

          <div>
            <p className="text-lg text-[#626262]">Sample Design</p>
          </div>
          <div>
            <p className="text-lg text-[#626262]">Contact</p>
          </div>
        </div>
        <div className="py-4 px-3">
          {login == "true" ? (
            <div className="relative group">
              <img
                src={data.photo}
                className="w-16	h-16	rounded-full	"
                onClick={handleOpen}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full	">
                <p
                  className="text-white text-xs	 text-center cursor-pointer	"
                  onClick={handleOpen}
                >
                  {data.name}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-5">
              <button
                className="bg-[#D4D3D7] text-[#525252] p-2 px-5 rounded-md max-md:text-[.8rem] max-md:p-1 max-md:px-2"
                onClick={clickButton}
              >
                Register
              </button>
              <button
                className="bg-[#8239FD] text-white p-2 px-5 rounded-md max-md:text-[.8rem] max-md:p-1 max-md:px-2"
                onClick={clickButton}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="absolute z-50 right-5 mt-1 ">
        {open && (
          <div className="w-full	bg-[#fff] h-auto shadow-lg shadow-[#d2d0d0]   ">
            <div className="flex items-center justify-center  gap-5 py-4 px-7">
              <div>
                <img src={data.photo} className="w-20	h-20	rounded-full	" />
              </div>
              <div>
                <h1 className="font-bold text-base	">{data.name}</h1>
                <h1 className="text-sm	text-[#525252]">{data.email}</h1>
              </div>
            </div>
            <div className="border-b-[1px] border-[#838383]"></div>
            <div className="mt-5 ">
              <div>
                <p
                  className="hover:w-full hover:bg-[#ececec] px-5 py-3 cursor-pointer"
                  onClick={handleSignout}
                >
                  Sign out
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
