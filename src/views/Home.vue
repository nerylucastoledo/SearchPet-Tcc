<template>
    <main class="container content-principal">
        <div class="filter-home">
            <select v-model="city" class="filter-selected">
                <option disabled value="">Selecione a Cidade</option>

                <option v-for="cidade of citys" :key="cidade" :value="cidade">{{cidade}}</option>
            </select>

            <select v-model="type" class="filter-selected">
                <option disabled value="">Selecione a Categoria</option>

                <option value="Adocao">Adoção</option>

                <option value="Perdido">Perdidos</option>
            </select>
        </div>

        <p 
            class="clear-filter" 
            v-if="type || city" 
            @click="clearFiler">
            Limpar filtro
            <span>X</span>
        </p>

        <div class="cards" v-if="!loading">
            <div v-for="anuncio in anuncios" :key="anuncio.imagen">
                <router-link :to="`/animal/${anuncio.categoria}/${anuncio.id}`">
                    <img 
                        id="image-animal"
                        v-if="anuncio.imagem" 
                        :src="anuncio.imagem" 
                        alt="Imagem de um animal"
                    >

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
            citys: [],
            type: "",
            anuncios: [],
            backup_anuncios: [],
            loading: true,
            isActive: true
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

        city() {
            this.filter('cidade', 'city')
        },

        type() {
            this.filter('categoria', 'type')
        }
    },

    methods: {
        async getDatas() {
            this.anuncios = await getMydatas()
            this.backup_anuncios = await getMydatas()

            setTimeout(() => this.loading = false, 500);
        },

        clearFiler() {
            this.type = ''
            this.city = ''
        },

        filter(filter, value) {
            this.anuncios = this.backup_anuncios

            if(this.city === '' && this.type === '') {
                this.anuncios = this.backup_anuncios

            } else if(this.city && this.type){
                this.anuncios = this.anuncios.filter(
                    anuncio => anuncio.cidade === this.city && anuncio.categoria === this.type
                )
                
            } else {
                this.anuncios = this.anuncios.filter(anuncio => anuncio[filter] === this[value])
            }
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
    },
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
    width: 200px;
    height: 200px;
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

#category {
    text-align: center;
    color: #fff;
    margin: 10px 0 0 20px;
    padding: 5px; 
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

.quality {
    display: flex;
    font-size: 12px;
    margin-top: 30px;
    justify-content: space-between;
    align-items: center;
    margin-left: 15px;
    padding-bottom: 10px;
    font-weight: bold;
}

.quality span {
    margin: 0 5px;
}

.clear-filter {
    cursor: pointer;
    padding: 10px;
    display: block;
    margin: 0 auto;
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

</style>