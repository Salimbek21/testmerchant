import { useCallback, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import axios from 'axios'
import url from '../../../api/urlNew'

import dynamic from 'next/dynamic';
const EditProduct = dynamic(() => import('../../../myComponents/Products/edit'), {
  loading: () => 'Loading...',
})

import { AuthGuard } from '../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';

const OrderList = ({data}) => {
  return (
    <>
    <EditProduct data={data}/>
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


export async function getServerSideProps(context) {
    let data = {};
    await axios
      .get(`${url}/api/dealer/items`, {
        params: {
            item_shop_id: context.query.id,
        },
        headers: {
          Authorization: `Bearer ${context.req.cookies.access_token}`,
        },
      })
      .then((res) => {
        data = res.data.data;
      })
      .catch((error) => {
        console.error(error);
      });
  
    return {
      props: {
        data: data,
      },
    };
  }
  

export default OrderList;
