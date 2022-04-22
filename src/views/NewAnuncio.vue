<template>
    <div class="container">
        <h1 class="titulo titulo-principal">Novo Anuncio</h1>

        <div v-if="mensagem.length">
            <ModalSuccess 
                :mensagem="mensagem" 
                :success="success">
            </ModalSuccess>
        </div>

        <div class="container carrosel-form">
            <div class="seta-esquerda" @click="backForm()">
                <font-awesome-icon icon="angle-left" id="angle-left" size="4x"/>
            </div>

            <div 
                class="seta-direita" 
                @click="nextForm()"
                v-if="idForm === -1 | idForm < 6"
                >
                <font-awesome-icon icon="angle-right" id="angle-right" size="4x"/>
            </div>
        </div>

        <h1 v-if="idForm === -1" class="titulo especie">Qual a espécie do seu pet?</h1>

        <div v-if="idForm === -1" class="animal-category">
            <div @click="addDataForm('type', 'animal', 'Cachorro', 0)">
                <font-awesome-icon icon="dog" id="animal" size="6x"/>

                <p class="animal">Cachorro</p>
            </div>

            <div @click="addDataForm('type', 'animal', 'Gato', 1)">
                <font-awesome-icon icon="cat" id="animal" size="6x"/>

                <p class="animal">Gato</p>
            </div>

            <div @click="addDataForm('type', 'animal', 'Pássaro', 2)">
                <font-awesome-icon icon="kiwi-bird" id="animal" size="6x"/>

                <p class="animal">Pássaro</p>
            </div>
        </div>

        <form class="name-animal form-geral hide-now">
            <h1 class="titulo">Oba! Mais um {{anuncio.type}} chegando na nossa matilha!</h1>

            <p>Qual o nome do seu bichinho?</p>

            <div class="input-form">
                <label for="name">Nome</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Nome do pet" 
                    v-model="anuncio.nome" 
                    min="3"
                    required
                >
            </div>
        </form>

        <form class="sexo-animal form-geral hide-now">
            <h1 class="titulo">Estamos curiosos para conhecer mais sobre o pet!</h1>

            <p>{{anuncio.nome}} é macho ou fêmea?</p>

            <div>
                <div @click="sexoAnimal('Macho', 0)">
                    <font-awesome-icon icon="mars" id="sexo" size="6x"/>

                    <p class="sexo-name">Macho</p>
                </div>

                <div @click="sexoAnimal('Femea', 1)">
                    <font-awesome-icon icon="venus" id="sexo" size="6x"/>

                    <p class="sexo-name">Fêmea</p>
                </div>
            </div>
        </form>

        <form class="name-animal form-geral hide-now">
            <h1 class="titulo">Oba! Que legaal :)</h1>

            <p>Você quer anunciar por que?</p>

            <select v-model="anuncio.categoria">
                <option disabled value="">Categoria</option>
                <option value="Adocao">Para adoção</option>
                <option value="Perdido">Ela esta perdida</option>
            </select>
        </form>

        <form class="castrado-animal form-geral hide-now">
            <h1 v-if="anuncio.categoria === 'Perdido'" class="titulo">
                Iremos encontrar o(a) {{anuncio.nome}} juntos!
            </h1>
            <h1 v-else class="titulo">
                Que bacana! Vamos encontrar um dono para o(a) {{anuncio.nome}}
            </h1>
            
            <p>{{anuncio.nome}} é castrado(a)?</p>

            <div>
                <div @click="addDataForm('castrado', 'castrado', 'true', 0)">
                    <font-awesome-icon icon="thumbs-up" id="castrado" size="6x"/>

                    <p class="castrado">Sim</p>
                </div>

                <div @click="addDataForm('castrado', 'castrado', 'false', 1)">
                    <font-awesome-icon icon="thumbs-down" id="castrado" size="6x"/>

                    <p class="castrado">Não</p>
                </div>
            </div>
        </form>

        <form class="idade-animal form-geral hide-now">
            <h1 class="titulo">Que fofo! :)</h1>

            <p>Qual a idade do(a) {{anuncio.nome}}?</p>

            <select v-model="idadeSelected">
                <option disabled value="">Idade</option>
                <option 
                    v-for="ano in listAno" 
                    :key="ano" 
                    :value="ano"
                    >
                    {{ano}}
                </option>
            </select>

            <select v-model="tempo">
                <option disabled value="">Tempo</option>
                <option value="Anos">Anos</option>
                <option v-if="idadeSelected < 13" value="Meses">Meses</option>
            </select>
        </form>

        <form class="peso-animal form-geral hide-now">
            <h1 v-if="tempo === 'Meses'" class="titulo">
                É novinho(a) ainda, que lindo(a)!
            </h1>
            <h1 v-else class="titulo">
                Já é adulto(a), que bacana!
            </h1>

            <p>Qual o peso do(a) {{anuncio.nome}}?</p>

            <div class="input-form">
                <label for="peso">Peso (Kg)</label>
                <input 
                    type="number" 
                    id="peso" 
                    name="peso" 
                    placeholder="Peso (KG)" 
                    v-model="anuncio.peso" 
                    min="1"
                    required
                >
            </div>
        </form>

        <form class="image-animal form-geral hide-now" @submit.prevent="createAnuncio">
            <h1 class="titulo">Ele deve ser lindo :)</h1>

            <p>Gostaria de mostrar ele pro mundo?</p>

            <img 
                id="img_preview"
                v-if="preview" 
                :src="preview"
            >

            <input 
                required
                type="file"
                accept="image/*" 
                @change="previewImage"
            >        

            <button class="btn-form" id="save-anuncio" :disabled="disabled" type="submit">Salvar</button>

            <router-link to="/">
                <button class="btn-form btn-cancel" type="submit">Cancelar</button>
            </router-link>
        </form>

        <div class="container setas-mobile">
            <div @click="backForm()">
                <font-awesome-icon icon="angle-left" size="4x"/>
                <span>Voltar</span>
            </div>

            <div v-if="idForm === -1 | idForm < 6" @click="nextForm()">
                <span>Próximo</span>
                <font-awesome-icon icon="angle-right" size="4x"/>
            </div>
        </div>
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
                castrado: "",
                categoria: "",
                imagem: '',
                type: '',
            },
            idForm: -1,
            idadeSelected: '',
            tempo: '',
            listAno: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            imageData: null,
            picture: null,
            preview: null,
            success: true,
            mensagem: "",
            dataUser: "",
            disabled: false
        }
    },

    methods: {
        backForm() {
            this.idForm -= 1
            this.showForm()
        },

        nextForm() {
            this.idForm += 1
            this.showForm()
        },

        addDataForm(key, css, value, id) {
            this.effectSelectDiv(`#${css}`, `.${css}`, id)
            this.anuncio[key] = value
        },

        sexoAnimal(sexoSelected, id) {
            this.effectSelectDiv('#sexo', '.sexo-name', id)
            this.anuncio.sexo = sexoSelected
        },

        effectSelectDiv(iconAddBorder, classParagraph, idSelected) {
            const icon = document.querySelectorAll(iconAddBorder)
            const paragraph = document.querySelectorAll(classParagraph)

            icon.forEach(element => element.style.border = 'none')
            paragraph.forEach(element => element.style.color = '#000')

            icon[idSelected].style.border = '2px solid #36C9D2'
            paragraph[idSelected].style.color = '#36C9D2'
        },

        showForm() {
            const allForms = document.querySelectorAll('.form-geral')

            // para desaparecer um form o id tem que ser no max 0, nao pode ser -1
            if(this.idForm !== -1) {
                allForms.forEach(element => {
                    if(!element.classList.contains('hide-now')) {
                        element.classList.add('hide-now')
                    }
                })

                allForms[this.idForm].classList.remove('hide-now')

            } else {
                allForms[0].classList.add('hide-now')
            }
        },

        previewImage(event) {
            this.picture = null;
            this.imageData = event.target.files[0];
            const fileReader = new FileReader()
            fileReader.onloadend = () => this.preview = fileReader.result
            fileReader.readAsDataURL(this.imageData)
        },

        async createAnuncio() {
            this.disabled = true;
            await this.addPhotoAndSaveUrl()
        },

        async addPhotoAndSaveUrl() {
            const storageRef = firebase.storage().ref(`${this.imageData.name}`).put(this.imageData)
            storageRef.on(`state_changed`, () => {
                storageRef.snapshot.ref.getDownloadURL()
                .then((url) => {
                    this.anuncio.imagem = url;
                    this.create()
                })
            })
        },

        async create() {
            var id = "id" + Math.random().toString(16).slice(2)

            firebase.database()
            .ref('/Anuncios/')
            .child(this.anuncio.categoria)
            .update({
                [id]: {
                    ...this.anuncio,
                    cidade: this.dataUser.city,
                    id: id,
                    idade: `${this.idadeSelected.toString()} ${this.tempo}`,
                    local: this.dataUser.district,
                    logo_ong: this.dataUser.image,
                    pausado: false,
                    telefone: this.dataUser.whatsapp, 
                    username: this.$store.state.user.data.displayName,
                }
            })
            .then(() => {
                this.mensagem = 'Anuncio inserido!'
                this.success = true

                setTimeout(() => this.mensagem = '', 2000)
                setTimeout(() => this.$router.replace(
                    { name: "home" }
                ), 2000);
            })
        }
    },

    beforeCreate() {
        const userName = this.$store.state.user.data.displayName
        document.title = "Novo anúncio"
        
        firebase.database()
        .ref(userName)
        .once("value", snapshot => this.dataUser = snapshot.val())
    }
}
</script>

<style scoped>

.especie {
    color: #000;
}

.input-form {
    max-width: 300px;
    margin: 0 auto;
    display: block;
    font-size: 18px !important;
    margin-top: 30px;
}

.input-form input {
    width: 280px;
    padding: 20px;
    margin-top: 10px;
    text-align: initial !important;
    font-size: 18px;
}

.input-form input:focus {
    outline: none !important;
    border: none;
    box-shadow: 0 0 10px #36C9D2;
}

.hide-now {
    display: none;
}

.carrosel-form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}

#angle-left, #angle-right {
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.25);
    padding: 10px 15px;
    border-radius: 10px;
    color: #36C9D2;
    cursor: pointer;
    position: absolute;
    margin-top: 15%;
}

#angle-left {
    left: 30px;
}

#angle-right {
    right: 30px;
}

.animal-category {
    display: flex;
    justify-content: center;
    margin-top: 60px;
    text-align: center;
    font-size: 18px;
}

.animal-category div {
    cursor: pointer;
}

.animal-category div p {
    margin-top: 20px;
}

.animal-category div #animal {
    margin: 0 30px;
    padding: 20px;
    color: #36C9D2;
    border-radius: 10px;
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.25);
}

.titulo {
    padding: 0 30px;
    margin: 60px auto 0;
    max-width: 470px;
}

.form-geral {
    padding: 0 30px;
    margin-bottom: 60px;
}

/* FORM NAME */
.form-geral p {
    font-size: 24px;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 40px;
    color: #000;
}

.form-geral h1 {
    color: #000;
}

.form-geral select {
    width: 50%;
    padding: 15px;
    color: #36C9D2;
    font-size: 24px;
    text-align: initial !important;
}

/* FORM SEXO */
.sexo-animal > div {
    display: flex;
    justify-content: center;
    margin-top: 60px;
    cursor: pointer;
}

.sexo-animal > div div #sexo {
    margin: 0 30px;
    padding: 20px;
    width: 150px;
    color: #36C9D2;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.25);
}

/* FORM CASTRADO */
.castrado-animal > div {
    display: flex;
    justify-content: center;
    margin-top: 60px;
    cursor: pointer;
}

.castrado-animal > div div #castrado {
    margin: 0 30px;
    padding: 20px;
    width: 150px;
    color: #36C9D2;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.25);
}

input {
    display: block;
    text-align: center;
    margin: 0 auto;
}

select {
    display: block;
    text-align: center;
    margin: 0 auto;
}

/* FORM IDADE */
.idade-animal select{
    margin-bottom: 30px;
}

/* FORM IMAGE ANIMAL */
#img_preview {
    max-width: 400px;
    display: block;
    margin: 0 auto 40px;
    border-radius: 10px;
}

.image-animal {
    margin: 60px 0;
}

.btn-cancel {
    background-color: red;
}

.setas-mobile {
    display: none;
}

@media (max-width: 825px) {
    .carrosel-form {
        display: flex;
        justify-content: space-between;
        align-items: center;
        display: none;
    }

    .titulo {
        font-size: 2rem;
    }

    .setas-mobile {
        margin: 60px 0 40px;
        padding: 10px 30px;
        display: flex;
        justify-content: space-between;
        box-shadow: 0 0 7px 0 rgb(0 0 0 / 35%);
    }

    .setas-mobile div {
        display: flex;
        align-items: center;
        color: #36C9D2;
        cursor: pointer;
    }
    
}

@media (max-width: 670px) {
    .animal-category div {
        margin-bottom: 40px;
    }

    .sexo-animal > div div #sexo {
        display: block;
        text-align: center;
        width: 45%;
    }

    .animal-category div #animal {
        font-size: 40px;
        margin: 0 15px;
    }

    .castrado-animal > div div #castrado {
        display: block;
        margin: 0 auto 40px;
        text-align: center;
        width: 45%;
    }

    .input-form input {
        max-width: 90%;
        width: 100% !important;
    }
}

</style>