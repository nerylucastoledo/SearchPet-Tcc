<template>
    <div class="login-form">
        <h1 class="titulo">Anuncio</h1>

        <div v-if="mensagem.length">
            <ModalSuccess 
                :mensagem="mensagem" 
                :success="success">
            </ModalSuccess>
        </div>

        <form class="login">
            <img 
                id="img_preview"
                v-if="preview" 
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
                <select v-model="anuncio.categoria" class="filter-selected">
                    <option disabled value="">Categoria</option>

                    <option value="Adocao">Adoção</option>

                    <option value="Perdido">Perdido</option>
                </select>

                <select v-model="anuncio.castrado" class="filter-selected">
                    <option disabled value="">Castrado</option>

                    <option value="Sim">Sim</option>

                    <option value="Nao">Não</option>
                </select>
            </div>

            <button class="btn-form" type="submit" @click.prevent="createAnuncio">Salvar</button>

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
            dataUser: ""
        }
    },
    watch: {
        preview() {
            return this.preview
        }
    },

    methods: {
        previewImage(event) {
            this.picture = null;
            this.imageData = event.target.files[0];
            const fileReader = new FileReader()

            fileReader.onloadend = () => this.preview = fileReader.result

            fileReader.readAsDataURL(this.imageData)
        },

        async createAnuncio() {
            if(this.imageData) {
                await this.addPhotoAndSaveUrl()

            } else {
                this.create()
            }

        },

        async addPhotoAndSaveUrl() {
            this.picture = null;

            const storageRef = firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
            
            storageRef.on(`state_changed`, snapshot => {}, error => {}, () => {
                    storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                        this.picture = url;
                        this.create()
                    });
                }
            );
        },

        async create() {
            var id = "id" + Math.random().toString(16).slice(2)
            firebase.database()
            .ref('/Anuncios/')
            .child(this.anuncio.categoria)
            .update({
                [id]: {
                    castrado: this.anuncio.categoria,
                    categoria: this.anuncio.categoria,
                    cidade: this.dataUser.city,
                    id: id,
                    idade: this.anuncio.idade,
                    imagem: this.picture,
                    local: this.dataUser.district,
                    nome: this.anuncio.nome,
                    pausado: false,
                    peso: this.anuncio.peso,
                    sexo: this.anuncio.sexo,
                    telefone: this.dataUser.whatsapp, 
                    username: this.$store.state.user.data.displayName,
                }
            })
            .then(() => {
                this.mensagem = 'Anuncio inserido!'
                this.success = true

                setTimeout(() => this.mensagem = '', 1000)
                setTimeout(() => {
                    this.$router.replace({ name: "home" })
                }, 1500);
            })
        }
    },

    beforeCreate() {
        const logado = localStorage.getItem('login')
        const userName = this.$store.state.user.data.displayName
        
        firebase.database()
        .ref(userName)
        .once("value", snapshot => this.dataUser = snapshot.val())
        
        if(!logado) {
            this.$router.replace({ name: "login" })
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