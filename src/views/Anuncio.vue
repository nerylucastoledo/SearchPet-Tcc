<template>
    <div class="login-form">
        <h1 class="titulo">Anuncio {{anuncio.nome}}</h1>

        <div v-if="mensagem.length">
            <ModalSuccess 
                :mensagem="mensagem" 
                :success="success">
            </ModalSuccess>
        </div>

        <form class="login">
            <img 
                v-if="!preview" 
                :src="anuncio.imagem" 
                alt=""
            >
            <img 
                v-else 
                id="img_preview" 
                :src="preview"
            >

            <input 
                type="file" 
                accept="image/*"
                @change="previewImage"
            >

            <div>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Nome" 
                    v-model="anuncio.nome" 
                    required
                >

                <input 
                    type="text" 
                    id="peso" 
                    name="peso" 
                    placeholder="Peso" 
                    v-model="anuncio.peso" 
                    required
                >
            </div>           

            <div>
                <input 
                    type="text" 
                    id="idade" 
                    name="idade" 
                    placeholder="idade" 
                    v-model="anuncio.idade" 
                    required
                >

                <select v-model="anuncio.sexo" class="filter-selected">
                    <option disabled value="">Sexo</option>

                    <option value="Macho">Macho</option>

                    <option value="Femea">Fêmea</option>
                </select>
            </div>    
        
            <div>
                <select v-model="anuncio.categoria" aria-readonly="" class="filter-selected">
                    <option disabled value="">Categoria</option>

                    <option value="Adocao">Adoção</option>

                    <option value="Perdido">Perdid</option>
                </select>

                <select v-model="anuncio.castrado" class="filter-selected">
                    <option disabled value="">Castrado</option>

                    <option value="Sim">Sim</option>

                    <option value="Nao">Não</option>
                </select>
            </div>

            <button class="btn-form" type="submit" @click.prevent="updatePerfil">Salvar</button>

            <router-link to="/">
                <button class="btn-form btn-cancel" type="submit">Cancelar</button>
            </router-link>
        </form>
    </div>
</template>

<script>

import firebase from 'firebase'
import ModalSuccess from '../components/ModalSuccess.vue'

export default {

    components: {
        ModalSuccess
    },

    data() {
        return {
            anuncio: {
                nome: "",
                peso: '',
                sexo: "",
                idade: "",
                castrado: "",
                categoria: "",
                imagem: ''
            },
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
        previewImage(event) {
            this.picture=null;
            this.imageData = event.target.files[0];
            const fileReader = new FileReader()
            
            fileReader.onloadend = () => this.preview = fileReader.result

            fileReader.readAsDataURL(this.imageData)
        },

        async updatePerfil() {
            if(this.imageData) {
                await this.addPhotoAndSaveUrl()

            } else {
                this.updateAnuncio()
            }

        },

        async addPhotoAndSaveUrl() {
            this.picture = null;

            const storageRef = firebase
                                .storage()
                                .ref(`${this.imageData.name}`)
                                .put(this.imageData);
            
            storageRef.on(`state_changed`, snapshot => {}, error => {}, () => {
                    storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                        this.picture = url;
                        this.updateAnuncio()
                    });
                }
            );
        },

        async updateAnuncio() {
            const id = this.$route.params.id
            const anuncio = this.$route.params.anuncio

            const new_image = this.picture ? this.picture : this.anuncio.imagem
            const castramento = this.anuncio.castrado === 'Sim' ? true : false

            firebase.database()
            .ref('/Anuncios/' + anuncio)
            .child(id)
            .update({
               nome: this.anuncio.nome,
               sexo: this.anuncio.sexo,
               imagem: new_image,
               peso: this.anuncio.peso,
               idade: this.anuncio.idade,
               categoria: this.anuncio.categoria,
               castrado: castramento
             })
            .then(() => {
                this.mensagem = 'Anuncio atualizado com sucesso!'
                this.success = true

                setTimeout(() => this.mensagem = '', 1000)
                setTimeout(() => {
                    this.$router.replace({ name: "home" })
                }, 1500);
            })
        }
    },

    mounted() {
        const id = this.$route.params.id
        const anuncio = this.$route.params.anuncio

        firebase.database().ref('/Anuncios/' + anuncio)
        .child(id)
        .once("value", snapshot => {
            this.anuncio.nome = snapshot.val()["nome"]
            this.anuncio.peso = snapshot.val()["peso"]
            this.anuncio.idade = snapshot.val()["idade"]
            this.anuncio.imagem = snapshot.val()["imagem"]
            this.anuncio.sexo = snapshot.val()["sexo"]
            this.anuncio.categoria = snapshot.val()["categoria"]

            this.anuncio.castrado = snapshot.val()["castrado"] ? 'Sim' : 'Nao'
        })
    },

    beforeCreate() {
        const logado = localStorage.getItem('login')
        
        if(!logado) {
            this.$router.replace({ name: "login" });
        }
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

.btn-cancel {
    background-color: tomato;
}

</style>