import React from "react";
import ReactDOM from "react-dom";
import jsonp from "jsonp";
import ExampleBasic from "./ExampleBasic";
import ExampleWithLightbox from "./ExampleWithLightbox";
import ExampleCustomComponentSelection from "./ExampleCustomComponentSelection";
import ExampleSortable from "./ExampleSortable";
import ExampleDynamicLoading from "./ExampleDynamicLoading";
import ExampleDynamicColumns from "./ExampleDynamicColumns";

class App extends React.Component {
  constructor() {
    super();
    this.state = { width: -1 };
    this.loadPhotos = this.loadPhotos.bind(this);
  }
  componentDidMount() {
    this.loadPhotos();
  }

  loadPhotos() {
    const urlParams = {
      api_key: "455b5e2fa6b951f9b9ab58a86d5e1f8a",
      photoset_id: "72177720321288233",
      user_id: "201696834@N08",
      format: "json",
      per_page: "120",
      extras: "url_m,url_c,url_l,url_h,url_o",
    };

    let url =
      "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos";
    url = Object.keys(urlParams).reduce((acc, item) => {
      return acc + "&" + item + "=" + urlParams[item];
    }, url);

    jsonp(url, { name: "jsonFlickrApi" }, (err, data) => {
      let photos = data.photoset.photo.map((item) => {
        let aspectRatio = parseFloat(item.width_o / item.height_o);
        console.log(item);
        return {
          src: item.url_l,
          width: parseInt(item.width_o),
          height: parseInt(item.height_o),
          title: item.title,
          alt: item.title,
          key: item.id,
          srcSet: [
            `${item.url_m} ${item.width_m}w`,
            `${item.url_c} ${item.width_c}w`,
            `${item.url_l} ${item.width_l}w`,
            `${item.url_h} ${item.width_h}w`,
          ],
          sizes: "(min-width: 480px) 50vw, (min-width: 1024px) 33.3vw, 100vw",
        };
      });
      this.setState({
        photos: this.state.photos ? this.state.photos.concat(photos) : photos,
      });
    });
  }

  render() {
    if (this.state.photos) {
      const width = this.state.width;
      return (
        <div className="App">
          <ExampleBasic photos={this.state.photos} />
          <ExampleBasic direction="column" photos={this.state.photos} />
        </div>
      );
    } else {
      return <div className="App"></div>;
    }
  }
}
ReactDOM.render(<App />, document.getElementById("app"));
