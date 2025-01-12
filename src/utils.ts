/**
 * Fonction pour générer un dégradé de couleurs dans une plage de teintes spécifique.
 *
 * @param {number} index        - Index de l'élément
 * @param {number} total        - Nombre total d'éléments
 * @param {number} [hueStart=0] - Début de la plage de teintes (par défaut : 0)
 * @param {number} [hueEnd=360] - Fin de la plage de teintes (par défaut : 360)
 * @returns {string}            - Couleur au format HSL
 */
export function getColor(index: number, total: number, hueStart: number = 0, hueEnd: number = 300): string {
  const hue = hueStart + Math.floor((index / total) * (hueEnd - hueStart));

  return `hsl(${hue}, 100%, 50%)`;
}

/**
 * Fonction pour calculer la valeur prise par une fonction continue entre deux points déterminés (interpolation).
 *
 * @param {number} x  - Valeur à interpoler (axe des abscisses)
 * @param {number} x1 - Valeur de départ de l'intervalle (axe des abscisses)
 * @param {number} x2 - Valeur de fin de l'intervalle (axe des abscisses)
 * @param {number} y1 - Valeur associée à x1 (axe des ordonnées)
 * @param {number} y2 - Valeur associée à x2 (axe des ordonnées)
 * @returns {number}  - Valeur interpolée (axe des ordonnées)
 */
export function linearInterpolation(x: number, x1: number, x2: number, y1: number, y2: number): number {
  return y1 + ((y2 - y1) * (x - x1)) / (x2 - x1);
}

/**
 * Fonction pour générer une séquence de nombres linéairement espacés.
 *
 * @param {number} start            - Valeur de départ de l'intervalle
 * @param {number} stop             - Valeur de fin de l'intervalle
 * @param {number} num              - Nombre de valeurs à générer
 * @param {boolean} [endpoint=true] - Inclure la valeur de fin dans la séquence (par défaut : true)
 * @returns {number[]}              - Tableau de nombres linéairement espacés
 */
export function linspace(start: number, stop: number, num: number, endpoint: boolean = true): number[] {
  const div = endpoint ? num - 1 : num;
  const step = (stop - start) / div;

  return Array.from({ length: num }, (_, i) => start + step * i);
}

/**
 * Fonction pour convertir les valeurs des canaux RGB en une couleur hexadécimale.
 *
 * @param {number} r - Valeur du canal rouge (0-255)
 * @param {number} g - Valeur du canal vert (0-255)
 * @param {number} b - Valeur du canal bleu (0-255)
 * @returns {number} - La couleur RGB en format hexadécimal
 */
export function rgbToHex(r: number, g: number, b: number): number {
  return (r << 16) | (g << 8) | b;
}

/**
 * Fonction pour calculer la valeur d'une fonction sinusoïdale.
 *
 * @param {number} x             - Valeur de l'axe des abscisses
 * @param {number} [amplitude=1] - Amplitude de la sinusoïde (par défaut : 1)
 * @param {number} [period=1]    - Période de la sinusoïde (par défaut : 1)
 * @returns {number}             - Valeur de la fonction sinusoïdale
 */
export function sinusoidalFunction(x: number, amplitude: number = 1, period: number = 1): number {
  return amplitude * Math.sin((2 * Math.PI * x) / period);
}
