import axios from 'axios'
import swal from 'sweetalert'
import domain from './domain'

export default{
  methods: {
    eliminar(id){
      swal({
        title:  'Seguro que desea eliminar el post',
        text: 'Al eliminarlo no podrás recuperarlo',
        icon: 'warning',
        buttons: ["Cancelar", "Eliminar"],
        //buttons: true,
        dangerMode:true, //selecciona el boton cancelar, y el eliminar no esta seleccionado. por lo tanto no se pulsaria de forma automatica con el ENTER
      })
      .then((aceptar)=>{
        if(aceptar){
          axios.get(this.getDomain()+'/api/crud/eliminar.php?id=' + id)
          .then(res => {
              if(res.data='success'){
                  this.getCategoria();//recargar la categoria al eliminar
              }else{
                  swal('Post no eliminado');
              }
          });
        }else{
          return false;
        }
      });
    }
  },
  mixins: [domain]
}
