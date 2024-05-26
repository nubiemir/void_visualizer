export default class CommonServices {
  parsePath(pathname: string): string[] {
    const pathList = pathname.slice().split("/");
    return pathList;
  }
}
