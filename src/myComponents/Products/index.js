import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Card, Alert } from "@mui/material";
import cls from "./prod.module.scss";
import { ViewIcon, EditIcon, DeleteIcon } from "../../svg";
import { productsGet } from "../../store/products/productThunk";
import { useDispatch, useSelector } from "react-redux";
import { apiInfo } from "../../api/info";
import ReactPaginate from "react-paginate";
import Link from "next/link";

const Products = () => {
  const dispatch = useDispatch();
  const { productsAll, meta } = useSelector((state) => state.products);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState(null);
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);

  const [magazine, setMagazine] = useState(null);
  const [status, setStatus] = useState(null);
  const [categor, setCategor] = useState(null);
  const [podCategor, setPodGategor] = useState(null);
  const [data, setData] = useState({});

  useEffect(() => {
    dispatch(productsGet());
    apiInfo().then((res) => {
      setData(res.data.data);
    });
  }, [dispatch]);

  const sendSearch = () => {
    const params = {
      search: search,
      min_price: min,
      max_price: max,
      active: status,
      page: 1,
      asc: 0,
    };
    dispatch(productsGet(params));
  };

  const handlePageClick = (obj) => {
    const page = obj.selected + 1;
    setPage(page);
    const params = {
      search: search,
      min_price: min,
      max_price: max,
      active: status,
      page: page,
      asc: 0,
    };
    productsAll?.current?.scrollIntoView();
    dispatch(productsGet(params));
  };

  const resetBtn = () => {
    dispatch(productsGet());
    setSearch("");
    setMin(null);
    setMax(null);
    setMagazine(null);
    setStatus("");
    setCategor(null);
  };

  return (
    <>
      {" "}
      <Card>
        <Box
          sx={{
            p: 3,
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            label="Поиск"
          />
          <TextField
            value={min}
            onChange={(e) => setMin(e.target.value)}
            label="Мин цена"
          />
          <TextField
            value={max}
            onChange={(e) => setMax(e.target.value)}
            label="Макс цена"
          />

          <TextField
            name="magazine"
            select
            value={magazine}
            onChange={(e) => setMagazine(e.target.value)}
            SelectProps={{ native: true }}
            InputLabelProps={{ shrink: true }}
            label="Магазины"
            sx={{ maxWidth: "300px" }}
            fullWidth
          >
            <option value="">Viberite Magazin</option>
            {data.shops?.length &&
              data.shops?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </TextField>

          <TextField
            name="status"
            select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            SelectProps={{ native: true }}
            InputLabelProps={{ shrink: true }}
            label="Статус"
            sx={{ maxWidth: "300px" }}
            fullWidth
          >
            <option value=""> Выберите статус</option>
            <option value="1">Активный</option>
            <option value="0">Не активный</option>
          </TextField>
          <TextField
            name="categor"
            select
            value={categor}
            onChange={(e) => setCategor(e.target.value)}
            SelectProps={{ native: true }}
            InputLabelProps={{ shrink: true }}
            label="Категории"
            sx={{ maxWidth: "300px" }}
            fullWidth
          >
            <option>Выберите</option>
          </TextField>

          <TextField
            name="podCategor"
            select
            value={podCategor}
            onChange={(e) => setPodGategor(e.target.value)}
            SelectProps={{ native: true }}
            InputLabelProps={{ shrink: true }}
            label="Под Категории"
            sx={{ maxWidth: "300px" }}
            fullWidth
          >
            <option>Выберите</option>
          </TextField>
        </Box>
        <Box
          sx={{
            p: 3,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <button onClick={resetBtn} className="button-36">
            Cбросить
          </button>
          <button onClick={sendSearch} className="button-35">
            Поиск
          </button>
        </Box>
      </Card>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
        }}
      >
        <Card>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 1,
            }}
          >
            <Box sx={{ flexGrow: 1, p: 2, fontWeight: "700" }}>
              Cписок продуктов
            </Box>

            <Box>
              <Button variant="contained">Выгрузить список продуктов</Button>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1, p: 2 }}>
            <Box sx={{ flexGrow: 1 }} className={cls.any}>
              {productsAll.map((item) => (
                <Box key={item.id}>
                  <Box className={cls.allArpa}>
                    <Box className={cls.prod}>
                      <Box className={cls.wrap}>
                        <Box>
                          <img src={item.product.images[0].url} />
                        </Box>
                      </Box>
                      <Box>
                        <Box className={cls.txt}>
                          <p className={cls.titleArct}>ID:</p>
                          <span className={cls.article}>{item.id}</span>
                          <br />
                          <br />
                          <p className={cls.titleArct}>Артикул:</p>
                          <span className={cls.article}>{item.reference}</span>
                          <br />
                          <br />
                          <p className={cls.titleArct}>Наименование:</p>
                          <span className={cls.article}>
                            {item.product.name}
                          </span>

                          <br />
                          <br />
                          <p className={cls.titleArct}> К-во:</p>
                          <span className={cls.article}>{item.quantity}</span>
                        </Box>
                      </Box>
                    </Box>
                    <Box className={cls.btns}>
                      {item.active == 1 ? (
                        <Alert severity="success">Активный</Alert>
                      ) : (
                        <Alert severity="error">Не Активный</Alert>
                      )}
                      <Box className={cls.btn}>
                        <Link
                          href={{
                            pathname: "/dashboard/product/[id]",
                            query: { id: item.id },
                          }}
                          as={`/dashboard/product/${item.id}`}
                        >
                          <Button
                            style={{
                              backgroundColor: "#5048E5",
                            }}
                          >
                            <ViewIcon />
                          </Button>
                        </Link>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Card>
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
