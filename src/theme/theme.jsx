import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    fonts: {
        heading: `'Noto Sans KR', sans-serif`,
        body: `'Noto Sans KR', sans-serif`,
    },
    colors: {
        brand: {
          50: "#F2EFE7",
          100: "#9ACBD0",
          200: "#48A6A7",
          300: "#006A71"
        },
      }
})

export default theme;