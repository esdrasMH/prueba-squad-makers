<template>
  <div class="content">
    <section class="show-favorites">
      <p>Mostrar favoritos:</p>
      <Favorite
        :status="getStatus"
        backgroundColor="#e0e0e0"
        @click="setFilterActive"
      ></Favorite>
    </section>

    <div v-if="!characters.length" class="notification-container">
      <Notification title="Uh-oh!" text="¡Pareces perdido en tu viaje!">
        <template v-slot:button>
          <Button text="Eliminar filtros" @click="resetFilters"></Button>
        </template>
      </Notification>
    </div>

    <div v-else>
      <section class="cards-container">
        <Card
          v-for="character in characters"
          class="card"
          :key="character.id"
          :character="character"
          @set-modal="setModal"
          @set-details="setDetails"
        ></Card>
      </section>
    </div>

    <ModalDetails
      :show="showModal"
      :characterDetails="characterDetails"
      :episodes="episodes"
      :characterSuggestion="characterSuggestion"
      @set-modal="setModal"
      @set-details="setDetails"
    ></ModalDetails>
  </div>
</template>

<script>
import Favorite from "../ui/Favorite.vue";
import Card from "../ui/Card.vue";
import ModalDetails from "../ui/ModalDetails.vue";
import Notification from "../ui/Notification.vue";
import Button from "../ui/Button.vue";
import { episodeService } from "../../services/episodeService.js";

export default {
  name: "Header",
  components: {
    Favorite,
    Card,
    ModalDetails,
    Notification,
    Button,
  },
  props: {
    characters: { required: true, type: Array },
    isLoading: { required: true, type: Boolean },
    characterSuggestion: { required: true, type: Array },
  },
  computed: {
    getStatus() {
      return this.$store.state.favoriteFilter;
    }
  },
  data: () => ({
    showModal: false,
    characterDetails: {},
    episodes: [],
  }),
  methods: {
    setFilterActive() {
      this.$store.commit("setFavoriteFilter", !this.getStatus);
    },
    setModal(value) {
      this.$emit("get-character-suggestion");
      this.showModal = value;
    },
    setDetails(id) {
      const element = this.characters.find((c) => c.id === id);

      this.getEpisode(element);

      this.characterDetails = Object.assign({}, element);
    },
    getEpisode(character) {
      this.episodes = [];

      character.episode.forEach((e) => {
        episodeService.getEpisodes(e).then((data) => this.episodes.push(data));
      });
    },
    resetFilters() {
      this.$emit("reset-filters");
    },
  },
};
</script>

<style scoped>
.content {
  margin: 0 auto;
  width: 100%;
  max-width: 1026px;
  height: 100%;
  min-height: calc(100vh - 679px);
}
.cards-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  margin-bottom: 60px;
}

.show-favorites {
  display: flex;
  align-items: center;
  margin: 46px 0 22px;
}

.favorites {
  margin-left: 12px;
}

.show-favorites .favorite {
  top: 0;
  left: 12px;
}

.notification-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 826px);
}

</style>