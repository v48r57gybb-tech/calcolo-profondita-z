const installed = new WeakMap();

export function installResultGuard(container) {
  if (!container) throw Error('Contenitore dei calcolatori non trovato');
  if (installed.has(container)) return installed.get(container);

  function invalidate(message = '') {
    const result = container.querySelector('#out');
    const hadResult = Boolean(result);
    result?.remove();
    let status = container.querySelector('#result-stale');
    if (!message) {
      status?.remove();
    } else if (hadResult) {
      if (!status) {
        status = container.ownerDocument.createElement('p');
        status.id = 'result-stale';
        status.setAttribute('role', 'status');
        status.setAttribute('aria-live', 'polite');
        container.append(status);
      }
      status.textContent = message;
    }
  }

  function onEdit(event) {
    if (event.target?.matches?.('input, select, textarea')) {
      invalidate('Dati modificati: premi Calcola S e F per ottenere un nuovo risultato.');
    }
  }

  function beforeAction(event) {
    const button = event.target?.closest?.('button');
    if (button && container.contains(button)) invalidate();
  }

  container.addEventListener('input', onEdit, true);
  container.addEventListener('change', onEdit, true);
  container.addEventListener('click', beforeAction, true);

  const uninstall = () => {
    container.removeEventListener('input', onEdit, true);
    container.removeEventListener('change', onEdit, true);
    container.removeEventListener('click', beforeAction, true);
    installed.delete(container);
  };
  installed.set(container, uninstall);
  return uninstall;
}

if (typeof document !== 'undefined') {
  const page = document.getElementById('page');
  if (page) installResultGuard(page);
}
