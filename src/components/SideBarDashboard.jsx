import React, { useState, useRef, useEffect } from "react";
import TableDashboard from "./TableDashboard";
import { Stage, Layer, Image as KonvaImage, Circle } from "react-konva";

import useImage from "use-image";
import UrlImages from "./UrlImages";
import DraggbleImages from "./DraggbleImages";
import SideBartext from "./SideBartext";
import { image, shapes } from "../data/Data";
import Shapes from "./Shapes";
import AddText from "./AddText";

const SideBarDashboard = () => {
  const [open, setOpen] = useState(false);
  const [openText, setOpenText] = useState(false);
  const [textChange, setTextChange] = useState("");
  const [count, setCount] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [textId, setTextId] = useState(null);
  const stageRef = React.useRef();
  const [images, setImages] = React.useState([]);
  const [id, setId] = useState(null);
  const [text, setText] = useState([]);
  const [openShapes, setOpenShapes] = useState(false);
  const [color, setColor] = useState("");

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setTextId(null);
      setSelectedId(null);
    }
  };

  const handleOpen = () => {
    setOpen(!open);
    setOpenText(false);
    setOpenShapes(false);
  };

  const handleOpenText = () => {
    setOpenText(!openText);
    setOpen(false);
    setOpenShapes(false);
  };

  const handleClick = (src) => {
    // Get the click position relative to the stage
    setCount(count + 1);

    // Add the image to the beginning of the images array
    setImages([{ id: count, x: 400, y: 400, src }, ...images]);
  };

  const handleSelect = (id) => {
    setSelectedId(id);
  };
  const handleTextSelect = (id) => {
    setTextId(id);
  };

  const handleChange = (newAttrs, id) => {
    const newImages = images.slice();
    console.log(newImages);
    newImages[id] = newAttrs;
    setImages(newImages);
  };

  const handleTextChange = (newAttrs) => {
    const updatedTextElements = text.map((item) =>
      item.id === newAttrs.id ? newAttrs : item
    );
    setText(updatedTextElements);
  };
  const handleDelete = () => {
    setImages(images.filter((item) => item.id !== id));
  };

  const addtextbox = () => {
    setCount(count + 1);
    setText([
      ...text,
      {
        id: count,
        x: 300,
        y: 300,
        type: "text",
        fill: "#000",
        text: "Add a textbox",
        fontsize: 16,
      },
    ]);
  };

  const addHeading = () => {
    setCount(count + 1);
    setText([
      ...text,
      {
        id: count,
        x: 300,
        y: 300,
        type: "text",
        fill: "#000",
        text: "Add a Heading",
        fontsize: 18,
      },
    ]);
  };

  const addSubHeading = () => {
    setCount(count + 1);
    setText([
      ...text,
      {
        id: count,
        type: "text",
        x: 300,
        y: 300,
        fill: "#000",
        text: "Add a sub Heading",
        fontsize: 16,
      },
    ]);
  };

  const addLittleBitBody = () => {
    setCount(count + 1);
    setText([
      ...text,
      {
        id: count,
        x: 300,
        y: 300,
        type: "text",
        fill: "#000",
        text: "Add a sub Heading",
        fontsize: 14,
      },
    ]);
  };

  const handleDeleteText = () => {
    setText(text.filter((item) => item.id !== id));
  };

  const handleOpenShapes = () => {
    setOpenShapes(!openShapes);
    setOpen(false);
    setOpenText(false);
  };

  const handleInputChange = (e) => {
    setTextChange(e.target.value);
    if (id) {
      const updatedTextElements = text.map((item) =>
        item.id === id ? { ...item, text: e.target.value } : item
      );
      setText(updatedTextElements);
    }
  };

  const handleInputChangeColor = (e) => {
    setColor(e.target.value);
    if (id) {
      const updateColor = text.map((item) =>
        item.id === id ? { ...item, fill: e.target.value } : item
      );
      setText(updateColor);
    }
  };

  const handleCircle = () => {
    setCount(count + 1);
    setText([
      ...text,
      {
        id: count,
        type: "circle",
        x: 200,
        y: 100,
        radius: 50,
        fill: "#1e8fc8",
      },
    ]);
  };

  const handleRectangle = () => {
    setCount(count + 1);
    setText([
      ...text,
      {
        id: count,
        type: "rectangle",
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        fill: "#1e8fc8",
      },
    ]);
  };

  const handleStar = () => {
    setCount(count + 1);
    setText([
      ...text,
      {
        id: count,
        type: "star",
        x: 500,
        y: 100,
        numPoints: 5,
        innerRadius: 20,
        outerRadius: 50,
        fill: "#1e8fc8",
      },
    ]);
  };

  const handleTriangle = () => {
    setCount(count + 1);
    setText([
      ...text,
      {
        id: count,
        type: "triangle",
        x: 650,
        y: 100,
        sides: 3,
        radius: 50,
        fill: "#1e8fc8",
      },
    ]);
  };

  const [bgColor, setBgColor] = useState("white");

  const handleColorChange = (event) => {
    setBgColor(event.target.value);
  };

  const [fontSize, setFontSize] = useState(0);
  const handleIncrement = () => {
    const getValue = text.map((item) =>
      item.id === id ? { ...item, fontsize: item.fontsize + 1 } : item
    );

    setFontSize((prev) => (prev += 1));
    setText(getValue);
  };

  const handleDecrement = () => {
    const getValue = text.map((item) =>
      item.id === id ? { ...item, fontsize: item.fontsize + -1 } : item
    );

    setFontSize((prev) => (prev -= 1));
    setText(getValue);
  };

  const handleGetSize = (fontid) => {
    const item = text.find((item) => item.id === fontid);

    setFontSize(item ? item.fontsize : 0);
  };

  return (
    <div className="w-full ">
      <div className="flex  ">
        <div className="w-[20%] flex ">
          <div className="w-[30%]	px-3 py-3  bg-[#525252]  h-screen flex items-center  flex-col h-[90vh] ">
            <div className="mt-10" onClick={handleOpenShapes}>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA+CAYAAAB3NHh5AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANfSURBVHgB7ZqBdeIwDEDFvQ7ABmcmODrBhQmODegGpROQDa4b0A2OmwCYoO0E4SYoG+gkkrQpRIrjOMZ9L/89Pd4zjiUhYsuyR0hAIEYEOEAmjuljQTIlSUjGhTAvJAeSDcmeVByaBgsGODhKsiJ5a6FmTWK0QYMBLaDuc2znaJWMZAFfxWHMo+qDVfQOoz9nSz45PbI1xAdNkxaZMqePP+CfGanenWxQHJ6BO9u6Rs1hzGfiZxIDMjuSPeQz87Fo+0GybHjuQHJL6o/iXxo64DIm6n9lnryWDc/foT7Jpc7G9eRwhrKzU0u9U5Sd5vZxFA5jvgRJLFrqvlPGSmJx+El4ZOugnsfbCuM9foM4+C60P4Ebf4X2n7E4LL2jr+DGRmg34rLkmugzbccMaUMsEQ5GLA4f6hpR2/UooLyMHWNx+Ci0z8ENyeGXWBzeC+2/wI2V0P4ayzqcoMyype57Zaw4Eo/iGS0ltE0ttR8uczbOQrGLwynqrJRny1KQxilF/WrbwwN8bBF5ouNnOPoL+Cjq1T5HqicnGxSHvWNRAGDjn8E/k7KaGVXiQUbxxv4B/PLwqXSLAbG1kLou0Q/LusGDAS3AfDOfoRsZ8hIkDBwMcADzDX1mqYKXMJ7txQmMJ60MAlHOlC5gHjFONbloZypf8Xv/j2RTViYHBgYGBgYGBqLA9ZLJnLKaDVwJFI5gyKYue3hRmSny1gSuhM9c3UbZthjf6aDLkw1hHMbLo8gErkBIh7MzHX2UY2zs6N9hlA+aWx1Ye7IliMOZoCe/ShCQLg5bFfEwrwkb4Wt2ttXpQNRgvgxlqBM0yl0ifGPRJwW9OM6UUU6hI1heL+rp2abCuKEP25oXnwTcNl7fbcA2Uq40vcMp2MNRXkHkaGc9BuyjW2XWpXp4zQivle+0JD36KF+A+m22ddHnUemTgCPYM9I1Iv4rG8Gm00kc5ssQ96tbjnauWzW025QkQvsOHBRq0U3P+qZK395STkkhuIByksHt5qwvn7y/Kf17SUa6OHxzNpCWQnKFw+Dl3akd1F8v4n5ekhGfvL/DhSP8/hjwBycjk9NNdI9I0bS5qlhdlu7Br7NMdBuL0y+C7kmGDV5Szio+IpxCf0SVco56jm6VTilnla4R/g1hiCLK/wHLHjXuandbXwAAAABJRU5ErkJggg=="
                className="w-8	 h-8	"
              />
            </div>
            <div className="mt-10" onClick={handleOpenText}>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA/CAYAAABXXxDfAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEYSURBVHgB7dtNrcJAFMXxMy8IQMqT8Cyg4FUCKAAUYKESkIAEHIADioLLvWFDmulu7oI555dMCA0p/afTr0ULnJnt/WPrY43+TT7GUsquePgJ73A2x4h/gGOPz00RbyD1A2LU8XGmr0ISX/Vh4S8PSLLUqGnPSvGsIn5C/6qNEX+tLB/Rl2pjxG98nD8WXnwc0Zdq48qfbmJKbPyyF/f3a/9+R2eWGlezH3R9/M8bdaljpXhWimeleFaKZ6V4VopnpXhWimeleFaKZ6V4VopnpXhWimeleFaKZ6V4VopnpXhW3K+ZZDCzfx83a+MW68M38A39tRx/aCxj2g/I0XzvZ8RnvZ35RGMZ8SNyjPgGfnwO1vaENyDBC+fod6N3n7ttAAAAAElFTkSuQmCC"
                className="w-8	 h-8	"
              />
            </div>
            <div className="mt-10" onClick={handleOpen}>
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

          {openShapes && (
            <div className="bg-[#1E1E1E] w-[11rem] h-[90vh]">
              <Shapes
                triangle={handleTriangle}
                rectangle={handleRectangle}
                circle={handleCircle}
                star={handleStar}
              />
            </div>
          )}

          {open && (
            <div className="bg-[#1E1E1E] w-[11rem] h-[90vh]">
              {image.map((item) => (
                <div>
                  <DraggbleImages
                    src={item.src}
                    onClick={() => handleClick(item.src)}
                  />
                </div>
              ))}
            </div>
          )}
          {openText && (
            <div className="bg-[#1E1E1E] w-[11rem] h-[90vh]">
              <SideBartext
                addtextbox={addtextbox}
                addHeading={addHeading}
                addSubHeading={addSubHeading}
                addLittleBitBody={addLittleBitBody}
              />
            </div>
          )}
        </div>

        <div className="w-[80%]    px-10">
          <div className="flex items-center gap-5 w-full bg-white mb-10 px-3 h-12  ">
            <div>
              <input
                type="text"
                value={textChange}
                onChange={handleInputChange}
                className="outline outline-2 text-center rounded-sm"
              />
            </div>

            <div className="">
              <input
                type="color"
                value={color}
                onChange={handleInputChangeColor}
                className="w-10  outline-none h-10 mt-1"
              />
            </div>

            <div className="">
              <input
                type="color"
                value={bgColor}
                onChange={handleColorChange}
                className="w-10  outline-none h-10 mt-1"
              />
            </div>
            <div>
              <button
                className="bg-[#D9D9D9] px-3 rounded-md text-2xl"
                onClick={handleIncrement}
              >
                +
              </button>
              <input
                type="text"
                value={fontSize}
                className="outline-none w-14 text-center "
              />
              <button
                className="bg-[#D9D9D9] px-3 rounded-md text-2xl"
                onClick={handleDecrement}
              >
                -
              </button>
            </div>

            <div>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA8CAYAAAAkNenBAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOpSURBVHgB7VkxchNBEJyT9ADxAs6ZnZmMDPECVPYDLP/AvADzAoof4IzElvwCTiERCp1xIRkiI7FNj7mrUhW3szO7IxmV1VUqn29m77Z3Z3d69gpyxng8Lnu93hdclgGX+u7u7vVsNqvJET1yRlEU5xQmwSj7/f47csY6iLyK+dzf34/JGa5EEFYjkmejxbDxdYMrEczGxODrOiveRKJhteL7hhzhRgShcki6sGpRNm1c4EYEW+6IjEAbt/ByI4KdyBwqaKMOxRgKckCTBL932dDZ6uFFRTHqsiM5PkNyXFImXGZECivYPoHEtWCfkEcfyAEY9ZOQ7fb2do5RnwltXXav7NBCWA0xqj+7bOjkYjqdvuDro6MjDr2yw20Jonu54ZU9I9BNI8E8by9AKhRew8FgkL3os4lgNINbKDo/67ru8MvehrOJCNm8RrhU7T/NdWf4PDqRiEislPcY2SIyi4gkEmGrOm5fC/5Zs5JLJLhIse3+02lpG84VkclEJJHI2bxrO+V7babvAIvIkhKRTETK5lImh20uPHNCqf2hREgZGSFUpdhyRGRSZpdEIlBfXV3tSe2R5VkJDLtsqSIyaUYitUdFEWDkL4RnTygBSUQkkYgRvaB4e3cRaSbCIjFUWwDL1WwuYEGBLI9nH/I7yAgzEUkkYjTnpECzDS8CZiZhruXNRCSRiPiekhLSFo3BOiEjzESkDMxFFCkRKbbMcsVEpBF2w8DLF5aD6cY35G8WkSYikZNE9Wy0EIots4gcWJwlkQjbwqqVuI1g4xA+I+2ztI4sErGYv9EG0dTytcZXHVopJ4m5sGR5yxoxb4m5sIhIVWhFROJaoRWRqhl5jLBaefdE5adxkkTiuqEVkdHQkk4SNwTVSWQ0j7BIxKgE7djvz2D/RXl4jt95wNaKyIoERImwSERnQ+b68vLyIzkAVSMnv07504jISmofXSORY5qKnCDJFY2IFIlIIpGhqQa1wDqcCeaoiBSJxD43K6tBFVACVBSoGpu+iLMSIxLMrFIopCBSNUZPIoNEYp+bLdWgFlLVSJGTyCARdFSsmy3VoBZS1cgQv1UKD61DNms1qAU/UwovqU/9kOHm5qY+ODjgBFLS30X48MOL+GWnsP+gNWB/f/8r/rxEmP1efS9+7/E98jPtsMMOTxsPsrY5NDYfHP8n4IPzZXF8fDzGduqepTcJ1oQ9kPhAWw5wOOfMXtL2o+wJn4u3BixrmMhbCp+KbwNYNp3+ASm6pCBcmijPAAAAAElFTkSuQmCC"
                className="w-7 h-7"
              />
            </div>

            <div>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAABNCAYAAAD6ggcWAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPESURBVHgB5ZxNVhpBFIUvrQsgO2hnOtLMMpOsIBwdZaRZQdhBcJgRuAJxASpZQXAFwZHO7CWYuUruxYKDTQPS/TDVxXdO2Vjy4+36e/VePSrIoF6v16IoOuLDGkuM1fMwGAwSXVlu+LjHa7/b7SYwpjL5C4XuVSqVFksNHiDhvPGdp6enayvxY8GHh4dH/IAO/KXz/Px8UlT4hn6oC7NVu/Ab9b7Gzs4Obm9vr5GTYQsfHBzc433GqhUJW/tzntaOKPYY5RIrYo7te/7vDSxJxHF7hPLSougfy7wg4rjYQ7lpLiM6Yqmi/DTf2r0jhENLq82iJ4UkGJzIzih6bo8NSjBeZu+54zk0waIxr2uHKBhceWa2cqiCa7NaOUjBgqLrWfWbsGFo2yIfmmhiXr+w1GEEBcuCnFqbK1ywByhOcnl5uYWCsBtK/G8Y2fZshI/cYPQn67zq0tr9uJ6SwADevNpUHTzDif4GA9itd9N1Xk5aFN1zfq1C8MbF6TpvZ2m2zi8UhO8Rp+t8XpYesAJ8FrySbavPgvdREOfrfoWXgrUew8YI+Zuu8FIwJ5szGMD36afrrExLE7R51yYeLyGewvC9/qTrvBDsTMqR7Ws2WT0+Pk457K0Ex86Zn4cqVjAjy3ChATO1tFm2cAyPUBAusx5hklxcXJxn/SFUj0dz1t9CFDyzdUVoghd6XkL0S88NDobYpecG10KdpWcG14J102JGcC1kwZnBtaAFIyO4FrpgoeDa+JTDOgiW5dUaPV4XwbXRWF4LwYJjebhMWW4PExQnxuqQBdb0KpgmNMGwNTTJaHaNYQjt7C2vfFrCRftUOmyMJl6Em8AbWfd6DLPXNHk5gREKrnk/aUk0/VOnMIBdeq8UszQFN2EQa2ILV0shWN5Hij5HccohWGRFEXJQHsEcfwkMWBtLa0RpBDtjpChJmVr4OwqieHEpBBvmZdx4L9gFx1swQOFTrwW7lECdzDOJLirDzbvNg3ApgQ13XtIEjt9hLqOV4CrHmckxBawowZM9pa2rmWCWY3iMurOu62J4dEZpe+sgWBHF8Z46eMEKjk8mZYYuuJMOjocs+FVXHhHsoZZZ+cVBnvGYl0wtwQnCYWHmuBKmc+fTe0bXZbEk8560qW92sLRZ/wPyZp7Qndt+y5M37u7uku3t7Q8U/QnlQkJ/slW/Xl1d9d76oqEt7fy++yVJj5fQUwptZx0eXcT4i0sUP6XgtqfdW8J6FCkjopdH6IhKukIeBndWcXeixRO8I/I98bNV+tzl3CiPCUb8AzMsZ9jkNJq4AAAAAElFTkSuQmCC"
                className="w-7 h-7"
              />
            </div>

            <div>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAABPCAYAAABLX43XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANZSURBVHgB1ZvNcRNBEIVbKw4cHYI5Shd05MYSASpFYDIwEYAjoIgAk4AkImCJwCYCFIIC0A/dQkuBmD80r7vtr8ql8qhqd171vPl7pQEBmU6nl4PB4BP/TfjfC7JlzX+38/n87ZCAjMfju6Ogp2SPvPPFaDQaDAgEV2nSNM0d+bNuCMeaHggwUcvlcrXf7ztyhvvwGVkpeeAbeSj5ICPlZrFYXMM8dQ4yW7IPf4S+2+12z6T6dAbQSv33y5umDbVzte/PFXR4LjnCnW9D7bws3FMFrqK48y9D7VzBJVXgJkr8xB+Xoe82m803qsBNVMZPVWue5/B7HWmvqpLgKWoSauRKVflJcBEl+0SK+ImpmvkEF1Hsp1iVulo/HZ5PPsT89J0AeIlqQ40IPwnme7/UuYtPrZD+mFcqsT51hHoHGcOdD/qJt0zV61OPuajjHcY/8FGjIxCmothPLYVvmdY8lXcEwlRUYn2qXnD/eg8ZkvDTFwJiKoo734bakX4SzEQd/RRC/PQ4h19ifYJN5b/fRUZw54NHdx6SHYExEcVD78LKT4JVpSaR9hXaT4KJKK7SNNTOQxJy1DjFqlLPQ408eSxIAXVRKT9tt9vHWanhcNhGvlLxk6Auime3NvJVR0qoi4pdLWusTz2qoo5Xy8HpnP0E30n0qIpiP0WPGjVRTQ5VUeyn4PpUG9XkUBXFnY+tT5CrsBhqolJ+4qhGZX3qUROlFX0WvZuUiEWfBIhqcqiJiq1PPCN+JWVURKWimtroswQVUdpRTfb9pINqVJNDS5Ra9FkCXJR29FkCXFQqqrHw06EPhCd21FCf9Xo0RLWhRo2rsBjQeNQi+iwBWimL6LOoHwTEKqrJARWViD5NpvIemCir6LMEmKjU+YmMgYlKRDWmfhJgoiyjmhwQUZbRZwkQUYmoxmxr9Ceo4Wca1eSoFuUR1eRAVMo0+iyhWpR19FkCQlTsVwAufjq8myoQP5FDVJOjSlQm+lyRE1WiYlENKUafJVSJikU1mtFnCWeL8oo+SzjcG8xms3f8cU32PzgWbnkY3yA9+IQFfaBfgry44uF6yZ+vCIQMvytyRrZZx+EMwfXneyfAhr6I+kj+QPeJDV8yvud9mggzuec+YS13gjxRwPwk/AT/h0y2i6vE0wAAAABJRU5ErkJggg=="
                className="w-7 h-7"
              />
            </div>

            <div>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE0AAABUCAYAAADH0LrjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPiSURBVHgB7ZwxUxNBFMff3VHYGT6BoWKowM7O0FleoLISSivkExhLK6SzA0sLSOzsiJ2doYLOa62MnQUk/t+wmYkxIZt3by8X834zNwlkc7v3u929vb23ITIMwzAMwzDKSEQBSNO0ihfeslarlVHBDOXfRf4dUkZVGgq7FUXREbba4H/9fr+Nbb8IeSwLeZ+M5N/BVtfMX00aFziO4294Wxnzcdbr9bZDinP5X9BdDRuli/wfa+UfkxJ8hmm8MKbqPg8G9t+g8cKYimb+KjXNneXv09LhbK/ibHdJGeRfQf4/p6VD/msatU2lpiVJsuWZ1DfdrHjtF2JrpICKNHS0FVoi1Pq0ZcKkCTBpAkyaAJMmwKQJMGkCTJoAkybApAkwaQJMmgCTJsCkCTBpAkyaAJMmwKQJMGkCTJoAkybApAkwaQJMmoBCpa2srDyk/wAVab1eL/NMt0YBiOPYKyzBt5xT8yMdMp9EURRtUgD6/b5vjIhK8I2WNK/C4OBSCgBOxlOfdFpRkSrSXPhU5pG0kqZpjRRx+6tOS8cRkaSE2oUAhfrikw614jUpgv3teaYrnzQUqu2ZrqZV23Z2dvawvxc+aXGxaJESatJwZeJCefVtOIATF4Etxn3fu9be3Nx4tQQf1KS5fq3tmZxjcJtScS5cdFJQ8jhONcNWVQe3qG3HvmkhbYsPfFZxQ1HkVd/voFwfSBH1xRf1ev1iOI7fkwYf2H1BxK52HeDtK5ocRf4PvI6h2WxukyLq0riTd01HQosvKLe3t5fu70qSJI8gNOWaSTPIGuDWD6iuWgmyzAe17R0O8oDmz+n5+fk+KRPkhh1NokGet1YB4VUybygAQWoaw+ukXIc9F0I0ywHBpoa4wCi4etPwZD+UMCahgFxfX3c2NjZ+4e0zKo5D9GPvKSBBpTFXV1df19fXL3FhYHEPKBw8eH0ZWhgTrE8bZcrSwlyEWNN5H4VJG4Cb7AZeeDiisZ6Ka9cxaleDCiR48xwFzbWN5voRb1fRZFmcRB7LeosLzXOM9j9TwRRe00ZBs+XRPs/obrpR/yQyNMFP2Hg2pRNi3agvc5c2Co/v6O/al9HdAv65STKM+aD5awmiWYgCUfuNjtzSdnd3U3TORxRg/BUAvok/hLxczwtySXPCmrRg8BOss7Mz8WyuWJqbSZ1p2rlEdN3PTYiuyOJZDsyo1mgxhTF8wsVP+8XSZoifKCtVEmLxaQLySMtogckzqyyWNssT9RKS5XniLp7lwKzsb8xW/HA32wsFT8PnGejmmhri6Ww3K/uEyn03MCBzwuY3uB1mmW6jDMMwDMMwjHLyB0qBatuPu8lJAAAAAElFTkSuQmCC"
                className="w-7 h-7"
              />
            </div>

            <div>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABWCAYAAACO7cvVAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFVSURBVHgB7d0xToRQEMbxeWhhqTegpPUGegPCCdbSSu3sdEsr4w3WCzw4AqU3gJIjcAJwiGbbzb4hu5D3/yUDyZaT7CN5XybjRBVF8aavZ61rwSG91s57/+K0cZ/y1zgcZ5voYyMI8ZQIgk3N+xIcbRzH74umaeosy26cc5n+diU4ZPpgfJRl+SoAAAAAAAAI4KZHZBnGbhiGbVVVnRhdRphhbPTuMtX3vRhFmWFo8+7yPE/FKOYMoxejWDMMPfIqc/NiyzB6DW5+tB7btjU3DwAAAAAAACFWlWHoVVKt9TBH/jCHNc5hdBrg3M5xmWm1xgwj/a+zW2uGsYjjZY0ZRqd/2VoWIPHev+shPDVw8Xf60wdDzztz3goAAAAAAIBzYg7DgDkMA+YwDJjDMGAOw4A5DAAAAAAAAJxYjBmGFfswZsA+DAP2YViwDyMQ+zDC7Pdh/ALF1pd2PvgvDAAAAABJRU5ErkJggg=="
                className="w-7 h-7"
              />
            </div>

            <div>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG0AAABmCAYAAADBPx+VAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHFSURBVHgB7dyxccIwFMbxJ5OCEjagdJkRyAaKJyATAB0dR0lFmABnAdsbhBHSuWWDMAHOE7CADnS24v/vTojzHYV5kq3iu2dEZVm21mmhYyToqrOOvCiKpdGC7eRWMMRhk+jHTBCTeSKIjivaXhCNpmm+BnVdH9M0HRtjUr02FHSVO4hsy7JcCQAAAAAAAAAAAAAArTLiyVo7SpLkoF+nQk7yUfnlcllWVXX2+ZF3GssY86mTFQr2DDP9P0vx5LXT7rvsV/BUutvGPruN3GOEvIrmVkPTNEfBM+XB32latHcXmBQ8yhWqcgcRAQAAAAAAAAAAAAAgKt65R1/W2okx5qBjKv9fdc8xniSgFwksSZJvnSbSD1YXp8uDvklAQSN0ustepT8Fu3JPlPt9B0PuMUJBi6bP9p8e5iRP7r4loOA7TYv2oVMlPeAWqB5Egr7PAAAAAAAAAAAAAABoH/0e20W/xwjR7zFW9HvsAfo9to9+jxGh3yMAAAAAAAAAAAAAIFLXNFaWZWudFkIsrstcPCEvimJptGA7uRUMcdi4YM9MEJM5uccIuaLtBdFw8cVBXdfHNE3HxphUrw0FXeUOItuyLFd/m8ugXzsYywYAAAAASUVORK5CYII="
                className="w-7 h-7"
              />
            </div>

            <div>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAABiCAYAAADZamS4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGZSURBVHgB7dyxbcJAFMbxd6ZJGTagPLqMkEwQdCzABiRdOuQyFWICyALYG4QtTEk2IAtA3hkpRCmg8Z3N6f+TjkOu0Ctw8T59RpRzbqbXi557QUh7Pav1ev1qdOhzOQ0d8eSZfkwEsU0zQSv84BeCqI7H40evqqqNtbZvjLH67E4Qkn+5vhdF8SYAAAAAAAAAAACpMhLAeDye6nrLJxcGgr/O8Q5pmHNuotdScEkeImXwLLim+XiH/sV8C64KMfiV4KI63iEN2263u+Fw+KVfH4Qs5n/EOwAAAAAAAAAAQPqCxDuaNhqNBsaYpZ5HuW3h4h1N80PPsuxT0sro5J0vkej1en53O5C0dL+9QzfySS7MOz/4w+FQ6rWThPh4R+cHX5blXof/pD92I7fPv1zzoihoxAIAAAAAAAAAAOmivSMu2jtaRntHS2jvaAvtHS2gvSM+2jsAAAAAAAAAAED66pSBc26ml49jsDEK6xzv0KHP5TR0xFPHOyaC2Lrf3pEqP/iFIKo63lFV1cZa2zfGWH12JwjpN97xAwZXjjQ+LyYQAAAAAElFTkSuQmCC"
                className="w-7 h-7"
              />
            </div>

            <div
              onClick={() => {
                handleDelete();
                handleDeleteText();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className="text-4xl"
              >
                <path
                  fill="currentColor"
                  d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
                />
              </svg>
            </div>
          </div>
          <div className="w-full h-auto  flex items-center justify-center">
            <div c>
              <Stage
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
                width={1100}
                height={550}
                ref={stageRef}
                style={{ width: 1100, backgroundColor: bgColor }}
              >
                <Layer>
                  <div>
                    {images.map((image, index) => (
                      <div draggable onClick={() => setId(image.id)}>
                        <UrlImages
                          key={index}
                          image={image}
                          isSelected={index === selectedId}
                          onSelect={() => handleSelect(index)}
                          onChange={(newAttrs) => handleChange(newAttrs, index)}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    {text.map((item, index) => (
                      <div
                        draggable
                        onClick={() => {
                          setId(item.id);
                          handleGetSize(item.id);
                        }}
                      >
                        <AddText
                          key={index}
                          item={item}
                          isSelected={index === textId}
                          onSelect={() => handleTextSelect(index)}
                          onChange={(newAttrs) =>
                            handleTextChange(newAttrs, index)
                          }
                          input={textChange}
                        />
                      </div>
                    ))}
                  </div>
                </Layer>
              </Stage>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarDashboard;
