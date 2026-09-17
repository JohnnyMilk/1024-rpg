# 1024 RPG — Type 02 Design Notes

## Status
**VERSION 1 · NEW CORE DIRECTION — DESIGN PHASE**

The previous City / Management direction (v0.1–v0.3) is abandoned after playtesting. Those builds remain archived only as design experiments and are no longer candidates for the Type 02 core game.

Type 02 now combines three systems into one roguelite loop:

> **王國遠征 / 自動戰鬥 → 收集材料 → 鍊金工坊合成 → 地下城探索 → 帶回更稀有的資源 → 下一次遠征。**

The design goal is simple: even without elaborate presentation, every 1024 merge should create a useful unit, material, item, route choice or combat consequence.

---

## Core fantasy
玩家經營一個位於王國邊境的遠征工坊。

工坊本身不只是選單，而是整個 run 的基地。玩家利用 1024 式合併製造遠征單位、取得材料、鍊成消耗品與裝備，再帶著有限的道具深入地下城。

一次 run 由「準備 → 遠征 → 製作 → 地下城 → 回家」反覆構成。死亡或遠征失敗會結束當次 run，但部分藍圖、知識、角色或解鎖內容可成為 roguelite 的永久進度。

---

## Three connected game layers

### 1. 王國遠征 — Unit Forge + 2D Auto Battle
手機畫面分為上下兩層。

**下方：1024 單位生成棋盤**
- 主要操作仍然是上下左右滑動。
- 相同單位 / 數值合併後升級。
- 合併結果不是單純分數，而是直接轉化為上方遠征隊的新單位或強化。
- 不同合併階級可對應不同兵種、品質、技能或出場效果。
- 玩家真正思考的是「現在要製造什麼部隊」，而不是只追求最大數字。

**上方：橫向 2D 遠征動畫**
- 隊伍由左往右前進。
- 玩家不需要逐一控制攻擊；單位會自動遇敵、戰鬥、受傷與前進。
- 下方棋盤每次產生的新單位會立即反映在上方隊伍。
- 路途中可遇到怪物、精英、採集點、事件、寶箱與 Boss。
- 擊敗敵人與探索地圖主要取得鍊金材料。

因此上下兩層不是兩個分離的小遊戲：**下方的每一次合併，都應該在上方立即得到視覺與戰術回饋。**

### 2. 鍊金工坊 — Material Merge / Crafting
遠征取得的材料帶回基地後進入鍊金工坊。

- 材料具有類型與階級，例如草藥、礦石、魔物素材、魔力結晶、稀有核心。
- 玩家可以把材料放入鍊金盤或配方槽中組合。
- 相同材料可升階；不同材料組合則可能產生不同配方。
- 成品可包含藥水、炸彈、卷軸、陷阱、武器附魔、護符與特殊鑰匙。
- 已發現的配方可記錄在鍊金圖鑑；未知組合允許玩家實驗。
- 高價值素材會形成重要抉擇：現在做消耗品提高本次存活率，或保留素材挑戰更高階配方。

鍊金工坊是遠征材料與地下城能力之間的橋樑。

### 3. 地下城探索 — Roguelike Expedition
玩家從工坊挑選有限數量的道具進入地下城。

- 地下城由房間 / 節點構成，路線具有分支。
- 可能遇到戰鬥、陷阱、寶箱、祭壇、商人、資源房與 Boss。
- 鍊金道具可以直接改變探索結果，例如治療、炸開封路、解除陷阱、強化部隊、改變敵人、開啟特殊門。
- 地下城獲得的素材比普通王國遠征更稀有，也是高階鍊金與永久解鎖的重要來源。
- 玩家可以選擇繼續深入承擔風險，或帶著現有戰利品撤退回家。

地下城因此提供 roguelike 的「風險 / 報酬」核心。

---

## Primary gameplay loop

**HOME / 工坊**
→ 選擇遠征方向與準備
→ **KINGDOM EXPEDITION**
→ 下方 1024 合併生產單位
→ 上方隊伍自動向右遠征與戰鬥
→ 獲得材料
→ **ALCHEMY WORKSHOP**
→ 合成道具 / 裝備 / 特殊用品
→ **DUNGEON**
→ 使用道具探索、戰鬥、取得稀有材料
→ 選擇撤退或繼續深入
→ 回到工坊
→ 強化下一輪遠征
→ 最終失敗 / 完成 run
→ roguelite 永久解鎖

---

## World map / Kingdom layer
王國戰爭不做成傳統即時戰略。大地圖主要負責「選擇去哪裡冒險」。

地圖上的區域可提供不同素材與敵人，例如：
- 森林：草藥、木材、野獸素材；
- 礦山：礦石、金屬、魔晶；
- 沼澤：毒素、菌類、異變素材；
- 遺跡：卷軸、古代零件、魔法核心；
- 地下城入口：高風險、高稀有度資源。

玩家不是單純把整張地圖佔領，而是根據「我現在缺什麼材料 / 想做什麼道具」決定遠征方向。

---

## Roguelite structure
### During one run
可累積：
- 單位強度；
- 材料庫存；
- 製作出的道具；
- 當局特殊效果；
- 地圖探索進度。

### Persistent between runs
初步建議保留：
- 已發現的鍊金配方；
- 新兵種 / 單位類型解鎖；
- 新材料與新區域圖鑑；
- 少量工坊功能解鎖；
- 新地下城 / Boss 的進入資格。

永久成長應以「增加新的選擇」為主，而不是單純永久加大量數值，避免後期只剩數值碾壓。

---

## Why the three systems belong together
1. **王國遠征回答：材料從哪裡來？** 1024 合併直接產生部隊，部隊替玩家取得基礎素材。
2. **鍊金工坊回答：材料有什麼用？** 戰利品不是被動貨幣，而是玩家能親自組合的遊戲內容。
3. **地下城回答：為什麼要做更好的道具？** 玩家需要真正使用製作品解決更危險的情境，並取得下一階段素材。
4. **Roguelite 回答：為什麼要再玩一局？** 新配方、兵種、區域與組合讓下一局產生不同策略。

---

## MVP / first POC recommendation
不要一開始同時製作完整王國、鍊金與地下城。

第一個新 POC 只驗證最重要的連動：

**上半部：一條 2D 橫向遠征道路。**
- 英雄隊伍從左往右自動走。
- 固定生成幾種測試敵人。
- 擊殺後掉落 2–3 種測試材料。

**下半部：4×4 1024 單位棋盤。**
- 上下左右滑動。
- 合併產生 / 強化上方單位。
- 至少 3 種單位結果，讓不同合併真的有不同戰鬥效果。

POC 的唯一驗證問題：

> **「我在下面滑動合併 → 上面立刻多一個 / 變強一個單位 → 打贏敵人 → 掉材料」這個循環，本身好不好玩？**

如果這個核心成立，再加入鍊金工坊；鍊金成立後才製作真正的地下城。

---

## Abandoned City POCs
The following are preserved only for project history and comparison:
- `type-02-v1-v0-1/` — City four-family merge experiment.
- `type-02-v1-v0-2/` — Quarter planning + LIVE CITY experiment.
- `type-02-v1-v0-3/` — District City experiment.

Playtesting conclusion: visual city feedback and presentation could not compensate for a core loop that lacked enough meaningful decisions and immediate gameplay consequences. **No further City / Management development is planned.**

---

## Design principles
1. Primary mobile interaction remains simple and readable.
2. 1024 merging must cause an immediate gameplay consequence, not merely increase a score.
3. The upper expedition and lower merge board must behave as one system.
4. Materials must lead to meaningful crafting decisions.
5. Crafted items must solve real dungeon problems.
6. Every run should create different combinations and route decisions.
7. Meta progression should unlock possibilities more than raw permanent power.
8. Build and test the smallest loop before adding content or elaborate animation.

## Current working label
**TYPE 02 — EXPEDITION ALCHEMY ROGUELITE**

Final game title has not been selected.
