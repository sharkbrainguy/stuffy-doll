import { createForgivingSaxParser } from 'tag-soup';
import type { ExtractIframeSrc } from '../infra';

const extractIframeSrc = (html: string): string | undefined => {
  let result: string | undefined;
  const parser = createForgivingSaxParser({
    onStartTag(tag, attrs) {
      if (tag === 'iframe') {
        for (let i = 0; i < attrs.length; i++) {
          const attr = attrs[i];
          if (attr.name === 'src') {
            result = String(attr.value);
            break;
          }
        }
      }
    },
  });
  parser.parse(html);
  return result;
};

export default { extractIframeSrc } as ExtractIframeSrc;
