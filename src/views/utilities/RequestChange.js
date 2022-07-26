import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { addDoc, setDoc, onSnapshot, doc } from "@firebase/firestore";
import { dataRef, requestRef } from "../../firebase/firebase";
import {
    auth,
    queryGetUserInfoByPhone,
    db,
    queryGetUserInfoByEmail,
} from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Container, Typography, Stack, Card, CardContent, Grid, TextField, Button, Select, MenuItem, InputLabel, FormControl, CardActions } from "@mui/material";
import { makeStyles } from "@mui/styles";

const RequestChange = () => {
    const useStyles = makeStyles((theme) => ({
        header: {
            marginBottom: '30px',
            textTransform: 'uppercase',
        },
        textField: {
            marginBottom: '38px',
        },
        error: {
            color: 'red',
            paddingBottom: '10px'
        },
        button: {
            justifyContent: 'flex-end',
            padding: '0 24px 24px 24px'
        }
    }));
    const classes = useStyles();
    const navigate = useNavigate();

    const [userEmail, setUserEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [fetchData, setFetchData] = useState([]);
    const [inputCity, setInputCity] = useState("");

    const [district, setDistrict] = useState([]);
    const [inputDistrict, setInputDistrict] = useState("");

    const [ward, setWard] = useState([]);
    const [inputWard, setInputWard] = useState("");

    //UseForm

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    //handlers

    const cityHandler = (e) => {
        setInputCity(e.target.value);
        setInputDistrict("");
        setInputWard("");
    };

    const districtHandler = (e) => {
        setInputDistrict(e.target.value);
        setInputWard("");
    };

    const fetchDistrict = async () => {
        const { data } = await axios.get(
            `https://provinces.open-api.vn/api/p/${inputCity}?depth=2`
        );
        return setDistrict(data);
    };

    const fetchWard = async () => {
        if (inputDistrict) {
            const { data } = await axios.get(
                `https://provinces.open-api.vn/api/d/${inputDistrict}?depth=2`
            );
            return setWard(data);
        }
    };

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUserEmail(currentUser.email);
                onSnapshot(queryGetUserInfoByEmail(userEmail), (snapshot) => {
                    snapshot.forEach((data) => setPhone(data.data().phone));
                });
            }
        });


        axios.get("https://provinces.open-api.vn/api/?depth=1").then((result) => {
            const { data } = result;

            setFetchData(data);
        });
        fetchDistrict();
        fetchWard();
    }, [inputCity, inputDistrict]);



    return (
        <Container className="container requestChange">
            <Card sx={{ textAlign: 'center' }}>
                <form
                    className="request-form"
                    onSubmit={handleSubmit((data) => {
                        if (district && ward) {
                            const updateData = addDoc(requestRef, {
                                city: district.name,
                                district: ward.name,
                                ward: inputWard,
                                name: data.inputName,
                                phoneToChange: data.inputPhone,
                                phone: phone,
                                dob: data.dob,
                                address: data.inputAddress,
                                reason: data.inputReason,
                            });

                            if (updateData) {
                                window.alert(
                                    "Gửi thông tin thành công, vui lòng đợi thông tin được phê duyệt"
                                );
                                navigate("/");
                            }
                        }
                    })}
                >
                    <CardContent>
                        <Typography variant="h3" className={classes.header} gutterBottom >Điền thông tin cần  thay đổi</Typography>

                        <Grid
                            container
                            className="request-form"
                            spacing={4}
                        >
                            <Grid item sm={6}>
                                <FormControl fullWidth>
                                    <Typography className={classes.error}> {errors.inputName?.message}</Typography>
                                    <TextField
                                        className={classes.textField}
                                        label="Họ và tên:"
                                        {...register("inputName", { required: "Không được để trống" })}
                                    />
                                </FormControl>

                                <FormControl fullWidth>
                                    <Typography> {errors.inputPhone?.message}</Typography>
                                    <TextField
                                        className={classes.textField}
                                        label="Số điện thoại"
                                        {...register(
                                            "inputPhone",
                                            {
                                                pattern: {
                                                    value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                                                    message: "Nhập đúng định dạng số điện thoại",
                                                }
                                            }

                                        )}
                                    />
                                </FormControl>
                                <FormControl fullWidth>
                                    <Typography className={classes.error}> {errors.dob?.message}</Typography>
                                    <InputLabel htmlFor="dob">Ngày tháng năm sinh</InputLabel>
                                    <TextField
                                        className={classes.textField}
                                        type="date"
                                        {...register("dob", { required: "Không được để trống" })}
                                    />

                                </FormControl>
                                <FormControl fullWidth >
                                    <InputLabel>Chọn thành phố</InputLabel>
                                    <Select
                                        className={classes.textField}
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
                                </FormControl>
                            </Grid>
                            <Grid item sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="district">Quận/Huyện</InputLabel>
                                    <Select
                                        className={classes.textField}
                                        onChange={districtHandler}
                                        value={inputDistrict}
                                        label="Chọn quận huyện"
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
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="ward">Phường/Xã</InputLabel>
                                    <Select
                                        className={classes.textField}
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
                                </FormControl>
                                <FormControl fullWidth>
                                    <Typography className={classes.error} > {errors.inputAddress?.message}</Typography>
                                    <TextField
                                        className={classes.textField}
                                        label="Địa chỉ"
                                        {...register("inputAddress", { required: "Không được để trống" })}
                                    />
                                </FormControl>
                                <FormControl fullWidth>
                                    <Typography className={classes.error} > {errors.inputReason?.message}</Typography>
                                    <TextField
                                        className={classes.textField}
                                        multiline
                                        label="Lý do thay đổi"
                                        {...register("inputReason", { required: "Không được để trống" })}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                    </CardContent>
                    <CardActions className={classes.button} >
                        <Button type="submit" variant="contained" color="error" size="large">Gửi yêu cầu</Button>
                    </CardActions>
                </form>
            </Card>
        </Container >
    );
};

export default RequestChange;
