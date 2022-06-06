<template>
    <main>
        <div class="container content-principal todos-anuncios">
            <div v-if="mensagem.length">
                <ModalSuccess 
                    :mensagem="mensagem" 
                    :success="success"
                    >
                </ModalSuccess>
            </div>

            <FilterData :citys="citys"></FilterData>

            <div v-if="!loading">
                <div v-if="anuncios.length" class="cards">
                    <div 
                        v-for="anuncio, index in anuncios" 
                        :key="anuncio.id"
                        >
                        <router-link :to="`/animal/${anuncio.categoria}/${anuncio.id}`">
                            <Cards :anuncio="anuncio"></Cards>
                        </router-link>

                        <div class="favoritar">
                            <p @click="favoritar(index, anuncio)">
                                <font-awesome-icon icon="heart" size="2x"/>
                            </p>
                        </div>
                    </div>
                </div>

                <div v-else>
                    <h1 class="not-found-anuncio">Ooops! Nenhum anúncio encontrado :(</h1>
                </div>
            </div>

            <div v-else>
                <Loading/>
            </div>
        </div>
    </main>
</template>

<script>

import { getMydatas } from '@/help.js'
import firebase from 'firebase'

import PorqueAdotar from '../components/PorqueAdotar.vue'
import Cards from '../components/Cards';
import Loading from '../components/Loading'
import ModalSuccess from '../components/ModalSuccess.vue'
import FilterData from '../components/FilterData.vue'

export default {

    components: {
        PorqueAdotar,
        ModalSuccess,
        FilterData,
        Loading,
        Cards
    },

    data() {
        return {
            anuncios: [],
            backupAnuncios: [],
            citys: [],
            filters: {},
            filterCity: '',
            filterType: '',
            loading: true,
            success: true,
            mensagem: "",
        }
    },

    watch: {
        anuncios() {
            this.anuncios.forEach(anuncio => {
                if(!this.citys.includes(anuncio.cidade)) {
                    this.citys.push(anuncio.cidade)
                }
            })
        },
    },

    methods: {
        async buscarTodosAnuncios() {
            this.anuncios = await getMydatas()
            this.backupAnuncios = this.anuncios
            setTimeout(() => this.loading = false, 1000)
        },

        async favoritar(index, anuncio) {
            const username = localStorage.getItem('displayName')
            const favorito = document.querySelectorAll('.favoritar')
            var id = "id" + Math.random().toString(16).slice(2)

            const favoriteExist = await this.verificarFavoritosCadastrados(username, anuncio.categoria, anuncio.id)

            if(!favoriteExist) {
                firebase.database()
                .ref(username)
                .child(`favorites/${anuncio.categoria}`)
                .update({
                    [id]: anuncio["id"]
                })
                .then(() => {
                    this.mensagem = `${anuncio.nome} foi adicionado aos favoritos`
                    this.success = true
                    favorito[index].style.color = 'red'
                    setTimeout(() => this.mensagem = '', 1000)
                })
                return
            }

            this.mensagem = `${anuncio.nome} já esta nos favoritos`
            this.success = false
            setTimeout(() => this.mensagem = '', 1000)
        },
        
        async verificarFavoritosCadastrados(username, categoria, id) {
            var favoriteExist = false
            
            await firebase.database()
            .ref(username)
            .child(`favorites/${categoria}`)
            .once("value", snapshot => {
                if(!snapshot.exists()) {
                    return favoriteExist
                }

                Object.keys(snapshot.val()).forEach((key) => {
                    if(snapshot.val()[key] === id) {
                        favoriteExist = true
                    }
                })
            })
            return favoriteExist
        },

        filter(filter) {
            this.anuncios = this.backupAnuncios

            if (filter !== 'limpar') {
                //[0] é a key do banco, nome do filtro
                //[1] é o valor
                this.filters[filter["filter"][0]] = filter["filter"][1]

                Object.keys(this.filters).forEach(key => {
                    this.anuncios = this.anuncios.filter(anuncio => anuncio[key] === this.filters[key])
                })
            } else {
                this.filters = {}
            }
        }
    },

    mounted() {
        document.title = "Página inicial"
        setTimeout(() => this.buscarTodosAnuncios(), 400)
        
        this.$root.$on('filterPageHome', (filter) => this.filter(filter))
    },
}
</script>

<style>

.favoritar {
    text-align: center;
    padding: 10px;
    border-top: 1px solid #000;
    cursor: pointer;
}

.todos-anuncios {
    margin-bottom: 60px;
}

</style>