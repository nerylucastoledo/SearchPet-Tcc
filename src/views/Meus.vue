<template>
    <main class="container content-principal">

        <div class="meus-anuncios">
            <div class="side-meus-anuncios">
                <!--Implementar o restante do filtro-->
                <img :src="image_ong" alt="Imagem da ONG">

                <span class="name">Olá, {{name_ong}}</span>

                <p @click="filterAnuncios('')">Todos anuncios</p>

                <p @click="filterAnuncios('pausado', false)">Anuncios ativos</p>

                <p @click="filterAnuncios('pausado', true)">Anuncios finalizados</p>

                <p @click="filterFavorites()">Seus favoritos</p>
            </div>

            <div v-if="!loading">
                <div class="cards" v-if="anuncios.length">
                    <div v-for="anuncio in anuncios" :key="anuncio.nome+1">
                        <router-link :to=" !favorite ? `/anuncio/${anuncio.categoria}/${anuncio.id}` : `/animal/${anuncio.categoria}/${anuncio.id}`">
                            <div class="image-and-name">
                                <img :src="anuncio.imagem" alt="Imagem de um animal">

                                <h1>{{anuncio.nome}}</h1>
                            </div>

                            <div id="category" 
                                :class="[anuncio.categoria === 'Adocao' ? 'adocao' : 'perdido']">
                                <p>{{anuncio.categoria}}</p>
                            </div>

                            <div class="dados">
                                <div>
                                    <div>
                                        <p class="castrado">{{anuncio.idade}}</p>

                                        <span>
                                            <img src="../assets/idade.png" alt="Calendario">
                                        </span>
                                    </div>

                                    <div>
                                        <p v-if="anuncio.castrado === false">Não castrado</p>
                                        <p v-else>Castrado</p>

                                        <span>
                                            <img src="../assets/castrado.png" alt="Calendario">
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <div>
                                        <p :class="[anuncio.sexo === 'Macho' ? 'macho' : 'femea']">
                                            {{anuncio.sexo}}
                                        </p>
                                        <span>
                                            <img src="../assets/sexo.png" alt="Calendario">
                                        </span>
                                    </div>

                                    <div>
                                        <p class="castrado">{{anuncio.peso}}</p>
                                        
                                        <span>
                                            <img src="../assets/peso.png" alt="Calendario">
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>

                <h2 v-else>Nenhum anuncio para visualizar</h2>

                <div>
                    <router-link to="/new-anuncio">
                        <button class="btn-form">Novo Anuncio</button>
                    </router-link>
                </div>

            </div>

            <div v-else>
                <Loading/>
            </div>
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
            backup_anuncios: [],
            loading: true,
            name_ong: '',
            favorite: false
        }
    },

    methods: {
        async getDatas() {
            const username = await this.$store.state.user.data.displayName
            const allAnuncios = await getMydatas('username', username)

            this.anuncios = allAnuncios
            this.backup_anuncios = allAnuncios

            this.getPhoto()
        },

        getPhoto() {
            const userName = this.$store.state.user.data.displayName

            firebase.database()
            .ref(userName)
            .once("value", snapshot => {
                if(snapshot.val()["type"] === 'Ong') {
                    this.name_ong = snapshot.val()["nameOng"]
                    this.image_ong = snapshot.val()["image"]
                }
            })

            setTimeout(() => this.loading = false, 500)
        },

        filterAnuncios(filter, value_filter) {
            this.favorite = false

            this.anuncios = this.backup_anuncios

            this.anuncios = this.anuncios.filter(data => data[filter] === value_filter)
        },

        async filterFavorites() {
            this.favorite = true

            const username = this.$store.state.user.data.displayName
            var list_anuncios_filter = []
            this.anuncios = []

            await firebase.database()
            .ref(username)
            .child('favorites')
            .once("value", snapshot => {
                Object.keys(snapshot.val()).forEach((key) => {
                    Object.keys(snapshot.val()[key]).forEach((idFavorite) => {
                        const idAnunciosFavoritos = snapshot.val()[key][idFavorite]

                        firebase.database()
                        .ref('Anuncios')
                        .child(key)
                        .once("value", anuncios => {
                            Object.keys(anuncios.val()).forEach((idAnuncios) => {
                                if(idAnuncios === idAnunciosFavoritos)
                                    list_anuncios_filter.push(anuncios.val()[idAnuncios])
                            })
                        })
                    })
                })
                this.anuncios = list_anuncios_filter
            })
        },
    },

    mounted() {
        setTimeout(() => this.getDatas(), 600);
    },

    beforeCreate() {
        const logado = sessionStorage.getItem('login')
        
        if(!logado) {
            this.$router.replace({ name: "login" });
        }
    }
}
</script>

<style scoped>

.cards {
    padding: 0px !important;
}

.meus-anuncios {
    display: flex;
    padding: 0 30px;
    margin-bottom: 60px;
}

.side-meus-anuncios {
    padding: 40px;
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    max-height: 360px;
    text-align: initial;
    margin-right: 30px;
    width: 450px;
}

.side-meus-anuncios p {
    margin-top: 20px;
    font-size: 18px;
}

#image-animal {
    width: 300px;
}

.name {
    font-weight: bold;
    font-size: 18px;
}

.side-meus-anuncios img {
    display: block;
    margin: 0 auto 20px;
    max-width: 200px;
    height: 150px;
    border-radius: 10px;
}

</style>