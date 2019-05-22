

export class Turma {
    id: number
    nome: string
    ano: string
    semestre: string

    constructor (id: number, nome: string, ano: string, semestre: string){
        this.id = id;
        this.nome = nome;
        this.ano =ano;
        this.semestre =semestre;
    }
}