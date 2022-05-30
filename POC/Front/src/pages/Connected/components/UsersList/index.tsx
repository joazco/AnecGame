import React, { useContext, useEffect, useCallback, useState } from "react";
import { AvatarList } from "aneclibrary";

import SocketContext from "../../../../contexts/SocketContext";
import { useSocket } from "../../../../hooks";
import { Gamer } from "../../../../types";
import { UsersListContainer } from "../../styles";

const UsersList = () => {
  const { socket } = useContext(SocketContext);
  const { listen } = useSocket(socket);

  const [users, setUsers] = useState<Gamer[]>([]);

  const onUpdateUsers = useCallback((data) => setUsers(data), []);

  useEffect(() => {
    listen({ onUpdateUsers });
  }, [listen, onUpdateUsers]);
  return (
    <UsersListContainer>
      <AvatarList users={users} />
    </UsersListContainer>
  );
};

export default UsersList;
