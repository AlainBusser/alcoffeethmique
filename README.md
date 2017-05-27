# alcoffeethmique



Logiciel d'algorithmique en CoffeeScript francisé.


Pour programmer, [cliquer ici](https://alainbusser.github.io/alcoffeethmique/alcoffeethmique.html)


En bonus, [un petit utilitaire sur les fonctions](


La programmation est simple parce que c'est du CoffeeScript.

De nombreux exemples sont fournis avec, ils couvrent le programme de maths de la 2nde jusqu'au bac.

Par exemple, pour avoir un histogramme d'une variable exponentielle de paramètre 2, on peut faire


	X = (lambda) ->
		-ln(alea())/lambda
	
	varExpo = (X(2) pour n dans [1..1000])
	
	histogramme varExpo, 0, 3, 15, 500


En vertu de 

* la concision du langage
* la possibilité de faire du copier-coller entre la fenêtre de script et Libre Office Writer
* la possibilité de faire du copier-coller entre la fenêtre de sortie et Libre Office Writer
* l'export graphique au format svg,

il est possible de rédiger, à l'aide de Libre Office Writer, le rapport de TP, pendant le TP.


La géométrie se fait à l'aide de sylvester.js. Pour la syntaxe:

* [les points et vecteurs](https://alainbusser.github.io/alcoffeethmique/Vector.html)
* [les droites](https://alainbusser.github.io/alcoffeethmique/Lines.html)
* [les plans](https://alainbusser.github.io/alcoffeethmique/Planes.html)
* [les matrices](https://alainbusser.github.io/alcoffeethmique/Matrix.html)

Pour connaître la liste des fonctions d'alcoffeethmique, faire

	affiche (f for f of this)
	

Et pour rigoler, faire

	affiche affiche
