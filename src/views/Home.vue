<template>
    <main v-if="!loading">
        <Introducao/>

        <div class="container content-principal">
            <h1 class="titulo">Alguns anúncios</h1>

            <div v-if="anuncios.length" class="cards">
                <div 
                    v-for="anuncio in anuncios.slice(0, 6)" 
                    :key="anuncio.id"
                    >
                    <router-link :to="`/animal/${anuncio.categoria}/${anuncio.id}`">
                        <Cards :anuncio="anuncio"></Cards>
                    </router-link>
                </div>
            </div>

            <div v-else>
                <h1 class="not-found-anuncio">Ooops! Nenhum anúncio encontrado :(</h1>
            </div>

            <router-link to="/todos-anuncios">
                <button class="btn-padrao">Ver todos anúncios ➡︎</button>
            </router-link>

            <PorqueAdotar/>
        </div>
    </main>
    <div v-else>
        <Loading/>
    </div>
</template>

<script>

import { getMydatas } from '@/help.js'

import PorqueAdotar from '../components/PorqueAdotar.vue'
import Introducao from '../components/Introducao.vue'
import Cards from '../components/Cards';
import Loading from '../components/Loading'

export default {

    components: {
        PorqueAdotar,
        Loading,
        Introducao,
        Cards
    },

    data() {
        return {
            anuncios: [],
            loading: true,
        }
    },

    methods: {
        async buscarTodosAnuncios() {
            this.anuncios = await getMydatas("pausado", false)
            setTimeout(() => this.loading = false, 1000)
        },
    },

    mounted() {
        document.title = "Página inicial"
        setTimeout(() => this.buscarTodosAnuncios(), 400)
    },
}
</script>

<style>

.content-principal {
    margin-top: 60px;
}

.titulo {
    margin-bottom: 60px;
}

.not-found-anuncio {
    text-align: center;
    font-size: 2rem;
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

.box-imagem-nome {
    position: relative;
    background-color: #fff;
}

.box-imagem-nome img {
    width: 100%;
    height: 300px;
    display: block;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
}

.anuncio-finalizado {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    bottom: 80px;
    color: #fff;
    font-size: 32px;
    text-align: center;
}

.box-imagem-nome h1 {
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
    width: 28px;
    height: 28px;
    margin-left: 20px;
}

.btn-padrao {
    display: block;
    margin: 40px auto;
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

.box-nome-logo {
    position: relative;
}

.box-nome-logo img {
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

    .not-found-anuncio {
        font-size: 24px;
    }
}

@media (max-width: 405px) {
    .dados {
        display: block;
    }

    .box-imagem-nome img {
        height: 200px;
    }

    .box-nome-logo img {
        height: 40px;
    }
}

</style>