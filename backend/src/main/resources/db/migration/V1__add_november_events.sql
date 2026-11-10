-- This data migration targets the existing Hibernate-managed event table.
-- Serialize inserts while checking for events already present in production.
LOCK TABLE event IN SHARE ROW EXCLUSIVE MODE;

INSERT INTO event (title, description, date, location, image_url)
SELECT incoming.title, incoming.description, incoming.date, incoming.location, incoming.image_url
FROM (VALUES
    (
        'Suena la Floresta',
        'Suena La Floresta és un esdeveniment ple de música del món, ball, comunitat i molta alegria. Prepara’t per un viatge musical amb sons balcànics, música grega, folk català i llatinoamericà, cúmbia i molt més. ',
        DATE '2026-11-07',
        'El Casino La Floresta',
        '/images/business/suena.jpg'
    ),
    (
        'Rocktober Fest',
        E'Dissabte 15 de novembre, concerts a la UREF.\n A partir de les 17 h, xocolata amb xurros per a qui en vulgui. \nA partir de les 19 h, entrepans de brasa.\n Entrada: 5 € en efectiu. Us esperem amb més música.',
        DATE '2026-11-15',
        'Sala UREF',
        '/images/events/rocktober.jpg'
    ),
    (
        'Ecstatic Dance',
        E'Sessió de moviment lliure i dansa per connectar amb el cos, expressar-se i gaudir de la música sense coreografies. Un espai per ballar, deixar-se anar i compartir.\n\nAportació: 15 € en efectiu.\n Portes obertes des de les 18:00 h.',
        DATE '2026-11-20',
        'Sala UREF',
        '/images/events/ecstatic.jpg'
    ),
    (
        'Concierto meditativo',
        'Concert meditatiu amb violí, veu i bols de quars, a càrrec de Mireia Mora i Anna Cano. Una proposta íntima per relaxar-se i gaudir d’un espai de calma i connexió.',
        DATE '2026-11-15',
        'Plaça Miquel Ros, La Floresta',
        '/images/events/paz.jpg'
    )
) AS incoming(title, description, date, location, image_url)
WHERE NOT EXISTS (
    SELECT 1 FROM event existing
    WHERE existing.title = incoming.title AND existing.date = incoming.date
);
