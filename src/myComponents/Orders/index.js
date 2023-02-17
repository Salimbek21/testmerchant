import {
  Box,
  Button,
  Alert,
  TextField,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { orderGet } from "../../store/orders/orderThunk";
import { useRouter } from "next/router";

import React, { useRef, useEffect } from "react";

const Orders = () => {
  const dataNew = useRef(null);
  const dispatch = useDispatch();
  const { orders,meta } = useSelector((state) => state.orders);

  const router = useRouter();

  const handlePageClick = (obj) => {
    const page = obj.selected + 1
    // router.push({
    //   pathname: path,
    //   query: query,
    // });
    orders.current?.scrollIntoView();
    dispatch(orderGet({
      page: page
    }))
  };

  useEffect(() => {
    dispatch(orderGet());
  }, [dispatch]);

  return (
    <>
      <Card>
        <Box
          sx={{
            p: 3,
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <TextField label="Поиск" />
          <TextField label="Мин цена" />
          <TextField label="Макс цена" />
          <TextField label="Статус" />
          <TextField label="С" />
          <TextField label="По" />
        </Box>
      </Card>
      <Card>
        <Box
          sx={{
            p: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 2,
            }}
          >
            <Box
              sx={{
                fontWeight: "700",
              }}
            >
              Таблица заказов
            </Box>
            <Button variant="contained">Выгрузка заказов</Button>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>№ заказа</TableCell>
                <TableCell>Наименование</TableCell>
                <TableCell>Артикул</TableCell>
                <TableCell>Дата</TableCell>
                <TableCell>Дата доставки</TableCell>
                <TableCell>Магазин</TableCell>
                <TableCell>К-во</TableCell>
                <TableCell>Цена</TableCell>
                <TableCell>Статус</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.order.id}</TableCell>
                  <TableCell>{item?.item_shop?.product?.name}</TableCell>
                  <TableCell>{item?.item_shop?.shop_reference}</TableCell>
                  <TableCell
                    style={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item?.order?.created_at}
                  </TableCell>
                  <TableCell>Дата доставки</TableCell>
                  <TableCell>Магазин</TableCell>
                  <TableCell>К-во</TableCell>
                  <TableCell>Цена</TableCell>
                  <TableCell>
                    <Alert severity="success">Доставлен</Alert>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
      </Card>
    </>
  );
};

export default Orders;
