<template>
    <main class="container content-principal">
        <div v-if="mensagem.length">
            <ModalSuccess 
                :mensagem="mensagem" 
                :success="success">
            </ModalSuccess>
        </div>

        <FilterData :citys="citys"></FilterData>

        <div class="cards" v-if="!loading">
            <div v-for="anuncio, index in anuncios" :key="anuncio.imagen">
                <router-link :to="`/animal/${anuncio.categoria}/${anuncio.id}`">
                    <div class="image-and-name">
                        <img :src="anuncio.imagem" alt="Imagem de um animal">

                        <div class="logo-and-name">
                            <h1>{{anuncio.nome}}</h1>

                            <img v-if="anuncio.logo_ong" :src="anuncio.logo_ong" alt="Logo da ONG">
                        </div>
                    </div>

                    <div id="category" 
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
                                    <img src="../assets/castrado.png" alt="Logo pata">
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

                <div class="favoritar">
                    <p @click="favoritar(index, anuncio)">
                        <font-awesome-icon icon="heart" size="2x"/>
                    </p>
                </div>
            </div>
        </div>

        <div v-else>
            <Loading/>
        </div>

        <PorqueAdotar/>
    </main>
</template>

<script>

import { getMydatas } from '@/help.js'
import firebase from 'firebase'

import PorqueAdotar from '../components/PorqueAdotar.vue'
import Loading from '../components/Loading'
import ModalSuccess from '../components/ModalSuccess.vue'
import FilterData from '../components/FilterData.vue'

export default {

    components: {
        PorqueAdotar,
        ModalSuccess,
        FilterData,
        Loading
    },

    data() {
        return {
            citys: [],
            anuncios: [],
            backup_anuncios: [],
            filter_city: '',
            filter_type: '',
            loading: true,
            isActive: true,
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
        async getDatas() {
            this.anuncios = await getMydatas()
            this.backup_anuncios = this.anuncios

            setTimeout(() => this.loading = false, 500);
        },

        async favoritar(index, anuncio) {
            const username = sessionStorage.getItem('displayName')
            const favorito = document.querySelectorAll('.favoritar')

            var id = "id" + Math.random().toString(16).slice(2)

            const favoriteExist = await this.verifyIfExistFavorite(username, anuncio.categoria, anuncio.id)

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
        
        async verifyIfExistFavorite(username, categoria, id) {
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
    },

    mounted() {
        const logado = sessionStorage.getItem('login')
        
        if(!logado) {
            this.$router.replace({ name: "login" });
            return
        }

        setTimeout(() => this.getDatas(), 300);

        this.$root.$on('filterPageHome', (filter) => {
            this.anuncios = this.backup_anuncios
            var filter_now = ''

            if(filter === 'limpar') {
                this.filter_city = ''
                this.filter_type = ''
            } 
            
            if(filter.cidade) {
                this.filter_city = filter.cidade
                filter_now = 'cidade'
            }

            if (filter.categoria) {
                this.filter_type = filter.categoria
                filter_now = 'categoria'
            }

            if(this.filter_city && this.filter_type){
                this.anuncios = this.anuncios.filter(
                    anuncio => anuncio.cidade === this.filter_city && anuncio.categoria === this.filter_type
                )
            } 
                
            this.anuncios = this.anuncios.filter(anuncio => anuncio[filter_now] === filter[filter_now])
        })
    },
}
</script>

<style>

.content-principal {
    margin-top: 60px;
}

.cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 0 30px;
    grid-gap: 30px;
}

.cards > div {
    margin-bottom: 30px;
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
}

.image-and-name {
    position: relative;
    background-color: #fff;
}

.image-and-name img {
    width: 100%;
    height: 300px;
    display: block;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
}

.image-and-name h1 {
    bottom: 20px;
    left: 10px;
    color: #36C9D2;
    font-weight: bold;
    text-align: center;
    margin: 20px 0;
}

.dados {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
}

.dados > div {
    font-size: 18px;
    font-weight: bold;
    color: #000;
}

.dados > div div {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    text-align: center;
    border-radius: 10px;
    padding: 10px;
    height: 30px;
    width: 80%;
    align-items: center;
    background-color: #fff;
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.25);
}

.dados > div div img {
    margin-left: 20px;
}

#category {
    text-align: center;
    color: #fff;
    margin: 20px auto;
    padding: 10px; 
    width: 150px;
    border-radius: 15px;
    font-weight: bold;
}

.adocao {
   background-color: #6DB662; 
}

.perdido {
    background-color: #aeb116;
}

.macho {
    color: #3baaf5;
}

.femea {
    color: #d254e2;
}

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

.logo-and-name {
    position: relative;
}

.logo-and-name img {
    width: 40px;
    height: 40px;
    top: 5px;
    right: 30px;
    border-radius: 20px;
    position: absolute;
}

@media (max-width: 1040px) {
    .cards {
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 0 30px;
        grid-gap: 30px;
    }
}

@media (max-width: 705px) {
    .cards {
        display: grid;
        grid-template-columns: 1fr;
    }

    .cards > div {
        max-width: 100%;
        width: 100%;
    }

    .dados div {
        max-width: 300px;
        margin: 0 auto;
        width: 100%;
    }
}

@media (max-width: 405px) {
    .dados {
        display: block;
    }

    .image-and-name img {
        height: 200px;
    }
}

</style>