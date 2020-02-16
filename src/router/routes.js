import createRoute from './createRoute';
import ExamplePage from '../components/Example/ExamplePage';

export default [
  createRoute({ path: '/', component: ExamplePage }),
];