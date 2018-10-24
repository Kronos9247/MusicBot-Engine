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

module.exports = {
    "token": "the access token from your bot",
    "command": "!bot for example",
    "song": "./your song.mp3",

    "restricted": function(client, operation, callback) { //access callback for restricted functionalaties
        //var id = client.user.avatar;
        //callback(null, id == "your user-id");
		
		callback(null, true);
    }
}