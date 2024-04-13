import { Grid } from '@mui/material';

import VitaArea from '../itemArea/VitaArea';
import CanSealArea from '../itemArea/CanSealArea';
import ScrollArea from '../itemArea/ScrollArea';
import LiquidArea from '../itemArea/LiquidArea';

const DesktopItemArea = () => {
  return (
    <>
      <Grid container spacing={1} justifyContent="center" alignItems="start">
        {/* ----- 1行目 ----- */}
        {/* ビタと缶・シール */}
        <Grid item xs={2}>
          <VitaArea />
        </Grid>
        <Grid item xs={3}>
          <CanSealArea />
        </Grid>

        {/* ----- 2行目 ----- */}
        {/* 巻物 */}
        <Grid item xs={4}>
          <ScrollArea />
        </Grid>

        {/* リキッド */}
        <Grid item xs={3}>
          <LiquidArea />
        </Grid>
      </Grid>
    </>
  );
};

export default DesktopItemArea;
