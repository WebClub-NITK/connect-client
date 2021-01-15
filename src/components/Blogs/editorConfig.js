import Header from '@editorjs/header'; 
import List from '@editorjs/list'; 
import Embed from '@editorjs/embed';
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
            byUrl: 'http://localhost:3001/blogs/url_image_upload', // endpoint that provides uploading by Url
          }
        }
    },
    embed: Embed,
    delimiter: Delimiter,
    inlineCode: {
        class: InlineCode,
        shortcut: 'CMD+SHIFT+M',
    },
}