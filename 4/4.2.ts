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

const eyeColors = {
    amb: true,
    blu: true,
    brn: true,
    gry: true,
    grn: true,
    hzl: true,
    oth: true,
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

function isValidPassport(p: Passport): boolean {
    const byr = parseInt(p.byr);
    if (byr === undefined || byr > 2002 || byr < 1920) return false;

    const iyr = parseInt(p.iyr);
    if (iyr === undefined || iyr < 2010 || iyr > 2020) return false;

    const eyr = parseInt(p.eyr);
    if (eyr === undefined || eyr < 2020 || eyr > 2030) return false;

    const hgt = p.hgt.match(/^(\d+)(in|cm)$/);
    if (hgt === null) return false;
    const [,num,unit] = hgt;
    const n: number = parseInt(num);
    if (unit === 'in' && (n > 76 || n < 59)) return false;
    if (unit === 'cm' && (n > 193 || n < 150)) return false;

    const hcl = p.hcl.match(/^#[a-f0-9]{6}$/);
    if (hcl === null) return false;

    const ecl = p.ecl;
    if (!(ecl in eyeColors)) return false;

    const pid = p.pid.match(/^[0-9]{9}$/);
    if (pid === null) return false;

    return true;
}

function read(list: string[], count = 0, passport: Partial<Passport> = {}): number {
    const [currentLine, ...restOfList] = list;

    if (currentLine === undefined) return count;
    if (currentLine === '') {
        if (isPassport(passport) && isValidPassport(passport)) {
            return read(restOfList, ++count);
        }
        
        return read(restOfList, count);
    }

    currentLine
        .split(' ')
        .forEach(keyColonValue => {
            const results = keyColonValue.match(/^(\w+):(\S+)$/);

            if (results === null) {
                throw new Error('regex failed!');
            }
                
            const [, key, value] = results;
            Object.assign(passport, { [key]: value });
        });

    return read(restOfList, count, passport);
}

console.log(read(list));
