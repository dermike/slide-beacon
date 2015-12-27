(function slidebeacon() {
  if (typeof WebSocket === 'undefined' && typeof MozWebSocket !== 'undefined') {
    WebSocket = MozWebSocket;
  }

  function getUrl() {
    var slideElement = Reveal.getCurrentSlide(),
      url = slideElement.getAttribute('data-url');
    if (url && ws) {
      ws.send(url);
    }
  }

  Reveal.addEventListener('ready', function ready() {
    var server = prompt('Enter slide beacon host/ip', 'localhost');
    server = server || 'localhost';

    ws = new WebSocket('ws://' + server + ':1234/');
    ws.onopen = function onopen() {
      console.log('Connected to beacon-server');
      getUrl();
    };
    ws.onmessage = function onmessage(event) {
      console.log(event.data);
    };
    ws.onclose = function onclose() {
      ws = null;
      console.log('Connection closed');
    };
    ws.onerror = function onerror() {
      console.log('Received error');
    };
  });

  Reveal.addEventListener('slidechanged', getUrl);
})();
