<template>
  <div class="container">
    <div class="login-box">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    handleLogin() {
      fetch("https://mocki.io/v1/083c59b8-9c04-4a37-bd75-35173f805854")
        .then(response => response.json())
        .then(result => {
          const hashedPassword = CryptoJS.MD5(this.password).toString();
          if (result.user === this.username && result.pass === hashedPassword) {
            document.cookie = "loginSuccess=true; path=/";
            alert("Login successful!");
            this.$router.push({ name: 'GitSearch' }); 
          } else {
            alert("Invalid username or password");
          }
        })
        .catch(error => console.error('Error:', error));
    },
  },
};
</script>

<style scoped>

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: #becee7;
  margin: 40px 200px 40px 200px;

}

.login-box {
  width: 600px;
  height: 400px;
  padding: 20px;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  margin-top: 35px;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  border: none;
  color: rgb(255, 255, 255);
  border-radius: 4px;
  cursor: pointer;
  border-radius: 12px;
}

button:hover {
  background-color: #0056b3;
}
</style>
