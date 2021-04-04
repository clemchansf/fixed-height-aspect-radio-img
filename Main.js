import React, { useEffect } from "react"
import ReactDOM from "react-dom"
import { useImmer } from "use-immer"
import makeIntoRow from "./src/makeIntoRow"
import Axios from "axios"

Axios.defaults.baseURL = "https://fakerapi.it/api/v1"

function Main() {
  const [state, setState] = useImmer({
    images: [],
    show: "loading",
    resizedImages: []
  })

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()

    async function fetchPost(width, height) {
      try {
        let url = Axios.defaults.baseURL + `/images?_width=${width}&_height=${height}`

        const response = await Axios.get(url, {
          cancelToken: ourRequest.token
        })

        setState(draft => {
          draft.images.push(response.data.data[0])
        })
      } catch (e) {
        console.log("View post error or the request was cancelled." + e)
      }
    }

    for (let i = 0; i < 15; i++) {
      fetchPost(parseInt(Math.random() * 150), parseInt(Math.random() * 150))
    }

    // add clean up function when component is unmounted
    return () => {
      ourRequest.cancel()
    }
  }, [])

  useEffect(() => {
    if (state.images.length >= 15) {
      let images = state.images.map(img => {
        let { title, description, url } = img
        let [width, height] = url.split("http://placeimg.com/")[1].split("/")
        return { width, height, src: "https" + url.substr(4), alt: title }
      })

      setState(draft => {
        draft.show = "results"
        draft.resizedImages = makeIntoRow(images, 500, 80)
      })
    }
  }, [state.images])

  return (
    <>
      <div className="panel">
        <div className="header">Resize random images to fit in fixed height rows. </div>
        <div className={"circle-loader " + (state.show == "loading" ? " circle-loader--visible" : "")}></div>
        <div className={"live-search-results " + (state.show == "results" ? "live-search-results--visible" : "")}>
          <div className="row">
            {state.resizedImages.map(item => {
              return item.map(image => {
                let { width, height, src, alt } = image
                return <img key={alt} src={src} width={width} height={height} />
              })
            })}
          </div>
        </div>
      </div>
    </>
  )
}

ReactDOM.render(<Main />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
