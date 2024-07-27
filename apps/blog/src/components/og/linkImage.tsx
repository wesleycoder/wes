import fs from 'node:fs'
import path from 'node:path'
import satori, { type SatoriOptions } from 'satori'
import astroBgImage from './astro-bg.png'
import meImg from './me.png'

const AachenFontPath = path.resolve('./public/fonts/aachen.woff')
const AachenFont = fs.readFileSync(AachenFontPath)

const defaultOptions = {
  width: 1200,
  height: 630,
  fonts: [
    {
      name: 'Aachen',
      data: AachenFont,
      style: 'normal',
    },
  ],
} as const satisfies SatoriOptions

type Props = {
  title?: string | null
  description?: string | null
  url?: string
  bgUrl?: string | null
  width: number
  height: number
  host: string
}
const OgLink = ({
  title,
  description,
  bgUrl,
  url = 'https://guima.dev',
  host = 'https://guima.dev',
  width = 1200,
  height = 630,
}: SatoriOptions & Props) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 48,
        padding: 48,
        backgroundColor: 'black',
        color: 'white',
        width: '100%',
        height: '100%',
      }}
    >
      <img
        src={bgUrl ?? `${host}${astroBgImage.src}`}
        alt={title ?? 'Wés Guima'}
        width={width}
        height={height}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={`${host}${meImg.src}`} alt="Wés Guima" width={500} height={500} style={{}} />
      </div>
      <div
        style={{
          display: 'flex',
          flex: 2,
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h1 style={{ fontFamily: 'Aachen', fontSize: 72, lineHeight: 1 }}>
            {title ?? 'Wés Guima'}
          </h1>
          {description && (
            <p style={{ fontFamily: 'Aachen', fontSize: 32, lineHeight: 1 }}>{description}</p>
          )}
        </div>
        <p style={{ fontFamily: 'Aachen', fontSize: 16, lineHeight: 1 }}>{url}</p>
      </div>
    </div>
  )
}

type GetLinkOptions = Optional<SatoriOptions & Props, keyof SatoriOptions | 'width' | 'height'>

export const getLinkImage = async (props: GetLinkOptions) => {
  return await satori(<OgLink {...defaultOptions} {...props} />, {
    ...defaultOptions,
    ...props,
  })
}

// TODO: move to @pkgs/utils
type Optional<T, K extends keyof T> = Pretty<Omit<T, K> & Pick<Partial<T>, K>>
type Pretty<T> = { [K in keyof T]: T[K] }
