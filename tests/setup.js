import { execSync } from 'node:child_process';

try {
  console.log('Setting up database for tests...');
  
  // Drop the database
  console.log('Running npm run db:drop...');
  execSync('npm run db:drop', { stdio: 'inherit' });

  // Migrate the database
  console.log('Running npm run db:migrate...');
  execSync('npm run db:migrate', { stdio: 'inherit' });

  // Seed the database
  console.log('Running npm run db:seed...');
  execSync('npm run db:seed', { stdio: 'inherit' });

  console.log('Database setup completed.');
} catch (error) {
  console.error('Error setting up database:', error);
  process.exit(1);
}
