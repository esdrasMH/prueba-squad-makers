<template>
  <div class="main">
    <RouterView />
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1440px;
}

@media screen and (max-width: 998px) {
  .main {
    width: 100%;
  }
}
</style>
