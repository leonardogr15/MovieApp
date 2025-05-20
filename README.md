Decisiones tecnicas clave
    1- separación de MovieForm, SearchBar, MovieList y Toast para mantener claridad de responsabilidades
    2- hooks useState y useEffect para sincronizar con localStorage sin librerias adicionales
    3- el uso de dos colecciones en localStorage, son all-movies y fav-ids (IDS de favoritos), garantizando la distincion de las busquedas
    4- menu lateral hecho con HTML/CSS para evitar dependencias de UI
    5- validación de duplicados por título y año

Que mejoraria con mas tiempo
    1- Añadir edicion de películas ya guardadas
    2- Implementar paginación y búsqueda avanzada con debounce
    3- Incluir animaciones más complejas
    4- Extraer lógica de hooks para reutilización y limpieza


Cómo ejecutar el proyecto localmente

    1- Clona el repositorio:
        1.1- git clone https://github.com/leonardogr15/MovieApp.git
        1.2- cd react-movie-app

    2- Instala las dependencias:
        2.1- npm install

    3- Inicia el servidor de desarrollo:
        3.1- npm run dev
        3.2- Abre tu navegador en http://localhost:3000



Reflexión

Actualmente la principal limitante que presente fue respecto al tiempo, pero React permitio avanzar muy rapido debido a su forma de dividir la interfaz en componentes pequeños y reutilizables permitió avanzar muy rápido.

No represento un desafío entender la API de TMDB debido a que su informacion fue muy clara, pero organizar el flujo (buscador, formulario, lista de favoritas) y la sincronización con localStorage sin el uso de librerías externas. Gracias a los hooks y a la composición de componentes, pude montar la logica de favoritos y notificaciones.

Para que el proyecto siga creciendo, me gustaría extraer la persistencia en un useLocalStorage, añadir validaciones mas sólidas y un sistema de pruebas simples. Pero, sobre todo, quedo emocionado de que React, permite prototipar funciones complejas de forma rapido debido a que usualmente en mi ambiente laboral realizaba personalizaciones y correcciones mas sencillas sobre una app ya estructurada.