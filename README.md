# alcoffeethmique



Logiciel d'algorithmique en CoffeeScript francisé.

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
