var Complexe, Fraction, Point, Vecteur, chronomètre, differenceFractions, egypt, pgcd, produitFractions, quotientFractions, sommeFractions;

Boolean.prototype.toLocaleString = function() {
  if (this.valueOf()) {
    return " c'est vrai ";
  } else {
    return " c'est pas vrai ";
  }
};

pgcd = function(x, y) {
  var _ref;
  while (y !== 0) {
    _ref = [y, x % y], x = _ref[0], y = _ref[1];
  }
  return x;
};

Fraction = (function() {
  function Fraction(n, d) {
    var facteur, _ref;
    this.n = n != null ? n : 1;
    this.d = d != null ? d : 1;
    facteur = pgcd(this.n, this.d);
    this.n /= facteur;
    this.d /= facteur;
    if (this.d < 0) {
      _ref = [-this.n, -this.d], this.n = _ref[0], this.d = _ref[1];
    }
  }

  return Fraction;

})();

Fraction.prototype.toString = function() {
  if (this.d === 1) {
    return "" + this.n;
  } else {
    if (this.n / this.d < 0) {
      return "(-" + (-this.n) + "/" + this.d + ")";
    } else {
      return "" + this.n + "/" + this.d;
    }
  }
};

Fraction.prototype.plus = function(autre) {
  if ((autre != null ? autre.n : void 0) && (autre != null ? autre.d : void 0)) {
    return new Fraction(this.n * autre.d + this.d * autre.n, this.d * autre.d);
  }
};

Fraction.prototype.moins = function(autre) {
  if ((autre != null ? autre.n : void 0) && (autre != null ? autre.d : void 0)) {
    return new Fraction(this.n * autre.d - this.d * autre.n, this.d * autre.d);
  }
};

Fraction.prototype.fois = function(autre) {
  if ((autre != null ? autre.n : void 0) && (autre != null ? autre.d : void 0)) {
    return new Fraction(this.n * autre.n, this.d * autre.d);
  }
};

Fraction.prototype.sur = function(autre) {
  if ((autre != null ? autre.n : void 0) && (autre != null ? autre.d : void 0)) {
    return new Fraction(this.n * autre.d, this.d * autre.n);
  }
};

Fraction.prototype.inverse = function() {
  return new Fraction(this.d, this.n);
};

Fraction.prototype.opposé = function() {
  return new Fraction(-this.n, this.d);
};

Fraction.prototype.toFloat = function() {
  return this.n / this.d;
};

sommeFractions = function(f1, f2) {
  return new Fraction(f1.n * f2.d + f1.d * f2.n, f1.d * f2.d);
};

differenceFractions = function(f1, f2) {
  return new Fraction(f1.n * f2.d - f1.d * f2.n, f1.d * f2.d);
};

produitFractions = function(f1, f2) {
  return new Fraction(f1.n * f2.n, f1.d * f2.d);
};

quotientFractions = function(f1, f2) {
  return new Fraction(f1.n * f2.d, f1.d * f2.n);
};

Complexe = (function() {
  function Complexe(Re, Im) {
    this.Re = Re != null ? Re : 1;
    this.Im = Im != null ? Im : 0;
  }

  return Complexe;

})();

Complexe.prototype.toString = function() {
  if (this.Im < 0) {
    return "" + this.Re + "-" + (-this.Im) + "i";
  } else {
    return "" + this.Re + "+" + this.Im + "i";
  }
};

Complexe.prototype.plus = function(z) {
  return new Complexe(this.Re + z.Re, this.Im + z.Im);
};

Complexe.prototype.moins = function(z) {
  return new Complexe(this.Re - z.Re, this.Im - z.Im);
};

Complexe.prototype.fois = function(z) {
  return new Complexe(this.Re * z.Re - this.Im * z.Im, this.Re * z.Im + this.Im * z.Re);
};

Complexe.prototype.conj = function() {
  return new Complexe(this.Re, -this.Im);
};

Complexe.prototype.modCarre = function() {
  return (this.fois(this.conj())).Re;
};

Complexe.prototype.module = function() {
  return Math.sqrt(this.modCarre());
};

Complexe.prototype.argument = function() {
  return Math.atan2(this.Im, this.Re);
};

Complexe.prototype.inverse = function() {
  return new Complexe(this.Re / this.modCarre(), -this.Im / this.modCarre());
};

Complexe.prototype.sur = function(z) {
  return this.fois(z.inverse());
};

Point = (function() {
  function Point(x, y) {
    this.x = x != null ? x : 0;
    this.y = y != null ? y : 0;
  }

  return Point;

})();

Point.prototype.toString = function() {
  return "(" + this.x + ";" + this.y + ")";
};

Point.prototype.milieu = function(autre) {
  if ((autre != null ? autre.x : void 0) && (autre != null ? autre.y : void 0)) {
    return new Point((this.x + autre.x) / 2, (this.y + autre.y) / 2);
  }
};

Point.prototype.vecteur = function(autre) {
  if ((autre != null ? autre.x : void 0) && (autre != null ? autre.y : void 0)) {
    return new Vecteur(autre.x - this.x, autre.y - this.y);
  }
};

Point.prototype.distance = function(autre) {
  if ((autre != null ? autre.x : void 0) && (autre != null ? autre.y : void 0)) {
    return (this.vecteur(autre)).norme();
  }
};

Vecteur = (function() {
  function Vecteur(x, y) {
    this.x = x != null ? x : 0;
    this.y = y != null ? y : 0;
  }

  return Vecteur;

})();

Vecteur.prototype.toString = function() {
  return "(" + this.x + ";" + this.y + ")";
};

Vecteur.prototype.norme = function() {
  return racine(this.x * this.x + this.y * this.y);
};

Vecteur.prototype.plus = function(v) {
  if ((v != null ? v.x : void 0) && (v != null ? v.y : void 0)) {
    return new Vecteur(this.x + v.x, this.y + v.y);
  }
};

Vecteur.prototype.scalaire = function(v) {
  if ((v != null ? v.x : void 0) && (v != null ? v.y : void 0)) {
    return this.x * v.x + this.y * v.y;
  }
};

Vecteur.prototype.fois = function(nombre) {
  return new Vecteur(this.x * nombre, this.y * nombre);
};

Vecteur.prototype.déterminant = function(v) {
  if ((v != null ? v.x : void 0) && (v != null ? v.y : void 0)) {
    return this.x * v.y - this.y * v.x;
  }
};

Vecteur.prototype.colinéaireAvec = function(v) {
  if ((v != null ? v.x : void 0) && (v != null ? v.y : void 0)) {
    return (this.déterminant(v)) === 0;
  }
};

Vecteur.prototype.orthogonal = function(v) {
  if ((v != null ? v.x : void 0) && (v != null ? v.y : void 0)) {
    return (this.scalaire(v)) === 0;
  }
};

chronomètre = function(func) {
  var n, _i, _start, _stop;
  _start = new Date();
  for (n = _i = 1; _i <= 1000000; n = ++_i) {
    eval(func);
  }
  _stop = new Date();
  return "" + (_stop - _start) + " µs";
};

egypt = function(uneFraction) {
  var e, f, réduites;
  f = uneFraction;
  e = troncature(f.toFloat());
  f = f.moins(new Fraction(e, 1));
  réduites = [e];
  while (f.n !== 1) {
    e = new Fraction(1, arrondiSup(f.inverse().toFloat()));
    réduites.push(e);
    f = f.moins(e);
  }
  réduites.push(f);
  return réduites;
};
