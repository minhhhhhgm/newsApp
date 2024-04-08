export interface NewsType{
    title: string,
    link : string,
    author: string,
    titleNews: string,
    description: string,
    pubDate: string,
}


export interface Article {
    authors: any[];
    categories: any[];
    content?: string;
    description: string;
    enclosures: any[];
    id: string;
    itunes: {
        authors: any[];
        block?: boolean;
        duration?: number;
        explicit?: boolean;
        image?: string;
        isClosedCaptioned?: boolean;
        order?: number;
        subtitle?: string;
        summary?: string;
    };
    links: Array<{
        rel: string;
        url: string;
    }>;
    published: string;
    title: string;
}

