var ConfirmSenhaValidator = /** @class */ (function () {
    function ConfirmSenhaValidator() {
    }
    ConfirmSenhaValidator.isMatching = function (control) {
        var senhaControl = control.get("senha") || control.get("senhaTurma");
        var senha = senhaControl.value;
        var confirm = control.get("confirm") || control.get("confirmSenhaTurma");
        var erros = confirm.errors ? confirm.errors : {};
        if (senha !== confirm.value) {
            erros.mismatch = true;
            confirm.setErrors(erros);
            return erros;
        }
        else {
            erros = Object.keys(erros).length == 0 ? null : erros;
            confirm.setErrors(erros);
            return erros;
        }
    };
    return ConfirmSenhaValidator;
}());
export { ConfirmSenhaValidator };
//# sourceMappingURL=confirm-senha-validator.js.map