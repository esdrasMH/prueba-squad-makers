<template>
  <div>
    <article class="card">
      <div class="image">
        <img :src="character.image" :alt="`imagen de ${character.name}`" />
        <Favorite
          :status="character.favorite"
          @click="setFavoriteCharacter(character.id)"
        ></Favorite>
      </div>
      <div class="info" @click="setDetails(character.id), setModal(true)">
        <div
          :class="`status-${character.status === 'Alive' ? 'alive' : 'dead'}`"
        ></div>
        <p class="status-species">
          {{ character.status }} {{ character.species }}
        </p>
        <p class="name">{{ character.name }}</p>
        <p class="location">
          <span class="label">Last known location:</span>
          {{ character.location.name }}
        </p>
        <p class="first-seen-in">
          <span class="label">First seen in:</span>
          {{ character.firstSeenIn }}
        </p>
      </div>
    </article>
  </div>
</template>

<script>
import Favorite from "./Favorite.vue";

export default {
  name: "Card",
  components: {
    Favorite,
  },
  props: {
    character: { required: true, type: Object },
  },
  methods: {
    setModal(value) {
      this.$emit("set-modal", value);
    },
    setDetails(id) {
      this.$emit("set-details", id);
    },
    setFavoriteCharacter(id) {
      this.$store.commit("setFavoriteCharacter", id);
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  width: 326px;
  height: 140px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
}

.card .image img {
  height: 140px;
  width: 140px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.card .image .favorite {
  top: -45px;
  left: 100px;
}

.card .info {
  padding: 17px 15px 13px;
  cursor: pointer;
}

.card .info p {
  max-width: 156px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card .info .status-alive {
  float: left;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #27ae60;
  margin: 3px 6px 3px 0;
}

.card .info .status-dead {
  float: left;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #eb5757;
  margin: 3px 6px 3px 0;
}

.card .info .label {
  margin: 4px 0;
}

.card .info .status-species,
.card .info .location .label,
.card .info .first-seen-in .label {
  display: block;
  font-size: 10px;
  font-weight: 400;
  line-height: 12px;
  color: #4f4f4f;
}

.card .info .location,
.card .info .first-seen-in {
  font-size: 12px;
  line-height: 15px;
  color: #000;
}

.card .info .status-species {
  margin: 0 0 4px;
}

.card .info .name {
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  color: #000;
  margin: 4px 0;
}

.card .info .location {
  margin: 4px 0;
}

.card .info .first-seen-in {
  margin: 5px 0 0;
}

</style>