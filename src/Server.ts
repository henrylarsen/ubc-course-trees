import express, {Request, Response} from "express";
import CourseManager from "./controller/CourseManager";
import cors from "cors";
import * as http from "http";

export default class Server {
    private express;
    private server: http.Server | undefined;
    private PORT;
    private courseManager: CourseManager = new CourseManager();

    constructor(port: number) {
        this.PORT = port;
        this.express = express();
        this.initializeMiddleware();
        this.initializeEndpoints();
    }

    public start(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            if (this.server !== undefined) {
                console.error("Server::start() - server already started")
                reject();
            } else {
                await this.courseManager.initialize();
                this.server = this.express.listen(this.PORT, () => {
                    console.info(`Server::start() - server listening on port: ${this.PORT}`);
                    resolve();
                }).on("error", (error: Error) => {
                    console.error(`Server::start() - server error: ${error.message}`);
                    reject(error);
                })
            }
        });
    }

    public stop(): Promise<void> {
        console.info("Server::stop()");
        return new Promise((resolve, reject) => {
            if (this.server === undefined) {
                console.error("Server::stop() - ERROR: server not started");
                reject();
            } else {
                this.server.close(() => {
                    console.info("Server::stop() - server closed");
                    resolve();
                });
            }
        });
    }

    private initializeMiddleware() {
        this.express.use(express.json);
        this.express.use(cors());
    }

    private initializeEndpoints() {
        this.express.get("/data", this.getCourses.bind(this));
        this.express.get("/data/:id", this.getDependencies.bind(this));
    }

    private getCourses(res: Response) {
        const result = this.courseManager.getCourses();
        res.status(200).json({result});
    }

    private getDependencies(req: Request, res: Response) {
        const {id}= req.params;
        try {
            console.log(`Server::getDependencies() - params: ${JSON.stringify(req.params)}`);
            const result = this.courseManager.getDependencies(id);
            res.status(200).json({result});
        } catch (error: any) {
            res.status(400).json({error: error.message});
        }
    }

}