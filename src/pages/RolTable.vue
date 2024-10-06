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
                <th scope="col">Fecha De Registro</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="roles in roles" :key="roles.idRol">
                <th scope="row">{{ roles.idRol }}</th>
                <td>{{ roles.nombreRol }}</td>
                <td>{{ roles.descripcion }}</td>
                <td>{{ roles.fechaCreacion }}</td>
                <td class="acciones">
                  <img class="icono editar" src="../assets/icono/lapiz.png" @click="editar(roles.idRol)" />
                  <img class="icono ojo" src="../assets/icono/ojo.png" @click="Ver(roles.idRol)">
                  <img class="icono basuira" src="../assets/icono/basura.png" @click="eliminarRol(roles.idRol)" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </card>
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
        title: "Perfiles",
        columns: ["idUsuario", "nombreCompleto", "apellidoCompleto", "Correo", "cedula", "telefono", "idRol", "fechaCreacion"],
        data: [], 
      },
      roles: [], 
      rolSeleccionado: null,
    };
  },
  created() {
    this.fetchRoles();
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
    creacion() {
      this.$router.push({ name: 'RolRegistro' });
    },
    editar(idRol) {
      this.$router.push({ name: 'RolEditar', params: { idRol: idRol } });
    },
    Ver(idRol) {
      this.$router.push({ name: 'RolVer', params: { idRol: idRol } });
    },
    async eliminarRol(idRol) {
  VueSimpleAlert.confirm('¿Estás seguro de que quieres eliminar este rol y sus relaciones asociadas?')
    .then(async (confirmed) => {
      if (confirmed) {
        try {
          // Obtener todas las relaciones del rol
          const response = await axios.get(`https://localhost:7061/api/RolPermiso/ListaPorRol/${idRol}`);
          console.log('Relaciones del rol:', response.data); // Añade esta línea para verificar las relaciones

          const rolRelations = response.data;

          // Eliminar todas las relaciones asociadas
          for (const relation of rolRelations) {
            try {
              await axios.delete(`https://localhost:7061/api/RolPermiso/Eliminar/${relation.idRolPermiso}`);
            } catch (error) {
              console.error(`Error al eliminar la relación con idRolPermiso ${relation.idRolPermiso}:`, error);
            }
          }

          // Finalmente, eliminar el rol
          const deleteRoleResponse = await axios.delete(`https://localhost:7061/api/Role/Eliminar/${idRol}`);

          if (deleteRoleResponse.status === 200) {
            this.roles = this.roles.filter(rol => rol.idRol !== idRol);
            VueSimpleAlert.alert('Rol eliminado correctamente');
          } else {
            throw new Error("Error al eliminar el rol");
          }
        } catch (error) {
          if (error.response) {
            if (error.response.status === 400) {
              VueSimpleAlert.alert('No se puede eliminar el rol porque tiene usuarios asociados o hubo un problema con la solicitud');
            } else {
              VueSimpleAlert.alert(`Error: ${error.response.data.message || 'Error desconocido'}`);
            }
          } else {
            VueSimpleAlert.alert('Error al realizar la solicitud');
          }
          console.error('Error al realizar la solicitud:', error);
        }
      } else {
        console.log('Eliminación cancelada');
      }
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