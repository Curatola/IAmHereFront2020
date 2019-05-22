import { Aluno } from './aluno';
export class Presenca {
    id: number
    isPresent:boolean
    aluno:Aluno

    constructor (id: number,isPresent:boolean,aluno:Aluno){
        this.id = id;
        this.isPresent = isPresent;
        this.aluno =aluno;
    }
}