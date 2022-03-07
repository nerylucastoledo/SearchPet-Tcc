<template>
    <header class="header-principal">
        <nav class="container">
            <router-link to="/">
                <img id="logo" src="../assets/logo.png" alt="Logo da empresa">
            </router-link>

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

.header-principal {
    padding: 20px 30px;
    max-width: 100%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.header-principal nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header-principal img {
    width: 150px;
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