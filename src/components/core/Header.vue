<template>
  <section class="header">
    <img
      class="banner"
      src="../../assets/rick-and-morty.png"
      alt="rick and morty banner"
    />
    <TextField></TextField>
    <FiltersOutput></FiltersOutput>
  </section>
</template>

<script>
import TextField from "../ui/TextField.vue";
import FiltersOutput from "../ui/FiltersOutput.vue";

export default {
  name: "Header",
  components: {
    TextField,
    FiltersOutput,
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 455px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("../../assets/header-portal-morty-smith-rick.png");
  background-repeat: no-repeat;
  color: white;
}

.header .banner {
  margin-top: 129px;
  max-width: 347px;
  height: auto;
}

</style>