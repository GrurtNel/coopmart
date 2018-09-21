export function loadConfig() {
    var httpLocation = `${location.protocol}//${this.host}`;
    var wsLocation = location.protocol.startsWith('http') ? 'ws://' + this.host : 'wss://' + this.host;
    localStorage.setItem('feedback_http_host', httpLocation);
    localStorage.setItem('feedback_ws_host', wsLocation);
}