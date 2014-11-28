var Ensemble, IntFluctBinom, Pi, Sac, binomiale, combinaison, erf, factorielle, lEcartTypeDe, laMoyenneDe, laMédianeDe, laSommeDe, laVarianceDe, leDernierQuartileDe, lePremierQuartileDe, mettreDansTableau, mélangée, prendreAuHasardDans, tableauClasse, tableauValeurs, tirageAvecRemise, tirageSansRemise, trierDansTableau,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

factorielle = function(n) {
  var k, p, _i, _ref;
  p = 1;
  for (k = _i = 1, _ref = n + 1; 1 <= _ref ? _i < _ref : _i > _ref; k = 1 <= _ref ? ++_i : --_i) {
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
  var bI, bS, somme, _ref;
  _ref = [0, N], bI = _ref[0], bS = _ref[1];
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

prendreAuHasardDans = function(liste) {
  return liste[Math.floor(Math.random() * liste.length)];
};

tirageAvecRemise = function(N, liste) {
  var boule, sample, _i;
  sample = [];
  for (boule = _i = 1; 1 <= N ? _i <= N : _i >= N; boule = 1 <= N ? ++_i : --_i) {
    sample.push(prendreAuHasardDans(liste));
  }
  return sample;
};

tirageSansRemise = function(N, liste) {
  var boule, sample, totale, _i;
  totale = liste;
  sample = [];
  for (boule = _i = 1; 1 <= N ? _i <= N : _i >= N; boule = 1 <= N ? ++_i : --_i) {
    sample.push(totale.splice(Math.floor(Math.random() * liste.length), 1));
  }
  return sample;
};

mélangée = function(liste) {
  return tirageSansRemise(liste.length, liste);
};

Array.prototype.unique = function() {
  return this.filter(function(s, i, a) {
    return i === a.lastIndexOf(s);
  });
};

Array.prototype.compteLes = function(objet) {
  var compteur, x, _i, _len;
  compteur = 0;
  for (_i = 0, _len = this.length; _i < _len; _i++) {
    x = this[_i];
    if (x === objet) {
      compteur++;
    }
  }
  return compteur;
};

Array.prototype.additionnerTout = function(objet) {
  var compteur, x, _i, _len;
  compteur = 0;
  for (_i = 0, _len = this.length; _i < _len; _i++) {
    x = this[_i];
    compteur += x;
  }
  return compteur;
};

laSommeDe = function(tableau) {
  var _S, _e, _i, _len;
  _S = 0;
  for (_i = 0, _len = tableau.length; _i < _len; _i++) {
    _e = tableau[_i];
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
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = tableau.length; _i < _len; _i++) {
      x = tableau[_i];
      _results.push(carré(x - laMoyenneDe(tableau)));
    }
    return _results;
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

Ensemble = (function() {
  function Ensemble(support) {
    this.support = support != null ? support : [];
    this.support = this.support.unique();
  }

  Ensemble.prototype.toString = function() {
    return "{" + this.support + "}";
  };

  Ensemble.prototype.estVide = function() {
    return this.support.length === 0;
  };

  Ensemble.prototype.cardinal = function() {
    return this.support.length;
  };

  Ensemble.prototype.contient = function(x) {
    return __indexOf.call(this.support, x) >= 0;
  };

  Ensemble.prototype.tirerAuSort = function() {
    return prendreAuHasardDans(this.support);
  };

  Ensemble.prototype.inter = function(set) {
    var x;
    return new Ensemble((function() {
      var _i, _len, _ref, _results;
      _ref = this.support;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        x = _ref[_i];
        if (__indexOf.call(set.support, x) >= 0) {
          _results.push(x);
        }
      }
      return _results;
    }).call(this));
  };

  Ensemble.prototype.union = function(set) {
    var fourreTout, x, _i, _len, _ref;
    fourreTout = this.support;
    _ref = set.support;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      x = _ref[_i];
      fourreTout.push(x);
    }
    return new Ensemble(fourreTout);
  };

  Ensemble.prototype.complémentDans = function(set) {
    var x;
    return new Ensemble((function() {
      var _i, _len, _ref, _results;
      _ref = set.support;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        x = _ref[_i];
        if (__indexOf.call(this.support, x) < 0) {
          _results.push(x);
        }
      }
      return _results;
    }).call(this));
  };

  Ensemble.prototype.probaSachantQue = function(set) {
    return (this.inter(set)).cardinal() / set.cardinal();
  };

  Ensemble.prototype.ajoute = function(elt) {
    this.support.push(elt);
    return this.support = this.support.unique();
  };

  return Ensemble;

})();

Sac = (function() {
  function Sac(tableau) {
    var x, _i, _len, _ref;
    if (tableau == null) {
      tableau = [];
    }
    this.effectifs = {};
    _ref = tableau.unique();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      x = _ref[_i];
      this.effectifs[x] = tableau.compteLes(x);
    }
  }

  Sac.prototype.toString = function() {
    return JSON.stringify(this.effectifs);
  };

  Sac.prototype.cardinal = function() {
    var x, _somme;
    _somme = 0;
    for (x in this.effectifs) {
      _somme += this.effectifs[x];
    }
    return _somme;
  };

  Sac.prototype.contient = function(x) {
    return this.effectifs[x] > 0;
  };

  Sac.prototype.ote = function(x) {
    if (x in this.effectifs) {
      this.effectifs[x] -= 1;
      if (this.effectifs[x] === 0) {
        return delete this.effectifs[x];
      }
    }
  };

  Sac.prototype.ajoute = function(x) {
    if (x in this.effectifs) {
      return this.effectifs[x] += 1;
    } else {
      return this.effectifs[x] = 1;
    }
  };

  Sac.prototype.ajouteFois = function(n, x) {
    if (x in this.effectifs) {
      return this.effectifs[x] += n;
    } else {
      return this.effectifs[x] = n;
    }
  };

  Sac.prototype.extraireAuHasard = function() {
    var n, x, _i, _liste, _ref;
    _liste = [];
    for (x in this.effectifs) {
      for (n = _i = 1, _ref = this.effectifs[x]; 1 <= _ref ? _i <= _ref : _i >= _ref; n = 1 <= _ref ? ++_i : --_i) {
        _liste.push(x);
      }
    }
    return _liste[dé(_liste.length - 1)];
  };

  Sac.prototype.inter = function(bag) {
    var x, _me;
    _me = new Sac([]);
    for (x in this.effectifs) {
      if (x in bag.effectifs) {
        _me.effectifs[x] = Math.min(this.effectifs[x], bag.effectifs[x]);
      }
    }
    return _me;
  };

  Sac.prototype.union = function(bag) {
    var x, _me;
    _me = bag;
    for (x in this.effectifs) {
      if (x in bag.effectifs) {
        _me.effectifs[x] = Math.max(this.effectifs[x], bag.effectifs[x]);
      } else {
        _me.effectifs[x] = this.effectifs[x];
      }
    }
    return _me;
  };

  return Sac;

})();

mettreDansTableau = function(dico) {
  var x, _results;
  $("#tvaleurs").remove();
  $("#teffectifs").remove();
  $("#tabsortie").append('<tr id="tvaleurs"></tr>');
  $("#tabsortie").append('<tr id="teffectifs"></tr>');
  _results = [];
  for (x in dico) {
    if (!(x < Infinity)) {
      continue;
    }
    $("#tvaleurs").append('<th>' + x + '</th>');
    _results.push($("#teffectifs").append('<td>' + dico[x] + '</td>'));
  }
  return _results;
};

trierDansTableau = function(dico) {
  var dicotrie, x, _i, _len, _results;
  $("#tvaleurs").remove();
  $("#teffectifs").remove();
  $("#tabsortie").append('<tr id="tvaleurs"></tr>');
  $("#tabsortie").append('<tr id="teffectifs"></tr>');
  dicotrie = ((function() {
    var _results;
    _results = [];
    for (x in dico) {
      _results.push(parseFloat(x));
    }
    return _results;
  })()).sort(function(x, y) {
    return y < x;
  });
  _results = [];
  for (_i = 0, _len = dicotrie.length; _i < _len; _i++) {
    x = dicotrie[_i];
    $("#tvaleurs").append('<th>' + x + '</th>');
    _results.push($("#teffectifs").append('<td>' + dico[x] + '</td>'));
  }
  return _results;
};

tableauClasse = function(tableau, a, b, N) {
  var n, pas, x, _i, _j, _ref, _ref1, _s, _t;
  if (a == null) {
    a = 0;
  }
  if (b == null) {
    b = 1;
  }
  if (N == null) {
    N = 10;
  }
  pas = (b - a) / N;
  _t = {};
  for (n = _i = a; pas > 0 ? _i < b : _i > b; n = _i += pas) {
    n = (Math.round(1000 * n)) / 1000;
    _s = 0;
    for (x = _j = 0, _ref = tableau.length; 0 <= _ref ? _j <= _ref : _j >= _ref; x = 0 <= _ref ? ++_j : --_j) {
      if ((n <= (_ref1 = tableau[x]) && _ref1 < n + pas)) {
        _s++;
      }
    }
    _t["[" + n + ";" + (Math.round(1000 * (n + pas)) / 1000) + "["] = _s;
  }
  return _t;
};

tableauValeurs = function(fonction, liste) {
  var x, _i, _len, _results;
  if (liste == null) {
    liste = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }
  $("#tvaleurs").remove();
  $("#teffectifs").remove();
  $("#tabsortie").append('<tr id="tvaleurs"></tr>');
  $("#tabsortie").append('<tr id="teffectifs"></tr>');
  _results = [];
  for (_i = 0, _len = liste.length; _i < _len; _i++) {
    x = liste[_i];
    $("#tvaleurs").append('<th>' + x + '</th>');
    _results.push($("#teffectifs").append('<td>' + Math.round(1000 * fonction(x)) / 1000 + '</td>'));
  }
  return _results;
};
