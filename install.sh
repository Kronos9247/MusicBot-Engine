#!/bin/bash
ContinueCheck() {
	echo "Installing node_modules for" $1
	
	read -p "Continue (y/n)?" choice
	case "$choice" in
	  y|Y ) ;;
	  n|N ) exit;;
	  * ) echo "invalid";;
	esac
}

install() {
	npm install github:hydrabolt/discord.js
}

wininstall() {
	echo "Installing for windows ..."
	install
	
	npm install --save ffmpeg-binaries
	npm install opusscript
}

lininstall() {
	echo "Installing for linux ..."
	install
	
	read -p "ubuntu 16.04/14.04 (y/n)?" choice
	case "$choice" in
	  y|Y ) sudo apt install ffmpeg;;
	  n|N ) sudo apt-get install libav-tools;;
	  * ) echo "invalid";;
	esac
	
	sudo apt install ffmpeg
	npm install opusscript
}

macinstall() {
	echo "OSX is not supported at the moment!"
}

case "$OSTYPE" in
  darwin*)  ContinueCheck "OSX"; macinstall ;; 
  linux*)   ContinueCheck "LINUX"; lininstall ;;
  msys*)    ContinueCheck "WINDOWS"; wininstall ;;
  *)        ContinueCheck "unknown: $OSTYPE" ;;
esac

read -n 1 -s -r -p "Press any key to continue"
