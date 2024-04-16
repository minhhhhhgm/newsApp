import { CategoryManagementModel } from "../database"


export const dataCategoryVnEpress = () => {
    return [
        { "endpoint": "tin-noi-bat", "text": 'forYou', 'isShow': true },
        { "endpoint": "the-gioi", "text": 'worldNews', 'isShow': true },
        { "endpoint": "thoi-su", "text": 'politics', 'isShow': true },
        { "endpoint": "khoa-hoc", "text": 'technology', 'isShow': true },
        { "endpoint": "so-hoa", "text": 'science', 'isShow': true },
        { "endpoint": "kinh-doanh", "text": 'business', 'isShow': true },
        { "endpoint": "giai-tri", "text": 'entertainment', 'isShow': true },
        { "endpoint": "doi-song", "text": 'food', 'isShow': true },
        { "endpoint": "the-thao", "text": 'thethao', 'isShow': true },
        { "endpoint": "giao-duc", "text": 'giaoduc', 'isShow': true },
        { "endpoint": "suc-khoe", "text": 'suckhoe', 'isShow': true },
        { "endpoint": "gia-dinh", "text": 'doisong', 'isShow': true },
        { "endpoint": "du-lich", "text": 'dulich', 'isShow': true },
        { "endpoint": "oto-xe-may", "text": 'xe', 'isShow': true },
        { "endpoint": "y-kien", "text": 'ykien', 'isShow': true },
        { "endpoint": "tam-su", "text": 'tamsu', 'isShow': true },
    ]
}

export const dataCategoryTuoiTre = () => {
    return [
        { "endpoint": "tin-noi-bat", "text": 'forYou', 'isShow': true },
        { "endpoint": "the-gioi", "text": 'worldNews', 'isShow': true },
        { "endpoint": "thoi-su", "text": 'politics', 'isShow': true },
        { "endpoint": "khoa-hoc", "text": 'technology', 'isShow': true },
        { "endpoint": "so-hoa", "text": 'science', 'isShow': true },
        { "endpoint": "kinh-doanh", "text": 'business', 'isShow': true },
        { "endpoint": "giai-tri", "text": 'entertainment', 'isShow': true },
        { "endpoint": "doi-song", "text": 'food', 'isShow': true },
        { "endpoint": "the-thao", "text": 'thethao', 'isShow': true },
        { "endpoint": "giao-duc", "text": 'giaoduc', 'isShow': true },
        { "endpoint": "suc-khoe", "text": 'suckhoe', 'isShow': true },
        { "endpoint": "thu-gian", "text": 'thugian', 'isShow': true },
        { "endpoint": "du-lich", "text": 'dulich', 'isShow': true },
        { "endpoint": "xe", "text": 'xe', 'isShow': true },
        { "endpoint": "gia-that", "text": 'giathat', 'isShow': true },
    ]
}

export const handleSaveCategory = (vnExpress: string, tuoiTre: string, email: string) => {
    const isExist = CategoryManagementModel.get({ email: email });
    if (isExist) {
        return;
    }
    CategoryManagementModel.insert({
        vnExpress: vnExpress,
        tuoiTre: tuoiTre,
        email: email
    })
    console.log('Save');

}