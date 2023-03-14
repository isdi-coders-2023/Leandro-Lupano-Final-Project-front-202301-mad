export type NavOption = {
  label: string;
  path: string;
};

export const navMenuOptions: NavOption[] = [
  { label: 'Home', path: '/register' },
  { label: 'Login', path: '/login' },
  { label: 'Products', path: '/products' },
  { label: 'MyGuitars', path: '/myguitars' },
  { label: 'About', path: '/about' },
  { label: 'Users', path: '/users' },
];
