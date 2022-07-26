import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onSnapshot, setDoc, doc } from "@firebase/firestore";
import {
  auth,
  queryGetUserInfoByEmail,
  queryGetUserInfoByPhone,
  dataRef,
  db,
  injectionRef,
} from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";

const AddRole = () => {
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [totalUserInfo, setTotalUserInfo] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [injectionInfo, setInjectionInfo] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");


  const navigate = useNavigate();

  const findInfoByPhoneHandler = (e) => {
    e.preventDefault();

    if (totalUserInfo) {
      onSnapshot(queryGetUserInfoByPhone(dataRef, phone), (snapshot) => {
        snapshot.forEach((data) => {
          setUserInfo(data.data());
          setUserId(data.id);
        });
      });
      onSnapshot(queryGetUserInfoByPhone(injectionRef, phone), (snapshot) => {
        snapshot.forEach((data) => {
          setInjectionInfo(data.data());
        });
      });
    }
  };

  const submitInfoHandler = (e) => {
    e.preventDefault();

    setDoc(doc(db, "userData", userId), {
      ...userInfo,
      assignedRole: role,
    });
    setRole("");
  };

  const backToMainPagehandler = (e) => {
    e.preventDefault();
    navigate("/");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserEmail(currentUser.email);
        onSnapshot(queryGetUserInfoByEmail(userEmail), (snapshot) => {
          snapshot.forEach((data) => setUserRole(data.data().assignedRole));
        });
      }
    });

    onSnapshot(dataRef, (snapshot) => {
      let users = [];
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setTotalUserInfo(users);
    });
    console.log(userId);
  }, [userId]);

  if (!userRole) {
    return <div>Loading</div>;
  }

  return (
    <div className="container addRole">
      {userRole === "admin" ? (
        userInfo ? (
          <div>
            <div>
              <Typography variant="h4" gutterBottom>
                Thông tin người dùng
              </Typography>
            </div>
            <div>
              <Typography variant="h5" gutterBottom>
                Họ và tên: {userInfo.name}{" "}
              </Typography>
            </div>
            <div>
              <Typography variant="h5" gutterBottom>
                Vai trò: {userInfo.assignedRole}{" "}
              </Typography>
            </div>

            <div>
              <div className="addRole-form">
                {" "}
                <FormControl variant="standard" sx={{ m: 2, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-label">
                    Phân quyền
                  </InputLabel>
                  <Select
                    className="addRole-role"
                    onChange={(e) => setRole(e.target.value)}
                    value={role}
                    label={"Phân quyền"}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                  >
                    <MenuItem value="" disabled>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="moderator">Moderator</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <Button
                  variant="contained"
                  type="submit"
                  onClick={submitInfoHandler}
                >
                  Gửi
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <form className="addRole-form">
              <Stack spacing={2}>
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
            </form>
          </div>
        )
      ) : (
        <div>
          <div>
            <Typography variant="subtitle1" gutterBottom>
              Bạn không đủ quyền hạn để truy cập
            </Typography>{" "}
          </div>
          <Button variant="contained" onClick={backToMainPagehandler}>
            Quay lại trang chủ
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddRole;
