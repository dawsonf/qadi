<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    
    <h1 class="green">{{ title }}</h1>
    <h3>
      {{ msg }}
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 1.1rem;
  /* top: -10px; */
}

h3 {
  font-size: 0.8rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

.greetings {
  padding-bottom: 10px;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
  h1 {
    font-weight: 500;
    font-size: 1.6rem;
    /* top: -10px; */
  }
}
</style>
