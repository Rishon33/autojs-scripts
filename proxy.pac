function FindProxyForURL(url, host) {
      if (dnsDomainIs(host, "192.168.0.1") || dnsDomainIs(host, "192.168.50.210")) {
        return "DIRECT";
    };
      if (shExpMatch(host, "*.youth.cn")){
	return "PROXY 192.168.0.1:8101; PROXY 192.168.0.1:8201; PROXY 192.168.0.1:8301;";
      }
    return "PROXY 192.168.50.210:8888; PROXY 192.168.0.1:8101; PROXY 192.168.0.1:8201; PROXY 192.168.0.1:8301; DIRECT";
}
