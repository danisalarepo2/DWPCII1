// Helps to handle http errors
import createError from 'http-errors';
// Importing winston logger
import log from './config/winston';
// Importando enrutador home
import homeRouter from './domains/home/home.router';
import userRouter from './domains/user/user.router';
import projectRouter from './domains/project/project.router';

// Función que agrega rutas
const addRoutes = (app) => {
  // Agregando enrutado de Home
  app.use('/', homeRouter);
  app.use('/user', userRouter);
  app.use('/project', projectRouter);
  app.use('/about', homeRouter);
  // ERRORES
  // error handler
  app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    log.error(`${err.status || 500} - ${err.message}`);
    res.render('error');
  });
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    log.info(`404 Página no encontrada ${req.method} ${req.originalUrl}`);
    next(createError(404));
  });
  return app;
};

// Exportando objeto
export default { addRoutes };
