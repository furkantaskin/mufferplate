type baseLogs = "info" | "error" | "warning" | "success" | "default";


export interface UserJsBaseConfig {
  bundle?: boolean,
  logLevel?: 'verbose' | 'debug' | 'info' | 'warning' | 'error' | 'silent',
  outdir?: string,
  entryPoints?: string[],
  splitting?: boolean,
  format?: "iife" | "cjs" | "esm",
  chunkNames?: string,
  treeShaking?: boolean,
  signed?: boolean,
  metafile?: boolean,
  obfuscate?: boolean, 
  inject?: string[],
  sourcemap?: boolean | 'linked' | 'inline' | 'external' | 'both',
  banner?: { [type: string]: string } | false,
  minify?: boolean,
  legalComments?: 'none' | 'inline' | 'eof' | 'linked' | 'external',
}

export interface UserJsOptions extends UserJsBaseConfig{
    enable?: boolean,
    dev?: UserJsBaseConfig,
    build?: UserJsBaseConfig
}

export interface UserSassBaseConfig{
    inputFile?: string,
    outputFile?: string,
    inject?: string,
    depsDir?: string[],
    polling?: number,
    watchDeps?: boolean
    sourcemap?: boolean,
    style?: "compressed" | "expanded",
    charset?: boolean,
    verbose?: boolean,
    signed?: boolean,
}

export interface UserSassOptions extends UserSassBaseConfig{
    enable?: boolean,
    dev?: Partial<UserSassBaseConfig>,
    build?: Partial<UserSassBaseConfig>
}

export interface UserTwConfig {
    enable?: boolean,
    twInputFile?: string,
    twOutputFile?: string,
    postConfigPath?: string,
    useScss?: boolean,
    scssOutput?: string,
    sass?: UserSassBaseConfig,
}

export interface UserPurgeConfig {
    postConfigPath?: string,
    [key: string]: any
}


export declare interface UserConfig {
    js?: UserJsOptions,
    sass?: UserSassOptions,
    tailwind?: UserTwConfig,
    purge?: UserPurgeConfig
}