var Chamada = /** @class */ (function () {
    function Chamada(id, dateHour, conteudo) {
        this.id = id;
        this.dateHour = dateHour * 1000;
        this.dateStr = this.getDateStr();
        this.dateShort = this.getDateShort();
        this.timeStr = this.getTimeStr();
        this.conteudo = conteudo;
    }
    Chamada.prototype.getDateStr = function () {
        var options = { month: 'long', day: '2-digit' };
        return new Date(this.dateHour).toLocaleDateString('pt-BR', options);
    };
    Chamada.prototype.getDateShort = function () {
        var options = { month: '2-digit', day: '2-digit' };
        return new Date(this.dateHour).toLocaleDateString('pt-BR', options);
    };
    Chamada.prototype.getTimeStr = function () {
        var options = { hour: '2-digit', minute: '2-digit' };
        return new Date(this.dateHour).toLocaleTimeString('pt-BR', options);
    };
    return Chamada;
}());
export { Chamada };
//# sourceMappingURL=chamada.js.map