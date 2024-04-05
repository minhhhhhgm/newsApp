import { Todos } from "../database";
import Toast from 'react-native-simple-toast';
import Share from "react-native-share";
import { useMemo } from "react";
import axios from "axios";
import { extractImageUrl, extractString } from "./validate";


export const handleSaveBookMark = async (type: string, title: string, author: string, time: string, url: string, image: string, email: string) => {
    console.log('OK');
    const item1 = await Todos.get({ title: title });
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
    Todos.insert(params)
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


export const dataInterest = [{ "endpoint": "tin-moi-nhat", "text": "For You" },
{ "endpoint": "the-gioi", "text": "World News" },
{ "endpoint": "thoi-su", "text": "Politics" },
{ "endpoint": "khoa-hoc", "text": "Technology" },
{ "endpoint": "so-hoa", "text": "Science" },
{ "endpoint": "kinh-doanh", "text": "Business" },
{ "endpoint": "giai-tri", "text": "Entertainment" },
{ "endpoint": "doi-song", "text": "Food" }]