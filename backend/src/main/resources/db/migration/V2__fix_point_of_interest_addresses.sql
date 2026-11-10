-- Correct the public-facing addresses of La Floresta points of interest.
-- The records were originally created with several generic/approximate locations.

UPDATE point_of_interest
SET address = CASE
    WHEN lower(name) LIKE '%estació%floresta%' THEN 'Plaça de Miquel Ros, 08198 Sant Cugat del Vallès'
    WHEN lower(name) LIKE '%pavelló%floresta%' THEN 'Carrer del Ginjoler, 6, 08198 Sant Cugat del Vallès'
    WHEN lower(name) LIKE '%casino%floresta%' THEN 'Carrer del Casino, 27, 08198 Sant Cugat del Vallès'
    WHEN lower(name) LIKE '%montserrat%' THEN 'Avinguda de la Verge de Montserrat, 47, 08198 Sant Cugat del Vallès'
    WHEN lower(name) LIKE '%piscina%floresta%' THEN 'Carrer del Ginjoler, 6, 08198 Sant Cugat del Vallès'
    WHEN lower(name) LIKE '%skatepark%' THEN 'Carrer del Ginjoler, 6, 08198 Sant Cugat del Vallès'
    WHEN lower(name) LIKE '%cal·listènia%' OR lower(name) LIKE '%calistenia%' THEN 'Carrer del Ginjoler, 6, 08198 Sant Cugat del Vallès'
    WHEN lower(name) LIKE '%miquel ros%' THEN 'Plaça Miquel Ros, 08198 Sant Cugat del Vallès'
    WHEN lower(name) LIKE '%josep play%' THEN 'Plaça de Josep Playà, 08198 Sant Cugat del Vallès'
    ELSE address
END
WHERE
    lower(name) LIKE '%estació%floresta%'
    OR lower(name) LIKE '%pavelló%floresta%'
    OR lower(name) LIKE '%casino%floresta%'
    OR lower(name) LIKE '%montserrat%'
    OR lower(name) LIKE '%piscina%floresta%'
    OR lower(name) LIKE '%skatepark%'
    OR lower(name) LIKE '%cal·listènia%'
    OR lower(name) LIKE '%calistenia%'
    OR lower(name) LIKE '%miquel ros%'
    OR lower(name) LIKE '%josep play%';
