<template>
  <div id="timer">
    <div>
      <h1 for="time">Establecer Tiempo:</h1>
      <input type="text" v-model="timeInput" id="time" placeholder="00:00:00" />
      <button  @click="setDuration">Guardar</button>
    </div>
    <div>
      <p>{{ formattedTime }}</p>
      <button @click="startTimer">Iniciar</button>
      <button @click="pauseTimer">Pausar</button>
      <button @click="resetTimer">Limpiar</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeInput: '00:00:00',
      duration: 0,
      timer: null,
      remainingTime: 0
    };
  },
  computed: {
    formattedTime() {
      const hours = Math.floor(this.remainingTime / 3600);
      const minutes = Math.floor((this.remainingTime % 3600) / 60);
      const seconds = this.remainingTime % 60;
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
  },
  methods: {
    setDuration() {
      const [hours, minutes, seconds] = this.timeInput.split(':').map(Number);
      this.duration = (hours * 3600) + (minutes * 60) + seconds;
      this.remainingTime = this.duration;
      this.$emit('duration-set', this.remainingTime);
    },
    startTimer() {
      if (this.timer) return; // Si ya hay un temporizador en ejecución, no hacer nada
      this.timer = setInterval(() => {
        if (this.remainingTime > 0) {
          this.remainingTime--;
          this.$emit('tick', this.remainingTime);
        } else {
          this.pauseTimer();
          this.$emit('finished');
        }
      }, 1000);
      this.$emit('started');
    },
    pauseTimer() {
      clearInterval(this.timer);
      this.timer = null;
      this.$emit('paused');
    },
    resetTimer() {
      this.pauseTimer();
      this.remainingTime = this.duration;
      this.$emit('reset');
    }
  },
  beforeDestroy() {
    this.pauseTimer();
  }
};
</script>

<style>
#timer {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 300px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  margin: auto; 

}

h1{
  font-size: 50px;
  font-family: monospace;
  margin-bottom: 30px;
}

button {
  border-radius: 5px;
  background-color: #007bff;

  margin-left: 5px;
  font-family: monospace;
  height: 43px;
  width: 100px;
  font-size: 19px;
  margin-bottom: 10px;
}

button:hover{
  background-color: blue;
}

input {
  width: 78%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  font-family: monospace;
  background-color: #fbfdfc;
  border-radius: 5px;
  margin-top: 20px;
}
</style>