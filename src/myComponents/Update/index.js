/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Scrollbar } from "../../components/scrollbar";
import { SavedIcon } from "../../svg";
import cls from "../Magazine/magazine.module.scss";
import { apiInfo, apiUpdataParol,apiUpdateInfo } from "../../api/info";
import toast from "react-hot-toast";
const Update = () => {
  const [data, setData] = useState(null);

  const [telNumber, setTelNumber] = useState(null);
  const [name, setName] = useState(null);
  const [scndName, setScndName] = useState(null);
  const [mail, setMail] = useState(null);
  const [image, setImage] = useState(null);

  const [pass, setPass] = useState(null);
  const [newPass, setNewPass] = useState(null);
  const [passConf, setPassConf] = useState(null);

  useEffect(async () => {
    await apiInfo().then((r) => {
      setData(r.data.data);
      setTelNumber(r.data.data.phone);
      setName(r.data.data.first_name);
      setScndName(r.data.data.last_name);
      setMail(r.data.data.email);
    });
  }, []);

  const UpdateParol = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("old_password", pass);
    formData.append("password", newPass);
    formData.append("password_confirmation", passConf);
    apiUpdataParol(formData)
  };


const changeImage = (e) => {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  image(file);
};


  const updateFOrm = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("phone", telNumber);
    formData.append("first_name", name);
    formData.append("last_name", scndName);
    formData.append("email", mail);
    formData.append("image", image);
    apiUpdateInfo(formData).then((r)=>{

    }).catch((e)=>{
        toast.error(e.data.message)
    })
  };

  return (
    <>
      <Box
        sx={{
          p: 3,
        }}
      >
        <Typography variant="h6" sx={{ m: 3 }}>
          Обновить информацию
        </Typography>
        <Scrollbar>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Номер телефона</TableCell>
                <TableCell>Имя</TableCell>
                <TableCell>Фамилия</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="center">Фотография</TableCell>
                <TableCell>Действие</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <TextField
                    onChange={(e) => setTelNumber(e.target.value)}
                    value={telNumber}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    onChange={(e) => setScndName(e.target.value)}
                    value={scndName}
                  />
                </TableCell>{" "}
                <TableCell>
                  <TextField
                    onChange={(e) => setMail(e.target.value)}
                    value={mail}
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                  >
                    <input onChange={e => changeImage(e)} hidden accept="image/*" type="file" />
                    <PhotoCamera />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <button onClick={updateFOrm} className={cls.btn}>
                    <SavedIcon />
                  </button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Scrollbar>

        <Typography variant="h6" sx={{ m: 3 }}>
          Обновить пароль
        </Typography>
        <Scrollbar>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Старый пароль</TableCell>
                <TableCell>Новый пароль</TableCell>
                <TableCell>Подвердите пароль</TableCell>
                <TableCell align="center">Действие</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <TextField
                    onChange={(e) => setPass(e.target.value)}
                    value={pass}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    onChange={(e) => setNewPass(e.target.value)}
                    value={newPass}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    onChange={(e) => setPassConf(e.target.value)}
                    value={passConf}
                  />
                </TableCell>{" "}
                <TableCell align="center">
                  <button onClick={UpdateParol} className={cls.btn2}>
                    <SavedIcon />
                  </button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Scrollbar>
      </Box>
    </>
  );
};

export default Update;
