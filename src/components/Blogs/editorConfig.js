import Header from '@editorjs/header'; 
import List from '@editorjs/list'; 
import SimpleImage from '@editorjs/simple-image';
import Embed from '@editorjs/embed';
import Quote from '@editorjs/quote';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import ImageTool from '@editorjs/image';

export const tools = { 
    header: Header, 
    list: List ,
    image: {
        class: ImageTool,
        config: {
          endpoints: {
            byFile: 'http://localhost:3001/blogs/file_image_upload', // backend file uploader endpoint
            byUrl: 'http://localhost:3001/blogs/url_image_upload', // endpoint that provides uploading by Url
          }
        }
    },
    embed: Embed,
    quote: Quote,
    delimiter: Delimiter,
    inlineCode: {
        class: InlineCode,
        shortcut: 'CMD+SHIFT+M',
    },
}