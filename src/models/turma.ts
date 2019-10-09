

export class Turma {
    id: number;
    nome: string;
    ano: string;
    semestre: string;
    inscricoesAberta: boolean;
    codAcademico: number;

    constructor(id: number, nome: string, ano: string, semestre: string, inscricoesAberta: boolean, codAcademico: number) {
        this.id = id;
        this.nome = nome;
        this.ano = ano;
        this.semestre = semestre;
        this.inscricoesAberta = inscricoesAberta;
        this.codAcademico = codAcademico;
    }
}
