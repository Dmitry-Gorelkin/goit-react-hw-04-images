import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from './Button/Button';
import { Container } from './Container/Container.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { fhechImage } from '../api';
import { Loader } from './Loader/Loader';

const PER_PAGE = 12;

export const App = () => {
  const [page, setPage] = useState(1);
  const [imageList, setImageList] = useState([]);
  const [query, setQuery] = useState(null);
  const [status, setStatus] = useState('ideal');

  const handleQuery = q => {
    if (q !== query) {
      setQuery(q);
      setImageList([]);
      setPage(1);
      setStatus('ideal');
    }
  };

  const loadMore = () => setPage(prevState => prevState + 1);

  useEffect(() => {
    const searchApi = async (query, page) => {
      setStatus('laoding');

      try {
        const imageList = await fhechImage(query, page, PER_PAGE);

        if (imageList.total === 0) {
          toast(
            `Ничего нет по запросу: ${query}, попробуйте сделать другой запрос.`
          );
          setStatus('ideal');
          return;
        }

        const arrImageList = imageList.hits.map(e => {
          const { id, webformatURL, tags, largeImageURL } = e;
          return { id, webformatURL, tags, largeImageURL };
        });

        setImageList(prevState => [...prevState, ...arrImageList]);

        page < Math.ceil(imageList.totalHits / PER_PAGE)
          ? setStatus('loadMore')
          : setStatus('ideal');
      } catch {
        toast.error(
          `У нас не получилось взять данные о ${query}, попробуйте еще разочек 😇`
        );
        setStatus('ideal');
      }
    };

    if (query) searchApi(query, page);
  }, [page, query]);

  return (
    <>
      <Container>
        <Searchbar onSubmitQuery={handleQuery} />
        {imageList.length !== 0 && <ImageGallery images={imageList} />}
        {status === 'laoding' && <Loader />}
        {status === 'loadMore' && <Button onClick={loadMore} />}
      </Container>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          error: {
            duration: 2000,
          },
        }}
      />
    </>
  );
};
