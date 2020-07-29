import http, { ServerResponse } from 'http'
import connect, { IncomingMessage, NextFunction } from 'connect'
import serveStatic from 'serve-static'
import errorhandler from 'errorhandler'
import morgan from 'morgan'

const app = connect();

app.use(morgan('combined') as any)

app.use('/hello', (req: IncomingMessage, res: ServerResponse) => {
    res.end(`hello world ${req.url}`);
});

app.use('/static', serveStatic(__dirname) as any);

app.use('/error', (req: IncomingMessage, res: ServerResponse, next: NextFunction) => {
    throw new Error('boom!');
});

app.use(errorhandler() as any);

http.createServer(app).listen(3000)
console.log('Ready ... localhost:3000');
