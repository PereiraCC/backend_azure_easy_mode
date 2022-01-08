
class Unit {

    private id        : string;
    private id_module : string;
    private title     : string;
    private document  : string;
    private status    : boolean;

    constructor( id: string, id_module: string, title : string, document: string = '', status: boolean = true ){
        this.id        = id;
        this.id_module = id_module;
        this.title     = title;
        this.document  = document;
        this.status    = status;
    }

    fromJson() {
        return {
            "id"        : this.id,
            "id_module" : this.id_module,
            "tilte"     : this.title,
            "document"  : this.document,
            "status"    : this.status,
        }
    }

}

export default Unit;