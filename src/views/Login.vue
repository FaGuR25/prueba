<template>
  <div class="container">
    <div class="login-box">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="camps">
          <label for="username">Usuario</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="camps">
          <label for="password">Contraseña</label>
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

<style>

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: #96C2DB;
  margin: 0px 200px 0px 200px;
  

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

.camps {
  margin-bottom: 15px;
}

.camps label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

.camps input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  margin-top: 20px;
  width: 100%;
  padding: 10px;
  background-color: #30a4ca;
  border: none;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #zz;
}

body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #330000; 
}

</style>
