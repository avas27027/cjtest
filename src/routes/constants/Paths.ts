/**
 * Express router paths go here.
 */

type Immutable<T> = {
  readonly [K in keyof T]: Immutable<T[K]>;
};


const Paths = {
  Base: '/api',
  Key: {
    Base: '/key',
    Get: '/all',
    Add: '/add'
  },
  Product: {
    Base: '/product',
    All: '/all',
    Add: '/add',
    Delete: '/delete',
    Categories: '/categories',
    Comment: '/comment/:pid',
    Detail: '/detail/:pid'
  },
  Order: {
    Base: '/order',
    All: '/all',
    User: '/user',
    Add: '/add'
  },
  Payments: {
    Base: '/pay',
    Create: '/create',
    Capture: '/capture/:orderID'
  },
  User: {
    Base: '/user',
    Login: '/login',
    Register: '/register',
    AuthState: '/authState',
    LogOut: '/logout',
  }
};


// **** Export **** //

export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths;
