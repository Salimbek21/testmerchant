import { useCallback, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import dynamic from 'next/dynamic';
import url from '../../../api/urlNew'
import axios from 'axios'
const Orders = dynamic(() => import('../../../myComponents/Orders'), {
  loading: () => 'Loading...',
})
import {useRouter} from 'next/router'
import { AuthGuard } from '../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';

const OrderList = ({data, meta}) => {
  const router =  useRouter()

  useEffect(()=>{
    router.push(
      {
        pathname: `/dashboard/orders`,
        query: {
          page: router.query.page,
        },
      },
      // `/dashboard/ordersAll?page=${page}`,
      { shallow: true, scroll: true }
    );
  },[router.query.page])
 
  return (
    <>
    <Orders />
    </>
  );
};

OrderList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);


export default OrderList;
