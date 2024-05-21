import React, { useState, useRef, useEffect } from "react";
import {
  Stage,
  Layer,
  Text,
  Transformer,
  Rect,
  Circle,
  Ellipse,
  RegularPolygon,
  Star,
} from "react-konva";

const AddText = ({ item, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();
  const trRef = useRef();
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleScaleChange = (newScale) => {
    setScale(newScale);
    const newFontSize = Math.max(5, item.fontsize + newScale);
    onChange({
      ...item,
      fontsize: newFontSize,
    });
  };

  return (
    <>
      {item.type === "text" && (
        <Text
          text={item.text} // Use the input value provided from the parent component
          x={item.x}
          y={item.y}
          onTap={onSelect}
          fill={item.fill}
          fontSize={item.fontsize * scale}
          draggable
          onClick={onSelect}
          ref={shapeRef}
          onTransform={(e) => {
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            handleScaleChange(Math.max(scaleX, scaleY));
          }}
          onTransformEnd={(e) => {
            const node = shapeRef.current;

            onChange({
              ...item,
              x: node.x(),
              y: node.y(),
              width: Math.max(5, Math.round(node.width() * scale)),
              height: Math.max(5, Math.round(node.height() * scale)),
            });
          }}
          onDragEnd={(e) => {
            onChange({
              ...item,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
        />
      )}
      {item.type === "rectangle" && (
        <Rect
          x={item.x}
          y={item.y}
          width={item.width}
          height={item.height}
          fill={item.fill}
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
              ...item,
              x: Math.round(node.x() / 20) * 20,
              y: Math.round(node.y() / 20) * 20,
              width: Math.max(5, newWidth),
              height: Math.max(5, newHeight),
            });
          }}
          onDragEnd={(e) => {
            onChange({
              ...item,
              x: Math.round(e.target.x() / 20) * 20,
              y: Math.round(e.target.y() / 20) * 20,
            });
          }}
        />
      )}

      {item.type === "circle" && (
        <Circle
          x={item.x}
          y={item.y}
          radius={item.radius}
          fill={item.fill}
          draggable
          onClick={onSelect}
          ref={shapeRef}
          onTransform={(e) => {
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
          }}
          onTransformEnd={(e) => {
            const node = shapeRef.current;

            onChange({
              ...item,
              x: node.x(),
              y: node.y(),
              width: Math.max(5, Math.round(node.width() * scale)),
              height: Math.max(5, Math.round(node.height() * scale)),
            });
          }}
          onDragEnd={(e) => {
            onChange({
              ...item,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
        />
      )}

      {item.type === "star" && (
        <Star
          x={item.x}
          y={item.y}
          numPoints={item.numPoints}
          innerRadius={item.innerRadius}
          outerRadius={item.outerRadius}
          fill={item.fill}
          draggable
          onClick={onSelect}
          ref={shapeRef}
          onTransform={(e) => {
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
          }}
          onTransformEnd={(e) => {
            const node = shapeRef.current;

            onChange({
              ...item,
              x: node.x(),
              y: node.y(),
              width: Math.max(5, Math.round(node.width() * scale)),
              height: Math.max(5, Math.round(node.height() * scale)),
            });
          }}
          onDragEnd={(e) => {
            onChange({
              ...item,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
        />
      )}

      {item.type === "triangle" && (
        <RegularPolygon
          x={item.x}
          y={item.y}
          sides={item.sides}
          radius={item.radius}
          fill={item.fill}
          draggable
          onClick={onSelect}
          ref={shapeRef}
          onTransform={(e) => {
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
          }}
          onTransformEnd={(e) => {
            const node = shapeRef.current;

            onChange({
              ...item,
              x: node.x(),
              y: node.y(),
              width: Math.max(5, Math.round(node.width() * scale)),
              height: Math.max(5, Math.round(node.height() * scale)),
            });
          }}
          onDragEnd={(e) => {
            onChange({
              ...item,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
        />
      )}
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default AddText;
