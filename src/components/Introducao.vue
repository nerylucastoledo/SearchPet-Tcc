<template>
    <div class="introducao">
        <div class="container">
            <div class="box-texto">
                <h2>Adote um amiguinho, não compre</h2>
                <p>Adote, porque o amor não tem preço e nem raça.</p>
            </div>
        </div>
    </div>
</template>

<style scoped>

.introducao {
    background-image: url(../assets/inicio.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    padding: 120px 0;
}

.box-texto {
    max-width: 50%;
}

.introducao h2 {
    font-size: 2em;
    text-align: center;
    color: #fff;
    font-weight: bold;
    font-family: 'Montserrat',sans-serif;
    margin-bottom: 60px;
}

.introducao p {
    color: #fff;
    font-size: 1.125em;
    text-align: center;
    width: 250px;
    display: block;
    margin: 0 auto;
}

.introducao p::after, .introducao p::before {
    content: "";
    width: 80px;
    height: 3px;
    display: block;
    background-color: #fff;
    margin: 10px auto;
}

@media (max-width: 739px) {

    .introducao {
        padding: 20px 0;
    }

    .introducao h2 {
        margin-bottom: 40px;
    }
    
    .introducao p {
        color: #fff;
        font-size: 1.125em;
        text-align: center;
        width: 250px;
        display: block;
        margin: 0 auto;
    }

}

</style>