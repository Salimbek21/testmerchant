import React from "react";
import { alpha, useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { ArrowRight as ArrowRightIcon } from "../../../icons/arrow-right";
import { ChevronDown as ChevronDownIcon } from "../../../icons/chevron-down";
import { ChevronUp as ChevronUpIcon } from "../../../icons/chevron-up";
import numeral from 'numeral';
import {CartIcon,CashIcon,KolIcon} from '../../../svg'
const Cards = ({data}) => {

  
  return (
    <>
      <Grid container spacing={4}>
        <Grid item md={4} sm={6} >
          <Card>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: 2,
              }}
            >
              <div>
                <Typography color="textSecondary" variant="body2">
                ПРОДАННЫЕ ТОВАРЫ
                </Typography>
                <Typography sx={{ mt: 1 }} variant="h5">
                  {numeral(data?.sold_item_count).format('0,0')}

                </Typography>
              </div>
              <CartIcon />
            </Box>
            <Divider />
            <CardActions>
              <Button endIcon={<ArrowRightIcon fontSize="small" />}>
              Просмотреть все
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item md={4} sm={6} >
          <Card>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: 2,
              }}
            >
              <div>
                <Typography color="textSecondary" variant="body2">
                СУММА ПРОДАННЫХ ТОВАРОВ
                </Typography>
                <Typography sx={{ mt: 1 }} variant="h5">
                {numeral(data?.sold_items_total_price).format('0,0')}

                </Typography>
              </div>
              <CashIcon />
            </Box>
            <Divider />
            <CardActions
              sx={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <Avatar
                sx={{
                  backgroundColor: (theme) =>
                    alpha(theme.palette.success.main, 0.08),
                  color: "success.main",
                  height: 36,
                  width: 36,
                }}
              >
                <ChevronUpIcon fontSize="small" />
              </Avatar>
              <Typography
                color="textSecondary"
                sx={{ ml: 1 }}
                variant="caption"
              >
                12% more then last month
              </Typography>
            </CardActions>
          </Card>
        </Grid>
        <Grid item md={4} sm={6} >
          <Card>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: 2,
              }}
            >
              <div>
                <Typography color="textSecondary" variant="body2">
                К-ВО ДОБАВЛЕННЫХ ТОВАРОВ
                </Typography>
                <Typography sx={{ mt: 1 }} variant="h5">
                {numeral(data.all_items_count).format('0,0')}

                </Typography>
              </div>
              <KolIcon />
            </Box>
            <Divider />
            <CardActions
              sx={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <Avatar
                sx={{
                  backgroundColor: (theme) =>
                    alpha(theme.palette.error.main, 0.08),
                  color: "error.main",
                  height: 36,
                  width: 36,
                }}
              >
                <ChevronDownIcon fontSize="small" />
              </Avatar>
              <Typography
                color="textSecondary"
                sx={{ ml: 1 }}
                variant="caption"
              >
                30% less then last month
              </Typography>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Cards;
