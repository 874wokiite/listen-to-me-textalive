import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Mousewheel, Pagination } from "swiper/modules";
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
  playPauseValue,
}) => {
  return (
    <>
      <div className="scroll-area">
        <Swiper
          direction="vertical"
          modules={[A11y, Mousewheel, Pagination]}
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
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
            type: "bullets",
          }}
        >
          <div className="swiper-pagination"></div>
          {tracks.map((track: number) => (
            <SwiperSlide key={track}>
              <div className="control-play-pause__button-layout">
                <button
                  className="control-play-pause__button-layout"
                  onClick={() => {
                    console.log("Swiper clicked");
                    handleTogglePlayPause();
                  }}
                >
                  <ControlPlayPause playPauseValue={playPauseValue} />
                </button>
              </div>
              <div className="lyrics__layout">
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
