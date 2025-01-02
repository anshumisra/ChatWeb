// import React, { useState, useCallback, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useVideoSocket } from "../context/SocketProvider";

// const LobbyScreen = () => {
//   const location = useLocation();
//   const { userName } = location.state || {};
//   const [email, setEmail] = useState(userName || "");
//   const [room, setRoom] = useState("");

//   const socket = useVideoSocket();
//   const navigate = useNavigate();

//   const handleSubmitForm = useCallback(
//     (e) => {
//       e.preventDefault();
//       socket.emit("room:join", { email, room });
//     },
//     [email, room, socket]
//   );

//   const handleJoinRoom = useCallback(
//     (data) => {
//       const { email, room } = data;
//       navigate(`/room/${room}`);
//     },
//     [navigate]
//   );

//   useEffect(() => {
//     socket.on("room:join", handleJoinRoom);
//     return () => {
//       socket.off("room:join", handleJoinRoom);
//     };
//   }, [socket, handleJoinRoom]);

//   return (
//     <div className="min-h-screen bg-stone-900 flex items-center justify-center">
//       <div className="bg-stone-800 p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h1 className="text-3xl font-bold text-yellow-400 mb-8 text-center">Join Video Room</h1>
//         <form onSubmit={handleSubmitForm} className="space-y-6">
//           <div>
//             <label htmlFor="email" className="block text-yellow-400 mb-2">Email ID</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 rounded-lg bg-stone-900 border border-yellow-500 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             />
//           </div>
//           <div>
//             <label htmlFor="room" className="block text-yellow-400 mb-2">Room ID</label>
//             <input
//               type="text"
//               id="room"
//               value={room}
//               onChange={(e) => setRoom(e.target.value)}
//               className="w-full px-4 py-2 rounded-lg bg-stone-900 border border-yellow-500 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-300"
//           >
//             Join Room
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LobbyScreen;