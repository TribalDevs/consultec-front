/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "components/Buttons";
import { Loader } from "components/Loader";
import { Modal } from "components/Modal";
import { TextComponent } from "components/Texts";
import PropTypes from "prop-types";
import { useContext, useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { ChatContext } from "views/Home/HomeScreen";
// import { actions, initialState, reducer } from "./reducer";
import "./styles.sass";
export const CallComponent = (props) => {
  // * Destructuring context
  const {
    socket,
    setShowModalCall,
    state: stateContext,
    userSelected,
    userToCall,
    userInfo,
    dispatch: dispatchContext,
    actions: actionsContext,
  } = useContext(ChatContext);
  // * Reducer
  // const [state, dispatch] = useReducer(reducer, initialState);
  // * Stream
  const [stream, setStream] = useState();
  // * Refs
  const myVideo = useRef(null);
  const userVideo = useRef();
  const connectionRef = useRef();
  // * UseEffect
  useEffect(() => {
    if (stateContext.showModalCall || stateContext.receivingCall) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          // * Set stream
          setStream(stream);
          // * Set my video
          myVideo.current.srcObject = stream;
        });
    }
  }, [stateContext.showModalCall, stateContext.receivingCall]);

  const callUser = () => {
    dispatchContext({
      type: actionsContext.SET_CALLING,
      payload: true,
    });
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: userToCall.socketId,
        signalData: data,
        from: socket.id,
        name: `${userInfo.first_name} ${userInfo.last_name}`,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      dispatchContext({
        type: actionsContext.SET_CALL_ACCEPTED,
        payload: true,
      });
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    dispatchContext({
      type: actionsContext.SET_CALL_ACCEPTED,
      payload: true,
    });

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", {
        signal: data,
        to: stateContext.caller?.caller,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    peer.signal(stateContext.caller?.signal);
    connectionRef.current = peer;
  };

  const leaveCall = ({ emit = true }) => {
    dispatchContext({
      type: actionsContext.END_CALL,
    });
    if (emit) {
      socket.emit("endCall", {
        to: stateContext.caller?.caller || userToCall.socketId,
      });
    }
    userVideo.current.srcObject = null;
    myVideo.current.srcObject = null;
    return () => {
      socket.off("endCall");
    };
  };
  const rejectCall = () => {
    socket.emit("rejectCall", {
      to: stateContext.caller?.caller,
    });
    dispatchContext({
      type: actionsContext.SET_CALL_REJECTED,
    });
  };
  useEffect(() => {
    socket.on("endedCall", () => {
      if (stateContext.callAccepted) {
        leaveCall({ emit: false });
      }
    });
  }, [stateContext.callAccepted]);

  return (
    <Modal
      show={
        stateContext.showModalCall ||
        stateContext.receivingCall ||
        stateContext.callAccepted
      }
      onClose={() => setShowModalCall(false)}
      title="Llamada"
      size="small"
      removeCloseButton
    >
      <div className="call__container__preview">
        <div className="videos__container">
          {/* my video */}
          <div className="call__container__preview__video">
            <video playsInline muted ref={myVideo} autoPlay />
            <TextComponent
              text={`${userInfo.first_name} ${userInfo.last_name} (Tú)`}
              disableLocales
              type="p"
            />
          </div>
          {/* other user video */}
          {userVideo && (
            <div className="call__container__preview__video">
              <video playsInline ref={userVideo} autoPlay />
              <TextComponent
                text={
                  stateContext.caller?.name ||
                  `${userSelected?.first_name} ${userSelected?.last_name}`
                }
                disableLocales
                type="p"
              />
            </div>
          )}
        </div>
        {stateContext.receivingCall ? (
          <>
            <TextComponent
              text={`Llamada entrante de ${stateContext.caller?.name}`}
              variant="h5"
              disableLocales
            />
            <div className="incoming__call__buttons">
              <Button
                text="Aceptar"
                variant="primary"
                onClick={answerCall}
                disableLocales
              />
              <Button
                text="Rechazar"
                variant="secondary"
                onClick={rejectCall}
                disableLocales
              />
            </div>
          </>
        ) : (
          <>
            {userSelected && (
              <>
                <TextComponent
                  text={
                    stateContext.callAccepted
                      ? "Llamada en curso"
                      : `Llamar a ${userSelected.first_name} ${userSelected.last_name}`
                  }
                  type="h4"
                  disableLocales
                />
                {stateContext.rejectedCall && (
                  <TextComponent
                    text="El usuario no esta disponible"
                    type="p"
                    disableLocales
                  />
                )}
                {!stateContext.callAccepted && (
                  <Button
                    type="primary"
                    onClick={() => callUser()}
                    text={
                      userToCall && userToCall.status === "online"
                        ? "Llamar"
                        : "El usuario no esta disponible"
                    }
                    disableLocales
                    loading={stateContext.calling}
                    disabled={userToCall && userToCall.status !== "online"}
                  />
                )}
              </>
            )}
          </>
        )}
        {stateContext.callAccepted && (
          <Button
            type="primary"
            onClick={() => leaveCall({ emit: true })}
            text="Finalizar"
            disableLocales
          />
        )}
      </div>
    </Modal>
  );
};
CallComponent.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  peerToCall: PropTypes.object,
};
CallComponent.defaultProps = {
  show: false,
  setShow: () => {},
  peerToCall: {},
};
