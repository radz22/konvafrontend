import React from "react";

const Pen = ({ penId, handleSelect, resetSelect }) => {
  return (
    <div className="flex items-center justify-center flex-col gap-3">
      <div>
        <img
          src="https://kanbaaaa.onrender.com/assets/pencil-BTlr1FLg.png"
          className={`w-12 h-12 m-auto  hover:scale-125  ${
            penId == 1 ? " scale-125	" : ""
          }`}
          onClick={() => {
            handleSelect(1);
          }}
          onDoubleClick={() => resetSelect(1)}
        />
      </div>

      <div>
        <img
          src="https://kanbaaaa.onrender.com/assets/marker-DJZjjpmU.png"
          className={`w-12 h-12 m-auto  hover:scale-125 ${
            penId == 2 ? "scale-125" : ""
          }`}
          onClick={() => {
            handleSelect(2);
          }}
          onDoubleClick={() => resetSelect(2)}
        />
      </div>

      <div>
        <img
          src="https://kanbaaaa.onrender.com/assets/ballpen-BmHDBuTB.png"
          className={`w-12 h-12 m-auto  hover:scale-125  ${
            penId == 3 ? "scale-125	" : ""
          }`}
          onClick={() => {
            handleSelect(3);
          }}
          onDoubleClick={() => resetSelect(3)}
        />
      </div>

      <div>
        <img
          src="https://kanbaaaa.onrender.com/assets/eraser-C4grhBXJ.png"
          className={`w-12 h-12 m-auto hover:scale-125 ${
            penId == 4 ? "scale-125" : ""
          }`}
          onClick={() => {
            handleSelect(4);
          }}
          onDoubleClick={() => resetSelect(4)}
        />
      </div>
    </div>
  );
};

export default Pen;
