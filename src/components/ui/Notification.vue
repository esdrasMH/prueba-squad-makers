<template>
  <section class="notification">
    <h3>{{ title }}</h3>
    <p>{{ text }}</p>
    <slot name="button"></slot>
  </section>
</template>

<script>
export default {
  name: "Notification",
  props: {
    title: { required: true, type: String },
    text: { required: true, type: String },
  },
};
</script>

<style scoped>
.notification {
  text-align: center;
}

.notification h3 {
  font-size: 36px;
  font-weight: 700;
  line-height: 43px;
  color: #353535;
  margin: 0;
}

.notification p {
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;
  color: #5e5e5e;
  margin: 10px 0 20px;
}

</style>