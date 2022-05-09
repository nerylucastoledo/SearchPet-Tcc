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
            var filterNow = ''

            if(filter === 'limpar') {
                this.filterCity = ''
                this.filterType = ''
            } 
            
            if(filter.cidade) {
                this.filterCity = filter.cidade
                filterNow = 'cidade'
            }

            if (filter.categoria) {
                this.filterType = filter.categoria
                filterNow = 'categoria'
            }

            if(this.filterCity && this.filterType){
                this.anuncios = this.anuncios.filter(
                    anuncio => anuncio.cidade === this.filterCity && anuncio.categoria === this.filterType
                )
            } 
                
            this.anuncios = this.anuncios.filter(anuncio => anuncio[filterNow] === filter[filterNow])
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

.clear-filter {
    cursor: pointer;
    padding: 10px;
    display: block;
    margin: 0 auto 20px;
    text-align: center;
    max-width: 140px;
    border-radius: 15px;
    margin-right: 40px;
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.25);
    margin-top: -30px;
}

.clear-filter span {
    color: red;
    font-weight: bold;
}

.favoritar {
    text-align: center;
    padding: 10px;
    border-top: 1px solid #000;
    cursor: pointer;
}

</style>