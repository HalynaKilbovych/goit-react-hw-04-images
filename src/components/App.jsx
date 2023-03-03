import { useState, useEffect, } from 'react';
import { Wrapper } from './App.styled';
import { GlobalStyle } from './GlobalStyle';
import { fetchImages } from 'api/image-api';
import { SearchBar } from './SearchBar/SearchBar';
import { Notification } from './Notification';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';


const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

export function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(0);
  const [largeImage, setLargeImage] = useState('');
  const [status, setStatus] = useState(Status.IDLE);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }
    setStatus(Status.PENDING);
    fetchImages({ query: query, page: page })
      .then(({ totalHits, hits }) => {
        if (totalHits) {
          setImages(prevImages => [...prevImages, ...hits]);
          setTotal(totalHits);
          setStatus(Status.RESOLVED);
        } else {
          setStatus(Status.REJECTED);
        }
      })
      .catch(error => {
        console.log(error);
        setStatus(Status.REJECTED);
      });
  }, [page, query]);

  const handleFormSubmit = e => {
    e.preventDefault();
    const searchQuery = e.target.elements.query.value.trim().toLowerCase();

    if (!searchQuery) {
      alert('Search box cannot be empty. Please enter the word.');
      return;
    }
    setQuery(searchQuery);
    setPage(1);
    setImages([]);

    e.target.reset();
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
    setStatus(Status.PENDING);
  };


    const handleImageClick = largeImage => {
    setLargeImage(largeImage);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setLargeImage('');
  };

  if (status === Status.IDLE) {
    return (
      <Wrapper>
        <GlobalStyle />
        <SearchBar onSubmit={handleFormSubmit} />
        <Notification message="There are no images yet." />
      </Wrapper>
    );
  }
  if (status === Status.PENDING) {
    return (
      <Wrapper>
        <GlobalStyle />
          <SearchBar onSubmit={handleFormSubmit} />
            <ImageGallery items={images} onClick={handleImageClick} />
          <Loader />
      </Wrapper>
    );
  }
  if (status === Status.REJECTED) {
    return (
      <Wrapper>
        <GlobalStyle />
        <SearchBar onSubmit={handleFormSubmit} />
            <Notification
            message={`No results containing ${query} were found.`}
            />
      </Wrapper>
    );
  }
  if (status === Status.RESOLVED) {
    return (
      <Wrapper>
               <GlobalStyle />
               <SearchBar onSubmit={handleFormSubmit} />
               <ImageGallery items={images} onClick={handleImageClick} />
               {showModal && largeImage && (
                 <Modal image={largeImage} onClick={handleCloseModal} tags={query} />
               )}
               {images.length < total && <Button onClick={loadMore} />}
             </Wrapper>
    );
  }
}


