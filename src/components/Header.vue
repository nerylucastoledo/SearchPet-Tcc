<template>
    <header>
        <nav class="container header">
            <img id="logo" src="../assets/logo.png" alt="Logo da empresa">

            <ul class="menu">
                <li>
                    <router-link to="/">Home</router-link>
                </li>
                <li>
                    <router-link to="/meus">Meus</router-link>
                </li>
                <li>
                    <router-link to="/vacinas">Vacinas</router-link>
                </li>
                <li>
                    <router-link to="/perfil">Perfil</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    
}
</script>

<style>

header {
    width: 100%;
    height: 100px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: #fff;
}

.header {
    padding-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

#logo {
    max-width: 200px;
    max-height: 60px;
}

.menu {
    display: flex;
}

.menu a {
    color: #36C9D2;
    font-size: 24px;
}

.menu a::after {
    content: "";
    display: inline-block;
    background-color: #CAC0C0;
    width: 1px;
    height: 20px;
    margin: 0 30px;
}

.menu li:last-child a::after {
    display: none;
}

.menu a:hover {
    font-weight: bold;
}

</style>