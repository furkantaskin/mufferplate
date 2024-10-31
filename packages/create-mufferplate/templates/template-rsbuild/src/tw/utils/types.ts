import type { ResolvableTo, ScreensConfig } from "tailwindcss/types/config";
import type { DefaultTheme } from "tailwindcss/types/generated/default-theme";



export type ResponsiveKeys = "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "de" | string

export interface DefineConfig {
    isMobileFirst: boolean
    breakpoints: ResolvableTo<ScreensConfig>,
    fontFamily: string,
    spacingUpperLimit: number,
    spacingInterval: number,
    zIndexLimit: number,
    bsBreakpoints?: {
        [key: ResponsiveKeys]: number
    },
    containerMaxWidths: {
        [key: ResponsiveKeys]: number | false
    },
    gridGutter: number,
    numberOfColumns: number,
    enableRtl: boolean,
    disableDefaultColors: boolean,
    customColors: {
        [key: string]: string
    }
}

export type zIndexType = {
    [key: string]: string
}


export type spacingType = DefaultTheme['spacing'] | {
    [key: string]: string
}

export type CustomTwComponent = {
    [key: string]: {
        [key: string]: string
    }
}