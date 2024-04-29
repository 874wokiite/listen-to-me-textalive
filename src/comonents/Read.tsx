import React, { useState } from "react";

const Read = () => {
  const [text, setText] = useState("");
  const [pitch, setPitch] = useState(1);

  const read = () => {
    if ("speechSynthesis" in window) {
      const uttr = new SpeechSynthesisUtterance();
      uttr.text = text;
      uttr.lang = "ja-JP";
      uttr.pitch = pitch;

      var voice = speechSynthesis.getVoices().find((voice) => {
        return voice.name === "Google 日本語";
      });
      if (voice) uttr.voice = voice;

      window.speechSynthesis.speak(uttr);

      return;
    }
    alert("このブラウザは音声合成に対応していません。");
  };

  const handleChangeText = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setText(event.target.value); // テキストフィールドからテキストを更新
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleChangeText} />
      <button onClick={read}>読み上げ</button>
    </div>
  );
};

export default Read;
