<template>
    <div class="container">
        <h1 class="titulo">Scooby</h1>

        <div>
            <div class="detail-animal">
                <img id="foto-animal" src="../assets/cachorro.png" alt="">

                <div>
                    <div>
                        <h2>Idade</h2>

                        <span>7 Anos</span>
                    </div>

                    <div>
                        <h2>Sexo</h2>

                        <span>Fêmea</span>
                    </div>
                </div>

                <div>
                    <div>
                        <h2>Peso</h2>

                        <span>3 Kg</span>
                    </div>

                    <div>
                        <h2>Castrado</h2>

                        <span>SIm</span>
                    </div>
                </div>
            </div>
        </div>

        <h2 class="titulo">Você pode me adotar 🐶</h2>

        <div class="local-animal">
            <div>
                <p>Minha ONG: <strong>Ong São Franscisco de Assis</strong></p>

                <p>Telefone: <strong>(35) 9 9742-0423</strong></p>
            </div>

            <div>
                <p>Endereço: <strong>Rua José Ferreira da Costa</strong></p>

                <p>Bairro <strong>Santo Ivo</strong></p>
            </div>
        </div>

        <button class="button-whatsapp">
            <span>Me chame</span>
            <img src="../assets/whatsapp.png" alt="Loggo do Whatsapp">
        </button>

        <PorqueAdotar/>
    </div>
</template>

<script>

import PorqueAdotar from '../components/PorqueAdotar.vue'

export default {

    components: {
        PorqueAdotar,
    },
    
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