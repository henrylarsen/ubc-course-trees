import CourseManager from "../../src/controller/CourseManager";
import chaiAsPromised from "chai-as-promised";
import chai, {expect} from "chai";


chai.use(chaiAsPromised);

// describe("CourseManager", function () {
//    let courseManager: CourseManager;
//
//    before(function () {
//
//    });
//
//
//    describe("initialize",  function () {
//
//        beforeEach(function ()  {
//            courseManager = new CourseManager();
//        });
//
//        it ("should accept data", async function () {
//            const result = await courseManager.initialize();
//            return expect(courseManager.getCourses()).to.deep.equal("");
//        })
//
//        it ("display the tree", async function () {
//            await courseManager.initialize();
//            courseManager.displayTree('CPSC 310');
//            return expect(1).to.deep.equal(1);
//        })
//
//        it ("return all children nodes", async function () {
//            await courseManager.initialize();
//            const result = courseManager.getDependencies('CPSC 210');
//            return expect(result).to.deep.equal(1);
//        })
//
//    });
//
// });