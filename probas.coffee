#distributions

factorielle = (n) ->
    p = 1
    p *= k for k in [1...n+1]
    p

combinaison = (n,k) ->
    if 0 <= k <= n
        if k > n/2
            combinaison n, n-k
        else
            if k is 0
                1
            else
                arrondi n/k * combinaison n-1, k-1
    else
        0

binomiale = (N,p,k) ->
    q = 1-p
    combinaison(N,k)*puissance(p,k)*puissance(q,N-k)

IntFluctBinom = (N,p) ->
    [bI, bS] = [0, N]
    somme = 0
    until somme > 0.025
        somme += binomiale N,p,bI
        bI++
    bI--
    somme = 0
    until somme > 0.025
        somme += binomiale N, p, bS
        bS--
    bS++
    [bI, bS]
    
erf = (x) ->
	t=1/(1+0.3275911*x)
	ye=1.061405429
	ye=ye*t-1.453152027
	ye=ye*t+1.421413741
	ye=ye*t-0.284496736
	ye=ye*t+0.254829592
	ye*=t
	ye*=Math.exp(-x*x)
	1-ye
	
Pi = (x) ->
	if x < 0
		1-Pi(-x)
	else
		if x < 100
			(1+erf(x/Math.SQRT2))/2
		else
			1

#simulation

prendreAuHasardDans = (liste) -> 
    liste[Math.floor(Math.random()*liste.length)]

tirageAvecRemise = (N, liste) ->
    sample = []
    for boule in [1..N]
        sample.push prendreAuHasardDans liste
    sample

tirageSansRemise = (N, liste) ->
    totale = liste
    sample = []
    for boule in [1..N]
        sample.push(totale.splice(Math.floor(Math.random()*liste.length), 1))
    sample

mélangée = (liste) ->
    tirageSansRemise liste.length, liste


#ensembles

Array::unique = ->
  @filter (s, i, a) ->
    i is a.lastIndexOf(s)

Array::compteLes = (objet) ->
    compteur = 0
    for x in this
        if x is objet then compteur++
    compteur

Array::additionnerTout = (objet) ->
    compteur = 0
    compteur += x for x in this
    compteur

laSommeDe = (tableau) ->
    _S = 0
    _S += _e for _e in tableau
    _S

laMoyenneDe = (tableau) ->
    laSommeDe(tableau)/tableau.length

laVarianceDe = (tableau) ->
    laMoyenneDe (carré(x-laMoyenneDe(tableau)) for x in tableau)

lEcartTypeDe = (tableau) ->
    laRacineDe laVarianceDe tableau
    
laMédianeDe = (tableau) ->
    _t = tableau
    _t.sort (x,y)->(x > y)
    if _t.length % 2 is 0
        _indice = _t.length/2-1
        (_t[_indice]+_t[_indice+1])/2
    else
        _indice = (_t.length-1)/2
        _t[_indice]

lePremierQuartileDe = (tableau) ->
    _t = tableau
    _t.sort (x,y)->(x > y)
    _t[Math.floor(_t.length/4)]
leDernierQuartileDe = (tableau) ->
    _t = tableau
    _t.sort (x,y)->(x > y)
    _t[Math.floor(_t.length*3/4)]



class Ensemble
    constructor: (@support=[]) -> @support = @support.unique()
    toString: -> "{#{@support}}"
    estVide: -> @support.length is 0
    cardinal: -> @support.length
    contient: (x) -> x in @support
    tirerAuSort: -> prendreAuHasardDans @support
    inter: (set) -> new Ensemble (x for x in @support when x in set.support)
    union: (set) -> 
        fourreTout = @support
        fourreTout.push x for x in set.support
        new Ensemble fourreTout
    complémentDans: (set) ->
        new Ensemble (x for x in set.support when x not in @support)
    probaSachantQue: (set) -> (@inter set).cardinal()/set.cardinal()
    ajoute: (elt) -> 
        @support.push elt
        @support = @support.unique()

class Sac
    constructor: (tableau=[]) -> 
        @effectifs = {}
        for x in tableau.unique()
            @effectifs[x] = tableau.compteLes x
    toString: ->
        JSON.stringify @effectifs
    cardinal: ->
        _somme = 0
        _somme+=@effectifs[x] for x of @effectifs
        _somme
    contient: (x) ->
        @effectifs[x] > 0
    ote: (x) ->
        if x of @effectifs
            @effectifs[x] -= 1
            if @effectifs[x] is 0
                delete @effectifs[x]
    ajoute: (x) ->
        if x of @effectifs
            @effectifs[x] += 1
        else
            @effectifs[x] = 1
    ajouteFois: (n,x) ->
        if x of @effectifs
            @effectifs[x] += n
        else
            @effectifs[x] = n
    extraireAuHasard: ->
        _liste = []
        for x of @effectifs
            _liste.push x for n in [1..@effectifs[x]]
        _liste[dé _liste.length-1]
    inter: (bag) ->
        _me = new Sac []
        for x of @effectifs
            if x of bag.effectifs
                _me.effectifs[x]=Math.min @effectifs[x], bag.effectifs[x]
        _me
    union: (bag) ->
        _me = bag
        for x of @effectifs
            if x of bag.effectifs
                _me.effectifs[x] = Math.max @effectifs[x], bag.effectifs[x]
            else
                _me.effectifs[x] = @effectifs[x]
        _me

mettreDansTableau = (dico) ->
    $("#tvaleurs").remove()
    $("#teffectifs").remove()
    $("#tabsortie").append '<tr id="tvaleurs"></tr>'
    $("#tabsortie").append '<tr id="teffectifs"></tr>'

    for x of dico when x<Infinity
        $("#tvaleurs").append '<th>'+x+'</th>'
        $("#teffectifs").append '<td>'+dico[x]+'</td>'
        
trierDansTableau = (dico) ->
    $("#tvaleurs").remove()
    $("#teffectifs").remove()
    $("#tabsortie").append '<tr id="tvaleurs"></tr>'
    $("#tabsortie").append '<tr id="teffectifs"></tr>'
    dicotrie=(parseFloat x for x of dico).sort (x,y)-> (x-y)
    for x in dicotrie
        $("#tvaleurs").append '<th>'+x+'</th>'
        $("#teffectifs").append '<td>'+dico[x]+'</td>'
        
tableauClasse = (tableau,a=0,b=1,N=10) ->
    pas = (b-a)/N
    _t = {}
    for n in [a...b] by pas
        n = (Math.round 1000*n)/1000
        _s = 0
        _s++ for x in [0..tableau.length] when n <= tableau[x] < n+pas
        _t["[#{n};#{Math.round(1000*(n+pas))/1000}["] = _s
    _t
    
tableauValeurs = (fonction, liste=[1..10]) ->
    $("#tvaleurs").remove()
    $("#teffectifs").remove()
    $("#tabsortie").append '<tr id="tvaleurs"></tr>'
    $("#tabsortie").append '<tr id="teffectifs"></tr>'
    for x in liste
        $("#tvaleurs").append '<th>'+x+'</th>'
        $("#teffectifs").append '<td>'+Math.round(1000*fonction x)/1000+'</td>'

