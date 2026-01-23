import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SkillArea from './SkillArea';
import { STATUS, FIELDS } from '../../constants/constants';
import { CharacterStatus, StatusInputFields } from '../../interface/Status';
import * as StatusUtil from '../../util/StatusUtil';

jest.mock('../../util/StatusUtil', () => ({
    getInputStatus: jest.fn(),
    calculateDisplayStatus: jest.fn(),
    resetBradScraperStatus: jest.fn(),
    resetSpecialSkillStatus: jest.fn(),
}));

type StatusEntry = CharacterStatus[string];

type StatusKey = typeof STATUS[keyof typeof STATUS];

type StatusOverrides = Partial<Record<StatusKey, Partial<StatusEntry>>>;

const buildStatusEntry = (overrides: Partial<StatusEntry> = {}): StatusEntry => ({
    base: 0,
    card: 0,
    totalWithoutItem: 0,
    allVita: 0,
    vita: 0,
    scroll: 0,
    canSeal: 0,
    bradScraper: 0,
    specialSkill: 0,
    liquid: 0,
    displayStatus: 0,
    ...overrides,
});

const buildCharacterStatus = (overrides: StatusOverrides = {}): CharacterStatus => {
    const characterStatus: Record<StatusKey, StatusEntry> = {
        [STATUS.LEVEL]: buildStatusEntry(),
        [STATUS.HP]: buildStatusEntry(),
        [STATUS.SP]: buildStatusEntry(),
        [STATUS.POW]: buildStatusEntry(),
        [STATUS.INT]: buildStatusEntry(),
        [STATUS.VIT]: buildStatusEntry(),
        [STATUS.SPD]: buildStatusEntry(),
        [STATUS.LUK]: buildStatusEntry(),
        [STATUS.ATK]: buildStatusEntry(),
        [STATUS.DEF]: buildStatusEntry(),
        [STATUS.MAT]: buildStatusEntry(),
        [STATUS.MDF]: buildStatusEntry(),
    };

    Object.entries(overrides).forEach(([key, value]) => {
        characterStatus[key as StatusKey] = buildStatusEntry({
            ...characterStatus[key as StatusKey],
            ...value,
        });
    });

    return characterStatus;
};

const buildInputStatus = (): StatusInputFields =>
    Object.values(FIELDS).reduce((acc, key) => {
        acc[key] = { value: '0', errorMessage: '' };
        return acc;
    }, {} as StatusInputFields);

const renderSkillArea = (
    characterStatus: CharacterStatus = buildCharacterStatus(),
    inputStatus: StatusInputFields = buildInputStatus(),
) => {
    const updateCharacter = jest.fn();
    const updateInputStatus = jest.fn();

    render(
        <SkillArea
            characterStatus={characterStatus}
            updateCharacter={updateCharacter}
            inputStatus={inputStatus}
            updateInputStatus={updateInputStatus}
        />
    );

    return { updateCharacter, updateInputStatus, characterStatus, inputStatus };
};

describe('SkillArea', () => {
    const mockGetInputStatus = jest.mocked(StatusUtil.getInputStatus);
    const mockCalculateDisplayStatus = jest.mocked(StatusUtil.calculateDisplayStatus);
    const mockResetBradScraperStatus = jest.mocked(StatusUtil.resetBradScraperStatus);
    const mockResetSpecialSkillStatus = jest.mocked(StatusUtil.resetSpecialSkillStatus);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('スキルリセット', () => {
        it('スクレイパーリセットはブラッドスクレイパーのリセットを呼ぶ', async () => {
            const user = userEvent;
            const { updateCharacter, characterStatus } = renderSkillArea();

            await user.click(
                screen.getByRole('button', { name: 'スクレイパーリセット' })
            );

            expect(mockResetBradScraperStatus).toHaveBeenCalledWith(
                characterStatus,
                updateCharacter
            );
            expect(mockCalculateDisplayStatus).toHaveBeenCalledWith(
                characterStatus,
                updateCharacter
            );
        });

        it('特殊リセットは特殊スキルのリセットを呼ぶ', async () => {
            const user = userEvent;
            const { updateCharacter, characterStatus } = renderSkillArea();

            await user.click(screen.getByRole('button', { name: '特殊リセット' }));

            expect(mockResetSpecialSkillStatus).toHaveBeenCalledWith(
                characterStatus,
                updateCharacter
            );
            expect(mockCalculateDisplayStatus).toHaveBeenCalledWith(
                characterStatus,
                updateCharacter
            );
        });
    });

    describe('ブラッドスクレイパー', () => {
        it('ブラッドスクレイパーはPOWに固定値を付与する', async () => {
            const user = userEvent;
            const { updateCharacter, characterStatus } = renderSkillArea();

            await user.click(
                screen.getByRole('button', { name: 'ブラッドスクレイパー' })
            );

            const updatedStatus = updateCharacter.mock.calls[0][0];

            expect(updatedStatus[STATUS.POW].bradScraper).toBe(9);
            expect(mockCalculateDisplayStatus).toHaveBeenCalledWith(
                characterStatus,
                updateCharacter
            );
        });
    });

    describe('妖精王の祝福(物理/魔法)', () => {
        describe('妖精王の祝福(物理)', () => {
            it('妖精王の祝福(物理)はPOWとATKに補正を付与する', async () => {
                const user = userEvent;
                const characterStatus = buildCharacterStatus({
                    [STATUS.POW]: {
                        totalWithoutItem: 100,
                        card: 5,
                        allVita: 3,
                        vita: 2,
                        scroll: 4,
                        canSeal: 1,
                        bradScraper: 9,
                        displayStatus: 150,
                    },
                    [STATUS.ATK]: {
                        totalWithoutItem: 200,
                        scroll: 6,
                    },
                });
                const { updateCharacter, inputStatus } = renderSkillArea(characterStatus);

                await user.click(
                    screen.getByRole('button', { name: '妖精王の祝福(物理)' })
                );

                const updatedStatus = updateCharacter.mock.calls[0][0];

                expect(updatedStatus[STATUS.POW].specialSkill).toBe(37);
                expect(updatedStatus[STATUS.ATK].specialSkill).toBe(84);
                expect(mockResetSpecialSkillStatus).toHaveBeenCalledWith(
                    characterStatus,
                    updateCharacter
                );
                expect(mockGetInputStatus).toHaveBeenCalledWith(
                    characterStatus,
                    inputStatus,
                    updateCharacter
                );
                expect(mockCalculateDisplayStatus).toHaveBeenCalledTimes(2);
            });
        });

        describe('妖精王の祝福(魔法)', () => {
            it('妖精王の祝福(魔法)はINTとMATに補正を付与する', async () => {
                const user = userEvent;
                const characterStatus = buildCharacterStatus({
                    [STATUS.INT]: {
                        totalWithoutItem: 120,
                        card: 10,
                        vita: 5,
                        scroll: 3,
                        canSeal: 2,
                        displayStatus: 160,
                    },
                    [STATUS.MAT]: {
                        totalWithoutItem: 180,
                        scroll: 7,
                    },
                });
                const { updateCharacter } = renderSkillArea(characterStatus);

                await user.click(
                    screen.getByRole('button', { name: '妖精王の祝福(魔法)' })
                );

                const updatedStatus = updateCharacter.mock.calls[0][0];

                expect(updatedStatus[STATUS.INT].specialSkill).toBe(42);
                expect(updatedStatus[STATUS.MAT].specialSkill).toBe(105);
                expect(mockResetSpecialSkillStatus).toHaveBeenCalledWith(
                    characterStatus,
                    updateCharacter
                );
                expect(mockCalculateDisplayStatus).toHaveBeenCalledTimes(2);
            });
        });
    });

    describe('大天使の加護', () => {
        it('大天使の加護はHPとMDFを計算式どおりに補正する', async () => {
            const user = userEvent;
            const characterStatus = buildCharacterStatus({
                [STATUS.HP]: { totalWithoutItem: 50, scroll: 10 },
                [STATUS.INT]: {
                    totalWithoutItem: 80,
                    card: 4,
                    allVita: 1,
                    vita: 2,
                    scroll: 3,
                    displayStatus: 120,
                },
                [STATUS.VIT]: {
                    totalWithoutItem: 70,
                    card: 5,
                    allVita: 2,
                    vita: 1,
                    scroll: 2,
                    canSeal: 1,
                    displayStatus: 110,
                },
                [STATUS.MDF]: { totalWithoutItem: 60, scroll: 6 },
            });
            const { updateCharacter } = renderSkillArea(characterStatus);

            await user.click(
                screen.getByRole('button', { name: '大天使の加護' })
            );

            const updatedStatus = updateCharacter.mock.calls[0][0];

            expect(updatedStatus[STATUS.HP].specialSkill).toBe(240);
            expect(updatedStatus[STATUS.MDF].specialSkill).toBe(-172);
            expect(mockResetSpecialSkillStatus).toHaveBeenCalledWith(
                characterStatus,
                updateCharacter
            );
        });
    });

    describe('祝福の蒼盾', () => {
        it('祝福の蒼盾はVITに補正を付与する', async () => {
            const user = userEvent;
            const characterStatus = buildCharacterStatus({
                [STATUS.VIT]: {
                    totalWithoutItem: 90,
                    card: 4,
                    allVita: 2,
                    vita: 1,
                    scroll: 3,
                    canSeal: 0,
                },
            });
            const { updateCharacter } = renderSkillArea(characterStatus);

            await user.click(
                screen.getByRole('button', { name: '祝福の蒼盾' })
            );

            const updatedStatus = updateCharacter.mock.calls[0][0];

            expect(updatedStatus[STATUS.VIT].specialSkill).toBe(30);
            expect(mockResetSpecialSkillStatus).toHaveBeenCalledWith(
                characterStatus,
                updateCharacter
            );
        });
    });

    describe('明王の鼓舞・陽', () => {
        it('明王の鼓舞・陽はSPDに補正を付与する', async () => {
            const user = userEvent;
            const characterStatus = buildCharacterStatus({
                [STATUS.SPD]: {
                    totalWithoutItem: 70,
                    card: 3,
                    allVita: 1,
                    vita: 2,
                    scroll: 4,
                    canSeal: 1,
                },
            });
            const { updateCharacter } = renderSkillArea(characterStatus);

            await user.click(
                screen.getByRole('button', { name: '明王の鼓舞・陽' })
            );

            const updatedStatus = updateCharacter.mock.calls[0][0];

            expect(updatedStatus[STATUS.SPD].specialSkill).toBe(24);
            expect(mockResetSpecialSkillStatus).toHaveBeenCalledWith(
                characterStatus,
                updateCharacter
            );
        });
    });

    describe('明王の守護・陰', () => {
        it('明王の守護・陰は特殊スキルの再計算フローを呼び出す', async () => {
            const user = userEvent;
            const { updateCharacter, characterStatus, inputStatus } = renderSkillArea();

            await user.click(
                screen.getByRole('button', { name: '明王の守護・陰' })
            );

            expect(mockResetSpecialSkillStatus).toHaveBeenCalledWith(
                characterStatus,
                updateCharacter
            );
            expect(mockGetInputStatus).toHaveBeenCalledWith(
                characterStatus,
                inputStatus,
                updateCharacter
            );
            expect(mockCalculateDisplayStatus).toHaveBeenCalledTimes(2);
            expect(updateCharacter).toHaveBeenCalledTimes(1);
        });
    });

    describe('邪神の呪詛', () => {
        it('邪神の呪詛はLUKに補正を付与する', async () => {
            const user = userEvent;
            const characterStatus = buildCharacterStatus({
                [STATUS.LUK]: {
                    totalWithoutItem: 60,
                    card: 5,
                    allVita: 2,
                    vita: 1,
                    scroll: 2,
                    canSeal: 0,
                },
            });
            const { updateCharacter } = renderSkillArea(characterStatus);

            await user.click(
                screen.getByRole('button', { name: '邪神の呪詛' })
            );

            const updatedStatus = updateCharacter.mock.calls[0][0];

            expect(updatedStatus[STATUS.LUK].specialSkill).toBe(21);
            expect(mockResetSpecialSkillStatus).toHaveBeenCalledWith(
                characterStatus,
                updateCharacter
            );
        });
    });
});
