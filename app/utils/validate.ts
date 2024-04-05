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

  if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
    const extractedString = inputString.substring(startIndex + 1, endIndex);
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
  const firstStartIndex: number = inputString.indexOf('[');
  const firstEndIndex: number = inputString.indexOf(']');

  if (firstStartIndex === -1 || firstEndIndex === -1 || firstStartIndex >= firstEndIndex) {
    console.error('Invalid input string format.');
    return null;
  }

  const secondStartIndex: number = inputString.indexOf('[', firstEndIndex);
  const secondEndIndex: number = inputString.indexOf(']', firstEndIndex);

  if (secondStartIndex === -1 || secondEndIndex === -1 || secondStartIndex >= secondEndIndex) {
    console.error('Second pair of brackets not found.');
    return null;
  }

  return inputString.substring(secondStartIndex + 1, secondEndIndex);
};


export const handleValidateEmail = (input: string) => {
  const isEmty = input.length == 0 ? true : false
  if (isEmty) {
    return `Email is required`
  }
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValid = emailPattern.test(input);
  if (isValid) {
    return null
  }
  return 'Invalid Email'
}

export const handleValidatePass = (input: string) => {
  const isEmty = input.length == 0 ? true : false
  if (isEmty) {
    return `Password is required`
  }
  if (input.length < 6) {
    return 'Password to short'
  }
  return ''
}

export const isValid = (...args : any) => {
  for (let i = 0; i < args.length; i++) {
    if (!args[i]) {
      return false;
    }
  }
  return true;
};
