<template>
    <div class="container anuncio-edit">
        <div class="intro">
            <h1 class="titulo">{{anuncio.nome}}</h1>

            <div v-if="!anuncio.pausado">
                <button 
                    v-if="anuncio.categoria === 'Adocao'" 
                    class="btn-finish" 
                    @click="finalizarAnuncio"
                    >
                    Finalizar adoção ✓
                </button>

                <button 
                    v-else @click="finalizarAnuncio"
                    class="btn-finish" 
                    >
                    Finalizar busca ✓
                </button>
            </div>
        </div>

        <div v-if="mensagem.length">
            <ModalSuccess 
                :mensagem="mensagem" 
                :success="success"
                >
            </ModalSuccess>
        </div>

        <div class="formulario container">
            <ModalFinish :anuncio="anuncio"></ModalFinish>
        </div>

        <div class="image-animal">
            <img 
                v-if="!preview" 
                :src="imagemAnimal" 
                alt="Preview Imagem"
            >
            <img 
                v-else 
                id="img_preview" 
                alt="Imagem principal"
                :src="preview"
            >
            <input
                id="new-image"
                type="file" 
                accept="image/*"
                @change="previewDaImagem"
                :disabled="anuncio.pausado"
            >
        </div>

        <form class="form-perfil">
            <div>
                <div>
                    <label for="name">Nome dele(a)</label>
                    <input 
                        :class="{readonly: anuncio.pausado}"
                        type="text" 
                        id="name" 
                        name="name" 
                        placeholder="Nome" 
                        required
                        :readonly="anuncio.pausado"
                        v-model="anuncio.nome" 
                    >
                </div>

                <div>
                    <label for="peso">Peso em KG</label>
                    <input 
                        :class="{readonly: anuncio.pausado}"
                        type="number" 
                        id="peso" 
                        name="peso" 
                        placeholder="Peso" 
                        required
                        :readonly="anuncio.pausado"
                        v-model="anuncio.peso" 
                    >
                </div>
            </div>   

            <div>
                <div>
                    <label for="idade">Idade dele(a)</label>
                    <input
                        :class="{readonly: anuncio.pausado}"
                        type="text" 
                        id="idade" 
                        name="idade" 
                        placeholder="idade" 
                        required
                        :readonly="anuncio.pausado"
                        v-model="anuncio.idade" 
                    >
                </div>

                <div>
                    <label for="peso">Sexo</label>
                    <select 
                        class="filter-selected"
                        :class="{readonly: anuncio.pausado}"
                        :disabled="anuncio.pausado" 
                        v-model="anuncio.sexo" 
                        >
                        <option disabled value="">Sexo</option>
                        <option value="Macho">Macho</option>
                        <option value="Femea">Fêmea</option>
                    </select>
                </div>
            </div> 

            <div>
                <div class="form-select">
                    <label for="idade">Categoria</label>
                    <select 
                        class="filter-selected"
                        :class="{readonly: anuncio.pausado}"
                        v-model="anuncio.categoria" 
                        disabled
                        >
                        <option disabled value="">Categoria</option>
                        <option value="Adocao">Para adoção</option>
                        <option value="Perdido">Esta perdido</option>
                    </select>
                </div>

                <div class="form-select">
                    <label for="peso">Castrado</label>
                    <select 
                        class="filter-selected"
                        :class="{readonly: anuncio.pausado}"
                        v-model="anuncio.castrado" 
                        :disabled="anuncio.pausado" 
                        >
                        <option disabled value="">Castrado</option>
                        <option :value=true>Sim</option>
                        <option :value=false>Não</option>
                    </select>
                </div>
            </div> 

            <button 
                class="btn-form btn-confirm" 
                type="submit" 
                v-if="!anuncio.pausado"
                @click.prevent="atualizar"
                >
                Salvar
            </button>

            <router-link to="/meus">
                <button 
                    class="btn-form btn-cancel" 
                    type="submit"
                    v-if="!anuncio.pausado"
                    >
                    Cancelar
                </button>
            </router-link>
        </form>
    </div>
</template>

<script>

import firebase from 'firebase'
import ModalSuccess from '../components/ModalSuccess.vue'
import ModalFinish from '../components/ModalFinish.vue'


export default {

    components: {
        ModalSuccess,
        ModalFinish
    },

    data() {
        return {
            anuncio: {
                type: '',
                sexo: '',
                peso: '',
                pausado: '',
                nome: '',
                idade: '',
                categoria: '',
                id: "",
                castrado: ""
            },
            imagemAnimal: '',
            imageData: null,
            picture: null,
            preview: null,
            success: true,
            mensagem: "",
        }
    },
    watch: {
        anuncio() {
            return this.anuncio
        },

        preview() {
            return this.preview
        }
    },

    methods: {
        previewDaImagem(event) {
            this.picture = null
            this.imageData = event.target.files[0]
            
            const fileReader = new FileReader()
            fileReader.onloadend = () => this.preview = fileReader.result
            fileReader.readAsDataURL(this.imageData)
        },

        async atualizar() {
            if(this.imageData) {
                await this.salvarFoto()

            } else {
                this.atualizarAnuncio()
            }
        },

        async salvarFoto() {
            this.picture = null

            const storageRef = firebase.storage().ref(`${this.imageData.name}`).put(this.imageData)
            
            storageRef.on(`state_changed`, snapshot => {}, error => {}, () => {
                    storageRef.snapshot.ref.getDownloadURL().then(url => {
                        this.picture = url;
                        this.atualizarAnuncio()
                    })
                }
            )
        },

        async atualizarAnuncio() {
            const [id, anuncio] = [this.$route.params.id, this.$route.params.anuncio]
            const new_image = this.picture ? this.picture : this.imagemAnimal

            firebase.database()
            .ref('/Anuncios/' + anuncio)
            .child(id)
            .update({
                ...this.anuncio,
               imagem: new_image,
            })
            .then(() => {
                this.mensagem = 'Anuncio atualizado com sucesso!'
                this.success = true

                setTimeout(() => this.mensagem = '', 1000)
                setTimeout(() => this.$router.replace({ name: "home" }), 1500)
            })
        },

        finalizarAnuncio() {
            window.scrollTo({ top: 0, behavior: "smooth" })
            document.querySelector('.formulario').style.display = 'block'
        }
    },

    mounted() {
        const anuncio = this.$route.params.anuncio
        const idAnuncio = this.$route.params.id

        firebase.database().ref('/Anuncios/' + anuncio)
        .child(idAnuncio)
        .once("value", snapshot => {
            this.anuncio.type = snapshot.val()["type"]
            this.anuncio.sexo = snapshot.val()["sexo"]
            this.anuncio.peso = parseInt(snapshot.val()["peso"])
            this.anuncio.pausado = snapshot.val()["pausado"]
            this.anuncio.nome = snapshot.val()["nome"]
            this.imagemAnimal = snapshot.val()["imagem"]
            this.anuncio.idade = snapshot.val()["idade"]
            this.anuncio.categoria = snapshot.val()["categoria"]
            this.anuncio.castrado = snapshot.val()["castrado"]
            this.anuncio.id = snapshot.val()["id"]
            document.title = `Anuncio - ${snapshot.val()["Nome"]}`
        })
    }
}
</script>

<style scoped>

.intro {
    position: relative;
}

.btn-finish {
    position: absolute;
    top: 100px;
    right: 0px;
    padding: 10px;
    border-radius: 10px;
    border: none;
    background-color: rgb(46, 170, 46);
    color: #fff;
    font-size: 18px;
    cursor: pointer;
}

.anuncio-edit {
    padding: 0 30px;
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    margin-bottom: 60px;
    padding-bottom: 60px;
}

select {
    background-color: #fff;
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.25);
    color: #000 !important;
    border-radius: 10px;
    width: 97%;
    height: 50px;
    border: none;
    color: #fff;
    font-size: 18px;
    padding-left: 10px;
}

.image-animal {
    margin: 60px 0;
}

.image-animal img{
    border-radius: 20px;
    display: block;
    margin: 0 auto;
    text-align: center;
    max-width: 500px;
    height: 300px;
    object-fit: cover;
}

#new-image {
    display: block;
    margin: 40px auto 0;
    text-align: center;
}

.form-perfil input  {
    width: 95%;
}

.btn-confirm {
    margin-top: 60px;
}

.btn-cancel {
    background-color: tomato;
}

/* FORM MODAL */
.formulario {
    display: none;
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    padding: 0 30px;
}

.formulario::before {
    content: "";
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,.8)
}
.formulario > div {
    position: relative;
    top: 15%;
    padding: 30px;
    max-width: 500px;
    margin: 0px auto;
    background-color: #fff;
    border-radius: 15px;
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
    z-index: 2;
}

.readonly {
    background-color: #D1CDC8;
}

@media (max-width: 845px) {
    .form-select {
        margin-top: 30px;
    }
}

@media (max-width: 940px) {
    .btn-finish {
        top: 0px;
    }

    .image-animal img {
        width: 100%;
        display: block;
    }
}

@media (max-width: 530px) {
    .btn-finish {
        position: unset;
        margin: 40px auto 0;
        display: block;

    }
}

</style>