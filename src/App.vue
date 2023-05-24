<script setup>
  import TitleCard from './components/TitleCard.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <div id="nav">

        <router-link to="/">Home</router-link> | 
        <router-link to="/about">About</router-link>
      </div> 
      <div>
        <TitleCard title="QADI" msg="Blah, blah" />
      </div>
    </div>
  </header>

  <router-view/>
</template>

<script>

  
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

#container {
  display: flex;
  flex-wrap: wrap;
}

.box {
  width: 50%;
  padding-left: 5px;
  padding-right: 5px;
}

.result {
  font-size: 0.8rem;
}

#nav {
  /* color: blue; */
  text-align: center;
}

@media(max-width: 300px) {
  .box {
     width: 100%;
     padding-left: 5px;
     padding-right: 5px;
   }
}


@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: top;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: top;
    flex-wrap: wrap;
    flex-direction: column;
    padding-top: 5px;
  }

  #nav {
    /* color: rgb(221, 44, 185); */
    text-align: left;
  }
}



</style>
