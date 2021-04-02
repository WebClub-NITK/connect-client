import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import ImageTool from '@editorjs/image';
import CodeTool from '@editorjs/code'
import Alert from 'editorjs-alert';
import { SERVER_URL } from '../../services/config'

export const tools = {
    header: {
        class: Header,
        inlineToolbar: true
    },
    list: List,
    image: {
        class: ImageTool,
        config: {
            endpoints: {
                byUrl: `${SERVER_URL}/blogs/url_image_upload`, // endpoint that provides uploading by Url
            }
        }
    },
    alert: {
        class: Alert,
        inlineToolbar: true,
        config: {
          defaultType: 'primary',
          messagePlaceholder: 'Add a quote, or whatever.',
        },
        toolbox: {
            title: 'Quote',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="20" height="20" viewBox="0 0 452.000000 452.000000" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,452.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
            <path d="M638 3936 c-102 -37 -182 -109 -227 -205 l-26 -56 0 -1230 0 -1230 27 -55 c33 -67 107 -144 168 -175 72 -36 139 -45 350 -45 l200 0 0 -377 0 -378 378 378 377 377 952 0 c988 0 1016 1 1097 42 60 31 135 107 170 173 l31 60 0 1230 0 1230 -33 67 c-37 75 -103 142 -179 179 l-48 24 -1600 2 c-1299 2 -1607 0 -1637 -11z m3132 -1486 l0 -1130 -1510 0 -1510 0 0 1130 0 1130 1510 0 1510 0 0 -1130z"/>
            <path d="M1320 2635 l0 -375 185 -2 185 -3 -185 -277 c-102 -153 -185 -280 -185 -283 0 -3 83 -5 185 -5 l185 0 190 285 190 285 0 375 0 375 -375 0 -375 0 0 -375z"/>
            <path d="M2450 2635 l0 -375 185 -2 185 -3 -185 -277 c-102 -153 -185 -280 -185 -283 0 -3 83 -5 185 -5 l185 0 190 285 190 285 0 375 0 375 -375 0 -375 0 0 -375z"/>
            </g>
            </svg>`
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