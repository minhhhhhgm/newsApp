
export class ItemCategory {
    name = "ItemCategory";
    props = {
        endpoint: "?string",
        text: "?string",
        mail: "?string",
        isShow: "?boolean",
    };
}

export class CategoryModel {

    name = "Category";
    props = {
        listCategory: '[]#ItemCategory',
        email: 'string'
    }
}