<template>
  <div class="contanier">
    <div class="overlay">
      <img class="icon" src="../assets/icon/suazo.png" alt="icon suazo" />
      <img class="banner-text" src="../assets/rick-and-morty.png" alt="rick and morty banner" />
      <h1>Bienvenido a Rick and Morty</h1>
      <p>
        En esta prueba, evaluaremos su capacidad para construir la aplicación mediante el análisis
        de código y la reproducción del siguiente diseño.
      </p>
      <Button @custom-click="redirectToPage" text="Continuar"></Button>
    </div>
  </div>
</template>

<script>
import Button from '../components/ui/Button.vue'

export default {
  name: 'Welcome',
  components: {
    Button,
  },
  methods: {
    redirectToPage() {
      this.$router.push('/home');
    }
  }
}
</script>

<style scoped>
.contanier {
  width: 100%;
  height: 100vh;
  background-image: url('../assets/portal-morty-smith-rick.png');
  background-color: #000;
  background-repeat: no-repeat;
  background-position: center;
}

.contanier .overlay {
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
}

.contanier .overlay .icon {
  margin-top: 35px;
}

.contanier .overlay .banner-text {
  max-width: 664px;
  height: auto;
}

.contanier .overlay h1 {
  font-size: 36px;
  font-weight: 400;
  line-height: 44px;
  margin: 20px 0 0;
  color: #fff;
}

.contanier .overlay p {
  max-width: 872px;
  height: 62px;
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;
  margin: 20px auto 40px;
  color: #fff;
}

.contanier .overlay button {
  padding: 11px 22px;
  border-radius: 60px;
  border: none;
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  background-color: #11555f;
  color: #fff;
}

.contanier .overlay button:hover {
  cursor: pointer;
  background-color: rgba(17, 85, 95, 0.7);
}

</style>