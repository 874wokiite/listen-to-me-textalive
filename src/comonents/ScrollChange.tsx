import { useEffect, useState } from "react";

const ScrollChange = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const tracks = [
    "https://piapro.jp/t/hZ35/20240130103028",
    "https://piapro.jp/t/--OD/20240202150903",
    "https://piapro.jp/t/XiaI/20240201203346",
    "https://piapro.jp/t/Rejk/20240202164429",
    "https://piapro.jp/t/ELIC/20240130010349",
    "https://piapro.jp/t/xEA7/20240202002556",
  ];

  const handleScroll = () => {
    const scrollBox = document.querySelector(".scroll-box")!;
    console.log(scrollBox.scrollTop, 200); // スクロール位置のデバッグ
    if (scrollBox.scrollTop > 100) {
      console.log("scrolled over threshold!!!");
      setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    }
  };

  useEffect(() => {
    const scrollBox = document.querySelector(".scroll-box")!; // scroll-box要素を取得
    scrollBox.addEventListener("scroll", handleScroll);

    return () => {
      scrollBox.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="scroll-box">
        <div className="scroll-area">
          Current track: {tracks[currentTrackIndex]}
        </div>
      </div>
    </>
  );
};

export default ScrollChange;
