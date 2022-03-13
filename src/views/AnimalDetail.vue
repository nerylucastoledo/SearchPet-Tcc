<template>
    <div class="container">
        <h1 class="titulo">{{anuncio.nome}}</h1>

        <div>
            <div class="detail-animal">
                <img 
                    id="foto-animal"
                    v-if="anuncio.imagem" 
                    :src="anuncio.imagem" 
                    alt="Imagem de um animal"
                >

                <div>
                    <div>
                        <h2>Idade</h2>

                        <span>{{anuncio.idade}}</span>
                    </div>

                    <div>
                        <h2>Sexo</h2>

                        <span>{{anuncio.sexo}}</span>
                    </div>
                </div>

                <div>
                    <div>
                        <h2>Peso</h2>

                        <span>{{anuncio.peso}}</span>
                    </div>

                    <div>
                        <h2>Castrado</h2>

                        <span v-if="anuncio.castrado === false">Não castrado</span>
                        <span v-else>Castrado</span>
                    </div>
                </div>
            </div>
        </div>

        <h2 class="titulo">Você pode me adotar 🐶</h2>

        <div class="local-animal">
            <div>
                <p>
                    Meu dono: 
                    <strong>{{dono.nameOng}}</strong>
                </p>

                <p>
                    Telefone: 
                    <strong>{{dono.whatsapp}}</strong>
                </p>
            </div>

            <div>
                <p>
                    Endereço: 
                    <strong>{{dono.street}}</strong>
                </p>

                <p>
                    Bairro 
                    <strong>{{dono.district}}</strong>
                </p>
            </div>
        </div>

        <a target= "_blank" :href="whatsapp">
            <button class="button-whatsapp">
                <span>Me chame</span>

                <img src="../assets/whatsapp.png" alt="Loggo do Whatsapp">
            </button>
        </a>

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
            whatsapp: ''
        }
    },

    watch: {
        anuncio() {
            return this.anuncio
        }
    },

    methods: {
        getDono() {
            const userName = this.$store.state.user.data.displayName

            firebase.database()
            .ref(userName)
            .once("value", snapshot => {
                this.dono = snapshot.val()

                this.whatsapp = `https://api.whatsapp.com/send?phone=55${this.dono.whatsapp}&amp;text=Entrei%20pelo%20site.%20Esta%20podendo%20falar%20agora?%20`
            })
        }
    },

    mounted() {
        const id = this.$route.params.id
        const anuncio = this.$route.params.anuncio

        firebase.database().ref('/Anuncios/' + anuncio)
        .child(id)
        .once("value", snapshot => {
            this.anuncio = snapshot.val()

            this.getDono()
        })
    },

    beforeCreate() {
        const logado = sessionStorage.getItem('login')
        
        if(!logado) {
            this.$router.replace({ name: "login" });
        }
    }
    
}
</script>

<style scoped>

.container {
    padding: 0 20px;
}

#foto-animal {
    border-radius: 10px;
    width: 500px;
    height: 350px;
    object-fit: cover;
}

.detail-animal {
    display: flex;
    justify-content: space-between;
    margin-top: 60px;
    text-align: center;
}

.detail-animal div div {
    background-color: #fff;
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.25);
    margin-bottom: 60px;
    padding: 30px 30px;
    width: 150px;
    border-radius: 10px;
}

.detail-animal span {
    font-weight: bold;
    font-size: 18px;
}

.detail-animal h2 {
    color: #36C9D2;
    font-weight: bold;
    margin-bottom: 20px;
}

.local-animal {
    background-color: #fff;
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.25);
    align-items: center;
    justify-content: space-around;
    padding: 30px 0 0;
    font-size: 24px;
    margin-top: 40px;
    text-align: center;
}

.local-animal p{
    margin-bottom: 30px;
    width: 100%;
    max-width: 100%;
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

</style>