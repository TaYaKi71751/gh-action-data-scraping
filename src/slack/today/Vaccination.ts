import { postMessage } from '../../util/Slack';
import { read } from '../../util/type/File';
const vaccinationTodayPath = 'plain/vaccination/counter/today.message.txt';

const text = read({ path: vaccinationTodayPath });
postMessage({ text });
