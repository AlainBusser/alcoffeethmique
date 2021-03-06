// Generated by CoffeeScript 2.3.0
  //distributions
var Ensemble, IntFluctBinom, Pi, Sac, binomiale, combinaison, erf, factorielle, lEcartTypeDe, laMoyenneDe, laMédianeDe, laSommeDe, laVarianceDe, leDernierQuartileDe, lePremierQuartileDe, mettreDansTableau, mélangée, prendreAuHasardDans, tableauClasse, tableauValeurs, tirageAvecRemise, tirageSansRemise, trierDansTableau,
  indexOf = [].indexOf;

factorielle = function(n) {
  var j, k, p, ref;
  p = 1;
  for (k = j = 1, ref = n + 1; (1 <= ref ? j < ref : j > ref); k = 1 <= ref ? ++j : --j) {
    p *= k;
  }
  return p;
};

combinaison = function(n, k) {
  if ((0 <= k && k <= n)) {
    if (k > n / 2) {
      return combinaison(n, n - k);
    } else {
      if (k === 0) {
        return 1;
      } else {
        return arrondi(n / k * combinaison(n - 1, k - 1));
      }
    }
  } else {
    return 0;
  }
};

binomiale = function(N, p, k) {
  var q;
  q = 1 - p;
  return combinaison(N, k) * puissance(p, k) * puissance(q, N - k);
};

IntFluctBinom = function(N, p) {
  var bI, bS, somme;
  [bI, bS] = [0, N];
  somme = 0;
  while (!(somme > 0.025)) {
    somme += binomiale(N, p, bI);
    bI++;
  }
  bI--;
  somme = 0;
  while (!(somme > 0.025)) {
    somme += binomiale(N, p, bS);
    bS--;
  }
  bS++;
  return [bI, bS];
};

erf = function(x) {
  var t, ye;
  t = 1 / (1 + 0.3275911 * x);
  ye = 1.061405429;
  ye = ye * t - 1.453152027;
  ye = ye * t + 1.421413741;
  ye = ye * t - 0.284496736;
  ye = ye * t + 0.254829592;
  ye *= t;
  ye *= Math.exp(-x * x);
  return 1 - ye;
};

Pi = function(x) {
  if (x < 0) {
    return 1 - Pi(-x);
  } else {
    if (x < 100) {
      return (1 + erf(x / Math.SQRT2)) / 2;
    } else {
      return 1;
    }
  }
};

//simulation
prendreAuHasardDans = function(liste) {
  return liste[Math.floor(Math.random() * liste.length)];
};

tirageAvecRemise = function(N, liste) {
  var boule, j, ref, sample;
  sample = [];
  for (boule = j = 1, ref = N; (1 <= ref ? j <= ref : j >= ref); boule = 1 <= ref ? ++j : --j) {
    sample.push(prendreAuHasardDans(liste));
  }
  return sample;
};

tirageSansRemise = function(N, liste) {
  var boule, j, ref, sample, totale;
  totale = liste;
  sample = [];
  for (boule = j = 1, ref = N; (1 <= ref ? j <= ref : j >= ref); boule = 1 <= ref ? ++j : --j) {
    sample.push(totale.splice(Math.floor(Math.random() * liste.length), 1));
  }
  return sample;
};

mélangée = function(liste) {
  return tirageSansRemise(liste.length, liste);
};

//ensembles
Array.prototype.unique = function() {
  return this.filter(function(s, i, a) {
    return i === a.lastIndexOf(s);
  });
};

Array.prototype.compteLes = function(objet) {
  var compteur, j, len, ref, x;
  compteur = 0;
  ref = this;
  for (j = 0, len = ref.length; j < len; j++) {
    x = ref[j];
    if (x === objet) {
      compteur++;
    }
  }
  return compteur;
};

Array.prototype.additionnerTout = function(objet) {
  var compteur, j, len, ref, x;
  compteur = 0;
  ref = this;
  for (j = 0, len = ref.length; j < len; j++) {
    x = ref[j];
    compteur += x;
  }
  return compteur;
};

laSommeDe = function(tableau) {
  var _S, _e, j, len;
  _S = 0;
  for (j = 0, len = tableau.length; j < len; j++) {
    _e = tableau[j];
    _S += _e;
  }
  return _S;
};

laMoyenneDe = function(tableau) {
  return laSommeDe(tableau) / tableau.length;
};

laVarianceDe = function(tableau) {
  var x;
  return laMoyenneDe((function() {
    var j, len, results;
    results = [];
    for (j = 0, len = tableau.length; j < len; j++) {
      x = tableau[j];
      results.push(carré(x - laMoyenneDe(tableau)));
    }
    return results;
  })());
};

lEcartTypeDe = function(tableau) {
  return laRacineDe(laVarianceDe(tableau));
};

laMédianeDe = function(tableau) {
  var _indice, _t;
  _t = tableau;
  _t.sort(function(x, y) {
    return x > y;
  });
  if (_t.length % 2 === 0) {
    _indice = _t.length / 2 - 1;
    return (_t[_indice] + _t[_indice + 1]) / 2;
  } else {
    _indice = (_t.length - 1) / 2;
    return _t[_indice];
  }
};

lePremierQuartileDe = function(tableau) {
  var _t;
  _t = tableau;
  _t.sort(function(x, y) {
    return x > y;
  });
  return _t[Math.floor(_t.length / 4)];
};

leDernierQuartileDe = function(tableau) {
  var _t;
  _t = tableau;
  _t.sort(function(x, y) {
    return x > y;
  });
  return _t[Math.floor(_t.length * 3 / 4)];
};

Ensemble = class Ensemble {
  constructor(support = []) {
    this.support = support;
    this.support = this.support.unique();
  }

  toString() {
    return `{${this.support}}`;
  }

  estVide() {
    return this.support.length === 0;
  }

  cardinal() {
    return this.support.length;
  }

  contient(x) {
    return indexOf.call(this.support, x) >= 0;
  }

  tirerAuSort() {
    return prendreAuHasardDans(this.support);
  }

  inter(set) {
    var x;
    return new Ensemble((function() {
      var j, len, ref, results;
      ref = this.support;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        x = ref[j];
        if (indexOf.call(set.support, x) >= 0) {
          results.push(x);
        }
      }
      return results;
    }).call(this));
  }

  union(set) {
    var fourreTout, j, len, ref, x;
    fourreTout = this.support;
    ref = set.support;
    for (j = 0, len = ref.length; j < len; j++) {
      x = ref[j];
      fourreTout.push(x);
    }
    return new Ensemble(fourreTout);
  }

  complémentDans(set) {
    var x;
    return new Ensemble((function() {
      var j, len, ref, results;
      ref = set.support;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        x = ref[j];
        if (indexOf.call(this.support, x) < 0) {
          results.push(x);
        }
      }
      return results;
    }).call(this));
  }

  probaSachantQue(set) {
    return (this.inter(set)).cardinal() / set.cardinal();
  }

  ajoute(elt) {
    this.support.push(elt);
    return this.support = this.support.unique();
  }

};

Sac = class Sac {
  constructor(tableau = []) {
    var j, len, ref, x;
    this.effectifs = {};
    ref = tableau.unique();
    for (j = 0, len = ref.length; j < len; j++) {
      x = ref[j];
      this.effectifs[x] = tableau.compteLes(x);
    }
  }

  toString() {
    return JSON.stringify(this.effectifs);
  }

  cardinal() {
    var _somme, x;
    _somme = 0;
    for (x in this.effectifs) {
      _somme += this.effectifs[x];
    }
    return _somme;
  }

  contient(x) {
    return this.effectifs[x] > 0;
  }

  ote(x) {
    if (x in this.effectifs) {
      this.effectifs[x] -= 1;
      if (this.effectifs[x] === 0) {
        return delete this.effectifs[x];
      }
    }
  }

  ajoute(x) {
    if (x in this.effectifs) {
      return this.effectifs[x] += 1;
    } else {
      return this.effectifs[x] = 1;
    }
  }

  ajouteFois(n, x) {
    if (x in this.effectifs) {
      return this.effectifs[x] += n;
    } else {
      return this.effectifs[x] = n;
    }
  }

  extraireAuHasard() {
    var _liste, j, n, ref, x;
    _liste = [];
    for (x in this.effectifs) {
      for (n = j = 1, ref = this.effectifs[x]; (1 <= ref ? j <= ref : j >= ref); n = 1 <= ref ? ++j : --j) {
        _liste.push(x);
      }
    }
    return _liste[dé(_liste.length) - 1];
  }

  inter(bag) {
    var _me, x;
    _me = new Sac([]);
    for (x in this.effectifs) {
      if (x in bag.effectifs) {
        _me.effectifs[x] = Math.min(this.effectifs[x], bag.effectifs[x]);
      }
    }
    return _me;
  }

  union(bag) {
    var _me, x;
    _me = bag;
    for (x in this.effectifs) {
      if (x in bag.effectifs) {
        _me.effectifs[x] = Math.max(this.effectifs[x], bag.effectifs[x]);
      } else {
        _me.effectifs[x] = this.effectifs[x];
      }
    }
    return _me;
  }

};

mettreDansTableau = function(dico) {
  var results, x;
  $("#tvaleurs").remove();
  $("#teffectifs").remove();
  $("#tabsortie").append('<tr id="tvaleurs"></tr>');
  $("#tabsortie").append('<tr id="teffectifs"></tr>');
//when x<Infinity
  results = [];
  for (x in dico) {
    $("#tvaleurs").append('<th>' + x + '</th>');
    results.push($("#teffectifs").append('<td>' + dico[x] + '</td>'));
  }
  return results;
};

trierDansTableau = function(dico) {
  var dicotrie, j, len, results, x;
  $("#tvaleurs").remove();
  $("#teffectifs").remove();
  $("#tabsortie").append('<tr id="tvaleurs"></tr>');
  $("#tabsortie").append('<tr id="teffectifs"></tr>');
  dicotrie = ((function() {
    var results;
    results = [];
    for (x in dico) {
      results.push(parseFloat(x));
    }
    return results;
  })()).sort(function(x, y) {
    return x - y;
  });
  results = [];
  for (j = 0, len = dicotrie.length; j < len; j++) {
    x = dicotrie[j];
    $("#tvaleurs").append('<th>' + x + '</th>');
    results.push($("#teffectifs").append('<td>' + dico[x] + '</td>'));
  }
  return results;
};

tableauClasse = function(tableau, a = 0, b = 1, N = 10) {
  var _s, _t, j, l, n, pas, ref, ref1, ref2, ref3, ref4, x;
  pas = (b - a) / N;
  _t = {};
  for (n = j = ref = a, ref1 = b, ref2 = pas; ref2 !== 0 && (ref2 > 0 ? j < ref1 : j > ref1); n = j += ref2) {
    n = (Math.round(1000 * n)) / 1000;
    _s = 0;
    for (x = l = 0, ref3 = tableau.length; (0 <= ref3 ? l <= ref3 : l >= ref3); x = 0 <= ref3 ? ++l : --l) {
      if ((n <= (ref4 = tableau[x]) && ref4 < n + pas)) {
        _s++;
      }
    }
    _t[`[${n};${Math.round(1000 * (n + pas)) / 1000}[`] = _s;
  }
  return _t;
};

tableauValeurs = function(fonction, liste = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
  var j, len, results, x;
  $("#tvaleurs").remove();
  $("#teffectifs").remove();
  $("#tabsortie").append('<tr id="tvaleurs"></tr>');
  $("#tabsortie").append('<tr id="teffectifs"></tr>');
  results = [];
  for (j = 0, len = liste.length; j < len; j++) {
    x = liste[j];
    $("#tvaleurs").append('<th>' + x + '</th>');
    results.push($("#teffectifs").append('<td>' + Math.round(1000 * fonction(x)) / 1000 + '</td>'));
  }
  return results;
};
