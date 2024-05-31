// ISO 8601 to "yyyy-MM-dd"
export function extractDatePart(dateString: string): string {
  return dateString.split('T')[0];
}
