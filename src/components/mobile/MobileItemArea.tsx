import { Grid } from '@mui/material';

import VitaArea from '../itemArea/VitaArea';
import CanSealArea from '../itemArea/CanSealArea';
import ScrollArea from '../itemArea/ScrollArea';
import LiquidArea from '../itemArea/LiquidArea';

const MobileItemArea = () => {
  return (
    <>
      <Grid container spacing={1} justifyContent="center" alignItems="start">
        {/* ----- 1行目 ----- */}
        {/* ビタと缶・シール */}
        <Grid item xs={6}>
          <VitaArea />
        </Grid>
        <Grid item xs={6}>
          <CanSealArea />
        </Grid>

        {/* ----- 2行目 ----- */}
        {/* 巻物 */}
        <Grid item xs={6}>
          <ScrollArea />
        </Grid>

        {/* リキッド */}
        <Grid item xs={6}>
          <LiquidArea />
        </Grid>
      </Grid>
    </>
  );
};

export default MobileItemArea;
