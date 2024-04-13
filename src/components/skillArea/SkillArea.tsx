import { Grid } from '@mui/material';
import Button from '@mui/material/Button';

import { StatusInputFields, CharacterStatus } from '../../interface/Status';
import { STATUS } from '../../constants/constants';
import {
  getInputStatus,
  calculateDisplayStatus,
  resetBradScraperStatus,
  resetSpecialSkillStatus,
} from '../../util/StatusUtil';

/**
 * SkillAreaProps
 */
interface SkillAreaProps {
  characterStatus: CharacterStatus;
  updateCharacter: (newCharacterStatus: CharacterStatus) => void;
  inputStatus: StatusInputFields;
  updateInputStatus: (newInputStatus: StatusInputFields) => void;
}

const SkillArea = ({
  characterStatus,
  updateCharacter,
  inputStatus,
  updateInputStatus,
}: SkillAreaProps) => {
  // ブラッドスクレイパーのスキルを計算する
  const handleBradScraper = () => {
    const newCharacterStatus = { ...characterStatus };
    newCharacterStatus[STATUS.POW].bradScraper = 9;
    updateCharacter(newCharacterStatus);
    // 表示用ステータスを計算
    calculateDisplayStatus(characterStatus, updateCharacter);
  };

  // 妖精王の祝福(物理)のスキルを計算する
  const handleFairyKingBlessingPhy = () => {
    // 特殊スキルをリセット
    resetSpecialSkillStatus(characterStatus, updateCharacter);
    // 入力値(装備)更新を反映
    getInputStatus(characterStatus, inputStatus, updateCharacter);
    calculateDisplayStatus(characterStatus, updateCharacter);

    const newCharacterStatus = { ...characterStatus };
    newCharacterStatus[STATUS.POW].specialSkill = Math.floor(
      (newCharacterStatus[STATUS.POW].totalWithoutItem +
        newCharacterStatus[STATUS.POW].card +
        newCharacterStatus[STATUS.POW].allVita +
        newCharacterStatus[STATUS.POW].vita +
        newCharacterStatus[STATUS.POW].scroll +
        newCharacterStatus[STATUS.POW].canSeal +
        newCharacterStatus[STATUS.POW].bradScraper) *
        0.3,
    );
    newCharacterStatus[STATUS.ATK].specialSkill = Math.floor(
      (newCharacterStatus[STATUS.ATK].totalWithoutItem -
        newCharacterStatus[STATUS.POW].totalWithoutItem +
        newCharacterStatus[STATUS.ATK].scroll +
        (newCharacterStatus[STATUS.POW].displayStatus -
          newCharacterStatus[STATUS.POW].totalWithoutItem +
          newCharacterStatus[STATUS.POW].specialSkill) *
          2) *
        0.3,
    );
    updateCharacter(newCharacterStatus);
    // 表示用ステータスを計算
    calculateDisplayStatus(characterStatus, updateCharacter);
  };

  // 妖精王の祝福(魔法)のスキルを計算する
  const handleFairyKingBlessingMag = () => {
    // 特殊スキルをリセット
    resetSpecialSkillStatus(characterStatus, updateCharacter);
    // 入力値(装備)更新を反映
    getInputStatus(characterStatus, inputStatus, updateCharacter);
    calculateDisplayStatus(characterStatus, updateCharacter);

    const newCharacterStatus = { ...characterStatus };
    newCharacterStatus[STATUS.INT].specialSkill = Math.floor(
      (newCharacterStatus[STATUS.INT].totalWithoutItem +
        newCharacterStatus[STATUS.INT].card +
        newCharacterStatus[STATUS.INT].allVita +
        newCharacterStatus[STATUS.INT].vita +
        newCharacterStatus[STATUS.INT].scroll +
        newCharacterStatus[STATUS.INT].canSeal) *
        0.3,
    );
    newCharacterStatus[STATUS.MAT].specialSkill = Math.floor(
      (newCharacterStatus[STATUS.MAT].totalWithoutItem +
        newCharacterStatus[STATUS.MAT].scroll +
        (newCharacterStatus[STATUS.INT].displayStatus -
          newCharacterStatus[STATUS.INT].totalWithoutItem +
          newCharacterStatus[STATUS.INT].specialSkill) *
          2) *
        0.3,
    );
    updateCharacter(newCharacterStatus);
    // 表示用ステータスを計算
    calculateDisplayStatus(characterStatus, updateCharacter);
  };

  // 大天使の加護のスキルを計算する
  const handleArchangelBlessing = () => {
    // 特殊スキルをリセット
    resetSpecialSkillStatus(characterStatus, updateCharacter);
    // 入力値(装備)更新を反映
    getInputStatus(characterStatus, inputStatus, updateCharacter);
    calculateDisplayStatus(characterStatus, updateCharacter);

    const newCharacterStatus = { ...characterStatus };
    // HP・SP
    newCharacterStatus[STATUS.HP].specialSkill = Math.floor(
      (newCharacterStatus[STATUS.HP].totalWithoutItem +
        newCharacterStatus[STATUS.HP].scroll) *
        4,
    );
    newCharacterStatus[STATUS.SP].specialSkill = Math.floor(
      (newCharacterStatus[STATUS.SP].totalWithoutItem +
        newCharacterStatus[STATUS.SP].scroll) *
        4,
    );

    // POW・INT・SPD・VIT・LUK
    newCharacterStatus[STATUS.POW].specialSkill = Math.floor(
      (newCharacterStatus[STATUS.POW].totalWithoutItem +
        newCharacterStatus[STATUS.POW].card +
        newCharacterStatus[STATUS.POW].allVita +
        newCharacterStatus[STATUS.POW].vita +
        newCharacterStatus[STATUS.POW].scroll +
        newCharacterStatus[STATUS.POW].canSeal +
        newCharacterStatus[STATUS.POW].bradScraper) *
        0.2,
    );
    newCharacterStatus[STATUS.INT].specialSkill = Math.floor(
      (newCharacterStatus[STATUS.INT].totalWithoutItem +
        newCharacterStatus[STATUS.INT].card +
        newCharacterStatus[STATUS.INT].allVita +
        newCharacterStatus[STATUS.INT].vita +
        newCharacterStatus[STATUS.INT].scroll +
        newCharacterStatus[STATUS.INT].canSeal) *
        0.2,
    );
    newCharacterStatus[STATUS.SPD].specialSkill = Math.floor(
      (newCharacterStatus[STATUS.SPD].totalWithoutItem +
        newCharacterStatus[STATUS.SPD].card +
        newCharacterStatus[STATUS.SPD].allVita +
        newCharacterStatus[STATUS.SPD].vita +
        newCharacterStatus[STATUS.SPD].scroll +
        newCharacterStatus[STATUS.SPD].canSeal) *
        0.2,
    );
    newCharacterStatus[STATUS.VIT].specialSkill = Math.floor(
      (newCharacterStatus[STATUS.VIT].totalWithoutItem +
        newCharacterStatus[STATUS.VIT].card +
        newCharacterStatus[STATUS.VIT].allVita +
        newCharacterStatus[STATUS.VIT].vita +
        newCharacterStatus[STATUS.VIT].scroll +
        newCharacterStatus[STATUS.VIT].canSeal) *
        0.2,
    );
    newCharacterStatus[STATUS.LUK].specialSkill = Math.floor(
      (newCharacterStatus[STATUS.LUK].totalWithoutItem +
        newCharacterStatus[STATUS.LUK].card +
        newCharacterStatus[STATUS.LUK].allVita +
        newCharacterStatus[STATUS.LUK].vita +
        newCharacterStatus[STATUS.LUK].scroll +
        newCharacterStatus[STATUS.LUK].canSeal) *
        0.2,
    );

    // ATK・DEF・MAT・MDF
    newCharacterStatus[STATUS.ATK].specialSkill = Math.floor(
      (newCharacterStatus[STATUS.ATK].totalWithoutItem -
        newCharacterStatus[STATUS.POW].totalWithoutItem +
        newCharacterStatus[STATUS.ATK].scroll +
        (newCharacterStatus[STATUS.POW].displayStatus -
          newCharacterStatus[STATUS.POW].totalWithoutItem +
          newCharacterStatus[STATUS.POW].specialSkill) *
          2) *
        0.2,
    );
    newCharacterStatus[STATUS.MAT].specialSkill = Math.floor(
      (newCharacterStatus[STATUS.MAT].totalWithoutItem +
        newCharacterStatus[STATUS.MAT].scroll +
        (newCharacterStatus[STATUS.INT].displayStatus -
          newCharacterStatus[STATUS.INT].totalWithoutItem +
          newCharacterStatus[STATUS.INT].specialSkill) *
          2) *
        0.2,
    );
    newCharacterStatus[STATUS.DEF].specialSkill = Math.floor(
      (newCharacterStatus[STATUS.DEF].totalWithoutItem +
        newCharacterStatus[STATUS.DEF].scroll +
        (newCharacterStatus[STATUS.VIT].displayStatus -
          newCharacterStatus[STATUS.VIT].totalWithoutItem +
          newCharacterStatus[STATUS.VIT].specialSkill) *
          2) *
        0.2,
    );
    const selectInt =
      newCharacterStatus[STATUS.INT].displayStatus +
      newCharacterStatus[STATUS.INT].specialSkill;
    const selectVit =
      newCharacterStatus[STATUS.VIT].displayStatus +
      newCharacterStatus[STATUS.VIT].specialSkill;
    const selectStatus = selectInt > selectVit ? selectInt : selectVit;
    newCharacterStatus[STATUS.MDF].specialSkill = Math.floor(
      (newCharacterStatus[STATUS.MDF].totalWithoutItem -
        newCharacterStatus[STATUS.INT].totalWithoutItem * 15 +
        newCharacterStatus[STATUS.MDF].scroll +
        selectStatus * 2) *
        0.2,
    );

    updateCharacter(newCharacterStatus);
    // 表示用ステータスを計算
    calculateDisplayStatus(characterStatus, updateCharacter);
  };

  // 祝福の蒼盾のスキルを計算する
  const handleBlessedAzureAegis = () => {
    // 特殊スキルをリセット
    resetSpecialSkillStatus(characterStatus, updateCharacter);
    // 入力値(装備)更新を反映
    getInputStatus(characterStatus, inputStatus, updateCharacter);
    calculateDisplayStatus(characterStatus, updateCharacter);

    const newCharacterStatus = { ...characterStatus };
    newCharacterStatus[STATUS.VIT].specialSkill = Math.floor(
      (newCharacterStatus[STATUS.VIT].totalWithoutItem +
        newCharacterStatus[STATUS.VIT].card +
        newCharacterStatus[STATUS.VIT].allVita +
        newCharacterStatus[STATUS.VIT].vita +
        newCharacterStatus[STATUS.VIT].scroll +
        newCharacterStatus[STATUS.VIT].canSeal) *
        0.3,
    );
    updateCharacter(newCharacterStatus);
    // 表示用ステータスを計算
    calculateDisplayStatus(characterStatus, updateCharacter);
  };

  // 明王の鼓舞・陽のスキルを計算する
  const handleWisdomKingInspirationYang = () => {
    // 特殊スキルをリセット
    resetSpecialSkillStatus(characterStatus, updateCharacter);
    // 入力値(装備)更新を反映
    getInputStatus(characterStatus, inputStatus, updateCharacter);
    calculateDisplayStatus(characterStatus, updateCharacter);

    const newCharacterStatus = { ...characterStatus };
    // HP・SP
    newCharacterStatus[STATUS.HP].specialSkill = Math.floor(
      (newCharacterStatus[STATUS.HP].totalWithoutItem +
        newCharacterStatus[STATUS.HP].scroll) *
        2,
    );
    newCharacterStatus[STATUS.SP].specialSkill = Math.floor(
      (newCharacterStatus[STATUS.SP].totalWithoutItem +
        newCharacterStatus[STATUS.SP].scroll) *
        2,
    );

    //SPD
    newCharacterStatus[STATUS.SPD].specialSkill = Math.floor(
      (newCharacterStatus[STATUS.SPD].totalWithoutItem +
        newCharacterStatus[STATUS.SPD].card +
        newCharacterStatus[STATUS.SPD].allVita +
        newCharacterStatus[STATUS.SPD].vita +
        newCharacterStatus[STATUS.SPD].scroll +
        newCharacterStatus[STATUS.SPD].canSeal) *
        0.3,
    );
    updateCharacter(newCharacterStatus);
    // 表示用ステータスを計算
    calculateDisplayStatus(characterStatus, updateCharacter);
  };

  // 明王の守護・陰のスキルを計算する
  const handleWisdomKingProtectionYin = () => {
    // 特殊スキルをリセット
    resetSpecialSkillStatus(characterStatus, updateCharacter);
    // 入力値(装備)更新を反映
    getInputStatus(characterStatus, inputStatus, updateCharacter);
    calculateDisplayStatus(characterStatus, updateCharacter);

    const newCharacterStatus = { ...characterStatus };
    // HP・SP
    newCharacterStatus[STATUS.HP].specialSkill = Math.floor(
      (newCharacterStatus[STATUS.HP].totalWithoutItem +
        newCharacterStatus[STATUS.HP].scroll) *
        2,
    );
    newCharacterStatus[STATUS.SP].specialSkill = Math.floor(
      (newCharacterStatus[STATUS.SP].totalWithoutItem +
        newCharacterStatus[STATUS.SP].scroll) *
        2,
    );

    //SPD
    newCharacterStatus[STATUS.SPD].specialSkill = Math.floor(
      (newCharacterStatus[STATUS.SPD].totalWithoutItem +
        newCharacterStatus[STATUS.SPD].card +
        newCharacterStatus[STATUS.SPD].allVita +
        newCharacterStatus[STATUS.SPD].vita +
        newCharacterStatus[STATUS.SPD].scroll +
        newCharacterStatus[STATUS.SPD].canSeal) *
        0.3,
    );
    updateCharacter(newCharacterStatus);
    // 表示用ステータスを計算
    calculateDisplayStatus(characterStatus, updateCharacter);
  };

  // 邪神の呪詛のスキルを計算する
  const handleEvilGodCurse = () => {
    // 特殊スキルをリセット
    resetSpecialSkillStatus(characterStatus, updateCharacter);
    // 入力値(装備)更新を反映
    getInputStatus(characterStatus, inputStatus, updateCharacter);
    calculateDisplayStatus(characterStatus, updateCharacter);

    const newCharacterStatus = { ...characterStatus };
    newCharacterStatus[STATUS.LUK].specialSkill = Math.floor(
      (newCharacterStatus[STATUS.LUK].totalWithoutItem +
        newCharacterStatus[STATUS.LUK].card +
        newCharacterStatus[STATUS.LUK].allVita +
        newCharacterStatus[STATUS.LUK].vita +
        newCharacterStatus[STATUS.LUK].scroll +
        newCharacterStatus[STATUS.LUK].canSeal) *
        0.3,
    );
    updateCharacter(newCharacterStatus);
    // 表示用ステータスを計算
    calculateDisplayStatus(characterStatus, updateCharacter);
  };

  // ブラッドスクレイパーのスキルをリセットする
  const handleResetBradScraper = () => {
    resetBradScraperStatus(characterStatus, updateCharacter);
    calculateDisplayStatus(characterStatus, updateCharacter);
  };

  // 特殊スキルをリセットする
  const handleResetSpecialSkill = () => {
    resetSpecialSkillStatus(characterStatus, updateCharacter);
    calculateDisplayStatus(characterStatus, updateCharacter);
  };

  return (
    <>
      <Grid
        container
        spacing={1}
        margin={0}
        justifyContent="center"
        alignItems="start"
      >
        {/* ----- 1行目 ----- */}
        {/* スキルリセットボタン */}
        <Grid item xs={6}>
          <Button
            variant="contained"
            onClick={handleResetBradScraper}
            fullWidth
            color="warning"
          >
            スクレイパーリセット
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            onClick={handleResetSpecialSkill}
            fullWidth
            color="warning"
          >
            特殊リセット
          </Button>
        </Grid>

        {/* スキル */}
        {/* ----- 2行目 ----- */}
        <Grid item xs={6}>
          <Button variant="outlined" fullWidth onClick={handleBradScraper}>
            ブラッドスクレイパー
          </Button>
        </Grid>
        <Grid item xs={6}></Grid>

        {/* ----- 3行目 ----- */}
        <Grid item xs={6}>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleFairyKingBlessingPhy}
          >
            妖精王の祝福(物理)
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleFairyKingBlessingMag}
          >
            妖精王の祝福(魔法)
          </Button>
        </Grid>

        {/* ----- 4行目 ----- */}
        <Grid item xs={6}>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleArchangelBlessing}
          >
            大天使の加護
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleBlessedAzureAegis}
          >
            祝福の蒼盾
          </Button>
        </Grid>

        {/* ----- 5行目 ----- */}
        <Grid item xs={6}>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleWisdomKingInspirationYang}
          >
            明王の鼓舞・陽
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleWisdomKingProtectionYin}
          >
            明王の守護・陰
          </Button>
        </Grid>

        {/* ----- 6行目 ----- */}
        <Grid item xs={6}>
          <Button variant="outlined" fullWidth onClick={handleEvilGodCurse}>
            邪神の呪詛
          </Button>
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </>
  );
};

export default SkillArea;
