import CourseManager from "../../src/controller/CourseManager";
import chaiAsPromised from "chai-as-promised";
import chai, {expect} from "chai";


chai.use(chaiAsPromised);

describe("CourseManager", function () {
   let courseManager: CourseManager;

   before(function () {

   });


   describe("initialize",  function () {

       beforeEach(function ()  {
           courseManager = new CourseManager();
       });

       it ("should accept data", async function () {
           const result = await courseManager.initialize();
           return expect(courseManager.getCourses()).to.deep.equal("");
       })

   });

});