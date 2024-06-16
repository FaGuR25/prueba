<template>
    <view>
      <touchable-opacity @press="handlePress">
        <image :source="require('../assets/logome.png')" />
        <text class="text">Press me</text>
      </touchable-opacity>
    </view>
  </template>
  
  <script>
  export default {
    methods: {
      handlePress() {
        console.log('button');
      }
    },
  }
  </script>
  
  <style>
  </style>
  