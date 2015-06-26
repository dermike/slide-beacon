(function() {
  
  if ((typeof(WebSocket) == 'undefined') && (typeof(MozWebSocket) != 'undefined')) {
    WebSocket = MozWebSocket;
  }
  
  function getUrl(slide) {
    var slideElement = Reveal.getCurrentSlide();
    var url = slideElement.getAttribute('data-url');
    if (url && ws) {
      ws.send(url);
    }
  }
  
  Reveal.addEventListener('ready', function() {
    var server = prompt('Enter slide beacon host/ip', 'localhost');
    server = server || 'localhost';
    
    ws = new WebSocket('ws://' + server + ':1234/');
    ws.onopen = function(event) {
      console.log('Connected to beacon-server');
      getUrl();
    };
    ws.onmessage = function(event) {
      console.log(event.data);
    }
    ws.onclose = function(event) {
      ws = null;
      console.log('Connection closed');
    };
    ws.onerror = function(event) {
      console.log('Received error');
    };
  });
  
  Reveal.addEventListener('slidechanged', getUrl);
  
})();
