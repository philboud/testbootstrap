<template lang="html">
  <div>
    <div>{{clients.nom}}</div>
    <div>{{clients.prenom}}</div>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  data () {
    return {
      clients: [],
      form: {
        nom: '',
        prenom: ''
      }
    }
  },
  created () {
    axios.get(`http://localhost:3000/client/` + this.$route.params.id)
      .then(response => {
        this.clients = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>

<style lang="css">
</style>
