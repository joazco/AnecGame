import React from "react";
import { Toaster } from "react-hot-toast";
import { Loader } from "aneclibrary";

import SocketContext from "./contexts/SocketContext";
import Connected from "./pages/Connected";
import useApp from "./useApp";
import { socket } from "./hooks/useConfig";
import SignIn from "./pages/SignIn";

function App() {
  const {
    loadingConnection,
    connected,
    currUser,
    roomInfo,
    roomSave,
    connection,
  } = useApp(socket);

  return (
    <SocketContext.Provider value={{ socket, roomInfo, gamer: currUser }}>
      {loadingConnection && <Loader>Connexion</Loader>}
      {connected && currUser && <Connected save={roomSave} />}
      {!connected && <SignIn onConnection={connection} />}
      <Toaster />
    </SocketContext.Provider>
  );
}

export default App;
