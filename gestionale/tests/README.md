# Protezione dei risultati residui

Aprire result-guard.browser.html tramite un server HTTP che serva la cartella gestionale. Non usare file:// per i moduli JavaScript.

16 test browser autonomi eseguiti con successo in Chromium headless. Verificano il modulo di protezione con DOM reale e core.mjs: risultato valido, invalidazione su input/change, nuovo calcolo unico, rimozione prima di un errore, installazione idempotente. Non sono un collaudo completo del gestionale.

Inoltre sono state riprodotte 2 anomalie precedenti ed eseguite 21 verifiche su una fixture locale con la funzione calculator e helper copiati da app.js, in viewport 390x844. Tutte positive dopo la patch. La fixture di integrazione non è inclusa qui. Nessun test su iPhone reale, server o database.

Il modulo elimina #out al cambio dei campi e, in fase di cattura, prima delle azioni sui pulsanti nel contenitore #page. Non modifica i valori inseriti né le formule. I cambi di valore eseguiti da codice devono emettere input/change, oppure essere seguiti da un ricalcolo. Se in futuro si aggiungono pulsanti di stampa/esportazione ai calcolatori, la loro gestione va distinta dalle azioni che invalidano il risultato.

Main e calcolatore 1.4 non sono modificati. Restano da correggere bozze, navigazione asincrona e altre incompletezze del gestionale.
