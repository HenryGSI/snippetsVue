<template>
  <div>
    <cabecera></cabecera>

    <nav>
    <div class="nav-wrapper indigo lighten-5">
      <form>
        <div class="input-field">
          <input id="search" type="search" v-model="buscar" required placeholder="Buscar">
          <label class="label-icon" for="search"><i class="material-icons">search</i></label>
          <i class="material-icons" @click="clear">close</i>
        </div>
      </form>
    </div>
</nav>


<div class="container">
    <div class="row" v-for="item in datosFiltrados" :key="item.id" v-cloak>
        <!-- Si vemos que mientras carga datos con el AJAX como le cuesta un poco cargarlos,
        se ve parte del codigo de vue.js incompleto, se puede ocultar con v-cloak:-->
        <div class="col s12 m6 l12">
            <div class="card">
                <div class="card-content">
                    <span class="card-title"><img :src="item.foto" :alt="item.user" width="50px" class="circle"> {{item.user}}</span>
                    <span class="card-title">{{item.titulo}}</span>
                    <pre>{{item.codigo}}</pre>
                    <p>{{item.descripcion}}</p>
                </div>
                <div class="card-action">
                    <!-- Usamos el v-bind con una concatenación para asignar un valor al atribute href -->
                    <router-link v-if="item.user == userPost" class="btn blue" :to="'/editar/' + item.id">Editar</router-link>
                    <a v-if="item.user == userPost" class="btn blue" href="#" @click="eliminar(item.id)">Eliminar</a>
                    <button v-clipboard="item.codigo" class="btn blue">Copiar</button>
                </div>
            </div>
        </div>
    </div>
</div>

  </div>
</template>

<script>
import cabecera from './cabecera'
import sesion from '../mixins/sesion' //importamos el mixin que comprueba si estamos logeados
import domain from '../mixins/domain'
import eliminar from '../mixins/eliminar'
import axios from 'axios'
import swal from 'sweetalert'

export default {
  name: 'categorias',
  data(){
    return {
      respuesta: '',
      listar:[],
      buscar: '',
      parameters: {},
      userPost: ''
    }
  },
  created(){
    this.getCategoria();//se descarga la lista de post ya sea global o por categoria
    this.getUser(); //obtiene el usuario
  },
  beforeRouteUpdate(to, from, next){
    next()
    this.getCategoria();
  },
  computed: {
     datosFiltrados(){
      return this.listar.filter((filtro=>{
          return filtro.titulo.toUpperCase().match(this.buscar.toUpperCase()) || filtro.descripcion.toUpperCase().match(this.buscar.toUpperCase())
          || filtro.categoria.toUpperCase().match(this.buscar.toUpperCase())
      }))
    }
  },
  methods:{
    getUser(){
      const token = JSON.parse(this.$localStorage.get('token'));
      axios.get(this.getDomain()+'/api/crud/getUser.php?token='+token)
      .then(res => {
          this.userPost = res.data;
      });
    },
    getCategoria(){
      const cat = this.$route.params.cat;
      axios.get(this.getDomain()+'/api/crud/getCategoria.php?cat=' + cat)
      .then(res => {
        this.listar = res.data;
      });
    },
    clear(){
      this.buscar = '';
    }
  },
  components: {
    cabecera
  },
  mixins:[sesion,domain,eliminar]
}
</script>
