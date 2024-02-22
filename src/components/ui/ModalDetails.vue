<template>
  <div v-if="show" class="modal-overlay" @click="closeModal">
    <div class="modal" @click.stop>
      <img
        class="close-icon"
        src="../../assets/icon/close.png"
        alt="close icon"
        @click="closeModal"
      />
      <img class="avatar" :src="characterDetails.image" alt="image " />
      <Favorite
        :status="characterDetails.favorite"
        :iconBorder="true"
        backgroundColor="#F2F2F2"
      ></Favorite>
      <div class="background-container">
        <p class="status">{{ characterDetails.status }}</p>
        <p class="name">{{ characterDetails.name }}</p>
        <p class="species">{{ characterDetails.species }}</p>
      </div>
      <div class="container">
        <div class="info-container">
          <h3>Información</h3>
          <div class="info-labels-container">
            <Label txt1="Gender:" :txt2="characterDetails.gender"></Label>
            <Label txt1="Origin:" :txt2="characterDetails.origin.name"></Label>
            <Label
              txt1="Type:"
              :txt2="characterDetails.type || 'unknown'"
            ></Label>
          </div>
        </div>
        <div class="episode-container">
          <h3>Episodios</h3>
          <div class="episode-labels-container">
            <Label
              v-for="{ id, name, episode, air_date } in episodes"
              :key="id"
              :maxHeight="true"
              :txt1="name"
              :txt2="episode"
              :txt3="air_date"
            ></Label>
          </div>
        </div>
        <div class="character-container">
          <h3>Personajes interesantes</h3>
          <div>
            <Card
              v-for="character in characterSuggestion"
              class="card"
              :key="character.id"
              :character="character"
              @click="setDetails(character.id)"
            ></Card>
          </div>
        </div>
      </div>
      <Button @custom-click="closeModal" text="Compartir personaje"></Button>
    </div>
  </div>
</template>

<script>
import Label from "./Label.vue";
import Favorite from "./Favorite.vue";
import Card from "./Card.vue";
import Button from "./Button.vue";

export default {
  name: "ModalDetails",
  components: {
    Label,
    Favorite,
    Card,
    Button,
  },
  props: {
    show: { default: false, type: Boolean },
    characterDetails: { required: true, type: Object },
    episodes: { required: true },
    characterSuggestion: { required: true, type: Array },
  },
  data: () => ({
    showCharacterSuggestion: false,
  }),
  methods: {
    openModal() {
      this.$emit("set-modal", true);
    },
    closeModal() {
      this.$emit("set-modal", false);
    },
    setDetails(id) {
      this.$emit("set-details", id);
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}

.modal {
  position: relative;
  width: 740px;
  height: 1165px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  background-image: url("../../assets/modal-banner.png");
  background-repeat: no-repeat;
}

.close-icon {
  position: absolute;
  top: 13px;
  right: 13px;
  cursor: pointer;
}

.avatar {
  position: absolute;
  top: 140px;
  left: 50%;
  transform: translate(-50%);
  width: 155px;
  height: 155px;
  border: 4px solid #fffbfb;
  border-radius: 50%;
  box-sizing: border-box;
}

.background-container {
  text-align: center;
  width: 100%;
  height: 179px;
  background-color: #f2f2f2;
  margin-top: 219px;
}

.favorite {
  position: absolute;
  top: 24.5%;
  left: 50%;
  transform: translate(-50%, -24.5%);
  cursor: default;
}
.background-container .status,
.background-container .species {
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  color: #4f4f4f;
  text-transform: uppercase;
}

.background-container .status {
  padding-top: 90px;
}

.background-container .name {
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  color: #4f4f4f;
  margin: 10px 0;
}

.container {
  padding: 20px 21px 0;
}

.info-container {
  border-bottom: 1px solid #e0e0e0;
}

.info-labels-container {
  display: flex;
  justify-content: space-between;
}

.episode-container {
  border-bottom: 1px solid #e0e0e0;
}

.episode-labels-container {
  min-height: 200px;
  max-height: 200px;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-between;
}

.container h3 {
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  color: #4f4f4f;
}

.character-container div {
  display: flex;
  justify-content: space-between;
}

button {
  margin: 51px 21px 37px;
  float: right;
}

</style>