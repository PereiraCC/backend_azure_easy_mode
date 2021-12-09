
class Category {

    // Properties
    private id   : string;
    private name : string;

    // Initial Category data
    constructor(id: string, name : string) {
        this.id = id;
        this.name = name;
    }

    fromJson() {
        return {
            "id"   : this.id,
            "name" : this.name
        }
    }
}

export default Category;