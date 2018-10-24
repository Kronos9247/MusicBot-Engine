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

const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.js");
var restricted = config.restricted;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

/* Command Parser ====================> */
const Loader = require("./loader.js");
var loader = new Loader();

/* Begin Annoying Part ===============> */
const util = require("./features.js");
var features = new util.Features(client, config);
var target = null;

client.on('voiceStateUpdate', (oldState, newState) => {
    let user = newState.member;

    if(user !== undefined) {
        if(target !== null) {
            if(user.user.id == client.user.id) {
                let channel = target.voice.channel;

                if(!newState.channel) {
                    features.join(channel);
                }

                if(channel.id != newState.channel.id) features.rejoin(channel);

                return ;
            }

            if(user.id == target.id) {
                let channel = newState.channel;

                if(channel.id != oldState.channel.id) {
                    //channel changed
                    features.rejoin(channel);
                }
            }
        }
    }
});

client.on('message', (msg) => {
    if(msg.content.startsWith(config.command)) {
        var args = loader.parseCommand(msg.content);
        args.shift();

        /* CMD: Start */
        if(args[0] == "start") {
            let callback = function(error, state) {
                if(error === undefined || error === null) {
                    if(state == true) {
                        //access granted                        
                        let channel = msg.member.voice.channel;

                        if(channel) {
                            target = msg.member;

                            features.join(channel);
                            msg.reply("XD");
                        }
                        else {
                            msg.reply("You aren't in a voice channel!");
                        }
                    }
                    else {
                        console.log("Something has gone terribly wrong!");
                    }
                }
                else {
                    msg.reply("You dont have permissions to use this command!");
                }
            };

            if (msg.guild) {
                restricted(msg.member.client, "target-self", callback);
            }
            else {
                msg.reply("You aren't in a guild chat!");
            }
        }

        /* CMD: Stop */
        if(args[0] == "stop") {
            let callback = function(error, state) {
                if(error === undefined || error === null) {
                    if(state == true) {
                        target = null;

                        features.stop(msg.guild.id);
                        msg.reply("Stopped!");
                    }
                    else {
                        console.log("Something has gone terribly wrong!");
                    }
                }
                else {
                    msg.reply("You dont have permissions to use this command!");
                }
            };

            if (msg.guild) {
                restricted(msg.member.client, "stop", callback);
            }
            else {
                msg.reply("You aren't in a guild chat!");
            }
        }
    }
});

client.login(config.token);