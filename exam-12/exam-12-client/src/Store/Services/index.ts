import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiUrl } from '../../common/constansts';
import { RootState } from '../store';


export const api = createApi({
       baseQuery: fetchBaseQuery({ 
        baseUrl: apiUrl,
        prepareHeaders: (headers, {getState}) => {
          const state: RootState = getState();
          const token = state.auth.user?.token;
          
          if (token) {
            headers.set('Authorization', token);
          }
       }
   
      }),
       endpoints: () => ({}),
       tagTypes: ['Users' , 'Post'],
     })
     