<template>
  <transition name="fade-up-in" appear>
    <div v-if="shown" class="pwa-prompt">
      <button class="btn-padrao" @click="installPWA">BAIXAR APP ➡︎</button>
    </div>
  </transition>
</template>


<script>
export default {
  data() {
    return {
      installEvent: undefined,
      shown: false,
    }
  },

  beforeMount() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      this.installEvent = e
      this.shown = true
    })
  },

  methods: {
    installPWA() {
      this.installEvent.prompt()
      this.installEvent.userChoice.then((choice) => {
        this.dismissPrompt()
        if (choice.outcome === 'accepted') {
          // Do something additional if the user chose to install
        } else {
          // Do something additional if the user declined
        }
      })
    },

    dismissPrompt() {
      this.shown = false
    }
  }
}
</script>
