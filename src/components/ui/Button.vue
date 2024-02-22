<template>
  <button @click="customClick">{{ text }}</button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: { required: true, type: String },
  },
  methods: {
    customClick() {
      this.$emit("custom-click");
    },
  },
};
</script>

<style scoped>
button {
  padding: 11px 22px;
  border-radius: 60px;
  border: none;
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  background-color: #11555f;
  color: #fff;
}

button:hover {
  cursor: pointer;
  background-color: rgba(17, 85, 95, 0.7);
}

</style>