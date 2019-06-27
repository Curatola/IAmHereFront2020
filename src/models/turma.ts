

export class Turma {
    id: number;
    nome: string;
    ano: string;
    semestre: string;
    inscricoes_aberta: boolean;

    constructor(id: number, nome: string, ano: string, semestre: string, inscricoes_aberta: boolean) {
        this.id = id;
        this.nome = nome;
        this.ano = ano;
        this.semestre = semestre;
        this.inscricoes_aberta = inscricoes_aberta;
    }
}
