import React from "react";
import { TECarousel, TECarouselItem } from "tw-elements-react";

const Carousel = () => {
  return (
    <div>
      <TECarousel
        showControls
        crossfade
        ride="carousel"
        prevBtnIcon={
          <>
            <span className="inline-block text-black h-8 w-8 [&>svg]:h-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </span>
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Previous
            </span>
          </>
        }
      >
        <div className="relative w-full overflow-hidden after:clear-both after:block after:content-[''] ">
          <TECarouselItem
            itemID={1}
            className=" relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none "
          >
            <img
              src="https://static-cse.canva.com/blob/753772/howtosaveasanimage.jpg"
              className="block w-full h-96		"
              alt="..."
            />
          </TECarouselItem>
          <TECarouselItem
            itemID={2}
            className="relative float-left hidden -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
          >
            <img
              src="https://lh3.googleusercontent.com/WYH4NbEswt1I8Mez4fochXsc7zLJEd8NaZO5cYgNNvm_cFq_1C7MqoIWsjenGQGSyR_hNKCuGCWVDLugtqfzngQFhfM=w640-h400-e365-rj-sc0x00ffffff"
              className="block w-full h-96		"
              alt="..."
            />
          </TECarouselItem>
          <TECarouselItem
            itemID={3}
            className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
          >
            <img
              src="https://cdn.dribbble.com/userupload/4860363/file/original-8f1a668c0c94c1af067e1f77d88d57ff.jpg?resize=400x300&vertical=center"
              className="block w-full h-96		"
              alt="..."
            />
          </TECarouselItem>

          <TECarouselItem
            itemID={4}
            className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
          >
            <img
              src="https://static-cse.canva.com/blob/703864/BeachPartyThumbnail.a83a482c.png"
              className="block w-full h-96		"
              alt="..."
            />
          </TECarouselItem>
        </div>
      </TECarousel>
    </div>
  );
};

export default Carousel;
