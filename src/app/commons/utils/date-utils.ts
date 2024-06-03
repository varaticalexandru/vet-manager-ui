// ISO 8601 to "yyyy-MM-dd"
export function extractDatePart(dateString: string): string {
  return dateString.split('T')[0];
}

export function getDateTime(date: string, time: string): string {
  // convert time to 24h format
  const [hours, minutes, modifier] = time.split(':');
  let hours24 = parseInt(hours);
  if (modifier === 'PM' && hours24 !== 12) {
    hours24 += 12;
  } else if (modifier === 'AM' && hours24 === 12) {
    hours24 = 0;
  }

  // combine date + time
  const dateTime = new Date(date);
  dateTime.setHours(hours24);
  dateTime.setMinutes(parseInt(minutes));

  // convert to ISO 8601
  return dateTime.toISOString();
}