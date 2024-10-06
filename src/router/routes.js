import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import LoginAr from "../layout/LoginAr.vue";
import PublicidadEr from "../layout/PublicidadEr.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
const Dashboard = () =>
  import(/* webpackChunkName: "dashboard" */ "@/pages/Dashboard.vue");
const Profile = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Profile.vue");
const Notifications = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Notifications.vue");
const Icons = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Icons.vue");
const Maps = () => import(/* webpackChunkName: "common" */ "@/pages/Maps.vue");
const Typography = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Typography.vue");
const TableList = () =>
  import(/* webpackChunkName: "common" */ "@/pages/TableList.vue");

const UsuarioRegistro = () =>
  import(/* webpackChunkName: "common" */ "@/pages/UsuarioRegistro.vue");

const UsuarioEditar = () =>
  import(/* webpackChunkName: "common" */ "@/pages/UsuarioEditar.vue");

const UsuarioVer = () =>
  import(/* webpackChunkName: "common" */ "@/pages/UsuarioEditar.vue");

const RolTable = () =>
  import(/* webpackChunkName: "common" */ "@/pages/RolTable.vue");

const RolRegistro = () =>
  import(/* webpackChunkName: "common" */ "@/pages/RolRegistro.vue");


const RolEditar = () =>
  import(/* webpackChunkName: "common" */ "@/pages/RolEditar.vue");

const RolVer = () =>
  import(/* webpackChunkName: "common" */ "@/pages/RolVer.vue");


const PermisoTable = () =>
  import(/* webpackChunkName: "common" */ "@/pages/PermisoTable.vue");

const PermisoRegistra = () =>
  import(/* webpackChunkName: "common" */ "@/pages/PermisoRegistra.vue");

const PermisoEditar = () =>
  import(/* webpackChunkName: "common" */ "@/pages/PermisoEditar.vue");


const PermisoVer = () =>
  import(/* webpackChunkName: "common" */ "@/pages/PermisoVer.vue");

const CategoriaTable = () =>
  import(/* webpackChunkName: "common" */ "@/pages/CategoriaTable.vue");

const CategoriaRegistro = () =>
  import(/* webpackChunkName: "common" */ "@/pages/CategoriaRegistro.vue");

const CategoriaEditar = () =>
  import(/* webpackChunkName: "common" */ "@/pages/CategoriaEditar.vue");

const CategoriaVer = () =>
  import(/* webpackChunkName: "common" */ "@/pages/CategoriaVer.vue");

const ColorTable = () =>
  import(/* webpackChunkName: "common" */ "@/pages/ColorTable.vue");

const ColorRegistro = () =>
  import(/* webpackChunkName: "common" */ "@/pages/ColorRegistro.vue");

const ColorEditar = () =>
  import(/* webpackChunkName: "common" */ "@/pages/ColorEditar.vue");

const ColorVer = () =>
  import(/* webpackChunkName: "common" */ "@/pages/ColorVer.vue");

const SubTabla = () =>
  import(/* webpackChunkName: "common" */ "@/pages/SubTabla.vue");

const SubRegistro = () =>
  import(/* webpackChunkName: "common" */ "@/pages/SubRegistro.vue");

const SubEditar = () =>
  import(/* webpackChunkName: "common" */ "@/pages/SubEditar.vue");

const SubVer = () =>
  import(/* webpackChunkName: "common" */ "@/pages/SubVer.vue");

const AlmacenTable = () =>
  import(/* webpackChunkName: "common" */ "@/pages/AlmacenTable.vue");

const AlmacenRegistro = () =>
  import(/* webpackChunkName: "common" */ "@/pages/AlmacenRegistro.vue");

const AlmacenEdiitar = () =>
  import(/* webpackChunkName: "common" */ "@/pages/AlmacenEdiitar.vue");

const AlmacenVer = () =>
  import(/* webpackChunkName: "common" */ "@/pages/AlmacenVer.vue");

const TipoProductoTable = () =>
  import(/* webpackChunkName: "common" */ "@/pages/TipoProductoTable.vue");

const TipoProductoRegistro = () =>
  import(/* webpackChunkName: "common" */ "@/pages/TipoProductoRegistro.vue");

const TipoProductoEditar = () =>
  import(/* webpackChunkName: "common" */ "@/pages/TipoProductoEditar.vue");

const TipoProyectoVer = () =>
  import(/* webpackChunkName: "common" */ "@/pages/TipoProyectoVer.vue");

const ProductoTable = () =>
  import(/* webpackChunkName: "common" */ "@/pages/ProductoTable.vue");


const routes = [
  {
    path: "/PublicidadEr",
    component: PublicidadEr,
    name: "PublicidadEr",
  },
  {
    path: "/login",
    component: LoginAr,
    name: "login",
  },
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/PublicidadEr",  // Redirige la ruta raíz a "profile" u otra ruta deseada
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "profile",
        name: "profile",
        component: Profile,
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications,
      },
      {
        path: "icons",
        name: "icons",
        component: Icons,
      },
      {
        path: "maps",
        name: "maps",
        component: Maps,
      },
      {
        path: "typography",
        name: "typography",
        component: Typography,
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList,
      },
      {
        path: "UsuarioRegistro",
        name: "UsuarioRegistro",
        component: UsuarioRegistro,
      },
      {
        path: "UsuarioEditar/:idUsuario",
        name: "UsuarioEditar",
        component: UsuarioEditar,
      },
      {
        path: "UsuarioVer/:idUsuario",
        name: "UsuarioVer",
        component: UsuarioVer,
      },
      {
        path: "RolTable",
        name: "RolTable",
        component: RolTable,
      },
      {
        path: "RolRegistro",
        name: "RolRegistro",
        component: RolRegistro,
      },
      {
        path: "RolEditar/:idRol",
        name: "RolEditar",
        component: RolEditar,
      },
      {
        path: "RolVer/:idRol",
        name: "RolVer",
        component: RolVer,
      },
      {
        path: "PermisoTable",
        name: "PermisoTable",
        component: PermisoTable,
      },
      {
        path: "PermisoRegistra",
        name: "PermisoRegistra",
        component: PermisoRegistra,
      },
      {
        path: "PermisoEditar/:idPermiso",
        name: "PermisoEditar",
        component: PermisoEditar,
      },
      {
        path: "PermisoVer/:idPermiso",
        name: "PermisoVer",
        component: PermisoVer,
      },
      {
        path: "CategoriaTable",
        name: "CategoriaTable",
        component: CategoriaTable,
      },
      {
        path: "CategoriaRegistro",
        name: "CategoriaRegistro",
        component:  CategoriaRegistro,
      },
      {
        path: "CategoriaEditar./:idCategoria",
        name: "CategoriaEditar",
        component: CategoriaEditar,
      },
      {
        path: "CategoriaVer./:idCategoria",
        name: "CategoriaVer",
        component: CategoriaVer,
      },

      {
        path: "ColorTable",
        name: "ColorTable",
        component: ColorTable,
      },
      {
        path: "ColorRegistro",
        name: "ColorRegistro",
        component: ColorRegistro,
      },

      {
        path: "ColorEditar/:idColor",
        name: "ColorEditar",
        component: ColorEditar,
      },

      {
        path: "ColorVer/:idColor",
        name: "ColorVer",
        component: ColorVer,
      },
      {
        path: "SubTabla",
        name: "SubTabla",
        component: SubTabla,
      },
      {
        path: "SubRegistro",
        name: "SubRegistro",
        component: SubRegistro,
      },

      {
        path: "SubEditar/:idSubColor",
        name: "SubEditar",
        component: SubEditar,
      },
      {
        path: "SubVer/:idSubColor",
        name: "SubVer",
        component: SubVer,
      },
      {
        path: "AlmacenTable",
        name: "AlmacenTable",
        component:  AlmacenTable,
      },
      {
        path: "AlmacenRegistro",
        name: "AlmacenRegistro",
        component:AlmacenRegistro,
      },
      {
        path: "AlmacenEdiitar./:idAlmacen",
        name: "AlmacenEdiitar",
        component: AlmacenEdiitar,
      },
      {
        path: "AlmacenVer/:idAlmacen",
        name: "AlmacenVer",
        component:AlmacenVer,
      },
      {
        path: "TipoProductoTable",
        name: "TipoProductoTable",
        component:TipoProductoTable,
      },
      {
        path: "TipoProductoRegistro",
        name: "TipoProductoRegistro",
        component:TipoProductoRegistro,
      },
      {
        path: "TipoProductoEditar/:idTipoProducto",
        name: "TipoProductoEditar",
        component: TipoProductoEditar,
      },
      {
        path: "TipoProyectoVer/:idTipoProducto",
        name: "TipoProyectoVer",
        component:   TipoProyectoVer,
      },
      {
        path: "ProductoTable",
        name: "ProductoTable",
        component:ProductoTable,
      },
    ],
  },
  { path: "*", component: NotFound },
];

export default routes;