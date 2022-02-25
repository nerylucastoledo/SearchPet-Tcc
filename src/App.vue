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
import firebase from 'firebase'

export default {
  components: {
    Header,
    Footer
  },

  methods: {
      async getMyDatas(listKey) {
        const listAnuncios = []

        listKey.forEach(key => {
          firebase.database()
          .ref('/Anuncios')
          .child(key)
          .once("value", snapshot => {
            Object.keys(snapshot.val()).forEach((key2) => {
              firebase.database()
              .ref('/Anuncios')
              .child(`${key}/${key2}`)
              .once("value", item => {
                listAnuncios.push(item.val())
              }) 
            })
            this.$store.dispatch('allAnuncios', listAnuncios)
          })
        })
      },
  },

  mounted() {
    setTimeout(() => {
      const listKey = []

      firebase.database().ref('/Anuncios')
      .once("value", snapshot => {
        Object.keys(snapshot.val()).forEach((key) => {
            listKey.push(key)
        })
        this.getMyDatas(listKey)
      })
    }, 700);
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
  max-width: 1200px;
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

</style>