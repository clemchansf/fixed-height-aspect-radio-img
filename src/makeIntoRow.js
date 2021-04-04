export default function makeIntoRow(images, rowWidth, rowHeight) {
  let ar = []

  let remaining_width = rowWidth
  let current_row = 0

  for (let i = 0; i < images.length; i++) {
    let { width, height, src } = images[i]
    let resizedWidth = Math.ceil((width / height) * rowHeight)

    let row = ar[current_row] || []

    if (resizedWidth > remaining_width) {
      // next row
      current_row++
      remaining_width = rowWidth
      row = ar[current_row] || []
    }

    ar[current_row] = row
    let obj = Object.assign({}, images[i])
    obj.width = resizedWidth
    obj.height = rowHeight
    obj.src = src
    // row.push({ width: resizedWidth, height: rowHeight, src })
    row.push(obj)
    remaining_width -= resizedWidth
  }

  return ar
}
