export const bigTask = (int: number) => {
    const sum = new Array(int)
    .fill(0)
    .map((e, idx) => e + idx)
    .reduce((sum, el) => sum + el, 0)

    console.log(sum)
}