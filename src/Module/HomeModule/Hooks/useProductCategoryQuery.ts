
import { useQuery } from 'react-query';
import axios, { AxiosResponse } from 'axios';
import { PRODUCT_CATEGORY_RESPONSE } from '../Types/ResponseTypes';


const useProductApi = () => {
    const { isLoading, isError, data, error } = useQuery<AxiosResponse<PRODUCT_CATEGORY_RESPONSE>>(
        'categories',
        () => axios.get<PRODUCT_CATEGORY_RESPONSE>(`${process.env.REACT_APP_API_BASE_URL_}products/categories`),
        {
            cacheTime: Infinity,
            refetchOnWindowFocus: false
        }
    );

    return { isLoading, isError, data, error };
};

export default useProductApi;
