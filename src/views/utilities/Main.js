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
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { typography } from "@mui/system";
import axios from "axios";

const Main = () => {
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
    console.log(todayCases);
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
    console.log(declareRefInfo);
  }, [isLoggedIn, phone, queryId]);

  useEffect(() => {
    if (cases.length && authInfo) {
      getLocalCases();
    }
  }, [cases, authInfo]);

  return (
    <div className="container main">
      {isLoggedIn ? (
        <div>
          {injectionInfo.numberOfInjections ? (
            <div>
              <div>
                {injectionInfo && (
                  <div>
                    {!injectionInfo.dataSubmitted ? (
                      <Stack>
                        <Typography variant="h4" gutterBottom>
                          {" "}
                          Chưa có dữ liệu tiêm chủng của bạn
                        </Typography>
                        <Typography>
                          Vui lòng bấm vào đây để gửi yêu cầu xác nhận thông tin
                          tiêm chủng
                        </Typography>
                      </Stack>
                    ) : (
                      <Typography variant="h4" gutterBottom>
                        {" "}
                        Bạn đã tiêm {injectionInfo?.numberOfInjections} vaccine
                      </Typography>
                    )}
                    <div className="main-info">
                      <Stack
                        spacing={2}
                        direction="column"
                        sx={{ maxWidth: 400, alignItems: "center" }}
                      >
                        {injectionInfo?.firstDose === "" ? (
                          <></>
                        ) : (
                          <Typography variant="subtitle1" gutterBottom>
                            Mũi số 1: {injectionInfo?.firstDose} -{" "}
                            {injectionInfo?.injectDate1} - Đơn vị tiêm:{" "}
                            {injectionInfo?.injectPerson1}
                          </Typography>
                        )}

                        {injectionInfo.secondDose === "" ||
                          injectionInfo.secondDose === "Chưa tiêm" ? (
                          ""
                        ) : (
                          <Typography variant="subtitle1" gutterBottom>
                            Mũi số 2: {injectionInfo?.secondDose}-{" "}
                            {injectionInfo?.injectDate2} - Đơn vị tiêm:{" "}
                            {injectionInfo?.injectPerson2}
                          </Typography>
                        )}
                        {injectionInfo.thirdDose === "" ||
                          injectionInfo.thirdDose === "Chưa tiêm" ? (
                          ""
                        ) : (
                          <Typography variant="subtitle1" gutterBottom>
                            Mũi số 3: {injectionInfo?.thirdDose} -{" "}
                            {injectionInfo?.injectDate3} - Đơn vị tiêm:{" "}
                            {injectionInfo?.injectPerson3}
                          </Typography>
                        )}
                      </Stack>
                    </div>
                    <div>---------------------------------</div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              {" "}
              <Typography variant="h5" gutterBottom>
                Bạn chưa có thông tin tiêm chủng
              </Typography>
            </div>
          )}
        </div>
      ) : (
        <Typography variant="h5" gutterBottom>
          Vui lòng đăng nhập để tiếp tục
        </Typography>
      )}
    </div>
  );
};

export default Main;
