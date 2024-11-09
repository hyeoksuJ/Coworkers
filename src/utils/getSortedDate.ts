export default function getSortedDate(data: any, dateField: string) {
  return [...data].sort(
    (a, b) =>
      new Date(b[dateField] as string).getTime() -
      new Date(a[dateField] as string).getTime()
  );
}
