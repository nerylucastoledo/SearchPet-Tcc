<template>
    <main class="container content-principal">

        <div class="meus-anuncios">
            <div class="side-meus-anuncios">
                <img :src="image_ong" alt="Imagem da ONG">

                <span class="name">Olá, {{name_ong}}</span>

                <p @click="filterAnuncios(0, '')" class="link-filter">Todos anuncios</p>

                <p @click="filterAnuncios(1, 'pausado', false)" class="link-filter">Anuncios ativos</p>

                <p @click="filterAnuncios(2, 'pausado', true)" class="link-filter">Anuncios finalizados</p>

                <p @click="filterFavorites(3)" class="link-filter">Seus favoritos</p>
            </div>

            <div v-if="!loading">


                <div class="open-filter">
                    <font-awesome-icon @click="openFilter" id="filter" icon="filter" size="2x"/>
                </div>

                <div class="cards" v-if="anuncios.length">
                    <div v-for="anuncio in anuncios" :key="anuncio.nome+1">
                        <router-link :to=" !favorite ? `/anuncio/${anuncio.categoria}/${anuncio.id}` : `/animal/${anuncio.categoria}/${anuncio.id}`">
                            <div class="image-and-name">
                                <img :src="anuncio.imagem" alt="Imagem de um animal">

                                <h1>{{anuncio.nome}}</h1>
                            </div>

                            <div 
                                id="category" 
                                :class="[anuncio.categoria === 'Adocao' ? 'adocao' : 'perdido']"
                                >
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

                <div v-else-if="message_favorite.length" class="message">
                    <h2 class="message favorite">{{message_favorite}}</h2>
                </div>

                <div v-else>
                    <h2 class="message">Nenhum anuncio para visualizar</h2>

                    <div>
                        <router-link to="/new-anuncio">
                            <button class="btn-form">Novo Anuncio</button>
                        </router-link>
                    </div>
                </div>

            </div>

            <div class="loading" v-else>
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
            favorite: false,
            message_favorite: ''
        }
    },

    methods: {
        openFilter() {
            document.querySelector('.side-meus-anuncios').classList.toggle('open-modal')
        },

        async getPhotoAndNameOng() {
            const userName = this.$store.state.user.data.displayName

            const user = await this.getDataFromApi(userName)

            if(user.val()["type"] === 'Ong') {
                this.name_ong = user.val()["nameOng"]
                this.image_ong = user.val()["image"]
            }

            setTimeout(() => this.loading = false, 500)
        },

        filterAnuncios(index, filter, value_filter) {
            this.addActiveRouterFIlter(index)

            this.message_favorite = ''
            this.anuncios =  this.backup_anuncios
            this.favorite = false

            this.anuncios = this.anuncios.filter(data => data[filter] === value_filter)
        },

        async filterFavorites(index) {
            this.addActiveRouterFIlter(index)

            this.loading = true
            this.favorite = true

            const username = this.$store.state.user.data.displayName
            var list_anuncios_filter = []
            this.anuncios = []

            const favorites = await this.getDataFromApi(username, 'favorites')

            if(favorites.val()) {
                Object.keys(favorites.val()).forEach((key) => {
                    Object.keys(favorites.val()[key]).forEach((idFavorite) => {
                        
                        const idAnunciosFavoritos = favorites.val()[key][idFavorite]

                        firebase.database().ref('Anuncios').child(key)
                        .once("value", anuncios => {
                            Object.keys(anuncios.val()).forEach((idAnuncios) => {
                                if(idAnuncios === idAnunciosFavoritos) {
                                    list_anuncios_filter.push(anuncios.val()[idAnuncios])
                                }
                            })
                        })
                    })
                })
                this.anuncios = list_anuncios_filter

                setTimeout(() => this.loading = false, 400);

            } else {
                this.message_favorite = 'Nenhum favorito adicionado :('
                this.anuncios = []

            }
        },

        addActiveRouterFIlter(index) {
            document.querySelector('.side-meus-anuncios').classList.toggle('open-modal')

            const activeButton = document.querySelectorAll('.link-filter')

            activeButton.forEach(element => element.classList.remove('ativo'))

            activeButton[index].classList.add('ativo')
        },

        async getDataFromApi(ref, child = '') {
            const resultApi = await firebase.database()
                                    .ref(`${ref}/${child}`)
                                    .once("value", snapshot => snapshot.exists() ? snapshot.val() : null)

            return resultApi
        }
    },

    async mounted() {
        document.title = 'Meus Anuncios'
        document.querySelectorAll('.link-filter')[0].classList.add('ativo')

        const username = await this.$store.state.user.data.displayName
        const allAnuncios = await getMydatas('username', username)

        this.anuncios = allAnuncios
        this.backup_anuncios = allAnuncios

        this.getPhotoAndNameOng()
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

.meus-anuncios > div {
    width: 100%;
}

.side-meus-anuncios {
    padding: 40px;
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    max-height: 360px;
    text-align: initial;
    margin-right: 30px;
    width: 345px !important;
}

.side-meus-anuncios p {
    margin-top: 20px;
    font-size: 18px;
    cursor: pointer;
}

.side-meus-anuncios p.ativo {
    font-weight: bold;
    color: #36C9D2;
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

.message {
    margin-top: 60px;
    text-align: center;
    color: #36C9D2;
}

.open-filter {
    display: none;
}

@media (max-width: 1355px) {
    .cards {
        grid-template-columns: 1fr 1fr;
    }
}

@media (max-width: 1025px) {
    .cards {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 700px) {
    .meus-anuncios {
        display: block;
    }

    .open-filter {
        display: block;
        color: #36C9D2;
        margin-bottom: 30px;
    }

    .side-meus-anuncios img, .name {
        display: none;
    }

    .side-meus-anuncios {
        display: none;
        position: absolute;
        max-width: 100% !important;
        width: 50% !important;
        margin-top: 0px;
        margin-left: 40px;
        padding: 10px 0px 20px 20px;
        z-index: 4;
        margin-right: 0px !important;
        background-color: #fff;
    }

    #filter {
        cursor: pointer;
    }

    .open-modal {
        display: block !important;
    }

    .cards {
        display: block;
    }
}

</style>