# Calcolo Z: Gestionale 2.0 in sviluppo

Solo ramo gestionale-v2. Main e index.html 1.4 non vengono modificati. Nessun database collegato o modificato.

Inclusi: interfaccia a categorie, foto/OCR con revisione, calcolatori matematici S/F, collegamento alla 1.4, interfacce magazzino, richieste utensili/DPI/accessori e gestione account.

Non attivi: account, magazzino e ordini condivisi. Config.json è intenzionalmente vuoto. Le restrizioni del frontend NON sostituiscono permessi server. Backend e RLS vanno collegati e collaudati prima dell'uso reale. Nessuna chiave privata o credenziale è presente.

Non completati: preset automatici Vc/fz/fn, preforo automatico rullatura, selezione automatica ciclo. Si usano dati di catalogo manuali, senza inventare valori. D-P è solo preforo indicativo per asportazione metrica ISO a un principio. La lunghezza filetto non diventa automaticamente corsa del maschio.

OCR Tesseract.js 5.1.1 da CDN su richiesta; foto elaborata nel browser, controllare cifre e ordine.

24 test unitari matematici/parser e controllo sintattico app.js eseguiti nell'ambiente di sviluppo. Non eseguiti test iPhone, OCR reale, database, quattro account o permessi RLS.

Il ramo separato non è automaticamente un sito di anteprima: occorre pubblicazione distinta prima di fornire un link di prova.
