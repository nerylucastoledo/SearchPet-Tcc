<template>
    <div>
      <div class="carregar"></div>
      <p class="loading-message">Carregando...</p>
    </div>
</template>

<style>

.loading-message {
  text-align: center;
  margin-top: 10px;
}

.carregar {
    animation: is-rotating 1s infinite;
    border: 6px solid #e5e5e5;
    border-radius: 50%;
    border-top-color: #B9DD2A;
    height: 80px;
    width: 80px;
    margin: 60px auto 40px;
}
@keyframes is-rotating {
  to {
    transform: rotate(1turn);
  }
}
</style>