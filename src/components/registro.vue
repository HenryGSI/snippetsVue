<template>
  <div>
    <nav class="blue">
    </nav>
    <div class="container center">
      <div class="row login">
          <div class="col s12 m6 l12">
          <div class="card">
              <div class="card-content">
                  <span class="card-title">Registro</span>
                  <!-- enctype="multipart/form-data" para poder subir archivos -->
                  <!-- autocomplete="off" evitar que salgan sujerencias de autocompletar -->
                  <form id="formRegistro" autocomplete="off"  @submit.prevent="registro" enctype="multipart/form-data">
                      <input type="text" name="usuario" placeholder="Nombre de usuario" required pattern="[A-Za-z]{3,30}">
                      <!-- required pattern="[A-Za-z]{3,30}" Mayusculas, minusculas y longitud de 3 a 30
                          required pattern="[A-Za-z0-9]{8,15}" Mayusculas, minusculas, números y longitud de 8 a 15 -->
                      <input type="password" v-model="pass" name="pass" placeholder="Contraseña" required pattern="[A-Za-z0-9]{8,15}">
                      <!-- Validamos las contraseñas con el v-model de Vue.js-->
                      <input type="password" v-model="passC" placeholder="Confirmar Contraseña" required pattern="[A-Za-z0-9]{8,15}">
                      <input type="email" v-model="correo" name="email" placeholder="Correo electrónico" @blur="validarCorreo" required>
                      <!-- Con el evento @blur se llama ante cualquier acción, ya se click, tecla o submit -->
                      <div class="file-field input-field">
                          <div class="btn">
                              <span>Imagen de perfil</span>
                              <input type="file" name="foto">
                          </div>
                          <div class="file-path-wrapper">
                              <input class="file-path validate" type="text">
                          </div>
                      </div>
                      <input type="submit" value="Registrarse" :class="boton">
                  </form>

              </div>
              <div class="card-action">
                  <router-link to="/">Iniciar sesión</router-link>
              </div>
          </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'
import axios from 'axios'
import domain from '../mixins/domain'


export default {
  name: 'Registro',
  data(){
    return {
      pass: '',
      passC: '',
      respuesta: '',
      correo: '',
      boton: 'btn blue disabled', //boton desactivado por defecto si el email ya sta registrado,
    }
  },
  methods: {
    registro(){
      if(this.pass == this.passC){ //comprobamos que las contraseñas sean iguales
          const form = document.getElementById('formRegistro'); //obetenemos el formulario completo
          axios.post(this.getDomain()+'/api/loginRegistro/registro.php', new FormData(form)) //con axios enviamos mediante POST y FormData el formulario a la pagina PHP encargada
              .then(res => {
                  this.respuesta = res.data; //si recibimos respuesta la guardamos en nuestra variable
                  this.direccionamiento();
              });
      }else{
          swal('Cuidado','Las contraseñas no son iguales.','warning'); //swal() es un alert() de SweetAlert
      }
    },
    direccionamiento(){
      if(this.respuesta == 'success'){ //si la respuesta de PHP es correcta
          this.$router.push('/'); //el redireccionamiento con Vue
      }else{
          swal('Error','No se pudo registrar', 'error');
      }
    },
    validarCorreo(){
      if(this.validEmail(this.correo)){//validamos que el email tenga formato valido
          const formData = new FormData();//creamos un nuevo formData
          formData.append('correo',this.correo); //al formData le añadimos una nueva variable correo que mediante v-model tiene el valor del email
          axios.post(this.getDomain()+'/api/loginRegistro/validarEmail.php', formData) //con axios enviamos mediante POST y FormData el correo a validar
              .then(res => {
                  this.respuesta = res.data; //si recibimos respuesta la guardamos en nuestra variable
                  if (res.data == 'success') {
                      this.boton = 'btn blue';
                  } else {
                      this.boton = 'btn blue disabled';
                      swal('Cuidado','El correo electrónico ya existe.','warning');
                  }
              });
      }else{ //en caso de no tener formato válido de email
          this.boton = 'btn blue disabled';
          swal('Cuidado','El correo electrónico no tiene un formato válido.','warning');
      }
    },
    validEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email); //devuelve true en caso si el formato es válido
    }
  },
  mixins:[domain]
}
</script>

<style>
  .login{
    width: 50%;
  }
</style>





