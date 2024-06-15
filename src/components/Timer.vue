<template>
    <div id="timer">
      <div>
        <label for="time">Establecer Tiempo (HH:MM:SS):</label>
        <input type="text" v-model="timeInput" id="time" placeholder="00:00:00" />
        <button @click="setDuration">Establecer Duración</button>
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
    gap: 10px;
  }
  
  button {
    margin: 5px;
  }
  
  input {
    width: 100px;
    text-align: center;
  }
  </style>
  