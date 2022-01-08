
class Module {

    private id          : string;
    private id_category : string;
    private name        : string;
    private status      : boolean;

    constructor(id: string, id_category: string, name: string, status: boolean = true) {
        this.id          = id;
        this.id_category = id_category;
        this.name        = name;
        this.status      = status;
    }

    fromJson() {
        return {
            "id"          : this.id,
            "id_category" : this.id_category,
            "name"        : this.name,
            "status"      : this.status
        }
    }

}

export default Module