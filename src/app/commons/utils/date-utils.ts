// ISO 8601 to "yyyy-MM-dd"
export function extractDatePart(dateString: string): string {
  return dateString.split('T')[0];
}

// convert time to 24h format
export function getDateTime(date: string, time: string): string {  
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

// ISO 8601 to "hh:mm AM/PM"
export function extractLocalTime(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(date);
}