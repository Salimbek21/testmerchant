import React, { useEffect } from "react";

import {
  Box,
  Button,
  TextField,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import cls from "./magazine.module.scss";
import { ViewIconScnd } from "../../../src/svg";
const Magazine = () => {
  return (
    <>
      <Card>
        <Box
          sx={{
            p: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 3,
            }}
          >
            Торговые точки
          </Typography>
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Наименование</TableCell>
                  <TableCell>Общая сумма товаров</TableCell>
                  <TableCell align="center">Действие</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>BestComp (БН)</TableCell>
                  <TableCell>450 000 000 сум</TableCell>
                  <TableCell align="center">
                    <button  className={cls.btn}>
                      <ViewIconScnd />
                    </button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default Magazine;
