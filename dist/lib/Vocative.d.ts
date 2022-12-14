export declare class Vocative {
    private vokativ;
    private cyrillic;
    private exceptionCases;
    private source;
    getSource(): string;
    getCyrillic(): boolean;
    getExceptions(): Array<String>;
    constructor();
    /**
    * Method to make sure provided name is in correct case (first letter of uppercase)
    */
    private capitalizeName;
    /**
    * Method transliterates cyrilic to latin and viceversa
    */
    private transliterate;
    /**
    * Implementation of PHP strtr
    */
    private strtr;
    /**
     * @param string $input
     * @return string
     */
    private removeExtras;
    private isCyrilicSync;
    private isCyrillic;
    make(nominativ: string): Promise<string>;
    call(nominativ: string): string;
}
declare const _default: Vocative;
export default _default;
