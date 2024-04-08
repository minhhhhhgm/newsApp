import { Bookmark, Todos } from "../database";
import Toast from 'react-native-simple-toast';
import Share from "react-native-share";
import { useMemo } from "react";
import axios from "axios";
import { extractImageUrl, extractString } from "./validate";
import { enTrsl } from "../i18n/en";


export const handleSaveBookMark = async (type: string, title: string, author: string, time: string, url: string, image: string, email: string) => {
    console.log('OK');
    const item1 = await Bookmark.get({ title: title });
    if (item1) {

        Toast.show('The post has been saved', Toast.LONG);
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
    Bookmark.insert(params)
    Toast.show('Saved to bookmark', Toast.LONG);
    // handlecloseVisible()
}


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
    // handlecloseVisible()
}

export const getDataRss = async (domain: string) => {
    const res = await axios.get(`https://${domain}/rss/the-gioi.rss`)
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


export const dataInterest = [{ "endpoint": "tin-moi-nhat", "text": 'forYou' },
{ "endpoint": "the-gioi", "text": 'worldNews' },
{ "endpoint": "thoi-su", "text": 'politics' },
{ "endpoint": "khoa-hoc", "text": 'technology' },
{ "endpoint": "so-hoa", "text": 'science' },
{ "endpoint": "kinh-doanh", "text": 'business' },
{ "endpoint": "giai-tri", "text": 'entertainment' },
{ "endpoint": "doi-song", "text": 'food' }]