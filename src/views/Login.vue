<template>
  <div class="login">
    <h1 class="title">Login</h1>
    <form action class="form" @submit.prevent="login">
      <label class="form-label" for="email">Email:</label>
      <input v-model="email" class="form-input" type="email" id="email" required placeholder="Email" />
      <label class="form-label" for="password">Password:</label>
      <input v-model="password" class="form-input" type="password" id="password" required placeholder="Password" />
      <p v-if="error" class="error">
        Has introducido mal el email o la contraseña.
      </p>
      <input class="form-submit" type="submit" value="Login" />
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import md5 from 'md5';

export default {
  data() {
    return {
      email: "",
      password: "",
      error: false,
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.get('https://mocki.io/v1/083c59b8-9c04-4a37-bd75-35173f805854');
        const { user, pass } = response.data;

        if (this.email === user && md5(this.password) === pass) {
          document.cookie = "loginSuccess=true; path=/";
          this.$router.push({ name: 'Timer' }); 
        } else {
          this.error = true;
        }
      } catch (err) {
        console.error(err);
        this.error = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 2rem;
}

.title {
  text-align: center;
}

.form {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  min-width: 350px;
  max-width: 100%;
  background: rgba(19, 35, 47, 0.9);
  border-radius: 5px;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}

.form-label {
  margin-top: 2rem;
  color: white;
  margin-bottom: 0.5rem;

  &:first-of-type {
    margin-top: 0rem;
  }
}

.form-input {
  padding: 10px 15px;
  background: none;
  background-image: none;
  border: 1px solid white;
  color: white;
  justify-content: center;

  &:focus {
    outline: 0;
    border-color: #1ab188;
  }
}

.form-submit {
  background: #1ab188;
  border: none;
  color: white;
  margin-top: 3rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #0b9185;
  }
}

.error {
  color: red;
  margin-top: 1rem;
  text-align: center;
}
</style>
