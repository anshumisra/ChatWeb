import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Chat from './pages/chat';
//import LobbyScreen from './pages/Lobby';
//import RoomPage from './pages/Room';

function App() {
  return (
    <div className="bg-stone-900 min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        {/* <Route path="/video" element={<LobbyScreen />} /> */}
        {/* <Route path="/room/:roomId" element={<RoomPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
