import { useMutation } from '@tanstack/react-query';
import { API_URLS } from '../constants/urls';
import axios from '../lib/axios';
import { UrlData } from '../types/UrlShortener.types';

export const useShorten = () => {
	return useMutation({
		mutationFn: (data: UrlData) => axios.post(API_URLS.shorten, data).then((res) => res.data),
	});
};
