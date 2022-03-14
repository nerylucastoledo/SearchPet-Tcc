<template>
    <header class="header-principal">
        <nav class="container">
            <router-link to="/">
                <img id="logo" src="../assets/logo.png" alt="Logo da empresa">
            </router-link>

            <div class="menu-btn" @click="openMenu">
                <div class="menu-btn__burger"></div>
            </div>

            <ul class="menu">
                <li @click="openMenu">
                    <router-link to="/">Home</router-link>
                </li>
                <li @click="openMenu">
                    <router-link to="/meus">Meus</router-link>
                </li>
                <li @click="openMenu">
                    <router-link to="/vacinas">Vacinas</router-link>
                </li>
                <li @click="openMenu">
                    <router-link to="/perfil">Perfil</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {

    methods: {
        openMenu() {
            const menuBtn = document.querySelector('.menu-btn');
            const menu = document.querySelector('.menu');

            menuBtn.classList.toggle('open');
            menu.classList.toggle('open-menu');
        }
    }
}
</script>

<style>

.menu-btn {
    display: none;
}

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

@media (max-width: 725px) {
    .menu {
        display: none;
    }

    .menu.open-menu {
        top: 0;
        margin-top: 100px;
        right: 0px;
        position: absolute;
        display: block;
        z-index: 2;
        background-color: #36C9D2;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        width: 50%;
        text-align: center;
        transition: all .5s ease-in-out;
        background-color: #36C9D2;
    }

    .menu li  {
        padding: 15px 0;
        border-bottom: 1px solid #fff;
    }

    .menu li:last-child {
        border-bottom: none;
    }


    .menu a {
        color: #fff;
    }

    .menu a::after {
        display: none;
    }

    /* BUTTON */

    .menu-btn {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80px;
        height: 80px;
        cursor: pointer;
        transition: all .5s ease-in-out;
    }

    .menu-btn__burger {
            width: 50px;
            height: 6px;
            background: #36C9D2;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(255,101,47,.2);
            transition: all .5s ease-in-out;
        }
    .menu-btn__burger::before,
    .menu-btn__burger::after {
        content: '';
        position: absolute;
        width: 50px;
        height: 6px;
        background: #36C9D2;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(255,101,47,.2);
        transition: all .5s ease-in-out;
    }

    .menu-btn__burger::before {
        transform: translateY(-16px);
    }

    .menu-btn__burger::after {
        transform: translateY(16px);
    }

        /* ANIMATION */

    .menu-btn.open .menu-btn__burger {
        transform: translateX(-50px);
        background: transparent;
        box-shadow: none;
    }

    .menu-btn.open .menu-btn__burger::before {
        transform: rotate(45deg) translate(35px, -35px);
    }

    .menu-btn.open .menu-btn__burger::after {
        transform: rotate(-45deg) translate(35px, 35px);
    }
}

</style>