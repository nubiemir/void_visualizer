export default interface ISorting {
  draw(
    containerWidth: number,
    containerHeight: number,
    container: SVGElement
  ): void;
  animate(): void;
}
