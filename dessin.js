// Generated by CoffeeScript 1.11.1
var L0impair, L0pair, L1impair, L1pair, Limpair, Lpair, SVG, Tdc, Tdroite, Tgauche, Tgc, TricotD, TricotG, arrInfOdg, arrOdg, arrSupOdg, croixTruchet, dessineAxeX, dessineAxeY, dessineAxes, dessineCercle, dessineEllipse, dessineFonction, dessinePoint, dessinePolygone, dessineRectangle, dessineSegment, dessineSuite, dessineSuite3D, dessineTexte, dessineVoronoi, dessineVoronoi3D, diagrammeBatons, diagrammeBatonsTrie, effaceDessin, ellipse, flèche, histogramme, ligneTricot, ligneTruchet, patate, patate2, patate3D, patates, patates3D, reflets, sagittal;

SVG = function(tag) {
  return document.createElementNS('http://www.w3.org/2000/svg', tag);
};

reflets = "<defs>\n<linearGradient id=\"metal\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n<stop offset=\"0%\" stop-color=\"gray\" />\n<stop offset=\"80%\" stop-color=\"black\" />\n</linearGradient>\n<marker id=\"pointe\" viewBox=\"0 0 10 10\" refX=\"0\" refY=\"5\" markerUnits=\"strokeWidth\" markerWidth=\"8\" markerHeight=\"6\" orient=\"auto\">\n<path d=\"M 0 0 L 10 5 L 0 10 z\" fill=\"url(#metal)\" />\n</marker>\n<radialGradient id=\"coque\"  cx=\"0.5\" cy=\"0.5\" r=\"0.5\" fx=\"0.25\" fy=\"0.25\">\n<stop offset=\"0%\" stop-color=\"white\" />\n<stop offset=\"80%\" stop-color=\"brown\" />\n<stop offset=\"100%\" stop-color=\"black\" />\n</radialGradient>\n<radialGradient id=\"bille\" cx=\"0.5\" cy=\"0.5\" r=\"0.5\" fx=\"0.25\" fy=\"0.25\">\n<stop offset=\"0%\" stop-color=\"white\" />\n<stop offset=\"75%\" stop-color=\"blue\" />\n<stop offset=\"100%\" stop-color=\"black\" />\n</radialGradient>\n</defs>";

effaceDessin = function() {
  var dessin;
  dessin = $("#leSVG");
  return dessin.empty().prepend(reflets);
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

dessinePoint = function(cx, cy, r) {
  var dessin;
  if (cx == null) {
    cx = 0;
  }
  if (cy == null) {
    cy = 0;
  }
  if (r == null) {
    r = 4;
  }
  dessin = $("#leSVG");
  return $(SVG('circle')).attr('cx', cx).attr('cy', cy).attr('r', r).attr('fill', 'url(#bille)').appendTo(dessin);
};

dessineEllipse = function(cx, cy, rx, ry, couleur) {
  var dessin;
  if (cx == null) {
    cx = 100;
  }
  if (cy == null) {
    cy = 200;
  }
  if (rx == null) {
    rx = 100;
  }
  if (ry == null) {
    ry = 200;
  }
  if (couleur == null) {
    couleur = "brown";
  }
  dessin = $("#leSVG");
  return $(SVG('ellipse')).attr('cx', cx).attr('cy', cy).attr('rx', rx).attr('ry', ry).attr('stroke', couleur).attr('fill', couleur).attr('fill-opacity', 0.4).attr('stroke-width', 1).appendTo(dessin);
};

dessinePolygone = function(liste, couleur, rempli) {
  var chemin, dessin, j, k, ref;
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
  for (k = j = 1, ref = liste.length; 1 <= ref ? j < ref : j > ref; k = 1 <= ref ? ++j : --j) {
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
    var results;
    results = [];
    for (x in dico) {
      results.push(x);
    }
    return results;
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
  var abscisse, dicotrie, hauteur, j, len, nombreBatons, x;
  if (ech == null) {
    ech = 400;
  }
  nombreBatons = ((function() {
    var results;
    results = [];
    for (x in dico) {
      if (x < 2e308) {
        results.push(x);
      }
    }
    return results;
  })()).length;
  dicotrie = ((function() {
    var results;
    results = [];
    for (x in dico) {
      if (x < 2e308) {
        results.push(parseFloat(x));
      }
    }
    return results;
  })()).sort(function(x, y) {
    return x - y;
  });
  effaceDessin();
  dessineSegment(20, 440, 620, 440, 'black');
  abscisse = 40 - 600 / nombreBatons;
  for (j = 0, len = dicotrie.length; j < len; j++) {
    x = dicotrie[j];
    abscisse += 600 / nombreBatons;
    hauteur = 400 / ech * dico[x];
    dessineRectangle(abscisse, 440 - hauteur, 5, hauteur, 'blue');
    dessineTexte(x.toString().replace(".", ","), abscisse, 460, 'black');
  }
  return $("#sortieSVG").text($("#graphique").html());
};

histogramme = function(tableau, a, b, N, ech) {
  var _s, abscisse, hauteur, i, j, l, pas, ref, ref1, ref2, ref3, ref4, x;
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
  for (x = j = ref = a, ref1 = b, ref2 = pas; ref2 > 0 ? j < ref1 : j > ref1; x = j += ref2) {
    x = (Math.round(1000 * x)) / 1000;
    abscisse += 500 / N;
    _s = 0;
    for (i = l = 0, ref3 = tableau.length; 0 <= ref3 ? l <= ref3 : l >= ref3; i = 0 <= ref3 ? ++l : --l) {
      if ((x <= (ref4 = tableau[i]) && ref4 < x + pas)) {
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
  var abscisse, nombreSegments, odg, results, xGrad;
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
  results = [];
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
    results.push(abscisse += 500 / nombreSegments * (puissance(10, -odg - 1)));
  }
  return results;
};

dessineAxeY = function(yMin, yMax, couleur) {
  var nombreSegments, odg, ordonnee, results, yGrad;
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
  results = [];
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
    results.push(ordonnee -= 400 / nombreSegments * (puissance(10, -odg - 1)));
  }
  return results;
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
  var abscisse, echX, echY, j, odgX, odgY, ordonnee, ref, x, xGrad, yGrad;
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
  ref = [40, 440], abscisse = ref[0], ordonnee = ref[1];
  for (x = j = 40; j < 540; x = ++j) {
    dessineSegment(x, 440 + echY * yGrad - echY * fonction(xMin + (x - 40) / 500 * (xMax - xMin)), x + 1, 440 + echY * yGrad - echY * fonction(xMin + (x - 39) / 500 * (xMax - xMin)), couleur);
  }
  return $("#sortieSVG").text($("#graphique").html());
};

dessineSuite = function(suite, N, yMin, yMax, rayon, couleur) {
  var abscisse, echX, echY, odgX, odgY, ordonnee, ref, xGrad, yGrad;
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
  ref = [40, 440], abscisse = ref[0], ordonnee = ref[1];
  while (xGrad <= arrSupOdg(N, odgX)) {
    dessineCercle(abscisse, 440 + echY * yGrad - echY * suite[xGrad], rayon, couleur);
    xGrad++;
    abscisse += echX;
  }
  return $("#sortieSVG").text($("#graphique").html());
};

dessineSuite3D = function(suite, N, yMin, yMax, rayon, couleur) {
  var abscisse, echX, echY, odgX, odgY, ordonnee, ref, xGrad, yGrad;
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
  ref = [40, 440], abscisse = ref[0], ordonnee = ref[1];
  while (xGrad <= arrSupOdg(N, odgX)) {
    dessinePoint(abscisse, 440 + echY * yGrad - echY * suite[xGrad], rayon);
    xGrad++;
    abscisse += echX;
  }
  return $("#sortieSVG").text($("#graphique").html());
};

dessineVoronoi = function(listePoints, couleurTraits, rayon, couleurPoints, dessinerPoints) {
  var arete, bbox, j, l, len, len1, point, ref, resultV, sites, voronoi;
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
  for (j = 0, len = listePoints.length; j < len; j++) {
    point = listePoints[j];
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
  ref = resultV.edges;
  for (l = 0, len1 = ref.length; l < len1; l++) {
    arete = ref[l];
    dessineSegment(arete.va.x, arete.va.y, arete.vb.x, arete.vb.y, couleurTraits);
  }
  return $("#sortieSVG").text($("#graphique").html());
};

dessineVoronoi3D = function(listePoints, couleurTraits, rayon, dessinerPoints) {
  var arete, bbox, j, l, len, len1, point, ref, resultV, sites, voronoi;
  if (couleurTraits == null) {
    couleurTraits = 'darkBlue';
  }
  if (rayon == null) {
    rayon = 3;
  }
  if (dessinerPoints == null) {
    dessinerPoints = true;
  }
  sites = [];
  for (j = 0, len = listePoints.length; j < len; j++) {
    point = listePoints[j];
    if (dessinerPoints) {
      dessinePoint(point[0], point[1], rayon);
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
  ref = resultV.edges;
  for (l = 0, len1 = ref.length; l < len1; l++) {
    arete = ref[l];
    dessineSegment(arete.va.x, arete.va.y, arete.vb.x, arete.vb.y, couleurTraits);
  }
  return $("#sortieSVG").text($("#graphique").html());
};

patate = function(S, Cx, couleur) {
  var Dy, Hy, Rx, elt, j, len, ref, x;
  if (Cx == null) {
    Cx = 320;
  }
  if (couleur == null) {
    couleur = 'brown';
  }
  Dy = 320 / S.cardinal();
  Rx = _.max((function() {
    var j, len, ref, results;
    ref = S.support;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      x = ref[j];
      results.push(x.toString().length);
    }
    return results;
  })());
  Rx *= 40;
  Hy = 80 + Dy / 2;
  ref = S.support;
  for (j = 0, len = ref.length; j < len; j++) {
    elt = ref[j];
    dessineCercle(Cx - Rx / 4, Hy, 4, couleur);
    dessineTexte(elt, Cx, Hy, couleur);
    Hy += Dy;
  }
  return dessineEllipse(Cx, 240, Rx, 200, couleur);
};

patates = function(S1, S2, Cx, c1, c2) {
  var Dy, Hy, Rx, Rx1, Rx2, S12, Sc1, Sc2, elt, j, l, len, len1, len2, m, ref, ref1, ref2, x;
  if (Cx == null) {
    Cx = 320;
  }
  if (c1 == null) {
    c1 = 'blue';
  }
  if (c2 == null) {
    c2 = 'red';
  }
  S12 = S1.inter(S2);
  Sc1 = S2.complémentDans(S1);
  Sc2 = S1.complémentDans(S2);
  Dy = 320 / _.max([Sc1.cardinal(), Sc2.cardinal(), S12.cardinal()]);
  Rx1 = _.max((function() {
    var j, len, ref, results;
    ref = S1.support;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      x = ref[j];
      results.push(x.toString().length);
    }
    return results;
  })());
  Rx2 = _.max((function() {
    var j, len, ref, results;
    ref = S2.support;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      x = ref[j];
      results.push(x.toString().length);
    }
    return results;
  })());
  Rx = _.max([Rx1, Rx2]);
  Rx *= 40;
  Hy = 80 + Dy / 2;
  ref = Sc1.support;
  for (j = 0, len = ref.length; j < len; j++) {
    elt = ref[j];
    dessineCercle(Cx - 2 * Rx, Hy, 4, c1);
    dessineTexte(elt, Cx - 1.8 * Rx, Hy, c1);
    Hy += Dy;
  }
  Hy = 80 + Dy / 2;
  ref1 = Sc2.support;
  for (l = 0, len1 = ref1.length; l < len1; l++) {
    elt = ref1[l];
    dessineCercle(Cx + 2 * Rx, Hy, 4, c2);
    dessineTexte(elt, Cx + 2.2 * Rx, Hy, c2);
    Hy += Dy;
  }
  Hy = 120 + Dy / 2;
  ref2 = S12.support;
  for (m = 0, len2 = ref2.length; m < len2; m++) {
    elt = ref2[m];
    dessineCercle(Cx, Hy, 4, 'black');
    dessineTexte(elt, Cx + 0.2 * Rx, Hy, 'black');
    Hy += Dy;
  }
  dessineEllipse(Cx - 1.5 * Rx, 240, 2.5 * Rx, 200, c1);
  return dessineEllipse(Cx + 1.5 * Rx, 240, 2.5 * Rx, 200, c2);
};

ellipse = function(cx, cy, rx, ry, couleur, alpha) {
  var dessin;
  if (cx == null) {
    cx = 100;
  }
  if (cy == null) {
    cy = 200;
  }
  if (rx == null) {
    rx = 100;
  }
  if (ry == null) {
    ry = 200;
  }
  if (couleur == null) {
    couleur = "brown";
  }
  if (alpha == null) {
    alpha = 0.3;
  }
  dessin = $("#leSVG");
  return $(SVG('ellipse')).attr('cx', cx).attr('cy', cy).attr('rx', rx).attr('ry', ry).attr('stroke', couleur).attr('fill', 'url(#coque)').attr('fill-opacity', alpha).attr('stroke-width', 1).appendTo(dessin);
};

patate3D = function(S, Cx, couleur, alpha) {
  var Dy, Hy, Rx, elt, j, len, ref, x;
  if (Cx == null) {
    Cx = 320;
  }
  if (couleur == null) {
    couleur = 'brown';
  }
  if (alpha == null) {
    alpha = 0.3;
  }
  Dy = 320 / S.cardinal();
  Rx = _.max((function() {
    var j, len, ref, results;
    ref = S.support;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      x = ref[j];
      results.push(x.toString().length);
    }
    return results;
  })());
  Rx *= 40;
  Hy = 80 + Dy / 2;
  ref = S.support;
  for (j = 0, len = ref.length; j < len; j++) {
    elt = ref[j];
    dessinePoint(Cx - Rx / 4, Hy, 4);
    dessineTexte(elt, Cx, Hy, couleur);
    Hy += Dy;
  }
  return ellipse(Cx, 240, Rx, 200, couleur, alpha);
};

patates3D = function(S1, S2, Cx) {
  var Dy, Hy, Rx, Rx1, Rx2, S12, Sc1, Sc2, elt, j, l, len, len1, len2, m, ref, ref1, ref2, x;
  if (Cx == null) {
    Cx = 320;
  }
  S12 = S1.inter(S2);
  Sc1 = S2.complémentDans(S1);
  Sc2 = S1.complémentDans(S2);
  Dy = 320 / _.max([Sc1.cardinal(), Sc2.cardinal(), S12.cardinal()]);
  Rx1 = _.max((function() {
    var j, len, ref, results;
    ref = S1.support;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      x = ref[j];
      results.push(x.toString().length);
    }
    return results;
  })());
  Rx2 = _.max((function() {
    var j, len, ref, results;
    ref = S2.support;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      x = ref[j];
      results.push(x.toString().length);
    }
    return results;
  })());
  Rx = _.max([Rx1, Rx2]);
  Rx *= 40;
  Hy = 80 + Dy / 2;
  ref = Sc1.support;
  for (j = 0, len = ref.length; j < len; j++) {
    elt = ref[j];
    dessinePoint(Cx - 2 * Rx, Hy, 4);
    dessineTexte(elt, Cx - 1.8 * Rx, Hy);
    Hy += Dy;
  }
  Hy = 80 + Dy / 2;
  ref1 = Sc2.support;
  for (l = 0, len1 = ref1.length; l < len1; l++) {
    elt = ref1[l];
    dessinePoint(Cx + 2 * Rx, Hy, 4);
    dessineTexte(elt, Cx + 2.2 * Rx, Hy);
    Hy += Dy;
  }
  Hy = 120 + Dy / 2;
  ref2 = S12.support;
  for (m = 0, len2 = ref2.length; m < len2; m++) {
    elt = ref2[m];
    dessinePoint(Cx, Hy, 4);
    dessineTexte(elt, Cx + 0.2 * Rx, Hy);
    Hy += Dy;
  }
  ellipse(Cx - 1.5 * Rx, 240, 2.5 * Rx, 200, "blue");
  return ellipse(Cx + 1.5 * Rx, 240, 2.5 * Rx, 200, "red");
};

flèche = function(x1, y1, x2, y2, grosseur, couleur) {
  var dessin;
  if (grosseur == null) {
    grosseur = 2;
  }
  if (couleur == null) {
    couleur = "black";
  }
  dessin = $("#leSVG");
  return $(SVG('line')).attr('x1', x1).attr('y1', y1).attr('x2', x2).attr('y2', y2).attr('stroke', couleur).attr('stroke-width', grosseur).attr('marker-end', 'url(#pointe)').appendTo(dessin);
};

patate2 = function(cv, Cx, couleur) {
  var Dy, Hy, elt, j, len;
  if (Cx == null) {
    Cx = 320;
  }
  if (couleur == null) {
    couleur = 'brown';
  }
  Dy = 320 / cv.length;
  Hy = 80 + Dy / 2;
  for (j = 0, len = cv.length; j < len; j++) {
    elt = cv[j];
    dessinePoint(Cx - 32, Hy, 4);
    dessineTexte(elt, Cx - 24, Hy, couleur);
    Hy += Dy;
  }
  return ellipse(Cx, 240, 80, 200, couleur);
};

sagittal = function(obj) {
  var Dy, Hy, arrivee, depart, e, elt, j, len;
  depart = Object.keys(obj);
  arrivee = (function() {
    var j, len, results;
    results = [];
    for (j = 0, len = depart.length; j < len; j++) {
      e = depart[j];
      results.push(obj[e]);
    }
    return results;
  })();
  Dy = 320 / arrivee.length;
  Hy = 80 + Dy / 2;
  for (j = 0, len = depart.length; j < len; j++) {
    elt = depart[j];
    flèche(92, Hy, 472, Hy);
    Hy += Dy;
  }
  patate2(depart, 120, 'blue');
  return patate2(arrivee, 520, 'red');
};

Tgauche = function(x, y, r, couleur) {
  var dessin;
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }
  if (r == null) {
    r = 20;
  }
  if (couleur == null) {
    couleur = 'blue';
  }
  dessin = $("#leSVG");
  $(SVG('path')).attr('d', "M " + x + " " + y + " m 0 " + r + " a " + r + " " + r + " 0 0 0 " + r + " " + (-r)).attr('stroke', couleur).attr('fill', 'none').attr('stroke-width', 1).appendTo(dessin);
  return $(SVG('path')).attr('d', "M " + x + " " + y + " m " + (2 * r) + " " + r + " a " + r + " " + r + " 0 0 0 " + (-r) + " " + r).attr('stroke', couleur).attr('fill', 'none').attr('stroke-width', 1).appendTo(dessin);
};

Tdroite = function(x, y, r, couleur) {
  var dessin;
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }
  if (r == null) {
    r = 20;
  }
  if (couleur == null) {
    couleur = 'blue';
  }
  dessin = $("#leSVG");
  $(SVG('path')).attr('d', "M " + x + " " + y + " m " + r + " 0 a " + r + " " + r + " 0 0 0 " + r + " " + r).attr('stroke', couleur).attr('fill', 'none').attr('stroke-width', 1).appendTo(dessin);
  return $(SVG('path')).attr('d', "M " + x + " " + y + " m " + r + " " + (2 * r) + " a " + r + " " + r + " 0 0 0 " + (-r) + " " + (-r)).attr('stroke', couleur).attr('fill', 'none').attr('stroke-width', 1).appendTo(dessin);
};

ligneTruchet = function(binaire, x, y, r, couleur) {
  var j, rang, ref, results;
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }
  if (r == null) {
    r = 20;
  }
  if (couleur == null) {
    couleur = 'blue';
  }
  results = [];
  for (rang = j = 0, ref = binaire.length; 0 <= ref ? j <= ref : j >= ref; rang = 0 <= ref ? ++j : --j) {
    if (binaire[rang] === "1") {
      results.push(Tgauche(x + r * rang, y, r / 2, couleur));
    } else {
      results.push(Tdroite(x + r * rang, y, r / 2, couleur));
    }
  }
  return results;
};

Tgc = function(x, y, r, cH, cV) {
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }
  if (r == null) {
    r = 20;
  }
  if (cH == null) {
    cH = 'red';
  }
  if (cV == null) {
    cV = 'red';
  }
  dessineSegment(x, y + r / 2, x + r / 2 - 3, y + r / 2, cH);
  dessineSegment(x + r / 2 + 3, y + r / 2, x + r, y + r / 2, cH);
  return dessineSegment(x + r / 2, y, x + r / 2, y + r, cV);
};

Tdc = function(x, y, r, cH, cV) {
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }
  if (r == null) {
    r = 20;
  }
  if (cH == null) {
    cH = 'red';
  }
  if (cV == null) {
    cV = 'red';
  }
  dessineSegment(x + r / 2, y, x + r / 2, y + r / 2 - 3, cV);
  dessineSegment(x + r / 2, y + r / 2 + 3, x + r / 2, y + r, cV);
  return dessineSegment(x, y + r / 2, x + r, y + r / 2, cH);
};

croixTruchet = function(binaire, x, y, r, cH, cV) {
  var j, rang, ref, results;
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }
  if (r == null) {
    r = 20;
  }
  if (cH == null) {
    cH = 'red';
  }
  if (cV == null) {
    cV = 'red';
  }
  results = [];
  for (rang = j = 0, ref = binaire.length; 0 <= ref ? j <= ref : j >= ref; rang = 0 <= ref ? ++j : --j) {
    if (binaire[rang] === "1") {
      results.push(Tgc(x + r * rang, y, r, cH, cV));
    } else {
      results.push(Tdc(x + r * rang, y, r, cH, cV));
    }
  }
  return results;
};

L1pair = function(x, y, r, couleur) {
  var dessin;
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }
  if (r == null) {
    r = 20;
  }
  if (couleur == null) {
    couleur = 'blue';
  }
  dessin = $("#leSVG");
  $(SVG('path')).attr('d', "M " + x + " " + y + " m 0 " + r + " a " + r + " " + r + " 0 0 0 " + r + " " + (-r) + " h " + (-r) + " z").attr('stroke', couleur).attr('fill', couleur).attr('stroke-width', 1).appendTo(dessin);
  return $(SVG('path')).attr('d', "M " + x + " " + y + " m " + (2 * r) + " " + r + " a " + r + " " + r + " 0 0 0 " + (-r) + " " + r + " h " + r + " z").attr('stroke', couleur).attr('fill', couleur).attr('stroke-width', 1).appendTo(dessin);
};

L1impair = function(x, y, r, couleur) {
  var dessin;
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }
  if (r == null) {
    r = 20;
  }
  if (couleur == null) {
    couleur = 'blue';
  }
  dessin = $("#leSVG");
  return $(SVG('path')).attr('d', "M " + x + " " + y + " m 0 " + r + " a " + r + " " + r + " 0 0 0 " + r + " " + (-r) + " h " + r + " v " + r + " a " + r + " " + r + " 0 0 0 " + (-r) + " " + r + " h " + (-r) + " z").attr('stroke', couleur).attr('fill', couleur).attr('stroke-width', 1).appendTo(dessin);
};

L0pair = function(x, y, r, couleur) {
  var dessin;
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }
  if (r == null) {
    r = 20;
  }
  if (couleur == null) {
    couleur = 'blue';
  }
  dessin = $("#leSVG");
  $(SVG('path')).attr('d', "M " + x + " " + y + " m " + r + " 0 a " + r + " " + r + " 0 0 0 " + r + " " + r + " v " + (-r) + " z").attr('stroke', couleur).attr('fill', couleur).attr('stroke-width', 1).appendTo(dessin);
  return $(SVG('path')).attr('d', "M " + x + " " + y + " m " + r + " " + (2 * r) + " a " + r + " " + r + " 0 0 0 " + (-r) + " " + (-r) + " v " + r + " z").attr('stroke', couleur).attr('fill', couleur).attr('stroke-width', 1).appendTo(dessin);
};

L0impair = function(x, y, r, couleur) {
  var dessin;
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }
  if (r == null) {
    r = 20;
  }
  if (couleur == null) {
    couleur = 'blue';
  }
  dessin = $("#leSVG");
  return $(SVG('path')).attr('d', "M " + x + " " + y + " m " + r + " 0 a " + r + " " + r + " 0 0 0 " + r + " " + r + " v " + r + " h " + (-r) + " a " + r + " " + r + " 0 0 0 " + (-r) + " " + (-r) + " v " + (-r) + " z").attr('stroke', couleur).attr('fill', couleur).attr('stroke-width', 1).appendTo(dessin);
};

Lpair = function(binaire, x, y, r, couleur) {
  var j, rang, ref, results;
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }
  if (r == null) {
    r = 20;
  }
  if (couleur == null) {
    couleur = 'blue';
  }
  results = [];
  for (rang = j = 0, ref = binaire.length; 0 <= ref ? j <= ref : j >= ref; rang = 0 <= ref ? ++j : --j) {
    if (binaire[rang] === "1") {
      if (rang % 2 === 1) {
        results.push(L1impair(x + r * rang, y, r / 2, couleur));
      } else {
        results.push(L1pair(x + r * rang, y, r / 2, couleur));
      }
    } else {
      if (rang % 2 === 1) {
        results.push(L0pair(x + r * rang, y, r / 2, couleur));
      } else {
        results.push(L0impair(x + r * rang, y, r / 2, couleur));
      }
    }
  }
  return results;
};

Limpair = function(binaire, x, y, r, couleur) {
  var j, rang, ref, results;
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }
  if (r == null) {
    r = 20;
  }
  if (couleur == null) {
    couleur = 'blue';
  }
  results = [];
  for (rang = j = 0, ref = binaire.length; 0 <= ref ? j <= ref : j >= ref; rang = 0 <= ref ? ++j : --j) {
    if (binaire[rang] === "1") {
      if (rang % 2 === 0) {
        results.push(L1impair(x + r * rang, y, r / 2, couleur));
      } else {
        results.push(L1pair(x + r * rang, y, r / 2, couleur));
      }
    } else {
      if (rang % 2 === 0) {
        results.push(L0pair(x + r * rang, y, r / 2, couleur));
      } else {
        results.push(L0impair(x + r * rang, y, r / 2, couleur));
      }
    }
  }
  return results;
};

TricotG = function(x, y, r, couleur) {
  var dessin;
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }
  if (r == null) {
    r = 20;
  }
  if (couleur == null) {
    couleur = "brown";
  }
  dessin = $("#leSVG");
  $(SVG('line')).attr('x1', x + r).attr('y1', y).attr('x2', x + 3 * r / 4).attr('y2', y + r / 4).attr('stroke', couleur).attr('stroke-width', r / 4).attr('stroke-linecap', 'square').appendTo(dessin);
  $(SVG('line')).attr('x1', x).attr('y1', y + r).attr('x2', x + r / 4).attr('y2', y + 3 * r / 4).attr('stroke', couleur).attr('stroke-width', r / 4).attr('stroke-linecap', 'square').appendTo(dessin);
  return $(SVG('line')).attr('x1', x).attr('y1', y).attr('x2', x + r).attr('y2', y + r).attr('stroke', couleur).attr('stroke-width', r / 4).attr('stroke-linecap', 'square').appendTo(dessin);
};

TricotD = function(x, y, r, couleur) {
  var dessin;
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }
  if (r == null) {
    r = 20;
  }
  if (couleur == null) {
    couleur = "brown";
  }
  dessin = $("#leSVG");
  $(SVG('line')).attr('x1', x).attr('y1', y).attr('x2', x + r / 4).attr('y2', y + r / 4).attr('stroke', couleur).attr('stroke-width', r / 4).attr('stroke-linecap', 'square').appendTo(dessin);
  $(SVG('line')).attr('x1', x + r).attr('y1', y + r).attr('x2', x + 3 * r / 4).attr('y2', y + 3 * r / 4).attr('stroke', couleur).attr('stroke-width', r / 4).attr('stroke-linecap', 'square').appendTo(dessin);
  return $(SVG('line')).attr('x1', x + r).attr('y1', y).attr('x2', x).attr('y2', y + r).attr('stroke', couleur).attr('stroke-width', r / 4).attr('stroke-linecap', 'square').appendTo(dessin);
};

ligneTricot = function(binaire, x, y, r, couleur) {
  var j, rang, ref, results;
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }
  if (r == null) {
    r = 20;
  }
  if (couleur == null) {
    couleur = 'brown';
  }
  results = [];
  for (rang = j = 0, ref = binaire.length; 0 <= ref ? j <= ref : j >= ref; rang = 0 <= ref ? ++j : --j) {
    if (binaire[rang] === "1") {
      results.push(TricotG(x + r * rang, y, r, couleur));
    } else {
      results.push(TricotD(x + r * rang, y, r, couleur));
    }
  }
  return results;
};
