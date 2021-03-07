import Header from '@editorjs/header'; 
import List from '@editorjs/list'; 
import Embed from '@editorjs/embed';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import ImageTool from '@editorjs/image';
import CodeTool from '@editorjs/code'
import {SERVER_URL} from '../../services/config'

export const tools = { 
    header: Header, 
    list: List ,
    image: {
        class: ImageTool,
        config: {
          endpoints: {
            byUrl: `${SERVER_URL}/blogs/url_image_upload`, // endpoint that provides uploading by Url
          }
        }
    },
    code: CodeTool,
    embed: Embed,
    delimiter: Delimiter,
    inlineCode: {
        class: InlineCode,
        shortcut: 'CMD+SHIFT+M',
    },
}