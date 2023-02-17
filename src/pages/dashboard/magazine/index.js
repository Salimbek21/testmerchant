import { useCallback, useEffect, useRef, useState } from 'react';
import Head from 'next/head';

import dynamic from 'next/dynamic';
const Magazine = dynamic(() => import('../../../myComponents/Magazine'), {
  loading: () => 'Loading...',
})

import { AuthGuard } from '../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';

const OrderList = () => {
 
  return (
    <>
    <Magazine/>
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
