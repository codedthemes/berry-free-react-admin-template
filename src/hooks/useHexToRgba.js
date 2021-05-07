import React from 'react';

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
          }
        : null;
}

const useHexToRgba = (hexColor, opacity) => {
    const [rgbColor, setRgbColor] = React.useState(null);

    function handleColorChange(color) {
        setRgbColor(color);
    }

    React.useEffect(() => {
        var isOk = /^#[0-9A-F]{6}$/i.test(hexColor);
        var opOK = /^(0(\.\d+)?|1(\.0+)?)$/.test(opacity);
        if (isOk && opOK) {
            const newRGBObj = hexToRgb(hexColor);
            const newRGBcolor = `(${newRGBObj.r},
  ${newRGBObj.g}, ${newRGBObj.b}, ${opacity})`;
            handleColorChange(newRGBcolor);
        } else {
            handleColorChange(`(255, 255, 255, 0)`);
        }
    }, [hexColor, opacity]);

    return rgbColor;
};

export default useHexToRgba;
