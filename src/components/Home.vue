<template>
  <view>
      <button class="todolist"  @click="goToTodolist"></button>
      <button class="GitProfile" @click="goToGitSearch"></button>
      <button class="Timer" @click="goToTimer"></button>

  </view>
</template>

<script>
export default {
  methods: {
    goToTodolist() {
      this.$router.push('/todolist'); 
    },
    goToGitSearch() {
      this.$router.push('/gitSearch'); 
    },
    goToTimer() {
      this.$router.push('/timer'); 
    }
  },
};
</script>

<style>
.todolist {
  font-size: 24px;
  text-align: center;
  padding: 100px;
  margin: 10px;
  background-color: lightblue;
  align-items: center;
  background-image: url(../assets/todolist.png);
  background-size: cover;
  
}
.GitProfile {
  font-size: 24px;
  text-align: center;
  padding: 100px;
  margin: 10px;
  background-color: lightblue;
  align-items: center;
  background-image: url(../assets/git.png);
  background-size: cover; 
}

.Timer {
  font-size: 24px;
  text-align: center;
  padding: 100px;
  margin: 10px;
  background-color: lightblue;
  align-items: center;
  background-image: url(../assets/timer.png);
  background-size: cover;
  
}
</style>
