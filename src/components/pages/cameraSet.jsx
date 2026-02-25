import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaStop } from "react-icons/fa";
import "../styles/Home.css";

const Home = () => {
  const videoRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const mediaRecorders = useRef([]);
  const recordedChunks = useRef([[], [], [], [], [], [], [], []]);

  // const [timestamps, setTimestamps] = useState(new Array(6).fill(new Date()));
  const [isRecording, setIsRecording] = useState(new Array(8).fill(false));
  const [recordings, setRecordings] = useState([]);
  const [zoomLevels, setZoomLevels] = useState(new Array(8).fill(1));
  // const [thresholds, setThresholds] = useState(new Array(5).fill(50)); // Threshold %
  const [thresholds, setThresholds] = useState([
    50, 50, 50, 50, 40, 50, 50, 30,
  ]);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const sliderRefs = useRef([]);
  const navigate = useNavigate();
  const handleSliderMouseDown = (e, index) => {
    setDraggingIndex(index);
    updateThresholdFromEvent(e, index);
  };
  const handleSliderMouseMove = (e, index) => {
    if (draggingIndex === index) {
      updateThresholdFromEvent(e, index);
    }
  };
  const handleSliderMouseUp = () => {
    setDraggingIndex(null);
  };
  const updateThresholdFromEvent = (e, index) => {
    const slider = sliderRefs.current[index];
    if (!slider) return;
    const rect = slider.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    let newThreshold = Math.round((offsetX / rect.width) * 100);
    newThreshold = Math.max(0, Math.min(100, newThreshold));
    setThresholds((prev) => {
      const updated = [...prev];
      updated[index] = newThreshold;
      return updated;
    });
  };

  useEffect(() => {
    const savedRecordings =
      JSON.parse(localStorage.getItem("recordings")) || [];
    setRecordings(savedRecordings);
  }, []);

  const startLiveStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      videoRefs.forEach((ref) => {
        if (ref.current) {
          ref.current.srcObject = stream;
        }
      });
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const startRecording = (index) => {
    if (!videoRefs[index].current || !videoRefs[index].current.srcObject) {
      alert(`Camera ${index + 1} is not streaming.`);
      return;
    }
    const stream = videoRefs[index].current.srcObject;
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorders.current[index] = mediaRecorder;
    recordedChunks.current[index] = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.current[index].push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks.current[index], {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const newRecording = {
        url,
        name: `Camera ${index + 1} - ${new Date().toLocaleTimeString()}`,
      };
      setRecordings((prev) => {
        const updatedRecordings = [...prev, newRecording];
        localStorage.setItem("recordings", JSON.stringify(updatedRecordings));
        return updatedRecordings;
      });
      recordedChunks.current[index] = [];
    };

    mediaRecorder.start();
    setIsRecording((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  const stopRecording = (index) => {
    if (mediaRecorders.current[index]) {
      mediaRecorders.current[index].stop();
      setIsRecording((prev) => {
        const newState = [...prev];
        newState[index] = false;
        return newState;
      });
    }
  };

  const renderCameraBox = (index) => (
    <>
      <div
        className="video-frame"
        style={{ transform: `scale(${zoomLevels[index]})` }}
      >
        <video
          ref={videoRefs[index]}
          autoPlay
          playsInline
          muted
          className="video-stream"
          style={{
            filter: `grayscale(${100 - thresholds[index]}%) contrast(${
              thresholds[index] * 1.5
            }%)`,
          }}
        />
      </div>

      <div className="camera-details">
        <span className="camera-label">
          <button
            className="record-icon-button"
            onClick={() =>
              !isRecording[index] ? startRecording(index) : stopRecording(index)
            }
          >
            {!isRecording[index] ? <FaPlay /> : <FaStop />}
          </button>
          {`Camera ${index + 1}`}
        </span>
      </div>
    </>
  );

  return (
    <div className="stream-container">
      <div className="main-controls">
        <button onClick={startLiveStream}>Start Stream</button>
        <button
          onClick={() => videoRefs.forEach((ref) => ref.current?.pause())}
        >
          Pause
        </button>
        <button onClick={() => videoRefs.forEach((ref) => ref.current?.play())}>
          Resume
        </button>
      </div>
      <div className="layout-wrapper">
        <div className="camera-wrapper">
          <div className="column column-left">
            {[0, 1, 2].map((index) => (
              <div key={index} className="camera-box">
                {renderCameraBox(index)}
              </div>
            ))}
            <div className="bottom-row">
              {[3, 4].map((index) => (
                <div key={index} className="camera-box small">
                  {renderCameraBox(index)}
                </div>
              ))}
            </div>
          </div>
          <div className="column column-right">
            <div className="top-row">
              {[5, 6].map((index) => (
                <div key={index} className="camera-box tall">
                  {renderCameraBox(index)}
                </div>
              ))}
            </div>
            <div className="bottom-center">
              <div className="camera-box small">{renderCameraBox(7)}</div>
            </div>
          </div>
        </div>
        <div className="threshold-panel">
          <h3 className="threshold-title">Thresholding</h3>
          {thresholds.map((value, idx) => (
            <div className="threshold-control" key={idx}>
              <label className="camera-label">{`Camera ${idx + 1}`}</label>
              <span className="threshold-percentage">{thresholds[idx]}%</span>
              <div
                className="threshold-bar"
                onMouseDown={(e) => handleSliderMouseDown(e, idx)}
                onMouseMove={(e) => handleSliderMouseMove(e, idx)}
                onMouseUp={handleSliderMouseUp}
                onMouseLeave={handleSliderMouseUp}
                ref={(el) => (sliderRefs.current[idx] = el)}
              >
                <div
                  className="threshold-fill"
                  style={{ width: `${thresholds[idx]}%` }}
                ></div>
                <div
                  className="threshold-knob"
                  style={{ left: `${thresholds[idx]}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className="recording-history"
        onClick={() => navigate("/history")}
      >
        View Recording History
      </button>
    </div>
  );
};

export default Home;
