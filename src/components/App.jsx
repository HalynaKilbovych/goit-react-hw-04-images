import { Component } from 'react';
import { Wrapper } from './App.styled';
import { GlobalStyle } from './GlobalStyle';
import { fetchImages } from 'api/image-api';
import { SearchBar } from './SearchBar/SearchBar';
import { Notification } from './Notification';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    images: [],
    total: 0,
    largeImage: '',
    error: '',
    status: 'idle',
    showModal: false,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.setState({ status: 'pending' });
      fetchImages({ query: this.state.query, page: this.state.page })
        .then(({ totalHits, hits }) => {
          if (totalHits) {
            this.setState(prevState => ({
              images: [...prevState.images, ...hits],
              total: totalHits,
              status: 'resolved',
            }));
          } else {
            this.setState({ status: 'rejected' });
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const query = e.target.elements.query.value.trim().toLowerCase();

    if (!query) {
      alert('Search box cannot be empty. Please enter the word.');
      return;
    }

    this.setState({
      page: 1,
      query,
      images: [],
    });

    e.target.reset();
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      status: 'pending',
    }));
  };

  handleImageClick = largeImage => {
    this.setState({ largeImage, showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, largeImage: ''});
  };

  render() {
    const { query, images, total, largeImage, status, showModal} = this.state;
    if (status === 'idle') {
      return (
        <Wrapper>
          <GlobalStyle />
          <SearchBar onSubmit={this.handleFormSubmit} />
          <Notification message="There are no images yet." />
        </Wrapper>
      );
    }
    if (status === 'pending') {
      return (
        <Wrapper>
          <GlobalStyle />
          <SearchBar onSubmit={this.handleFormSubmit} />
          <ImageGallery items={images} onClick={this.handleImageClick} />
          <Loader/>
        </Wrapper>
      );
    }
    if (status === 'rejected') {
      return (
        <Wrapper>
          <GlobalStyle />
          <SearchBar onSubmit={this.handleFormSubmit} />
          <Notification
            message={`No results containing ${query} were found.`}
          />
        </Wrapper>
      );
    }
    if (status === 'resolved') {
      return (
        <Wrapper>
          <GlobalStyle />
          <SearchBar onSubmit={this.handleFormSubmit} />
          <ImageGallery items={images} onClick={this.handleImageClick} />
          {showModal && largeImage && (
          <Modal image={largeImage} onClick={this.handleCloseModal} tags={query} />
        )}
          {images.length < total && <Button onClick={this.loadMore} />}
        </Wrapper>
      );
    }
  }
}
