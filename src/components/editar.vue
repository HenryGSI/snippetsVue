<template>
  <div>
    <cabecera></cabecera>
    <div class="container center">
      <div class="row">
        <div class="col s12 m6 l12">
          <div class="card">
            <div class="card-content">
              <span class="card-title">Editar post</span>
              <form id="editarPost" autocomplete="off"  @submit.prevent="editar">
                <input type="text" name="titulo" placeholder="Título" required :value="formEditar.titulo">
                <textarea name="codigo" class="materialize-textarea" :value="formEditar.codigo" placeholder="Escribe tu código" cols="30" rows="10"></textarea>
                <textarea name="descripcion" class="materialize-textarea" :value="formEditar.descripcion" placeholder="Escribe tu descripción" cols="30" rows="10"></textarea>
                <select name="categoria" class="browser-default" required>
                  <option :value="formEditar.categoria" v-text="formEditar.categoria"></option>
                  <option value="php">PHP</option>
                  <option value="css">CSS</option>
                  <option value="html">HTML 5</option>
                  <option value="mysql">MySQL</option>
                  <option value="nodejs">Nodejs</option>
                  <option value="vue">Vue.js</option>
                </select>
                <input type="hidden" name="id" :value="$route.params.id">
                <br>
                <input type="submit" value="Editar" class="btn blue">
              </form>
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
import axios from 'axios'
import swal from 'sweetalert'

export default {
  name: 'editar',
  data(){
    return {
      formEditar: {}
    }
  },
  components: {
    cabecera
  },
  created() { //al crear la instancia de vue
        this.getId(); //si hay id descaga los datos del post
    },
  methods: {
    getId(){
      const id = this.$route.params.id;
      axios.get(this.getDomain()+'/api/crud/getId.php?id=' + id)
      .then(res => {
        this.formEditar = res.data;
      });

    },
    editar(){
      const form = document.getElementById('editarPost'); //obetenemos el formulario completo
      axios.post(this.getDomain()+'/api/crud/editarPost.php', new FormData(form)) //con axios enviamos mediante POST y FormData el formulario a la pagina PHP encargada
      .then(res => {
        this.respuesta = res.data; //si recibimos respuesta la guardamos en nuestra variable
        if(res.data == 'success'){
          this.$router.push('/inicio');
        }else{
          swal({
              title:  'Error',
              text: 'El post no se ha podido editar',
              icon: 'error',
              button: 'Ok'
          });
        }
      });
    }
  },
  mixins:[sesion,domain]
}
</script>
