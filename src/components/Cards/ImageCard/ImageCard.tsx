import { Media } from '@/components/Media'
import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
} from '@/components/ui/card'
import { Media as TMedia } from '@/payload-types'
import { cn } from '@/utilities/ui'

type ImageCardProps = {
  imagePosition?: 'top' | 'bottom' | 'left' | 'right'
  imageWidth?: string
  imageContainerClassName?: string
  imageClassName?: string
  className?: string
  image?: TMedia | null | undefined | number
  title?: string
  description?: string | null | undefined
  action?: React.ReactNode
}

export const ImageCard: React.FC<ImageCardProps> = ({
  imagePosition = 'top',
  image,
  imageContainerClassName,
  imageClassName,
  className,
  title,
  description,
  action,
}) => {
  const cardClasses = {
    left: 'md:flex-row',
    right: 'md:flex-row-reverse',
    top: 'flex-col',
    bottom: 'flex-col-reverse',
  }

  const imageContainerClasses = {
    left: 'md:w-1/2',
    right: 'md:w-1/2',
    top: 'flex-col',
    bottom: 'flex-col-reverse',
  }

  const cardContentClasses = {
    left: 'sd:p-12 md:w-1/2',
    right: 'sd:p-12 md:w-1/2',
    top: '',
    bottom: '',
  }

  return (
    <Card
      className={cn(
        'p-0 overflow-hidden gap-0 w-full h-full',
        cardClasses[imagePosition],
        className,
      )}
    >
      {typeof image === 'object' && image !== null && (
        <Media
          resource={image}
          fill
          alt={image?.alt}
          className={cn(
            'relative w-full aspect-video',
            imageContainerClasses[imagePosition],
            imageContainerClassName,
          )}
          imgClassName={cn('object-cover w-full h-full', imageClassName)}
        />
      )}
      <CardContent
        className={cn(
          'flex flex-col p-8 gap-4 sm:gap-6 justify-between h-full',
          cardContentClasses[imagePosition],
        )}
      >
        <div className="min-h-0">
          <CardTitle className="text-2xl mb-2 sm:mb-4 sm:text-3xl">{title}</CardTitle>
          <CardDescription className="sm:text-base">{description}</CardDescription>
        </div>
        <CardAction className="self-end">{action}</CardAction>
      </CardContent>
    </Card>
  )
}
