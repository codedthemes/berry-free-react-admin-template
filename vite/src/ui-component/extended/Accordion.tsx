import { useEffect, useState, ReactElement } from 'react';

// material-ui
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';

// assets
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type AccordionItem = {
  id: string;
  title: ReactElement | string;
  content: ReactElement | string;
  disabled?: boolean;
  expanded?: boolean;
  defaultExpand?: boolean | undefined;
};

interface AccordionProps {
  data: AccordionItem[];
  defaultExpandedId?: string | boolean | null;
  expandIcon?: ReactElement;
  square?: boolean;
  toggle?: boolean;
}

// ==============================|| ACCORDION ||============================== //

export default function Accordion({ data, defaultExpandedId = null, expandIcon, square, toggle }: AccordionProps) {
  const [expanded, setExpanded] = useState<string | boolean | null>(null);
  const handleChange = (panel: string) => (event: React.SyntheticEvent<Element, Event>, newExpanded: boolean) => {
    toggle && setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    setExpanded(defaultExpandedId);
  }, [defaultExpandedId]);

  return (
    <Box sx={{ width: '100%' }}>
      {data &&
        data.map((item: AccordionItem) => (
          <MuiAccordion
            key={item.id}
            elevation={0}
            defaultExpanded={!item.disabled && item.defaultExpand}
            expanded={(!toggle && !item.disabled && item.expanded) || (toggle && expanded === item.id)}
            disabled={item.disabled}
            square={square}
            onChange={handleChange(item.id)}
          >
            <MuiAccordionSummary
              expandIcon={expandIcon || expandIcon === false ? expandIcon : <ExpandMoreIcon />}
              sx={{ color: 'grey.600', fontWeight: 500 }}
            >
              {item.title}
            </MuiAccordionSummary>
            <MuiAccordionDetails>{item.content}</MuiAccordionDetails>
          </MuiAccordion>
        ))}
    </Box>
  );
}
