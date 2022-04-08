<template>
    <div class="porque-adotar">
            <h1 class="titulo">Porque Adotar?</h1>

            <div>
                <div>
                    <img src="../assets/cahcorro_adocao.png" alt="Logo Dog">

                    <p>
                        Você estará ajudando a reduzir a quantidade de animais abadonados da rua que já passaram por muito sofrimento e que só querem ser feliz.
                    </p>
                </div>

                <div>
                    <img src="../assets/cahcorro_adocao_2.png" alt="Logo Dog">

                    <p>
                        Não existe coisa melhor do que vê-los felizes e saudáveis após receber muito amor e carinho. Então a pergunta é:  Se pode ajudar, porquê não ajudar?
                    </p>
                </div>
            </div>
        </div>
</template>

<style scoped>

.porque-adotar {
    margin-bottom: 60px;
}

.porque-adotar h1 {
    margin-bottom: 60px;
}

.porque-adotar div {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
}

.porque-adotar div img {
    height: 150px;
}

.porque-adotar div p {
    max-width: 300px;
    margin-left: 20px;
}

@media (max-width: 523px) {
    .porque-adotar {
        margin-bottom: 30px;
    }

    .porque-adotar div div {
        margin-bottom: 30px;
    }
}

</style>