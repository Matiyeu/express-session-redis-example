<template>
  <div v-if="user">
    <h1>This page is secured.</h1>
    <h2>Hello {{ user.username }}</h2>
    <h2>email: {{ user.email }}</h2>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Secured',
  data () {
    return {
      user: undefined
    }
  },
  mounted () {
    this.fetchUserInfo()
  },
  methods: {
    async fetchUserInfo () {
      try {
        const response = await axios.get('http://localhost:3000/secured', { withCredentials: true })
        this.user = response.data
      } catch (e) {
        this.$router.push('login').catch()
      }
    }
  }
}
</script>

<style scoped>

</style>
