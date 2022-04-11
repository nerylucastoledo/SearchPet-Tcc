<template>
    <div class="container infos-vacinas">
        <h1 class="titulo">Dúvidas sobre vacinas</h1>
        
        <h2 class="subtitulo">
            Aqui você vai aprender um pouco mais sobre as vacinas que os nossos amiguinhos devem tomar desde quando ainda são "crianças" até quando viram "adultos".
        </h2>

        <h1 class="titulo">Caẽs Filhotes (V8 e V10)</h1>

        <div class="caes-adultos">
            <img src="../assets/cao_adulto.png" alt="Imagem cachorro">

            <div>
                <ul>
                    <li @click="mostrarDados(0)" id="title-info-vacina">Cinomose</li>
                    <li @click="mostrarDados(1)" id="title-info-vacina">Parvovirose</li>
                    <li @click="mostrarDados(2)" id="title-info-vacina">Hepatite Canina</li>
                    <li @click="mostrarDados(3)" id="title-info-vacina">Adenovirose</li>
                    <li @click="mostrarDados(4)" id="title-info-vacina">Coronavirose</li>
                </ul>
            </div>

            <div class="info-vacina">
                <p id="text-info-vacina">É uma virose que ataca cães, afetando órgãos respiratórios, com febre e secreções purulentas, e também o sistema nervoso. É uma doença de grande letalidade.</p>
                <p id="text-info-vacina">É uma virose que infecta cães, afeta o trato digestório e causa diarreia, febre e imunossupressão. Também é uma doença de alta letalidade.</p>
                <p id="text-info-vacina">É uma virose que ataca o fígado dos cães, causando febre e diarreia sanguinolenta. Em casos mais graves, pode afetar o Sistema Nervoso e causar a morte.</p>
                <p id="text-info-vacina">É uma virose que causa sinais respiratórios graves nos cães, como tosse seca e constante, espirros, febre, secreções, etc. Se não for tratada, pode evoluir para pneumonia e levar a morte do animal.</p>
                <p id="text-info-vacina">É uma virose que causa problemas no trato digestório do animal, provocando sinais semelhantes aos da Parvovirose.</p>
            </div>
        </div>

        <h1 class="titulo">Caẽs Filhotes</h1>

        <div class="caes-adultos">
            <img src="../assets/cao_filhote.png" alt="Imagem cachorro">

            <div>
                <ul>
                    <li @click="mostrarDados(5)" id="title-info-vacina">Parainfluenza</li>
                    <li @click="mostrarDados(6)" id="title-info-vacina">Leptospirose</li>
                    <li @click="mostrarDados(7)" id="title-info-vacina">Raiva</li>
                </ul>
            </div>

            <div class="info-vacina">
                <p id="text-info-vacina">É uma virose que causa sinais respiratórios como tosse, secreções e febre.</p>
                <p id="text-info-vacina">É uma virose zoonótica (ou seja, pode ser transmitida para humanos), que causa desânimo, vômitos e hemorragias. O contágio ocorre pela urina de ratos e pode levar ao óbito do animal.</p>
                <p id="text-info-vacina">É uma virose zoonótica transmitida através da saliva de animais contaminados. A partir daí o vírus se instala no Sistema Nervoso e causa desorientação e agressividade.</p>
            </div>
        </div>

        <h1 class="titulo">Gatos Filhotes</h1>

        <div class="caes-adultos">
            <img src="../assets/gato_adulto.png" alt="Imagem cachorro">

            <div>
                <ul>
                    <li @click="mostrarDados(8)" id="title-info-vacina">Panleucopenia</li>
                    <li @click="mostrarDados(9)" id="title-info-vacina">Calicivirose (CVF)</li>
                    <li @click="mostrarDados(10)" id="title-info-vacina">Rinotraqueíte</li>
                    <li @click="mostrarDados(11)" id="title-info-vacina">Clamidiose</li>
                </ul>
            </div>

            <div class="info-vacina">
                <p id="text-info-vacina">É uma virose comparada à Cinomose canina por provocar sintomas no trato digestivo, respiratório e no sistema nervoso central.</p>
                <p id="text-info-vacina">É uma virose que atinge diretamente o sistema respiratório de gatos, sendo altamente contagiosa através da secreção liberada por animais contaminados.</p>
                <p id="text-info-vacina">Também é uma virose que atinge diretamente o sistema respiratório de gatos, causando descargas nasais e oculares.</p>
                <p id="text-info-vacina">É uma doença bacteriana que afeta os olhos dos animais, causando conjuntivite e rinite.</p>
            </div>
        </div>

        <h1 class="titulo">Gatos Adultos</h1>

        <div class="caes-adultos">
            <img src="../assets/gato_filhote.png" alt="Imagem cachorro">

            <div>
                <ul>
                    <li @click="mostrarDados(12)" id="title-info-vacina">Todas as anteriores</li>
                    <li @click="mostrarDados(13)" id="title-info-vacina">Leucemia Felina (FeLV)</li>
                    <li @click="mostrarDados(14)" id="title-info-vacina">Antirrábica</li>
                </ul>
            </div>

            <div class="info-vacina">
                <p id="text-info-vacina">O gato quando adulto já deve estar com todas as vacinas anteriores tomadas.</p>
                <p id="text-info-vacina">É uma grave doença viral comparada à Leucemia humana. Provoca imunossupressão no animal, tornando-o susceptível a outras doenças</p>
                <p id="text-info-vacina">Idem à Raiva Canina</p>
            </div>
        </div>
    </div>
</template>

<script>

export default {

    data() {
        return {
            click_anterior: null,
            title_info: null
        }
    },

    methods: {
        mostrarDados(number) {
            const title = document.querySelectorAll('#title-info-vacina')
            const text_info = document.querySelectorAll('#text-info-vacina')

            if(this.click_anterior != null) {
                text_info[this.click_anterior].style.display = 'none'
                title[this.click_anterior].style.color = "#fff"
            }

            text_info[number].style.display = 'block'
            title[number].style.color = "#000"

            this.click_anterior = number
        },
    },

    beforeCreate() {
        const logado = localStorage.getItem('login')
        
        if(!logado) {
            this.$router.replace({ name: "login" });
        }
    },

    mounted() {
        this.mostrarDados(0)
    }
}
</script>

<style scoped>

.infos-vacinas {
    margin-bottom: 60px;
}

.subtitulo {
    color: #000;
}

.caes-adultos {
    margin-top: 60px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.caes-adultos img {
    border-radius: 10px;
    width: 400px;
}

.caes-adultos li {
    background-color: #36C9D2;
    padding: 20px 10px;
    text-align: center;
    color: #fff;
    max-width: 600px;
    margin: 0 auto;
    border-radius: 10px;
    margin-bottom: 15px;
    cursor: pointer;
}

.caes-adultos p {
    max-width: 500px;
    text-align: center;
    color: #222;
    font-weight: bold;
    font-size: 18px;
}

.info-vacina {
    background-color: #F6F3F3;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    padding: 90px 20px;
    border-radius: 10px;
    min-width: 500px;
}

#text-info-vacina {
    display: none;
}

</style>