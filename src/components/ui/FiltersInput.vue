<template>
  <div>
    <img
      class="filters-icon"
      src="../../assets/icon/filters.png"
      alt="filters icon"
      @click="openDropdown"
    />
    <div v-if="isOpen" class="dropdown-content">
      <label v-for="filter in filters" :key="filter.id" :for="filter.id">
        <input
          :id="filter.id"
          v-model="filter.checked"
          type="checkbox"
          @click="setActiveFilters(filter.id)"
        />
        {{ filter.name }}
      </label>

      <button @click="isOpen = false">cerrar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FiltersInput",
  data: () => ({
    isOpen: false,
    filters: [
      { id: "name", name: "Name", checked: false },
      { id: "status", name: "Status", checked: false },
      { id: "species", name: "Species", checked: false },
      { id: "location", name: "Last known location", checked: false },
      { id: "firstSeenIn", name: "First seen in", checked: false },
    ],
    filtersActive: [],
  }),
  mounted() {
    document.addEventListener("click", this.closeDropdown);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.closeDropdown);
  },
  methods: {
    openDropdown() {
      this.isOpen = !this.isOpen;
    },
    closeDropdown(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
      }
    },
    setActiveFilters(id) {
      const element = this.filters.find((f) => f.id === id);

      if (element) {
        const index = this.filtersActive.findIndex((f) => f.id === id);

        if (index !== -1) {
          this.filtersActive.splice(index, 1);
        } else {
          this.filtersActive.push(element);
        }
      }

      this.$store.commit("setActiveFilters", this.filtersActive);
    },
  },
};
</script>

<style scoped>
.filters-icon {
  display: relative;
  cursor: pointer;
}

.dropdown-content {
  min-width: 160px;
  display: block;
  position: absolute;
  z-index: 1;
  border-radius: 6px;
  background-color: #f1f1f1;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}

.dropdown-content label {
  display: block;
  padding: 8px 16px;
  color: #081f32;
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
}

.dropdown-content label:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.1);
}

.dropdown-content label input[type="checkbox"]:checked {
  background-color: red;
}

.dropdown-content button {
  float: right;
  font-size: 16px;
  font-weight: 400;
  text-transform: uppercase;
  color: #34c759;
  background: rgb(52, 199, 89, 0.1);
  border: 1px solid #34c759;
  border-radius: 3px;
  margin: 8px;
}

</style>