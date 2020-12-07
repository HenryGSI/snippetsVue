<template>
  <div>
    <nav class="blue"></nav>
    <div class="container center">
      <div class="row login">
          <div class="col s12 m6 l12">
          <div class="card">
              <div class="card-content">
                  <span class="card-title">Iniciar sesión</span>
                  <form id="inicioSesion" autocomplete="off"  @submit.prevent="login">
                      <input type="email" name="email" placeholder="Correo electrónico" required>
                      <input type="password" name="pass" placeholder="Contraseña" required pattern="[A-Za-z0-9]{8,15}">
                      <input type="submit" value="Entrar" class="btn blue">
                  </form>

              </div>
              <div class="card-action">
                  <router-link to="/registro">Registrarse</router-link>
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
  name: 'iniciarSesion',
  methods:{
    login(){
      const form = document.getElementById('inicioSesion'); //obetenemos el formulario completo
      axios.post(this.getDomain()+'/api/loginRegistro/login.php', new FormData(form)) //con axios enviamos mediante POST y FormData el formulario a la pagina PHP encargada
      .then(res => {
        this.respuesta = res.data; //si recibimos respuesta la guardamos en nuestra variable
        if (res.data.res == 'success') { //en caso de login correcto redirigimos a /principal/index.php
          this.$localStorage.set('token',JSON.stringify(res.data.token)); //guardamos en localStorage el token
          this.$router.push('/inicio');
        } else {
          swal('Error','Usuario y contraseña incorrectos','error');
        }
      });
    }
  },
  created(){
    const token = JSON.parse(this.$localStorage.get('token'))
    if(token){
      this.$router.push('/inicio');
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



