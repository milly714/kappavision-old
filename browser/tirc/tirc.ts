/// ts:ref=node.d.ts
/// <reference path="../defs/node.d.ts"/> ///ts:ref:generated

import net = require("net");
import events = require("events");


export module tirc {
    export class TIRC extends events.EventEmitter {
        constructor(private host:string,
                    private port:number,
                    private nick:string,
                    private password:string) {
            super();
            this.sock = new net.Socket();
            this.sock.on('connect', this.onConnect);
            this.sock.on('close', this.connect); //Auto-reconnect!

            this.connect();
            setInterval(this.ircSendHandler, 1000);
        }

        private sock:net.Socket;
        private queue:string[];
        private msgPerMinute:number;
        private buff:string;

        connect() {
            this.sock.connect(this.port, this.host);
        }

        sendRaw(message:string) {
            this.queue.push(message.replace(/[\r\n]/, " "));
        }

        private onConnect() {
            this.sendRaw("NICK " + this.nick);
            this.sendRaw("PASS " + this.password);
        }

        private ircSendHandler() {
            if (this.queue.length > 0 && this.msgPerMinute < 20) {
                var msg = this.queue[0];
                this.queue = this.queue.slice(1);
                this.msgPerMinute++;
                this.sock.write(msg + '\r\n');

            }
        }
    }
}
