import React from "react";

const DraggbleImages = ({ src, onClick }) => {
  const handleDragStart = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full flex items-center justify-center  flex-col mt-2">
      <img
        className="h-16	w-16	 	 rounded-xl	"
        alt="dragabble-image"
        src={src}
        draggable="true"
        onDragStart={handleDragStart}
        onClick={onClick}
      />
    </div>
  );
};

export default DraggbleImages;
