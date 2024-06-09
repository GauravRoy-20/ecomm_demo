import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useCategoriesQuery from '../../Hooks/useProductCategoryQuery';
import CategoryCheckbox from '../../../../Components/CategoryCheckbox';
import {
  selectProductCategory,
  setCategories,
} from '../../../../Slice/productCategorySlice';
import Skeleton from 'react-loading-skeleton';

const ProductCategory = () => {
  const { data: categories, isLoading, isError, error } = useCategoriesQuery();
  const { categories: selectedCategories } = useSelector(selectProductCategory);
  const dispatch = useDispatch();

  const handleCategoryChange = (category: string, checked: boolean) => {
    let newCategories: string[];
    if (checked) {
      newCategories = [...selectedCategories, category];
    } else {
      newCategories = (selectedCategories || [])?.filter(
        (cat) => cat !== category,
      );
    }
    dispatch(setCategories(newCategories));
  };

  if (isLoading) {
    return (
      <div>
        <h6>Loading Categories...</h6>
        <Skeleton count={5} data-testid="skeleton-loading" />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {`${error}`}</div>;
  }

  return (
    <div>
      <h6>Product Categories</h6>
      {(categories?.data || [])?.map((category: string, index: number) => (
        <CategoryCheckbox
          key={index}
          category={category}
          checked={selectedCategories?.includes(category)}
          onChange={(checked) => handleCategoryChange(category, checked)}
        />
      ))}
    </div>
  );
};

export default ProductCategory;
