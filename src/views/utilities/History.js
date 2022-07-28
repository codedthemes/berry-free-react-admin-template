import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  auth,
  queryGetUserInfoByEmail,
  queryGetUserInfoByPhone,
  queryGetUserInfoById,
  injectionRef,
  dataRef,
  selfDeclareRef,
} from "../../firebase/firebase";

import { onSnapshot, doc, setDoc, orderBy, getDocs } from "@firebase/firestore";
import { Typography, Container, Stack, Card, CardContent, Box } from "@mui/material";

import axios from "axios";

const History = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [authInfo, setAuthInfo] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  //injectionRef
  const [injectionInfo, setInjectionInfo] = useState({});
  const [injectionId, setInjectionId] = useState("");
  //selfDeclareRef
  const [declareRefInfo, setDeclareRefInfo] = useState(null);
  const [declareRefId, setDeclareRefId] = useState("");
  //================
  const [phone, setPhone] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const [test, setTest] = useState(null);

  const [injectionInfoQuery, setInjectionInfoQuery] = useState("");
  const [injectionIdQuery, setInjectionIdQuery] = useState("");
  const [userInfoQuery, setUserInfoQuery] = useState("");
  const [userIdQuery, setUserIdQuery] = useState("");
  const [queryPhone, setQueryPhone] = useState("");
  const [queryId, setQueryId] = useState("");

  const [cases, setCases] = useState([]);
  const [location, setLocation] = useState("");
  const [todayCases, setTodayCases] = useState("");

  // query dataa
  const findInfoByPhoneHandler = (e) => {
    e.preventDefault();
    if (queryPhone) {
      onSnapshot(
        queryGetUserInfoByPhone(injectionRef, queryPhone),
        (snapshot) => {
          console.log(snapshot._snapshot.docChanges.length);
          if (snapshot._snapshot.docChanges.length === 0) {
            window.alert("Không tìm thấy dữ liệu người dùng");
          }

          snapshot.forEach((data) => {
            setInjectionInfoQuery(data.data());
            setInjectionIdQuery(data.id);
          });
        }
      );
      onSnapshot(queryGetUserInfoByPhone(dataRef, queryPhone), (snapshot) => {
        snapshot.forEach((data) => {
          // console.log(data.data().phone);
          setUserInfoQuery(data.data());
          setUserIdQuery(data.id);
        });
      });
    }
    if (queryId) {
      onSnapshot(queryGetUserInfoById(injectionRef, queryId), (snapshot) => {
        console.log(snapshot);
        if (snapshot._snapshot.docChanges.length === 0) {
          window.alert("Không tìm thấy dữ liệu người dùng");
          setUserInfoQuery("");
        }

        snapshot.forEach((data) => {
          setInjectionInfoQuery(data.data());
          setInjectionIdQuery(data.id);
        });
      });
      onSnapshot(queryGetUserInfoById(dataRef, queryId), (snapshot) => {
        snapshot.forEach((data) => {
          // console.log(data.data().phone);
          setUserInfoQuery(data.data());
          setUserIdQuery(data.id);
        });
      });
    }
  };

  const goBackHandler = (e) => {
    e.preventDefault();
    setUserInfoQuery("");
  };

  //axios
  const fetchCases = async () => {
    const { data } = await axios.post(
      `https://static.pipezero.com/covid/data.json`
    );
    setCases(data.locations);
  };

  const getLocalCases = () => {
    setTodayCases(cases[authInfo.districtId].casesToday);
    setLocation(cases[authInfo.districtId].name);
  };

  // `date` is a `Date` object
  const formatYmd = (date) => date.toISOString().slice(0, 10);
  const d = new Date();
  d.setDate(d.getDate() + 2);
  // Example

  useEffect(() => {
    fetchCases();
    // firebase
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsLoggedIn(currentUser);
        setUserEmail(currentUser.email);
      } else {
        setIsLoggedIn(null);
      }
    });


    onSnapshot(dataRef, orderBy("name", "desc"), (snapshot) => {
      let users = [];
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setUserInfo(users);
    });

    if (isLoggedIn) {
      onSnapshot(queryGetUserInfoByEmail(isLoggedIn.email), (snapshot) => {
        snapshot.forEach((data) => {
          setAuthInfo(data.data());
          setPhone(data.data().phone);
        });
      });
    }
    if (phone) {
      onSnapshot(queryGetUserInfoByPhone(injectionRef, phone), (snapshot) => {
        snapshot.forEach((data) => {
          setInjectionInfo(data.data());
          setInjectionId(data.id);
        });
      });
      onSnapshot(queryGetUserInfoByPhone(selfDeclareRef, phone), (snapshot) => {
        snapshot.forEach((data) => {
          setDeclareRefInfo(data.data());
          setDeclareRefId(data.id);
        });
      });
    }
  }, [isLoggedIn, phone, queryId]);

  useEffect(() => {
    if (cases.length && authInfo) {
      getLocalCases();
    }
  }, [cases, authInfo]);

  return (
    <Container className="container main">
      {isLoggedIn ? (
        <Card>
          {injectionInfo.numberOfInjections ? (
            <CardContent>
              {injectionInfo && (
                <div>
                  <Typography variant="h2" sx ={{ textAlign: 'center', textTransform: 'uppercase' }} gutterBottom>
                    Lịch sử lây nhiễm
                  </Typography>
                  {injectionInfo.infectedTimes === "" ? (
                    <Stack>
                      <Typography variant="subtitle1" gutterBottom>
                        <em>Bạn chưa từng nhiễm bệnh</em>
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        Bấm vào đây để tự khai lịch sử lây nhiễm của bạn
                      </Typography>
                    </Stack>
                  ) : (
                    <Stack>
                      {injectionInfo?.verifiedByAdmin ? (
                        <Stack>
                          <div>
                            {injectionInfo?.infectedDate1 === "" ? (
                              ""
                            ) : (
                              <Box spacing={2}>
                                <Typography
                                  variant="subtitle1"
                                  gutterBottom
                                >
                                  Ngày nhiễm bệnh lần 1: {injectionInfo?.infectedDate1} 
                                </Typography>
                                <Typography
                                  variant="subtitle1"
                                  gutterBottom
                                >
                                  Ghi chú: {injectionInfo?.infectedNote1}
                                </Typography>
                              </Box>
                            )}
                          </div>
                          <div>
                            {injectionInfo?.infectedDate2 === "" ? (
                              ""
                            ) : (
                              <Stack spacing={2}>
                                <Typography
                                  variant="subtitle1"
                                  gutterBottom
                                >
                                  Ngày nhiễm bệnh lần 2: {injectionInfo?.infectedDate2} 
                                </Typography>
                                <Typography
                                  variant="subtitle1"
                                  gutterBottom
                                >
                                  Ghi chú: {injectionInfo?.infectedNote2}
                                </Typography>
                              </Stack>
                            )}
                          </div>
                          <div>
                            {injectionInfo?.infectedDate3 === "" ? (
                              ""
                            ) : (
                              <Stack spacing={2}>
                                <Typography
                                  variant="subtitle1"
                                  gutterBottom
                                >
                                  Ngày nhiễm bệnh lần 3: {injectionInfo?.infectedDate3} 
                                </Typography>
                                <Typography
                                  variant="subtitle1"
                                  gutterBottom
                                >
                                  Ghi chú: {injectionInfo?.infectedNote3}
                                </Typography>
                              </Stack>
                            )}
                          </div>
                        </Stack>
                      ) : (
                        <Stack>
                          <div>
                            <Typography variant="h6" sx={{ color: 'red' }}>*Người dùng tự khai báo</Typography>
                            <div>
                              {declareRefInfo?.infectedDate1 === "" ? (
                                ""
                              ) : (
                                <Stack spacing={2}>
                                  <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                  >
                                    Ngày nhiễm bệnh lần 1:{" "}
                                    {declareRefInfo?.infectedDate1} {""}
                                  </Typography>
                                  <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                  >
                                    Ghi chú: {declareRefInfo?.infectedNote1}
                                  </Typography>
                                </Stack>
                              )}
                            </div>
                            <div>
                              {declareRefInfo?.infectedDate2 === "" ? (
                                ""
                              ) : (
                                <Stack spacing={2}>
                                  <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                  >
                                    Ngày nhiễm bệnh lần 2:{" "}
                                    {declareRefInfo?.infectedDate2} {""}
                                  </Typography>
                                  <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                  >
                                    Ghi chú: {declareRefInfo?.infectedNote2}
                                  </Typography>
                                </Stack>
                              )}
                            </div>
                            <div>
                              {declareRefInfo?.infectedDate3 === "" ? (
                                ""
                              ) : (
                                <Stack spacing={2}>
                                  <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                  >
                                    Ngày nhiễm bệnh lần 3:{" "}
                                    {declareRefInfo?.infectedDate3} {""}
                                  </Typography>
                                  <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                  >
                                    Ghi chú: {declareRefInfo?.infectedNote3}
                                  </Typography>
                                </Stack>
                              )}
                            </div>
                          </div>
                        </Stack>
                      )}
                    </Stack>
                  )}
                </div>
              )}
            </CardContent>
          ) : (
              <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
                Bạn chưa có thông tin tiêm chủng
              </Typography>
          )}
        </Card>
      ) : (
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}> 
          Vui lòng đăng nhập để tiếp tục
        </Typography>
      )}
    </Container>
  );
};

export default History;
