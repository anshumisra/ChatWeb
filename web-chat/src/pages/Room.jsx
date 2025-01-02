// import React, { useEffect, useCallback, useState } from "react";
// import ReactPlayer from "react-player";
// import peer from "../service/peer";
// import { useVideoSocket } from "../context/SocketProvider";
// import { Video, Phone } from 'lucide-react';

// const RoomPage = () => {
//   const socket = useVideoSocket();
//   const [remoteSocketId, setRemoteSocketId] = useState(null);
//   const [myStream, setMyStream] = useState();
//   const [remoteStream, setRemoteStream] = useState();

//   const handleUserJoined = useCallback(({ email, id }) => {
//     console.log(`Email ${email} joined room`);
//     setRemoteSocketId(id);
//   }, []);

//   const handleCallUser = useCallback(async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({
//       audio: true,
//       video: true,
//     });
//     const offer = await peer.getOffer();
//     socket.emit("user:call", { to: remoteSocketId, offer });
//     setMyStream(stream);
//   }, [remoteSocketId, socket]);

//   const handleIncommingCall = useCallback(
//     async ({ from, offer }) => {
//       setRemoteSocketId(from);
//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: true,
//         video: true,
//       });
//       setMyStream(stream);
//       console.log(`Incoming Call`, from, offer);
//       const ans = await peer.getAnswer(offer);
//       socket.emit("call:accepted", { to: from, ans });
//     },
//     [socket]
//   );

//   const sendStreams = useCallback(() => {
//     for (const track of myStream.getTracks()) {
//       peer.peer.addTrack(track, myStream);
//     }
//   }, [myStream]);

//   const handleCallAccepted = useCallback(
//     ({ from, ans }) => {
//       peer.setLocalDescription(ans);
//       console.log("Call Accepted!");
//       sendStreams();
//     },
//     [sendStreams]
//   );

//   const handleNegoNeeded = useCallback(async () => {
//     const offer = await peer.getOffer();
//     socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
//   }, [remoteSocketId, socket]);

//   useEffect(() => {
//     peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
//     return () => {
//       peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
//     };
//   }, [handleNegoNeeded]);

//   const handleNegoNeedIncomming = useCallback(
//     async ({ from, offer }) => {
//       const ans = await peer.getAnswer(offer);
//       socket.emit("peer:nego:done", { to: from, ans });
//     },
//     [socket]
//   );

//   const handleNegoNeedFinal = useCallback(async ({ ans }) => {
//     await peer.setLocalDescription(ans);
//   }, []);

//   useEffect(() => {
//     peer.peer.addEventListener("track", async (ev) => {
//       const remoteStream = ev.streams;
//       console.log("GOT TRACKS!!");
//       setRemoteStream(remoteStream[0]);
//     });
//   }, []);

//   useEffect(() => {
//     socket.on("user:joined", handleUserJoined);
//     socket.on("incomming:call", handleIncommingCall);
//     socket.on("call:accepted", handleCallAccepted);
//     socket.on("peer:nego:needed", handleNegoNeedIncomming);
//     socket.on("peer:nego:final", handleNegoNeedFinal);

//     return () => {
//       socket.off("user:joined", handleUserJoined);
//       socket.off("incomming:call", handleIncommingCall);
//       socket.off("call:accepted", handleCallAccepted);
//       socket.off("peer:nego:needed", handleNegoNeedIncomming);
//       socket.off("peer:nego:final", handleNegoNeedFinal);
//     };
//   }, [
//     socket,
//     handleUserJoined,
//     handleIncommingCall,
//     handleCallAccepted,
//     handleNegoNeedIncomming,
//     handleNegoNeedFinal,
//   ]);

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-stone-900 p-4">
//       <div className="w-full max-w-4xl mb-6">
//         <div className="text-yellow-400 text-2xl font-bold mb-4">
//           Video Room Status: {remoteSocketId ? "Connected" : "Waiting for peer"}
//         </div>
        
//         <div className="flex gap-4 mb-6">
//           {myStream && (
//             <button
//               onClick={sendStreams}
//               className="px-6 py-2 rounded-full bg-yellow-500 text-gray-900 font-semibold transition-colors duration-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 flex items-center"
//             >
//               <Video size={18} className="mr-2" />
//               Send Stream
//             </button>
//           )}
          
//           {remoteSocketId && (
//             <button
//               onClick={handleCallUser}
//               className="px-6 py-2 rounded-full bg-yellow-500 text-gray-900 font-semibold transition-colors duration-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 flex items-center"
//             >
//               <Phone size={18} className="mr-2" />
//               Call Peer
//             </button>
//           )}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {myStream && (
//             <div className="bg-stone-800 p-4 rounded-lg">
//               <h2 className="text-yellow-400 text-xl font-semibold mb-4">My Stream</h2>
//               <div className="rounded-lg overflow-hidden">
//                 <ReactPlayer
//                   playing
//                   muted
//                   height="300px"
//                   width="100%"
//                   url={myStream}
//                 />
//               </div>
//             </div>
//           )}
          
//           {remoteStream && (
//             <div className="bg-stone-800 p-4 rounded-lg">
//               <h2 className="text-yellow-400 text-xl font-semibold mb-4">Remote Stream</h2>
//               <div className="rounded-lg overflow-hidden">
//                 <ReactPlayer
//                   playing
//                   muted
//                   height="300px"
//                   width="100%"
//                   url={remoteStream}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoomPage;