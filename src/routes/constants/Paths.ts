/**
 * Express router paths go here.
 */

type Immutable<T> = {
  readonly [K in keyof T]: Immutable<T[K]>;
};


const Paths = {
  Base: '/api',
  Users: {
    Base: '/users',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  Key: {
    Base: '/key',
    Get: '/all',
    Add: '/add'
  },
  Product: {
    Base: '/product',
    All: '/all',
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
  }
};


// **** Export **** //

export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths;
