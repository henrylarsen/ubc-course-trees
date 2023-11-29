import CourseManager from "../../src/controller/CourseManager";
import chaiAsPromised from "chai-as-promised";
import chai, {expect} from "chai";


chai.use(chaiAsPromised);

describe("TreeController", function () {
   let treeCont: CourseManager;

   before(function () {

   });


   describe("dNode", function () {

       beforeEach(function ()  {
           treeCont = new CourseManager();
       });

       it ("should accept data", async function () {
           await treeCont.initialize();
           return expect(treeCont.courses).to.equal("");
       })

   });

});