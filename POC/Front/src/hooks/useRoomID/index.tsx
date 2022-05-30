import useConfig from "../useConfig";

const useRoomID = () => {
  const { homeUrl } = useConfig();
  const {
    location: { search },
  } = window;
  const searchParams = new URLSearchParams(search);
  const roomID = searchParams.get("roomID");
  if (!roomID) {
    window.location.href = homeUrl;
    return "";
  }
  return roomID;
};

export default useRoomID;
