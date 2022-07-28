import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import useDistrict from "../../hooks/useDistrict";
import axios from "axios";
import { addDoc, setDoc, onSnapshot, doc } from "@firebase/firestore";
import { dataRef, injectionRef } from "../../firebase/firebase";
import { auth, queryGetUserInfoByPhone, db } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormHelperText from "@mui/material/FormHelperText";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [inputEmail, setInputEmail] = useState("");
  // const [inputName, setInputName] = useState("");
  const [inputDate1, setInputDate1] = useState("");
  // const [inputAddress, setInputAddress] = useState("");

  const [fetchData, setFetchData] = useState([]);
  const [inputCity, setInputCity] = useState("");

  const [district, setDistrict] = useState([]);
  const [inputDistrict, setInputDistrict] = useState("");

  const [ward, setWard] = useState([]);
  const [inputWard, setInputWard] = useState("");

  const [cityName, setCityName] = useState("");
  const [position, setPosition] = useState(0);

  //useDistrict
  const { districtName } = useDistrict(district.name);


  const inputEmailHandler = (e) => {
    setInputEmail(e.target.value);
  };
  // const inputNameHandler = (e) => {
  //   setInputName(e.target.value);
  // };
  // const inputDateHandler = (e) => {
  //   setInputDate(e.target.value);
  // };

  // const inputSubmithandler = async (e) => {
  //   e.preventDefault();

  //   // add data to collection

  //   setInputEmail("");
  //   setInputPhone("");
  //   setInputDate("");
  //   setInputName("");
  //   setInputAddress("");
  // };

  // const phoneHandler = (e) => {
  //   let reg = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  //   if (reg.test(e.target.value)) {
  //     setInputPhone(e.target.value);
  //   }
  // };

  const districtNameHandler = () => {
    if (district !== null) {
      if (district.name.includes("Tỉnh")) {
        setCityName(district.name.replace("Tỉnh", ""));
      }
    }
  };
  const cityNameHandler = () => {
    if (district !== null) {
      if (district.name.includes("Thành phố")) {
        setCityName(district.name.replace("Thành phố", ""));
      }
    }
  };

  const cityHandler = (e) => {
    setInputCity(e.target.value);
    setInputDistrict("");
    setInputWard("");
  };

  const districtHandler = (e) => {
    setInputDistrict(e.target.value);
    setInputWard("");
    // districtNameHandler();
    // cityNameHandler();
  };

  // console.log(typeof cityName);

  // const fetchExactWard = async


  useEffect(() => {
    const fetchDistrict = async () => {
      if (inputCity) {
        const { data } = await axios.get(
          `https://provinces.open-api.vn/api/p/${inputCity}?depth=2`
        );
        setDistrict(data);
      } else {
        setDistrict("");
      }
    };
  
    const fetchWard = async () => {
      if (inputDistrict) {
        const { data } = await axios.get(
          `https://provinces.open-api.vn/api/d/${inputDistrict}?depth=2`
        );
        setWard(data);
      }
    };

    fetchDistrict();
    fetchWard();
    
    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setInputEmail(currentUser.email);
        }
      });    

    axios.get("https://provinces.open-api.vn/api/?depth=1").then((result) => {
      const { data } = result;

      setFetchData(data);
    });
    
  }, [inputCity, inputDistrict, cityName]);

  return (
    <div className="container register">
      <form
        className="register-form"
        onSubmit={handleSubmit((data) => {
          if (
            window.confirm("Hãy chắc chắn những thông tin đã nhập là chính xác")
          ) {
            if (district && ward) {
              const updateData = addDoc(dataRef, {
                city: district.name,
                district: ward.name,
                ward: inputWard,
                name: data.inputName,
                idNumber: data.inputId,
                email: inputEmail,
                phone: data.inputPhone,
                dob: data.inputDate,
                address: data.inputAddress,
                assignedRole: "user",
                infected: false,
                districtId: districtName,
              });

              addDoc(injectionRef, {
                numberOfInjections: "Chưa tiêm",
                phone: data.inputPhone,
                firstDose: "",
                secondDose: "",
                thirdDose: "",
                infectedTimes: "",
                injectDate1: "",
                injectDate2: "",
                injectDate3: "",
                injectPerson1: "",
                injectPerson2: "",
                injectPerson3: "",
                dataSubmitted: false,
                vaccinated: false,
                isCurrentlyInfected: false,
                verifiedByAdmin: false,
                infectedDate1: "",
                infectedDate2: "",
                infectedDate3: "",
                infectedNote1: "",
                infectedNote2: "",
                infectedNote3: "",
                curedDate1: "",
                curedDate2: "",
                curedDate3: "",
                infectedTimes: "",
              });

              if (updateData) {
                window.alert("Đăng ký thành công");
                navigate("/");
              }
            }
          }
          // console.log(data, inputWard);
        })}
      >
        <Typography variant="h5" gutterBottom>
          Đăng ký thông tin cá nhân
        </Typography>
        <div>
          <TextField
            sx={{ margin: 1 }}
            id="standard-basic"
            variant="standard"
            label="Email"
            type="text"
            helperText=""
            className="register-email"
            onChange={inputEmailHandler}
            value={inputEmail}
            // disabled
          />
        </div>
        <div>
          <TextField
            sx={{ margin: 1 }}
            id="component-error"
            variant="standard"
            label="Họ và tên"
            autoComplete="off"
            // error={inputName === ""}
            // helperText={inputName === "" ? errors.inputName?.message : ""}
            {...register("inputName", { required: "Điền tên" })}
            className="register-name"
          />
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            style={{ color: "red" }}
          >
            {errors.inputName?.message}
          </Typography>
        </div>
        <div>
          <TextField
            sx={{ margin: 1 }}
            id="standard-basic"
            variant="standard"
            className="register-phone"
            label="Số điện thoại"
            autoComplete="off"
            helperText=""
            {...register("inputPhone", {
              pattern: {
                value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                message: "Nhập đúng định dạng số điện thoại",
              },
            })}
          />

          <Typography
            variant="caption"
            display="block"
            gutterBottom
            style={{ color: "red" }}
          >
            {errors.inputPhone?.message}
          </Typography>
        </div>
        <div>
          <TextField
            variant="standard"
            className="register-id"
            id="standard=basic"
            label="CMND/CCCD"
            autoComplete="off"
            helperText=""
            sx={{ margin: 1 }}
            {...register("inputId", { required: "Nhập số CMND hoặc số CCCD" })}
          />
        </div>
        <div>
          <TextField
            sx={{ margin: 2, minWidth: 184 }}
            id="standard-basic"
            helperText="Tháng/Ngày/Năm"
            variant="standard"
            type="date"
            className="register-dob"
            {...register("inputDate", { required: "Nhập ngày tháng năm sinh" })}
          />{" "}
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            style={{ color: "red" }}
          >
            {errors.inputDate?.message}
          </Typography>
        </div>
        <div>
          <FormControl variant="standard" sx={{ m: 2, minWidth: 120 }}>
            <div>
              <InputLabel id="demo-simple-select-label">Thành phố</InputLabel>
              <Select
                sx={{ minWidth: 120 }}
                label={"Thành phố"}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className="register-city"
                onChange={cityHandler}
                value={inputCity}
              >
                <MenuItem value="" disabled>
                  Chọn thành phố
                </MenuItem>
                {fetchData &&
                  fetchData.map((val) => (
                    <MenuItem key={val.code} value={val.code}>
                      {val.name}
                    </MenuItem>
                  ))}
              </Select>
            </div>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 2, minWidth: 120 }}>
            <div>
              <InputLabel id="demo-simple-select-label">Quận/Huyện</InputLabel>
              <Select
                sx={{ minWidth: 120 }}
                label={"Quận/Huyện"}
                labelId="demo-simple-select-label1"
                id="demo-simple-select"
                className="register-district"
                onChange={districtHandler}
                value={inputDistrict}
              >
                <MenuItem value="" disabled>
                  Chọn quận huyện
                </MenuItem>
                {district.districts &&
                  district.districts.map((val) => (
                    <MenuItem key={val.code} value={val.code}>
                      {val.name}
                    </MenuItem>
                  ))}
              </Select>
            </div>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 2, minWidth: 120 }}>
            <div>
              <InputLabel id="demo-simple-select-label">Phường/Xã</InputLabel>
              <Select
                sx={{ minWidth: 120 }}
                label={"Phường/Xã"}
                labelId="demo-simple-select-label2"
                id="demo-simple-select"
                className="register-district"
                onChange={(event) => setInputWard(event.target.value)}
                value={inputWard}
              >
                <MenuItem value="" disabled>
                  Chọn phường xã
                </MenuItem>
                {ward.wards &&
                  ward.wards.map((val) => (
                    <MenuItem key={val.code} value={val.name}>
                      {val.name}
                    </MenuItem>
                  ))}
              </Select>
            </div>
          </FormControl>
        </div>
        <div>
          <TextField
            label="Địa chỉ"
            sx={{ margin: 1, marginBottom: 2 }}
            id="standard-basic"
            variant="standard"
            autoComplete="off"
            {...register("inputAddress", { required: "Điền địa chỉ" })}
          />

          <Typography
            variant="caption"
            display="block"
            gutterBottom
            style={{ color: "red" }}
          >
            {errors.inputAddress?.message}
          </Typography>
        </div>
        <div id="sign-in-button"></div>
        <Button variant="contained" type="submit">
          Đăng ký
        </Button>
      </form>
    </div>
  );
};

export default Register;
//onClick={inputSubmithandler}
