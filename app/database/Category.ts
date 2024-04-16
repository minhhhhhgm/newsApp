
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


export class TestCategoryModel {

    name = "TestCategoryModel";
    props = {
        listCategory: 'string',
        email: 'string'
    }
}

export class CategoryManagementModel {

    name = "CategoryManagementModel";
    props = {
        vnExpress: 'string',
        tuoiTre: 'string',
        email: 'string'
    }
}