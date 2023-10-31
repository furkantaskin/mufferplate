interface configOptions{
    bundle: boolean,
    color: boolean,
    logLevel: 'error' | 'warning' | 'info',
    sourcemap: false | 'inline',
    splitting: boolean,
    minify: boolean,
    chunkNames: string,
    plugins: Array<any>,
    entryPoints: Array<string>,
    outdir: string,
    treeshaking: boolean,
    signed: boolean,
    meta: boolean
}
export declare interface MufferConfig extends configOptions{
    dev: Partial<configOptions>,
    build: Partial<configOptions>
}