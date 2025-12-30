import React, { useEffect, useRef, useContext, memo } from "react";
import { AudioContext } from "../../context/AudioContext";

const SeekBar = ({ currentTime, duration }) => {
  const slider = useRef(null);
  const { updateCurrentTime } = useContext(AudioContext);

  useEffect(() => {
    const audioEl = document.getElementsByTagName("audio")[0];
    if (!slider.current) return;

    const handleChange = (_) => {
      audioEl.currentTime = slider.current.value;
      updateCurrentTime(slider.current.value);
    };

    slider.current.addEventListener("change", handleChange);

    return () => {
      if (slider.current) {
        slider.current.removeEventListener("change", handleChange);
      }
    };
  }, [slider, updateCurrentTime]);

  useEffect(() => {
    slider.current.value = currentTime;
  }, [currentTime, slider]);

  return (
    <input
      type="range"
      min="0"
      max={duration}
      name="Audio-seekbar"
      ref={slider}
    />
  );
};

export default memo(SeekBar);
