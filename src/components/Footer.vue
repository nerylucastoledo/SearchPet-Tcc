<template>
    <footer>
        <div>
            <img src="../assets/linkedin.png" alt="Logo Linkedin" loading="lazy">
            <img src="../assets/facebook.png" alt="Logo facebook" loading="lazy">
            <img src="../assets/instagram.png" alt="Logo Instagram" loading="lazy">
        </div>
        <p class="copyrigth">© 2022 - Nome da empresa</p>
    </footer>
</template>

<script>
export default {
    
}
</script>

<style>

footer {
    text-align: center;
    padding: 30px 0;
    background-color: #36C9D2;
    height: 90px;
    font-size: 18px;
}

footer div img{
    margin: 0 25px;
    width: 40px;
    height: 40px;
}

.copyrigth {
    margin-top: 30px;
    color: #EEE6E6;
}

</style>