import Header from '@editorjs/header'; 
import List from '@editorjs/list'; 
import SimpleImage from '@editorjs/simple-image';
import Embed from '@editorjs/embed';
import Quote from '@editorjs/quote';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';

export const tools = { 
    header: Header, 
    list: List ,
    image: SimpleImage,
    embed: Embed,
    quote: Quote,
    delimiter: Delimiter,
    inlineCode: {
        class: InlineCode,
        shortcut: 'CMD+SHIFT+M',
    },
}