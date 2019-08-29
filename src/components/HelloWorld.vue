<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <counter :num="num" @incre="inscrase" @decre="decrase"></counter>
  </div>
</template>

<script>
  import Counter from 'components/Counter.vue'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        num: 0,
      }
    },
    methods:{
      inscrase(){
        this.num = this.num+1
      },
      decrase(){
        this.num = this.num-1
      }
    },
    components: {
      Counter
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
