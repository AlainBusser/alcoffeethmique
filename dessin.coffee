SVG = (tag) ->
    document.createElementNS('http://www.w3.org/2000/svg', tag)

reflets = """
	<defs id="SVGdefs">
	<linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
	<stop offset="0%" stop-color="gray" />
	<stop offset="80%" stop-color="black" />
	</linearGradient>
	<marker id="pointe" viewBox="0 0 10 10" refX="0" refY="5" markerUnits="strokeWidth" markerWidth="8" markerHeight="6" orient="auto">
	<path d="M 0 0 L 10 5 L 0 10 z" fill="url(#metal)" />
	</marker>
	<radialGradient id="coque"  cx="0.5" cy="0.5" r="0.5" fx="0.25" fy="0.25">
	<stop offset="0%" stop-color="white" />
	<stop offset="80%" stop-color="brown" />
	<stop offset="100%" stop-color="black" />
	</radialGradient>
	<radialGradient id="bille" cx="0.5" cy="0.5" r="0.5" fx="0.25" fy="0.25">
	<stop offset="0%" stop-color="white" />
	<stop offset="75%" stop-color="blue" />
	<stop offset="100%" stop-color="black" />
	</radialGradient>
	</defs>
	"""
    
effaceDessin = () ->
    dessin = $("#leSVG")
    dessin.empty().prepend(reflets)

dessineSegment = (x1=0,y1=0,x2=1,y2=1,couleur='black') ->
    dessin = $("#leSVG")
    $(SVG('line'))
        .attr('x1',x1)
        .attr('y1',y1)
        .attr('x2',x2)
        .attr('y2',y2)
        .attr('stroke',couleur)
        .attr('stroke-width',1)
        .appendTo(dessin)

dessineRectangle = (x=0,y=0,largeur=5,hauteur=40,couleur='blue') ->
    dessin = $("#leSVG")
    $(SVG('rect'))
        .attr('x',x)
        .attr('y',y)
        .attr('width',largeur)
        .attr('height',hauteur)
        .attr('fill',couleur)
        .attr('fill-opacity',0.4)
        .attr('stroke',couleur)
        .attr('stroke-width',1)
        .appendTo(dessin)

dessineCercle = (cx=0,cy=0,r=5,couleur='red') ->
    dessin = $("#leSVG")
    $(SVG('circle'))
        .attr('cx',cx)
        .attr('cy',cy)
        .attr('r',r)
        .attr('fill',couleur)
        .attr('fill-opacity',0.4)
        .attr('stroke',couleur)
        .attr('stroke-width',1)
        .appendTo(dessin)

dessinePoint = (cx=0, cy=0, r=4) ->
	dessin = $("#leSVG")
	$(SVG('circle'))
		.attr('cx',cx)
		.attr('cy',cy)
		.attr('r',r)
		.attr('fill','url(#bille)')
		.appendTo dessin

dessineEllipse = (cx=100, cy=200, rx=100, ry=200, couleur="brown") ->
	dessin = $("#leSVG")
	$(SVG('ellipse'))
		.attr('cx',cx)
		.attr('cy',cy)
		.attr('rx',rx)
		.attr('ry',ry)
		.attr('stroke',couleur)
		.attr('fill',couleur)
		.attr('fill-opacity',0.4)
		.attr('stroke-width',1)
		.appendTo dessin

dessinePolygone = (liste=[[0,0], [300,100],[100,300]], couleur='green', rempli=none) ->
    dessin = $("#leSVG")
    chemin = "M"+liste[0]
    chemin += " L"+liste[k] for k in [1...liste.length]
    chemin += " L"+liste[0]
    $(SVG('path'))
        .attr('d',chemin)
        .attr('stroke',couleur)
        .attr('stroke-width',1)
        .attr('fill',rempli)
        .attr('fill-opacity',0.4)
        .appendTo(dessin)

dessineTexte = (texte,x=20,y=20,couleur='black') ->
    dessin = $("#leSVG")
    $(SVG('text'))
        .attr('x',x)
        .attr('y',y)
        .attr('fill',couleur)
        .text(texte)
        .appendTo(dessin)



diagrammeBatons = (dico, ech=400) ->
    nombreBatons = (x for x of dico).length
    effaceDessin()
    dessineSegment 20, 440, 620, 440, 'black'
    abscisse = 40-600/nombreBatons
    for x of dico
        abscisse += 600/nombreBatons
        hauteur = 400/ech*dico[x]
        dessineRectangle abscisse, 440-hauteur, 5, hauteur, 'blue'
        dessineTexte x, abscisse, 460, 'black'
    $("#sortieSVG").text $("#graphique").html()


diagrammeBatonsTrie = (dico, ech=400) ->
    nombreBatons = (x for x of dico when x<Infinity).length
    dicotrie=(parseFloat x for x of dico when x<Infinity).sort (x,y)-> x-y
    effaceDessin()
    dessineSegment 20, 440, 620, 440, 'black'
    abscisse = 40-600/nombreBatons
    for x in dicotrie
        abscisse += 600/nombreBatons
        hauteur = 400/ech*dico[x]
        dessineRectangle abscisse, 440-hauteur, 5, hauteur, 'blue'
        dessineTexte x.toString().replace(".",","), abscisse, 460, 'black'
    $("#sortieSVG").text $("#graphique").html()



histogramme = (tableau, a=0, b=1, N=10, ech=400) ->
    pas = (b-a)/N
    effaceDessin()
    dessineSegment 20, 440, 620, 440, 'black'
    abscisse = 20
    for x in [a...b] by pas
        x = (Math.round 1000*x)/1000
        abscisse += 500/N
        _s = 0
        _s++ for i in [0..tableau.length] when x <= tableau[i] < x+pas
        hauteur = 400/ech*_s
        dessineRectangle abscisse, 440-hauteur, 500/N, hauteur, 'blue'
        dessineTexte x.toString().replace(".",","), abscisse, 460, 'black'
    $("#sortieSVG").text $("#graphique").html()

arrOdg = (x,e) -> 
    p10 = Math.pow 10, e
    arrondi(x*p10)/p10

arrInfOdg = (x,e) -> 
    p10 = Math.pow 10, e
    troncature(x*p10)/p10

arrSupOdg = (x,e) -> 
    p10 = Math.pow 10, e
    arrondiSup(x*p10)/p10

dessineAxeX = (xMin=0, xMax=1, couleur='black') ->
    dessineSegment 40, 440, 620, 440, couleur
    dessineSegment 620, 440, 610, 435, couleur
    dessineSegment 620, 440, 610, 445, couleur
    odg = 1 - arrondi ln(xMax-xMin)/Math.LN10
    abscisse = 40
    nombreSegments = arrSupOdg(xMax,odg)-arrInfOdg(xMin,odg)
    xGrad=arrInfOdg xMin, odg
    while xGrad <= arrSupOdg xMax, odg
        if arrOdg(xGrad,odg+1) is arrOdg(xGrad,odg)
            dessineTexte arrOdg(xGrad,odg).toString().replace(".",","), abscisse, 470, couleur
            dessineSegment abscisse, 440, abscisse, 450, couleur
        else
            if arrOdg(xGrad,odg+1).toString()[-1..] is "5"
                dessineSegment abscisse, 440, abscisse, 447, couleur
            else
                dessineSegment abscisse, 440, abscisse, 444, couleur
        xGrad += puissance 10, -odg-1
        abscisse += 500/nombreSegments*(puissance 10, -odg-1)

dessineAxeY = (yMin=0, yMax=1, couleur='black') ->
    dessineSegment 40, 440, 40, 20, couleur
    dessineSegment 40, 20, 35, 30, couleur
    dessineSegment 40, 20, 45, 30, couleur
    odg = 1 - arrondi ln(yMax-yMin)/Math.LN10
    ordonnee = 440
    nombreSegments = arrSupOdg(yMax,odg)-arrInfOdg(yMin,odg)
    yGrad=arrInfOdg yMin, odg
    while yGrad <= arrSupOdg yMax, odg
        if arrOdg(yGrad,odg+1) is arrOdg(yGrad,odg)
            dessineTexte arrOdg(yGrad,odg).toString().replace(".",","), 10, ordonnee, couleur
            dessineSegment 40, ordonnee, 30, ordonnee, couleur
        else
            if arrOdg(yGrad,odg+1).toString()[-1..] is "5"
                dessineSegment 40, ordonnee, 33, ordonnee, couleur
            else
                dessineSegment 40, ordonnee, 36, ordonnee, couleur
        yGrad += puissance 10, -odg-1
        ordonnee -= 400/nombreSegments*(puissance 10, -odg-1)

dessineAxes = (xMin=0, xMax=1, yMin=0, yMax=1, couleur='black') ->
    dessineAxeX xMin, xMax, couleur
    dessineAxeY yMin, yMax, couleur

dessineFonction = (fonction,xMin=0,xMax=1,yMin=0, yMax=1, couleur='red') ->
    effaceDessin()
    dessineAxes xMin, xMax, yMin, yMax, 'black'
    odgX = 1 - arrondi ln(xMax-xMin)/Math.LN10
    odgY = 2 - arrondi ln(yMax-yMin)/Math.LN10
    xGrad = arrInfOdg xMin, odgX
    yGrad = arrInfOdg yMin, odgY
    echX = 50/(arrSupOdg(xMax,odgX)-arrInfOdg(xMin,odgX))
    echY = 400/(arrSupOdg(yMax,odgY)-arrInfOdg(yMin,odgY))
    [abscisse,ordonnee] = [40,440]
    for x in [40...540]
        dessineSegment x, 440+echY*yGrad-echY*fonction(xMin+(x-40)/500*(xMax-xMin)), x+1, 440+echY*yGrad-echY*fonction(xMin+(x-39)/500*(xMax-xMin)), couleur
    $("#sortieSVG").text $("#graphique").html()


dessineSuite = (suite=[1..20], N=20, yMin=-1, yMax=1, rayon=5, couleur='red') ->
    effaceDessin()
    dessineAxes 0, N, yMin, yMax, 'black'
    odgX = 1 - arrondi ln(N)/Math.LN10
    odgY = 2 - arrondi ln(yMax-yMin)/Math.LN10
    xGrad = 0
    yGrad = arrInfOdg yMin, odgY
    echX = 500/arrSupOdg(N,odgX)
    echY = 400/(arrSupOdg(yMax,odgY)-arrInfOdg(yMin,odgY))
    [abscisse,ordonnee] = [40,440]
    while xGrad <= arrSupOdg N, odgX
        dessineCercle abscisse, 440+echY*yGrad-echY*suite[xGrad], rayon, couleur
        xGrad++
        abscisse += echX
    $("#sortieSVG").text $("#graphique").html()
    

dessineSuite3D = (suite=[1..20], N=20, yMin=-1, yMax=1, rayon=5, couleur='red') ->
    effaceDessin()
    dessineAxes 0, N, yMin, yMax, 'black'
    odgX = 1 - arrondi ln(N)/Math.LN10
    odgY = 2 - arrondi ln(yMax-yMin)/Math.LN10
    xGrad = 0
    yGrad = arrInfOdg yMin, odgY
    echX = 500/arrSupOdg(N,odgX)
    echY = 400/(arrSupOdg(yMax,odgY)-arrInfOdg(yMin,odgY))
    [abscisse,ordonnee] = [40,440]
    while xGrad <= arrSupOdg N, odgX
        dessinePoint abscisse, 440+echY*yGrad-echY*suite[xGrad], rayon
        xGrad++
        abscisse += echX
    $("#sortieSVG").text $("#graphique").html()
    

dessineVoronoi = (listePoints, couleurTraits = 'darkBlue', rayon = 3, couleurPoints = 'darkRed', dessinerPoints = true) ->
    effaceDessin()
    sites = []
    for point in listePoints
        if dessinerPoints
            dessineCercle point[0], point[1], rayon, couleurPoints
        sites.push {x: point[0], y: point[1]}
    bbox = {xl:0, xr:640, yt:0, yb:480}
    voronoi = new Voronoi()
    resultV = voronoi.compute sites, bbox
    for arete in resultV.edges
        dessineSegment arete.va.x, arete.va.y, arete.vb.x, arete.vb.y, couleurTraits    
    $("#sortieSVG").text $("#graphique").html()


dessineVoronoi3D = (listePoints, couleurTraits = 'darkBlue', rayon = 3, dessinerPoints = true) ->
    sites = []
    for point in listePoints
        if dessinerPoints
            dessinePoint point[0], point[1], rayon
        sites.push {x: point[0], y: point[1]}
    bbox = {xl:0, xr:640, yt:0, yb:480}
    voronoi = new Voronoi()
    resultV = voronoi.compute sites, bbox
    for arete in resultV.edges
        dessineSegment arete.va.x, arete.va.y, arete.vb.x, arete.vb.y, couleurTraits    
    $("#sortieSVG").text $("#graphique").html()



patate = (S,Cx=320,couleur='brown') ->
    Dy = 320/S.cardinal()
    Rx = _.max (x.toString().length for x in S.support)
    Rx *= 40
    Hy = 80+Dy/2
    for elt in S.support
        dessineCercle Cx-Rx/4, Hy, 4, couleur
        dessineTexte elt, Cx, Hy, couleur
        Hy += Dy
    dessineEllipse Cx, 240, Rx, 200, couleur


patates = (S1,S2,Cx=320,c1='blue',c2='red') ->
    S12 = S1.inter S2
    Sc1 = S2.complémentDans S1
    Sc2 = S1.complémentDans S2
    Dy = 320/_.max([Sc1.cardinal(),Sc2.cardinal(),S12.cardinal()])
    Rx1 = _.max (x.toString().length for x in S1.support)
    Rx2 = _.max (x.toString().length for x in S2.support)
    Rx = _.max [Rx1,Rx2]
    Rx *= 40
    Hy = 80+Dy/2
    for elt in Sc1.support
        dessineCercle Cx-2*Rx, Hy, 4, c1
        dessineTexte elt, Cx-1.8*Rx, Hy, c1
        Hy += Dy
    Hy = 80+Dy/2
    for elt in Sc2.support
        dessineCercle Cx+2*Rx, Hy, 4, c2
        dessineTexte elt, Cx+2.2*Rx, Hy, c2
        Hy += Dy
    Hy = 120+Dy/2
    for elt in S12.support
        dessineCercle Cx, Hy, 4, 'black'
        dessineTexte elt, Cx+0.2*Rx, Hy, 'black'
        Hy += Dy
    dessineEllipse Cx-1.5*Rx, 240, 2.5*Rx, 200, c1
    dessineEllipse Cx+1.5*Rx, 240, 2.5*Rx, 200, c2

ellipse = (cx=100, cy=200, rx=100, ry=200, couleur="brown", alpha=0.3) ->
	dessin = $("#leSVG")
	$(SVG('ellipse'))
		.attr('cx',cx)
		.attr('cy',cy)
		.attr('rx',rx)
		.attr('ry',ry)
		.attr('stroke',couleur)
		.attr('fill','url(#coque)')
		.attr('fill-opacity',alpha)
		.attr('stroke-width',1)
		.appendTo dessin



patate3D = (S,Cx=320,couleur='brown',alpha=0.3) ->
    Dy = 320/S.cardinal()
    Rx = _.max (x.toString().length for x in S.support)
    Rx *= 40
    Hy = 80+Dy/2
    for elt in S.support
        dessinePoint Cx-Rx/4, Hy, 4
        dessineTexte elt, Cx, Hy, couleur
        Hy += Dy
    ellipse Cx, 240, Rx, 200, couleur, alpha


patates3D = (S1,S2,Cx=320) ->
    S12 = S1.inter S2
    Sc1 = S2.complémentDans S1
    Sc2 = S1.complémentDans S2
    Dy = 320/_.max([Sc1.cardinal(),Sc2.cardinal(),S12.cardinal()])
    Rx1 = _.max (x.toString().length for x in S1.support)
    Rx2 = _.max (x.toString().length for x in S2.support)
    Rx = _.max [Rx1,Rx2]
    Rx *= 40
    Hy = 80+Dy/2
    for elt in Sc1.support
        dessinePoint Cx-2*Rx, Hy, 4
        dessineTexte elt, Cx-1.8*Rx, Hy
        Hy += Dy
    Hy = 80+Dy/2
    for elt in Sc2.support
        dessinePoint Cx+2*Rx, Hy, 4
        dessineTexte elt, Cx+2.2*Rx, Hy
        Hy += Dy
    Hy = 120+Dy/2
    for elt in S12.support
        dessinePoint Cx, Hy, 4
        dessineTexte elt, Cx+0.2*Rx, Hy
        Hy += Dy
    ellipse Cx-1.5*Rx, 240, 2.5*Rx, 200, "blue"
    ellipse Cx+1.5*Rx, 240, 2.5*Rx, 200, "red"

flèche = (x1,y1,x2,y2,grosseur=2,couleur="black") ->
    dessin = $("#leSVG")
    $(SVG('line'))
        .attr('x1',x1)
        .attr('y1',y1)
        .attr('x2',x2)
        .attr('y2',y2)
        .attr('stroke',couleur)
        .attr('stroke-width',grosseur)
        .attr('marker-end','url(#pointe)')
        .appendTo dessin


patate2 = (cv,Cx=320,couleur='brown') ->
    Dy = 320/cv.length
    Hy = 80+Dy/2
    for elt in cv
        dessinePoint Cx-32, Hy, 4
        dessineTexte elt, Cx-24, Hy, couleur
        Hy += Dy
    ellipse Cx, 240, 80, 200, couleur

sagittal = (obj) ->
    depart = Object.keys obj
    arrivee = (obj[e] for e in depart)
    Dy = 320/arrivee.length
    Hy = 80+Dy/2
    for elt in depart
        flèche 92, Hy, 472, Hy
        Hy += Dy
    patate2 depart, 120, 'blue'
    patate2 arrivee, 520, 'red'



Tgauche = (x=0,y=0,r=20,couleur='blue') ->
    dessin = $("#leSVG")
    $(SVG('path'))
        .attr('d',"M #{x} #{y} m 0 #{r} a #{r} #{r} 0 0 0 #{r} #{-r}")
        .attr('stroke',couleur)
        .attr('fill','none')
        .attr('stroke-width',1)
        .appendTo(dessin)
    $(SVG('path'))
        .attr('d',"M #{x} #{y} m #{2*r} #{r} a #{r} #{r} 0 0 0 #{-r} #{r}")
        .attr('stroke',couleur)
        .attr('fill','none')
        .attr('stroke-width',1)
        .appendTo(dessin)

Tdroite = (x=0,y=0,r=20,couleur='blue') ->
    dessin = $("#leSVG")
    $(SVG('path'))
        .attr('d',"M #{x} #{y} m #{r} 0 a #{r} #{r} 0 0 0 #{r} #{r}")
        .attr('stroke',couleur)
        .attr('fill','none')
        .attr('stroke-width',1)
        .appendTo(dessin)
    $(SVG('path'))
        .attr('d',"M #{x} #{y} m #{r} #{2*r} a #{r} #{r} 0 0 0 #{-r} #{-r}")
        .attr('stroke',couleur)
        .attr('fill','none')
        .attr('stroke-width',1)
        .appendTo(dessin)

ligneTruchet = (binaire, x=0,y=0,r=20,couleur='blue') ->
	for rang in [0..binaire.length]
	    if binaire[rang] == "1"
	        Tgauche x+r*rang,y,r/2,couleur
	    else
	        Tdroite x+r*rang,y,r/2,couleur


Tgc = (x=0,y=0,r=20,cH='red',cV='red') ->
    dessineSegment x, y+r/2, x+r/2-3, y+r/2, cH 
    dessineSegment x+r/2+3, y+r/2, x+r, y+r/2, cH 
    dessineSegment x+r/2, y, x+r/2, y+r, cV

Tdc = (x=0,y=0,r=20,cH='red',cV='red') ->
    dessineSegment x+r/2, y, x+r/2, y+r/2-3, cV 
    dessineSegment x+r/2, y+r/2+3, x+r/2, y+r, cV 
    dessineSegment x, y+r/2, x+r, y+r/2, cH

croixTruchet = (binaire, x=0,y=0,r=20,cH='red',cV='red') ->
	for rang in [0..binaire.length]
	    if binaire[rang] == "1"
	        Tgc x+r*rang,y,r,cH,cV
	    else
	        Tdc x+r*rang,y,r,cH,cV
