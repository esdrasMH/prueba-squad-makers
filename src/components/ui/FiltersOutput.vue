<template>
  <div class="filters-output">
    <p>
      Filtros aplicados: <span>{{ getActiveFilters }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "FiltersOutput",
  computed: {
    getActiveFilters() {
      let result = "";

      this.$store.state.activeFilters.forEach(
        (f) => (result += result !== "" ? `, ${f.name}` : f.name)
      );

      return result;
    },
  },
};
</script>

<style scoped>
.filters-output {
  display: flex;
  align-items: center;
  margin-top: 15px;
  width: 500px;
  height: 33px;
  background-color: #fff;
  border-radius: 6px;
}

.filters-output p {
  margin: 0;
  padding: 0 20px;
  color: #34c759;
  font-size: 18px;
  line-height: 22px;
  font-weight: 600;
  width: 500px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.filters-output p span {
  color: #081f32;
  font-size: 18px;
  line-height: 22px;
  font-weight: 400;
}

</style>