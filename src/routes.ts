import conversation = require('./controllers/conversation/index');

var routesConfig = (app: any) => {
	app.use('/conversation', conversation);
	app.use((req: any, res: any, next: any) => {
		res.status(404);
		res.send({ message: 'Not found' });
		return;
	});
};

export = routesConfig;
