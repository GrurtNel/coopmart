import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

interface IPlatformSerialize {
    host?: string;
}

@Injectable()
export class HostConfig {
    data: { host: string, cetmHost: string } = { host: '', cetmHost: '' };
    constructor() {
        console.log(this.Http, this.CetmWebSocket);
    }
    private get actualHost() {
        // should not initialize with object
        return this.data.host || localStorage.getItem('feedback_host') || location.host;
    }

    Update(host: string) {
        this.data.host = host;
    }

    get Http() {
        return `${this.protocol}//${this.actualHost}`;
    }

    get WebSocket() {
        return `${this.wsProtocol}//${this.actualHost}`;
    }

    get CetmWebSocket() {
        return localStorage.getItem('cetm_socket') || environment.cetmWS;
    }

    private protocol = location.protocol;
    private ssl = this.protocol.startsWith("https");
    private wsProtocol = this.ssl ? "wss:" : "ws:";
}

