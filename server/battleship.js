"use strict"
var sh = {};
var ld = require('lodash');
exports.sh = sh;

sh.Ship = function(name,holes){
	this.name =  name;
	this.holes = holes;
	Object.defineProperties(this,{
		name:{writable:false},
		holes:{writable:false}
	});
};

sh.Ship.prototype = {
	hittedHoles : function (shipName) {},
	isSunk : function (shipName) {}
};

sh.Player = function(player_name){
	this.name = player_name;
	var holes = [4,5,3,2,3];
	this.fleet =[ 'battleship', 'carrier', 'cruiser', 'distroyer', 'submarine' ].map(function(name,i){
		return new sh.Ship(name,holes[i]);
	});
};

sh.Player.prototype = {
};

sh.isValid = function(pos){
	return ld.inRange(parseInt(pos.slice(1)),1,11) && ld.inRange(pos[0].charCodeAt(),65,75);
};
sh.notDeployedDiagonally = function(position){
	return function(pos,index){
		return (position[0][0]==pos[0]) || (parseInt(pos.slice(1))==+position[0].slice(1));
	};
}
sh.observer =  {
	validatePosition : function(shipName,position){
		var shipsSize = {battleship:4, carrier:5, cruiser:3, distroyer:2, submarine:3};
		var validPositon = position.every(sh.isValid);
		var alignment = position.every(sh.notDeployedDiagonally(position));
		var validSize = position.length == shipsSize[shipName];
		return	validPositon && alignment && validSize;
	}
};






