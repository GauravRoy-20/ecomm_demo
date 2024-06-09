import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { selectProductListData } from '../../../../Slice/productListDataSlice';
import { useSelector } from 'react-redux';
import styles from './ProductDetails.module.css';
import { PRODUCT_RESPONSE } from '../../Types/ResponseTypes';
import Skeleton from 'react-loading-skeleton';

const ProductDetails = () => {
  const navigate = useNavigate();
  const productListData = useSelector(selectProductListData);
  const params = useParams();

  const product = productListData?.data?.find(
    (product: PRODUCT_RESPONSE) => product.id === Number(params?.productId),
  );

  if (!product) {
    return (
      <Container className={styles.container}>
        <Row>
          <Col md={3}>
            <Skeleton height={50} width={100} data-testid="skeleton" />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={5}>
            <div className={styles.imageContainer}>
              <Skeleton height={400} data-testid="skeleton-image" />
            </div>
            <p className={styles.price}>
              <Skeleton width={100} data-testid="skeleton-price" />
            </p>
          </Col>
          <Col md={7}>
            <h2 className={styles.title}>
              <Skeleton width={200} data-testid="skeleton-header" />
            </h2>
            <p className={styles.category}>
              <Skeleton width={100} data-testid="skeleton-category" />
            </p>
            <Skeleton count={3} data-testid="skeleton-count" />
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className={styles.container}>
      <Row>
        <Col md={3}>
          <Button variant="primary" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={5}>
          <div className={styles.imageContainer}>
            <Image
              src={product.image}
              alt={product.title}
              fluid
              className={styles.image}
              height={400}
              width={400}
            />
          </div>
          <p className={styles.price}>
            Price: <span className={styles.priceValue}>{product.price}</span>
          </p>
        </Col>
        <Col md={7}>
          <h2 className={styles.title}>{product.title}</h2>
          <p className={styles.category}>{product.category}</p>
          <p>{product.description}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
