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

class CommandLoader {
	constructor() {
		this.defaultpath = true;
		this.pattern = /(\".*\")|(\S*)/;
		this.bracketp = /\"(.*)\"/;
		this.spattern = /^\s/;
	}

	parseCommand(cmd) {
		var list = cmd.split(this.pattern);
		var result = [];
		for (var i = 0; i < list.length; i++) {
			if(list[i] !== undefined && list[i].length > 0 && !this.spattern.test(list[i])) {
				if(this.bracketp.test(list[i])) {
					let ar = this.bracketp.exec(list[i]);

					result.push(ar[1]);
				}
				else {
					result.push(list[i]);
				}
			}
		}

		return result;
	}
}

module.exports = CommandLoader;
