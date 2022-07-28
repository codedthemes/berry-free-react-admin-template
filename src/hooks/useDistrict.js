import { useState, useEffect } from "react";

const useDistrict = (city) => {
  const [districtName, setDistrictName] = useState(0);

  useEffect(() => {
    if (city) {
      switch (city) {
        case "Thành phố Hà Nội":
          setDistrictName(0);
          break;
        case "Thành phố Hồ Chí Minh":
          setDistrictName(1);
          break;
        case "Tỉnh Nghệ An":
          setDistrictName(2);
          break;
        case "Tỉnh Bắc Giang":
          setDistrictName(3);
          break;
        case "Tỉnh Vĩnh Phúc":
          setDistrictName(4);
          break;
        case "Tỉnh Hải Dương":
          setDistrictName(5);
          break;
        case "Tỉnh Quảng Ninh":
          setDistrictName(6);
          break;
        case "Tỉnh Bắc Ninh":
          setDistrictName(7);
          break;
        case "Tỉnh Phú Thọ":
          setDistrictName(8);
          break;
        case "Tỉnh Bình Dương":
          setDistrictName(9);
          break;
        case "Tỉnh Nam Định":
          setDistrictName(10);
          break;
        case "Tỉnh Thái Bình":
          setDistrictName(11);
          break;
        case "Tỉnh Hưng Yên":
          setDistrictName(12);
          break;
        case "Tỉnh Hòa Bình":
          setDistrictName(13);
          break;
        case "Tỉnh Thái Nguyên":
          setDistrictName(14);
          break;
        case "Tỉnh Lào Cai":
          setDistrictName(15);
          break;
        case "Tỉnh Đắk Lắk":
          setDistrictName(16);
          break;
        case "Tỉnh Thanh Hóa":
          setDistrictName(17);
          break;
        case "Tỉnh Lạng Sơn":
          setDistrictName(18);
          break;
        case "Tỉnh Sơn La":
          setDistrictName(19);
          break;
        case "Tỉnh Yên Bái":
          setDistrictName(20);
          break;
        case "Tỉnh Cà Mau":
          setDistrictName(21);
          break;
        case "Tỉnh Tuyên Quang":
          setDistrictName(22);
          break;
        case "Tỉnh Tây Ninh":
          setDistrictName(23);
          break;
        case "Tỉnh Bình Định":
          setDistrictName(24);
          break;
        case "Tỉnh Quảng Bình":
          setDistrictName(25);
          break;
        case "Tỉnh Hà Giang":
          setDistrictName(26);
          break;
        case "Thành phố Hải Phòng":
          setDistrictName(27);
          break;
        case "Tỉnh Khánh Hòa":
          setDistrictName(28);
          break;
        case "Tỉnh Bình Phước":
          setDistrictName(29);
          break;
        case "Tỉnh Bà Rịa - Vũng Tàu":
          setDistrictName(30);
          break;
        case "Tỉnh Đồng Nai":
          setDistrictName(31);
          break;
        case "Tỉnh Vĩnh Long":
          setDistrictName(32);
          break;
        case "Tỉnh Ninh Bình":
          setDistrictName(34);
          break;
        case "Thành phố Đà Nẵng":
          setDistrictName(33);
          break;
        case "Tỉnh Bến Tre":
          setDistrictName(35);
          break;
        case "Tỉnh Cao Bằng":
          setDistrictName(36);
          break;
        case "Tỉnh Lâm Đồng":
          setDistrictName(37);
          break;
        case "Tỉnh Điện Biên":
          setDistrictName(38);
          break;
        case "Tỉnh Hà Nam":
          setDistrictName(39);
          break;
        case "Tỉnh Quảng Trị":
          setDistrictName(40);
          break;
        case "Thành phố Cần Thơ":
          setDistrictName(41);
          break;
        case "Tỉnh Trà Vinh":
          setDistrictName(42);
          break;
        case "Tỉnh Bắc Kạn":
          setDistrictName(43);
          break;
        case "Tỉnh Lai Châu":
          setDistrictName(44);
          break;
        case "Tỉnh Đắk Nông":
          setDistrictName(45);
          break;
        case "Tỉnh Gia Lai":
          setDistrictName(46);
          break;
        case "Tỉnh Bình Thuận":
          setDistrictName(47);
          break;
        case "Tỉnh Đồng Tháp":
          setDistrictName(48);
          break;
        case "Tỉnh Hà Tĩnh":
          setDistrictName(49);
          break;
        case "Tỉnh Quảng Nam":
          setDistrictName(50);
          break;
        case "Tỉnh Long An":
          setDistrictName(51);
          break;
        case "Tỉnh Quảng Ngãi":
          setDistrictName(52);
          break;
        case "Tỉnh Bạc Liêu":
          setDistrictName(53);
          break;
        case "Tỉnh Thừa Thiên Huế":
          setDistrictName(54);
          break;
        case "Tỉnh Phú Yên":
          setDistrictName(55);
          break;
        case "Tỉnh An Giang":
          setDistrictName(56);
          break;
        case "Tỉnh Kiên Giang":
          setDistrictName(57);
          break;
        case "Tỉnh Tiền Giang":
          setDistrictName(58);
          break;
        case "Tỉnh Sóc Trăng":
          setDistrictName(59);
          break;
        case "Tỉnh Kon Tum":
          setDistrictName(60);
          break;
        case "Tỉnh Hậu Giang":
          setDistrictName(61);
          break;
        case "Tỉnh Ninh Thuận":
          setDistrictName(62);
          break;
        default:
          setDistrictName(0);
      }
      return { districtName };
    } else {
      setDistrictName(0);
      return { districtName };
    }
  }, [city]);
  return {districtName}
};
export default useDistrict;
