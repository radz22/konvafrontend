import { useEffect, useState } from "react";
import Carousel from "./Carousel";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Home = ({ button }) => {
  const [login, setLogin] = useState("");
  const navigate = useNavigate();
  const gotoDashBoard = () => {
    navigate("/dashboard");
  };
  // Function to retrieve the value from localStorage
  useEffect(() => {
    const retrievedValue = localStorage.getItem("login");
    if (retrievedValue) {
      setLogin(retrievedValue);
    }
  }, []);

  return (
    <div className="w-full h-screen   overflow-x-hidden ">
      <div>
        <Navbar clickButton={button} />
      </div>

      <div className="flex items-center justify-center flex-col mt-36 ">
        <div>
          <h1 className="text-[4rem] leading-[5.5rem] max-lg:text-[3rem] font-semibold">
            What will you{" "}
            <span className="bg-gradient-to-r from-[#32C5C5] via-[#32C5C5] to-[#436FE2] inline-block text-transparent bg-clip-text">
              design
            </span>{" "}
            today?
          </h1>
        </div>

        <div className="mt-10">
          <div>
            <p className="text-lg text-[#525252]">
              CanVas makes it easy to create professional designs and to share
              or print them.
            </p>
          </div>
          <div className="text-center mt-10">
            <button
              className="bg-[#8239FD] text-white p-2 px-5 rounded-md max-md:text-[.8rem] max-md:p-1 max-md:px-2"
              onClick={login == "true" ? gotoDashBoard : button}
            >
              Start Designing
            </button>
          </div>
        </div>

        <div className="mt-16 w-3/4				">
          <Carousel />
        </div>
      </div>

      <div className="flex items-center justify-center w-full mt-20 px-10 gap-10 ">
        <div className="w-2/4">
          <img src="https://content-management-files.canva.com/42b77064-d8df-47dd-8497-c68b99c8b8bc/benefits-print-en-1260x884.jpg" />
        </div>
        <div className="w-2/4	">
          <div>
            <h1 className="text-2xl font-semibold">
              Design and print in one place
            </h1>
          </div>
          <div className="mt-4">
            <p className="text-[#525252]">
              Turn your memories into photo albums, your designs into T-shirts,
              and your branding into business cards⁠(opens in a new tab or
              window), flyers⁠(opens in a new tab or window) or invites⁠(opens
              in a new tab or window). Get all your printing done right here
              with free delivery to your doorstep.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full mt-20 px-10 gap-10 ">
        <div className="w-2/4	">
          <div>
            <h1 className="text-2xl font-semibold">Design with others</h1>
          </div>
          <div className="mt-4">
            <p className="text-[#525252]">
              Invite friends and family to design with you, or set your whole
              team up to work together. Our collaboration features let you
              comment and work in real-time on Presentations⁠(opens in a new tab
              or window), Whiteboards⁠(opens in a new tab or window),
              Docs⁠(opens in a new tab or window), Videos⁠(opens in a new tab or
              window), or that birthday party planning.
            </p>
          </div>
        </div>
        <div className="w-2/4">
          <img src="https://content-management-files.canva.com/9d06b475-0ad3-4f01-a613-5a74b14c7279/benefits-together-en-1260x884.jpg" />
        </div>
      </div>
    </div>
  );
};

export default Home;
