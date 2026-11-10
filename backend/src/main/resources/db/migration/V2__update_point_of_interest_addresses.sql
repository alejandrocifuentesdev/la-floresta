-- Corrigeix les adreces dels punts d'interès de La Floresta.
-- Les dades es van afegir inicialment amb algunes ubicacions genèriques.

UPDATE point_of_interest
SET address = 'Plaça Miquel Ros, 08198 La Floresta, Sant Cugat del Vallès'
WHERE name = 'Estació de La Floresta';

UPDATE point_of_interest
SET address = 'Carrer del Ginjoler, 6, 08198 La Floresta, Sant Cugat del Vallès'
WHERE name IN ('Pavelló de La Floresta', 'Pavelló La Floresta', 'Pavelló Can Llobet');

UPDATE point_of_interest
SET address = 'Carrer del Casino, 27, 08198 La Floresta, Sant Cugat del Vallès'
WHERE name = 'Casino La Floresta';

UPDATE point_of_interest
SET address = 'Avinguda de la Verge de Montserrat, 47, 08198 La Floresta, Sant Cugat del Vallès'
WHERE name = 'Parròquia de Nostra Senyora de Montserrat';

UPDATE point_of_interest
SET address = 'Carrer del Ginjoler, 6, 08198 La Floresta, Sant Cugat del Vallès'
WHERE name = 'Piscina Municipal de La Floresta';

UPDATE point_of_interest
SET address = 'Carrer del Ginjoler, 1, 08198 La Floresta, Sant Cugat del Vallès'
WHERE name = 'Skatepark de La Floresta';

UPDATE point_of_interest
SET address = 'Carrer del Ginjoler, 6, 08198 La Floresta, Sant Cugat del Vallès'
WHERE name = 'Zona de cal·listènia de Can Llobet';

UPDATE point_of_interest
SET address = 'Plaça Miquel Ros, 08198 La Floresta, Sant Cugat del Vallès'
WHERE name = 'Plaça Miquel Ros';

UPDATE point_of_interest
SET address = 'Plaça Josep Playà, 08198 La Floresta, Sant Cugat del Vallès'
WHERE name = 'Plaça Josep Playà';
