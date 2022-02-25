<template>
    <main class="container content-principal">

        <h1 class="titulo">Seus Anuncios</h1>

        <div v-if="anuncios.length" class="cards">
            <div v-for="anuncio in anuncios" :key="anuncio.nome+1">
                <router-link :to="`/animal/${anuncio.categoria}/${anuncio.id}`">
                    <img v-if="anuncio.imagem" id="image-animal" :src="anuncio.imagem" alt="Imagem de um animal">
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

                        <div class="category">
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

    </main>
</template>

<script>

import firebase from 'firebase'

export default {

    data() {
        return {
            my_anuncios: [],
            image_ong: null,
        }
    },

    computed: {
        anuncios() {
            return this.$store.state.allAnuncios
        }
    },

    watch: {
        anuncios() {
            this.getPhoto()
        },
    },

    methods: {
        getPhoto() {
            const userName = this.$store.state.user.data.displayName

            firebase.database()
            .ref(userName)
            .once("value", snapshot => {
                if(snapshot.val()["type"] === 'Ong') {
                    this.image_ong = snapshot.val()["image"]
                }
            })
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