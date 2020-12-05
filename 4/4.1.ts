import fileToList from '../denoUtils/fileToList.ts';

const list = await fileToList('4.txt', String);

interface Passport {
    byr: string,
    cid?: string,
    ecl: string,
    eyr: string,
    hcl: string,
    hgt: string,
    iyr: string,
    pid: string,
}

function isPassport(creds: Partial<Passport>): creds is Passport {
  return creds.byr !== undefined &&
         creds.ecl !== undefined &&
         creds.eyr !== undefined &&
         creds.hcl !== undefined &&
         creds.hgt !== undefined &&
         creds.iyr !== undefined &&
         creds.pid !== undefined;
}

function read(list: string[], count = 0, passport: Partial<Passport> = {}): number {
    if (list.length === 0) return count;
    if (list[0] === '') {
        if (isPassport(passport)) {
            return read(list.slice(1), ++count);
        }
        return read(list.slice(1), count);
    }
    const keyColonValues: string[] = list[0].split(' ');
    for (const keyColonValue of keyColonValues) {
        const results = keyColonValue.match(/(\w+):(\S+)/);
        if (results === null) throw new Error('regex failed!');
        const [, key, value] = results;
        Object.assign(passport, { [key]: value });
    }
    return read(list.slice(1), count, passport);
}

console.log(read(list));
