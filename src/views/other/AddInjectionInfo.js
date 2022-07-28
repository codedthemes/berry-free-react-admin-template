import React, { useState, useEffect } from "react";
import {
  onSnapshot,
  setDoc,
  doc,
  deleteDoc,
  addDoc,
} from "@firebase/firestore";
import {
  auth,
  queryGetUserInfoByPhone,
  queryGetUserInfoByEmail,
  dataRef,
  db,
  injectionRef,
} from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";

export const AddInjectionInfo = ({ userId, setUserId }) => {
  const [phone, setPhone] = useState("");

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
  const [userEmail, setUserEmail] = useState("");
  // const [userIdNumber, setUserIdNumber] = useState("");
  const [injectionInfo, setInjectionInfo] = useState({});
  const [injectionId, setInjectionId] = useState("");

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUserEmail(currentUser.email);
      onSnapshot(queryGetUserInfoByEmail(userEmail), (snapshot) => {
        snapshot.forEach((data) => setUserRole(data.data().assignedRole));
      });
    }
  });

  const findInfoByPhoneHandler = (e) => {
    e.preventDefault();
    if (totalUserInfo) {
      onSnapshot(queryGetUserInfoByPhone(injectionRef, phone), (snapshot) => {
        console.log(snapshot._snapshot.docChanges.length);
        if (snapshot._snapshot.docChanges.length === 0) {
          //due to changes in Register, this may no longer useful
          if (
            window.confirm(
              "Không tìm thấy dữ liệu người dùng. \n Nhấn OK để tạo dữ liệu"
            )
          ) {
            addDoc(injectionRef, {
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
            })
              .then(window.alert("Tạo dữ liệu thành công"))
              .catch((err) => {
                console.log(err);
              });
          }
        }
        {
          snapshot.forEach((data) => {
            setInjectionInfo(data.data());
            setInjectionId(data.id);
          });
        }
      });
      onSnapshot(queryGetUserInfoByPhone(dataRef, phone), (snapshot) => {
        {
          snapshot.forEach((data) => {
            setUserInfo(data.data());
            setUserId(data.id);
            // setUserIdNumber(data.data().idNumber);
          });
        }
      });
    }
  };
  const submitInfectedInfoHandler = (e) => {
    e.preventDefault();
    setDoc(doc(db, "injectionData", injectionId), {
      ...injectionInfo,
      infectedDate1: infectedDate1,
      infectedDate2: infectedDate2,
      infectedDate3: infectedDate3,
      infectedNote1: infectedNote1,
      infectedNote2: infectedNote2,
      infectedNote3: infectedNote3,
      curedDate1,
      curedDate2,
      curedDate3,
      infectedTimes: infectedTimes,
    });
  };

  useEffect(() => {
    onSnapshot(injectionRef, (snapshot) => {
      let users = [];
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setTotalInjectionInfo(users);
    });
    onSnapshot(dataRef, (snapshot) => {
      let users = [];
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setTotalUserInfo(users);
    });
    console.log(totalInjectionInfo);
  }, [userId, userEmail]);

  return (
    <Stack className="container addInfo">
      {userRole === "admin" || userRole === "moderator" ? (
        <Stack>
          {userInfo ? (
            <Stack>
              <Stack>
                <Stack>
                  <Typography variant="h4" gutterBottom>
                    Thông tin người dùng
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="subtitle1" gutterBottom>
                    Họ và tên: {userInfo.name}{" "}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="subtitle1" gutterBottom>
                    Ngày sinh: {userInfo.dob}{" "}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="subtitle1" gutterBottom>
                    Số mũi đã tiêm: {injectionInfo.numberOfInjections}{" "}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="subtitle1" gutterBottom>
                    Mũi số 1: {injectionInfo.firstDose}{" "}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="subtitle1" gutterBottom>
                    Mũi số 2: {injectionInfo.secondDose}{" "}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="subtitle1" gutterBottom>
                    Mũi số 3: {injectionInfo.thirdDose}{" "}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="h6" gutterBottom>
                    Lịch sử lây nhiễm
                  </Typography>
                  {injectionInfo.infectedTimes === "" ? (
                    <Stack>
                      <Typography variant="subtitle1" gutterBottom>
                        <em>Bạn chưa từng nhiễm bệnh</em>
                      </Typography>
                    </Stack>
                  ) : (
                    <Stack>
                      <Stack>
                        {injectionInfo.infectedDate1 === "" ? (
                          ""
                        ) : (
                          <Stack className=".addInfo-info">
                            <Stack
                              direction="row"
                              className="addInfo-button"
                              spacing={1}
                            >
                              <Typography variant="subtitle1" gutterBottom>
                                Ngày nhiễm bệnh lần 1:{" "}
                                {injectionInfo.infectedDate1} - {""}
                              </Typography>
                              <Typography variant="subtitle1" gutterBottom>
                                Ngày khỏi bệnh: {injectionInfo.curedDate1} {""}
                              </Typography>
                            </Stack>
                            <Stack>
                              <Typography variant="subtitle1" gutterBottom>
                                {injectionInfo.infectedNote1 === "" ? (
                                  <Typography variant="subtitle1" gutterBottom>
                                    Ghi chú: Không có
                                  </Typography>
                                ) : (
                                  <Typography variant="subtitle1" gutterBottom>
                                    Ghi chú: {injectionInfo.infectedNote1}
                                  </Typography>
                                )}
                              </Typography>
                            </Stack>
                          </Stack>
                        )}
                      </Stack>
                      <Stack>
                        {injectionInfo.infectedDate2 === "" ? (
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
                                {injectionInfo.infectedDate2} - {""}
                              </Typography>
                              <Typography variant="subtitle1" gutterBottom>
                                Ngày khỏi bệnh: {injectionInfo.curedDate2} {""}
                              </Typography>
                            </Stack>
                            <Stack>
                              <Typography variant="subtitle1" gutterBottom>
                                {injectionInfo.infectedNote2 === "" ? (
                                  <Typography variant="subtitle1" gutterBottom>
                                    Ghi chú: Không có
                                  </Typography>
                                ) : (
                                  <Typography variant="subtitle1" gutterBottom>
                                    Ghi chú: {injectionInfo.infectedNote2}
                                  </Typography>
                                )}
                              </Typography>
                            </Stack>
                          </Stack>
                        )}
                      </Stack>
                      <Stack>
                        {injectionInfo.infectedDate3 === "" ? (
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
                                {injectionInfo.infectedDate3} - {""}
                              </Typography>
                              <Typography variant="subtitle1" gutterBottom>
                                Ngày khỏi bệnh: {injectionInfo.curedDate3} {""}
                              </Typography>
                            </Stack>
                            <Stack>
                              <Typography variant="subtitle1" gutterBottom>
                                {injectionInfo.infectedNote3 === "" ? (
                                  <Typography variant="subtitle1" gutterBottom>
                                    Ghi chú: Không có
                                  </Typography>
                                ) : (
                                  <Typography variant="subtitle1" gutterBottom>
                                    Ghi chú: {injectionInfo.infectedNote3}
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
                    onClick={submitInfectedInfoHandler}
                  >
                    Gửi
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          ) : (
            <Stack className="addRole-form">
              <Stack spacing={2} alignItems="center" >
                <TextField
                  id="standard-basic"
                  variant="standard"
                  type="text"
                  label="Tìm theo số điện thoại"
                  className="addInfo-findWithPhone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Button
                  variant="contained"
                  type="sumbit"
                  onClick={findInfoByPhoneHandler}
                >
                  Tìm
                </Button>
              </Stack>
            </Stack>
          )}
        </Stack>
      ) : (
        <Stack>
          <Typography variant="h5" gutterBottom>
            Bạn không đủ quyền hạn để truy cập
          </Typography>
          <Stack>
            <Button variant="contained">Quay lại trang chủ</Button>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};
