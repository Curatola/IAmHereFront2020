import { TestBed, inject } from '@angular/core/testing';
import { CanDeactivateGuard } from './can-deactivate.guard';
describe('CanDeactivateGuard', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [CanDeactivateGuard]
        });
    });
    it('should ...', inject([CanDeactivateGuard], function (guard) {
        expect(guard).toBeTruthy();
    }));
});
//# sourceMappingURL=can-deactivate.guard.spec.js.map