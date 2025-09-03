import azbuka from './Azbuka';
import * as _ from 'lodash';
import * as striptags from 'striptags';

export class Vocative {

	private vokativ: string = '';
	private cyrillic: boolean = false;
	private exceptionCases: { [key: string]: string } = {};
	private source: string = '';

	getSource(): string {
		return this.source;
	}

	getCyrillic(): boolean {
		return this.cyrillic;
	}

	getExceptions(): { [key: string]: string } {
		return this.exceptionCases;
	}

	constructor() {
		const dictionary = {
			"ŽARKO": "ŽARKO",
			"ALEKSA": "ALEKSA",
			"ALEKSANDAR": "ALEKSANDRE",
			"ALEKSANDRA": "ALEKSANDRA",
			"ANA": "ANA",
			"BILJANA": "BILJANA",
			"BOBAN": "BOBANE",
			"BOGOLJUB": "BOGOLJUBE",
			"BOJAN": "BOJANE",
			"BORIS": "BORISE",
			"BORISLAV": "BORISLAVE",
			"BORIVOJE": "BORIVOJE",
			"BRANKO": "BRANKO",
			"DARKO": "DARKO",
			"DIMITRIJE": "DIMITRIJE",
			"ĐORĐE": "ĐORĐE",
			"DRAGAN": "DRAGANE",
			"DRAGANA": "DRAGANA",
			"DRAGICA": "DRAGICE",
			"DRAGO": "DRAGO",
			"DRAGOLJUB": "DRAGOLJUBE",
			"DRAGOMIR": "DRAGOMIRE",
			"DRAGOSLAV": "DRAGOSLAVE",
			"DUŠAN": "DUŠANE",
			"DUŠICA": "DUŠICE",
			"FAHRUDIN": "FAHRUDINE",
			"FARUK": "FARUČE",
			"FILIP": "FILIPE",
			"GOJKO": "GOJKO",
			"GORAN": "GORANE",
			"GORDANA": "GORDANA",
			"IVAN": "IVANE",
			"IVICA": "IVICE",
			"JASMINA": "JASMINA",
			"JELENA": "JELENA",
			"JOVAN": "JOVANE",
			"JOVICA": "JOVICE",
			"JUGOSLAV": "JUGOSLAVE",
			"KATARINA": "KATARINA",
			"LJILJANA": "LJILJANA",
			"LJUBIŠA": "LJUBIŠA",
			"LJUBICA": "LJUBICE",
			"MAJA": "MAJO",
			"MARICA": "MARICE",
			"MARIJANA": "MARIJANA",
			"MARINA": "MARINA",
			"MARKO": "MARKO",
			"MIHAILO": "MIHAILO",
			"MIHAJLO": "MIHAJLO",
			"MILADIN": "MILADINE",
			"MILAN": "MILANE",
			"MILE": "MILE",
			"MILENA": "MILENA",
			"MILICA": "MILICE",
			"MILOŠ": "MILOŠE",
			"MILOJKO": "MILOJKO",
			"MILOMIR": "MILOMIRE",
			"MIODRAG": "MIODRAĐE",
			"MIRKO": "MIRKO",
			"MIROLJUB": "MIROLJUBE",
			"MOMČILO": "MOMČILO",
			"MOMIR": "MOMIRE",
			"MUHAMED": "MUHAMEDE",
			"NEBOJŠA": "NEBOJŠA",
			"NEMANJA": "NEMANJA",
			"NENAD": "NENADE",
			"OSMAN": "OSMANE",
			"OSTOJA": "OSTOJA",
			"PAVLE": "PAVLE",
			"PETAR": "PETRE",
			"PREDRAG": "PREDRAŽE",
			"RADOJICA": "RADOJICE",
			"RADOMIR": "RADOMIRE",
			"RADOSLAV": "RADOSLAVE",
			"RASTKO": "RASTKO",
			"SANJA": "SANJA",
			"SENAD": "SENADE",
			"SLAĐAN": "SLAĐAN",
			"SLAĐANA": "SLAĐANA",
			"SLAVICA": "SLAVICE",
			"SLOBODAN": "SLOBODANE",
			"SNEŽANA": "SNEŽANA",
			"SONJA": "SONJA",
			"SRBOLJUB": "SRBOLJUBE",
			"SRĐAN": "SRĐANE",
			"STOJAN": "STOJANE",
			"STOJANKA": "STOJANKA",
			"SVETLANA": "SVETLANA",
			"TANJA": "TANJA",
			"TATJANA": "TATJANA",
			"TOMISLAV": "TOMISLAVE",
			"VERA": "VERA",
			"VESNA": "VESNA",
			"VLADIMIR": "VLADIMIRE",
			"VLADISLAV": "VLADISLAVE",
			"VOJIN": "VOJINE",
			"VOJISLAV": "VOJISLAVE",
			"VOJKAN": "VOJKANE",
			"VUK": "VUČE",
			"ZORAN": "ZORANE",
			"ZORANA": "ZORANA",
			"MILUTIN": "MILUTINE",
			"DOBRICA": "DOBRICE",
			"SLAVKO": "SLAVKO",
			"MILOJICA": "MILOJICE",
			"RADOJE": "RADOJE",
			"BOŽIDAR": "BOŽIDARE",
			"BOŠKO": "BOŠKO",
			"VIDOJE": "VIDOJE",
			"STANKO": "STANKO",
			"STANOJE": "STANOJE",
			"MIĆA": "MIĆO",
			"ZOKI": "ZOKI",
			"PERA": "PERO",
			"BORA": "BORO",
			"BOGDAN": "BOGDANE",
			"MITAR": "MITRE",
			"PAJA": "PAJO",
			"SRBA": "SRBO",
			"DESIMIR": "DESIMIRE",
			"NATA": "NATO",
			"NATAŠA": "NATAŠA",
			"NATALIJA": "NATALIJA",
			"DAMJAN": "DAMJANE",
			"BRANISLAV": "BRANISLAVE",
			"TIJANA": "TIJANA",
			"ACA": "ACO",
			"RATAR": "RATARE",
			"PECA": "PECO",
			"JELA": "JELO",
			"CECA": "CECO",
			"MICA": "MICO",
			"AVRAM": "AVRAME",
			"LUKA": "LUKA",
			"STAŠA": "STAŠA",
			"ANKA": "ANKA",
			"ANDA": "ANDA",
			"BRANISLAVA": "BRANISLAVA",
			"BRATISLAVA": "BRATISLAVA",
			"BLAŽA": "BLAŽO",
			"VARVARA": "VARVARA",
			"VOJISLAVA": "VOJISLAVA",
			"VEROSLAVA": "VEROSLAVA",
			"VIŠESLAVA": "VIŠESLAVA",
			"GAVRA": "GAVRO",
			"GAGA": "GAGO",
			"DOSITEJ": "DOSITEJU",
			"DRAGOSLAVA": "DRAGOSLAVA",
			"ĐURA": "ĐURO",
			"ELEONORA": "ELEONORA",
			"ŽIVOSLAVA": "ŽIVOSLAVA",
			"ZAGA": "ZAGO",
			"ZORISLAVA": "ZORISLAVA",
			"ZLATA": "ZLATO",
			"ISIDORA": "ISIDORA",
			"IVKA": "IVKA",
			"JAGODA": "JAGODA",
			"JANA": "JANO",
			"JEVTA": "JEVTO",
			"KRSTA": "KRSTO",
			"KRUNA": "KRUNO",
			"KRUNOSLAVA": "KRUNOSLAVA",
			"LAZA": "LAZO",
			"LEPOSAVA": "LEPOSAVA",
			"LEONIDA": "LEONIDA",
			"LEONORA": "LEONORA",
			"LJEPOSAVA": "LJEPOSAVA",
			"MATEJA": "MATEJA",
			"MATEJ": "MATEJ",
			"MATA": "MATO",
			"MILEVA": "MILEVA",
			"MILESA": "MILESA",
			"MELISA": "MELISA",
			"MOŠA": "MOŠO",
			"MIRA": "MIRO",
			"MIROSLAVA": "MIROSLAVA",
			"MIROSAVA": "MIROSAVA",
			"NINOSLAVA": "NINOSLAVA",
			"NEGOSAVA": "NEGOSAVA",
			"OLJA": "OLJA",
			"PETRA": "PETRA",
			"PRVOSLAVA": "PRVOSLAVA",
			"ROKSANDA": "ROKSANDA",
			"RUŽA": "RUŽO",
			"SRBISLAVA": "SRBISLAVA",
			"STAVRA": "STAVRO",
			"SVETISLAVA": "SVETISLAVA",
			"SIMA": "SIMO",
			"STANA": "STANO",
			"STANISLAVA": "STANISLAVA",
			"SIMONIDA": "SIMONIDA",
			"SPIRA": "SPIRO",
			"ŠPIRA": "ŠPIRO",
			"ŠPIRO": "ŠPIRO",
			"SPIRIDON": "SPIRIDONE",
			"TOMA": "TOMO",
			"TOMICA": "TOMICE",
			"TAMARA": "TAMARA",
			"TOŠA": "TOŠO",
			"TEODORA": "TEODORA",
			"TODORA": "TODORA",
			"CANA": "CANO",
			"ĆIRA": "ĆIRO",
			"HRANISLAVA": "HRANISLAVA",
			"CVETA": "CVETO",
			"ŠANA": "ŠANO"
		};
		this.exceptionCases = dictionary;
	}

	/**
	* Method to make sure provided name is in correct case (first letter of uppercase)
	*/
	private capitalizeName(name: string) {
		name = name.toLowerCase();
		return name.charAt(0).toUpperCase() + name.slice(1);
	}

	/**
	* Method transliterates cyrilic to latin and viceversa
	*/
	private transliterate(text: string, toLat = true): string {
		let latinica = toLat ? azbuka : _.invert(azbuka);
		return this.strtr(text, latinica);
	}

	/**
	* Implementation of PHP strtr
	*/
	private strtr(text: string, replacePairs: any): string {
		var str = text.toString(), key, re;
		for (key in replacePairs) {
			if (replacePairs.hasOwnProperty(key)) {
				re = new RegExp(key, "g");
				str = str.replace(re, replacePairs[key]);
			}
		}
		return str;
	}

	/**
     * @param string $input
     * @return string
     */
	private removeExtras(input: string): string {
		input = input.trim();
		input = striptags(input);
		input = this.transliterate(input);
		return input;
	}

	private isCyrilicSync(text: string): boolean {
		for (var i = 0; i < text.length; i++) {
			if (!azbuka.hasOwnProperty(text[i])) {
				return false;
			}
		}
		return true;
	}

	private isCyrillic(text: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			for (var i = 0; i < text.length; i++) {
				if (!azbuka.hasOwnProperty(text[i])) {
					resolve(false);
				}
			}
			resolve(true);
		});
	}

	async make(nominativ: string): Promise<string> {
		this.vokativ = '';
		var exceptions = this.getExceptions();
		this.cyrillic = await this.isCyrillic(nominativ);
		if (this.cyrillic) {
			nominativ = this.transliterate(nominativ);
		}
		nominativ = this.removeExtras(nominativ);
		nominativ = nominativ.toUpperCase();

		if (exceptions.hasOwnProperty(nominativ)) {
			//izvor je rečnik
			this.source = 'dictonary';
			//ako postoji izuzetak odmah vraćamo njegov vokativ u ćirilici ili latinici
			if (this.cyrillic) {
				return this.capitalizeName(this.transliterate(exceptions[nominativ], false));
			}
			else {
				return this.capitalizeName(this.transliterate(exceptions[nominativ]));
			}
		}

		if (nominativ.substring(nominativ.length - 3, nominativ.length) == 'TAR' || nominativ.substring(nominativ.length - 3, nominativ.length) == 'DAR') //PETAR, ALEKSANDAR
			this.vokativ = nominativ.substring(0, nominativ.length - 2) + 'RE';
		else if (nominativ.substring(nominativ.length - 3, nominativ.length) == 'ICA' && nominativ.length > 4)    //MILICA , LJUBICA ALI NE  I MICA i CICA
			this.vokativ = nominativ.substring(0, nominativ.length - 2) + 'CE';
		else if (nominativ.substring(nominativ.length - 2, nominativ.length) == 'CA')    //MACA, CECA...
			this.vokativ = nominativ.substring(0, nominativ.length - 2) + 'CO';
		else if (nominativ.substring(nominativ.length - 2, nominativ.length) == 'SA')    //PERSA, BOSA
			this.vokativ = nominativ.substring(0, nominativ.length - 2) + 'SO';
		else if (nominativ.substring(nominativ.length - 4, nominativ.length) == 'OLAC')    //KOLAC
			this.vokativ = nominativ.substring(0, nominativ.length - 4) + 'OČE';
		else if (nominativ.substring(nominativ.length - 4, nominativ.length) == 'ALAC')    //ZNALAC
			this.vokativ = nominativ.substring(0, nominativ.length - 4) + 'ALČE';
		else if (nominativ.substring(nominativ.length - 4, nominativ.length) == 'ILAC')    //MISLILAC
			this.vokativ = nominativ.substring(0, nominativ.length - 4) + 'IOČE';
		else if (nominativ.substring(nominativ.length - 4, nominativ.length) == 'ELAC')    //ŽETELAC
			this.vokativ = nominativ.substring(0, nominativ.length - 4) + 'EOČE';
		else if (nominativ.substring(nominativ.length - 3, nominativ.length) == 'SAC')    //PISAC
			this.vokativ = nominativ.substring(0, nominativ.length - 3) + 'ŠČE';
		else if (nominativ.substring(nominativ.length - 3, nominativ.length) == 'RAC')    //MUDRAC
			this.vokativ = nominativ.substring(0, nominativ.length - 2) + 'AČE';
		else if (nominativ.substring(nominativ.length - 3, nominativ.length) == 'VAC')    //VALJEVAC
			this.vokativ = nominativ.substring(0, nominativ.length - 3) + 'VČE';
		else if (nominativ.substring(nominativ.length - 3, nominativ.length) == 'ANJ')    //SUŽANJ
			this.vokativ = nominativ.substring(0, nominativ.length - 3) + 'NJU';
		else if (nominativ.substring(nominativ.length - 2, nominativ.length) == 'GA')    //KAVGA
			this.vokativ = nominativ.substring(0, nominativ.length - 2) + 'GO';
		else if (nominativ.substring(nominativ.length - 2, nominativ.length) == 'ER')    //FEDER, SREDER
			this.vokativ = nominativ.substring(0, nominativ.length - 0) + 'U';

		else if ((nominativ.substring(nominativ.length - 2, nominativ.length) == 'KA') && (nominativ.length > 4))  //DARINKA, MILKA, BORKA, ALI NE I RAKA, MIKA
			this.vokativ = nominativ;
		else if (nominativ.substring(nominativ.length - 2, nominativ.length) == 'JA' && nominativ.substring(nominativ.length - 3, nominativ.length) != 'IJA' && nominativ.substring(nominativ.length - 3, nominativ.length) != 'DJA' && nominativ.substring(nominativ.length - 3, nominativ.length) != 'NJA') //MAJA ALI NE I MARIJA, SANJA, NITI PEDJA (NE PEĐA)
			this.vokativ = nominativ.substring(0, nominativ.length - 2) + 'JO';
		else if (nominativ.substring(nominativ.length - 2, nominativ.length) == 'VA' || nominativ.substring(nominativ.length - 2, nominativ.length) == 'DA' || nominativ.substring(nominativ.length - 2, nominativ.length) == 'BA' || nominativ.substring(nominativ.length - 2, nominativ.length) == 'KA') //SAVA, DADA, SLOBA, RAKA
			this.vokativ = nominativ.substring(0, nominativ.length - 1) + 'O';
		else if (nominativ.substring(nominativ.length - 3, nominativ.length) == 'ARA' || nominativ.substring(nominativ.length - 3, nominativ.length) == 'ERA' || nominativ.substring(nominativ.length - 3, nominativ.length) == 'ORA') //PERA, DARA, BORA
			this.vokativ = nominativ.substring(0, nominativ.length - 2) + 'RO';
		else if (nominativ.substring(nominativ.length - 1, nominativ.length) == 'K')    //CUTUK
			this.vokativ = nominativ.substring(0, nominativ.length - 1) + 'ČE';
		else if (nominativ.substring(nominativ.length - 1, nominativ.length) == 'G')        //PREDRAG
			this.vokativ = nominativ.substring(0, nominativ.length - 1) + 'ŽE';
		//ć, đ, č, dž, š, ž, lj, nj, j
		else if (nominativ.substring(nominativ.length - 1, nominativ.length) == 'Ć' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'Đ' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'Č' || nominativ.substring(nominativ.length - 2, nominativ.length) == 'DŽ' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'Š' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'Ž' || nominativ.substring(nominativ.length - 2, nominativ.length) == 'LJ' || nominativ.substring(nominativ.length - 2, nominativ.length) == 'NJ' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'J')
			this.vokativ = nominativ + 'U';
		else if (nominativ.substring(nominativ.length - 1, nominativ.length) == 'A' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'O' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'E' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'I') //VANJA, MARKO, MILE, MIKI
			this.vokativ = nominativ;
		else
			this.vokativ = nominativ + 'E';
		//ako koristimo ćirilicu vraćamo napravljeni vokativ iz latinice u ćirilicu
		if (this.cyrillic) {
			this.vokativ = this.transliterate(this.vokativ, false);
		}
		//izvor je algoritam
		this.source = 'algorithm';
		//vraćamo sređen vokativ (mala slova, prvo veliko)
		return this.capitalizeName(this.vokativ);
	}

	call(nominativ: string): string {
		this.vokativ = '';
		var exceptions = this.getExceptions();
		this.cyrillic = this.isCyrilicSync(nominativ);
		if (this.cyrillic) {
			nominativ = this.transliterate(nominativ);
		}
		nominativ = this.removeExtras(nominativ);
		nominativ = nominativ.toUpperCase();

		if (exceptions.hasOwnProperty(nominativ)) {
			//izvor je rečnik
			this.source = 'dictonary';
			//ako postoji izuzetak odmah vraćamo njegov vokativ u ćirilici ili latinici
			if (this.cyrillic) {
				return this.capitalizeName(this.transliterate(exceptions[nominativ], false));
			}
			else {
				return this.capitalizeName(this.transliterate(exceptions[nominativ]));
			}
		}

		if (nominativ.substring(nominativ.length - 3, nominativ.length) == 'TAR' || nominativ.substring(nominativ.length - 3, nominativ.length) == 'DAR') //PETAR, ALEKSANDAR
			this.vokativ = nominativ.substring(0, nominativ.length - 2) + 'RE';
		else if (nominativ.substring(nominativ.length - 3, nominativ.length) == 'ICA' && nominativ.length > 4)    //MILICA , LJUBICA ALI NE  I MICA i CICA
			this.vokativ = nominativ.substring(0, nominativ.length - 2) + 'CE';
		else if (nominativ.substring(nominativ.length - 2, nominativ.length) == 'CA')    //MACA, CECA...
			this.vokativ = nominativ.substring(0, nominativ.length - 2) + 'CO';
		else if (nominativ.substring(nominativ.length - 2, nominativ.length) == 'SA')    //PERSA, BOSA
			this.vokativ = nominativ.substring(0, nominativ.length - 2) + 'SO';
		else if (nominativ.substring(nominativ.length - 4, nominativ.length) == 'OLAC')    //KOLAC
			this.vokativ = nominativ.substring(0, nominativ.length - 4) + 'OČE';
		else if (nominativ.substring(nominativ.length - 4, nominativ.length) == 'ALAC')    //ZNALAC
			this.vokativ = nominativ.substring(0, nominativ.length - 4) + 'ALČE';
		else if (nominativ.substring(nominativ.length - 4, nominativ.length) == 'ILAC')    //MISLILAC
			this.vokativ = nominativ.substring(0, nominativ.length - 4) + 'IOČE';
		else if (nominativ.substring(nominativ.length - 4, nominativ.length) == 'ELAC')    //ŽETELAC
			this.vokativ = nominativ.substring(0, nominativ.length - 4) + 'EOČE';
		else if (nominativ.substring(nominativ.length - 3, nominativ.length) == 'SAC')    //PISAC
			this.vokativ = nominativ.substring(0, nominativ.length - 3) + 'ŠČE';
		else if (nominativ.substring(nominativ.length - 3, nominativ.length) == 'RAC')    //MUDRAC
			this.vokativ = nominativ.substring(0, nominativ.length - 2) + 'AČE';
		else if (nominativ.substring(nominativ.length - 3, nominativ.length) == 'VAC')    //VALJEVAC
			this.vokativ = nominativ.substring(0, nominativ.length - 3) + 'VČE';
		else if (nominativ.substring(nominativ.length - 3, nominativ.length) == 'ANJ')    //SUŽANJ
			this.vokativ = nominativ.substring(0, nominativ.length - 3) + 'NJU';
		else if (nominativ.substring(nominativ.length - 2, nominativ.length) == 'GA')    //KAVGA
			this.vokativ = nominativ.substring(0, nominativ.length - 2) + 'GO';
		else if (nominativ.substring(nominativ.length - 2, nominativ.length) == 'ER')    //FEDER, SREDER
			this.vokativ = nominativ.substring(0, nominativ.length - 0) + 'U';

		else if ((nominativ.substring(nominativ.length - 2, nominativ.length) == 'KA') && (nominativ.length > 4))  //DARINKA, MILKA, BORKA, ALI NE I RAKA, MIKA
			this.vokativ = nominativ;
		else if (nominativ.substring(nominativ.length - 2, nominativ.length) == 'JA' && nominativ.substring(nominativ.length - 3, nominativ.length) != 'IJA' && nominativ.substring(nominativ.length - 3, nominativ.length) != 'DJA' && nominativ.substring(nominativ.length - 3, nominativ.length) != 'NJA') //MAJA ALI NE I MARIJA, SANJA, NITI PEDJA (NE PEĐA)
			this.vokativ = nominativ.substring(0, nominativ.length - 2) + 'JO';
		else if (nominativ.substring(nominativ.length - 2, nominativ.length) == 'VA' || nominativ.substring(nominativ.length - 2, nominativ.length) == 'DA' || nominativ.substring(nominativ.length - 2, nominativ.length) == 'BA' || nominativ.substring(nominativ.length - 2, nominativ.length) == 'KA') //SAVA, DADA, SLOBA, RAKA
			this.vokativ = nominativ.substring(0, nominativ.length - 1) + 'O';
		else if (nominativ.substring(nominativ.length - 3, nominativ.length) == 'ARA' || nominativ.substring(nominativ.length - 3, nominativ.length) == 'ERA' || nominativ.substring(nominativ.length - 3, nominativ.length) == 'ORA') //PERA, DARA, BORA
			this.vokativ = nominativ.substring(0, nominativ.length - 2) + 'RO';
		else if (nominativ.substring(nominativ.length - 1, nominativ.length) == 'K')    //CUTUK
			this.vokativ = nominativ.substring(0, nominativ.length - 1) + 'ČE';
		else if (nominativ.substring(nominativ.length - 1, nominativ.length) == 'G')        //PREDRAG
			this.vokativ = nominativ.substring(0, nominativ.length - 1) + 'ŽE';
		//ć, đ, č, dž, š, ž, lj, nj, j
		else if (nominativ.substring(nominativ.length - 1, nominativ.length) == 'Ć' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'Đ' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'Č' || nominativ.substring(nominativ.length - 2, nominativ.length) == 'DŽ' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'Š' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'Ž' || nominativ.substring(nominativ.length - 2, nominativ.length) == 'LJ' || nominativ.substring(nominativ.length - 2, nominativ.length) == 'NJ' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'J')
			this.vokativ = nominativ + 'U';
		else if (nominativ.substring(nominativ.length - 1, nominativ.length) == 'A' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'O' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'E' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'I') //VANJA, MARKO, MILE, MIKI
			this.vokativ = nominativ;
		else
			this.vokativ = nominativ + 'E';
		//ako koristimo ćirilicu vraćamo napravljeni vokativ iz latinice u ćirilicu
		if (this.cyrillic) {
			this.vokativ = this.transliterate(this.vokativ, false);
		}
		//izvor je algoritam
		this.source = 'algorithm';
		//vraćamo sređen vokativ (mala slova, prvo veliko)
		return this.capitalizeName(this.vokativ);
	}
}

export default new Vocative();