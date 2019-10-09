import { FormGroup } from '@angular/forms';

export class ConfirmSenhaValidator{
    static isMatching(control: FormGroup){
        const senhaControl = control.get('senha') || control.get('senhaTurma')
        const senha = senhaControl.value;
        const confirm = control.get('confirm') || control.get('confirmSenhaTurma');
        let erros = confirm.errors ? confirm.errors : {};
        if (senha !== confirm.value){
            erros.mismatch = true;
            confirm.setErrors(erros);
            return erros;
        } else {
            erros = Object.keys(erros).length === 0 ? null : erros;
            confirm.setErrors(erros);
            return erros;
        }
    }
}