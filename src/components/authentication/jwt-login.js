import { useState } from "react";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Alert, Box, Button, FormHelperText, TextField } from "@mui/material";
import { useAuth } from "../../hooks/use-auth";
import { useMounted } from "../../hooks/use-mounted";

export const JWTLogin = (props) => {
  const isMounted = useMounted();
  const router = useRouter();
  const { login } = useAuth();
  const [phone, setPhone] = useState(null);
  const [pass, setPass] = useState(null);


  const sendReq = async (e) => {
    e.preventDefault();
    await login(phone, pass)
  };
  

  return (
    <form
      noValidate
      // onSubmit={formik.handleSubmit}
      {...props}
    >
      <TextField
        autoFocus
        fullWidth
        label="Номер телефона"
        margin="normal"
        name="email"
        type="email"
        autoComplete="off"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
      />
      <TextField
        fullWidth
        label="Пароль"
        margin="normal"
        autoComplete="off"
        name="password"
        type="password"
        onChange={(e) => setPass(e.target.value)}
        value={pass}
      />
      <Box sx={{ mt: 2 }}>
        <Button
          fullWidth
          size="large"
          type="submit"
          onClick={sendReq}
          variant="contained"
        >
          Log In
        </Button>
      </Box>
    </form>
  );
};
