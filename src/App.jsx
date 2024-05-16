import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import { TEModal, TEModalDialog, TEModalContent } from "tw-elements-react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
const App = () => {
  const [showVerticalyCenteredModal, setShowVerticalyCenteredModal] =
    useState(false);

  const handleSuccess = (credentialResponse) => {
    const decode = jwtDecode(credentialResponse.credential);

    if (decode) {
      axios
        .post("http://localhost:3000/userRoutes/google", {
          email: decode.email,
          photo: decode.picture,
          name: decode.name,
        })
        .then((res) => {
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("login", res.data.login);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleShow = () => {
    setShowVerticalyCenteredModal(!false);
  };

  // const handleSignup = () => {
  //   axios.post("http://localhost:3000/userRoutes/signin" , {
  //     email: details.email
  //   })
  // };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home button={handleShow} />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>

      <div>
        {/* <!--Verically centered modal--> */}
        <TEModal
          show={showVerticalyCenteredModal}
          setShow={setShowVerticalyCenteredModal}
        >
          <TEModalDialog centered size="xl">
            <TEModalContent className="w-full 	">
              <div className="w-full flex  justify-center">
                <div className="w-2/4 px-5 py-5">
                  <div className="flex items-end justify-end">
                    <button
                      type="button"
                      className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                      onClick={() => setShowVerticalyCenteredModal(false)}
                      aria-label="Close"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <div>
                    <h1 className="text-2xl font-semibold mt-2">
                      Welcome Back
                    </h1>
                    <p className="mt-4 text-lg text-[#525252]">
                      Last time you used Google to log in.
                    </p>
                  </div>
                  <div className="w-full flex items-center justify-center mt-5">
                    <GoogleLogin
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onSuccess={handleSuccess}
                    />
                  </div>
                  <div>
                    <p className="text-sm	text-center	mt-6  text-[#525252]	w-full">
                      By continuing, you agree to Canva’s{" "}
                      <span className="border-b-[1px] border-[#000]">
                        Terms of Use
                      </span>
                      . Read
                    </p>
                    <p className="text-sm	text-center	  text-[#525252]	 mt-2 w-full">
                      our
                      <span className="border-b-[1px] border-[#000] ml-1">
                        Privacy Policy
                      </span>
                    </p>
                  </div>
                </div>
                <div className="w-2/4	">
                  <img
                    src="https://static.canva.com/authenticating/auth_dialog/auth_dialog_en.jpg"
                    className="h-[400px] w-full	"
                  />
                </div>
              </div>
            </TEModalContent>
          </TEModalDialog>
        </TEModal>
      </div>
    </div>
  );
};

export default App;
