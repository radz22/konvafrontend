import React from "react";

const Shapes = ({ triangle, rectangle, circle, star }) => {
  return (
    <div className="w-full flex items-center justify-center  flex-col mt-2">
      <img
        className="h-16	w-16	 	 rounded-xl	"
        src="https://kanbaaaa.onrender.com/assets/box-Bd52LiZT.png"
        onClick={rectangle}
      />
      <img
        className="h-16	w-16	 	 rounded-xl	"
        src="https://kanbaaaa.onrender.com/assets/circle-DVzrxc9V.png"
        onClick={circle}
      />

      <img
        className="h-16	w-16	 	 rounded-xl	"
        src="https://kanbaaaa.onrender.com/assets/s-D_uXD6t9.png"
        onClick={star}
      />

      <img
        className="h-16	w-16	 	 rounded-xl	"
        src="https://kanbaaaa.onrender.com/assets/tri-xX7Hk5eR.png"
        onClick={triangle}
      />
    </div>
  );
};

export default Shapes;
