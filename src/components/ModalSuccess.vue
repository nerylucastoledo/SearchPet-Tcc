<template>
    <div>
        <div v-if="success" class="modalSuccess">
            <p>{{mensagem}}</p>
        </div>
        <div v-else class="modalError">
            <p>{{mensagem}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ["mensagem", "success"]
}
</script>

<style>

.modalSuccess, .modalError {
    color: #fff;
    padding: 15px 15px;
    text-align: center;
    border-radius: 15px;
    position: fixed;
    top: 10px;
    right: 25%;
    left: 25%;
}


.modalSuccess {
    background-color: #4BB543;
}

.modalError {
    background-color: red;
}

</style>