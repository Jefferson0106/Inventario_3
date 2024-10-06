<template>
    <div>
      <section id="usuario">
        <img class="flecha" src="../assets/icono/flecha.png" @click="flecha" alt="Flecha">
        <div class="project-bg">
          <div class="container">
            <div class="form-container">
              <form @submit.prevent="showModal">
                <div class="input-group">
                  <div class="input-with-icon">
                    <i class="fa-solid fa-box icon"></i>
                    <input type="text" id="nombreCompleto" name="nombreCompleto" placeholder="Nombre de Tipo de Producto" disabled v-model="form.nombre">
                  </div>
                  <div class="input-with-icon">
                    <i class="fa-solid fa-pen icon"></i>
                    <textarea id="mensaje" name="mensaje" placeholder="Descripción (Perfil)" disabled v-model="form.descripcion"></textarea>
                  </div>
                  <div class="input-with-icon">
                    <i class="fa-solid fa-palette icon"></i>
                    <v-select 
                      class="select" disabled
                      v-if="colorOptions" 
                      label="nombre" 
                      :options="colorOptions" 
                      v-model="selectedColor"
                      placeholder="Selecciona un color"
                    ></v-select>
                  </div>
                  <div class="input-with-icon">
                    <i class="fa-solid fa-palette icon"></i>
                    <v-select 
                      class="select"  disabled
                      v-if="subcolorOptions" 
                      label="nombre" 
                      :options="subcolorOptions" 
                      v-model="selectedSubColor"
                      placeholder="Selecciona un subcolor"
                    ></v-select>
                  </div>
                </div>
                <VueSimpleAlert />
              
              </form>
            </div>
          </div>
          <div v-if="isModalVisible" class="modal">
            <div class="modal-content">
              <p>¿Estás seguro de que quieres enviar el formulario?</p>
              <button @click="submitForm">Aceptar</button>
              <button @click="hideModal">Cancelar</button>
            </div>
          </div>
          <div v-if="isThankYouModalVisible" class="modal">
            <div class="modal-content">
              <i class="fa-solid fa-circle-check" style="color: green; font-size: 5em;"></i>
              <p>Gracias por crear el usuario, se ha registrado correctamente.</p>
              <button @click="hideThankYouModal">Cerrar</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import VueSimpleAlert from 'vue-simple-alert';
  import vSelect from 'vue-select';
  import 'vue-select/dist/vue-select.css';
  
  export default {
    name: "TipoProductoEdit",
    data() {
      return {
        form: {
          nombre: '',
          descripcion: '',
          idColor: null,
          idSubColor: null,
          fechaCreacion: new Date().toISOString() // fecha actual en formato ISO
        },
        colorOptions: [],
        selectedColor: null,
        subcolorOptions: [],
        selectedSubColor: null,
        isModalVisible: false,
        isThankYouModalVisible: false
      };
    },
    components: {
      vSelect,
      VueSimpleAlert,
    },
    async mounted() {
      try {
        // Cargar opciones de colores
        const colorResponse = await axios.get("https://localhost:7061/api/Colore/Lista");
        this.colorOptions = colorResponse.data.response.map(color => ({
          id: color.idColor,
          nombre: color.nombre
        }));
  
        // Cargar opciones de subcolores
        const subcolorResponse = await axios.get("https://localhost:7061/api/SubColor/Lista");
        this.subcolorOptions = subcolorResponse.data.response.map(subcolor => ({
          id: subcolor.idSubColor,
          nombre: subcolor.nombre
        }));
        
        // Cargar información del producto para editar
        const idTipoProducto = this.$route.params.idTipoProducto; // Suponiendo que el ID está en la URL
        if (idTipoProducto) {
          try {
            const productResponse = await axios.get(`https://localhost:7061/api/TipoProducto/Obtener/${idTipoProducto}`);
            const productData = productResponse.data.response;
            
            this.form.nombre = productData.nombre;
            this.form.descripcion = productData.descripcion;
            this.selectedColor = this.colorOptions.find(option => option.id === productData.idColor);
            this.selectedSubColor = this.subcolorOptions.find(option => option.id === productData.idSubColor);
          } catch (error) {
            console.error('Error al cargar la información del producto:', error);
          }
        }
      } catch (error) {
        console.error('Error al cargar las opciones:', error);
      }
    },
    methods: {
      flecha() {
        this.$router.push('/TipoProductoTable');
      },
      showModal() {
        this.isModalVisible = true;
      },
      hideModal() {
        this.isModalVisible = false;
      },
      showThankYouModal() {
        this.isThankYouModalVisible = true;
      },
      hideThankYouModal() {
        this.isThankYouModalVisible = false;
      },
      async submitForm() {
  try {
    // Asegúrate de que los valores seleccionados sean correctos
    this.form.idColor = this.selectedColor ? this.selectedColor.id : null;
    this.form.idSubColor = this.selectedSubColor ? this.selectedSubColor.id : null;

    // Asegúrate de que idTipoProducto esté incluido en this.form
    const idTipoProducto = this.$route.params.idTipoProducto; // Suponiendo que el ID está en la URL
    if (idTipoProducto) {
      this.form.idTipoProducto = idTipoProducto;
    }

    // Enviar la solicitud PUT
    const response = await axios.put("https://localhost:7061/api/TipoProducto/Editar", this.form);
    console.log(response.data.response);
    this.showThankYouModal();
    this.mostrarAlerta();
    setTimeout(() => {
      this.$router.push('/TipoProductoTable');
    }, 2000);
  } catch (error) {
    console.error(error);
    this.$alert('Ocurrió un error al actualizar el tipo de producto.');
  } finally {
    this.hideModal();
  }
},
      mostrarAlerta() {
        this.$alert('¡El tipo de producto ha sido actualizado!');
      }
    }
  };
  </script>
  
  <style scoped>
  .form-container {
    position: relative;
    text-align: center;
    left: 84px;
    top: -74px;
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 1200px;
    height: 443px;
    max-width: 90%; /* Se asegura de que se vea bien en pantallas pequeñas */
    display: flex;
    flex-direction: column; /* Asegura que los elementos estén en una columna */
  }
  
  .input-group {
    display: flex;
    flex-direction: column; /* Asegura que los campos dentro del grupo estén en una columna */
    gap: 10px;
  }
  
  input, textarea {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #ccc;
    color: #000;
  }
  
  textarea {
    height: 100px;
  }
  
  button {
    width: 20%;
    padding: 10px;
    background-color: #fff; /* Fondo blanco */
    color: rgba(3, 15, 39, 0.8); /* Texto en azul */
    border: 2px solid #007BFF; /* Borde azul */
    border-radius: 22px; /* Bordes redondeados */
    font-weight: bold; /* Texto en negrita */
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    top: 12px;
      left: -29px;
  
    position: relative;
  }
  
  button:hover {
    background-color: #007BFF; /* Fondo azul al pasar el ratón */
    color: #fff; /* Texto blanco al pasar el ratón */
  }
  .modal {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 10px;
    }
    .modal-content {
      width: 50%;
      position: relative;
      left: 68px;
  
      background-color: white;
      padding: 20px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 10px;
    }
    .modal-content button {
      margin: 10px;
      display: inline-block;
      border-radius: 10px;
      top: 7px;
     
    }
    p{
      color: #000;
    }
  .flecha{
      width: 5%;
      position: relative;
      top: 7px;
      left: 893px;
      cursor: pointer;
      
    }
  .select {
    max-width: 310px;
    width: auto;
    padding: 5px;
    margin: 0 auto;
    position: relative;
    left: -220px;
  }
  </style>