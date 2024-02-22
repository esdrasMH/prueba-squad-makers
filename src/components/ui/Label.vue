<template>
  <div class="label" :class="{ 'max-height': maxHeight }">
    <p class="text-secondary">{{ txt1 }}</p>
    <p class="text-primary">{{ txt2 }}</p>
    <p class="text-tertiary" v-if="txt3 !== ''">{{ txt3 }}</p>
  </div>
</template>

<script>
export default {
  name: "Label",
  props: {
    maxHeight: { default: false, type: Boolean },
    txt1: { requiered: true, type: String },
    txt2: { requiered: true, type: String },
    txt3: { requiered: false, default: "", type: String },
  },
};
</script>

<style scoped>
.label {
  width: 163px;
  height: 59px;
  border: 1px solid #bdbdbd;
  margin-bottom: 30px;
  border-radius: 8px;
  padding: 12px;
  box-sizing: border-box;
}

.max-height {
  height: 72px;
}

.label p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.label .text-primary,
.label .text-secondary,
.label .text-tertiary {
  text-transform: capitalize;
}

.label .text-primary {
  font-size: 17px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: -0.41px;
  margin: 0;
}

.label .text-secondary {
  font-size: 11px;
  font-weight: 400;
  line-height: 13px;
  letter-spacing: 0.07px;
  margin: 0;
}

.label .text-tertiary {
  font-size: 11px;
  font-weight: 500;
  line-height: 13px;
  letter-spacing: 0.07px;
  margin: 0;
  text-transform: uppercase;
}

</style>