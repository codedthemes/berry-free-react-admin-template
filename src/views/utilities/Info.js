import React, { useState, useEffect } from "react";
import { onSnapshot, setDoc, doc, deleteDoc } from "@firebase/firestore";
import {
  auth,
  queryGetUserInfoByPhone,
  queryGetUserInfoByEmail,
  dataRef,
  db,
  injectionRef,
} from "../../firebase/firebase";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { Container, Typography, Stack, Card, CardContent, Grid, TextField, Button } from "@mui/material";
import { Link as MUILink } from "@mui/material";

import { makeStyles } from "@mui/styles";

const Info = () => {
  const [userInfo, setUserInfo] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const [totalUserInfo, setTotalUserInfo] = useState("");

  const useStyles = makeStyles((theme) => ({
    header: {
      marginBottom: '30px'
    },
    textField: {
      marginBottom: '38px'
    }
  }));

  const classes = useStyles();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsLoggedIn(currentUser);
      } else {
        setIsLoggedIn(null);
      }
    });

    onSnapshot(dataRef, (snapshot) => {
      let users = [];
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setTotalUserInfo(users);
    });

    if (isLoggedIn) {
      onSnapshot(queryGetUserInfoByEmail(isLoggedIn.email), (snapshot) => {
        snapshot.forEach((data) => {
          setUserInfo(data.data());
        });
      });
    }
  }, [isLoggedIn]);


  return (
    <Container className="container profile">
      <Card>
        <CardContent>
          <Typography variant="h3" className={classes.header} gutterBottom sx={{ textAlign: 'center' }}>
            THÔNG TIN CÁ NHÂN
          </Typography>
          {userInfo &&
            <>
              <Grid container spacing={4}>
                <Grid item sm={6}>
                  <TextField
                    className={classes.textField}
                    label="Họ và tên:"
                    defaultValue={userInfo.name}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    className={classes.textField}
                    label="Số CMND/CCCD:"
                    defaultValue={userInfo.idNumber}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    className={classes.textField}
                    label="Ngày tháng năm sinh:"
                    defaultValue={userInfo.dob}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    className={classes.textField}
                    label="Số điện thoại:"
                    defaultValue={userInfo.phone}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    className={classes.textField}
                    label="Email:"
                    defaultValue={userInfo.email}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    className={classes.textField}
                    label="Địa chỉ:"
                    defaultValue={userInfo.address}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    className={classes.textField}
                    label="Phường/Xã:"
                    defaultValue={userInfo.ward}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    className={classes.textField}
                    label="Quận/Huyện:"
                    defaultValue={userInfo.district}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    className={classes.textField}
                    label="Thành phố:"
                    defaultValue={userInfo.city}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <Typography variant="subtitle1" gutterBottom>
                    Để yêu cầu thay đổi thông tin, vui lòng bấm
                    <MUILink
                      to="/utils/request-change"
                      underline="none"
                      color="inherit"
                      component={RouterLink}
                      sx={{ fontWeight: 'bold', m: 1 }}
                    >
                      <Button variant="outlined" color="error">vào đây</Button>
                    </MUILink>
                  </Typography>
                </Grid>
              </Grid>
            </>
          }
        </CardContent>
      </Card>
    </Container>
  );
};

export default Info;
