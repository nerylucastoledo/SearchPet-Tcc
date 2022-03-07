<template>
    <main class="container content-principal">

        <h1 class="titulo">Seus Anuncios</h1>

        <div v-if="!loading">
            <div v-if="anuncios.length" class="cards">
                <div v-for="anuncio in anuncios" :key="anuncio.nome+1">
                    <router-link :to="`/anuncio/${anuncio.categoria}/${anuncio.id}`">
                        <img 
                            id="image-animal"
                            :src="anuncio.imagem" 
                            alt="Imagem de um animal"
                            v-if="anuncio.imagem" 
                        >

                        <p v-else>Particular</p>

                        <div>
                            <div class="info-animal">
                                <h2 id="name-animal">{{anuncio.nome}}</h2>

                                <span>
                                    <img id="logo-ong" :src="image_ong" alt="">
                                </span>
                            </div>

                            <div class="local-animal">
                                <span>
                                    <img src="../assets/local.png" alt="">
                                </span>

                                <p>{{anuncio.local}}</p>
                            </div>

                            <div id="category" :class="[anuncio.categoria === 'Adocao' ? 'adocao' : 'perdido']">
                                <p>{{anuncio.categoria}}</p>
                            </div>

                            <div class="quality">
                                <span>{{anuncio.sexo}}</span>

                                <span>{{anuncio.idade}}</span>

                                <span v-if="anuncio.castrado === false">Não castrado</span>
                                <span v-else>Castrado</span>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>

            <h2 v-else class="subtitulo">Nenhum anuncio para visualizar</h2>

            <div>
                <router-link to="/new-anuncio">
                    <button class="btn-form">Novo Anuncio</button>
                </router-link>
            </div>

        </div>

        <div v-else>
            <Loading/>
        </div>
    </main>
</template>

<script>

import firebase from 'firebase'
import { getMydatas } from '@/help.js'
import Loading from '../components/Loading'

export default {

    components: {
        Loading
    },

    data() {
        return {
            my_anuncios: [],
            image_ong: null,
            anuncios: [],
            loading: true
        }
    },

    methods: {
        async getDatas() {
            const username = await this.$store.state.user.data.displayName
            const allAnuncios = await getMydatas('username', username)

            this.anuncios = allAnuncios

            this.getPhoto()
        },

        getPhoto() {
            const userName = this.$store.state.user.data.displayName

            firebase.database()
            .ref(userName)
            .once("value", snapshot => {
                if(snapshot.val()["type"] === 'Ong') {
                    this.image_ong = snapshot.val()["image"]
                }
            })

            setTimeout(() => this.loading = false, 500)
        }
    },

    mounted() {
        setTimeout(() => this.getDatas(), 600);
    },

    beforeCreate() {
        const logado = localStorage.getItem('login')
        
        if(!logado) {
            this.$router.replace({ name: "login" });
        }
    }
}
</script>

<style scoped>

.titulo {
    margin-bottom: 40px;
}

.carregando {
    text-align: center;
    font-weight: bold;
}

</style>