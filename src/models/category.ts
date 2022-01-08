
class Category {

    // Properties
    private id     : string;
    private name   : string;
    private status : boolean;

    // Initial Category data
    constructor(id: string, name : string, status : boolean = true) {
        this.id     = id;
        this.name   = name;
        this.status = status
    }

    fromJson() {
        return {
            "id"     : this.id,
            "name"   : this.name,
            "status" : this.status
        }
    }
}

export default Category;