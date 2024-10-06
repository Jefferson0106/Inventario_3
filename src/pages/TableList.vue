<template>
  <div class="row">
    <div class="col-12">
      <card :title="table1.title">
        <div class="header-actions">
          <img class="mas" src="../assets/icono/mas.png" @click="creacion">

          <!-- Campo de búsqueda -->
          <div class="search-container">
            <input type="text" v-model="searchQuery" placeholder="Buscar por nombre..." @input="search">
            
            <button class="search-button" @click="search">
              <img src="../assets/LUPA.png" alt="Buscar">
            </button>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Correo</th>
                <th scope="col">Cedula</th>
                <th scope="col">Telefono</th>
                <th scope="col">Perfil</th>
                <th scope="col">Fecha De Registro</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="usuario in usuarios" :key="usuario.idUsuario">
                <th scope="row">{{ usuario.idUsuario }}</th>
                <td>{{ usuario.nombreCompleto }}</td>
                <td>{{ usuario.apellidoCompleto }}</td>
                <td>{{ usuario.correo }}</td>
                <td>{{ usuario.cedula }}</td>
                <td>{{ usuario.telefono }}</td>
                <td>{{ getRolNombre(usuario.idRol) }}</td>
                <td>{{ usuario.fechaCreacion }}</td>
                <td class="acciones">
                  <img class="icono editar" src="../assets/icono/lapiz.png" @click="editar(usuario.idUsuario)" />
                  <img class="icono ojo" src="../assets/icono/ojo.png"  @click="Ver(usuario.idUsuario)">
                  <img class="icono basuira" src="../assets/icono/basura.png" @click="eliminarUsuario(usuario.idUsuario)" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Controles de paginación -->
        <div class="pagination">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Anterior</button>
          <span>Página {{ currentPage }} de {{ totalPages }}</span>
          <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Siguiente</button>
        </div>

      </card>

      <!-- Modal de confirmación -->
      <div v-if="showModal" class="modal-overlay" @click.self="cancelar">
        <div class="modal-content">
          <h3>¿Estás seguro de que quieres eliminar este usuario?</h3>
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
import axios from 'axios';

export default {
  components: {
    VueSimpleAlert
  },
  data() {
    return {
      table1: {
        title: "Usuarios",
        columns: ["idUsuario", "nombreCompleto", "apellidoCompleto", "Correo", "cedula", "telefono", "idRol", "fechaCreacion"],
        data: [], 
      },
      searchQuery: '', // Parámetro de búsqueda
      currentPage: 1, // Página actual
      totalPages: 0, // Total de páginas
      pageSize: 5, // Cantidad de usuarios por página
      usuarios: [], 
      roles: [], 
      showModal: false // Controlar la visibilidad del modal
    };
  },
  created() {
    this.fetchRoles().then(() => {
      this.fetchUsuarios();
    });
  },
  methods: {
    fetchRoles() {
      return axios.get('https://localhost:7061/api/Role/Lista')
        .then(response => {
          if (response.status === 200) {
            this.roles = response.data.response;
          } else {
            console.error("Error al obtener los roles");
          }
        })
        .catch(error => {
          console.error('Error al realizar la solicitud:', error);
        });
    },
    
    fetchUsuarios(page = this.currentPage) {
  const searchParam = this.searchQuery ? `&search=${this.searchQuery}` : '';
  const url = `https://localhost:7061/api/BusquedaUsuario/paginado?pagina=${page}&cantidadPorPagina=${this.pageSize}${searchParam}`;
  
  axios.get(url)
    .then(response => {
      console.log("Usuarios fetch response:", response.data); // Imprime la respuesta completa

      if (response.status === 200) {
        // Ajusta según la estructura de respuesta real
        this.usuarios = response.data.usuarios || []; // Cambia 'response.data.response.items' a 'response.data.usuarios'
        this.currentPage = response.data.paginaActual || 1; // Ajusta según el campo de página actual
        this.totalPages = response.data.totalPaginas || 0; // Ajusta según el campo de total de páginas
      } else {
        console.error("Error al obtener los usuarios");
      }
    })
    .catch(error => {
      console.error('Error al realizar la solicitud:', error);
    });
},
    
    creacion() {
      this.$router.push({ name: 'UsuarioRegistro' });
    },
    
    editar(idUsuario) {
      this.$router.push({ name: 'UsuarioEditar', params: { idUsuario: idUsuario } });
    },
    
    Ver(idUsuario) {
      this.$router.push({ name: 'UsuarioVer', params: { idUsuario: idUsuario } });
    },
    
    getRolNombre(idRol) {
      const rol = this.roles.find(role => role.idRol === idRol);
      return rol ? rol.nombreRol : 'Desconocido';
    },
    
    eliminarUsuario(idUsuario) {
      VueSimpleAlert.confirm('¿Estás seguro de que quieres eliminar este usuario?')
        .then((confirmed) => {
          if (confirmed) {
            axios.delete(`https://localhost:7061/api/Usuario/Eliminar/${idUsuario}`)
              .then(response => {
                if (response.status === 200) {
                  this.usuarios = this.usuarios.filter(usuario => usuario.idUsuario !== idUsuario);
                } else {
                  console.error("Error al eliminar el usuario");
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
    },
    
    search() {
      this.currentPage = 1; // Reinicia a la primera página al buscar
      this.fetchUsuarios();
    },
    
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
        this.fetchUsuarios(page);
      }
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
  border-collapse: collapse;
}

.table td, .table th {
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.thead-dark {
  background-color: black;
  color: white;
}

.acciones {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.icono {
  width: 20px;
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

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.search-container {
  display: flex;
  align-items: center;
}

.search-container input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 5px;
  position: relative;
    top: -66px;
    left: -202px;
}

.search-button {
  background-color: #27293d;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
    top: -66px;
    left: -195px;
}

.search-button img {
  width: 33px;
  height: 27px;
  filter: invert(100%);
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f8f9fa;
  cursor: pointer;
  margin: 0 5px;
}

.pagination button:disabled {
  cursor: not-allowed;
  background-color: #e9ecef;
}

.pagination span {
  align-self: center;
}
</style>