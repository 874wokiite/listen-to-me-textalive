import React, { useState } from "react";

export const Test: React.FC<any> = ({}) => {
  const [text, setText] = useState("");

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.volume = 1;
    utterance.rate = 1;
    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event.error);
    };
    try {
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("Error in speech synthesis:", error);
    }
  };
  return (
    <>
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleSpeak}>Speak Text</button>
      </div>
    </>
  );
};

export default Test;
