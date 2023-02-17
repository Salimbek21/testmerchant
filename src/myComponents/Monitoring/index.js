import React from "react";
import {
  Card,
  CardHeader,
  Table,
  TableBody,
  Box,
  TableCell,
  TableHead,
  Alert,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { Scrollbar } from "../../components/scrollbar";
import numeral from "numeral";
import dynamic from "next/dynamic";

const Cards = dynamic(() => import("./Cards"), {
  loading: () => "Loading...",
});

const Graph = dynamic(() => import("./Graph"), {
  loading: () => "Loading...",
});

const Monitoring = ({ data, tableData }) => {
  console.log(tableData.length <= 0 ? "load" : "notload", "spine");
  return (
    <>
      <Cards data={data} />
      <Graph />
      <Card>
        <CardHeader title="Новые заказы" />
        <Scrollbar>
          {tableData.length <= 0  ? (
              <>
              
              <Box className="laoder">
            <CircularProgress />
          </Box>
          <Table sx={{ minWidth: 600, mb: 3 }}>
            <TableHead>
              <TableRow>
                <TableCell>№ Заказа</TableCell>
                <TableCell>Наименование</TableCell>
                <TableCell>Артикул</TableCell>
                <TableCell>Магазин</TableCell>
                <TableCell>К-во</TableCell>
                <TableCell>Дата</TableCell>
                <TableCell>Сумма</TableCell>
                <TableCell>Статус</TableCell>
              </TableRow>
            </TableHead>
            </Table>
              </>
          ):(
<Table sx={{ minWidth: 600, mb: 3 }}>
            <TableHead>
              <TableRow>
                <TableCell>№ Заказа</TableCell>
                <TableCell>Наименование</TableCell>
                <TableCell>Артикул</TableCell>
                <TableCell>Магазин</TableCell>
                <TableCell>К-во</TableCell>
                <TableCell>Дата</TableCell>
                <TableCell>Сумма</TableCell>
                <TableCell>Статус</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {tableData.length &&
                tableData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item?.order?.id}</TableCell>
                    <TableCell>{item?.item_shop?.product?.name}</TableCell>
                    <TableCell>{item?.item_shop?.shop_reference}</TableCell>
                    <TableCell>{item?.item_shop?.shop?.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell
                      style={{
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item?.order?.created_at}
                    </TableCell>
                    <TableCell
                      style={{
                        whiteSpace: "nowrap",
                      }}
                    >
                      {numeral(item.item_shop.price).format("0,0")} сум
                    </TableCell>
                    <TableCell>
                      {item.order.state.id == 5 ? (
                        <>
                          <Alert severity="success">
                            {item.order.state.name}
                          </Alert>
                        </>
                      ) : (
                        <Alert severity="warning">
                          {item.order.state.name}
                        </Alert>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          )}
         

          
        </Scrollbar>
      </Card>
    </>
  );
};

export default Monitoring;
