import { Application, Container, Graphics, RenderTexture } from "pixi.js";
import { colord } from "colord";

import { linearInterpolation, linspace, rgbToHex, sinusoidalFunction } from "./utils";

/**
 * Fonction pour générer les coordonnées d'une courbe paramétrée (cœur).
 *
 * @param {number} [amplitude=1]       - Amplitude de la courbe (par défaut : 1)
 * @param {number} [points=100]        - Nombre de points pour générer la courbe (par défaut: 100)
 * @param {number} [size=1]            - Taille du cœur (par défaut : 1)
 * @returns {{x: number, y: number}[]} - Tableau de points représentant la courbe
 */
function generateParametricCurve(
  amplitude: number = 1,
  points: number = 100,
  size: number = 1
): { x: number; y: number }[] {
  const t = linspace(0, 2 * Math.PI, points); // Séquence d'angles en radians

  return t.map((theta) => ({
    x: 16 * Math.pow(Math.sin(theta), 3) * amplitude * size,
    y:
      -(13 * Math.cos(theta) - 5 * Math.cos(2 * theta) - 2 * Math.cos(3 * theta) - Math.cos(4 * theta)) *
      amplitude *
      size,
  }));
}

(async () => {
  // Crée une nouvelle application Pixi.js
  const app = new Application();

  // Initialise l'application
  await app.init({ width: window.innerWidth, height: window.innerHeight, antialias: true });

  // Ajoute le canevas de l'application au corps du document
  document.body.appendChild(app.canvas);

  // Dimensions du canevas
  const canvasWidth = app.renderer.width;
  const canvasHeight = app.renderer.height;

  // Centre du canevas
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;

  // Étape 1 : Créer une RenderTexture
  const renderTexture = RenderTexture.create({ width: canvasWidth, height: canvasHeight });

  // Fonction pour dessiner des cœurs sur la RenderTexture
  function drawHeartsOnTexture() {
    const heartCount = 48;
    const baseAmplitude = 1;
    const pointCount = 100;

    // Conteneur pour les cœurs
    const heartContainer = new Container();
    // app.stage.addChild(heartContainer);

    for (let i = heartCount - 1; i >= 0; i--) {
      const curvePoints = generateParametricCurve(baseAmplitude + i, pointCount, 2);

      // Crée un nouvel objet Graphics
      const heart = new Graphics();

      // Calcule le canal rouge en fonction de l'indice
      const r = Math.floor((i / (heartCount - 1)) * 255);
      const g = 0; // Canal vert fixe
      const b = 0; // Canal bleu fixe

      // Génère la couleur hexadécimale
      const color = rgbToHex(r, g, b);

      // Crée un cœur
      curvePoints.forEach((point, index) => {
        if (index === 0) {
          heart.moveTo(point.x + centerX, point.y + centerY);
        } else {
          heart.lineTo(point.x + centerX, point.y + centerY);
        }
      });

      //Colorie le cœur
      heart.fill(color);

      // Ajoute le cœur au conteneur
      heartContainer.addChild(heart);
    }

    // Rends le conteneur sur la RenderTexture
    app.renderer.render({ container: heartContainer, target: renderTexture });
  }

  // Appelle la fonction
  drawHeartsOnTexture();

  // Étape 2 : Récupérer les valeurs RGB de la RenderTexture
  const { pixels } = app.renderer.extract.pixels(renderTexture);

  // Étape 3 : Dessiner les cercles sur le canevas principal

  // Conteneur pour les cercles
  const circleContainer = new Container();

  // Ajoute le conteneur à la scène principale
  app.stage.addChild(circleContainer);

  // Crée une Map pour associer les cercles à leurs propriétés supplémentaires
  const circleData = new Map();

  // Détermine l'espacement entre les cercles en fonction de la taille du canevas
  const circleStep = canvasWidth > canvasHeight ? canvasWidth / 90 : canvasHeight / 90;

  function drawCircles() {
    for (let x = circleStep; x <= canvasWidth; x += circleStep) {
      for (let y = circleStep; y <= canvasHeight; y += circleStep) {
        // Arrondi x et y pour éviter des indices flottants
        const roundedX = Math.floor(x);
        const roundedY = Math.floor(y);

        // Calcule l'indice correspondant dans le tableau pixels
        const index = (roundedY * canvasWidth + roundedX) * 4;

        // Récupère la valeur du canal rouge
        const r = pixels[index];

        // Interpole la valeur récupérée pour calculer une échelle
        const scale = linearInterpolation(r, 0, 255, 0, 1);

        //
        const hue = Math.round(scale * 360);
        const color = colord({ h: hue, s: 70, l: 50 }).toHex();

        // Crée un cercle et ajuste ses propriétés
        const circle = new Graphics().circle(0, 0, circleStep / 2).fill(color);
        circle.x = x;
        circle.y = y;
        circle.scale.set(scale);

        // Ajoute les propriétés supplémentaires dans la Map
        circleData.set(circle, { scale, hue });

        // Ajoute le cercle au conteneur
        circleContainer.addChild(circle);
      }
    }
  }

  // Appelle la fonction pour dessiner les cercles
  drawCircles();

  // Étape 4 : Animer les cercles en utilisant une fonction sinusoïdale

  // Variable pour contrôler l'animation dans le temps
  let increment = 0;

  // Ajoute un ticker pour animer les cercles
  app.ticker.add(() => {
    // Anime chaque cercle individuellement
    circleContainer.children.forEach((circle) => {
      // Récupère les données du cercle depuis la Map
      const data = circleData.get(circle);

      if (data) {
        // Animation de l'échelle
        const sinValueScale = sinusoidalFunction(increment - data.scale, 1, 0.4);

        // Normalisation de l'échelle vers [0, 1]
        const newScale = linearInterpolation(sinValueScale, -1, 1, 0, 1);
        circle.scale.set(newScale);
      }
    });

    increment += 0.005;
  });
})();
