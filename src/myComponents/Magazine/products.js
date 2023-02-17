/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import numeral from "numeral";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { apiProduct } from "../../api/product";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import { Scrollbar } from "../../components/scrollbar";
import Image from "next/image";

const Products = () => {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({});
  const router = useRouter();

  useEffect(async () => {
    await apiProduct().then((r) => {
      setData(r.data.data);
      setMeta(r.data.meta);
    });
  }, []);
  const handlePageClick = (obj) => {
    const path = router.pathname;
    const query = router.query;
    query.obj = obj.selected + 1;
    router.push({
      pathname: path,
      query: query,
    });
    data.current?.scrollIntoView();
    apiProduct({
      page: query.obj,
    }).then((r) => {
      setData(r.data.data);
      setMeta(r.data.meta);
    });
  };
  return (
    <>
      <Box
        sx={{
          p: 3,
        }}
      >
        <Scrollbar>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell >ID</TableCell>
                <TableCell align="center"> Фотография</TableCell>
                <TableCell> Артикул контрагента</TableCell>
                <TableCell>Наименование</TableCell>
                <TableCell>Цена</TableCell>
                <TableCell>Количество</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length &&
                data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell align="center" sx={{
                        position: "relative"
                    }}>
                      <Image
                      lazy
                        layout="fill"   
                        quality={1}                         
                        width={60}
                        objectFit="contain"
                        src={item.product.images[0].url}
                      />
                    </TableCell>
                    <TableCell>{item.shop_reference}</TableCell>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: "nowrap",
                      }}
                    >
                      {numeral(item.price).format("0,0")} сум
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Scrollbar>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={meta && meta?.last_page ? meta?.last_page : 0}
          forcePage={meta?.current_page ? meta?.current_page - 1 : 0}
          previousLabel="<"
          containerClassName={"listAAA"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item break"}
          breakLinkClassName={"page-link break-link"}
          renderOnZeroPageCount={null}
        />
      </Box>
    </>
  );
};

export default Products;
