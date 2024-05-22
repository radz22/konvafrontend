import React from "react";

const SideBartext = ({
  addtextbox,
  addHeading,
  addSubHeading,
  addLittleBitBody,
  handleTimeNewRoman,
  handleMonospace,
  handleCursive,
  handleFantasy,
}) => {
  return (
    <div className="w-full px-2 py-4">
      <div onClick={addtextbox}>
        <button className="bg-[#8239FD] text-white w-full rounded-md p-2 mb-2">
          Add text box{" "}
        </button>
      </div>

      <div onClick={addHeading}>
        <button className="bg-[#525252] text-start text-white w-full text-xl p-2 mb-2">
          Add a Heading{" "}
        </button>
      </div>

      <div onClick={addSubHeading}>
        <button className="bg-[#525252] text-start text-white w-full text-base p-2 mb-2">
          Sub a Heading{" "}
        </button>
      </div>

      <div onClick={addLittleBitBody}>
        <button className="bg-[#525252] text-start text-white w-full text-sm p-2 mb-2">
          add a little bit body text
        </button>
      </div>

      <div>
        <h1 className="text-xl text-white mt-3 font-semibold">Font Designs</h1>
      </div>
      <div className="flex items-center justify-center mt-5 gap-2 flex-col">
        <div>
          <button
            className="text-base text-white mt-3 font-semibold"
            onClick={handleTimeNewRoman}
          >
            Times New Roman
          </button>
        </div>

        <div>
          <button
            className="text-base text-white mt-3 font-semibold"
            onClick={handleMonospace}
          >
            Monospace
          </button>
        </div>

        <div>
          <button
            className="text-base text-white mt-3 font-semibold"
            onClick={handleCursive}
          >
            Cursive
          </button>
        </div>

        <div>
          <button
            className="text-base text-white mt-3 font-semibold"
            onClick={handleFantasy}
          >
            Fantasy
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBartext;
