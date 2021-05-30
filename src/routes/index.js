import * as createError from 'http-errors';
import examRoute from './exam';


/**
 * Setup all routes in the app
 * @param {express.Express} app
 * @returns {void}
 */
 export default function initRoutes(app) {
    app.get('/ping', (req, res, next) => {
      return res.status(200).json({ message: 'Success' });
    });


    app.use('/exam', examRoute);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        next(createError(404));
    });

    // error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {message: 'Something went wrong!'};

        return res.status(err.status || 500).json(res.locals.error);
    });
}