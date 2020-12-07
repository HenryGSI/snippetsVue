<template>
  <div>
    <cabecera></cabecera>
    <div class="container center">
      <div class="row" style="margin:0,auto;width:80%">
        <div class="col s12 m6 l12">
          <div class="card">
            <div class="card-content">
              <span class="card-title">Pública tu código</span>
              <form id="altaPost" autocomplete="off"  @submit.prevent="alta">
                <input type="text" name="titulo" placeholder="Título" required>
                <textarea name="codigo" class="materialize-textarea" placeholder="Escribe tu código" cols="30" rows="10"></textarea>
                <textarea name="descripcion" class="materialize-textarea" placeholder="Escribe tu descripción" cols="30" rows="10"></textarea>
                <select name="categoria" class="browser-default" required>
                  <option value="" disabled selected>Escoge una opción</option>
                  <option value="php">PHP</option>
                  <option value="css">CSS</option>
                  <option value="html">HTML 5</option>
                  <option value="mysql">MySQL</option>
                  <option value="nodejs">Nodejs</option>
                  <option value="vue">Vue.js</option>
                </select>
                <input type="hidden" name="token" :value="token">
                <br>
                <input type="submit" value="Guardar" class="btn blue">
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
  name: 'alta',
  computed:{
    token(){
      return JSON.parse(this.$localStorage.get('token'))
    }
  },
  components: {
    cabecera
  },
  methods: {
    alta(){
      const form = document.getElementById('altaPost'); //obetenemos el formulario completo
      axios.post(this.getDomain()+'/api/crud/altaPost.php', new FormData(form)) //con axios enviamos mediante POST y FormData el formulario a la pagina PHP encargada
      .then(res => {
        this.respuesta = res.data; //si recibimos respuesta la guardamos en nuestra variable
        if(res.data == 'success'){
          swal({
              title:  'Buen trabajo',
              text: 'Post guardado',
              icon: 'success',
              button: 'Ok'
          });
          form.reset();
        }else{
          swal({
              title:  'Error',
              text: 'El post no se ha podido guardar',
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
