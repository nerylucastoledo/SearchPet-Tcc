<template>
    <main class="container content-principal">
        <div class="filter-home">
            <select v-model="city" class="filter-selected">
                <option disabled value="">Selecione a Cidade</option>

                <option v-for="stayedCity of anuncios" :key="stayedCity.cidade" :value="stayedCity.cidade">{{stayedCity.cidade}}</option>
            </select>

            <select v-model="type" class="filter-selected">
                <option disabled value="">Selecione a Categoria</option>

                <option value="Adocao">Adoção</option>

                <option value="Perdido">Perdidos</option>
            </select>
        </div>

        <div class="cards" v-if="!loading">
            <div v-for="anuncio in anuncios" :key="anuncio.imagen">
                <router-link :to="`/animal/${anuncio.categoria}/${anuncio.id}`">
                    <img v-if="anuncio.imagem" id="image-animal" :src="anuncio.imagem" alt="Imagem de um animal">

                    <div>
                        <div class="info-animal">
                            <h2 id="name-animal">{{anuncio.nome}}</h2>
                            <span>
                                <img id="logo-ong" src="../assets/image_ong.png" alt="">
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

        <div v-else>
            <Loading/>
        </div>

        <PorqueAdotar/>
    </main>
</template>

<script>

import PorqueAdotar from '../components/PorqueAdotar.vue'
import { getMydatas } from '@/help.js'
import Loading from '../components/Loading'

export default {

    components: {
        PorqueAdotar,
        Loading
    },

    data() {
        return {
            city: "",
            type: "",
            anuncios: [],
            loading: true
        }
    },

    watch: {
        city() {
        },

        type() {
        }
    },

    methods: {
        async getDatas() {
            this.anuncios = await getMydatas()

            setTimeout(() => {
                this.loading = false
            }, 500);
        },
    },

    mounted() {
        setTimeout(() => {
            this.getDatas()
        }, 600);
    },

    beforeCreate() {
        const logado = localStorage.getItem('login')
        
        if(!logado) {
        this.$router.replace({ name: "login" });
        }
    }
}
</script>

<style>

.content-principal {
    margin-top: 60px;
}

.filter-home {
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.filter-home select {
    background-color: #36C9D2;
    border-radius: 10px;
    width: 45%;
    height: 50px;
    border: none;
    color: #fff;
    font-size: 16px;
    margin-bottom: 30px;
}

.cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
    padding: 0 20px;
    margin-bottom: 60px;
}

.cards > div a {
    color: #000;
    background-color: #fff;
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    display: flex;
    max-width: 100%;
    margin-top: 30px;
}

#image-animal {
    max-width: 150px;
    max-height: 162px;
    object-fit: cover;
    border-radius: 10px 0 0 10px;
}

.info-animal {
    display: flex;
    padding: 10px 10px 0 0;
    justify-content: space-between;
    align-items: center;
}

#name-animal {
    margin-left: 20px;
}

#logo-ong {
    width: 30px;
    height: 30px;
}

.local-animal {
    margin-top: 10px;
    display: flex;
    font-size: 14px;
    align-items: center;
}

.local-animal p {
    max-width: 150px;
}

.local-animal span {
    margin-left: 20px;
    margin-right: 10px;
}

.category {
    background-color: #6DB662;
    text-align: center;
    color: #fff;
    margin: 10px 0 0 20px;
    padding: 5px; 
    width: 150px;
    border-radius: 15px;
}

.quality {
    display: flex;
    font-size: 12px;
    margin-top: 10px;
    justify-content: space-between;
    align-items: center;
    margin-left: 15px;
    padding-bottom: 10px;
    font-weight: bold;
}

.quality span {
    margin: 0 5px;
}

</style>