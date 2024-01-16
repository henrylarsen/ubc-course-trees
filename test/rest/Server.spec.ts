import Server from "../../src/Server";
import request, {Response} from "supertest";
import {expect} from "chai";
import {ICourseManager} from "../../src/controller/ICourseManager";
import CourseManager from "../../src/controller/CourseManager";




describe("CourseManager Server", function() {
    let server: Server;
    // let courseManager: CourseManager;


    before(async function () {
        // courseManager = new CourseManager();
        // await courseManager.initialize();
        // server = new Server(4321);
        // await server.start();
    });

    after(async function () {
        // await server.stop();
    });

    it('should respond with a 200 status code', function (done) {
            request('http://localhost:4321')
                .get('/data') // Use a known endpoint for health checking
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    expect(res.body).to.deep.equal({ status: 'ok' }); // Adjust based on your server's healthcheck response
                    done();
                });
        });


    it("GET test for all data", async function () {
        return request("http://localhost:4321")
            .get("/data")
            .then((res: Response) => {
                expect(res.status).to.be.equal(200);
                expect(res.body.size === 1);
                expect(res.body).to.be.equal(1);
            })
            .catch((error) => {
                expect.fail(error);
            });
        // try {
        //     const res = await request('http://localhost:4321').get('/data');
        //
        //     expect(res.status).to.equal(200);
        //     expect(res.body.result).to.be.an('array'); // Assuming you expect an array
        //     expect(res.body.result.length).to.equal(1); // Adjust based on your expected length
        //
        // } catch (error) {
        //     // Log or handle the error as needed
        //     console.error(error)
        //     expect.fail();
        // }
    });

})