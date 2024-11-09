export default function getResponsiveValue(mobile: any, tablet: any, pc: any) {
  const width = window.innerWidth;

  if (width < 768) {
    return mobile;
  }
  if (width < 1240) {
    return tablet;
  }
  return pc;
}
