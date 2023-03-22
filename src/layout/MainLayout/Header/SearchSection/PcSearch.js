import { useState } from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import { Box, Input } from '@mui/material';

// assets
import { ReactComponent as SearchIcon } from '../../../../assets/images/search.svg';

import { shouldForwardProp } from '@mui/system';

const Wrap = styled(Box, { shouldForwardProp })(() => ({
    marginLeft: 10
}));

const InputStyle = styled(Input, { shouldForwardProp })(({ open }) => {
    return {
        marginLeft: 10,
        // paddingLeft: 16,
        // paddingRight: 16,
        '& input': {
            width: `${open ? 210 : 0}`,
            background: 'transparent !important',
            paddingLeft: '2px !important',
            transition: 'width .2s'
        }
    };
});

const PcSearch = () => {
    const [toggled, setToggled] = useState(false);

    const handleToggle = () => {
        setToggled(!toggled);
    };

    return (
        <Wrap className="flex-center">
            <SearchIcon className="icon-small" onClick={handleToggle} />
            <InputStyle placeholder="输入搜索内容..." open={toggled}></InputStyle>
        </Wrap>
    );
};

export default PcSearch;
