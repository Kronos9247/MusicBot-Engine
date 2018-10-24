/*
    MusicBot-Engine: A simple bot base for annoying music bots
    Copyright (C) 2018  Rafael Orman

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see <https://www.gnu.org/licenses/>.
*/

class Features {
    constructor(bot, config) {
        this.bot = bot;
        this.config = config;

        this.getdispatcher = null;
    }

    destroy() {
        if(!this.getdispatcher) return ;

        let dispatcher = this.getdispatcher();
        if(dispatcher) {
            dispatcher.destroy();

            //this.getdispatcher = null;
        }

        this.getdispatcher = null; //need to be here otherwise i can get stuck in an infinit loop
    }

    getPlayTime() {
        if(!this.getdispatcher) return ;

        let dispatcher = this.getdispatcher();
        if(!dispatcher) return ;

        return dispatcher.streamTime;
    }

    defaults() {
        let options = {};
        let time = this.getPlayTime();

        if(time) options["seek"] = time / 1000; //conversion from milliseconds to seconds

        return options;
    }

    stop() {
        this.destroy();
    }

    rejoin(channel, options) {
        let opts = options;//{seek: 10};
        if(this.getdispatcher) {
            const autostart = this.defaults();

            if(!opts) opts = autostart;
            else {
                opts = Object.assign(autostart, opts);
            }
        }

        if(this.getdispatcher) this.destroy(); //function to stop the music dispatcher
        //this.getdispatcher = null;
        this.join(channel, opts);
    }

    join(channel, options) {
        if(this.getdispatcher) {
            this.rejoin(channel, options);

            return ;
        }

        if(channel.joinable == true) {
            var callback = function(connection) {
                const dispatcher = connection.play(this.config.song, options);
                this.getdispatcher = () => {
                    //dispatcher.destroy();
                    return dispatcher;
                };
                
                //console.log('Connected!'); //just here for debug purposes
            };
            callback = callback.bind(this);

            channel.join()
                .then(callback)
                .catch(console.error);
        }
        else {
            //bot cant join the channel
            console.log(`Bot cant join the channel with the name: ${channel.name}!`);
        }
    }

    stop(guildId) {
        this.destroy();

        let connections = this.bot.voiceConnections;
        let connection = connections.get(guildId);
        
        if(connection)
            connection.disconnect();
    }
}

module.exports = {
    "Features": Features
};