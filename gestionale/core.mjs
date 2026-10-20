export function num(s) {
  s = String(s).trim();
  if (!/^[+-]?\d+(?:[.,]\d+)?$/.test(s)) throw Error('Numero non valido: ' + s);
  const n = Number(s.replace(',', '.'));
  if (!Number.isFinite(n)) throw Error('Numero non rappresentabile');
  return n;
}

export function pos(s) {
  const n = num(s);
  if (n <= 0) throw Error('Valore maggiore di zero richiesto');
  return n;
}

export function quotes(s) {
  if (!s.trim()) throw Error('Inserisci almeno una quota');
  return s.trim().split(/[\s;]+/).map(num);
}

function checkedResult(value, label) {
  if (!Number.isFinite(value) || value <= 0) {
    throw Error(label + ' non rappresentabile dal browser. Controlla i dati inseriti.');
  }
  return value;
}

export function calc(mode, d, vc, feed, z = 1) {
  if (!['tap', 'mill', 'drill'].includes(mode)) {
    throw Error('Tipo di calcolo non valido: seleziona maschiatura, fresatura o foratura.');
  }
  const diameter = pos(d);
  const cuttingSpeed = pos(vc);
  const advance = pos(feed);
  const teeth = mode === 'mill' ? pos(z) : 1;
  if (mode === 'mill' && !Number.isSafeInteger(teeth)) throw Error('Taglienti non interi o non rappresentabili esattamente');
  const s = checkedResult(1000 * cuttingSpeed / (Math.PI * diameter), 'S');
  const f = checkedResult(s * advance * teeth, 'F');
  return { s, f };
}

export function zcalc(w, z, p, q) {
  const sc = w === 'Svasatura' ? q - p : p - q;
  return { sc, zc: z - sc };
}

export const ordersAdmin = h => h === 'manuel';
export const accountsAdmin = h => h === 'martino';
