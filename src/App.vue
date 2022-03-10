<template>
  <div id="app">

      <Header/>

    <main id="main">
      <router-view/>
    </main>

    <Footer/>
  </div>
</template>
<script>

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  },

  beforeCreate() {
    const logado = localStorage.getItem('login')
    
    if(!logado) {
      this.$router.replace({ name: "login" });
    }
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

#main {
  flex: 1;
}

/* ALL */
body, a, ul, li, h1, h2, h3, p, img {
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: 'Montserrat';
  box-sizing: border-box;
  text-decoration: none;
}

body  {
  background-color: #fff;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.titulo {
  color: #36C9D2;
  font-size: 2rem;
  text-align: center;
  margin-top: 60px;
}

.subtitulo {
  color: #36C9D2;
  text-align: center;
  margin-top: 60px;
  margin-bottom: 60px;
}

.btn-form {
  border-radius: 10px;
  width: 300px;
  border: none;
  display: block;
  margin: 30px auto 0;
  padding: 10px 0;
  background-color: #36C9D2;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
}

input:focus {
    outline: none !important;
    border: none;
    box-shadow: 0 0 10px #fff;
}

.login {
    background-color: #36C9D2;
    padding: 50px 50px 50px 50px;
    border-radius: 15px 15px 15px 0px;
}

.login input{
    display: block;
    margin: 0 auto 30px;
    padding: 15px 0;
    width: 285px;
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.25);
    border: none;
    border-radius: 10px;
    padding-left: 15px;
    color: #222;
    font-size: 18px;
}

.login label {
    display: block;
    font-size: 24px;
    margin-bottom: 10px;
    color: #fff;
}

/* CONTENT TOP FORM */

.new-user {
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.new-user p {
    margin-top: 5px;
}

.go-register {
    border-radius: 10px;
    color: #36C9D2;
    font-weight: bold;
    border: 1px solid #fff;
    padding: 10px;
    background-color: #fff;
}


</style>