export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    dns:
      process.env.DATABASE_URL ||
      'postgres://postgres:postgres@localhost:5432/postgres',
  },
});
