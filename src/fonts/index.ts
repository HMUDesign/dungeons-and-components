/* Main Font */
import BookSanityRegular from "./BookSanity/BookSanity-Regular.otf"
import BookSanityBold from "./BookSanity/BookSanity-Bold.otf"
import BookSanityItalic from "./BookSanity/BookSanity-Italic.otf"
import BookSanityBoldItalic from "./BookSanity/BookSanity-Bold-Italic.otf"

/* Headers */
import MrJeeves from "./MrJeeves/MrJeeves.woff"
import MrJeeves2 from "./MrJeeves/MrJeeves.woff2"

/* Notes and Tables */
import ScalySans from "./ScalySans/ScalySans.woff"
import ScalySans2 from "./ScalySans/ScalySans.woff2"
import ScalySansSmallCaps from "./ScalySans/ScalySans-SmallCaps.woff"
import ScalySansSmallCaps2 from "./ScalySans/ScalySans-SmallCaps.woff2"

/* Fancy First Letter */
import Solberry from "./Solberry/Solberry.woff"
import Solberry2 from "./Solberry/Solberry.woff2"

const fonts: Record<
  string,
  Array<{
    files: string[]
    bold?: boolean
    italic?: boolean
  }>
> = {
  BookSanity: [
    { files: [BookSanityRegular] },
    { files: [BookSanityBold], bold: true },
    { files: [BookSanityItalic], italic: true },
    { files: [BookSanityBoldItalic], bold: true, italic: true },
  ],
  MrJeeves: [{ files: [MrJeeves, MrJeeves2] }],
  ScalySans: [{ files: [ScalySans, ScalySans2] }],
  ScalySansSmallCaps: [{ files: [ScalySansSmallCaps, ScalySansSmallCaps2] }],
  Solberry: [{ files: [Solberry, Solberry2] }],
}

const formats = {
  otf: "opentype",
  woff2: "woff2",
  woff: "woff",
}

export default fonts

export function getFormat(file: string): string {
  const index = file.lastIndexOf(".")
  const ext = file.slice(index + 1) as keyof typeof formats
  return formats[ext]
}
