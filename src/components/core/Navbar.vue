<template>
  <section class="tabs">
    <ul>
      <li
        v-for="{ gender } in filters"
        :key="gender"
        :class="{ 'active': gender === getFilterActive }"
        @click="setFilterActive(gender)"
      >
        {{ gender }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "Navbar",
  data: () => ({
    filters: [
      { gender: "All" },
      { gender: "Unknown" },
      { gender: "Female" },
      { gender: "Male" },
      { gender: "Genderless" },
    ],
  }),
  computed: {
    getFilterActive() {
      return this.$store.state.genderFilter;
    }
  },
  methods: {
    setFilterActive(gender) {
      this.$store.commit("setGenderFilter", gender);
    },
  },
};
</script>

<style scoped>
.tabs {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 80px;
  background-color: #f2f2f2;
  border-bottom: 1px solid #bdbdbd;
}

.tabs ul {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.tabs ul li {
  display: inline-block;
  height: 80px;
  text-align: center;
  width: 162px;
  color: #000;
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
  margin-left: 54px;
  padding: 30px 0;
  box-sizing: border-box;
}

.tabs ul li:first-child {
  margin-left: 0;
}

.tabs ul li:hover {
  border-bottom: 3px solid #bdbdbd;
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.tabs ul .active,
.tabs ul .active:hover {
  border-bottom: 3px solid #34c759;
  box-sizing: border-box;
}

</style>