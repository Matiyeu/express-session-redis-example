<template>
  <div>
    <p v-if="msg">{{ msg }}</p>
    <form action="" @submit.prevent>
      <label>Login
        <input type="text" v-model="form.username">
      </label>

      <label>Password
        <input type="password" v-model="form.password">
      </label>
    </form>

    <button type="submit" @click="submitForm">Submit</button>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      msg: undefined
    }
  },
  methods: {
    async submitForm () {
      try {
        const response = await axios.post('http://localhost:3000/login', this.form, { withCredentials: true })
        this.msg = response.data.msg
      } catch (e) {
        if (e.response && e.response.data)
          return this.msg = e.response.data.msg

        this.msg = e.message
      }
    }
  }
}
</script>

<style scoped>

</style>
