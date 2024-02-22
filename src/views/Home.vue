<template>
  <div>
    <Header></Header>

    <Navbar></Navbar>

    <div v-if="isLoading" class="notification-container">
      <Notification
        title="¡Cargando datos!"
        text="Estamos trabajando para brindarte la mejor experiencia..."
      ></Notification>
    </div>

    <Content
      v-else
      :characters="characters"
      :characterSuggestion="characterSuggestion"
      :isLoading="isLoading"
      @get-character-suggestion="getCharacterSuggestion"
      @reset-filters="resetFilters"
    ></Content>

    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../components/core/Header.vue";
import Navbar from "../components/core/Navbar.vue";
import Notification from "../components/ui/Notification.vue";
import Content from "../components/core/Content.vue";
import Footer from "../components/core/Footer.vue";

import { characterService } from "../services/characterService";
import { episodeService } from "../services/episodeService.js";

export default {
  components: {
    Header,
    Navbar,
    Notification,
    Content,
    Footer,
  },
  data: () => ({
    isLoading: true,
    characters: [],
    characterSuggestion: [],
    genderFilter: {},
    searchText: "",
  }),
  mounted() {
    // se hace el llamado de la funcion que obtiene los datos de la app
    this.getData();
  },
  computed: {
    getCharacters() {
      // retorna los personajes cada vez que haya una actualizacion
      return this.$store.state.characters;
    },
    getActiveFilters() {
      // retorna los filtros activos cada vez que haya una actualizacion
      const formattedFilters = this.setFormattedFilters(
        this.$store.state.activeFilters
      );

      return formattedFilters;
    },
    getGenderFilter() {
      // retorna el valor del filtro genero cada vez que haya una actualizacion
      return this.$store.state.genderFilter;
    },
    getFavoriteFilter() {
      // retorna el valor del filtro favorito cada vez que haya una actualizacion
      return this.$store.state.favoriteFilter;
    },
    getSearchText() {
      // retorna el texto de busqueda cada vez que haya una actualizacion
      return this.$store.state.searchText;
    },
  },
  watch: {
    getActiveFilters(value) {
      // llama a la funcion que solicita filtrar los personajes
      // cuando detecta un cambio en los filtros aplicados
      this.setFilterCharactersBy(value);
    },
    getGenderFilter() {
      // llama a la funcion que solicita filtrar los personajes
      // cuando detecta un cambio en el filtro de genero
      this.setFilterCharactersBy(this.getActiveFilters);
    },
    getFavoriteFilter() {
      // llama a la funcion que solicita filtrar los personajes
      // cuando detecta un cambio en el filtro favorito
      this.setFilterCharactersBy(this.getActiveFilters);
    },
    getSearchText() {
      // llama a la funcion que solicita filtrar los personajes
      // cuando detecta un cambio en el texto de busqueda
      this.setFilterCharactersBy(this.getActiveFilters);
    },
  },
  methods: {
    async getData() {
      try {
        const items = [];
        // peticion para obtener los personajes
        const characters = await characterService.getCharacters(
          "https://rickandmortyapi.com/api/character"
        );

        // peticion para obtener los episodios de los personajes
        const charactersWithFirstEpisodes = await Promise.all(
          characters.results.map(async (character) => {
            // url del primer episodio
            const firstEpisodeUrl = character.episode[0];

            // peticion para obtener los datos del primer episodio
            const firstEpisode = await episodeService.getEpisodes(
              firstEpisodeUrl
            );

            // retorna un objeto con el personaje y su primer episodio
            return {
              character,
              firstEpisode,
            };
          })
        );

        // se itera cada uno de los personajes
        charactersWithFirstEpisodes.map(({ character, firstEpisode }) => {
          // se crea un clon de cada personaje con su informacion original
          // y se añade la llave de primer episodio y favorito
          items.push({
            ...character,
            firstSeenIn: firstEpisode.name,
            favorite: false,
          });
        });

        // se actualiza el estado, los personajes para alimentar el componente Content
        // y se actualiza el valor del cargador para motrar su contenido
        this.$store.commit("setCharacters", items);
        this.characters = [...items];
        this.isLoading = !this.isLoading;
      } catch (error) {
        console.error("Error fetching characters with first episodes:", error);
        throw error;
      }
    },
    getCharacterSuggestion() {
      this.characterSuggestion = [];

      // iteramos 2 veces para obtener un indice aleatorio
      // y luego lo añadimos al arreglo de personajes sujeridos
      for (let i = 0; i < 2; i++) {
        const index = Math.floor(Math.random() * this.getCharacters.length);
        const randomCharacter = this.getCharacters[index];

        this.characterSuggestion.push(randomCharacter);
      }
    },
    setFormattedFilters(filterArray) {
      // recibe un arreglo y lo formatea a un objeto
      // que tiene cada una de las llaves de los filtros activos
      const filterObj = {};

      filterArray.forEach((f) => {
        filterObj[f.id] = this.getSearchText;
      });

      return filterObj;
    },
    setFilterCharactersBy(filters = {}) {
      // solicita filtrar los personajes con los filtros indicados
      const result = this.getFilterCharacterByGenderAndFavorites(
        this.getCharacters,
        filters
      );

      this.characters = [...result];
    },
    getFilterCharacterByGenderAndFavorites(characters, filters) {
      // filtra los personajes unicamente por genero y favorito
      const charactersWithFilter = characters.filter((c) => {
        if (this.getGenderFilter === "All" && !this.getFavoriteFilter) {
          // caso para todos los generos y favoritos y no favoritos
          return true;
        }
        if (this.getGenderFilter === "All" && this.getFavoriteFilter) {
          // caso para todos los generos y favoritos
          return c.favorite === true;
        }
        if (this.getGenderFilter !== "All" && !this.getFavoriteFilter) {
          // caso para genero especificado y favoritos y no favoritos
          return c.gender.toLowerCase() === this.getGenderFilter.toLowerCase();
        }
        if (this.getGenderFilter !== "All" && this.getFavoriteFilter) {
          // caso para genero especificado y favoritos
          return (
            c.gender.toLowerCase() === this.getGenderFilter.toLowerCase() &&
            c.favorite === this.getFavoriteFilter
          );
        }

        return false;
      });

      // si el campo de busqueda no esta vacio, se aplican los fitros restantes
      // de lo contrario se retorna los personajes filtrados por genero y favorito
      if (this.getSearchText !== "") {
        return this.getFilterCharacterByOtherFilters(
          charactersWithFilter,
          filters
        );
      }

      return charactersWithFilter;
    },
    getFilterCharacterByOtherFilters(characters, filters) {
      // filtra los personajes unicamente por:
      // nombre, estatus, especie, ultima ubicacion y primer episodio
      if (Object.keys(filters).length === 0 && filters.constructor === Object) {
        // si el usuario no especifica filtro, se realiza la busqueda
        // para encontrar todas las coincidencias del campo de texto
        const allFilters = [
          { id: "name", name: "Name", checked: false },
          { id: "status", name: "Status", checked: false },
          { id: "species", name: "Species", checked: false },
          { id: "location", name: "Last known location", checked: false },
          { id: "firstSeenIn", name: "First seen in", checked: false },
        ];

        filters = Object.assign({}, this.setFormattedFilters(allFilters));
      }

      // se itera el arreglo de personajes y el arreglo de filtros
      return characters.filter((c) => {
        for (const f in filters) {
          // retorna true para los elementos que tengan al menos
          // una coincidencia de una de sus llaves
          if (f === "location") {
            if (c[f].name.toLowerCase().includes(filters[f].toLowerCase()))
              return true;
          } else {
            if (c[f].toLowerCase().includes(filters[f].toLowerCase()))
              return true;
          }
        }

        return false;
      });
    },
    resetFilters() {
      // setea los valores iniciales para los filtros,
      // campo de busqueda y personajes mostrados
      this.$store.commit("setGenderFilter", "All");
      this.$store.commit("setFavoriteFilter", false);
      this.$store.commit("setSearchText", "");
      this.characters = [...this.getCharacters];
    },
  },
};
</script>

<style scoped>
.notification-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 678px);
}

</style>

