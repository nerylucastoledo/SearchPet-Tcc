<template>

    <div>
        <h1 class="titulo">Resetar Senha</h1>

        <form class="login">
            <div>
                <label for="email">seu e-mail</label>
                <input type="email" id="email" name="email" placeholder="e-mail" v-model="form.email">
                <span>
                    <img v-if="form.email.length < 32" src="../assets/email.png" alt="">
                </span>
            </div>

            <button class="btn-form" type="submit">Recuperar</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                email: "",
            },
        }
    },
}
</script>

<style scoped>

.login div {
    width: 300px;
    display: block;
    margin: 0 auto;
}

.login label {
    font-weight: bold;
    display: block;
    margin-bottom: 10px;
}

.login div span {
    left: 250px;
    top: 40px;
}

</style>