import { Vocative } from "../lib/Vocative";

describe('Testing Vocative methods', () => {

	var v: Vocative;

	beforeEach(() => {
        v = new Vocative();
    });

    it('should return latin Vocative', async () => {
        let vocative = await v.make('Vuk');
        expect(vocative).toEqual('Vuče');
        expect(v.getCyrillic()).toBe(false);
    });

    it('should return cyrilic Vocative', async () => {
        let vocative = await v.make('Вук');
        expect(vocative).toEqual('Вуче');
        expect(v.getCyrillic()).toBe(true);
    });

    it('should return latin Vocative from cases', async () => {
        let vocative = await v.make('Mirjana');
        expect(vocative).toEqual('Mirjana');
        expect(v.getCyrillic()).toBe(false);
    });

    it('should return cyrilic Vocative from cases', async () => {
        let vocative = await v.make('Петар');
        expect(vocative).toEqual('Петре');
        expect(v.getCyrillic()).toBe(true);
    });

    it('should return cyrilic Vocative buy synchronously', () => {
        let vocative = v.call('Вук');
        expect(vocative).toEqual('Вуче');
        expect(v.getCyrillic()).toBe(true);
    });

    it('should return cyrilic Vocative from cases syncrhonously', () => {
        let vocative = v.call('Петар');
        expect(vocative).toEqual('Петре');
        expect(v.getCyrillic()).toBe(true);
    });

    it('should return latin Vocative but synchronously', () => {
        let vocative = v.call('Vuk');
        expect(vocative).toEqual('Vuče');
        expect(v.getCyrillic()).toBe(false);
    });

    it('should return latin Vocative but synchronously from exceptions', () => {
        let vocative = v.callV2('Vuk');
        expect(vocative).toEqual('Vuče');
        expect(v.getCyrillic()).toBe(false);
    });

    it('should return latin Vocative but synchronously from rules', () => {
        let vocative = v.callV2('Петар');
        expect(vocative).toEqual('Петре');
        expect(v.getCyrillic()).toBe(true);
    });

    it('should return latin Vocative from rules', () => {
        let vocative = v.callV2('Mirjana');
        expect(vocative).toEqual('Mirjana');
        expect(v.getCyrillic()).toBe(false);
    });
});