/*

    array of object compose of dimension and src name

    images = [
      {width: 50, height: 20, src: 'source1.jpg'}, 
      {width: 10, height: 5, src: 'source2.pg'}, 
      {width: 120, height: 50, src: 'source3.jpg'}, 
      {width: 60, height: 40, src: 'source1.jpg'}, 
      {width: 40, height: 40, src: 'source2.pg'}, 
      {width: 300, height: 30, src: 'source3.jpg'}, 
    ]

    makeIntoRow(images, rowWidth, rowHeight)

    resizedWidth = originalWidth / originalHeight * resizedHeight

    makeIntoRow(images,200, 40)
 */
const images = [
  { width: 50, height: 20, src: "source1.jpg" },
  { width: 10, height: 50, src: "source2.pg" },
  { width: 120, height: 50, src: "source3.jpg" },
  { width: 10, height: 40, src: "source4.jpg" },
  { width: 10, height: 40, src: "source5.pg" },
  { width: 30, height: 30, src: "source6.jpg" }
]
import makeIntoRow from "./src/makeIntoRow"
const { expect } = require("chai")

describe("convert images into rows", () => {
  it("show contains two rows, 2 images + 4 images", () => {
    let actual = makeIntoRow(images, 200, 40)
    expect(actual[0].length).equals(2)
    expect(actual[1].length).equals(4)
  })
})
