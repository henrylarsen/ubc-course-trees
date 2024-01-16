import Server from './Server';

export class App {

    public initServer(port: number) {

        const server = new Server(port);
        return server.start().then(() => {
            console.info("App::initServer() - started");
        }).catch((error: Error) => {
            console.error(`App::initServer() - error: ${error.message}`);
        });

    }

}

const app = new App();
app.initServer(4321).then(() => {
    console.log("Server initialization complete");
});

