<template>
    <main class="container content-principal">
        <div class="meus-anuncios">
            <div class="side-meus-anuncios">
                <img v-if="tipoConta === 'ONG'" :src="imagemOng" alt="Imagem da ONG">

                <span class="name">Olá, {{nomeOng}}</span>
                
                <div v-if="tipoConta === 'ONG'">
                    <p  
                        v-if="tipoConta === 'ONG'"
                        @click="filtrarMeusAnuncios(0, '')" 
                        class="link-filter"
                        >
                        Todos anuncios
                    </p>

                    <p 
                        v-if="tipoConta === 'ONG'"
                        @click="filtrarMeusAnuncios(1, 'pausado', false)" 
                        class="link-filter"
                        >
                        Anuncios ativos
                    </p>

                    <p 
                        v-if="tipoConta === 'ONG'"
                        @click="filtrarMeusAnuncios(2, 'pausado', true)" 
                        class="link-filter"
                        >
                        Anuncios finalizados
                    </p>
                </div>
                <p 
                    @click="filtrarAnunciosFavoritos(3)" 
                    class="link-filter"
                    >
                    Escolhidos por vocẽ
                </p>
            </div>

            <div v-if="!loading">
                <div class="open-filter">
                    <font-awesome-icon 
                        @click="abrirMenuFiltros" 
                        id="filter" 
                        icon="filter" 
                        size="2x"
                    />
                </div>

                <div class="cards" v-if="anuncios.length">
                    <div v-for="anuncio in anuncios" :key="anuncio.nome+1">
                         <p
                            v-if="favorite"
                            class="fechar"
                            @click="procurarAnuncioPeloId(anuncio)"
                            >
                            X
                        </p>

                        <router-link :to=" !favorite ? `/anuncio/${anuncio.categoria}/${anuncio.id}` : `/animal/${anuncio.categoria}/${anuncio.id}`">
                            <div class="box-imagem-nome">
                                <img 
                                    :src="anuncio.imagem" 
                                    alt="Imagem de um animal"
                                    :class="{finalizado: anuncio.pausado}"
                                >
                                
                                <span 
                                    v-if="anuncio.pausado && anuncio.categoria === 'Adocao'"
                                    class="anuncio-finalizado"
                                    >
                                    Adotado 🐶
                                </span>

                                <span 
                                    v-else-if="anuncio.pausado"
                                    class="anuncio-finalizado"
                                    >
                                    Encontrado 🐶
                                </span>

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
                                        <p class="castrado">{{anuncio.peso}} Kg</p>
                                        
                                        <span>
                                            <img src="../assets/peso.png" alt="Calendario">
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>

                <div v-else-if="mensagemFavoritada" class="message">
                    <h2>🐶 Oops!</h2>

                    <p>Você ainda não tem favoritos :(</p>
                </div>

                <div v-else>
                    <h2 class="message">🐶 Oops! Nada para mostrar</h2>
                </div>

                <div v-if="botaoInserirAnuncios">
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
            anuncios: [],
            backupAnuncios: [],
            imagemOng: null,
            loading: true,
            nomeOng: '',
            favorite: false,
            botaoInserirAnuncios: true,
            mensagemFavoritada: false,
            tipoConta: '',
            username: '',
            listaDeFavoritos: []
        }
    },

    methods: {
        filtrarMeusAnuncios(index, filtro, valor) {
            this.mudarCorDoFiltro(index)

            this.mensagemFavoritada = false
            this.favorite = false
            this.botaoInserirAnuncios = true

            this.anuncios =  this.backupAnuncios
            this.anuncios = this.anuncios.filter(data => data[filtro] === valor)
        },

        async filtrarAnunciosFavoritos(index) {
            this.mudarCorDoFiltro(index)

            this.botaoInserirAnuncios = false
            this.loading = true
            this.favorite = true
            this.anuncios = []

            var listaFavoritos = []
            const favorites = await this.pegarDadosDoBanco(this.username, 'favorites')

            if(favorites.val()) {
                Object.keys(favorites.val()).forEach((key) => {
                    Object.keys(favorites.val()[key]).forEach((idFavorite) => {
                        this.listaDeFavoritos.push(idFavorite)
                        const idAnunciosFavoritos = favorites.val()[key][idFavorite]

                        firebase.database().ref('Anuncios').child(key)
                        .once("value", anuncios => {
                            Object.keys(anuncios.val()).forEach((idAnuncios) => {
                                if(idAnuncios === idAnunciosFavoritos) {
                                    listaFavoritos.push(anuncios.val()[idAnuncios])
                                }
                            })
                        })
                    })
                })
                this.anuncios = listaFavoritos
                setTimeout(() => this.loading = false, 300);
                return
            }
            
            this.mensagemFavoritada = true
            this.anuncios = []
            setTimeout(() => this.loading = false, 300);
        },

        async procurarAnuncioPeloId(anuncio) {
            const username = localStorage.getItem('displayName')

            await firebase.database()
            .ref(username)
            .child(`favorites/${anuncio.categoria}`)
            .once("value", snapshot => {
                Object.keys(snapshot.val()).forEach((key) => {
                    if(snapshot.val()[key] === anuncio.id) {
                        this.deletarAnuncio(anuncio, username, key)
                    }
                })
            })
        },

        async deletarAnuncio(anuncio, username, anuncioParaRemover) {
            await firebase.database()
            .ref(`${username}/favorites/${anuncio.categoria}`)
            .child(anuncioParaRemover)
            .remove(() => {
                this.loading = true
                setTimeout(() => {
                    this.loading = false

                    if(this.tipoConta === 'particular') {
                        this.filtrarAnunciosFavoritos(0)
                        return
                    }
                    
                    this.filtrarAnunciosFavoritos(3)
                }, 500);
            })
        },

        mudarCorDoFiltro(index) {
            document.querySelector('.side-meus-anuncios').classList.toggle('open-modal')

            const activeButton = document.querySelectorAll('.link-filter')

            activeButton.forEach(element => element.classList.remove('ativo'))
            activeButton[index].classList.add('ativo')
        },

        abrirMenuFiltros() {
            document.querySelector('.side-meus-anuncios').classList.toggle('open-modal')
        },

        async pegarFotoNomeOng() {
            const fotoNome = await this.pegarDadosDoBanco(this.username)
            this.nomeOng = fotoNome.val()["nameOng"]
            this.imagemOng = fotoNome.val()["image"]

            setTimeout(() => this.loading = false, 500)
        },

        async pegarDadosDoBanco(ref, child = '') {
            return await firebase.database()
                .ref(`${ref}/${child}`)
                .once("value", snapshot => snapshot.exists() ? snapshot.val() : null)
        },

        async pegarTipoDeConta() {
            await firebase.database()
            .ref(this.username)
            .once("value", snapshot => this.tipoConta = snapshot.val()["type"])
        }
    },

    async mounted() {
        this.username = localStorage.getItem("displayName")
        await this.pegarTipoDeConta()
        if(this.tipoConta === 'particular') {
            this.filtrarAnunciosFavoritos(0)
            return
        }

        document.querySelectorAll('.link-filter')[0].classList.add('ativo')

        const todosAnunciosDaConta = await getMydatas('username', this.username)
        this.anuncios = todosAnunciosDaConta
        this.backupAnuncios = todosAnunciosDaConta

        this.pegarFotoNomeOng()
    },

    beforeCreate() {
        document.title = 'Meus'
        const logado = localStorage.getItem('login')
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
    object-fit: cover;
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

.image-and-name {
    position: relative;
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