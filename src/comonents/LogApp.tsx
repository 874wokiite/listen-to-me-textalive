// import React, { useEffect } from "react";
// import { Player } from "textalive-app-api";

// const LogApp = () => {
//   useEffect(() => {
//     const player = new Player({
//       app: { token: "YI8I8mIpotidyyxf" }, // ここに適切なAPIトークンを設定する
//       mediaElement: document.createElement("video"),
//     });

//     player.addListener({
//       onVideoReady: () => {
//         console.log("--- [app] video is ready ---");
//         console.log("player:", player);
//         console.log("player.data.song:", player.data.song);
//         console.log("player.data.song.name:", player.data.song.name);
//         console.log(
//           "player.data.song.artist.name:",
//           player.data.song.artist.name
//         );
//         console.log("player.data.songMap:", player.data.songMap);
//       },
//     });

//     player.createFromSongUrl("https://piapro.jp/t/hZ35/20240130103028", {
//       video: {
//         beatId: 4592293,
//         chordId: 2727635,
//         repetitiveSegmentId: 2824326,
//         lyricId: 59415,
//         lyricDiffId: 13962,
//       },
//     });
//   }, []);

//   return <div>Check the console for output.</div>;
// };

// export default LogApp;
