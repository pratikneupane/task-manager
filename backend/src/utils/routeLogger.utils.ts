import { Express } from 'express';
import listEndpoints from 'express-list-endpoints';

export const logRoutes = (app: Express): void => {
  const routes = listEndpoints(app);
  
  console.log('\nAPI Routes:');
  console.log('===========');
  
  routes
    .filter(route => route.path.startsWith('/api/v1'))
    .forEach(route => {
      console.log(`${route.methods.join(', ')}\t${route.path}`);
    });
    
  console.log('===========\n');
};
