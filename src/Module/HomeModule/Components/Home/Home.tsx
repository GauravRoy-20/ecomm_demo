import React, { useState, useEffect } from 'react';
import { Card, Form, Image } from 'react-bootstrap';
import useProductApi from '../../Hooks/useProductListQuery';
import { PRODUCT_RESPONSE } from '../../Types/ResponseTypes';
import styles from './Home.module.css';
import Pagination from 'rc-pagination';
import Skeleton from 'react-loading-skeleton';
import { debounce } from 'lodash';
import ProductCategory from '../ProductCategory/ProductCategory';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductCategory } from '../../../../Slice/productCategorySlice';
import {
  selectProductListData,
  setData,
} from '../../../../Slice/productListDataSlice';
import { useNavigate } from 'react-router-dom';
import { noProductListPlaceholder } from '../../../../Constants/constant';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, data, error } = useProductApi();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const productsPerPage = 9;
  const [filteredProducts, setFilteredProducts] = useState<
    Array<PRODUCT_RESPONSE>
  >([]);
  const { categories: selectedCategories } = useSelector(selectProductCategory);
  const { data: productListData } = useSelector(selectProductListData);

  console.log(productListData);

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setData(data?.data));
    }
  }, [isLoading, data, dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    if (productListData) {
      const filtered = productListData?.filter(
        (product: PRODUCT_RESPONSE) =>
          product?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) &&
          (selectedCategories.length === 0 ||
            selectedCategories.includes(product?.category)),
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, selectedCategories, productListData]);

  const delayedSearch = debounce((text: string) => {
    setSearchTerm(text);
  }, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    delayedSearch(text);
  };

  if (isLoading) {
    return (
      <div className="container mt-5">
        <h2 className="mb-4">Product List (Loading...)</h2>{' '}
        <div className="row">
          <div className={`col-md-3 ${styles.sidebar}`}>
            <Form.Group controlId="formSearch">
              <Form.Control
                type="text"
                placeholder="Search"
                onChange={handleSearchChange}
                style={{
                  outline: 'none',
                  boxShadow: 'none',
                  marginBottom: '15px',
                }}
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <ProductCategory />
            </Form.Group>
          </div>
          <div className={`col-md-9 ${styles.cardSection}`}>
            <div
              className={`row row-cols-1 row-cols-md-3 card-row ${styles.scrollableCards}`}
            >
              {[...Array(productsPerPage)]?.map((_, index) => (
                <div className={`col mb-3 ${styles.cardMargin}`} key={index}>
                  <Skeleton height={350} data-testid="skeleton-loading" />
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-center mt-3">
              <Skeleton width={120} height={40} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Error: {`${error}`}</div>;
  }

  const totalProducts = productListData?.length || 0;

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = Math.min(startIndex + productsPerPage, totalProducts);

  const currentPageProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Product List ({totalProducts})</h2>{' '}
      <div className="row">
        <div className={`col-md-3 ${styles.sidebar}`}>
          <Form.Control
            type="text"
            placeholder="Search"
            onChange={handleSearchChange}
            style={{ outline: 'none', boxShadow: 'none', marginBottom: '15px' }}
          />
          <ProductCategory />
        </div>
        <div className={`col-md-9 ${styles.cardSection}`}>
          {filteredProducts?.length === 0 ? (
            <div className="row">
              <div className="col text-center">
                <Image
                  src={noProductListPlaceholder}
                  alt="No Product List Found"
                  className="img-fluid"
                />
              </div>
            </div>
          ) : (
            <div
              className={`row row-cols-1 row-cols-md-3 card-row ${styles.scrollableCards}`}
            >
              {(currentPageProducts || [])?.map(
                (product: PRODUCT_RESPONSE, index: number) => (
                  <div className={`col mb-3 ${styles.cardMargin}`} key={index}>
                    <div className={styles.cardContainer}>
                      <Card
                        className="h-100"
                        style={{ maxHeight: '350px' }}
                        onClick={() => {
                          navigate(`/products/${product?.id}`);
                        }}
                      >
                        <Card.Img
                          variant="top"
                          src={product?.image}
                          className={styles.cardImage}
                        />
                        <Card.Body>
                          <Card.Title className={styles.cardTitle}>
                            {product?.title}
                          </Card.Title>{' '}
                          <Card.Text className={styles.cardCategory}>
                            {product?.category}
                          </Card.Text>
                          <Card.Text className={styles.cardDescription}>
                            {product?.description}
                          </Card.Text>
                          <Card.Text className={styles.priceText}>
                            Price:{' '}
                            <span className={styles.priceValue}>
                              ${product?.price}
                            </span>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
          <div className="d-flex justify-content-center mt-3">
            <Pagination
              current={currentPage}
              total={filteredProducts.length}
              pageSize={productsPerPage}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
