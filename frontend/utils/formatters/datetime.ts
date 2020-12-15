export function format(timestamp: string | Date): string {
  const datetime = new Date(timestamp);
  return (
    datetime.getDate() +
    '/' +
    (datetime.getMonth() + 1) +
    '/' +
    datetime.getFullYear()
  );
}
