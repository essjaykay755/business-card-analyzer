"use client";

import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
}

export default function CameraCapture({ onCapture }: CameraCaptureProps) {
  const webcamRef = useRef<Webcam>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc.split(",")[1]); // Remove the data URL prefix
    }
  }, [webcamRef, onCapture]);

  return (
    <div className="flex flex-col items-center">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: "environment" }}
        onUserMedia={() => setIsCameraReady(true)}
        className="w-full max-w-md"
      />
      <button
        onClick={capture}
        disabled={!isCameraReady}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        Capture Business Card
      </button>
    </div>
  );
}
