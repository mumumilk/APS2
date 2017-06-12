export class Tarefa{
    id : string;
    titulo : string;
    descricao : string;
    coordenadas : Coords;
    contato : Contato;
    completada : boolean;
    removida : boolean;
    constructor(){
        this.coordenadas = new Coords();
        this.contato = new Contato();
    }
}

export class Contato{
    nome: any;
    fone: any;
}

export class Coords{
    latitude : number;
    longitude : number;
}