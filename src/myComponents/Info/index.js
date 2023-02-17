import React, { useEffect, useState } from "react";

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
import { Scrollbar } from "../../components/scrollbar";
import {apiInfo} from '../../api/info'
const Info = () => {
  const [index, setIndex] = useState(0);
    const [data, setData] = useState({})

  useEffect(()=>{
    apiInfo().then((r)=>{
        setData(r.data.data)
    })
  },[])
  return (
    <>
      <Box
        sx={{
          p: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <button
            onClick={() => setIndex(0)}
            className={index == 0 ? "button-34" : "noactive"}
          >
            Главная Информация
          </button>

          <button
            onClick={() => setIndex(1)}
            className={index == 1 ? "button-34" : "noactive"}
          >
            Магазины
          </button>
        </Box>

        {index == 0 ? (
          <>
          <Scrollbar>
            <Table sx={{ mt: 5 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Имя</TableCell> 
                  <TableCell>Фамилия</TableCell>
                  <TableCell>Телефон</TableCell>
                  <TableCell>Дата регистрации</TableCell>
                  <TableCell>Последнее обновление</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {data.map((item)=>(
                    
                ))} */}
                <TableRow>
                <TableCell>{data.first_name}</TableCell> 
                  <TableCell>{data.last_name}</TableCell>
                  <TableCell>{data.phone}</TableCell>
                  <TableCell>{data.created_at}</TableCell>
                  <TableCell>{data.logged_at}</TableCell>
                  <TableCell>{data.email}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            </Scrollbar>
          </>
        ) : (
          <>
           <Scrollbar>
            <Table sx={{ mt: 5 }}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell> 
                  <TableCell>Наименование</TableCell>
                  <TableCell>	К-во продуктов</TableCell>
              
                </TableRow>
              </TableHead>
              <TableBody>
                {data.shops.map((item)=>(
                      <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell> 
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.item_count}</TableCell>
               
                      </TableRow>
                ))}
              
              </TableBody>
            </Table>
            </Scrollbar></>
        )}
      </Box>
    </>
  );
};

export default Info;
