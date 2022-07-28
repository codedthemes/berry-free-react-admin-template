import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  auth,
  db,
  queryGetUserInfoByEmail,
  queryGetUserInfoByPhone,
  dataRef,
  injectionRequestRef,
  storage,
  selfDeclareRef,
  injectionRef,
} from "../../firebase/firebase";
import { onSnapshot, doc, setDoc, orderBy, addDoc } from "@firebase/firestore";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";

const SelfDeclare = () => {
  const [totalUserInfo, setTotalUserInfo] = useState("");
  const [totalInjectionInfo, setTotalInjectionInfo] = useState([]);

  const [infectedTimes, setInfectedTimes] = useState("");

  const [infectedDate1, setInfectedDate1] = useState("");
  const [infectedDate2, setInfectedDate2] = useState("");
  const [infectedDate3, setInfectedDate3] = useState("");

  const [curedDate1, setCuredDate1] = useState("");
  const [curedDate2, setCuredDate2] = useState("");
  const [curedDate3, setCuredDate3] = useState("");

  const [infectedNote1, setInfectedNote1] = useState("");
  const [infectedNote2, setInfectedNote2] = useState("");
  const [infectedNote3, setInfectedNote3] = useState("");

  const [userInfo, setUserInfo] = useState("");
  const [userRole, setUserRole] = useState("");

  const [declareRefInfo, setDeclareRefInfo] = useState(null)
  const [declareRefId, setDeclareRefId] = useState("")

  const [injectRefInfo, setInjectRefInfo] = useState(null);
  const [injectRefId, setInjectRefId] = useState("");


  const [userEmail, setUserEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const [userId, setUserId] = useState(null);
  // const [userIdNumber, setUserIdNumber] = useState("");
  const [injectionInfo, setInjectionInfo] = useState({});
  const [injectionId, setInjectionId] = useState("");
  const [authInfo, setAuthInfo] = useState(null);

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setIsLoggedIn(currentUser);
      setUserEmail(currentUser.email);
    } else {
      setIsLoggedIn(null);
    }
  });


  const submitSelfDeclareHandler = (e) => {
    e.preventDefault();
    setDoc(doc(db, "selfDeclareData", declareRefId), {
      ...declareRefInfo,
      infectedDate1: infectedDate1,
      infectedDate2: infectedDate2,
      infectedDate3: infectedDate3,
      infectedNote1: infectedNote1,
      infectedNote2: infectedNote2,
      infectedNote3: infectedNote3,
      curedDate1,
      curedDate2,
      curedDate3,

    });
    setDoc(doc(db, "injectionData", injectRefId), {
        ...declareRefInfo,
        infectedTimes: infectedTimes,
      });
  };

  useEffect(() => {
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
          setUserId(data.id);
          setUserRole(data.data().assignedRole);
        });
      });
      if (authInfo.name) {
        onSnapshot(queryGetUserInfoByPhone(selfDeclareRef, phone), (snapshot) => {
            console.log(snapshot._snapshot.docChanges.length);
            if (snapshot._snapshot.docChanges.length === 0) {
              addDoc(selfDeclareRef, {
                  phone: phone,
                firstDose: "",
                secondDose: "",
                thirdDose: "",
                numberOfInjections: "",
                infectedTimes: "",
                injectDate1: "",
                injectDate2: "",
                injectDate3: "",
                injectPerson1: "",
                injectPerson2: "",
                injectPerson3: "",
                  name: authInfo.name,
              });
            }
            snapshot.forEach((data) => {
              setDeclareRefInfo(data.data());
              setDeclareRefId(data.id);
            });
          }
        );
        onSnapshot(queryGetUserInfoByPhone(injectionRef, phone), (snapshot) => {
            console.log(snapshot._snapshot.docChanges.length);
            snapshot.forEach((data) => {
                setInjectRefInfo(data.data());
                setInjectRefId(data.id);
            });
          })
      }
    }
    
    console.log(declareRefInfo);
  }, [isLoggedIn, userRole]);

  return (
    <Stack className="container addInfo">
      {userRole === "admin" ||
      userRole === "moderator" ||
      userRole === "user" ? (
        <Stack>
          {declareRefInfo ? (
            <Stack>
              <Stack>
                <Stack>
                  <Typography variant="h4" gutterBottom>
                    Thông tin người dùng
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="subtitle1" gutterBottom>
                    Họ và tên: {authInfo.name}{" "}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="subtitle1" gutterBottom>
                    Ngày sinh: {authInfo.dob}{" "}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="subtitle1" gutterBottom>
                    Số mũi đã tiêm: {declareRefInfo.numberOfInjections}{" "}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="subtitle1" gutterBottom>
                    Mũi số 1: {declareRefInfo.firstDose}{" "}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="subtitle1" gutterBottom>
                    Mũi số 2: {declareRefInfo.secondDose}{" "}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="subtitle1" gutterBottom>
                    Mũi số 3: {declareRefInfo.thirdDose}{" "}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="h6" gutterBottom>
                    Lịch sử lây nhiễm
                  </Typography>
                  {declareRefInfo.infectedTimes === "" ? (
                    <Stack>
                      <Typography variant="subtitle1" gutterBottom>
                        <em>Bạn chưa từng nhiễm bệnh</em>
                      </Typography>
                    </Stack>
                  ) : (
                    <Stack>
                      <Stack>
                        {declareRefInfo.infectedDate1 === "" ? (
                          <></>
                        ) : (
                          <Stack className=".addInfo-info">
                            <Stack
                              direction="row"
                              className="addInfo-button"
                              spacing={1}
                            >
                              <Typography variant="subtitle1" gutterBottom>
                                Ngày nhiễm bệnh lần 1:{" "}
                                {declareRefInfo.infectedDate1} - {""}
                              </Typography>
                              <Typography variant="subtitle1" gutterBottom>
                                Ngày khỏi bệnh: {declareRefInfo.curedDate1} {""}
                              </Typography>
                            </Stack>
                            <Stack>
                              <Typography variant="subtitle1" gutterBottom>
                                {declareRefInfo.infectedNote1 === "" ? (
                                  <Typography variant="subtitle1" gutterBottom>
                                    Ghi chú: Không có
                                  </Typography>
                                ) : (
                                  <Typography variant="subtitle1" gutterBottom>
                                    Ghi chú: {declareRefInfo.infectedNote1}
                                  </Typography>
                                )}
                              </Typography>
                            </Stack>
                          </Stack>
                        )}
                      </Stack>
                      <Stack>
                        {declareRefInfo.infectedDate2 === "" ? (
                          ""
                        ) : (
                          <Stack className=".addInfo-info">
                            <Stack
                              direction="row"
                              className="addInfo-button"
                              spacing={1}
                            >
                              <Typography variant="subtitle1" gutterBottom>
                                Ngày nhiễm bệnh lần 2:{" "}
                                {declareRefInfo.infectedDate2} - {""}
                              </Typography>
                              <Typography variant="subtitle1" gutterBottom>
                                Ngày khỏi bệnh: {declareRefInfo.curedDate2} {""}
                              </Typography>
                            </Stack>
                            <Stack>
                              <Typography variant="subtitle1" gutterBottom>
                                {declareRefInfo.infectedNote2 === "" ? (
                                  <Typography variant="subtitle1" gutterBottom>
                                    Ghi chú: Không có
                                  </Typography>
                                ) : (
                                  <Typography variant="subtitle1" gutterBottom>
                                    Ghi chú: {declareRefInfo.infectedNote2}
                                  </Typography>
                                )}
                              </Typography>
                            </Stack>
                          </Stack>
                        )}
                      </Stack>
                      <Stack>
                        {declareRefInfo.infectedDate3 === "" ? (
                          ""
                        ) : (
                          <Stack className=".addInfo-info">
                            <Stack
                              direction="row"
                              className="addInfo-button"
                              spacing={1}
                            >
                              <Typography variant="subtitle1" gutterBottom>
                                Ngày nhiễm bệnh lần 3:{" "}
                                {declareRefInfo.infectedDate3} - {""}
                              </Typography>
                              <Typography variant="subtitle1" gutterBottom>
                                Ngày khỏi bệnh: {declareRefInfo.curedDate3} {""}
                              </Typography>
                            </Stack>
                            <Stack>
                              <Typography variant="subtitle1" gutterBottom>
                                {declareRefInfo.infectedNote3 === "" ? (
                                  <Typography variant="subtitle1" gutterBottom>
                                    Ghi chú: Không có
                                  </Typography>
                                ) : (
                                  <Typography variant="subtitle1" gutterBottom>
                                    Ghi chú: {declareRefInfo.infectedNote3}
                                  </Typography>
                                )}
                              </Typography>
                            </Stack>
                          </Stack>
                        )}
                      </Stack>
                    </Stack>
                  )}
                </Stack>
              </Stack>
              <Stack alignItems="center">
                <Button
                  sx={{ marginBottom: 5, marginTop: 1 }}
                  variant="contained"
                  type="sumbit"
                >
                  Thêm thông tin lây nhiễm
                </Button>
                <Stack alignItems="center">
                  <FormControl variant="outlined" sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-label">
                      Số lần nhiễm bệnh
                    </InputLabel>
                    <Select
                      label={"Số lần nhiễm bệnh"}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={(e) => setInfectedTimes(e.target.value)}
                      value={infectedTimes}
                    >
                      <MenuItem value="" disabled>
                        Số lần nhiễm bệnh
                      </MenuItem>
                      <MenuItem value="1 lần">1 lần</MenuItem>
                      <MenuItem value="2 lần">2 lần</MenuItem>
                      <MenuItem value="3 lần">3 lần</MenuItem>
                    </Select>
                  </FormControl>
                  {infectedTimes === "1 lần" ? (
                    <Stack>
                      <Stack
                        spacing={2}
                        direction="row"
                        className="addInfo-button"
                        sx={{ alignItems: "baseline" }}
                      >
                        <TextField
                          sx={{ margin: 1, minWidth: 210 }}
                          id="standard-basic"
                          helperText="Lần nhiễm số 1"
                          variant="outlined"
                          type="date"
                          className="register-dob"
                          value={infectedDate1}
                          onChange={(e) => setInfectedDate1(e.target.value)}
                        />
                      </Stack>
                      <Stack
                        spacing={2}
                        direction="row"
                        className="addInfo-button"
                        sx={{ alignItems: "baseline" }}
                      >
                        <TextField
                          sx={{ margin: 1, minWidth: 210 }}
                          id="standard-basic"
                          helperText="Ngày khỏi bệnh"
                          variant="outlined"
                          type="date"
                          className="register-dob"
                          value={curedDate1}
                          onChange={(e) => setCuredDate1(e.target.value)}
                        />
                      </Stack>
                      <Stack
                        spacing={2}
                        direction="row"
                        className="addInfo-button"
                        sx={{ alignItems: "baseline" }}
                      >
                        <TextField
                          sx={{ margin: 1, minWidth: 210 }}
                          id="standard-basic"
                          variant="outlined"
                          type="text"
                          label="Ghi chú lần 1"
                          className="addInfo-findWithPhone"
                          value={infectedNote1}
                          onChange={(e) => setInfectedNote1(e.target.value)}
                        />
                      </Stack>
                    </Stack>
                  ) : (
                    <Stack>
                      {infectedTimes === "2 lần" ? (
                        <Stack>
                          <Stack
                            spacing={2}
                            direction="row"
                            className="addInfo-button"
                            sx={{ alignItems: "baseline" }}
                          >
                            <TextField
                              sx={{ margin: 1, minWidth: 210 }}
                              id="standard-basic"
                              helperText="Lần nhiễm số 1"
                              variant="outlined"
                              type="date"
                              className="register-dob"
                              value={infectedDate1}
                              onChange={(e) => setInfectedDate1(e.target.value)}
                            />
                            <TextField
                              sx={{ margin: 1, minWidth: 210 }}
                              id="standard-basic"
                              helperText="Lần nhiễm số 2"
                              variant="outlined"
                              type="date"
                              className="register-dob"
                              value={infectedDate2}
                              onChange={(e) => setInfectedDate2(e.target.value)}
                            />
                          </Stack>
                          <Stack
                            spacing={2}
                            direction="row"
                            className="addInfo-button"
                            sx={{ alignItems: "baseline" }}
                          >
                            <TextField
                              sx={{ margin: 1, minWidth: 210 }}
                              id="standard-basic"
                              helperText="Ngày khỏi bệnh"
                              variant="outlined"
                              type="date"
                              className="register-dob"
                              value={curedDate1}
                              onChange={(e) => setCuredDate1(e.target.value)}
                            />
                            <TextField
                              sx={{ margin: 1, minWidth: 210 }}
                              id="standard-basic"
                              helperText="Ngày khỏi bệnh"
                              variant="outlined"
                              type="date"
                              className="register-dob"
                              value={curedDate2}
                              onChange={(e) => setCuredDate2(e.target.value)}
                            />
                          </Stack>
                          <Stack
                            spacing={2}
                            direction="row"
                            className="addInfo-button"
                            sx={{ alignItems: "baseline" }}
                          >
                            <TextField
                              sx={{ margin: 1, minWidth: 210 }}
                              id="standard-basic"
                              variant="outlined"
                              type="text"
                              label="Ghi chú lần 1"
                              className="addInfo-findWithPhone"
                              value={infectedNote1}
                              onChange={(e) => setInfectedNote1(e.target.value)}
                            />
                            <TextField
                              id="standard-basic"
                              variant="outlined"
                              type="text"
                              label="Ghi chú lần 2"
                              className="addInfo-findWithPhone"
                              value={infectedNote2}
                              onChange={(e) => setInfectedNote2(e.target.value)}
                            />
                          </Stack>
                        </Stack>
                      ) : (
                        <Stack>
                          {infectedTimes === "3 lần" ? (
                            <Stack>
                              <Stack
                                spacing={2}
                                direction="row"
                                className="addInfo-button"
                                sx={{ alignItems: "baseline" }}
                              >
                                <TextField
                                  sx={{ margin: 1, minWidth: 210 }}
                                  id="standard-basic"
                                  helperText="Lần nhiễm số 1"
                                  variant="outlined"
                                  type="date"
                                  className="register-dob"
                                  value={infectedDate1}
                                  onChange={(e) =>
                                    setInfectedDate1(e.target.value)
                                  }
                                />
                                <TextField
                                  sx={{ margin: 1, minWidth: 210 }}
                                  id="standard-basic"
                                  helperText="Lần nhiễm số 2"
                                  variant="outlined"
                                  type="date"
                                  className="register-dob"
                                  value={infectedDate2}
                                  onChange={(e) =>
                                    setInfectedDate2(e.target.value)
                                  }
                                />
                                <TextField
                                  sx={{ margin: 1, minWidth: 210 }}
                                  id="standard-basic"
                                  helperText="Lần nhiễm số 3"
                                  variant="outlined"
                                  type="date"
                                  className="register-dob"
                                  value={infectedDate3}
                                  onChange={(e) =>
                                    setInfectedDate3(e.target.value)
                                  }
                                />
                              </Stack>
                              <Stack
                                spacing={2}
                                direction="row"
                                className="addInfo-button"
                                sx={{ alignItems: "baseline" }}
                              >
                                <TextField
                                  sx={{ margin: 1, minWidth: 210 }}
                                  id="standard-basic"
                                  helperText="Ngày khỏi bệnh"
                                  variant="outlined"
                                  type="date"
                                  className="register-dob"
                                  value={curedDate1}
                                  onChange={(e) =>
                                    setCuredDate1(e.target.value)
                                  }
                                />
                                <TextField
                                  sx={{ margin: 1, minWidth: 210 }}
                                  id="standard-basic"
                                  helperText="Ngày khỏi bệnh"
                                  variant="outlined"
                                  type="date"
                                  className="register-dob"
                                  value={curedDate2}
                                  onChange={(e) =>
                                    setCuredDate2(e.target.value)
                                  }
                                />
                                <TextField
                                  sx={{ margin: 1, minWidth: 210 }}
                                  id="standard-basic"
                                  helperText="Ngày khỏi bệnh"
                                  variant="outlined"
                                  type="date"
                                  className="register-dob"
                                  value={curedDate3}
                                  onChange={(e) =>
                                    setCuredDate3(e.target.value)
                                  }
                                />
                              </Stack>
                              <Stack
                                spacing={2}
                                direction="row"
                                className="addInfo-button"
                                sx={{ alignItems: "baseline" }}
                              >
                                <TextField
                                  sx={{ margin: 1, minWidth: 210 }}
                                  id="standard-basic"
                                  variant="outlined"
                                  type="text"
                                  label="Ghi chú lần 1"
                                  className="addInfo-findWithPhone"
                                  value={infectedNote1}
                                  onChange={(e) =>
                                    setInfectedNote1(e.target.value)
                                  }
                                />
                                <TextField
                                  id="standard-basic"
                                  variant="outlined"
                                  type="text"
                                  label="Ghi chú lần 2"
                                  className="addInfo-findWithPhone"
                                  value={infectedNote2}
                                  onChange={(e) =>
                                    setInfectedNote2(e.target.value)
                                  }
                                />
                                <TextField
                                  id="standard-basic"
                                  variant="outlined"
                                  type="text"
                                  label="Ghi chú lần 3"
                                  className="addInfo-findWithPhone"
                                  value={infectedNote3}
                                  onChange={(e) =>
                                    setInfectedNote3(e.target.value)
                                  }
                                />
                              </Stack>
                            </Stack>
                          ) : (
                            <Stack></Stack>
                          )}
                        </Stack>
                      )}
                    </Stack>
                  )}
                  <Button
                    variant="contained"
                    type="sumbit"
                    sx={{ marginBottom: 5, marginTop: 2 }}
                    onClick={submitSelfDeclareHandler}
                  >
                    Gửi
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          ) : (
            <Stack className="addRole-form">
            </Stack>
          )}
        </Stack>
      ) : (
        <Stack>
          <Stack>
            <Typography variant="h5" gutterBottom>
              Vui lòng đăng nhập để tiếp tục
            </Typography>
          </Stack>
          <Stack alignItems="center">
            <Button variant="contained">Quay lại trang chủ</Button>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};


export default SelfDeclare;