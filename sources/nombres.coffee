Boolean::toLocaleString = ->
	if this.valueOf() then " c'est vrai " else " c'est pas vrai "





pgcd = (x, y) ->
    [x, y] = [y, x%y] until y is 0
    x

class Fraction
    constructor: (@n=1,@d=1) ->
        facteur = pgcd @n, @d
        @n /= facteur
        @d /= facteur
        if @d < 0 then [@n, @d] = [-@n, -@d]
        
        
Fraction::toString = -> 
        if @d is 1
            "#{@n}"
        else
            if @n/@d < 0
                "(-#{-@n}/#{@d})"
            else
                "#{@n}/#{@d}"
Fraction::plus = (autre) -> 
    if autre?.n and autre?.d
        new Fraction @n*autre.d+@d*autre.n, @d*autre.d
Fraction::moins = (autre) -> 
    if autre?.n and autre?.d
        new Fraction @n*autre.d-@d*autre.n, @d*autre.d
Fraction::fois = (autre) -> 
    if autre?.n and autre?.d
        new Fraction @n*autre.n, @d*autre.d
Fraction::sur = (autre) -> 
    if autre?.n and autre?.d
        new Fraction @n*autre.d, @d*autre.n
Fraction::inverse = -> new Fraction @d, @n
Fraction::opposé = -> new Fraction -@n, @d
Fraction::toFloat = -> @n/@d

sommeFractions = (f1, f2) ->
    new Fraction f1.n*f2.d+f1.d*f2.n, f1.d*f2.d
differenceFractions = (f1, f2) ->
    new Fraction f1.n*f2.d-f1.d*f2.n, f1.d*f2.d
produitFractions = (f1, f2) ->
    new Fraction f1.n*f2.n, f1.d*f2.d
quotientFractions = (f1, f2) ->
    new Fraction f1.n*f2.d, f1.d*f2.n


class Complexe
    constructor: (@Re=1,@Im=0) ->


Complexe::toString = -> 
        if @Im < 0
            "#{@Re}-#{-@Im}i"
        else
            "#{@Re}+#{@Im}i"
Complexe::plus = (z) -> new Complexe @Re+z.Re, @Im+z.Im
Complexe::moins = (z) -> new Complexe @Re-z.Re, @Im-z.Im
Complexe::fois = (z) -> new Complexe @Re*z.Re-@Im*z.Im, @Re*z.Im+@Im*z.Re
Complexe::conj = -> new Complexe @Re, -@Im
Complexe::modCarre = -> (@fois @conj()).Re
Complexe::module = -> Math.sqrt @modCarre()
Complexe::argument = -> Math.atan2 @Im, @Re
Complexe::inverse = -> new Complexe @Re/@modCarre(), -@Im/@modCarre()
Complexe::sur = (z) -> @fois z.inverse()

class Point
    constructor: (@x=0,@y=0) ->
Point::toString = ->
    "(#{@x};#{@y})"
Point::milieu = (autre) ->
    if autre?.x and autre?.y
        new Point (@x+autre.x)/2, (@y+autre.y)/2
Point::vecteur = (autre) ->
    if autre?.x and autre?.y
        new Vecteur autre.x-@x, autre.y-@y
Point::distance = (autre) ->
    if autre?.x and autre?.y
        (this.vecteur autre).norme()

class Vecteur
    constructor: (@x=0,@y=0) ->

Vecteur::toString = ->
    "(#{@x};#{@y})"
Vecteur::norme = ->
    racine(@x*@x+@y*@y)
Vecteur::plus = (v) ->
    if v?.x and v?.y
        new Vecteur @x+v.x, @y+v.y
Vecteur::scalaire = (v) ->
    if v?.x and v?.y
        @x*v.x+@y*v.y
Vecteur::fois = (nombre) ->
    new Vecteur @x*nombre, @y*nombre
Vecteur::déterminant = (v) ->
    if v?.x and v?.y
        @x*v.y-@y*v.x
Vecteur::colinéaireAvec = (v) ->
    if v?.x and v?.y
        (this.déterminant v) is 0
Vecteur::orthogonal = (v) ->
    if v?.x and v?.y
        (this.scalaire v) is 0


chronomètre = (func) ->
    _start = new Date()
    eval func for n in [1..1000000]
    _stop = new Date()
    "#{_stop-_start} µs"

egypt = (uneFraction) ->
    f = uneFraction
    e = troncature f.toFloat()
    f = f.moins new Fraction e, 1
    réduites = [e]
    until f.n is 1
        e=new Fraction 1, arrondiSup f.inverse().toFloat()
        réduites.push e
        f = f.moins e
    réduites.push f
    réduites
