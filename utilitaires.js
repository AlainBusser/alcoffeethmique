// interpréteur coffeescript
// logiciel libre, sous licence CeCILL:
// http://www.cecill.info/licences/Licence_CeCILL_V2-fr.txt
// Auteurs:
// Alain Busser
// Florian Tobé
//
var affiche=function(x){
   	$('#cadrout').append('\n'+calligraphique(x.toString()));
}
var entre=function(c){
	var essai=prompt(c,dé(10));
	return parseFloat(essai);
}
var pi=Math.PI;
var alea=function(){
	return Math.random();
}
var dé=function(n){
	if (n==Math.floor(n) && n>0){
		return Math.ceil(alea()*n);
	} else {
		return Number.NaN;
	}
}
var abs=function(x){
	return Math.abs(x);
}
var LaValeurAbsolueDe =function(x){
	return Math.abs(x);
}
var racine=function(x){
	return Math.sqrt(x);
}
var laRacineDe=function(x){
	return Math.sqrt(x);
}
var puissance=function(x,p){
	return Math.pow(x,p);
}
var àLaPuissance=function(x,p){
	return Math.pow(x,p);
}
var carré=function(x){
	return puissance(x,2);
}
var leCarréDe=function(x){
	return puissance(x,2);
}
var cube=function(x){
	return puissance(x,3);
}
var leCubeDe=function(x){
	return puissance(x,3);
}
var inverse=function(x){
	return 1/x;
}
var lInverseDe=function(x){
	return 1/x;
}
var ln=function(x){
	return Math.log(x);
}
var leLogarithmeDe=function(x){
	return Math.log(x);
}
var exp=function(x){
	return Math.exp(x);
}
var lExponentielleDe=function(x){
	return Math.exp(x);
}
var cos=function(x){
	return Math.cos(x);
}
var cosinus=function(x){
	return Math.cos(x/180*pi);
}
var leCosinusDe=function(x){
	return Math.cos(x/180*pi);
}
var sin=function(x){
	return Math.sin(x);
}
var sinus=function(x){
	return Math.sin(x/180*pi);
}
var leSinusDe=function(x){
	return Math.sin(x/180*pi);
}
var tan=function(x){
	return Math.tan(x);
}
var tangente=function(x){
	return Math.tan(x/180*pi);
}
var laTangenteDe=function(x){
	return Math.tan(x/180*pi);
}
var arccos=function(x){
	return Math.acos(x);
}
var cosinusInverse=function(x){
	return Math.acos(x)*180/pi;
}
var arcsin=function(x){
	return Math.asin(x);
}
var sinusInverse=function(x){
	return Math.asin(x)*180/pi;
}
var arctan=function(x){
	return Math.atan(x);
}
var tangenteInverse=function(x){
	return Math.atan(x)*180/pi;
}
var arrondi=function(x){
	return Math.round(x);
}
var troncature=function(x){
	return Math.floor(x);
}
var arrondiSup=function(x){
	return Math.ceil(x);
}

var  traduction = function(dutexte) {
    var texte;
    texte = dutexte;
    texte = texte.replace(/\ n\'est\ pas\ dans\ /g, " not in ");
    texte = texte.replace(/\ dans\ /g, " in ");
    texte = texte.replace(/\ et\ /g, " and ");
    texte = texte.replace(/\ ou\ /g, " or ");
    texte = texte.replace(/\ par\ pas\ de\ /g, " by ");
    texte = texte.replace(/\ est\ différent\ de\ /g, " isnt ");
    texte = texte.replace(/\ n\'est\ pas\ égal\ à\ /g, " isnt ");
    texte = texte.replace(/\ n\'est\ pas\ /g, " isnt ");
    texte = texte.replace(/à\ moins\ que\ /g, "unless ");
    texte = texte.replace(/\ est\ égal\ à\ /g, " is ");
    texte = texte.replace(/selon\ /g, "switch ");
    texte = texte.replace(/pour\ /g, "for ");
    texte = texte.replace(/Pour\ /g, "for ");
    texte = texte.replace(/Sinon/g, "else");
    texte = texte.replace(/sinon/g, "else");
    texte = texte.replace(/Si\ /g, "if ");
    texte = texte.replace(/si\ /g, "if ");
    texte = texte.replace(/quand\ /g, "when ");
    texte = texte.replace(/empile\ /g, "push ");
    texte = texte.replace(/\ nouvelle\ /g, " new ");
    texte = texte.replace(/\ nouvel\ /g, " new ");
    texte = texte.replace(/\ nouveau\ /g, " new ");
    texte = texte.replace(/Tant que\ /g, "while ");
    texte = texte.replace(/tant que\ /g, "while ");
    texte = texte.replace(/Jusqu'à ce que\ /g, "until ");
    texte = texte.replace(/jusqu'à ce que\ /g, "until ");
    texte = texte.replace(/\ devient\ /g, " = ");
    texte = texte.replace(/:=/g, " = ");
    return texte;
  };

