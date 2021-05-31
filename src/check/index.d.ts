export declare function isDirectory(fileName: string): string;
export declare function isFile(fileName: string): string;
export declare function check(fileName?: string, condition?: RegExp): string;
export declare function checkRule(condition?: RegExp): (fileName: string) => string;
export declare function fileCheck(condition?: RegExp): (fileName: string) => string;
