import { useEffect, useState } from "react";
import Head from "next/head";
import { Box, Container } from "@mui/material";
import { AuthGuard } from "../../components/authentication/auth-guard";
import { DashboardLayout } from "../../components/dashboard/dashboard-layout";
import dynamic from 'next/dynamic';

import { gtm } from "../../lib/gtm";
import axios from 'axios'
import {apiHome,apiHomeOrder}from '../../api/home'
// import {BASE_URL} from '../../api/url'
import url from '../../api/urlNew'

const Monitoring = dynamic(() => import('../../myComponents/Monitoring'), {
  loading: () => 'Loading...',
})

const Overview = () => {
  const [data,setData] = useState([])
  const [tableData,setTableData] = useState([])

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(() => {
    const value = globalThis.sessionStorage.getItem("dismiss-banner");
    if (value === "true") {
    }

   
  }, []);

  useEffect(()=>{
    apiHome().then((r)=>{
      setData(r.data)
    })

    apiHomeOrder().then((r)=>{
      setTableData(r.data.data)
    })
  },[])


  return (
    <>
      <Head>
        <title>Dashboard: Overview | Material Kit Pro</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Monitoring tableData={tableData} data={data}/>
        </Container>
      </Box>
    </>
  );
};

Overview.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);


export default Overview;
