LOCK TABLE event IN SHARE ROW EXCLUSIVE MODE;

INSERT INTO event (title, description, date, location, image_url)
SELECT
    'Circ en família',
    'Matinal de circ d’Aire Circ Viu, d’11.30 a 13.30 h. Infants i adults podran enfilar-se, balancejar-se i jugar amb les monitores. No cal experiència. A les 13.30 h, paella de carn o vegana opcional. Gratuïta per a menors de 3 anys i majors de 75 anys.',
    DATE '2026-11-22',
    'Sala UREF',
    '/images/events/circ-en-familia-2026-11-22.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM event
    WHERE title = 'Circ en família' AND date = DATE '2026-11-22'
);
