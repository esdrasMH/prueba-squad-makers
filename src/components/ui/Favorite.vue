<template>
  <div
    class="favorite"
    :class="{ 'icon-border': iconBorder }"
    :style="`background-color: ${backgroundColor}`"
  >
    <img :src="getStatusIcon" alt="favorite icon" />
  </div>
</template>

<script>
import starOn from "../../assets/icon/starOn.png";
import starOff from "../../assets/icon/starOff.png";

export default {
  name: "Favorite",
  props: {
    status: { required: true, type: Boolean },
    iconBorder: { default: false, type: Boolean },
    backgroundColor: { default: "#fff", type: String },
  },
  computed: {
    getStatusIcon() {
      return this.status ? starOn : starOff;
    },
  },
};
</script>

<style scoped>
.favorite {
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
}

.favorite img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 18px;
  width: 18px;
}

.icon-border {
  border: 3px solid #fff;
  box-sizing: border-box;
}

</style>