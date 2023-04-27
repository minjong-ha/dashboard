import moment from 'moment-timezone';

const zones = moment.tz.names();
const timeZoneNames = [];
const timeZoneCities = {};

zones.forEach((zoneName) => {
    const zone = moment.tz.zone(zoneName);
    const offset = zone.utcOffset(moment());

    // Ignore timezones with non-integer offsets
    if (offset % 60 !== 0) return;

    const hours = offset / 60;
    const utcLabel = hours >= 0 ? `UTC+${hours}` : `UTC${hours}`;

    if (!timeZoneNames.includes(utcLabel)) {
    timeZoneNames.push(utcLabel);
    timeZoneCities[utcLabel] = [];
    }

    timeZoneCities[utcLabel].push(zoneName);
    });

export { timeZoneNames, timeZoneCities };
//export const timeZoneNames = [
//  'UTC',
//  'America/New_York',
//  'Europe/London',
//  'Asia/Tokyo',
//  // Add more timezones here
//];
