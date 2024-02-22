import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
        characters: [],
        activeFilters: [],
        genderFilter: "All",
        favoriteFilter: false,
        searchText: "",
    }
  },
  mutations: {
    setCharacters (state, value) {
        state.characters = [...value];
    },
    setFavoriteCharacter (state, value) {
        state.characters.map(c => {
            if(c.id === value) c.favorite = !c.favorite;
        });
    },
    setActiveFilters (state, value) {
        state.activeFilters = [...value];
    },
    setGenderFilter(state, value) {
        state.genderFilter = value;
    },
    setFavoriteFilter(state, value) {
        state.favoriteFilter = value;
    },
    setSearchText(state, value) {
        state.searchText = value;
    }
  }
});
