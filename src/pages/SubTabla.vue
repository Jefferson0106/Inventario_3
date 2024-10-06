
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
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="subcolor in subcolor" :key="subcolor.idSubColor">
                  <th scope="row">{{ subcolor.idSubColor }}</th>
                  <td>{{ subcolor.nombre }}</td>
                  <td class="acciones">
                    <img class="icono editar" src="../assets/icono/lapiz.png" @click="editar(subcolor.idSubColor)" />
                    <img class="icono ojo" src="../assets/icono/ojo.png"  @click="Ver(subcolor.idSubColor)">
                    <img class="icono basuira" src="../assets/icono/basura.png" @click="eliminarUsuario(subcolor.idSubColor)" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </card>
        <div v-if="showModal" class="modal-overlay" @click.self="cancelar">
    <div class="modal-content">
      <h3>¿Estás seguro de que quieres eliminar este Sub Color?</h3>
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
  import { BaseTable } from "@/components";
  import axios from "axios";
  
  export default {
    components: {
      BaseTable,
      VueSimpleAlert
    },
    data() {
      return {
        table1: {
          title: "SubColor",
          columns: ["idUsuario", "nombreCompleto", "apellidoCompleto", "Correo", "cedula", "telefono", "idRol", "fechaCreacion"],
          data: [], 
        },
        table2: {
          title: "Table on Plain Background",
          columns: ["Name", "Country", "City", "Salary"],
          data: [], 
        },
        subcolor: [], 
        roles: [], 
      };
    },
    created() {
      this.fetchRoles().then(() => {
        this.fetchUsuarios();
      });
    },
    methods: {
    fetchRoles() {
      return axios.get('https://localhost:7061/api/SubColor/Lista')
        .then(response => {
          if (response.status === 200) {
            this.subcolor = response.data.response;
          } else {
            console.error("Error al obtener los roles");
          }
        })
        .catch(error => {
          console.error('Error al realizar la solicitud:', error);
        });
    },
    fetchUsuarios() {
      axios.get('https://localhost:7061/api/SubColor/Lista')
        .then(response => {
          if (response.status === 200) {
            this.subcolor = response.data.response;
          } else {
            console.error("Error al obtener los Categoria");
          }
        })
        .catch(error => {
          console.error('Error al realizar la solicitud:', error);
        });
    },
    creacion() {
      this.$router.push({ name: 'SubRegistro' });
    },
    editar(idSubColor) {
      this.$router.push({ name: 'SubEditar', params: { idSubColor: idSubColor } });
    },
    Ver(idSubColor) {
      this.$router.push({ name: 'SubVer', params: { idSubColor: idSubColor } });
    },
    getRolNombre(idCategoria) {
      const rol = this.roles.find(role => role.idCategoria === idCategoria);
      return rol ? rol.nombreRol : 'Desconocido';
    },
      eliminarUsuario(idSubColor) {
        VueSimpleAlert.confirm('¿Estás seguro de que quieres eliminar este Sub Color?')
          .then((confirmed) => {
            if (confirmed) {
              axios.delete(`https://localhost:7061/api/SubColor/Eliminar/${idSubColor}`)
                .then(response => {
                  if (response.status === 200) {
                    this.subcolor = this.subcolor.filter(subcolor => subcolor.idSubColor !== idSubColor);
                  } else {
                    console.error("Error al eliminar el Color");
                  }
                })
                .catch(error => {
                  console.error('Error al realizar la solicitud:', error);
                });
            } else {
              // Aquí puedes manejar la lógica si el usuario cancela la acción
              console.log('Eliminación cancelada');
            }
          })
          .catch(error => {
            // Maneja el error en caso de fallo al mostrar el modal
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
      top: -23px;
      left: 861px;
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
    padding: 8px 137px; /* Espacio alrededor del texto */
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
    gap: 8px; /* Espacio entre los ícoconos */
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