/**
 * UNUSED COMPONENT
 * feel free to remove
 */
import React, { useCallback, useEffect, useState } from "react";
import Video from "twilio-video";
import Participant from "./Participant";

interface Props {
  name: string;
  getToken: () => Promise<string>;
}

const Room: React.FC<Props> = ({ name, getToken }) => {
  const [connecting, setConnecting] = useState(false);
  const [room, setRoom] = useState<Video.Room>();
  const [participants, setParticipants] = useState<Array<Video.Participant>>(
    []
  );

  useEffect(() => {
    const participantConnected = (participant: Video.Participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant: Video.Participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    room?.on("participantConnected", participantConnected);
    room?.on("participantDisconnected", participantDisconnected);
    room?.participants.forEach(participantConnected);
    return () => {
      room?.off("participantConnected", participantConnected);
      room?.off("participantDisconnected", participantDisconnected);
    };
  }, [room]);

  useEffect(() => {
    connect();
  }, [name]);

  const connect = () => {
    setConnecting(true);
    getToken().then((token) => {
      Video.connect(token).then((room) => {
        setConnecting(false);
        setRoom(room);
      });
    });
  };

  const handleLogout = useCallback(() => {
    // @ts-ignore
    setRoom((prevRoom: Video.Room) => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach((trackPub) => {
          // @ts-ignore
          trackPub.track.stop();
        });
        prevRoom.disconnect();
      }
    });
  }, []);

  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} />
  ));

  return (
    <div className="room">
      <h2>Room: {name}</h2>
      <button onClick={handleLogout}>Log out</button>
      <div className="local-participant">
        {room ? (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
          />
        ) : (
          ""
        )}
      </div>
      <h3>Remote Participants</h3>
      <div className="remote-participants">{remoteParticipants}</div>
    </div>
  );
};

export default Room;
