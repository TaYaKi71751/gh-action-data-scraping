import {
    pwd,
    Path,
    getFullPathAsString,
    pathToString,
    getPathExceptPwdAsString,
} from './type/Path';
import fs from 'fs';
import { tryCatch } from './TryCatch';
type Write = {
    data: any;
    path: Path;
};

function Write({
    data,
    path
}: Write) {
    const fullPathString: string = pathToString(path);
    const pwdExceptedPathString = fullPathString.replace(pwd,'.')
    try {
        console.info(`Start write ${pwdExceptedPathString}`);
        fs.writeFileSync(fullPathString, data);
    } catch (e) {
        console.info(`Error while writing ${pwdExceptedPathString} :`);
        console.error(e);
        return;
    }
    console.info(`Successfully writen ${pwdExceptedPathString}`);
    return true;
}
export { Write }