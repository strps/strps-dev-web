import React, { Fragment } from 'react'

import type { Props } from './types'

import { ImageMedia } from './ImageMedia'
import { VideoMedia } from './VideoMedia'

/**
 * A flexible media component that renders either an image or video based on the provided resource.
 * Supports both Payload media objects and static imports through Next.js Image optimization.
 *
 * @param {Object} props - The component props
 * @param {string} [props.alt] - Alternative text for the media
 * @param {string} [props.className] - CSS class for the wrapper element
 * @param {boolean} [props.fill] - Whether to fill the parent container (NextImage only)
 * @param {React.ElementType | null} [props.htmlElement='div'] - HTML element to wrap the media in, or null for no wrapper
 * @param {string} [props.imgClassName] - Additional CSS class for the image element
 * @param {() => void} [props.onClick] - Click handler for the media
 * @param {() => void} [props.onLoad] - Callback when media finishes loading
 * @param {'lazy' | 'eager'} [props.loading='lazy'] - Loading behavior (NextImage only)
 * @param {boolean} [props.priority=false] - Whether to prioritize loading (NextImage only)
 * @param {React.Ref<HTMLImageElement | HTMLVideoElement | null>} [props.ref] - Ref for the media element
 * @param {MediaType | string | number | null} [props.resource] - The media resource to display (Payload media, URL, or static import)
 * @param {string} [props.size] - Size for the media (NextImage only)
 * @param {StaticImageData} [props.src] - Static image data (for static imports)
 * @param {string} [props.videoClassName] - Additional CSS class for video elements
 * @returns {JSX.Element} The rendered media component
 */
export const Media: React.FC<Props> = (props) => {
  const { className, htmlElement = 'div', resource, imgClassName } = props

  const isVideo = typeof resource === 'object' && resource?.mimeType?.includes('video')
  const Tag = htmlElement || Fragment

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className,
          }
        : {})}
    >
      {isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />}
    </Tag>
  )
}
