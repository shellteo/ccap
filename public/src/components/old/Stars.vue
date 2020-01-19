<template>
  <div id="stars-particles" />
</template>

<script>
// import 'particles.js'

export default {
  name: 'StarsParticles'
}
</script>

<style lang='scss'>
canvas {
  display: block;
  vertical-align: bottom;
}

#stars-particles {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
}

</style>
