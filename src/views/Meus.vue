<template>
    <main class="container content-principal">
        <div class="meus-anuncios">
            <div class="side-meus-anuncios">
                <img v-if="disponible === 'ONG'" :src="image_ong" alt="Imagem da ONG">

                <span class="name">Olá, {{name_ong}}</span>
                <p  
                    v-if="disponible === 'ONG'"
                    @click="filterAnuncios(0, '')" 
                    class="link-filter"
                    >
                    Todos anuncios
                </p>

                <p 
                    v-if="disponible === 'ONG'"
                    @click="filterAnuncios(1, 'pausado', false)" 
                    class="link-filter"
                    >
                    Anuncios ativos
                </p>

                <p 
                    v-if="disponible === 'ONG'"
                    @click="filterAnuncios(2, 'pausado', true)" 
                    class="link-filter"
                    >
                    Anuncios finalizados
                </p>

                <p 
                    @click="filterFavorites(3)" 
                    class="link-filter"
                    >
                    Escolhidos por vocẽ
                </p>
            </div>

            <div v-if="!loading">

                <div class="open-filter">
                    <font-awesome-icon @click="openFilter" id="filter" icon="filter" size="2x"/>
                </div>

                <div class="cards" v-if="anuncios.length">
                    <div v-for="anuncio in anuncios" :key="anuncio.nome+1">
                        <router-link :to=" !favorite ? `/anuncio/${anuncio.categoria}/${anuncio.id}` : `/animal/${anuncio.categoria}/${anuncio.id}`">

                            <p
                                v-if="favorite"
                                class="fechar"
                                @click="removeFavorite(anuncio)"
                                >
                                X
                            </p>

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

                <div v-else-if="message_favorite" class="message">
                    <h2>🐶 Oops!</h2>

                    <p>Você ainda não tem favoritos :(</p>
                </div>

                <div v-else>
                    <h2 class="message">🐶 Oops! Nada para mostrar</h2>
                </div>

                <div v-if="show_button">
                    <router-link to="/new-anuncio">
                        <button class="btn-form"> + Novo Anuncio</button>
                    </router-link>
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
            show_button: true,
            message_favorite: false,
            disponible: '',
            username: this.$store.state.user.data.displayName
        }
    },

    methods: {
        filterAnuncios(index, filter, value_filter) {
            this.addActiveRouterFilter(index)

            this.message_favorite = false
            this.favorite = false
            this.show_button = true

            this.anuncios =  this.backup_anuncios
            this.anuncios = this.anuncios.filter(data => data[filter] === value_filter)
        },

        async filterFavorites(index) {
            this.addActiveRouterFilter(index)

            this.show_button = false
            this.loading = true
            this.favorite = true

            var list_anuncios_filter = []
            this.anuncios = []

            const favorites = await this.getDataFromApi(this.username, 'favorites')

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
                this.message_favorite = true
                this.anuncios = []
                setTimeout(() => this.loading = false, 400);
            }
        },

        removeFavorite(anuncio) {
            const username = sessionStorage.getItem('displayName')
            firebase.database()
            .ref(username)
            .child('favorites/' + anuncio.categoria)
            .remove(() => {
                this.loading = true
                setTimeout(() => {
                    this.loading = false
                    this.filterFavorites(3)
                }, 1000);
            })
        },

        addActiveRouterFilter(index) {
            document.querySelector('.side-meus-anuncios').classList.toggle('open-modal')

            const activeButton = document.querySelectorAll('.link-filter')

            activeButton.forEach(element => element.classList.remove('ativo'))
            activeButton[index].classList.add('ativo')
        },

        openFilter() {
            document.querySelector('.side-meus-anuncios').classList.toggle('open-modal')
        },

        async getDataFromApi(ref, child = '') {
            const resultApi = await firebase.database()
                                    .ref(`${ref}/${child}`)
                                    .once("value", snapshot => snapshot.exists() ? snapshot.val() : null)

            return resultApi
        },

        async getPhotoAndNameOng() {
            const user = await this.getDataFromApi(this.username)

            this.name_ong = user.val()["nameOng"]
            this.image_ong = user.val()["image"]

            setTimeout(() => this.loading = false, 500)
        },
    },

    async mounted() {
        await firebase.database()
        .ref(this.username)
        .once("value", snapshot => this.disponible = snapshot.val()["type"])
        
        if(this.disponible === 'particular') {
            this.filterFavorites(0)

        } else {
            document.querySelectorAll('.link-filter')[0].classList.add('ativo')

            const allAnuncios = await getMydatas('username', this.username)
            this.anuncios = allAnuncios
            this.backup_anuncios = allAnuncios
        }

        this.getPhotoAndNameOng()
    },

    beforeCreate() {
        document.title = 'Meus'

        const logado = sessionStorage.getItem('login')

        if(!logado) {
           
            this.$router.replace({ name: "login" })
        }
    }
}
</script>

<style scoped>

.cards {
    padding: 0px !important;
}

.cards > div {
    position: relative;
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
    height: 100%;
    text-align: center;
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

.message h2 {
    margin-bottom: 20px;
}

.open-filter {
    display: none;
}

.fechar {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 16px;
    color: #fff;
    background-color: red;
    padding: 2px 5px;
    cursor: pointer;
    border-radius: 50%;
    z-index: 4;
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
        text-align: initial;
        position: absolute;
        max-height: 180px;
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