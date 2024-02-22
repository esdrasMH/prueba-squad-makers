<template>
  <fieldset>
    <img
      class="search-icon"
      src="../../assets/icon/search.png"
      alt="search icon"
    />
    <div class="input-box">
      <input
        v-model="search"
        @keyup="setSearch"
        type="text"
        placeholder="Buscar personaje..."
      />
    </div>
    <FiltersInput></FiltersInput>
  </fieldset>
</template>

<script>
import FiltersInput from "./FiltersInput.vue";

export default {
  name: "TextField",
  components: {
    FiltersInput,
  },
  data: () => ({
    search: "",
  }),
  methods: {
    setSearch() {
      this.$store.commit("setSearchText", this.search.trim());
    },
  },
};
</script>

<style scoped>
fieldset {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  height: 60px;
  padding: 13px;
  border-radius: 6px;
  background-color: #081f32;
  box-sizing: border-box;
}

fieldset .input-box {
  width: calc(100% - 42px);
}

fieldset .input-box input[type="text"] {
  width: calc(100% - 42px);
  height: 28px;
  margin: 0 21px;
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
  color: #fff;
  font-size: 18px;
  line-height: 22px;
}

</style>