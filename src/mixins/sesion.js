export default{

  created(){
    const token = JSON.parse(this.$localStorage.get('token'))
    if(!token){ //si no existe el token que regrese a inciarSesion (Home)
      this.$router.push('/');
    }
  }


}
