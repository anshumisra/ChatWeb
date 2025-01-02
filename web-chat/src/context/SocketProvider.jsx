import React, { createContext, useContext, useMemo } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);
//const VideoSocketContext = createContext(null);

// export const useVideoSocket = () => {
//   const socket = useContext(VideoSocketContext);
//   if (!socket) {
//     throw new Error('useVideoSocket must be used within a SocketProvider');
//   }
//   return socket;
// };

export const useChatSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error('useChatSocket must be used within a SocketProvider');
  }
  return socket;
};

export const SocketProvider = ({ children }) => {
  const chatSocket = useMemo(() => io('http://localhost:3000', {
    withCredentials: true,
    transports: ["websocket"],
  }), []);

  // const videoSocket = useMemo(() => io('http://localhost:3000', {
  //   withCredentials: true,
  // }), []);

  return (
    <SocketContext.Provider value={chatSocket}>
      {children}
      {/* <VideoSocketContext.Provider value={videoSocket}>
        {children}
      </VideoSocketContext.Provider> */}
    </SocketContext.Provider>
  );
};