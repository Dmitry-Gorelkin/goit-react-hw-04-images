import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from './Button/Button';
import { Container } from './Container/Container';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { fhechImage } from '../api';
import { Loader } from './Loader/Loader';

const PER_PAGE = 12;

export class App extends Component {
  state = {
    page: 1,
    imageList: [],
    query: null,
    status: 'ideal',
  };

  handleQuery = query => {
    if (query !== this.state.query) {
      this.setState({ query, imageList: [], page: 1, status: 'ideal' });
    }
  };

  loadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  componentDidUpdate(_, prevState) {
    const { page, query } = this.state;

    if (page !== prevState.page || query !== prevState.query) {
      this.searchApi(query, page);
    }
  }

  searchApi = async (query, page) => {
    this.setState({ status: 'laoding' });

    try {
      const imageList = await fhechImage(query, page, PER_PAGE);

      const arrImageList = imageList.hits.map(e => {
        const { id, webformatURL, tags, largeImageURL } = e;
        return { id, webformatURL, tags, largeImageURL };
      });

      this.setState(prevState => {
        return {
          imageList: [...prevState.imageList, ...arrImageList],
        };
      });

      page < Math.ceil(imageList.totalHits / PER_PAGE)
        ? this.setState({ status: 'loadMore' })
        : this.setState({ status: 'ideal' });
    } catch {
      toast.error(
        `У нас не получилось взять данные о ${query}, попробуйте еще разочек 😇`
      );
      this.setState({ status: 'ideal' });
    }
  };

  render() {
    const { imageList, status } = this.state;

    return (
      <>
        <Container>
          <Searchbar onSubmitQuery={this.handleQuery} />
          {imageList.length !== 0 && <ImageGallery images={imageList} />}
          {status === 'laoding' && <Loader />}
          {status === 'loadMore' && <Button onClick={this.loadMore} />}
        </Container>

        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            error: {
              duration: 3000,
            },
          }}
        />
      </>
    );
  }
}
