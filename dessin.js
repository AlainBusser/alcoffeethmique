var SVG, arrInfOdg, arrOdg, arrSupOdg, dessineAxeX, dessineAxeY, dessineAxes, dessineCercle, dessineFonction, dessinePolygone, dessineRectangle, dessineSegment, dessineSuite, dessineTexte, dessineVoronoi, diagrammeBatons, diagrammeBatonsTrie, effaceDessin, histogramme;

SVG = function(tag) {
  return document.createElementNS('http://www.w3.org/2000/svg', tag);
};

effaceDessin = function() {
  var dessin;
  dessin = $("#leSVG");
  return dessin.empty();
};

dessineSegment = function(x1, y1, x2, y2, couleur) {
  var dessin;
  if (x1 == null) {
    x1 = 0;
  }
  if (y1 == null) {
    y1 = 0;
  }
  if (x2 == null) {
    x2 = 1;
  }
  if (y2 == null) {
    y2 = 1;
  }
  if (couleur == null) {
    couleur = 'black';
  }
  dessin = $("#leSVG");
  return $(SVG('line')).attr('x1', x1).attr('y1', y1).attr('x2', x2).attr('y2', y2).attr('stroke', couleur).attr('stroke-width', 1).appendTo(dessin);
};

dessineRectangle = function(x, y, largeur, hauteur, couleur) {
  var dessin;
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }
  if (largeur == null) {
    largeur = 5;
  }
  if (hauteur == null) {
    hauteur = 40;
  }
  if (couleur == null) {
    couleur = 'blue';
  }
  dessin = $("#leSVG");
  return $(SVG('rect')).attr('x', x).attr('y', y).attr('width', largeur).attr('height', hauteur).attr('fill', couleur).attr('fill-opacity', 0.4).attr('stroke', couleur).attr('stroke-width', 1).appendTo(dessin);
};

dessineCercle = function(cx, cy, r, couleur) {
  var dessin;
  if (cx == null) {
    cx = 0;
  }
  if (cy == null) {
    cy = 0;
  }
  if (r == null) {
    r = 5;
  }
  if (couleur == null) {
    couleur = 'red';
  }
  dessin = $("#leSVG");
  return $(SVG('circle')).attr('cx', cx).attr('cy', cy).attr('r', r).attr('fill', couleur).attr('fill-opacity', 0.4).attr('stroke', couleur).attr('stroke-width', 1).appendTo(dessin);
};

dessinePolygone = function(liste, couleur, rempli) {
  var chemin, dessin, k, _i, _ref;
  if (liste == null) {
    liste = [[0, 0], [300, 100], [100, 300]];
  }
  if (couleur == null) {
    couleur = 'green';
  }
  if (rempli == null) {
    rempli = none;
  }
  dessin = $("#leSVG");
  chemin = "M" + liste[0];
  for (k = _i = 1, _ref = liste.length; 1 <= _ref ? _i < _ref : _i > _ref; k = 1 <= _ref ? ++_i : --_i) {
    chemin += " L" + liste[k];
  }
  chemin += " L" + liste[0];
  return $(SVG('path')).attr('d', chemin).attr('stroke', couleur).attr('stroke-width', 1).attr('fill', rempli).attr('fill-opacity', 0.4).appendTo(dessin);
};

dessineTexte = function(texte, x, y, couleur) {
  var dessin;
  if (x == null) {
    x = 20;
  }
  if (y == null) {
    y = 20;
  }
  if (couleur == null) {
    couleur = 'black';
  }
  dessin = $("#leSVG");
  return $(SVG('text')).attr('x', x).attr('y', y).attr('fill', couleur).text(texte).appendTo(dessin);
};

diagrammeBatons = function(dico, ech) {
  var abscisse, hauteur, nombreBatons, x;
  if (ech == null) {
    ech = 400;
  }
  nombreBatons = ((function() {
    var _results;
    _results = [];
    for (x in dico) {
      _results.push(x);
    }
    return _results;
  })()).length;
  effaceDessin();
  dessineSegment(20, 440, 620, 440, 'black');
  abscisse = 40 - 600 / nombreBatons;
  for (x in dico) {
    abscisse += 600 / nombreBatons;
    hauteur = 400 / ech * dico[x];
    dessineRectangle(abscisse, 440 - hauteur, 5, hauteur, 'blue');
    dessineTexte(x, abscisse, 460, 'black');
  }
  return $("#sortieSVG").text($("#graphique").html());
};

diagrammeBatonsTrie = function(dico, ech) {
  var abscisse, dicotrie, hauteur, nombreBatons, x, _i, _len;
  if (ech == null) {
    ech = 400;
  }
  nombreBatons = ((function() {
    var _results;
    _results = [];
    for (x in dico) {
      if (x < Infinity) {
        _results.push(x);
      }
    }
    return _results;
  })()).length;
  dicotrie = ((function() {
    var _results;
    _results = [];
    for (x in dico) {
      if (x < Infinity) {
        _results.push(parseFloat(x));
      }
    }
    return _results;
  })()).sort(function(x, y) {
    return x - y;
  });
  effaceDessin();
  dessineSegment(20, 440, 620, 440, 'black');
  abscisse = 40 - 600 / nombreBatons;
  for (_i = 0, _len = dicotrie.length; _i < _len; _i++) {
    x = dicotrie[_i];
    abscisse += 600 / nombreBatons;
    hauteur = 400 / ech * dico[x];
    dessineRectangle(abscisse, 440 - hauteur, 5, hauteur, 'blue');
    dessineTexte(x.toString().replace(".", ","), abscisse, 460, 'black');
  }
  return $("#sortieSVG").text($("#graphique").html());
};

histogramme = function(tableau, a, b, N, ech) {
  var abscisse, hauteur, i, pas, x, _i, _j, _ref, _ref1, _s;
  if (a == null) {
    a = 0;
  }
  if (b == null) {
    b = 1;
  }
  if (N == null) {
    N = 10;
  }
  if (ech == null) {
    ech = 400;
  }
  pas = (b - a) / N;
  effaceDessin();
  dessineSegment(20, 440, 620, 440, 'black');
  abscisse = 20;
  for (x = _i = a; pas > 0 ? _i < b : _i > b; x = _i += pas) {
    x = (Math.round(1000 * x)) / 1000;
    abscisse += 500 / N;
    _s = 0;
    for (i = _j = 0, _ref = tableau.length; 0 <= _ref ? _j <= _ref : _j >= _ref; i = 0 <= _ref ? ++_j : --_j) {
      if ((x <= (_ref1 = tableau[i]) && _ref1 < x + pas)) {
        _s++;
      }
    }
    hauteur = 400 / ech * _s;
    dessineRectangle(abscisse, 440 - hauteur, 500 / N, hauteur, 'blue');
    dessineTexte(x.toString().replace(".", ","), abscisse, 460, 'black');
  }
  return $("#sortieSVG").text($("#graphique").html());
};

arrOdg = function(x, e) {
  var p10;
  p10 = Math.pow(10, e);
  return arrondi(x * p10) / p10;
};

arrInfOdg = function(x, e) {
  var p10;
  p10 = Math.pow(10, e);
  return troncature(x * p10) / p10;
};

arrSupOdg = function(x, e) {
  var p10;
  p10 = Math.pow(10, e);
  return arrondiSup(x * p10) / p10;
};

dessineAxeX = function(xMin, xMax, couleur) {
  var abscisse, nombreSegments, odg, xGrad, _results;
  if (xMin == null) {
    xMin = 0;
  }
  if (xMax == null) {
    xMax = 1;
  }
  if (couleur == null) {
    couleur = 'black';
  }
  dessineSegment(40, 440, 620, 440, couleur);
  dessineSegment(620, 440, 610, 435, couleur);
  dessineSegment(620, 440, 610, 445, couleur);
  odg = 1 - arrondi(ln(xMax - xMin) / Math.LN10);
  abscisse = 40;
  nombreSegments = arrSupOdg(xMax, odg) - arrInfOdg(xMin, odg);
  xGrad = arrInfOdg(xMin, odg);
  _results = [];
  while (xGrad <= arrSupOdg(xMax, odg)) {
    if (arrOdg(xGrad, odg + 1) === arrOdg(xGrad, odg)) {
      dessineTexte(arrOdg(xGrad, odg).toString().replace(".", ","), abscisse, 470, couleur);
      dessineSegment(abscisse, 440, abscisse, 450, couleur);
    } else {
      if (arrOdg(xGrad, odg + 1).toString().slice(-1) === "5") {
        dessineSegment(abscisse, 440, abscisse, 447, couleur);
      } else {
        dessineSegment(abscisse, 440, abscisse, 444, couleur);
      }
    }
    xGrad += puissance(10, -odg - 1);
    _results.push(abscisse += 500 / nombreSegments * (puissance(10, -odg - 1)));
  }
  return _results;
};

dessineAxeY = function(yMin, yMax, couleur) {
  var nombreSegments, odg, ordonnee, yGrad, _results;
  if (yMin == null) {
    yMin = 0;
  }
  if (yMax == null) {
    yMax = 1;
  }
  if (couleur == null) {
    couleur = 'black';
  }
  dessineSegment(40, 440, 40, 20, couleur);
  dessineSegment(40, 20, 35, 30, couleur);
  dessineSegment(40, 20, 45, 30, couleur);
  odg = 1 - arrondi(ln(yMax - yMin) / Math.LN10);
  ordonnee = 440;
  nombreSegments = arrSupOdg(yMax, odg) - arrInfOdg(yMin, odg);
  yGrad = arrInfOdg(yMin, odg);
  _results = [];
  while (yGrad <= arrSupOdg(yMax, odg)) {
    if (arrOdg(yGrad, odg + 1) === arrOdg(yGrad, odg)) {
      dessineTexte(arrOdg(yGrad, odg).toString().replace(".", ","), 10, ordonnee, couleur);
      dessineSegment(40, ordonnee, 30, ordonnee, couleur);
    } else {
      if (arrOdg(yGrad, odg + 1).toString().slice(-1) === "5") {
        dessineSegment(40, ordonnee, 33, ordonnee, couleur);
      } else {
        dessineSegment(40, ordonnee, 36, ordonnee, couleur);
      }
    }
    yGrad += puissance(10, -odg - 1);
    _results.push(ordonnee -= 400 / nombreSegments * (puissance(10, -odg - 1)));
  }
  return _results;
};

dessineAxes = function(xMin, xMax, yMin, yMax, couleur) {
  if (xMin == null) {
    xMin = 0;
  }
  if (xMax == null) {
    xMax = 1;
  }
  if (yMin == null) {
    yMin = 0;
  }
  if (yMax == null) {
    yMax = 1;
  }
  if (couleur == null) {
    couleur = 'black';
  }
  dessineAxeX(xMin, xMax, couleur);
  return dessineAxeY(yMin, yMax, couleur);
};

dessineFonction = function(fonction, xMin, xMax, yMin, yMax, couleur) {
  var abscisse, echX, echY, odgX, odgY, ordonnee, x, xGrad, yGrad, _i, _ref;
  if (xMin == null) {
    xMin = 0;
  }
  if (xMax == null) {
    xMax = 1;
  }
  if (yMin == null) {
    yMin = 0;
  }
  if (yMax == null) {
    yMax = 1;
  }
  if (couleur == null) {
    couleur = 'red';
  }
  effaceDessin();
  dessineAxes(xMin, xMax, yMin, yMax, 'black');
  odgX = 1 - arrondi(ln(xMax - xMin) / Math.LN10);
  odgY = 2 - arrondi(ln(yMax - yMin) / Math.LN10);
  xGrad = arrInfOdg(xMin, odgX);
  yGrad = arrInfOdg(yMin, odgY);
  echX = 50 / (arrSupOdg(xMax, odgX) - arrInfOdg(xMin, odgX));
  echY = 400 / (arrSupOdg(yMax, odgY) - arrInfOdg(yMin, odgY));
  _ref = [40, 440], abscisse = _ref[0], ordonnee = _ref[1];
  for (x = _i = 40; _i < 540; x = ++_i) {
    dessineSegment(x, 440 + echY * yGrad - echY * fonction(xMin + (x - 40) / 500 * (xMax - xMin)), x + 1, 440 + echY * yGrad - echY * fonction(xMin + (x - 39) / 500 * (xMax - xMin)), couleur);
  }
  return $("#sortieSVG").text($("#graphique").html());
};

dessineSuite = function(suite, N, yMin, yMax, rayon, couleur) {
  var abscisse, echX, echY, odgX, odgY, ordonnee, xGrad, yGrad, _ref;
  if (suite == null) {
    suite = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  }
  if (N == null) {
    N = 20;
  }
  if (yMin == null) {
    yMin = -1;
  }
  if (yMax == null) {
    yMax = 1;
  }
  if (rayon == null) {
    rayon = 5;
  }
  if (couleur == null) {
    couleur = 'red';
  }
  effaceDessin();
  dessineAxes(0, N, yMin, yMax, 'black');
  odgX = 1 - arrondi(ln(N) / Math.LN10);
  odgY = 2 - arrondi(ln(yMax - yMin) / Math.LN10);
  xGrad = 0;
  yGrad = arrInfOdg(yMin, odgY);
  echX = 500 / arrSupOdg(N, odgX);
  echY = 400 / (arrSupOdg(yMax, odgY) - arrInfOdg(yMin, odgY));
  _ref = [40, 440], abscisse = _ref[0], ordonnee = _ref[1];
  while (xGrad <= arrSupOdg(N, odgX)) {
    dessineCercle(abscisse, 440 + echY * yGrad - echY * suite[xGrad], rayon, couleur);
    xGrad++;
    abscisse += echX;
  }
  return $("#sortieSVG").text($("#graphique").html());
};

dessineVoronoi = function(listePoints, couleurTraits, rayon, couleurPoints, dessinerPoints) {
  var arete, bbox, point, resultV, sites, voronoi, _i, _j, _len, _len1, _ref;
  if (couleurTraits == null) {
    couleurTraits = 'darkBlue';
  }
  if (rayon == null) {
    rayon = 3;
  }
  if (couleurPoints == null) {
    couleurPoints = 'darkRed';
  }
  if (dessinerPoints == null) {
    dessinerPoints = true;
  }
  effaceDessin();
  sites = [];
  for (_i = 0, _len = listePoints.length; _i < _len; _i++) {
    point = listePoints[_i];
    if (dessinerPoints) {
      dessineCercle(point[0], point[1], rayon, couleurPoints);
    }
    sites.push({
      x: point[0],
      y: point[1]
    });
  }
  bbox = {
    xl: 0,
    xr: 640,
    yt: 0,
    yb: 480
  };
  voronoi = new Voronoi();
  resultV = voronoi.compute(sites, bbox);
  _ref = resultV.edges;
  for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
    arete = _ref[_j];
    dessineSegment(arete.va.x, arete.va.y, arete.vb.x, arete.vb.y, couleurTraits);
  }
  return $("#sortieSVG").text($("#graphique").html());
};
