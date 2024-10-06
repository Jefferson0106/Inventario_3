<template>
    <div class="row">
      <div class="col-12">
        <card :title="table1.title">
          <img class="mas" src="../assets/icono/mas.png" @click="creacion">
          <div class="table-responsive">
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Descripcion</th>
                  <th scope="col">Color</th>
                  <th scope="col">Sub Color</th>
                  <th scope="col">Categoria</th>
                  <th scope="col">Tipo De Producto</th>
                  <th scope="col">Fecha De Registro</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="producto in productos" :key="producto.idProducto">
                  <th scope="row">{{ producto.idProducto }}</th>
                  <td>{{ producto.nombreProducto }}</td>
                  <td>{{ producto.descripcion }}</td>
                  <td>{{ getColorNombre(producto.idColor) }}</td>
                  <td>{{ getSubColorNombre(producto.idSubColor) }}</td>
                  <td>{{ getCategoriaNombre(producto.idCategoria) }}</td>
                  <td>{{ getTipoProductoNombre(producto.idTipoProducto) }}</td>
                  <td>{{ producto.fechaCreacion }}</td>
                  <td class="acciones">
                    <img class="icono editar" src="../assets/icono/lapiz.png" @click="editar(producto.idTipoProducto)" />
                    <img class="icono ojo" src="../assets/icono/ojo.png" @click="Ver(producto.idTipoProducto)">
                    <img class="icono basuira" src="../assets/icono/basura.png" @click="eliminarProducto(producto.idTipoProducto)" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </card>
        <div v-if="showModal" class="modal-overlay" @click.self="cancelar">
          <div class="modal-content">
            <h3>¿Estás seguro de que quieres eliminar este tipo de producto?</h3>
            <VueSimpleAlert />
            <button @click="confirmarEliminacion">Aceptar</button>
            <button @click="cancelar">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import VueSimpleAlert from 'vue-simple-alert';
  import axios from "axios";
  
  export default {
    components: {
      VueSimpleAlert
    },
    data() {
      return {
        table1: {
          title: "Productos",
          columns: ["idUsuario", "nombreCompleto", "apellidoCompleto", "Correo", "cedula", "telefono", "idRol", "fechaCreacion"],
          data: [], 
        },
        productos: [],
        colores: [], 
        subcolores: [],
        categorias: [],
        tiposProducto: [],
        showModal: false,
      };
    },
    created() {
      this.fetchColor();
      this.fetchSubcolor();
      this.fetchCategorias();
      this.fetchTiposProducto();
      this.fetchProductos();
    },
    methods: {
      fetchColor() {
        axios.get('https://localhost:7061/api/Colore/Lista')
          .then(response => {
            if (response.status === 200) {
              this.colores = response.data.response;
              console.log("Colores obtenidos:", this.colores); 
            } else {
              console.error("Error al obtener los colores");
            }
          })
          .catch(error => {
            console.error('Error al realizar la solicitud:', error);
          });
      },
      fetchSubcolor() {
        axios.get('https://localhost:7061/api/SubColor/Lista')
          .then(response => {
            if (response.status === 200) {
              this.subcolores = response.data.response;
              console.log("Subcolores obtenidos:", this.subcolores); 
            } else {
              console.error("Error al obtener los subcolores");
            }
          })
          .catch(error => {
            console.error('Error al realizar la solicitud:', error);
          });
      },
      fetchCategorias() {
        axios.get('https://localhost:7061/api/Categoria/Lista')
          .then(response => {
            if (response.status === 200) {
              this.categorias = response.data.response;
              console.log("Categorías obtenidas:", this.categorias); 
            } else {
              console.error("Error al obtener las categorías");
            }
          })
          .catch(error => {
            console.error('Error al realizar la solicitud:', error);
          });
      },
      fetchTiposProducto() {
        axios.get('https://localhost:7061/api/TipoProducto/Lista')
          .then(response => {
            if (response.status === 200) {
              this.tiposProducto = response.data.response;
              console.log("Tipos de productos obtenidos:", this.tiposProducto); 
            } else {
              console.error("Error al obtener los tipos de productos");
            }
          })
          .catch(error => {
            console.error('Error al realizar la solicitud:', error);
          });
      },
      fetchProductos() {
        axios.get('https://localhost:7061/api/Producto/Lista')
          .then(response => {
            if (response.status === 200) {
              this.productos = response.data.response;
              console.log("Productos obtenidos:", this.productos); 
            } else {
              console.error("Error al obtener los productos");
            }
          })
          .catch(error => {
            console.error('Error al realizar la solicitud:', error);
          });
      },
      getColorNombre(idColor) {
        const colorItem = this.colores.find(color => color.idColor === idColor);
        return colorItem ? colorItem.nombre : 'Desconocido';
      },
      getSubColorNombre(idSubColor) {
        const subColorItem = this.subcolores.find(subcolor => subcolor.idSubColor === idSubColor);
        return subColorItem ? subColorItem.nombre : 'Desconocido';
      },
      getCategoriaNombre(idCategoria) {
        const categoriaItem = this.categorias.find(categoria => categoria.idCategoria === idCategoria);
        return categoriaItem ? categoriaItem.nombre : 'Desconocido';
      },
      getTipoProductoNombre(idTipoProducto) {
        const tipoProductoItem = this.tiposProducto.find(tipo => tipo.idTipoProducto === idTipoProducto);
        return tipoProductoItem ? tipoProductoItem.nombre : 'Desconocido';
      },
      creacion() {
        this.$router.push({ name: 'TipoProductoRegistro' });
      },
      editar(idTipoProducto) {
        this.$router.push({ name: 'TipoProductoEditar', params: { idTipoProducto } });
      },
      Ver(idTipoProducto) {
        this.$router.push({ name: 'TipoProyectoVer', params: { idTipoProducto } });
      },
      eliminarProducto(idTipoProducto) {
        VueSimpleAlert.confirm('¿Estás seguro de que quieres eliminar este tipo de producto?')
          .then((confirmed) => {
            if (confirmed) {
              axios.delete(`https://localhost:7061/api/TipoProducto/Eliminar/${idTipoProducto}`)
                .then(response => {
                  if (response.status === 200) {
                    this.productos = this.productos.filter(producto => producto.idTipoProducto !== idTipoProducto);
                  } else {
                    console.error("Error al eliminar el tipo de producto");
                  }
                })
                .catch(error => {
                  console.error('Error al realizar la solicitud:', error);
                });
            } else {
              console.log('Eliminación cancelada');
            }
          })
          .catch(error => {
            console.error('Error al mostrar el modal:', error);
          });
      }
    }
  }
  </script>
  
  <style scoped>
  .mas {
    width: 5%;
      position: relative;
      top: -24px;
      left: 886px;
      -webkit-filter: invert(42%) sepia(47%) saturate(5841%) hue-rotate(146deg) brightness(96%) contrast(101%);
      filter: invert(42%) sepia(47%) saturate(5841%) hue-rotate(146deg) brightness(96%) contrast(101%);
      cursor: pointer;
  
  }
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 4px;
    text-align: center;
  }
  
  .modal-content button {
    margin: 5px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .table {
    width: 100%;
    margin: 20px 0;
    border-collapse: collapse; /* Elimina los espacios entre bordes */
  }
  
  .table td, .table th {
    padding: 8px 12px; /* Espacio alrededor del texto */
    text-align: left;
    border-bottom: 1px solid #ddd; /* Línea divisoria */
    vertical-align: middle; /* Centra el contenido verticalmente */
    white-space: nowrap; /* Evita que el texto se divida en varias líneas */
    overflow: hidden; /* Oculta el contenido que excede el área de la celda */
    text-overflow: ellipsis; /* Muestra '...' para texto que se corta */
  }
  
  .thead-dark {
    background-color: black;
    color: white;
  }
  
  .acciones {
    display: flex;
    justify-content: center; /* Centrar horizontalmente los íconos */
    align-items: center; /* Alinear verticalmente */
    gap: 8px; /* Espacio entre los íconos */
  }
  
  .icono {
    width: 20px; /* Tamaño de los íconos */
    height: 20px;
    cursor: pointer;
  }
  
  .editar {
    filter: invert(27%) sepia(65%) saturate(3103%) hue-rotate(205deg) brightness(100%) contrast(107%);
  }
  
  .ojo {
    filter: invert(95%) sepia(0%) saturate(0%) hue-rotate(329deg) brightness(95%) contrast(94%);
  }
  
  .basuira {
    filter: invert(16%) sepia(92%) saturate(6587%) hue-rotate(358deg) brightness(99%) contrast(112%);
  }
  
  @media (max-width: 768px) {
    .icono {
      width: 16px; /* Tamaño reducido para pantallas pequeñas */
      height: 16px;
    }
  
    .table td, .table th {
      padding: 6px 8px; /* Reducir padding para pantallas pequeñas */
    }
  
    .acciones {
      gap: 6px; /* Reducir espacio entre íconos en pantallas pequeñas */
    }
  }
  </style>