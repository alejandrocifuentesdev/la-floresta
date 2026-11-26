# La Floresta Pearson

La Floresta Pearson es una guía de mi barrio, La Floresta, en Sant Cugat del Vallès. La creé para reunir en un mismo sitio los próximos eventos, los cursos y talleres, los comercios y los puntos de interés de la zona.

**[Visitar laflorestapearson.cat](https://laflorestapearson.cat/)**

## Qué se puede consultar

- **Agenda de actividades.** Próximos eventos del barrio, con una ficha para consultar el cartel, la fecha, el lugar y la descripción. [Ver la agenda](https://laflorestapearson.cat/agenda)
- **Cursos y talleres.** Un espacio propio para consultar las propuestas formativas y los detalles de cada actividad. [Explorar cursos y talleres](https://laflorestapearson.cat/cursos-tallers)
- **Comercios y servicios.** Un directorio con filtros por categoría para encontrar bares, restaurantes, tiendas y otros servicios del barrio. [Ver comercios](https://laflorestapearson.cat/comercos)
- **Mapa del barrio.** Un mapa interactivo con marcadores que permiten consultar información sobre cada punto de interés. [Abrir el mapa](https://laflorestapearson.cat/mapa)

## Cómo funciona

Desarrollé tanto la web pública como el panel privado que utilizo para mantenerla al día. Cuando hay un concierto en el barrio, por ejemplo, introduzco el título, la fecha, el lugar, la descripción y el enlace al cartel. Al guardar la ficha, la actividad aparece en la agenda. Si cambia el lugar del concierto, puedo corregirlo desde el mismo panel.

La interfaz está hecha con **React** y se comunica con una **API REST** que desarrollé con **Java y Spring Boot**. La API guarda la información en **PostgreSQL** mediante **Spring Data JPA**. La web pública consulta esos datos y el panel de administración permite crear, editar y eliminar las fichas.

## Tecnologías

| Parte del proyecto | Tecnologías |
|---|---|
| Frontend | JavaScript, React, React Router y Vite |
| Backend | Java, Spring Boot, Spring Security y Maven |
| Persistencia | PostgreSQL y Spring Data JPA |
| Mapa interactivo | React Leaflet y cartografía de OpenStreetMap |

El código está organizado en dos carpetas. [`frontend/`](https://github.com/alejandrocifuentesdev/la-floresta/tree/main/frontend) contiene las páginas públicas, el mapa y el panel de administración. [`backend/`](https://github.com/alejandrocifuentesdev/la-floresta/tree/main/backend) contiene la API y el acceso a la base de datos.
