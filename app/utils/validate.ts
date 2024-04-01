import { Article } from "../type/NewsType"

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
    const arr = data?.filter((i: any) => {
        if (i?.title) {
            return toASCII(i?.title).toLowerCase().includes(toASCII(txt)?.toLowerCase())
        }
        return i
    })
    return arr
}

export function convertUrl(item: Article) {
    const imgSrcRegex = /<img src="([^"]+)"/;
    const imgSrcMatch = item.description.match(imgSrcRegex);
    let imgSrc = '';
    if (imgSrcMatch && imgSrcMatch[1]) {
        imgSrc = imgSrcMatch[1];
    }
    return imgSrc
}

export const extractString = (text: string, startTag: string, endTag: string) => {
    const startIndex = text.indexOf(startTag) + startTag.length;
    const endIndex = text.indexOf(endTag, startIndex);
    return text.substring(startIndex, endIndex);
};

export const extractImageUrl = (item: string) => {
    const enclosureStartIndex = item.indexOf('<enclosure url="') + '<enclosure url="'.length;
    const enclosureEndIndex = item.indexOf('"', enclosureStartIndex);
    return item.substring(enclosureStartIndex, enclosureEndIndex);
};

export const extractContentInsideBrackets = (inputString: string): string | null => {
    const startIndex: number = inputString.indexOf('[');
    const endIndex: number = inputString.indexOf(']');
  
    // Kiểm tra xem có đủ cặp dấu "[" và "]" không
    if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
      // Trích xuất nội dung bên trong dấu ngoặc vuông
      const extractedString = inputString.substring(startIndex + 1, endIndex);
      // Kiểm tra nếu chuỗi trích xuất chứa "CDATA[", thì loại bỏ phần này
      if (extractedString.includes('CDATA[')) {
        return extractedString.substring(6); // Loại bỏ "CDATA["
      } else {
        return extractedString;
      }
    } else {
      return inputString;
    }
  };

     export const extractContentInsideSecondBrackets = (inputString: string): string | null => {
        // Tìm vị trí của cặp ngoặc vuông đầu tiên
        const firstStartIndex: number = inputString.indexOf('[');
        const firstEndIndex: number = inputString.indexOf(']');
      
        // Kiểm tra xem có đủ cặp ngoặc vuông không
        if (firstStartIndex === -1 || firstEndIndex === -1 || firstStartIndex >= firstEndIndex) {
          console.error('Invalid input string format.');
          return null;
        }
      
        // Tìm vị trí của cặp ngoặc vuông thứ hai, bắt đầu từ vị trí ngay sau cặp ngoặc vuông đầu tiên
        const secondStartIndex: number = inputString.indexOf('[', firstEndIndex);
        const secondEndIndex: number = inputString.indexOf(']', firstEndIndex);
      
        // Kiểm tra xem có cặp ngoặc vuông thứ hai không
        if (secondStartIndex === -1 || secondEndIndex === -1 || secondStartIndex >= secondEndIndex) {
          console.error('Second pair of brackets not found.');
          return null;
        }
      
        // Trích xuất nội dung bên trong cặp ngoặc vuông thứ hai
        return inputString.substring(secondStartIndex + 1, secondEndIndex);
      };
      
  