import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ControlPlayPause from "./ControlPlayPause";

export const ControlSlide: React.FC<any> = ({
  handleSlideChange,
  handleTogglePlayPause,
  tracks,
  phrase = " ",
  PlayPauseValue,
}) => {
  return (
    <>
      <div className="scroll-area">
        <Swiper
          direction="vertical"
          modules={[A11y, Mousewheel]}
          slidesPerView={1}
          spaceBetween={0}
          mousewheel={{
            invert: false,
            forceToAxis: true,
            releaseOnEdges: true,
            sensitivity: 1,
          }}
          className="mySwiper"
          autoHeight={false}
          onSlideChange={handleSlideChange}
          loop={true}
          // onClick={() => {
          //   console.log("Swiper clicked");
          //   handleTogglePlayPause();
          // }}
        >
          {tracks.map((track: number) => (
            <SwiperSlide key={track}>
              <div className="lyrics__layout">
                <button
                  className="control-play-pause__button-layout"
                  onClick={() => {
                    console.log("Swiper clicked");
                    handleTogglePlayPause();
                  }}
                >
                  <ControlPlayPause PlayPauseValue={PlayPauseValue} />
                </button>
                <p className="fontsize__lyrics lyrics">{phrase}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default ControlSlide;
