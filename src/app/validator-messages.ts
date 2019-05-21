export class ValidatorMessages{
    public static msgs = {
        "nome": [
            {type: "required", msg: "Nome é obrigatório"},
            {type: "minlength", msg: "Nome deve ter pelo menos 4 caracteres"},
            {type: "pattern", msg: "Nome deve conter apenas letras"}
        ],
        "matricula": [
            {type: "required", msg: "Matricula é obrigatória"},
            {type: "pattern", msg: "Matricula deve conter apenas letras e números"}
        ],
        "email": [
            {type: "required", msg: "Email é obrigatório"},
            {type: "email", msg: "Email não é valido"}
        ],
        "senha": [
            {type: "required", msg: "Senha é obrigatória"},
            {type: "minlength", msg: "Senha dever ter pelo menos 6 caracteres"}
        ],
        "confirm": [
            {type: "required", msg: "Senha é obrigatória"},
            {type: "minlength", msg: "Senha dever ter pelo menos 6 caracteres"},
            {type: "mismatch", msg: "Senha não é a mesma da confirmação"}
        ],
        "codTurma": [
            {type: "required", msg: "Código da turma é obrigatório"}
        ],
        "senhaTurma": [
            {type: "required", msg: "Senha da turma é obrigatório"},
            {type: "minlength", msg: "Senha da turma dever ter pelo menos 4 caracteres"}
        ],
        "ano": [
            {type: "required", msg: "Ano é obrigatório"}
        ],
        "semestre": [
            {type: "required", msg: "Semestre é obrigatório"},
            {type: "max", msg: "Valor máximo é 2"},
            {type: "min", msg: "Valor minimo é 1"}
        ]
    }
}