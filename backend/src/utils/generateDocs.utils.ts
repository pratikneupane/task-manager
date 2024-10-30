import { Express } from 'express';
import listEndpoints from 'express-list-endpoints';
import fs from 'fs';

interface Route {
  path: string;
  methods: string[];
}

export const generateAPIDoc = (app: Express): void => {
  const routes: Route[] = listEndpoints(app);
  
  const markdown = `# Task Manager API Documentation
Generated on: ${new Date().toLocaleDateString()}

## Base URL
\`http://localhost:3000/api/v1\`

## Authentication
All routes except \`/auth/login\` and \`/auth/register\` require authentication via JWT token in cookie.

## Endpoints

${routes
  .filter(route => route.path.startsWith('/api/v1'))
  .map(route => `### ${route.methods.join(', ')} ${route.path}`)
  .join('\n\n')}
`;

  fs.writeFileSync('API.md', markdown);
  console.log('API documentation generated successfully!');
};
export const generateDocumentation = (app: Express): void => {
  try {
    generateAPIDoc(app);
  } catch (error) {
    console.error('Failed to generate API documentation:', error);
  }
};