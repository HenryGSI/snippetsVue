<template>
  <div>
    <nav class="blue">
      <div class="nav-wrapper">
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><router-link to="/inicio"><i class="material-icons">home</i></router-link></li>
          <li><router-link to="/alta"><i class="material-icons">add</i></router-link></li>
          <li><router-link to="/categorias/php">PHP</router-link></li>
          <li><router-link to="/categorias/css">CSS</router-link></li>
          <li><router-link to="/categorias/html">HTML5</router-link></li>
          <li><router-link to="/categorias/mysql">MySQL</router-link></li>
          <li><router-link to="/categorias/nodejs">Nodejs</router-link></li>
          <li><router-link to="/categorias/vue">Vue.js</router-link></li>
          <li><a href="#" @click="salir">Salir</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from 'axios'
import domain from '../mixins/domain'

export default {
  name: 'cabecera',
  methods: {
    salir(){
      const token = JSON.parse(this.$localStorage.get('token'));
      axios.get(this.getDomain()+'/api/loginRegistro/salir.php?token='+token) //con axios enviamos mediante POST y FormData el formulario a la pagina PHP encargada
      .then(res => {
        if(res.data == 'success'){
          this.$localStorage.remove('token');
          this.$router.push('/')
        }
      });
    }
  },
  mixins:[domain]
}
</script>
