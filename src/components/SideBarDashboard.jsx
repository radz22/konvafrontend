import React, { useState, useRef, useEffect } from "react";
import TableDashboard from "./TableDashboard";
import { Stage, Layer, Image as KonvaImage, Transformer } from "react-konva";
import useImage from "use-image";

const URLImage = ({ image, isSelected, onSelect, onChange }) => {
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

const DraggableImage = ({ src, onClick }) => {
  const handleDragStart = (e) => {
    // Prevent default drag behavior
    e.preventDefault();
  };

  return (
    <div className="w-full flex items-center justify-center  flex-col mt-2">
      <img
        className="h-32	w-32	 	 rounded-xl	"
        alt="dragabble-image"
        src={src}
        draggable="true"
        onDragStart={handleDragStart}
        onClick={onClick}
      />
    </div>
  );
};

const SideBarDashboard = () => {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(1);
  const [selectedId, setSelectedId] = useState(null);

  const handleOpen = () => {
    setOpen(!open);
  };

  const stageRef = React.useRef();
  const [images, setImages] = React.useState([]);

  const handleClick = (src) => {
    // Get the click position relative to the stage
    const position = stageRef.current.getPointerPosition();
    setCount(count + 1);

    // Add the image to the beginning of the images array
    setImages([{ id: count, x: 300, y: 300, src }, ...images]);
  };
  const handleSelect = (id) => {
    setSelectedId(id);
  };

  const handleChange = (newAttrs, id) => {
    const newImages = images.slice();
    newImages[id] = newAttrs;
    setImages(newImages);
  };

  return (
    <div className="relative">
      <div className="flex items-center ">
        <div className="w-[8%] ">
          <div className="	px-3 py-3  bg-[#525252]  h-screen flex items-center  flex-col ">
            <div className="mt-10" onClick={handleOpen}>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA+CAYAAAB3NHh5AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANfSURBVHgB7ZqBdeIwDEDFvQ7ABmcmODrBhQmODegGpROQDa4b0A2OmwCYoO0E4SYoG+gkkrQpRIrjOMZ9L/89Pd4zjiUhYsuyR0hAIEYEOEAmjuljQTIlSUjGhTAvJAeSDcmeVByaBgsGODhKsiJ5a6FmTWK0QYMBLaDuc2znaJWMZAFfxWHMo+qDVfQOoz9nSz45PbI1xAdNkxaZMqePP+CfGanenWxQHJ6BO9u6Rs1hzGfiZxIDMjuSPeQz87Fo+0GybHjuQHJL6o/iXxo64DIm6n9lnryWDc/foT7Jpc7G9eRwhrKzU0u9U5Sd5vZxFA5jvgRJLFrqvlPGSmJx+El4ZOugnsfbCuM9foM4+C60P4Ebf4X2n7E4LL2jr+DGRmg34rLkmugzbccMaUMsEQ5GLA4f6hpR2/UooLyMHWNx+Ci0z8ENyeGXWBzeC+2/wI2V0P4ayzqcoMyype57Zaw4Eo/iGS0ltE0ttR8uczbOQrGLwynqrJRny1KQxilF/WrbwwN8bBF5ouNnOPoL+Cjq1T5HqicnGxSHvWNRAGDjn8E/k7KaGVXiQUbxxv4B/PLwqXSLAbG1kLou0Q/LusGDAS3AfDOfoRsZ8hIkDBwMcADzDX1mqYKXMJ7txQmMJ60MAlHOlC5gHjFONbloZypf8Xv/j2RTViYHBgYGBgYGBqLA9ZLJnLKaDVwJFI5gyKYue3hRmSny1gSuhM9c3UbZthjf6aDLkw1hHMbLo8gErkBIh7MzHX2UY2zs6N9hlA+aWx1Ye7IliMOZoCe/ShCQLg5bFfEwrwkb4Wt2ttXpQNRgvgxlqBM0yl0ifGPRJwW9OM6UUU6hI1heL+rp2abCuKEP25oXnwTcNl7fbcA2Uq40vcMp2MNRXkHkaGc9BuyjW2XWpXp4zQivle+0JD36KF+A+m22ddHnUemTgCPYM9I1Iv4rG8Gm00kc5ssQ96tbjnauWzW025QkQvsOHBRq0U3P+qZK395STkkhuIByksHt5qwvn7y/Kf17SUa6OHxzNpCWQnKFw+Dl3akd1F8v4n5ekhGfvL/DhSP8/hjwBycjk9NNdI9I0bS5qlhdlu7Br7NMdBuL0y+C7kmGDV5Szio+IpxCf0SVco56jm6VTilnla4R/g1hiCLK/wHLHjXuandbXwAAAABJRU5ErkJggg=="
                className="w-8	 h-8	"
              />
            </div>
            <div className="mt-10">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA/CAYAAABXXxDfAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEYSURBVHgB7dtNrcJAFMXxMy8IQMqT8Cyg4FUCKAAUYKESkIAEHIADioLLvWFDmulu7oI555dMCA0p/afTr0ULnJnt/WPrY43+TT7GUsquePgJ73A2x4h/gGOPz00RbyD1A2LU8XGmr0ISX/Vh4S8PSLLUqGnPSvGsIn5C/6qNEX+tLB/Rl2pjxG98nD8WXnwc0Zdq48qfbmJKbPyyF/f3a/9+R2eWGlezH3R9/M8bdaljpXhWimeleFaKZ6V4VopnpXhWimeleFaKZ6V4VopnpXhWimeleFaKZ6V4VopnpXhW3K+ZZDCzfx83a+MW68M38A39tRx/aCxj2g/I0XzvZ8RnvZ35RGMZ8SNyjPgGfnwO1vaENyDBC+fod6N3n7ttAAAAAElFTkSuQmCC"
                className="w-8	 h-8	"
              />
            </div>
            <div className="mt-10">
              <img
                src="data:image/png;base64,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"
                className="w-8	 h-8	"
              />
            </div>
            <div className="mt-10">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA5CAYAAACF8yP/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKLSURBVHgB7ZqBbeMgFIZfpBsgG5xHyAi5DbJBb4PLBskG7QbJBr0NfDeBu8FrJ0g3+MuTqUpdAw/Hrg3KJ6EoFhg+gzE8m6hAAGxMupjEJt1R6TjCLuWKe4TLFTdSVUC4aPEz4uQvLkO68z8mfqGckV6zIofO8ZA4U644wkgQZ5MqypEeYY14kcIh8aKFfeJrypEE4V7x7BggLHDOPXxAOoyM7+ED0uGbcC7chG/CIwubgmtbaY3P+9LGpEeTjiZtaSIwg3BlT6BFLsIdRhpSOQh3OeGKETBQWEbf8IWHKbzHODASoxKzCNuKG4wLQyGPuYRt5VPB8MhjTuGItExWcr9LWPW3/T+EE5wJx54zlfGEbSPYU9FjT15psGzKY6HWL+I0XHpcYduIh0CFO08Zabj0PiOOXKCqU3Y+YduIbaTBm0j5mPyRvl6w+YSdhtSByhmKRYC9eNwt25NPIz2tsNOQy7Xi9lxuz+88dYU4Ty28chqzNz/3gbzPJv1arVbPpEB63uT913N8HajnxZQ50neC8KT23uMbKg2E7+938o40dkG7xdSIS56KSkIx1AWZ/PZUEmgDBxrqonod/c/fPiRPOW/68bHm1nBPJYE24KDZbDSlDXdteImLEhegm+SKFN8h3utFimuGe0OlAd0qLp9Z3fZkpcwbe6xtKQcckRN0wYSQeE1LB20k1IURWXXZod5k29vwT1BBeYSjIw+0VEzj/iAOw/MiD/5hPvsQ/9F3EG1IR7NlrEw62zJP5ue/Sa/UhpZ+BsosE+jj2qks/5mNdrnJGI+/lANI21rGyGvP7cgzhrH857QPtM9iuefrBGF565nnZ4td8PEyT0aALErcIAPjys8zpuANh8I3zdRcplUAAAAASUVORK5CYII="
                className="w-8	 h-8	"
              />
            </div>
          </div>
        </div>

        {open && (
          <div className="bg-[#1E1E1E] w-[20rem] h-screen">
            <DraggableImage
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/640px-Heart_coraz%C3%B3n.svg.png"
              onClick={() =>
                handleClick(
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/640px-Heart_coraz%C3%B3n.svg.png"
                )
              }
            />
            <DraggableImage
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Triangle_illustration.svg/220px-Triangle_illustration.svg.png"
              onClick={() =>
                handleClick(
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Triangle_illustration.svg/220px-Triangle_illustration.svg.png"
                )
              }
            />

            <DraggableImage
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrzF38IA_9l3KU37W7jFi01yMnCcMRokukWynLyQVTrQ&s"
              onClick={() =>
                handleClick(
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrzF38IA_9l3KU37W7jFi01yMnCcMRokukWynLyQVTrQ&s"
                )
              }
            />
          </div>
        )}

        <div className={`${open ? "w-auto" : "w-[92%]"}	px-3 py-3 h-auto`}>
          <Stage
            width={1200}
            height={800}
            style={{ border: "1px solid grey" }}
            ref={stageRef}
          >
            <Layer>
              {images.map((image, index) => (
                <div draggable>
                  <URLImage
                    key={index}
                    image={image}
                    isSelected={index === selectedId}
                    onSelect={() => handleSelect(index)}
                    onChange={(newAttrs) => handleChange(newAttrs, index)}
                  />
                </div>
              ))}
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
};

export default SideBarDashboard;
