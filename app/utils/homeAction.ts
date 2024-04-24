import { nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";
import Share from "react-native-share";
import { auth } from "../../App";
import { Bookmark, Viewed } from "../database";
import { addBookmarkApp } from "../store/newsSlice";
import { store } from "../store/store";
import { extractImageUrl, extractString } from "./validate";


export const handleSaveBookMark = (type: string, title: string, author: string, time: string, url: string, image: string, email: string) => {
    console.log('OK');
    const item = Bookmark.get({ title: title, email: email });
    if (item) {
        // Toast.show('The post has been saved', Toast.LONG);
        return;
    }
    const params = {
        type: type,
        title: title,
        author: author,
        time: time,
        image: image,
        url: url,
        email: email
    }
    const isInsert = Bookmark.insert(params)
    if(isInsert){
        store.dispatch(addBookmarkApp(nanoid()))
    }
    // Toast.show('Saved to bookmark', Toast.SHORT);
    return isInsert

}

export type Category = {
    endpoint: string; text: string; mail: string; isShow: boolean | number;
}

// export const handleSaveCategory = (email: string, data: Category[]) => {
//     console.log('OK');

//     const item1 = Category.get({ email: email });
//     if (item1) {
//         return;
//     }
//     const insertItems = ItemCategory.insert(data);

//     const params = {
//         listCategory: insertItems,
//         email: email
//     }
//     Category.insert(params)
// }

// export const handleGetCategory = async (email: string) => {
//     const item1 = await Category.get({ email: email });
//     if (item1) {
//         return item1;
//     }
// }


export const handleSaveHistory = (type: string, title: string, author: string, time: string, url: string, image: string, email: string) => {
    
    const item1 = Viewed.get({ title: title, email: email });
    if (item1) {
        const now = moment();
        const formattedTime = moment(now).format('YYYY-MM-DD HH:mm:ss');
        Viewed.update(item1, { timeWatched: formattedTime })
        return;
    }
    const params = {
        type: type,
        title: title,
        author: author,
        timeWatched: time,
        image: image,
        url: url,
        email: email
    }
    Viewed.insert(params)
    console.log('SAVE-HISTORY');
}



// export const saveCate = async (dataC: any, mail: string) => {
//     console.log("SAVE data category", dataC);

//     const item1 = await ItemCategory.get({ mail: mail });
//     if (item1) {
//         return;
//     }
//     const filteredData = dataC.map((item: any) => {
//         const { id, ...rest } = item;
//         return rest;
//     });
//     const isInsert = ItemCategory.insert(dataC);
//     return isInsert

// }



export const shareImage = (link: string) => {
    const urlNews: string = link
    const options = {
        url: urlNews,
    }
    Share.open(options)
        .then((r) => {
            console.log(r)
        })
        .catch((e) => {
            e && console.log(e)
        })
}

export const getDataRss = async (domain: string) => {
    const res = await axios.get(`https://${domain}/rss/tin-noi-bat.rss`)
    const items = res.data.match(/<item>(.*?)<\/item>/gs);
    const parsedItems = items?.map((item: string) => ({
        title: extractString(item, '<title>', '</title>'),
        link: extractString(item, '<link>', '</link>'),
        description: extractString(item, '<description>', '</description>'),
        pubDate: extractString(item, '<pubDate>', '</pubDate>'),
        imageUrl: extractImageUrl(item),
    }));
    return parsedItems
}

export const getDataRssByTitle = async (domain: string, endpoint: string) => {
    const res = await axios.get(`https://${domain}/rss/${endpoint}.rss`)
    const items = res.data.match(/<item>(.*?)<\/item>/gs);
    const parsedItems = items?.map((item: string) => ({
        title: extractString(item, '<title>', '</title>'),
        link: extractString(item, '<link>', '</link>'),
        description: extractString(item, '<description>', '</description>'),
        pubDate: extractString(item, '<pubDate>', '</pubDate>'),
        imageUrl: extractImageUrl(item),
    }));
    return parsedItems
}


export const dataInterest =
    [
        { "endpoint": "tin-moi-nhat", "text": 'forYou', 'mail': auth.currentUser?.email, 'isShow': true },
        { "endpoint": "the-gioi", "text": 'worldNews', 'mail': auth.currentUser?.email, 'isShow': true },
        { "endpoint": "thoi-su", "text": 'politics', 'mail': auth.currentUser?.email, 'isShow': true },
        { "endpoint": "khoa-hoc", "text": 'technology', 'mail': auth.currentUser?.email, 'isShow': true },
        { "endpoint": "so-hoa", "text": 'science', 'mail': auth.currentUser?.email, 'isShow': true },
        { "endpoint": "kinh-doanh", "text": 'business', 'mail': auth.currentUser?.email, 'isShow': true },
        { "endpoint": "giai-tri", "text": 'entertainment', 'mail': auth.currentUser?.email, 'isShow': true },
        { "endpoint": "doi-song", "text": 'food', 'mail': auth.currentUser?.email, 'isShow': true }
    ]

export const dataInterests = (mail: string) => {
    return [
        { "endpoint": "tin-noi-bat", "text": 'forYou', 'mail': mail, 'isShow': true },
        { "endpoint": "the-gioi", "text": 'worldNews', 'mail': mail, 'isShow': true },
        { "endpoint": "thoi-su", "text": 'politics', 'mail': mail, 'isShow': true },
        { "endpoint": "khoa-hoc", "text": 'technology', 'mail': mail, 'isShow': true },
        { "endpoint": "so-hoa", "text": 'science', 'mail': mail, 'isShow': true },
        { "endpoint": "kinh-doanh", "text": 'business', 'mail': mail, 'isShow': true },
        { "endpoint": "giai-tri", "text": 'entertainment', 'mail': mail, 'isShow': true },
        { "endpoint": "doi-song", "text": 'food', 'mail': mail, 'isShow': true }
    ]
}    