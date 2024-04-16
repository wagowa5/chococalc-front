import { useContext } from 'react';

import { Grid } from '@mui/material';
import Button from '@mui/material/Button';

import {
  CharacterStatusContext,
  InputStatusContext,
} from 'contexts/StatusContext';
import { STATUS } from 'constants/constants';
import {
  getInputStatus,
  calculateDisplayStatus,
  resetBradScraperStatus,
  resetSpecialSkillStatus,
} from 'util/StatusUtil';
import {
  calcFairyKingBlessingPhy,
  calcFairyKingBlessingMag,
  calcArchangelBlessing,
  calcBlessedAzureAegis,
  calcEvilGodCurse,
  calcWisdomKingInspirationYang,
  calcWisdomKingProtectionYin,
} from './specialSkills';

const SkillArea = () => {
  const characterContext = useContext(CharacterStatusContext);
  const inputContext = useContext(InputStatusContext);
  // コンテキストが undefined でないことを確認
  if (!characterContext || !inputContext) {
    console.error(
      'CharacterStatusContext or InputStatusContext is not provided',
    );
    return <div>エラー：適切なプロバイダが設定されていません。</div>;
  }
  // 必要な関数や状態を抽出するための分割代入
  const { characterStatus, updateCharacter } = characterContext;
  const { inputStatus } = inputContext;

  // ブラッドスクレイパーのスキルを計算する
  const handleBradScraper = () => {
    let newCharacterStatus = { ...characterStatus };

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

    // 物理の妖精王の祝福のスキルを計算
    calcFairyKingBlessingPhy(characterStatus, updateCharacter);

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

    // 魔法の妖精王の祝福のスキルを計算
    calcFairyKingBlessingMag(characterStatus, updateCharacter);

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

    // 大天使の加護のスキルを計算
    calcArchangelBlessing(characterStatus, updateCharacter);

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

    // 祝福の蒼盾のスキルを計算
    calcBlessedAzureAegis(characterStatus, updateCharacter);

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

    // 明王の鼓舞・陽のスキルを計算
    calcWisdomKingInspirationYang(characterStatus, updateCharacter);

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

    // 明王の守護・陰のスキルを計算
    calcWisdomKingProtectionYin(characterStatus, updateCharacter);

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

    // 邪神の呪詛のスキルを計算
    calcEvilGodCurse(characterStatus, updateCharacter);

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
