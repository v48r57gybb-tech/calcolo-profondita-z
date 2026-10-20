import test from 'node:test';
import assert from 'node:assert/strict';
import { num, quotes, calc, zcalc, ordersAdmin, accountsAdmin } from './core.mjs';

const close = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-8);
const cases = [
  ['Lamatura punta gradino',19,5.4,4.5,.9,18.1],
  ['Lamatura punta gradino',19,6.4,5.2,1.2,17.8],
  ['Lamatura fresa',27,5.4,4.5,.9,26.1],
  ['Lamatura fresa',28,6.4,5.2,1.2,26.8],
  ['Svasatura',26.5,7.7,8.4,.7,25.8],
  ['Svasatura',27,7.7,8.4,.7,26.3]
];
cases.forEach(([w,z,p,q,sc,zc],i) => test('Formula Z ' + (i+1), () => {
  const r=zcalc(w,z,p,q); close(r.sc,sc); close(r.zc,zc);
}));
test('Z iniziale 20', () => close(zcalc('Lamatura punta gradino',20,5.4,4.5).zc,19.1));
test('10 quote esempio', () => assert.equal(quotes('5,4 5,2 5,6 5,2 5,1 5,1 5,25 4,95 4,75 4,88').length,10));
test('30 quote', () => assert.equal(quotes(Array(30).fill('5,25').join(' ')).length,30));
test('Separatori validi', () => assert.deepEqual(quotes('5.4;5,2\n5,6'),[5.4,5.2,5.6]));
for(const s of ['5,4,5,2','5,45,25,6','5.4.5','x','','<img>'])
  test('Rifiuto quota: ' + JSON.stringify(s), () => assert.throws(() => quotes(s)));
test('525 non viene reinterpretato', () => assert.equal(quotes('525')[0],525));
test('F fresatura', () => close(calc('mill',10,100,.05,4).f,636.6197723675814));
test('F foratura', () => close(calc('drill',10,100,.2).f,636.6197723675814));
test('F maschiatura', () => close(calc('tap',10,10,1.5).f,477.464829275686));
test('Diametro zero', () => assert.throws(() => calc('mill',0,100,.1,4)));
test('Taglienti non interi', () => assert.throws(() => calc('mill',10,100,.1,2.5)));
test('Permessi UI Manuel', () => { assert.ok(ordersAdmin('manuel')); assert.equal(ordersAdmin('martino'),false); });
test('Permessi UI Martino', () => { assert.ok(accountsAdmin('martino')); assert.equal(accountsAdmin('manuel'),false); });
test('R1 tipo sconosciuto', () => assert.throws(() => calc('unknown',10,100,.1), /Tipo di calcolo/));
test('R2 overflow Vc', () => assert.throws(() => calc('mill',10,'1'+'0'.repeat(307),.1,4), /S non rappresentabile/));
test('R3 diametro minuscolo', () => assert.throws(() => calc('drill','0.'+'0'.repeat(319)+'1',100,.1), /S non rappresentabile/));
test('Overflow solo avanzamento F', () => assert.throws(() => calc('drill',10,100,'1'+'0'.repeat(307)), /F non rappresentabile/));
test('Underflow S a zero', () => assert.throws(() => calc('drill','1'+'0'.repeat(307),'0.'+'0'.repeat(319)+'1',.1), /S non rappresentabile/));
test('Underflow F a zero', () => assert.throws(() => calc('drill',10,'0.'+'0'.repeat(309)+'1','0.'+'0'.repeat(309)+'1'), /F non rappresentabile/));
test('Taglienti oltre precisione intera', () => assert.throws(() => calc('mill',10,100,.1,'9007199254740992'), /Taglienti/));
test('Punto e virgola nei dati di taglio', () => close(calc('mill','10,0','100.0','0,05','4').f,636.6197723675814));
test('Input Infinity rifiutato', () => assert.throws(() => num(Infinity)));
test('Valori finiti senza arrotondamenti intermedi', () => {
  const r=calc('mill',13,87,.037,3);
  assert.equal(r.s,1000*87/(Math.PI*13)); assert.equal(r.f,r.s*.037*3);
});
