import { FormGroup } from "@angular/forms";

export class ConfirmSenhaValidator{
    static isMatching(control: FormGroup){
        let senha = control.get("senha").value;
        let confirm = control.get("confirm");
        let erros = confirm.errors ? confirm.errors : {};
        if (senha !== confirm.value){
            erros.mismatch = true;
            confirm.setErrors(erros);
            return erros;
        } 
        else {
            erros = Object.keys(erros).length == 0 ? null : erros
            confirm.setErrors(erros);
            return erros;
        }
    }
}