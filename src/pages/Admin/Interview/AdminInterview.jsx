import React, { useEffect, useRef, useState } from "react";
import { Button, IconButton, TextField } from "@material-ui/core";
import { Assignment as AssignmentIcon, Phone as PhoneIcon } from "@material-ui/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Peer from "simple-peer";
import io from "socket.io-client";
import "./AdminInterview.css";

const socket = io.connect("https://ad7fc898-6610-40e2-9f32-532c0872946d-00-avwy8n55c57b.riker.replit.dev");

const VideoCall = () => {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");

  const myVideo = useRef(null);
  const userVideo = useRef(null);
  const connectionRef = useRef(null);

  useEffect(() => {
    const startStream = async () => {
      try {
        const currentStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });

    startStream();

    return () => {
      socket.off("me");
      socket.off("callUser");
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (remoteStream) => {
      userVideo.current.srcObject = remoteStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });

    peer.on("stream", (remoteStream) => {
      userVideo.current.srcObject = remoteStream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  const handleCopy = () => {
    alert("ID copied to clipboard!");
  };

  return (
    <>
      <h1 style={{ textAlign: "center", color: "#B22F2F" }}>Admin Interview</h1>
      <div className="container">
        <div className="video-container">
          <div className="video">
            {stream && (
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                className="video-stream"
              />
            )}
          </div>
          <div className="video">
            {callAccepted && !callEnded && (
              <video
                playsInline
                ref={userVideo}
                autoPlay
                className="video-stream"
              />
            )}
          </div>
        </div>

        <div className="myId">
          <TextField
            label="Name"
            variant="filled"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
          
          <CopyToClipboard text={me} onCopy={handleCopy}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AssignmentIcon fontSize="large" />}
              className="copy-id-button"
            >
              Copy ID
            </Button>
          </CopyToClipboard>

          <TextField
            label="ID to call"
            variant="filled"
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
            className="input-field"
          />

          <div className="call-button">
            {callAccepted && !callEnded ? (
              <Button variant="contained" color="secondary" onClick={leaveCall} className="end-call-button">
                End Call
              </Button>
            ) : (
              <IconButton
                color="primary"
                aria-label="call"
                onClick={() => callUser(idToCall)}
                className="call-icon-button"
              >
                <PhoneIcon fontSize="large" />
              </IconButton>
            )}
          </div>
        </div>

        {receivingCall && !callAccepted && (
          <div className="caller">
            <h1>{name} is calling...</h1>
            <Button variant="contained" color="primary" onClick={answerCall} className="answer-button">
              Answer
            </Button>
          </div>
        )}
      </div>

      <div className="start-button-container">
        <button className="start-button" onClick={() => {}}>
          Start Video
        </button>
      </div>
    </>
  );
};

export default VideoCall;
