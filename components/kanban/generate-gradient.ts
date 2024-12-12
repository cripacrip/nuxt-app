export const generateColumnStyle = (index: number, total: number) => {
    const intensity = 100 - (index / (total - 1)) * 50;
    // const step = (30 - 5) / (total - 1);
    // const opacity = 5 * step * index
    //shade, saturation, lightness
    return { backgroundColor: `hsla(280, 52%, ${intensity}%, 30%)` }
}