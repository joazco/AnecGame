const useAutoConnect = () => {
  const {
    location: { search, href },
  } = window;
  let urlWithoutAutoConnect = new URL(href);
  urlWithoutAutoConnect.searchParams.delete("autoConnect");
  const searchParams = new URLSearchParams(search);
  const autoConnect = searchParams.get("autoConnect");
  return { autoConnect, urlWithoutAutoConnect };
};

export default useAutoConnect;
