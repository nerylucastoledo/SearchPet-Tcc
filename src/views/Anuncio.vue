<template>
    <div class="login-form">
        <h1 class="titulo">Anuncio do Scooby</h1>

        <form class="login">

            <img :src="anuncio.imagem" alt="">

            <input 
                id="imagem_produto" 
                type="file" 
                name="imagem_produto" 
                autocomplete="imagem_produto" 
                required 
                ref="imagem_produto">


            <div>
                <input type="text" id="name" name="name" placeholder="nome" v-model="anuncio.name" required>

                <input type="text" id="peso" name="peso" placeholder="peso" v-model="anuncio.peso" required>
            </div>           

            <div>
                <input type="text" id="idade" name="idade" placeholder="idade" v-model="anuncio.idade" required>

                <select v-model="anuncio.sexo" class="filter-selected">
                    <option disabled value="">Sexo</option>

                    <option value="Macho">Macho</option>

                    <option value="Femea">Fêmnea</option>
                </select>
            </div>    
        
            <div>
                <select v-model="anuncio.categoria" class="filter-selected">
                    <option disabled value="">Categoria</option>

                    <option value="Adocao">Adoção</option>

                    <option value="Perdido">Perdidos</option>
                </select>

                <select v-model="anuncio.castrado" class="filter-selected">
                    <option disabled value="">Castrado</option>

                    <option value="Sim">Sim</option>

                    <option value="Nao">Não</option>
                </select>
            </div>

            <button class="btn-form" type="submit" @click.prevent="updatePerfil">Salvar</button>
        </form>
    </div>
</template>

<script>

import firebase from 'firebase'

export default {
    data() {
        return {
            anuncio: {
                imagem_produto: null,
                name: "",
                sexo: "",
                castrado: "",
                categoria: "",
                imagem: ''
            },
        }
    },
    watch: {
        anuncio() {
            return this.anuncio
        }
    },

    methods: {
        updatePerfil() {
            console.log('clicou')
        }
    },

    mounted() {
        const id = this.$route.params.id
        const anuncio = this.$route.params.anuncio

        console.log('/Anuncios/' + anuncio + '/' + id)

        firebase.database().ref('/Anuncios/' + anuncio)
        .child(id)
        .once("value", snapshot => {
            this.anuncio.name = snapshot.val()["nome"]
            this.anuncio.peso = snapshot.val()["peso"]
            this.anuncio.idade = snapshot.val()["idade"]
            this.anuncio.imagem = snapshot.val()["imagem"]
            this.anuncio.sexo = snapshot.val()["sexo"]
            this.anuncio.categoria = snapshot.val()["categoria"]

            this.anuncio.castrado = snapshot.val()["castrado"] ? 'Sim' : 'Nao'
        })
    }
}
</script>

<style scoped>

.login {
    margin-bottom: 60px;
    box-shadow: none;
}

.login img {
    margin-top: -40px;
    width: 500px;
    max-width: 500px;
    height: 300px;
    max-height: 300px;
    border-radius: 10px;
    object-fit: cover;
    margin-bottom: 40px;
}

.login div {
    display: flex;
    align-items: center;
    flex: 1;
    flex-wrap: wrap;
    justify-content: space-around;
}

input {
    width: 250px;
}

.login div div span{
    left: 240px;
}

.filter-selected {
    display: block;
    margin: 0 auto 30px;
    padding: 15px 0;
    width: 265px;
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.25);
    border: none;
    border-radius: 10px;
    padding-left: 15px;
    color: #000;
    font-size: 16px;
    background-color: #fff;
    font-size: 18px;
}
</style>