<template>
  <div class="conteiner">
    <h1 class="textSearch">Buscar Perfiles en GitHub</h1>
    <input class="SearchUser" v-model="query" @keyup.enter="searchUsers" placeholder="Buscar perfiles..." />
    <button class="SearchButton" @click="searchUsers">Buscar</button>

    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="loading" class="loading"></div>

    <div v-if="users.length">
      <ul>
        <li v-for="user in paginatedUsers" :key="user.id" @click="selectUser(user)">
          <img :src="user.avatar_url" alt="Avatar" width="50" height="50" />
          <span>{{ user.login }}</span>
        </li>
      </ul>

      <div class="pagination">
        <button class="back" @click="prevPage" :disabled="page === 1">Anterior</button>
        <span>Página {{ page }} de {{ totalPages }}</span>
        <button class="next" @click="nextPage" :disabled="page === totalPages">Siguiente</button>
      </div>
    </div>

    <div v-if="selectedUser" class="user-details">
      <h2>{{ selectedUser.login }}</h2>
      <img class="imgBio" :src="selectedUser.avatar_url" alt="Avatar" width="100" height="100" />
      <p><strong>Nombre:</strong> {{ selectedUser.name }}</p>
      <p><strong>Informacion:</strong> {{ selectedUser.bio }}</p>
      <p><strong>Repositorios:</strong> {{ selectedUser.public_repos }}</p>
      <p><strong>Seguidores:</strong> {{ selectedUser.followers }}</p>
      <p><strong>Siguiendo:</strong> {{ selectedUser.following }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      query: '',
      users: [],
      selectedUser: null,
      loading: false,
      error: null,
      page: 1,
      perPage: 10
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.users.length / this.perPage);
    },
    paginatedUsers() {
      const start = (this.page - 1) * this.perPage;
      const end = start + this.perPage;
      return this.users.slice(start, end);
    }
  },
  methods: {
    async searchUsers() {
      if (!this.query) return;

      this.loading = true;
      this.error = null;
      this.users = [];
      this.selectedUser = null;
      this.page = 1;

      try {
        const response = await axios.get(`https://api.github.com/search/users?q=${this.query}`);
        this.users = response.data.items;
      } catch (err) {
        this.error = 'Error al buscar perfiles';
      } finally {
        this.loading = false;
      }
    },
    async selectUser(user) {
      this.loading = true;
      this.error = null;
      this.selectedUser = null;

      try {
        const response = await axios.get(`https://api.github.com/users/${user.login}`);
        this.selectedUser = response.data;
      } catch (err) {
        this.error = 'Error al cargar la información del perfil';
      } finally {
        this.loading = false;
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
      }
    },
    nextPage() {
      if (this.page < this.totalPages) {
        this.page++;
      }
    }
  }
};
</script>

<style>
.SearchUser {
  width: 80%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  font-family: monospace;
  background-color: #fbfdfc;
  border-radius: 5px;
  
}

.textSearch {
  font-size: 50px;
  font-family: monospace;
}

.conteiner {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}


.SearchButton {
  border-radius: 5px;
  background-color: lightcyan;
  border-style: 1px;
  border-color: lightblue;
  margin-left: 5px;
  font-family: monospace;
  height: 43px;
  width: 100px;
  font-size: 22px;
  cursor: pointer;
}

.back {
  border-radius: 5px;
  font-size: 20px;
  width: 100px;
  height: 40px;
  background-color: lightcyan;
  border-style: 1px;
  border-color: lightblue;

}

.next {
  border-radius: 5px;
  font-size: 20px;
  width: 100px;
  height: 40px;
  background-color: lightcyan;
  border-style: 1px;
  border-color: lightblue;

}

.error {
  color: red;
}

.loading {
  width: 48px;
  height: 48px;
  border: 5px solid #FFF;
  border-bottom-color: lightblue;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

ul {
  list-style-type: none;
  padding: 0;
  margin-left: 10px;

}

li {
  display: flex;
  align-items: center;
  margin: 10px 0;
  cursor: pointer;
}

li img {
  margin-right: 10px;
  border-radius: 30px;
}

.user-details {
  margin-top: 30px;
  font-size: 20px;

}

.pagination {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.imgBio{
  border-radius: 20px;
}
</style>