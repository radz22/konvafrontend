import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image as KonvaImage, Transformer } from "react-konva";
import useImage from "use-image";
const UrlImages = ({ image, isSelected, onSelect, onChange }) => {
  const [img] = useImage(image.src);
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <KonvaImage
        image={img}
        x={image.x}
        y={image.y}
        width={image.width}
        height={image.height}
        draggable
        onClick={onSelect}
        ref={shapeRef}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);

          const newWidth = Math.round((node.width() * scaleX) / 20) * 20;
          const newHeight = Math.round((node.height() * scaleY) / 20) * 20;

          onChange({
            ...image,
            x: Math.round(node.x() / 20) * 20,
            y: Math.round(node.y() / 20) * 20,
            width: Math.max(5, newWidth),
            height: Math.max(5, newHeight),
          });
        }}
        onDragEnd={(e) => {
          onChange({
            ...image,
            x: Math.round(e.target.x() / 20) * 20,
            y: Math.round(e.target.y() / 20) * 20,
          });
        }}
      />

      {isSelected && <Transformer ref={trRef} />}
    </>
  );
};

export default UrlImages;
