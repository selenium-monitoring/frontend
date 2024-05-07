import * as t from "io-ts"

// For basic preview information when uploading
// Based on the recent site model of selenium-ide:
// https://github.com/SeleniumHQ/selenium-ide/blob/a8420eb6ba60fa7453927f23e120b8bc52a8a0f9/packages/side-model/src/types.ts
export const SideFile = t.type({
    id: t.string,
    version: t.union([t.literal('1.0') , t.literal('1.1') , t.literal('2.0') , t.literal('3.0')]),
    name: t.string,
    url: t.string,
    urls: t.array(t.string),
    plugins: t.array(t.string),
    tests: t.array(t.any),
    suites: t.array(t.type({
        id: t.string,
        name: t.string,
        timeout: t.number,
        tests: t.array(t.string)
    })),
})
export type SideFileType = t.TypeOf<typeof SideFile>