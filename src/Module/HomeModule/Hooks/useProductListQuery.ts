import { useQuery } from 'react-query';
import axios, { AxiosResponse } from 'axios';
import { PRODUCT_RESPONSE } from '../Types/ResponseTypes';


const useProductApi = () => {
    const { isLoading, isError, data, error } = useQuery<AxiosResponse<PRODUCT_RESPONSE[]>>(
        'products',
        () => axios.get<PRODUCT_RESPONSE[]>(`${process.env.REACT_APP_API_BASE_URL_}products`),
        {
            cacheTime: Infinity,
            refetchOnWindowFocus: false
        }
    );

    return { isLoading, isError, data, error };
};

export default useProductApi;
