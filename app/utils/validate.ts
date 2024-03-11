import { Article } from "../screen/home/home"

export function toASCII(chars: any) {
    let ascii = ""
    for (var i = 0, l = chars.length; i < l; i++) {
        let c = chars[i].charCodeAt(0)
        if (c === 12288) {
            c = chars[i].charCodeAt(0) - 12256
        }
        if (c >= 0xff00 && c <= 0xffef) {
            c = 0xff & (c + 0x20)
        }
        ascii += String.fromCharCode(c)
    }

    return ascii
}

export function searchData(data: any, txt: any) {
    const arr = data?.filter((i : any) => {
        if (i?.title) {
            return toASCII(i?.title).toLowerCase().includes(toASCII(txt)?.toLowerCase())
        }
        return i
    })
    return arr
}

export function convertUrl(item : Article){
    const imgSrcRegex = /<img src="([^"]+)"/;
        const imgSrcMatch = item.description.match(imgSrcRegex);
        let imgSrc = '';
        if (imgSrcMatch && imgSrcMatch[1]) {
            imgSrc = imgSrcMatch[1];
        }
        return imgSrc
}