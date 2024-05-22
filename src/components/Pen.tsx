import React from "react";

const Pen = ({
  penId,
  handleSelect,
  resetSelect,
  setUsePen,
  setTool,
  handleChangeColorPen,
  penColor,
}) => {
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
            setUsePen("pencil");
            setTool("pen");
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
            setUsePen("pentel");
            setTool("pen");
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
            setUsePen("ballpen");
            setTool("pen");
          }}
          onDoubleClick={() => resetSelect(3)}
        />
      </div>

      <div className="">
        <input
          type="color"
          value={penColor}
          onChange={handleChangeColorPen}
          className="w-10  outline-none h-10 mt-1"
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
            setTool("eraser");
            setUsePen("eraser");
          }}
          onDoubleClick={() => resetSelect(4)}
        />
      </div>
    </div>
  );
};

export default Pen;
