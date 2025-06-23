import type { Media } from '@/payload-types'

export const strpsMetaImage: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'STRPS Website Screenshot',
  caption: {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Screenshot of the STRPS Website',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  },
}

// This file defines the metadata for the STRPS website meta image.
// The actual image file should be placed in the same directory as this file.
// The image will be used as the meta image for the STRPS website project.
