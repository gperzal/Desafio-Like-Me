import express from 'express';
import postRoutes from './routes/postRoutes.js'; // Asegúrate de incluir la extensión .js
import setupStaticFiles from './middlewares/staticFile.js';
import sequelize from './config/database.js';
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
setupStaticFiles(app)


app.use(postRoutes);



// sequelize.authenticate()
//     .then(() => console.log('\n Conexión a la base de datos establecida exitosamente.'))
//     .catch(error => {
//         console.error('No se pudo conectar a la base de datos:', error);
//         process.exit(1);
//     });

// app.listen(port, () => {
//     console.log(`\nServidor corriendo en http://localhost:${port}`);
// });

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
});