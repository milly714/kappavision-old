/// ts:ref=node.d.ts
/// <reference path="./defs/node.d.ts"/> ///ts:ref:generated

module twitch {
    export class Twitch {
        constructor(dataPath:string, reload:() => void) {
            this.dataPath = dataPath;
            this.reload = reload;
            //Attempt to load old login code and see if it's valid
            try {
                var fs = require('fs');
                this.login(fs.readFileSync(dataPath + 'session.txt', {
                    encoding: 'utf8'
                }));
            } catch (e) {
                //Don't care :D
            }
        }

        private twitchClientID = '8e5ym1sl2ztao9n7xg3g5w2fml95y4l';
        private dataPath:string;
        private reload:()=>void;
        private user:string = undefined;
        private oauth:string = undefined;
        //private https = require('https');
        private restler:any = require('restler');

        login(oauth:string) {
            this.oauth = oauth;
            this.get('/', (resp) => {
                console.log("Response: ", resp);
                if (resp.token && resp.token.valid) {
                    this.user = resp.token.user_name;
                    var fs = require('fs');
                    fs.writeFileSync(this.dataPath + 'session.txt', this.oauth);
                    this.reload();
                } else {
                    this.oauth = undefined;
                }
            });
        }

        loginUrl():string {
            return 'https://api.twitch.tv/kraken/oauth2/authorize' +
                '?response_type=token' +
                '&client_id=' + this.twitchClientID +
                '&redirect_uri=http://127.0.0.1:15257/twitchlogin.html' +
                '&scope=user_read+user_follows_edit+user_subscriptions+chat_login'
        }

        get loggedIn() {
            return this.oauth !== undefined;
        }

        get(url:string, cb:(data:any)=>void):any {
            var req = this.restler.get('https://api.twitch.tv/kraken' + url,
                {
                    query: {
                        'oauth_token': this.oauth
                    },
                    headers: {
                        'Accept': 'application/vnd.twitchtv.v3+json'//,
                        //'Authorization': 'OAuth ' + this.oauth
                    }
                });
            req.on('complete', (res) => {
                cb(res);
            });
            req.on('error', (e) => {
                this.oauth = undefined;
                //this.reload();
            });
            return req;
        }
    }
}

