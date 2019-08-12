import { TestBed } from '@angular/core/testing';
import { RequestService } from './request.service';
describe('RequestService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(RequestService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=request.service.spec.js.map