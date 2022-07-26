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
} from "../../firebase/firebase";
import { onSnapshot, doc, setDoc, orderBy, addDoc } from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";

const InjectionInfoRequest = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [authInfo, setAuthInfo] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [requestInfo, setRequestInfo] = useState({});
  const [requestId, setRequestId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [requestUsers, setRequestUsers] = useState("");

  const [userId, setUserId] = useState(null);

  //inject info
  const [phone, setPhone] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [times, setTimes] = useState("");

  const [vaccineType1, setVaccineType1] = useState("");
  const [vaccineType2, setVaccineType2] = useState("");
  const [vaccineType3, setVaccineType3] = useState("");

  const [injectDate1, setInjectDate1] = useState("");
  const [injectDate2, setInjectDate2] = useState("");
  const [injectDate3, setInjectDate3] = useState("");

  const [injectPerson1, setInjectPerson1] = useState("");
  const [injectPerson2, setInjectPerson2] = useState("");
  const [injectPerson3, setInjectPerson3] = useState("");

  // upload img
  const [imageUpload, setImageUpload] = useState(null);

  const submitInfoHanlder = (e) => {
    e.preventDefault();
    if (imageUpload === null) return;
    const imageRef = ref(storage, `${phone}/verifyImg`);
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("Gửi lên thành công");
    });
    const imageListRef = ref(storage, `${phone}/verifyImg`);
    getDownloadURL(imageListRef).then((url) => {
      setDoc(doc(db, "injectionRequestData", requestId), {
        ...requestInfo,
        numberOfInjections: times,
        // idNumber: userIdNumber,
        firstDose: vaccineType1,
        secondDose: vaccineType2,
        thirdDose: vaccineType3,
        injectDate1: injectDate1,
        injectDate2: injectDate2,
        injectDate3: injectDate3,
        injectPerson1: injectPerson1,
        injectPerson2: injectPerson2,
        injectPerson3: injectPerson3,
        infectedTimes: "",
        status: "pending",
        imageProof: url,
      });
      setDate("");
      setPlace("");
      setTimes("");
    });
  };

  useEffect(() => {
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
          setUserId(data.id);
        });
      });
    }
    onSnapshot(injectionRequestRef, (snapshot) => {
      let users = [];
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setRequestUsers(users);
    });
    if (requestUsers) {
      onSnapshot(
        queryGetUserInfoByPhone(injectionRequestRef, phone),
        (snapshot) => {
          console.log(snapshot._snapshot.docChanges.length);
          snapshot.forEach((data) => {
            setRequestInfo(data.data());
            setRequestId(data.id);
          });
          if (snapshot._snapshot.docChanges.length === 0) {
            addDoc(injectionRequestRef, {
              phone: phone,
              firstDose: "",
              secondDose: "",
              thirdDose: "",
              numberOfInjections: "",
              status: "none",
              name: authInfo.name,
            });
          }
        }
      );
    }
  }, [isLoggedIn, userId, requestId]);

  return (
    <div className="container addInfo">
      {/* {isLoggedIn ? (
        <Stack sx={{ alignItems: "center" }}>
          <Stack>
            <Typography variant="h4" gutterBottom>
              Thông tin yêu cầu
            </Typography>
          </Stack>
          <Stack>
            {requestInfo?.status === "none" ? (
              <Typography>Chưa có yêu cầu nào</Typography>
            ) : (
              <Stack>
                {requestInfo?.status === "pending" ? (
                  <Typography>Yêu cầu của bạn đang được xử lí</Typography>
                ) : (
                  <Stack>
                    {requestInfo?.status === "approved" ? (
                      <Typography>
                        Yêu cầu của bạn đã được chấp thuận, vui lòng kiểm tra
                        thông tin được thay đổi
                      </Typography>
                    ) : (
                      <Stack>
                        {requestInfo?.status === "rejected" ? (
                          <Typography>
                            Yêu cầu của bạn đã bị từ chối với lí do:{" "}
                            {requestInfo?.reason}
                          </Typography>
                        ) : (
                          <></>
                        )}
                      </Stack>
                    )}
                  </Stack>
                )}
              </Stack>
            )}
          </Stack>
          <Stack>
            {" "}
            <FormControl
              variant="outlined"
              sx={{ marginTop: 5, minWidth: 210 }}
            >
              <InputLabel id="demo-simple-select-label">
                Số lần đã tiêm:{" "}
              </InputLabel>
              <Select
                label={"Số lần đã tiêm"}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className="addInfo-times"
                onChange={(e) => setTimes(e.target.value)}
                value={times}
              >
                {" "}
                <MenuItem value="Chưa tiêm">Chưa tiêm </MenuItem>
                <MenuItem value="1 mũi">1 lần</MenuItem>
                <MenuItem value="2 mũi">2 lần</MenuItem>
                <MenuItem value="3 mũi">3 lần</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack spacing={2} direction="row" className="addInfo-button">
            <div>
              <FormControl
                variant="outlined"
                sx={{ marginTop: 1, minWidth: 210 }}
              >
                <InputLabel id="demo-simple-select-label">Mũi 1</InputLabel>
                <Select
                  label={"Mũi 1"}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={(e) => setVaccineType1(e.target.value)}
                  value={vaccineType1}
                >
                  <MenuItem value="" disabled>
                    Chọn loại vaccine
                  </MenuItem>
                  <MenuItem value="Nanocovax">Nanocovax</MenuItem>
                  <MenuItem value="Pfizer-BioNTech">Pfizer-BioNTech</MenuItem>
                  <MenuItem value="AstraZeneca">AstraZeneca</MenuItem>
                  <MenuItem value="Moderna">Moderna</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div>
              <FormControl
                variant="outlined"
                sx={{ marginTop: 1, minWidth: 210 }}
              >
                <InputLabel id="demo-simple-select-label">Mũi 2</InputLabel>
                <Select
                  label={"Mũi 2"}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={(e) => setVaccineType2(e.target.value)}
                  value={vaccineType2}
                >
                  <MenuItem value="Chưa tiêm" disabled>
                    Chọn loại vaccine
                  </MenuItem>
                  <MenuItem value="Chưa tiêm">Chưa tiêm</MenuItem>
                  <MenuItem value="Nanocovax">Nanocovax</MenuItem>
                  <MenuItem value="Pfizer-BioNTech">Pfizer-BioNTech</MenuItem>
                  <MenuItem value="AstraZeneca">AstraZeneca</MenuItem>
                  <MenuItem value="Moderna">Moderna</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl
                variant="outlined"
                sx={{ marginTop: 1, minWidth: 210 }}
              >
                <InputLabel id="demo-simple-select-label">Mũi 3</InputLabel>
                <Select
                  label={"Mũi 3"}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={(e) => setVaccineType3(e.target.value)}
                  value={vaccineType3}
                >
                  <MenuItem value="Chưa tiêm" disabled>
                    Chọn loại vaccine
                  </MenuItem>
                  <MenuItem value="Chưa tiêm">Chưa tiêm</MenuItem>
                  <MenuItem value="Nanocovax">Nanocovax</MenuItem>
                  <MenuItem value="Pfizer-BioNTech">Pfizer-BioNTech</MenuItem>
                  <MenuItem value="AstraZeneca">AstraZeneca</MenuItem>
                  <MenuItem value="Moderna">Moderna</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Stack>
          <Stack
            spacing={2}
            direction="row"
            className="addInfo-button"
            sx={{ alignItems: "baseline" }}
          >
            <TextField
              sx={{ marginTop: 1, minWidth: 210 }}
              id="standard-basic"
              helperText="Ngày tiêm mũi 1"
              variant="outlined"
              type="date"
              className="register-dob"
              value={injectDate1}
              onChange={(e) => setInjectDate1(e.target.value)}
            />
            <TextField
              sx={{ marginTop: 1, minWidth: 210 }}
              id="standard-basic"
              helperText="Ngày tiêm mũi 2"
              variant="outlined"
              type="date"
              className="register-dob"
              value={injectDate2}
              onChange={(e) => setInjectDate2(e.target.value)}
            />
            <TextField
              sx={{ marginTop: 1, minWidth: 210 }}
              id="standard-basic"
              helperText="Ngày tiêm mũi 3"
              variant="outlined"
              type="date"
              className="register-dob"
              value={injectDate3}
              onChange={(e) => setInjectDate3(e.target.value)}
            />
          </Stack>
          <Stack
            spacing={2}
            direction="row"
            className="addInfo-button"
            sx={{ alignItems: "baseline" }}
          >
            <TextField
              sx={{ marginTop: 1, minWidth: 210 }}
              id="standard-basic"
              variant="outlined"
              type="text"
              label="Đơn vị tiêm mũi 1"
              className="addInfo-findWithPhone"
              value={injectPerson1}
              onChange={(e) => setInjectPerson1(e.target.value)}
            />
            <TextField
              sx={{ marginTop: 1, minWidth: 210 }}
              id="standard-basic"
              variant="outlined"
              type="text"
              label="Đơn vị tiêm mũi 2"
              className="addInfo-findWithPhone"
              value={injectPerson2}
              onChange={(e) => setInjectPerson2(e.target.value)}
            />
            <TextField
              sx={{ marginTop: 1, minWidth: 210 }}
              id="standard-basic"
              variant="outlined"
              type="text"
              label="Đơn vị tiêm mũi 3"
              className="addInfo-findWithPhone"
              value={injectPerson3}
              onChange={(e) => setInjectPerson3(e.target.value)}
            />
          </Stack>
          <Stack sx={{ alignItems: "center" }}>
            <Button
              variant="contained"
              component="label"
              className="addInfo-button"
              sx={{ width: 120, marginTop: 4 }}
            >
              Tải ảnh lên
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={(e) => setImageUpload(e.target.files[0])}
              />
            </Button>
            <Typography sx={{ marginTop: 1 }}>{imageUpload?.name}</Typography>
          </Stack>
          <Stack sx={{ marginTop: 5 }}>
            {" "}
            <Button
              variant="contained"
              type="submit"
              onClick={submitInfoHanlder}
            >
              Gửi yêu cầu
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Typography variant="h5" gutterBottom>
          Vui lòng đăng nhập để tiếp tục
        </Typography>
      )} */}
    </div>
  );
};

export default InjectionInfoRequest;
