function FindProxyForURL(url, host) {
      if (host == "192.168.0.1") {
        return "DIRECT";
    }
    return "PROXY 192.168.50.210:8888; PROXY 192.168.0.1:8101; PROXY 192.168.0.1:8201; PROXY 192.168.0.1:8301; DIRECT";
}
