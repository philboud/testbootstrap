<template lang="html">
  <div class="component-wrapper">
    <form class="inputPos">
      <md-field>
           <label>Nom</label>
           <md-input v-model="form.nom"></md-input>
         </md-field>
         <md-field>
              <label>Prenom</label>
              <md-input v-model="form.prenom"></md-input>
            </md-field>
            <v-btn @click="onVal">ok</v-btn>
          </form>
          <br>
          <br>
          <div v-if="active">
            <md-progress-spinner  class="md-accent" md-mode="indeterminate"></md-progress-spinner>
          </div>
          <md-table v-model="clients" md-card @md-selected="onDel">
            <md-table-row slot="md-table-row" v-for="(row, index) in clients" :key="row._id">
              <md-table-cell md-label="Nom">{{ row.nom }}</md-table-cell>
              <md-table-cell md-label="Prenom">{{ row.prenom }}</md-table-cell>
              <md-table-cell md-label="delet">
                <template slot-scope="scope">
                  <v-btn @click="onDel(row._id, index)">del</v-btn>
                  <v-btn @click="onEdit(row._id, index)">edit</v-btn>
                </template>
              </md-table-cell>
            </md-table-row>
          </md-table>
        </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      active: false,
      valid: false,
      isActive: true,
      clients: [],
      form: {
        nom: '',
        prenom: ''
      },
      nameRules: [
        v => !!v || 'Nom requis'
      ],
      surnameRules: [
        v => !!v || 'Prénom requis'
      ]
    }
  },
  created () {
    axios.get(`http://localhost:3000/client`)
      .then(response => {
        this.clients = response.data
        console.log(this.clients)
      })
      .catch(e => {
        this.errors.push(e)
      })
  },

  methods: {
    onEdit (id, index) {
      this.active = true
      console.log(id)
      setTimeout(() => {
        this.$router.push({
          name: 'Edit',
          params: {
            id: id
          }
        })
      }, 2000)
    },
    onVal () {
      axios.post(`http://localhost:3000/client`, this.form)
        .then(response => {
          this.clients.splice(this.clients.length, 0, this.form)
          axios.get(`http://localhost:3000/client`)
            .then(response => {
              this.clients = response.data
            })
        })
        .catch(e => {
          this.errors.push(e)
        })
      this.form = {}
    },
    onDel (id, index) {
      axios.delete('http://localhost:3000/client/' + id)
        .then(response => {
          this.clients.splice(index, 1)
        })
    }
  }
}
</script>

<style lang="css">
.inputPos{
  margin-left: 50px;
  width: 20%;
}
</style>
