export class Chamada {
    id: number
    dateHour: number
    dateStr: string
    dateShort: string
    timeStr: string
    conteudo: string
    
    constructor (id: number, dateHour: number, conteudo: string){
        this.id = id;
        this.dateHour = dateHour * 1000;
        this.dateStr = this.getDateStr();
        this.dateShort = this.getDateShort();
        this.timeStr = this.getTimeStr();
        this.conteudo = conteudo;
    }

    getDateStr(){
        let options={month:'long',day:'2-digit'}
        return new Date(this.dateHour).toLocaleDateString('pt-BR',options);
    }

    getDateShort(){
        let options={month:'2-digit',day:'2-digit'}
        return new Date(this.dateHour).toLocaleDateString('pt-BR',options);
    }

    getTimeStr(){
        let options={hour:'2-digit',minute:'2-digit'}
        return new Date(this.dateHour).toLocaleTimeString('pt-BR',options);
    }
}