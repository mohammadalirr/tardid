import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import isBetween from 'dayjs/plugin/isBetween';
import jalaliday from 'jalaliday'

dayjs.extend(calendar)
dayjs.extend(relativeTime)
dayjs.extend(utc);
dayjs.extend(isBetween)
dayjs.extend(jalaliday)

export default dayjs;
