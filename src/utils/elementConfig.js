import {
  Rate,
  Row,
  Switch,
  Progress,
  Form,
  FormItem,
  Input,
  Button,
  Container,
  Aside,
  Menu,
  Submenu,
  MenuItem,
  Header,
  Select,
  Option,
  Breadcrumb,
  BreadcrumbItem,
  Main,
  Loading,
  Table,
  TableColumn,
  Pagination,
  PageHeader,
  Tabs,
  TabPane,
  Dialog
} from 'element-ui'

import ScrollBar from 'element-ui/lib/scrollbar'

export default {
  install (V) {
    V.use(Rate)
    V.use(Button)
    V.use(Form)
    V.use(FormItem)
    V.use(Input)
    V.use(Switch)
    V.use(Progress)
    V.use(Row)
    V.use(Container)
    V.use(Aside)
    V.use(Menu)
    V.use(Submenu)
    V.use(MenuItem)
    V.use(Header)
    V.use(Select)
    V.use(Option)
    V.use(Breadcrumb)
    V.use(BreadcrumbItem)
    V.use(Main)
    V.use(Loading.directive)
    V.use(Table)
    V.use(TableColumn)
    V.use(Pagination)
    V.use(PageHeader)
    V.use(ScrollBar)
    V.use(Tabs)
    V.use(TabPane)
    V.use(Dialog)
  }
}
