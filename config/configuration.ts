export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwt: {
    secret: process.env.JWT_SECRET || 'ChangeMe@!',
    expiresIn: '1d',
  },
  database: {
    dns:
      process.env.DATABASE_URL ||
      'postgres://postgres:postgres@localhost:5432/postgres',
  },
});
