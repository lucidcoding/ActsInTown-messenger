import conversation = require('./controllers/conversation/index');
import message = require('./controllers/message/index');

var routesConfig = (app: any) => {
	app.use('/conversation', conversation);
	app.use('/message', message);
	app.use((req: any, res: any, next: any) => {
		res.status(404);
		res.send({ message: 'Not found' });
		return;
	});
};

export = routesConfig;
