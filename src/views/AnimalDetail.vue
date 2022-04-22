<template>
    <div class="container" v-if="anuncio">
        <h1 class="titulo">{{anuncio.nome}}</h1>

        <div class="perfil-animal">
            <div class="image-animal">
                <img 
                    v-if="anuncio.imagem" 
                    :src="anuncio.imagem" 
                    :class="{ finalizado: anuncio.pausado }"
                    alt="Imagem de um animal"
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

            </div>

            <div v-if="!anuncio.pausado" class="info-animal">
                <div>
                    <div class="box-info">
                        <div>
                            <h2>Idade</h2>

                            <img src="../assets/idade.png" alt="Calendario">
                        </div>

                        <span>{{anuncio.idade}}</span>
                    </div>

                    <div class="box-info">
                        <div>
                            <h2>Sexo</h2>

                            <img src="../assets/sexo.png" alt="Logo Sexo">
                        </div>

                        <p :class="[anuncio.sexo === 'Macho' ? 'macho' : 'femea']">
                            {{anuncio.sexo}}
                        </p>
                    </div>
                </div>

                <div>
                    <div class="box-info">
                        <div>
                            <h2>Peso</h2>

                            <img src="../assets/peso.png" alt="Logo peso">
                        </div>

                        <span>{{anuncio.peso}}</span>
                    </div>

                    <div class="box-info">
                        <div>
                            <h2>Castrado</h2>

                            <img src="../assets/castrado.png" alt="Logo pata">
                        </div>

                        <span v-if="anuncio.castrado === false">Não castrado</span>
                        <span v-else>Castrado</span>
                    </div>
                </div>
            </div>


            <div class="info-animal" v-else>
                <div>
                    <h1 class="titulo titulo-adotado">Quem {{categoria}}</h1>

                    <div class="box-info anuncio-pausado">
                        <p>{{anuncio.nome_finalizado}}</p>
                    </div>
                    <div class="box-info anuncio-pausado">
                        <p>{{formatarData(anuncio.data_finalizado)}}</p>
                    </div>
                    <div class="box-info anuncio-pausado">
                        <p>{{anuncio.cidade_finalizado}}</p>
                    </div>
                    <div class="box-info anuncio-pausado contato-finalizado">
                        <a target= "_blank" :href="`https://api.whatsapp.com/send?phone=55${anuncio.contato_finalizado}&amp;text=Gostaria%20de%20falar%20sobre%20o(a)%20${anuncio.nome}.`">
                            <span>{{anuncio.contato_finalizado}}</span>
                            <img src="../assets/whatsapp.png" alt="Logo do Whatsapp">
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="!anuncio.pausado">
            <div>
                <h2 class="titulo">Entre em contato 🐶</h2>

                <div class="info-contato">
                    <div>
                        <p>
                            Minha ONG:
                            <strong style="color: #36C9D2">{{dono.nameOng}}</strong>
                        </p>

                        <p>
                            Ligue para:
                            <strong style="color: #36C9D2">{{dono.whatsapp}}</strong>
                        </p>
                    </div>

                    <div>
                        <p>
                            Cidade: 
                            <strong style="color: #36C9D2">{{anuncio.cidade}}</strong>
                        </p>

                        <p>
                            Bairro: 
                            <strong style="color: #36C9D2">{{anuncio.local}}</strong>
                        </p>
                    </div>
                </div>
            </div>

            <a target = "_blank" :href="whatsapp">
                <button class="button-whatsapp">
                    <span>Me chame</span>

                    <img src="../assets/whatsapp.png" alt="Logo do Whatsapp">
                </button>
            </a>
        </div>

        <PorqueAdotar/>
    </div>
</template>

<script>

import PorqueAdotar from '../components/PorqueAdotar.vue'
import firebase from 'firebase'

export default {

    components: {
        PorqueAdotar,
    },

    data() {
        return {
            anuncio: '',
            dono: '',
            whatsapp: '',
            categoria: ''
        }
    },

    watch: {
        anuncio() {
            return this.anuncio
        }
    },

    methods: {
        pegarNumeroDono() {
            const userName = this.$store.state.user.data.displayName

            firebase.database()
            .ref(userName)
            .once("value", snapshot => {
                this.dono = snapshot.val()
                var numero = this.formatarNumero(this.dono.whatsapp)
                this.whatsapp = `https://api.whatsapp.com/send?phone=55${numero}`
            })
        },

        formatarNumero(numero) {
            var numeroFormatado = numero.replace("(", "")
                                        .replace(")", "")
                                        .replace("-", "")
                                        .replaceAll(" ", "")

            return numeroFormatado
        },

        formatarData(data) {
            var dataSeparada = data.split("-")
            return `${dataSeparada[2]}/${dataSeparada[1]}/${dataSeparada[0]}`
        }
    },

    mounted() {
        const id = this.$route.params.id
        const anuncio = this.$route.params.anuncio

        firebase.database().ref('/Anuncios/' + anuncio)
        .child(id)
        .once("value", snapshot => {
            this.anuncio = snapshot.val()
            document.title = `Detalhe - ${snapshot.val()["Nome"]}`
            this.categoria = this.anuncio.categoria === "Perdido" ? "achou" : "adotou"
            this.pegarNumeroDono()
        })
    },
}
</script>

<style scoped>

.container {
    padding: 0 30px;
}

.perfil-animal {
    margin-top: 60px;
}

.perfil-animal img {
    border-radius: 10px;
    width: 50%;
    max-height: 400px;
    object-fit: cover;
}

.perfil-animal {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.perfil-animal > .info-animal {
    display: flex;
    justify-content: space-between;
}

.image-animal {
    position: relative;
}

.image-animal img{
    width: 666px;
    object-fit: cover;
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

.info-animal > div {
    width: 100%;
    margin-left: 30px;
}

.info-animal > div > div {
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.25);
    margin-bottom: 30px;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
}

.titulo-adotado {
    margin-top: 0px;
    margin-bottom: 20px;
}

.box-info img {
    width: 30px;
    height: 30px;
    position: absolute;
    left: 0px;
    top: 0px;
}

.box-info p, .box-info span {
    font-weight: bold;
}

.box-info h2 {
    font-weight: normal;
}

.box-info > div {
    position: relative;
    justify-content: center;
}

.box-info h2 {
    margin-bottom: 20px;
}

.info-contato {
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.25);
    padding: 10px 20px 40px;
    border-radius: 10px;
    display: flex;
    justify-content: space-around;
    font-size: 24px;
    margin-top: 30px;
}

.info-contato div p {
    margin-top: 30px !important;
}

.anuncio-pausado {
    background-color: #36C9D2;
    color: #fff;
    font-size: 18px;
}

.anuncio-pausado img {
    position: unset !important;
}

.contato-finalizado a {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
}

.contato-finalizado img {
    margin-left: 10px;
}

.button-whatsapp {
    background-color: #25D366;
    display: block;
    margin: 60px auto 0px auto;
    border: none;
    border-radius: 10px;
    width: 320px;
    padding: 10px 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 24px;
}

.button-whatsapp span{
    margin-right: 20px;
}

.button-whatsapp:hover {
    transform: scale(1.1);
    transition: .3s;
}

@media (max-width: 1245px) {
    .perfil-animal > .info-animal {
        display: block;
        width: 95%;
    }

    .info-animal > div > div {
        width: 80%;
    }

    .anuncio-pausado {
        width: 85% !important;
    }
}

@media (max-width: 994px) {
    .perfil-animal {
        display: block;
    }

    .image-animal img {
        width: 80%;
        display: block;
        margin: 0 auto 30px;
        object-fit: cover;
    }

    .info-animal > div {
        margin-left: 0px;
    }

    .info-animal > div > div {
        width: 85%;
    }

    .anuncio-pausado {
        display: block;
        margin: 0 auto;
    }

    .perfil-animal > .info-animal {
        display: flex;
        width: 100%;
    }

    .info-contato {
        display: block;
        text-align: center;
    }
}

@media (max-width: 660px) {
    .image-animal img {
        width: 100%;
    }

    .perfil-animal > .info-animal {
        display: block;
        width: 100%;
    }

    .info-animal > div > div {
        width: unset;
    }

    .info-contato {
        text-align: initial;
    }

    .button-whatsapp {
        width: 100%;
    }
}

</style>