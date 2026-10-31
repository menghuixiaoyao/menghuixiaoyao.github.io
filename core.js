(function (G) {
'use strict';
/* ============ 数值常量（可在此调整平衡） ============ */
const K = {
  START_ATTR: 1,          // 新角色初始各属性（生命 1 → 生命上限 10）
  OLD_START_ATTR: 5,      // 旧存档缺失属性时的补全值（旧版初始值）
  START_STAMINA: 5,       // 新存档赠送体力
  CHECKIN_STAMINA: 5,     // 每日签到基础体力
  CHECKIN_PER_LV: 1,      // 每升 1 级签到体力 +1：签到体力 = 4 + 等级
  HP_PER_VIT: 10,         // 生命上限 = 生命 × 10
  MP_PER_INT: 5,          // 法力上限 = 智力 × 5
  COST_TRAIN: 1,          // 修炼：1 体力 = +1 属性
  COST_ALCHEMY: 1,        // 炼药消耗体力
  ADV_MON_MULT: 0.80,     // 文字冒险：一轮要打多场，单场怪物强度 × 0.80（再乘阶级倍率）
  COST_ADVENTURE: 1,      // 冒险最低体力（初级）；各难度体力见 DIFFS.cost
  COST_PK: 1,             // PK 消耗体力
  ATTR_MIN: 1,            // 属性下限
  // —— 角色等级 ——
  XP_PER_LEVEL: 50, XP_EXP: 1.5, // 升级所需经验 = 50 × 等级^1.5（Lv1 50、Lv2 141、Lv5 559、Lv10 1581）
  LV_ATTR: 1,             // 每升 1 级全属性 +1（旧存档不补发）
  ADV_XP_WIN: 10, ADV_XP_LOSE: 3, // 旧值（现由 DIFFS.xp / xpL 决定）
  PK_XP_WIN: 15, PK_XP_LOSE: 5,
  // —— 炼药 ——
  ALC_BASE_RATE: 0.40,    // 1 级炼药成功率 40%
  ALC_RATE_PER_LV: 0.05,  // 每级 +5%
  ALC_RATE_MAX: 0.95,
  ALC_XP_OK: 10, ALC_XP_FAIL: 4,
  ALC_XP_PER_LEVEL: 30,   // 炼药升级经验 = 炼药等级 × 30
  POT3_BASE: 0.05, POT3_PER_INT: 0.012, POT3_MAX: 0.55, // 出 3 瓶概率 = 5% + 智力×1.2%（上限 55%）
  POT2: 0.35,             // 出 2 瓶概率 35%，其余 1 瓶
  Q3_BASE: 0.10, Q3_PER_LV: 0.02, Q3_MAX: 0.40, // 上品概率 = 10% + 炼药等级×2%（上限 40%）
  Q2: 0.30,               // 中品 30%，其余下品
  Q5_BASE: 0.02, Q5_PER_LV: 0.005, Q5_MAX: 0.10, // 完美概率 = 2% + 炼药等级×0.5%（上限 10%）
  Q4_BASE: 0.05, Q4_PER_LV: 0.01, Q4_MAX: 0.20, // 丹纹概率 = 5% + 炼药等级×1%（上限 20%）
  // —— 战斗 ——
  ATK_MULT: 3,            // 保留：技能等特殊攻击用；普通攻击统一力量×1（±15% 浮动）
  DEF_MULT: 1.5,          // 伤害减免 = 防御 × 1.5
  MIN_DMG_PCT: 0.1,       // 未被完全格挡时，最低造成攻击力 10% 伤害
  REFLECT_RATIO: 2,       // 防御 ≥ 对方力量 × 2 时，物理攻击 0 伤害
  REFLECT_PCT: 0.3,       // 并反震 30% 攻击力
  DODGE_BASE: 0.05, DODGE_PER_AGI: 0.015, DODGE_MAX: 0.35, // 闪避 = 5% + 敏捷差×1.5%
  COMBO_PER_AGI: 0.02, COMBO_MAX: 0.30, // 连击：敏捷高于对手时，普攻后追加一击的概率 = 敏捷差×2%（上限 30%）
  CRIT_BASE: 0.05, CRIT_PER_AGI: 0.004, CRIT_MAX: 0.30, CRIT_MULT: 1.5,
  DEFEND_REDUCE: 0.25,     // 防御姿态：本回合受伤 ×0.25；v838 先手怪太疼，加强减伤
  DEFEND_MP: 3, DEFEND_MP_PCT: 0.1, // 防御姿态回复 3 + 10% 法力上限
  MP_REGEN: 2,            // 每回合自然回复法力
  MAX_ROUNDS: 200,        // 回合上限，200回合未分胜负判玩家失败
  // —— 渡劫（v172：筑基→金丹起，突破判定成功后） ——
  TRIB_ROUNDS: 9,         // 雷劫：九道天雷
  TRIB_DEMON_P: 1.0,      // v738 雷劫后必定触发心魔劫（原30%）
  TRIB_DEMON_MULT: 0.9,   // 心魔属性 = 玩家战斗属性 ×0.9
  TRIB_QUIZ_P: 1.0,        // v738 心魔劫必定问心答题（原50%问心/50%斗法）
  TRIB_QUIZ_N: 3,         // v174 问心题目数
  TRIB_QUIZ_NEED: 2,      // v174 问心答对数（≥2 即过）
  TRIB_POWER_MAX: 2.0,    // v175 渡劫强度上限：压条 900% 时天劫强度×2.0
  TRIB_POWER_1000: 2.5,   // v178 压条 1000% 时：雷伤×2.5（最强天劫）
  TRIB_DEMON_1000: 2.5,   // v178 压条 1000% 时：天魔 2.5 倍属性
  TRIB_CURSE_PER: 0.05,   // v179 诅咒：每层心魔强度 +5%（可叠加，解咒药可消）
  TRIB_POWER_DEMON: 0.4,  // v175 心魔吃到强度加成的比例（压条 900% 时心魔为 0.9×1.4=1.26 倍：极难但备好技能/灵宠/装备可赢）
  TRIB_GRADES: ['圆满', '完美', '上品', '中品', '下品'], // v175 金丹/元婴品质
  TRIB_GRADE_MULT: [2.0, 1.8, 1.6, 1.4, 1.2], // v175 品质对应突破倍率（下品1.2=原默认值）
  TRIB_GRADE_FULL: [24, 17, 11, 5, 0], // v1172 Ye 定：品质对应压条门槛（圆满2400%/完美1700%/上品1100%/中品500%；超500%必不低于中品）
  TRIB_GRADE_JI_MULT: 2.2,   // v1172 Ye 定：压条 2900% 为圆满极限（圆满之上独立一档）
  TRIB_JACKPOT_P: 0.01,      // v176 天劫异变：压条≤200% 时 1% 概率撞上高阶雷劫（中品/上品/完美/圆满随机）
  // —— 冒险 ——
  MON_BASE: 25, MON_SCALE: 0.90, // 怪物总属性 ≈ (25 + (玩家总属性-25)×0.90) × 难度倍率 × (0.9~1.1)
  // —— 金元 ——
  PK_GOLD_MIN: 30, PK_GOLD_MAX: 50, // PK 胜利金元
  DEATH_GOLD_PCT: 0.2,    // 冒险战死损失 20% 金元
  // —— 挖矿（替代修炼力量）：1 体力 = 力量 +1 + 1 块矿石（存入背包，可在商店出售）——
  MINE_CRIT_PER_STR: 0.001, MINE_CRIT_MAX: 0.5, // 挖矿/打猎暴击率 = 对应属性×0.1%（上限 50%）// v658
  MINE_MORE_BASE: 0.15, MINE_MORE_PER_STR: 0.003, MINE_MORE_MAX: 0.45, // 暴击后每多 1 块的概率 = 15% + 力量×0.3%（上限 45%），最多 5 块
  MEAT_BASE: 0.02, MEAT_PER_AGI: 0.0001, MEAT_MAX: 0.04, // 打猎每次 2% + 敏捷×0.01%（上限 4%）额外带回 1 块肉（不受暴击影响），品种与本次（首只）猎物相同
  TIER_SHIFT_PER: 0.0005, TIER_SHIFT_MAX: 0.05, // 灵石（力量）/凝露（防御）品阶：一品概率 -属性×0.05%（上限 -5%），按 40/30/20/10% 分给二~五品
  PREMIUM_BASE: 0.02, PREMIUM_PER_DEF: 0.0001, PREMIUM_MAX: 0.04, // 种植每次 2% + 防御×0.01%（上限 4%）额外收获 1 瓶凝露（品阶另掷）
  PET_EGG_CHANCE: 0.01, // 掏兽蛋每次固定 1% 额外掏到灵宠蛋
  // —— 饥饿 / 气运 ——
  HUNGER_ACT: 2, HUNGER_FIGHT: 5,   // 玩家饱食度：修炼/炼药每点体力 -2，冒险/PK 每次 -5
  WELL_FED: 70, LUCK_FED: 1.2,      // 饱食度 ≥70：气运，掉落/暴击/灵石/凝露/肉/灵宠蛋概率 ×1.2
  // —— 灵宠饥饿 / 忠诚 ——
  PET_HUNGER_FIGHT: 5, PET_HUNGER_DAY: 10, PET_HUNGRY: 30, PET_LOYAL_START: 60,
  PET_LIFE_MAX: 100, PET_DEATH_LIFE: 20, PET_DEATH_LOYAL: 10, // 灵宠阵亡：寿命 -20、忠诚 -10；寿命 0 永久死亡
  TALENT_LEARN_P: 0.1, TALENT_TURTLE_P: 0.5, TALENT_TURTLE_ROUNDS: 2, TALENT_QINGLONG_P: 0.3, TALENT_QINGLONG_HEAL: 0.25, TALENT_BAIHU_CHAIN: [0.4, 0.3, 0.2, 0.1], TALENT_ZHUQUE_P: 0.2, TALENT_ZHUQUE_HEAL: 0.5, TALENT_FOX_P: 0.1, // 天赋神通：神级宠物升级 10% 领悟
  ZX_STR_PCT: 0.5, ZX_WEAK_PCT: 0.3, ZX_ROUNDS: 5, ZX_CONFUSE_ROUNDS: 3, ZX_CONFUSE_P: 0.5, // 珍馐：力+50%/衰-30%（5 回合）、离混乱 3 回合 50% 互砍
  PET_BITE_OUT: 0.08,               // 饥饿(<30)的灵宠：每次行动/上线 8% 咬主人
  BITE_VIT: 0.25, BITE_HUNGER: 10, BITE_LOYAL: 4, BITE_BLEED: 0.3, BITE_DEPRESS: 0.15, // 场外咬伤：生命 -max(1, 力量×0.25)
  PK_BITE_LOYAL_K: 0.006, PK_BITE_HUNGRY: 0.10, PK_BITE_HUNGRY_K: 0.005, PK_BITE_MAX: 0.6, // PK 反咬率 = (50-忠诚)×0.6% + 饥饿时 10%+(30-饥饿)×0.5%
  FEED_LOYAL_P: 0.4, FIGHT_LOYAL_P: 0.3, LVUP_LOYAL_P: 0.5,
  // —— 状态 ——
  BLEED_CHECKIN: 0.20,              // 场外流血：每次签到扣 流血时生命上限 的 20%（小数累积，满 1 点才扣；可扣到 0 → 死亡），只能用止血药治愈
  MANA_BASE: 8, MANA_PER_INT: 2, COST_MANA: 2, // 法力：10 级后取代活力，上限 8 + 智力×2；每次生活技能耗 2 法力；签到回满
  VIGOR_BASE: 10, VIGOR_CAP_DAYS: 3, COST_LIFE: 1, // 活力：10 级前用；签到 10 + 每 2 级 +1；最多囤 3 天量；每次生活技能 1 活力
  LIFE_XP_OK: 10, LIFE_XP_FAIL: 4, LIFE_BASE_RATE: 0.60, LIFE_RATE_PER_LV: 0.04, LIFE_RATE_MAX: 0.95, // 烹饪/锻造/炼金/驯兽：成功率 60% + 每级 4%（上限 95%）
  LIFE_Q3_BASE: 0.05, LIFE_Q3_PER_LV: 0.02, LIFE_Q3_MAX: 0.40, LIFE_Q2: 0.30, // 极品 5% + 每级 2%（上限 40%）×气运，精良 30%
  BUFF_ATTR: [0, 0, 0.10, 0.20], BUFF_LUCK: [1, 1, 1.15, 1.30], BUFF_FIGHTS: 3, BUFF_ACTS: 10, // 菜肴增益
  LIFE_ATTR_RATE: 0.001, LIFE_ATTR_RATE_MAX: 0.10, LIFE_ATTR_Q: 0.0005, LIFE_ATTR_Q_MAX: 0.05, // 关联属性：每点成功率 +0.1%（上限 +10%）、极品/上品 +0.05%（上限 +5%）、炼金双倍 +0.05%（上限 +5%）
  REFINE_DOUBLE_PER_LV: 0.02, REFINE_DOUBLE_MAX: 0.30, GEAR_SELL_PER_PT: 5, // 炼金双倍产出概率；装备出售 = 加成点 × 5 金
  TAME_LOYAL: 3, TAME_XP_P: 0.15, TAME_XP_P_PER_LV: 0.01, TAME_PET_XP: 10, TAME_BITE_CUT_PER_LV: 0.05, TAME_BITE_CUT_MAX: 0.5, TAME_RARE_PER_LV: 0.10, TAME_RARE_MAX: 1.0,
  BEASTPILL_XP: [0, 30, 80, 200], // 灵兽丹：普通/精良/极品 → 灵宠经验
  HATCH_LV: 1, // 1级即可孵化（原6级限制已取消）
  PAGES_PER_BOOK: 10, SKILL_PAGES_PER_BOOK: 10, // 10 张同品残页 → 1 本经验书；10 张同技能残页 → 1 本技能书
  SKILLPAGE_BASE: 0.015, SKILLPAGE_PER_INT: 0.0001, SKILLPAGE_MAX: 0.03, SKILLBOOK_SELL: 0.5, // 技能观相残页概率 1.5% + 智力×0.01%（上限 3%）×气运；已会技能的书按原价 50% 出售
  DEATH_LOSE_MIN: 5, DEATH_LOSE_MAX: 10, // 死亡时背包随机丢失件数
  PROTECT_N: 5, // 新人保护：新角色前 5 次死亡 / 冒险战败免除全部惩罚
  POISON_VIT: 0.10, // 中毒：不会自行消退，只能用解毒丹；每次进入冒险扣 中毒时生命上限 的 10%（可扣到 0 → 毒发身亡，即第 10 次进冒险致死）
  POISON_TRAIN: 0.02, // 中毒：每次修炼扣 中毒时生命上限 的 2%
  DEPRESS_HOURS: 12, DEPRESS_ATTR: 0.9, DEPRESS_LUCK: 0.8, DEPRESS_FAIL: 0.15, // 抑郁：12 小时，战斗属性 ×0.9、气运 ×0.8、修炼 15% 失败
  CURSE_BT: 0.01, // 诅咒：永久，每层突破成功率 -1 个百分点，可叠加
  BLEED_RND: 0.05, POISON_RND: 0.04, POISON_ROUNDS: 3, // 战斗中：流血每回合 -5% 最大生命；中毒每回合 -4%（3 回合）
  STATUS_HIT: 0.10, VAMP_BLEED: 0.25, CARRY_OUT: 0.3, PK_LOSS_DEPRESS: 0.1,
  DEPRESS_FOOD_CURE: 0.15, DEPRESS_PET_CURE: 0.25,
  // 灵宠有自己的五项属性（孵化时按品种倾向随机），战斗公式与玩家相同
  PET_XP_WIN: 20, PET_XP_LOSE: 8, // 灵宠参加 PK：胜 +20 / 负 +8 经验（认输不得）
  PET_XP_PER_LV: 30,    // 灵宠升级所需经验 = 30 × 当前等级
  PET_LV_PTS: 5,        // 灵宠每升 1 级得 5 点自由属性点（各品质相同，背包手动分配）；另按品质全属性自动成长
  PET_SKILL_P: 0.15,      // 灵宠每次升级领悟本系套装技能的概率（五宠各对一套装：灵狐-暴击/白虎-致命/玄龟-防御/青龙-治愈/朱雀-幸运）
  PET_DEVOUR_P: 0.5,      // 吞噬时习得对方每项已掌握技能的概率
  PET_DEVOUR_QUP: 0.15,   // 吞噬时品质进阶1级的概率（最高到神）
  PET_LUCK_DODGE: 0.1,    // 灵宠幸运技能：闪避 +10%
  AI_PET_EXTRA_LV: 1.5, // AI 灵宠额外属性 = 0~对手等级×1.5（模拟已培养的灵宠）
  PET_TARGET: 0.3,      // 攻击方对手带灵宠时，攻击有 30% 落在灵宠身上
  AI_PET_CHANCE: 0.35,  // AI 对手携带灵宠的概率
  SPIRIT_BASE: 0.02, SPIRIT_PER_STR: 0.0001, SPIRIT_MAX: 0.04, // 挖矿每次额外 2% + 力量×0.01%（上限 4%）挖到灵石
  ORE_STR_BONUS: 0.0005, ORE_BONUS_MAX: 0.05, // 每点对应属性使第 3、4 档稀有物品概率各 +0.05%（各自上限 +5%），从第 1 档中扣除
  // —— 炼药材料 ——
  ALC_BOOST_RATE_MAX: 0.98, ALC_BOOST_Q3_MAX: 0.70, // 投入灵石/凝露后的总上限：成功率 98%，上品 70%
  VAMP_PCT: 0.5,          // 吸血斩：回复造成伤害的 50%
  // —— PK ——
  PK_RANGE_LO: 0.85, PK_RANGE_HI: 1.15, // 对手总属性 = 玩家 × 0.85~1.15
  PK_TAKE: 2,             // 胜者夺取 2 点指定属性
  LOG_KEEP: 500
};
const ATTRS = ['agi', 'str', 'def', 'vit', 'int'];
const AN = { agi: '敏捷', str: '力量', def: '防御', vit: '生命', int: '智力' };
const GRADES = { 5: '完美', 4: '丹纹', 3: '上品', 2: '中品', 1: '下品' };
// 技能：由10张同名技能残页合成技能书习得（price），lv = AI 对手可习得的最低等级
const SKILLS = {
  smash:    { name: '重击',   mp: 5,  price: 60,  lv: 2, desc: '1.6 倍物理伤害' },
  shield:   { name: '护盾',   mp: 6,  price: 90, lv: 3, desc: '获得 智力×3 点护盾' },
  fireball: { name: '火球术', mp: 8,  price: 120, lv: 4, desc: '智力×2+力量 魔法伤害，不可闪避' },
  heal:     { name: '治疗术', mp: 10, price: 120, lv: 5, desc: '恢复 智力×3+5 生命' },
  vamp:     { name: '吸血斩', mp: 7,  price: 180, lv: 7, desc: '1.2 倍物理伤害，回复伤害 50% 生命' },
  thunder:  { name: '雷击',   mp: 16, price: 260, lv: 9, desc: '智力×3.5+力量 魔法重创，不可闪避' },
  tunmo:    { name: '吞魔',   mp: 0,  price: 800, lv: 99, desc: '被动：习得后可在背包吞噬煞气' },
  shukuchi: { name: '缩地',   mp: 0,  price: 500, lv: 10, desc: '被动：冒险中一次可移动两格', passive: 1 }, // v762；v780 被动
  danuoyi:  { name: '大挪移', mp: 0,  price: 1200, lv: 20, desc: '被动：冒险中一次可移动三格', passive: 1 }, // v762；v780 被动
  shenshu:   { name: '神术',   mp: 10, price: 1000, lv: 15, desc: '主动：神识探查，1分钟内探查神识×2', active: 1 } // v947 神识探查
};
const PAGES = { // 看书五种结果（悟道档位），各得 1 张对应残页；p 为基础概率，智力越高高档越多（同矿石公式）
  pg1: { name: '普通残页', out: '学习',     p: 0.50 },
  pg2: { name: '精读残页', out: '深度学习', p: 0.30 },
  pg3: { name: '小悟残页', out: '小悟',     p: 0.13 },
  pg4: { name: '中悟残页', out: '中悟',     p: 0.05 },
  pg5: { name: '大悟残页', out: '大悟',     p: 0.02 }
};
const ORES = {
  iron:   { name: '铁矿', p: 0.50, price: 3 },
  copper: { name: '铜矿', p: 0.30, price: 6 },
  silver: { name: '银矿', p: 0.15, price: 15 },
  gold:   { name: '金矿', p: 0.05, price: 40 },
  // 灵石：不参与矿石稀有度掷骰；挖到灵石时再按品阶掷骰（p 为基础概率）
  // 灵石五品（sp1~sp5）：挖矿偶得，不可出售；服用得经验（五品直接升 1 级）；炼药可投入 1 块，成功率与上品各 +alc
  sp1: { name: '灵气石', p: 0.50, xp: 20,  alc: 0.05, extra: true },
  sp2: { name: '下品灵石', p: 0.25, xp: 50,  alc: 0.10, extra: true },
  sp3: { name: '中品灵石', p: 0.15, xp: 120, alc: 0.15, extra: true },
  sp4: { name: '上品灵石', p: 0.08, xp: 300, alc: 0.25, extra: true },
  sp5: { name: '极品灵石', p: 0.02, lvl: 1,  alc: 0.40, extra: true }
};
const PREY = {
  rabbit: { name: '野兔皮', p: 0.50, price: 3 },
  deer:   { name: '鹿皮',   p: 0.30, price: 6 },
  wolf:   { name: '狼皮',   p: 0.15, price: 15 },
  tiger:  { name: '虎皮',   p: 0.05, price: 40 }
};
// 掏兽蛋（替代修炼生命）：普通兽蛋可在商店出售；另有 1% 掏到灵宠蛋（存 S.petEggs，背包孵化）
const EGGS = {
  chicken: { name: '鸡蛋',   p: 0.50, price: 3, hunger: 5 },
  duck:    { name: '鸭蛋',   p: 0.30, price: 6, hunger: 8 },
  goose:   { name: '鹅蛋',   p: 0.15, price: 15, hunger: 12 },
  ostrich: { name: '鸵鸟蛋', p: 0.05, price: 40, hunger: 25 }
};
// 疗伤药（商店出售，背包使用）
const MEDS = {
  bandage:  { name: '止血药', price: 25, cure: 'bleed',   desc: '止住流血（流血唯一解法）' },
  antidote: { name: '解毒丹', price: 1000, cure: 'poison',  desc: '解除中毒（中毒唯一解法，否则会毒发身亡）；炼药可自炼' }, // v1163 Ye 定：1000 金/颗，也可自炼
  incense:  { name: '兴奋剂', price: 30, cure: 'depress', desc: '立即驱散抑郁' },
  shenshui: { name: '神水', price: 50, cure: 'curse', desc: '消除一层诅咒' },
  tpscroll: { name: '随机传送卷', price: 200, desc: '冒险中随机传送到任意一格' }, // v765
  stealthfu: { name: '隐身符', price: 100, desc: '使用后 30 分钟内采集资源不惊扰怪物（可叠加时长）' } // v1162 Ye 定：商店 100 金/张
};
const STATUS = { bleed: { name: '流血', icon: '🩸' }, poison: { name: '中毒', icon: '☠️' }, depress: { name: '抑郁', icon: '🌧️' } }; // 诅咒改为 S.curseN 永久层数，不再走状态系统
// 灵宠种类：孵化权重 w；bonus 为冒险中的小额被动加成；PK 中灵宠亲自上阵（初始五项属性均为 1，与新角色相同）
const PETS = {
  fox:      { name: '灵狐', icon: '🦊', w: 38, bonus: { agi: 0.05 }, style: '迅捷连击：普攻，35% 再攻击一次' },
  turtle:   { name: '玄龟', icon: '🐢', w: 27, bonus: { def: 0.05 }, style: '护主：主人受到伤害 -35%（至主人下次行动），40% 撞击' },
  zhuque:   { name: '朱雀', icon: '🐦‍🔥', w: 16, bonus: { int: 0.05 }, style: '烈焰：法术伤害（智力×2+力量），40% 灼烧 2 回合' },
  qinglong: { name: '青龙', icon: '🐉', w: 11, bonus: { vit: 0.05 }, style: '龙息：强力法术伤害（智力×3.5+力量），回复主人 30% 伤害值的生命' },
  baihu:    { name: '白虎', icon: '🐯', w: 8,  bonus: { str: 0.05 }, style: '撕裂：1.3 倍物理伤害，40% 使敌方流血' }
};
// 灵宠天赋神通（仅神级宠物升级时概率领悟，每种灵宠固定一种）
const PET_TALENT = {
  fox:      { name: '魅惑', desc: '行动后 10% 概率魅惑敌方全体，1 回合无法行动（含吃药）' },
  turtle:   { name: '嘲讽', desc: '行动后 50% 概率嘲讽，敌方全体 2 回合只能攻击玄龟' },
  zhuque:   { name: '重生', desc: '倒下时 20% 概率浴火重生（恢复 50% 生命），可无限触发' },
  qinglong: { name: '沐浴', desc: '行动时 30% 概率沐浴甘霖，主人+自身恢复 25% 最大生命' },
  baihu:    { name: '狂袭', desc: '攻击后按 40%/30%/20%/10% 概率连续再击，最多 5 连击' }
};
// 灵宠品质（孵化时独立随机）：w 权重；grow 每升 1 级全属性自动 +grow；名字颜色即品质
const PET_BREAK_MAX = [0, 1, 2, 3, 5, 8, 12, 999]; // 各品质突破上限次数（神=无上限）
const PQLT = [
  { name: '普通', w: 30, grow: 1, color: '#bdbdbd', lvMax: 30 },
  { name: '优秀', w: 25, grow: 2, color: '#66bb6a', lvMax: 40 },
  { name: '稀有', w: 18, grow: 3, color: '#42a5f5', lvMax: 50 },
  { name: '卓越', w: 12, grow: 4, color: '#26c6da', lvMax: 60 },
  { name: '史诗', w: 8,  grow: 5, color: '#ab47bc', lvMax: 70 },
  { name: '传说', w: 4,  grow: 6, color: '#ffa726', lvMax: 80 },
  { name: '仙',   w: 2,  grow: 7, color: '#ffee58', lvMax: 90 },
  { name: '神',   w: 1,  grow: 8, color: '#ef5350', lvMax: 100 }
];
const petQ = p => PQLT[(p && p.q) | 0] || PQLT[0]; // 品质兜底（老存档无 q 时为普通）
// 五宠 ↔ 五属性 ↔ 五套装：1:1 对应（灵狐-敏捷-暴击 / 白虎-力量-致命 / 玄龟-防御-防御 / 青龙-生命-治愈 / 朱雀-智力-幸运）
const PET_SET = { fox: 'crit', baihu: 'fatal', turtle: 'def', qinglong: 'heal', zhuque: 'luck' };
const petMatchTxt = k => { const st = GEAR_SETS[PET_SET[k]], at = Object.keys(PETS[k].bonus)[0]; return `${AN[at]}·${st.name}套`; };
const petSkillTxt = (S, pet, sk) => { const v = sk === 'luck' ? K.PET_LUCK_DODGE : ((pet && petActiveSets(pet)[sk]) || (S && activeSets(S)[sk]) || GEAR_SETS[sk].v[0]); return GEAR_SETS[sk].name + '+' + Math.round(v * 100) + '%'; }; // 灵宠技能当前效果：自身套装 > 主人套装 > 2 件基础
// 种植：收获炼药用药草（五种等概率随机），存入材料；凝露为稀有额外收获（extra，不参与掷骰）
const FARM = {
  h_agi: { name: '敏捷草', p: 0.2 }, h_str: { name: '力量草', p: 0.2 }, h_def: { name: '防御草', p: 0.2 },
  h_vit: { name: '生命草', p: 0.2 }, h_int: { name: '智力草', p: 0.2 }
};
// 凝露三品（dw1~dw3，v1128 由凝露五品改制：下品/中品/上品）：种植偶得（下品也可在商店购买）；服用得随机属性点 pts；炼药可投入 1 瓶，成功率与上品各 +alc
const LU = {
  dw1: { name: '下品凝露', p: 0.50, pts: 1, alc: 0.05, extra: true, price: 15, desc: '炼药投入：成功率/上品 +5%；服用：随机属性 +1' },
  dw2: { name: '中品凝露', p: 0.15, pts: 3, alc: 0.15, extra: true },
  dw3: { name: '上品凝露', p: 0.02, pts: 8, alc: 0.40, extra: true }
};
Object.assign(FARM, LU);
// 采集：挖矿（力量）/ 打猎（敏捷）/ 种植（防御）结构相同——1 体力 = 对应属性 +1 + 1 件物品（暴击/丰收 2~5 件）
const GATHER = {
  mine: { attr: 'str', items: ORES, store: 'ores', name: '挖矿', unit: '块', noun: '矿石' },
  hunt: { attr: 'agi', items: PREY, store: 'prey', name: '打猎', unit: '件', noun: '猎物' },
  farm: { attr: 'def', items: FARM, store: 'mats', name: '种植', unit: '株', noun: '药草', even: true, nosell: true },
  egg:  { attr: 'vit', items: EGGS, store: 'eggs', name: '掏兽蛋', unit: '枚', noun: '兽蛋' },
  read: { attr: 'int', items: PAGES, store: 'pages', name: '看书', unit: '张', noun: '观相残页', nosell: true, single: true }
};
// 经验书：同品残页 PAGES_PER_BOOK 张合成 1 本，用于提升生活技能经验（目前只有炼药有等级）
const EXP_BOOKS = {
  eb1: { name: '普通经验书', page: 'pg1', xp: 20 }, eb2: { name: '精读经验书', page: 'pg2', xp: 50 }, eb3: { name: '小悟经验书', page: 'pg3', xp: 120 },
  eb4: { name: '中悟经验书', page: 'pg4', xp: 300 }, eb5: { name: '大悟经验书', page: 'pg5', xp: 800 }
};
const LIFE_SKILLS = { alc: { name: '炼药', icon: '⚗️', attr: 'int' }, cook: { name: '烹饪', icon: '🍳', attr: 'agi' }, forge: { name: '锻造', icon: '🔨', attr: 'str' }, refine: { name: '炼金', icon: '✨', attr: 'def' }, tame: { name: '驯兽', icon: '🐾', attr: 'vit' }, formation: { name: '阵法', icon: '🧭', attr: 'int' }, talisman: { name: '制符', icon: '📜', attr: 'int' } }; /* 每个生活技能关联一项属性；v266 烹饪→敏捷、炼金→防御；v560 加阵法、制符 */ // 有等级的生活技能，均消耗活力
const ADV_LIFE = ['formation', 'talisman']; // v560 高阶生活技能：需主宰轮回后参悟
const canAdvLife = S => (S.reinc && (S.reinc[12] | 0) > 0); // v560 主宰(第12境)轮回过
const QNAME = ['', '普通', '精良', '极品'], QMULT = [0, 1, 1.5, 2];
// 烹饪：菜肴比生食回复更多饱食/体力；精良/极品附带临时增益（属性：接下来 3 场战斗；气运：接下来 10 点体力的行动）
const DISHES = {
  d_rabbit: { name: '烤兔肉',       lv: 1, need: [['food', 'rabbit', 1]],                 hunger: 20, sta: 2, buff: 'agi' },
  d_egg:    { name: '香煎鸡蛋',     lv: 1, need: [['eggs', 'chicken', 2]],                hunger: 15, sta: 1, buff: 'luck' },
  d_deer:   { name: '药膳鹿肉羹',   lv: 2, need: [['food', 'deer', 1], ['mats', 'h_vit', 1]],  hunger: 30, sta: 4, buff: 'def' },
  d_goose:  { name: '灵草鹅蛋饼',   lv: 2, need: [['eggs', 'goose', 1], ['mats', 'h_int', 1]], hunger: 25, sta: 2, buff: 'int' },
  d_wolf:   { name: '红烧狼肉',     lv: 3, need: [['food', 'wolf', 1], ['mats', 'h_str', 1]],  hunger: 40, sta: 5, buff: 'str' },
  d_tiger:  { name: '虎肉大补汤',   lv: 5, need: [['food', 'tiger', 1], ['eggs', 'ostrich', 1]], hunger: 60, sta: 8, buff: 'luck' },
  // 珍馐：烹饪特产，不可食用，PK 战前使用（最先手，无视敏捷）；存入 S.zx
  zx_poison: { name: '珍馐毒', lv: 6, need: [['food', 'tiger', 1], ['mats', 'h_int', 2]], zx: 'poison', zxDesc: '战前使用：敌方全体中毒' },
  zx_li:     { name: '珍馐离', lv: 6, need: [['food', 'tiger', 1], ['mats', 'h_agi', 2]], zx: 'li',     zxDesc: '战前使用：敌方混乱 3 回合，50% 概率转头互砍' },
  zx_str:    { name: '珍馐力', lv: 6, need: [['food', 'tiger', 1], ['mats', 'h_str', 2]], zx: 'str',    zxDesc: '战前使用：己方（主人+灵宠）力量 +50%，持续 5 回合' },
  zx_weak:   { name: '珍馐衰', lv: 7, need: [['food', 'tiger', 1], ['mats', 'h_def', 2]], zx: 'weak',   zxDesc: '战前使用：敌方全属性 -30%，持续 5 回合' },
  zx_soul:   { name: '回魂珍馐', lv: 8, need: [['food', 'tiger', 1], ['mats', 'dw3', 1]],  zx: 'soul',   zxDesc: '战前使用：本场战斗中主人或灵宠首次倒下时复活（50% 生命）' }
};
// 锻造：5 个装备栏（头/项链/武器/衣服/鞋子），加成属性由套装决定（暴击+敏捷 / 致命+力量 / 防御+防御 / 治愈+生命 / 幸运+智力）；属性 = 品质 + 档位 - 1（铁 1~5 / 铜 2~6 / 银 3~7 / 金 4~9），矿石同时影响成功率与品质概率
const SLOTS = { helm: { name: '头' }, neck: { name: '项链' }, weapon: { name: '武器' }, armor: { name: '衣服' }, boots: { name: '鞋子' } }; /* 部位只用于计件，属性由套装决定 */
const GEAR_TIERS = [ // 每档矿石：所需锻造等级、材料（武器一套配方，其余部位一套配方）；属性 = 品质 + 档位 - 1；矿石 + 同档猎物皮（铁兔/铜鹿/银狼/金虎，掉率 50/30/15/5% 对齐）
  { v: 1, lv: 1, w: [['ores', 'iron', 5], ['prey', 'rabbit', 1]], a: [['ores', 'iron', 6], ['prey', 'rabbit', 1]] },
  { v: 2, lv: 2, w: [['ores', 'copper', 4], ['ores', 'iron', 2], ['prey', 'deer', 1]], a: [['ores', 'copper', 4], ['ores', 'iron', 3], ['prey', 'deer', 1]] },
  { v: 3, lv: 4, w: [['ores', 'silver', 3], ['ores', 'copper', 2], ['prey', 'wolf', 1]], a: [['ores', 'silver', 3], ['ores', 'copper', 3], ['prey', 'wolf', 1]] },
  { v: 5, lv: 6, w: [['ores', 'gold', 2], ['ores', 'silver', 2], ['prey', 'tiger', 1]], a: [['ores', 'gold', 2], ['ores', 'silver', 3], ['prey', 'tiger', 1]] }
];
const GEAR_NAMES = { weapon: ['铁剑', '铜刀', '银枪', '金刃'], armor: ['铁甲', '铜甲', '银铠', '金甲'], helm: ['铁盔', '铜盔', '银冠', '金冠'], neck: ['铁坠', '铜链', '银项链', '金项链'], boots: ['铁靴', '铜靴', '银靴', '金靴'] };
const GEAR = {}; for (const sl in SLOTS) GEAR_TIERS.forEach((t, i) => GEAR[sl + (i + 1)] = { name: GEAR_NAMES[sl][i], slot: sl, tier: i + 1, v: t.v, lv: t.lv, need: sl === 'weapon' ? t.w : t.a });
const SLOT_NAMES = { helm: '头盔', neck: '项链', weapon: '剑', armor: '衣服', boots: '鞋子' };
const SET_NAME = { crit: '暴击', luck: '幸运', def: '防御', heal: '治愈', fatal: '致命' };
const SET_ITEMS = {}; for (const st in SET_NAME) { SET_ITEMS[st] = { pre: SET_NAME[st] }; for (const sl in SLOT_NAMES) SET_ITEMS[st][sl] = SET_NAME[st] + SLOT_NAMES[sl]; } // 简单命名：暴击头盔 / 防御项链 …
const PET_SLOT_NAMES = { helm: '兽盔', neck: '项圈', weapon: '利爪', armor: '软甲', boots: '踏云靴' }; // 灵宠装备部位（键与人物一致，另起名字）
const PET_GEAR = {}; for (const sl in SLOTS) PET_GEAR['pg_' + sl] = { name: PET_SLOT_NAMES[sl], slot: sl, tier: 1, lv: 1, need: sl === 'weapon' ? [['ores', 'iron', 5], ['prey', 'rabbit', 1]] : [['ores', 'iron', 6], ['prey', 'rabbit', 1]], pet: true }; // 灵宠装备配方：单档，铁矿 + 兔皮，锻造 1 级可做
const TIER_MAT = ['铁', '铜', '银', '金'];
const gearItemName = (k, set) => PET_GEAR[k] ? TIER_MAT[0] + SET_NAME[set] + PET_SLOT_NAMES[PET_GEAR[k].slot] : TIER_MAT[GEAR[k].tier - 1] + (SET_ITEMS[set] ? SET_ITEMS[set][GEAR[k].slot] : GEAR[k].name); // 灵宠装备如 铁暴击兽盔；人物如 金暴击剑；品质用名字颜色表示
const OLD_GEAR = { w1: 'weapon1', w2: 'weapon2', w3: 'weapon3', w4: 'weapon4', a1: 'armor1', a2: 'armor2', a3: 'armor3', a4: 'armor4' }; // 旧存档：武器 / 护甲 → 衣服
const GEAR_SETS = { // 套装：同套装备件数 ≥2 生效，数值按 2/3/4/5 件递增（可同时激活多套）
  crit:  { name: '暴击', attr: 'agi', v: [0.05, 0.08, 0.12, 0.18], fmt: v => `暴击率 +${+(v * 100).toFixed(1)}%` },
  luck:  { name: '幸运', attr: 'int', v: [0.10, 0.18, 0.28, 0.40], fmt: v => `气运 +${+(v * 100).toFixed(1)}%` },
  def:   { name: '防御', attr: 'def', v: [0.10, 0.18, 0.28, 0.40], fmt: v => `防御 +${+(v * 100).toFixed(1)}%`, afkMult: [0.2, 0.4, 0.6, 0.8, 1.0] }, // 隐藏：闭关法力倍率+20%/40%/60%/80%/100%（5件洞府2/秒/灵脉4/秒）
  heal:  { name: '治愈', attr: 'vit', v: [0.02, 0.03, 0.04, 0.06], fmt: v => `每回合回复 ${+(v * 100).toFixed(1)}% 最大生命`, ningqi: [0.05, 0.08, 0.12, 0.48], ningqiAgain: [0.10, 0.20, 0.30, 0.40] }, // 隐藏：凝气成功率+5%/8%/12%/48%，另有10%/20%/30%/40%概率双倍（300经验）
  fatal: { name: '致命', attr: 'str', v: [0.06, 0.10, 0.14, 0.20], fmt: v => `每次攻击 ${+(v * 100).toFixed(1)}% 致命一击`, wushu2x: true }, // 隐藏：习武经验翻倍（2件起生效）
};
// 炼金：10 个低品合 1 个高品（最高四品，五品只能掉落）；矿石点化为金矿
const REFINES = { // 炼金配方：主料 + 1 张普通残页（配方/丹方，看书 50% 得，约 2 体力）；失败只损耗第一种材料 1 份，残页不损耗
  r_sp2: { name: '下品灵石', lv: 1, need: [['ores', 'sp1', 3], ['pages', 'pg1', 1]], out: ['ores', 'sp2'] },
  r_sp3: { name: '中品灵石', lv: 2, need: [['ores', 'sp2', 3], ['pages', 'pg1', 1]], out: ['ores', 'sp3'] },
  r_sp4: { name: '上品灵石', lv: 4, need: [['ores', 'sp3', 3], ['pages', 'pg1', 1]], out: ['ores', 'sp4'] },
  r_dw2: { name: '中品凝露', lv: 1, need: [['mats', 'dw1', 3], ['pages', 'pg1', 1]], out: ['mats', 'dw2'] },
  r_dw3: { name: '上品凝露', lv: 2, need: [['mats', 'dw2', 3], ['pages', 'pg1', 1]], out: ['mats', 'dw3'] },
  r_gold1: { name: '点铁成金', lv: 1, need: [['ores', 'iron', 5], ['pages', 'pg1', 1]], out: ['ores', 'gold'] },
  r_gold2: { name: '铜化金',   lv: 2, need: [['ores', 'copper', 3], ['pages', 'pg1', 1]], out: ['ores', 'gold'] },
  p_hp: { name: '生命药水', lv: 1, need: [['mats', 'h_vit', 1], ['mats', 'dw1', 1], ['pages', 'pg1', 1]], pot: 'hp' }, // 品质决定回复量
  p_mp: { name: '法力药水', lv: 1, need: [['mats', 'h_int', 1], ['mats', 'dw1', 1], ['pages', 'pg1', 1]], pot: 'mp' }
};
const POTIONS = { hp: { name: '生命药水', icon: '❤️', res: '生命' }, mp: { name: '法力药水', icon: '💧', res: '法力' } };
const POT_PCT = [0, 0.30, 0.40, 0.50]; // 普通 / 精良 / 极品：回复 30% / 40% / 50% 上限
const potKey = (t, q) => t + q, potOf = k => { const m = /^(hp|mp)([1-3])$/.exec(k || ''); return m ? { t: m[1], q: +m[2], pct: POT_PCT[+m[2]], name: POTIONS[m[1]].name } : null; };
// 阵法配方 v788：阵法台制作，布阵后获得限时增益
const FORMATIONS = {
  f_gather: { name: '采集阵', lv: 0, need: [['prey', 'wolf', 2], ['ores', 'sp1', 5], ['ores', 'iron', 3]], desc: '小型采集阵（v1128 起改由阵棋合成，此旧配方已停用）。可布于冒险图空格、田药园、养殖园，上品灵石驱动自动采集（1颗=1小时）', buff: 'gather', mult: 1.25, duration: 7200 }, // v908 配方：狼皮+灵气石+铁矿；v913 lv0可做；v1125 冒险图也可布阵
  f_spirit: { name: '聚灵阵', lv: 2, need: [['ores', 'sp1', 10]], desc: '闭关法力+25%，持续2小时', buff: 'spirit', mult: 1.25, duration: 7200 },
};
// 符箓配方 v788：画符台制作，战斗中使用的消耗品
const TALISMANS = {
  t_golden: { name: '金身符', lv: 1, need: [['ores', 'sp1', 3], ['prey', 'rabbit', 1], ['pages', 'pg1', 1]], desc: '战斗中免一次伤害', effect: 'negate_one' }, // v789 加皮料
};
const RECIPES = { cook: DISHES, forge: Object.assign({}, GEAR, PET_GEAR), refine: REFINES, formation: FORMATIONS, talisman: TALISMANS }; // v560；v788 阵法符箓实装
const MEATS = { // 肉：品种与猎物对应，食用恢复体力
  rabbit: { name: '兔肉', sta: 1, hunger: 10 }, deer: { name: '鹿肉', sta: 2, hunger: 15 }, wolf: { name: '狼肉', sta: 3, hunger: 20 }, tiger: { name: '虎肉', sta: 5, hunger: 30 }
};
const OLD_SKILLS = ['fireball', 'smash', 'heal', 'shield']; // 旧存档默认已会的技能
// 炼药材料：每次炼药必须消耗 1 株对应属性的药草（basic）；凝露为可选增益（见 LU）
const MATS = {
  h_agi: { name: '敏捷草', price: 5, basic: 'agi' }, h_str: { name: '力量草', price: 5, basic: 'str' },
  h_def: { name: '防御草', price: 5, basic: 'def' }, h_vit: { name: '生命草', price: 5, basic: 'vit' },
  h_int: { name: '智力草', price: 5, basic: 'int' },
  lz_seed: { name: '🌱灵植种子', price: 10, desc: '洞府灵田种植用（元婴以上元神照料才生长）', seed: 1 }, // v887；v890 洞府元婴限定
  cave_token: { name: '🏠洞府令', price: 500, desc: '使用：开辟洞府1格，灵气+2（元婴可用）', token: 'cave', energy: 2, needRealm: 4 }, // v890 改回元婴限定
  xianfu_token: { name: '🏯仙府令', price: 1200, desc: '使用：开辟仙府1格，灵气+5（仙人可用）', token: 'xianfu', energy: 5, needRealm: 8 }
};
Object.assign(MATS, LU);
const STARTER_MATS = 0, STARTER_GOLD = 0; // 新手礼包：无（旧存档迁移时同样发放）
function grantStarter(S) { ATTRS.forEach(a => S.mats['h_' + a] = (S.mats['h_' + a] || 0) + STARTER_MATS); S.gold += STARTER_GOLD; }
// 冒险难度：mult 怪物强度倍率；win 胜利属性点；lose 战败扣点；gold 胜利金元；ms 怪物技能数
const DIFFS = { // cost 体力；mult 怪物强度（相对玩家）；rec/recTot 建议等级/总属性（低于此值怪物按 recTot 的强度生成）；win/gold/xp 胜利奖励；lose 败扣属性；xpL 败得经验；st 败后伤病概率；ms 怪物技能数
  easy:      { name: '初级', cost: 1,  mult: 0.76, rec: 1,  recTot: 5,   win: [1, 2],    gold: [10, 20],    xp: 10,  lose: 1,  xpL: 3,  st: 0.10, ms: 0, pre: '' },
  mid:       { name: '中级', cost: 3,  mult: 0.88, rec: 2,  recTot: 30,  win: [5, 6],    gold: [48, 60],    xp: 36,  lose: 2,  xpL: 5,  st: 0.20, ms: 1, pre: '精英·' },
  hard:      { name: '高级', cost: 5,  mult: 0.96, rec: 3,  recTot: 60,  win: [9, 12],   gold: [95, 115],   xp: 70,  lose: 3,  xpL: 8,  st: 0.30, ms: 2, pre: '首领·' },
  brutal:    { name: '困难', cost: 10, mult: 1.00, rec: 5,  recTot: 120, win: [22, 26],  gold: [220, 260],  xp: 160, lose: 6,  xpL: 12, st: 0.40, ms: 2, pre: '凶煞·' },
  hell:      { name: '地狱', cost: 15, mult: 1.04, rec: 7,  recTot: 200, win: [37, 44],  gold: [380, 430],  xp: 270, lose: 9,  xpL: 16, st: 0.50, ms: 3, pre: '炼狱·' },
  abyss:     { name: '深渊', cost: 20, mult: 1.08, rec: 9,  recTot: 300, win: [55, 65],  gold: [560, 640],  xp: 400, lose: 12, xpL: 20, st: 0.60, ms: 4, pre: '深渊·' },
  nightmare: { name: '噩梦', cost: 30, mult: 1.12, rec: 12, recTot: 450, win: [92, 108], gold: [930, 1050], xp: 660, lose: 18, xpL: 25, st: 0.70, ms: 5, pre: '梦魇·' },
  mijing:    { name: '秘境', cost: 10, mult: 1.15, rec: 5,  recTot: 150, win: [30, 36],   gold: [300, 360],   xp: 220, lose: 10, xpL: 15, st: 0.50, ms: 3, pre: '秘境·' },
  wx_jin:  { name: '金行', cost: 5, mult: 1.15, rec: 8, recTot: 500, win: [30, 36], gold: [300, 360], xp: 220, lose: 10, xpL: 15, st: 0.50, ms: 0, pre: '金·', wx: 'jin' },
  wx_mu:   { name: '木行', cost: 5, mult: 1.15, rec: 8, recTot: 500, win: [30, 36], gold: [300, 360], xp: 220, lose: 10, xpL: 15, st: 0.50, ms: 0, pre: '木·', wx: 'mu' },
  wx_shui: { name: '水行', cost: 5, mult: 1.15, rec: 8, recTot: 500, win: [30, 36], gold: [300, 360], xp: 220, lose: 10, xpL: 15, st: 0.50, ms: 0, pre: '水·', wx: 'shui' },
  wx_huo:  { name: '火行', cost: 5, mult: 1.15, rec: 8, recTot: 500, win: [30, 36], gold: [300, 360], xp: 220, lose: 10, xpL: 15, st: 0.50, ms: 0, pre: '火·', wx: 'huo' },
  wx_tu:   { name: '土行', cost: 5, mult: 1.15, rec: 8, recTot: 500, win: [30, 36], gold: [300, 360], xp: 220, lose: 10, xpL: 15, st: 0.50, ms: 0, pre: '土·', wx: 'tu' }
};
// ======== 仙术五行修炼 ========
const WUXING = [
  { k: 'jin',  name: '金', color: '#ffd700' },
  { k: 'mu',   name: '木', color: '#22c55e' },
  { k: 'shui', name: '水', color: '#3b9ddd' },
  { k: 'huo',  name: '火', color: '#ef4444' },
  { k: 'tu',   name: '土', color: '#a16207' }
];
const wxByK = k => WUXING.find(e => e.k === k);
const WX_COST_XIAN = 10, WX_COST_STA = 5; // 五行冒险：10仙力+5体力
const WX_DAILY = { 8: 1, 9: 2, 10: 3, 11: 4, 12: 5 }; // 仙人1/金仙2/合体3/尊者4/主宰5 次·每日
const WX_FRAG_DROP = 0.02; // 非王怪残物掉率
const wxDailyLeft = S => (WX_DAILY[S.realm | 0] || 0) - (S.wxD === todayStr() ? (S.wxN | 0) : 0);
const wxFragName = k => { const e = wxByK(k); return e ? `${e.name}残物` : k; };
const wxPowName = k => { const e = wxByK(k); return e ? `${e.name}之力` : k; };
const wxResName = k => { const e = wxByK(k); return e ? `${e.name}之抗` : k; };
function synthWx(S, k, kind) { // 10残物 → 1力/抗
  const e = wxByK(k); if (!e || (kind !== 'pow' && kind !== 'res')) return null;
  if (!((S.wxFrag[k] | 0) >= 10)) return null;
  S.wxFrag[k] -= 10;
  if (kind === 'pow') S.wxPow[k] = (S.wxPow[k] | 0) + 1; else S.wxRes[k] = (S.wxRes[k] | 0) + 1;
  return { name: kind === 'pow' ? wxPowName(k) : wxResName(k), color: e.color };
}
const MIJING_DAILY = 3; // 秘境每日进入次数上限
const monTotal = (pt, diff) => (K.MON_BASE + (pt - K.MON_BASE) * K.MON_SCALE) * diff.mult; // 怪物基准总属性（未加随机）
const MON_SKILLS = ['smash', 'fireball', 'shield', 'heal', 'vamp'];
// 权重顺序：敏捷 力量 防御 生命 智力
const MONSTERS = [
  { n: '山野饿狼', st: 'bleed', w: [3, 2, 1, 1.5, .3] }, { n: '赤眼野猪', st: 'bleed', w: [1, 2.5, 2, 2.5, .2] },
  { n: '青鳞蛇妖', st: 'poison', w: [3, 1.5, 1, 1, 1.5] }, { n: '石甲傀儡', w: [.5, 2, 3.5, 2.5, .2] },
  { n: '幽冥鬼火', w: [2, .8, .5, 1, 3.5] }, { n: '黑风山贼', w: [1.5, 2.5, 1.5, 1.5, .5] },
  { n: '千年树妖', w: [.5, 1.5, 2.5, 3, 1.5] }, { n: '血翼蝙蝠', st: 'bleed', w: [3.5, 1.5, .5, 1, .8] },
  { n: '骷髅剑士', w: [1.5, 2.5, 2, 1, .5] }, { n: '狐妖·媚儿', w: [2.5, 1, 1, 1.2, 3] },
  { n: '铁背苍熊', st: 'bleed', w: [.8, 3, 2, 3, .2] }, { n: '炼尸道人', st: 'poison', w: [1, 1.5, 1.5, 1.5, 3] },
  { n: '雷霆鹰隼', st: 'bleed', w: [3, 2, .8, 1, 1.5] }, { n: '寒潭水鬼', w: [1.5, 1.5, 1.5, 2, 2] }
];
const STYLES = [
  { n: '剑修', w: [2, 3, 1, 1.5, 1], prefer: 'str' }, { n: '体修', w: [1, 2, 2.5, 3, .5], prefer: 'vit' },
  { n: '法修', w: [1.2, 1, 1, 1.5, 3.2], prefer: 'int' }, { n: '游侠', w: [3.2, 2, 1, 1.2, 1], prefer: 'agi' },
  { n: '金刚', w: [.8, 1.5, 3.2, 2, .8], prefer: 'def' }, { n: '散修', w: [1, 1, 1, 1, 1], prefer: null }
];
const SURN = '李王张刘陈杨赵黄周吴徐孙胡朱高林何郭马罗梁宋郑谢韩唐冯于董萧程曹袁邓许傅沈曾彭吕苏卢蒋蔡贾丁魏薛叶阎余潘杜戴夏钟汪田任姜范方石姚谭廖邹熊金陆郝孔白崔康毛邱秦江史顾侯邵孟龙万段雷钱汤尹黎易常武乔贺赖龚文慕容上官欧阳司马独孤南宫'.match(/慕容|上官|欧阳|司马|独孤|南宫|./g);
const GIVEN = '逍遥 无忌 青云 长风 若雪 清霜 天行 惊鸿 子墨 寒烟 浩然 紫萱 星河 残阳 问天 凌霄 映雪 孤鸿 听澜 念慈 破军 沧海 飞羽 明月 夜白 灵犀 霜华 墨尘 云舒 不凡 一刀 秋水'.split(' ');

const C = { STARTER_MATS, STARTER_GOLD, K, ATTRS, AN, GRADES, SKILLS, MATS, ORES, PREY, FARM, LU, MEATS, EGGS, PETS, PET_TALENT, MEDS, STATUS, GATHER, DIFFS, MONSTERS, STYLES, rng: Math.random, now: () => Date.now() };
var R = () => C.rng(); window.R = R; // v234 改var；v265 显式挂window防iOS跨块访问失败
var _personCache = {}; window._personCache = _personCache; // 人名→信息卡缓存（聊天/PK/记录点击查看），放第一个script块供pkStart访问
const rnd = (a, b) => a + (b - a) * R();
const ri = (a, b) => Math.min(b, a + Math.floor(R() * (b - a + 1)));
const pick = arr => arr[Math.floor(R() * arr.length) % arr.length];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
function wpick(items, wf) { let t = 0; for (const it of items) t += wf(it); let x = R() * t; for (const it of items) { x -= wf(it); if (x < 0) return it; } return items[items.length - 1]; }
const total = a => ATTRS.reduce((s, k) => s + a[k], 0);
const pct = x => Math.round(x * 100) + '%';

function todayStr(d) { d = d || new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }

function bagCap(S) { return Math.min(160, 5 * Math.pow(2, S.rings || 0)); } // 装备包上限：默认5件，每枚储物戒指翻倍，上限160
function itemCap(S) { return (100 + 100 * (S.pouch || 0)) * Math.pow(2, S.rings || 0) * Math.pow(3, S.spaceS || 0) * Math.pow(4, S.spaceL || 0); } // 物品上限：默认100，小型储物袋每只+100，储物戒指每枚×2，储物空间(小)×3，储物空间(大)×4
function itemCount(S) { let n = 0; for (const k of ['mats','ores','prey','eggs','dishes','elixirs','meds','food']) { const o = S[k]; if (o) for (const k2 in o) n += Math.floor(o[k2] || 0); } for (const k of ['pages','expBooks','skillPages','skillBooks']) { const o = S[k]; if (o) for (const k2 in o) n += Math.floor(o[k2] || 0); } return n; }
function gainItem(S, cat, key, n) { n = Math.floor(+n || 0); if (n <= 0) return 0; const cap = itemCap(S), cur = itemCount(S); if (cur >= cap) return 0; const canAdd = Math.min(n, cap - cur); if (canAdd > 0) { S[cat][key] = (S[cat][key] || 0) + canAdd; } return canAdd; } // 超出上限部分直接消失
const RACES = { // v1088 九族 + 天赋（种族独立选择，不跟头像走；选定锁定，轮回可重选）
  human: { name: '人族', icon: '🧑', talent: '悟道', desc: '突破成功率 +5%' },
  yao: { name: '妖族', icon: '🦊', talent: '灵觉', desc: '灵宠孵化、抓宠成功率 +5%' },
  mo: { name: '魔族', icon: '👹', talent: '煞体', desc: '攻击 +3%，杀孽扣的功德减半' },
  shen: { name: '神族', icon: '✨', talent: '神血', desc: '突破压条结算 +100%' },
  ling: { name: '灵族', icon: '🌿', talent: '草木亲和', desc: '炼丹、采集成功率 +5%' },
  yi: { name: '异族', icon: '💪', talent: '强健', desc: '生命上限 +5%' },
  ming: { name: '冥族', icon: '🌑', talent: '阴体', desc: '渡劫失败、劳作的折寿减半' },
  mech: { name: '机械', icon: '⚙️', talent: '不知疲倦', desc: '体力恢复 +20%' },
  traveler: { name: '穿越者', icon: '🌠', talent: '见多识广', desc: '奇遇概率 +5%，商会买东西 −5%' },
};
G.RACES = RACES; // v1089 跨块导出：块1 种族页/人物卡/分发直接读 RACES（v1088 漏导出致种族页 ReferenceError）
function newState() {
  const attrs = {}; ATTRS.forEach(k => attrs[k] = K.START_ATTR);
  const S = { v: 7, gearQ5: true, lifespan: 100, chatLog: [], consign: [], consignMarket: [], battlePlan: ['attack','attack','attack','attack','attack'], hunger: 100, dead: null, protect: K.PROTECT_N, status: { bleed: false, poison: false, depress: 0, bleedBase: 0, poisonBase: 0, bleedFrac: 0, poisonFrac: 0 }, meds: {}, lastTick: 0, level: 1, xp: 0, realm: 0, reinc: new Array(13).fill(0), btTotal: 0, stamina: K.START_STAMINA, gold: 0, xianyu: 0, attrs, alc: { lv: 1, xp: 0 }, inv: {}, mats: {}, ores: {}, prey: {}, eggs: {}, petEggs: 0, maiPages: 0, maiVLuo: 0, maiRLuo: 0, maiVMai: 0, maiRMai: 0, maiShu: 0, maiShuXp: 0, maiMigV89: 1, shenzang: new Array(13).fill(0), shenzangDan: new Array(13).fill(0), danDu: 0, vigor: K.VIGOR_BASE, lifeChoices: [], life: { cook: { lv: 1, xp: 0 }, forge: { lv: 1, xp: 0 }, refine: { lv: 1, xp: 0 }, tame: { lv: 1, xp: 0 } }, dishes: {}, elixirs: {}, equip: { helm: null, neck: null, weapon: null, armor: null, boots: null }, gearBag: [], rings: 0, petBag: [], gearSeq: 0, buff: null, pages: {}, expBooks: {}, skillPages: {}, skillBooks: {}, pets: [], petSeq: 0, pet: null, food: {}, skills: [], lastCheckin: null,
    stats: { adv: 0, advWin: 0, pk: 0, pkWin: 0, brew: 0, brewOk: 0, checkins: 0 }, log: [], hpCur: null, curseN: 0,
    wxFrag: { jin: 0, mu: 0, shui: 0, huo: 0, tu: 0 }, wxPow: { jin: 0, mu: 0, shui: 0, huo: 0, tu: 0 }, wxRes: { jin: 0, mu: 0, shui: 0, huo: 0, tu: 0 }, wxPity: { jin: 0, mu: 0, shui: 0, huo: 0, tu: 0 }, wxD: '', wxN: 0, yinQi: 0, gender: null, avatar: 0, bindNum: null, race: null, _avatarPicked: false, _onboarded: false, _reincChain: false, _reincStep: null, xianyuan: {m:0,f:0}, binders: [], mail: [], sect: null, spouse: null,
    tools: { pick: null, hoe: null }, lingwu: [], lwseeds: { 1: 0, 2: 0, 3: 0 }, syd: [], zhenqi: { 1: 0, 2: 0, 3: 0 } }; // v131 性别/头像；v263 仙缘系统；v264 结婚；v1088 种族/建号链；v1128 器具/灵物/种子/阵棋
  S.mana = manaMax(S); grantStarter(S); return S;
}
function normalize(S) {
  S.vigor = Math.min(10, Math.max(0, S.vigor|0)); /* 活力上限固定10 */ // 兼容/修复存档
  const d = newState();
  const ver = +S.v || 1;
  if (!C.LIFE_SKILLS[S.lifeChoice]) S.lifeChoice = null; // v98 生活技能单选：旧存档强制重选
  if (!Array.isArray(S.lifeChoices)) S.lifeChoices = []; S.lifeChoices = S.lifeChoices.filter(k => C.LIFE_SKILLS[k]); // v98 多选数组
  if (!S.life) S.life = {}; S.lifeChoices.forEach(_k => { if (!S.life[_k]) S.life[_k] = { lv: 0, xp: 0 }; }); // v912 老存档补初始化
  if (S.realm === undefined || !(S.realm >= 0) || S.realm > 12) S.realm = 0; S.realm = Math.floor(S.realm); // v12 境界
  if (!Array.isArray(S.reinc)) S.reinc = new Array(13).fill(0); while (S.reinc.length < 13) S.reinc.push(0); S.reinc = S.reinc.map(n => Math.max(0, Math.floor(+n || 0)));
  if (!(S.btTotal >= 0)) S.btTotal = 0; S.btTotal = Math.floor(S.btTotal); // v12 突破成功累计
  if (!(S.yinQi >= 0)) S.yinQi = 0; S.yinQi = Math.floor(S.yinQi); // v116 引气入体
  if (S.gender !== 'm' && S.gender !== 'f') S.gender = null; // v131 性别
  if (S.race === undefined) S.race = null; // v1088 种族
  if (S._avatarPicked === undefined) S._avatarPicked = true; // v1088 老号默认已选头像
  if (S._onboarded === undefined) S._onboarded = !!((S.stats && S.stats.checkins) || (S.level|0) > 1 || (S.realm|0) > 0); // v1088 老号有进度即视为已完成建号
  if (S._reincChain === undefined) S._reincChain = false; // v1088 轮回重选链
  if (S._reincStep === undefined) S._reincStep = null;
  if (!(S.avatar >= 0) || S.avatar > 1999) S.avatar = 0; // v1092 头像库扩容后上限放宽 S.avatar = Math.floor(S.avatar); // v131 头像；v625 上限299
  if (S.avatarSet !== 'r' && S.avatarSet !== 'g' && S.avatarSet !== 's' && S.avatarSet !== 'a') S.avatarSet = 'r'; // v1015 头像套；v1092 加动漫套 a
  if (!(S.merit >= 0)) S.merit = 0; S.merit = Math.floor(S.merit); // v893 功德
  if (!(S.fame >= 0)) S.fame = 0; S.fame = Math.floor(S.fame); // v1015 声望
  if (S.meritCycle === undefined || S.meritCycle === null) S.meritCycle = -1; // v1015 大劫已结算周期
  if (!Array.isArray(S.redSeen)) S.redSeen = []; // v1015 已抢红包
  if (!S.redPackets || typeof S.redPackets !== 'object') S.redPackets = {};
  if (S.bindNum === null || S.bindNum === undefined) S.bindNum = 0; // v263 永久编号
  if (!S.xianyuan) S.xianyuan = {m:0,f:0}; // v263 仙缘
  // v1125 灵脉矿区删除迁移：只处理布在矿区(4,3)的旧采集阵——库存一次性转入背包（草药按新规转 5 种属性草，矿石按旧口径灵气石，灵脉/肉/蛋按旧口径），该阵拆除；田药园/养殖园的阵保留不动
  if (Array.isArray(S.arrays) && S.arrays.some(_a => _a && _a.x === 4 && _a.y === 3)) {
    const _hk5 = ['h_str', 'h_agi', 'h_def', 'h_vit', 'h_int'];
    const _keep = [];
    for (const _a of S.arrays) {
      if (!(_a && _a.x === 4 && _a.y === 3)) { _keep.push(_a); continue; }
      const _st = (_a && _a.storage) || {};
      if ((_st.h|0) > 0) { S.mats = S.mats || {}; for (let _i = 0; _i < (_st.h|0); _i++) { const _k = _hk5[Math.floor(Math.random() * 5)]; S.mats[_k] = (S.mats[_k]|0) + 1; } }
      if ((_st.o|0) > 0) { S.ores = S.ores || {}; S.ores.sp1 = (S.ores.sp1|0) + (_st.o|0); }
      if ((_st.v|0) > 0) { if (!Array.isArray(S.veins) || S.veins.length < 3) S.veins = [0, 0, 0]; const _vt = Math.min(2, Math.max(0, _st.vt|0)); S.veins[_vt] = (S.veins[_vt]|0) + (_st.v|0); }
      if ((_st.m|0) > 0) { S.food = S.food || {}; S.food.rabbit = (S.food.rabbit|0) + (_st.m|0); }
      if ((_st.e|0) > 0) { S.petEggs = (S.petEggs|0) + (_st.e|0); }
    }
    S.arrays = _keep;
  }
  // v1128 器具/灵物/灵物种子/阵棋/采集阵分档
  if (!S.tools || typeof S.tools !== 'object') S.tools = { pick: null, hoe: null };
  for (const _tk of ['pick', 'hoe']) {
    const _t = S.tools[_tk];
    if (!_t || typeof _t !== 'object' || !(_t.dur > 0)) { S.tools[_tk] = null; continue; }
    _t.tier = Math.max(0, Math.min(2, Math.floor(+_t.tier || 0)));
    _t.max = Math.max(1, Math.floor(+_t.max || 100));
    _t.dur = Math.max(0, Math.min(_t.max, Math.floor(+_t.dur || 0)));
    _t.lvl = Math.max(0, Math.floor(+_t.lvl || 0));
    _t.uses = Math.max(0, Math.floor(+_t.uses || 0));
    if (_t.dur <= 0) S.tools[_tk] = null;
  }
  if (!Array.isArray(S.lingwu)) S.lingwu = [];
  S.lingwu = S.lingwu.filter(_w => _w && _w.g >= 1 && _w.g <= 3 && _w.y >= 1).map(_w => ({ g: Math.floor(_w.g), y: Math.floor(_w.y), e: _w.e && (LW_ELES.indexOf(_w.e) >= 0 || ROOT_BASE[_w.e]) ? _w.e : rollLwEleL() })); // v1129 存量灵物随机补五行
  if (!S.lwseeds || typeof S.lwseeds !== 'object') S.lwseeds = {};
  { // v1130 种子不带五行：v1129 的 '<品级>_<五行>' 键合并回品级计数（总数不变）
    const _flat = { 1: 0, 2: 0, 3: 0 };
    for (const _k in S.lwseeds) { const _n = Math.max(0, Math.floor(+S.lwseeds[_k] || 0)); if (!_n) continue; const _m = /^([123])(_|$)/.exec(_k); if (_m) _flat[_m[1]] += _n; }
    S.lwseeds = _flat;
  }
  if (!Array.isArray(S.syd)) S.syd = []; // v1129 寿元丹 [{e, val}]
  S.syd = S.syd.filter(_p => _p && _p.val >= 1 && _p.e).map(_p => ({ e: String(_p.e), val: Math.floor(_p.val) }));
  if (!S.zhenqi || typeof S.zhenqi !== 'object') S.zhenqi = { 1: 0, 2: 0, 3: 0 };
  for (const _g of [1, 2, 3]) S.zhenqi[_g] = Math.max(0, Math.floor(+S.zhenqi[_g] || 0));
  if (!S.formations || typeof S.formations !== 'object') S.formations = {};
  S.formations.f_gather = Math.max(0, Math.floor(+S.formations.f_gather || 0));
  S.formations.f_gather2 = Math.max(0, Math.floor(+S.formations.f_gather2 || 0));
  S.formations.f_gather3 = Math.max(0, Math.floor(+S.formations.f_gather3 || 0));
  if (Array.isArray(S.arrays)) for (const _a of S.arrays) { if (_a && (!(_a.tier >= 1 && _a.tier <= 3))) _a.tier = 1; }
  if (!Array.isArray(S.binders)) S.binders = [];
  if (!Array.isArray(S.mail)) S.mail = [];
  if (S.spouse === undefined) S.spouse = null; // v264 配偶
  if (!(S.dazuoCd >= 0)) S.dazuoCd = 0; // v277 调息冷却
  if (S.status && S.status.curse) { S.curseN = (S.curseN|0) + 1; delete S.status.curse; } // 旧诅咒状态转为永久层数
    if (!Array.isArray(S.chatLog)) S.chatLog = []; // v13 聊天记录
  if (!Array.isArray(S.consign)) S.consign = []; if (!Array.isArray(S.consignMarket)) S.consignMarket = []; // v13 寄售
  if (!S.btMultMig && S.btTotal > 0) { // v13 突破倍率×2→渐进表：一次性压缩属性（旧2^N → 新连乘）
    let _old = Math.pow(2, S.btTotal), _new = 1;
    for (let _i = 0; _i < S.btTotal; _i++) _new *= (BT_MULT[_i % 12] || 1);
    const _ratio = _old > 0 ? _new / _old : 1;
    ATTRS.forEach(k => S.attrs[k] = Math.max(1, Math.round((+S.attrs[k] || 1) * _ratio)));
    S.btMultMig = 1;
  }
  if (!(S.savedXp >= 0)) S.savedXp = 0; S.savedXp = Math.floor(S.savedXp); // 凡人突破多余经验累计
  if (!(S.level >= 1)) S.level = 1; if (S.level > 10) S.level = 10; S.level = Math.floor(S.level); // 修 NaN
  if (!S.attrs) S.attrs = {}; ATTRS.forEach((k, idx) => { if (!(S.attrs[k] >= 1)) S.attrs[k] = 1; S.attrs[k] = Math.floor(S.attrs[k]); }); // 修 NaN 属性
  if (!(S.shenshi >= 1)) S.shenshi = 1; S.shenshi = Math.floor(S.shenshi); // v580
  if (!(S.shenshiPerm >= 0)) S.shenshiPerm = S.shenshi|0; // v941 永久神识 神识独立于五维
  if (!(S.qixi >= 0)) S.qixi = 0; // v928 气息
function flowerCount(S) { const s = S.shenshi|0; if (s >= 25600) return 9; if (s >= 12800) return 8; if (s >= 6400) return 7; if (s >= 3200) return 6; if (s >= 1600) return 5; if (s >= 800) return 4; if (s >= 400) return 3; if (s >= 200) return 2; if (s >= 100) return 1; return 0; } // v944 翻倍：100起至25600
function flowerBonus(S) { return (typeof flowerCount === 'function' ? flowerCount(S) : 0) * 0.03; } // v932
function effShenshi(S) { try { if (!S) return 0; var b = (S.ssBoostUntil|0) > Date.now() ? 2 : 1; return (S.shenshi|0) * b; } catch(e) { return 0; } } // v951 修catch
function qixiIcon(S) { try { var q = (S.qixi|0); if (q >= 20000) return '♾️'; if (q >= 5000) return '👣'; if (q >= 2000) return '🕶️'; if (q >= 1000) return '🩰'; if (q >= 300) return '👀'; return '🗣️'; } catch(e) { return '🗣️'; } } // v946 用户分段：0-300/300-1000/1000-2000/2000-5000/5000-10000/20000+
window.useShenshu = function() { try { if (!(S.skills||[]).includes('shenshu')) { log('bad', '未学会神术'); return; } if ((S.mp|0) < 10) { log('bad', '法力不足'); return; } S.mp -= 10; S.ssBoostUntil = Date.now() + 60000; const _nm = (S.name||'无名道友'); log('good', '👁️ ' + _nm + '使用了神识探查（同格者可见）'); commit(); render(); } catch(e) {} }; // v949 广播提示
function flowerIcons(S) { try { var fc = (typeof flowerCount === 'function' ? flowerCount(S) : 0); if (fc <= 0) return ''; var w = Math.floor(fc/3), p = fc%3; return '💮'.repeat(w) + '🌸'.repeat(p); } catch(e) { return ''; } } // v936 3粉变1白 每朵花+3%全属性（待定）
function claimFlowerSS(S) { // v940 三朵花加一次：每满3朵+300神识
  try {
    const fc = (typeof flowerCount === 'function' ? flowerCount(S) : 0);
    const sets = Math.floor(fc / 3); // 满3朵为一套
    const claimedSets = S.flowerSetsClaimed|0;
    if (sets > claimedSets) {
      const gain = (sets - claimedSets) * 300;
      S.shenshi = (S.shenshi|0) + gain;
      S.flowerSetsClaimed = sets;
      return gain;
    }
  } catch(_) {}
  return 0;
}
  if (!S.failNum) S.failNum = {}; // v589 各境界失败次数
  if (!Array.isArray(S.skills)) S.skills = ver < 2 ? OLD_SKILLS.slice() : []; // v1 存档保留原有 4 个技能
  if (!(S.hpCur >= 0)) S.hpCur = null; // v14 战斗掉血持久化，null=满血
  if (!S.skillsRevoked && Array.isArray(S.skills) && S.skills.length === 4 && OLD_SKILLS.every(k => S.skills.includes(k))) { S.skills = []; S.skillsRevoked = true; } // 收回误发的4个基础技能
  S.skills = S.skills.filter(k => SKILLS[k]);
  S.gold = Math.max(0, Math.floor(+S.gold || 0));
  S.xianyu = Math.max(0, Math.floor(+S.xianyu || 0)); // v94 仙玉
  const cleanBag = (key, ref) => { if (!S[key] || typeof S[key] !== 'object' || Array.isArray(S[key])) S[key] = {}; for (const k in S[key]) if (!ref[k] || !(S[key][k] > 0)) delete S[key][k]; else S[key][k] = Math.floor(S[key][k]); };
  S.vigor = Math.max(0, Math.floor(S.vigor === undefined ? K.VIGOR_BASE : +S.vigor || 0));
  if (!(S.consecDays >= 0)) S.consecDays = 0; // 连续签到天数 /* 生活技能：活力 / 等级 / 菜肴 / 装备 / 增益 */
  if (!(S.lifespan > 0)) S.lifespan = REALM_LIFESPAN[Math.min(12, Math.max(0, S.realm|0))] || 100;
  if (typeof S.danDu !== 'number' || !(S.danDu >= 0)) S.danDu = 0; S.danDu = Math.min(danDuCap(S), S.danDu | 0); // v998 danDu；v1140 上限随百毒不侵佩戴
  if (!S.life || typeof S.life !== 'object') S.life = {}; for (const k of ['cook', 'forge', 'refine', 'tame']) { const L = S.life[k] || {}; S.life[k] = { lv: Math.max(1, Math.floor(+L.lv || 1)), xp: Math.max(0, Math.floor(+L.xp || 0)) }; }
  if (!S.dishes || typeof S.dishes !== 'object') S.dishes = {}; for (const k in S.dishes) if (!dishOf(k) || !(S.dishes[k] > 0)) delete S.dishes[k]; else S.dishes[k] = Math.floor(S.dishes[k]);
  if (!S.zx || typeof S.zx !== 'object' || Array.isArray(S.zx)) S.zx = {}; for (const k in S.zx) if (!(DISHES[k] && DISHES[k].zx) || !(S.zx[k] > 0)) delete S.zx[k]; else S.zx[k] = Math.floor(S.zx[k]); /* v9 珍馐 */
  for (const _wk of ['wxFrag', 'wxPow', 'wxRes']) { if (!S[_wk] || typeof S[_wk] !== 'object') S[_wk] = {}; for (const e of WUXING) { S[_wk][e.k] = Math.max(0, Math.floor(+S[_wk][e.k] || 0)); } } /* v80 五行 */
  if (!S.wxPity || typeof S.wxPity !== 'object') S.wxPity = {}; for (const e of WUXING) { S.wxPity[e.k] = Math.max(0, Math.min(1, +S.wxPity[e.k] || 0)); } /* v86 保底：小数概率 */
  if (!(S.wxN >= 0)) S.wxN = 0; S.wxN = Math.floor(S.wxN); if (typeof S.wxD !== 'string') S.wxD = '';
  const oldQ = !S.gearQ5; const okGear = g => g && (OLD_GEAR[g.k] ? (g.k = OLD_GEAR[g.k]) : true) && GEAR[g.k] && (!oldQ || (g.q = [0, 1, 3, 4][g.q] || 0)) && g.q >= 1 && g.q <= 5 && (g.v = gearVal(g.k, g.q)) && g.v > 0 && (GEAR_SETS[g.set] || (g.set = pick(Object.keys(GEAR_SETS)))); /* 旧装备随机补套装 */
  S.gearBag = Array.isArray(S.gearBag) ? S.gearBag.filter(okGear) : []; if (typeof S.rings !== 'number') S.rings = 0; if (!S.equip || typeof S.equip !== 'object') S.equip = {};
  const okPetGear = g => g && PET_GEAR[g.k] && g.q >= 1 && g.q <= 5 && (g.v = gearVal(g.k, g.q)) && g.v > 0 && (GEAR_SETS[g.set] || (g.set = pick(Object.keys(GEAR_SETS)))) && (g.pet = true);
  S.petBag = Array.isArray(S.petBag) ? S.petBag.filter(okPetGear) : [];
  for (const p of (Array.isArray(S.pets) ? S.pets : [])) { if (!p.peq || typeof p.peq !== 'object') p.peq = {}; for (const sl in SLOTS) if (p.peq[sl] && (!okPetGear(p.peq[sl]) || PET_GEAR[p.peq[sl].k].slot !== sl)) delete p.peq[sl]; }
  for (const sl in SLOTS) if (!okGear(S.equip[sl]) || GEAR[S.equip[sl].k].slot !== sl) S.equip[sl] = null;
  if (!S.elixirs || typeof S.elixirs !== 'object') S.elixirs = {}; for (const k in S.elixirs) if (!potOf(k) || !(S.elixirs[k] > 0)) delete S.elixirs[k]; else S.elixirs[k] = Math.floor(S.elixirs[k]);
  bumpPeak(S); if ((S.realm|0) >= 8 && !(S.xianCap > 0)) S.xianCap = Math.max(1, Math.floor(S.mana || 0)); S.mana = S.mana === undefined ? manaMax(S) : Math.max(0, Math.min(manaCapEff(S), Math.floor(+S.mana || 0))); /* 法力按2倍存储上限截断；仙人旧存档仙力上限=当前值 */
  if (S.run && !(DIFFS[S.run.dk] && S.run.rew && (S.run.grid ? S.run.grid.tiles : (S.run.ev && (S.run.ev.type === 'fight' ? S.run.ev.mon : ADV_EVENTS[S.run.ev.id]))))) { S.run = null; S.advVit = 0; } /* 进行中的冒险（v182 格子） */
  S.gearQ5 = true; /* 旧 3 档品质 普通/精良/极品 → 5 档 普通/精良/史诗 */
  S.gearSeq = Math.max(Math.floor(+S.gearSeq || 0), ...S.gearBag.map(g => g.id), ...Object.values(S.equip).filter(Boolean).map(g => g.id), ...S.petBag.map(g => g.id), ...(Array.isArray(S.pets) ? S.pets : []).flatMap(p => Object.values(p.peq || {}).map(g => g.id)), 0);
  if (!S.buff || !(S.buff.left > 0) || !(S.buff.k === 'luck' || AN[S.buff.k])) S.buff = null;
  cleanBag('pages', PAGES); cleanBag('expBooks', EXP_BOOKS); cleanBag('skillPages', SKILLS); cleanBag('skillBooks', SKILLS); /* 看书：残页 / 经验书 / 技能残页 / 技能书 */
  if (!S.food || typeof S.food !== 'object') S.food = {};
  for (const k in S.food) if (!MEATS[k] || !(S.food[k] > 0)) delete S.food[k]; else S.food[k] = Math.floor(S.food[k]);
  const oldMeat = Math.floor(+S.meat || 0); if (oldMeat > 0) S.food.rabbit = (S.food.rabbit || 0) + oldMeat; // 旧版通用"肉"迁移为兔肉
  delete S.meat;
  if (!S.mats || typeof S.mats !== 'object') S.mats = {};
  if (!S.ores || typeof S.ores !== 'object') S.ores = {};
  const addTo = (o, k, n) => { n = Math.floor(+n || 0); if (n > 0) o[k] = (o[k] || 0) + n; };
  addTo(S.ores, 'sp2', S.ores.spirit); delete S.ores.spirit;           // 最早的通用灵石 → 中品 → 二品
  if (ver < 4) { const old4 = S.ores.sp4; delete S.ores.sp4; addTo(S.ores, 'sp5', old4); } // 旧四档：下/中/上/极品 → 一/二/三/五品
  addTo(S.mats, 'dw1', S.mats.dew); addTo(S.mats, 'dw1', S.mats.ess); delete S.mats.dew; delete S.mats.ess; // 旧凝露、聚灵精华 → 一品凝露
  if (!S.dew3mig) { // v1128 凝露五品 → 凝露三品存量合并：一品+二品→下品、三品→中品、四品+五品→上品
    const _d1 = (S.mats.dw1|0) + (S.mats.dw2|0), _d2 = (S.mats.dw3|0), _d3 = (S.mats.dw4|0) + (S.mats.dw5|0);
    delete S.mats.dw1; delete S.mats.dw2; delete S.mats.dw3; delete S.mats.dw4; delete S.mats.dw5;
    if (_d1 > 0) S.mats.dw1 = _d1; if (_d2 > 0) S.mats.dw2 = _d2; if (_d3 > 0) S.mats.dw3 = _d3;
    S.dew3mig = 1;
  }
  for (const k in S.mats) if (!MATS[k] || !(S.mats[k] > 0)) delete S.mats[k];
  for (const g of Object.values(GATHER)) {
    if (!S[g.store] || typeof S[g.store] !== 'object') S[g.store] = {};
    for (const k in S[g.store]) if (!g.items[k] || !(S[g.store][k] > 0)) delete S[g.store][k];
  }
  if (ver < 3) grantStarter(S); // 旧存档：金元从 0 起 + 新手礼包
  S.petEggs = Math.max(0, Math.floor(+S.petEggs || 0)); // v5：灵宠蛋 / 灵宠；v6：每只灵宠有独立属性
  S.petSeq = Math.max(0, Math.floor(+S.petSeq || 0));
  if (S.pets && typeof S.pets === 'object' && !Array.isArray(S.pets)) { // v5 {种类: 数量} → 逐只随机属性
    const old = S.pets, oldAct = S.pet; S.pets = []; S.pet = null;
    for (const k of Object.keys(PETS)) for (let i = 0; i < Math.min(50, Math.floor(+old[k] || 0)); i++) { const pt = rollPet(S, k); S.pets.push(pt); if (k === oldAct && !S.pet) S.pet = pt.id; }
  }
  if (!Array.isArray(S.pets)) S.pets = [];
  S.bc = []; // 旧通告队列不保留
  S.pets.forEach(p => { if (p && p.k === 'bird') p.k = 'zhuque'; if (p && p.k === 'qilin') p.k = 'qinglong'; }); // 旧宠改名：赤焰雀→朱雀，雷麟→青龙
  S.pets = S.pets.filter(p => p && PETS[p.k] && p.attrs);
  S.pets.forEach(p => { ATTRS.forEach(a => p.attrs[a] = Math.max(1, Math.floor(+p.attrs[a] || 1))); p.q = (p.q >= 0 && p.q < PQLT.length) ? Math.floor(p.q) : 0; p.skills = Array.isArray(p.skills) ? p.skills.filter(sk => GEAR_SETS[sk]) : []; p.lv = Math.max(1, Math.floor(+p.lv || 1)); p.xp = Math.max(0, Math.floor(+p.xp || 0)); p.pts = Math.max(0, Math.floor(+p.pts || 0)); p.hunger = typeof p.hunger === 'number' && isFinite(p.hunger) ? clamp(p.hunger, 0, 100) : 100; p.loyal = typeof p.loyal === 'number' && isFinite(p.loyal) ? clamp(Math.round(p.loyal), 0, 100) : K.PET_LOYAL_START; p.life = typeof p.life === 'number' && isFinite(p.life) ? clamp(Math.floor(p.life), 1, K.PET_LIFE_MAX) : K.PET_LIFE_MAX; /* v9 寿命：老宠补满 */ p.talent = !!p.talent; /* v10 天赋神通：老宠默认未领悟 */ if (!p.peq || typeof p.peq !== 'object') p.peq = {}; for (const sl in SLOTS) if (p.peq[sl] && (!okPetGear(p.peq[sl]) || PET_GEAR[p.peq[sl].k].slot !== sl)) delete p.peq[sl]; if (!(p.id > 0)) p.id = ++S.petSeq; S.petSeq = Math.max(S.petSeq, p.id); });
  if (!Array.isArray(S.pet)) S.pet = S.pet != null ? [S.pet] : []; S.pet = S.pet.filter(id => S.pets.some(p => p.id === id)).slice(0, 4); if (!S.pet.length && S.pets.length) S.pet = [S.pets[0].id];
  S.hunger = typeof S.hunger === 'number' && isFinite(S.hunger) ? clamp(S.hunger, 0, 100) : 100; // v7：饥饿 / 状态 / 疗伤药
  const st0 = S.status && typeof S.status === 'object' ? S.status : {}, nn = x => Math.max(0, +x || 0);
  S.status = { bleed: !!st0.bleed, poison: st0.poison === true || (typeof st0.poison === 'number' && st0.poison > C.now()), depress: nn(st0.depress), bleedBase: nn(st0.bleedBase), poisonBase: nn(st0.poisonBase), bleedFrac: nn(st0.bleedFrac) % 1, poisonFrac: nn(st0.poisonFrac) % 1 };
  if (S.status.bleed && !S.status.bleedBase) S.status.bleedBase = Math.floor(+S.attrs.vit || 1);   // 旧存档：以当前生命为上限
  if (S.status.poison && !S.status.poisonBase) S.status.poisonBase = Math.floor(+S.attrs.vit || 1);
  if (!S.meds || typeof S.meds !== 'object') S.meds = {}; for (const k in S.meds) if (!MEDS[k] || !(S.meds[k] > 0)) delete S.meds[k]; else S.meds[k] = Math.floor(S.meds[k]);
  if (!(S.lastTick > 0)) S.lastTick = C.now();
  S.protect = Math.max(0, Math.floor(+S.protect || 0)); // v8 新人保护：老存档不补发
  if (!S.maiMigV89) { // v89 脉络改四分：虚络/实络/虚脉/实脉；旧临时脉络→虚络，旧永久→实络
    const _perm = Math.max(0, Math.floor(+S.maiPerm || 0)), _tot = Math.max(0, Math.floor(+S.meridians || 0));
    S.maiVLuo = Math.max(0, _tot - _perm); S.maiRLuo = _perm; S.maiVMai = 0; S.maiRMai = 0; S.maiShu = 0; S.maiShuXp = 0;
    delete S.meridians; delete S.maiPerm; S.maiMigV89 = 1;
  }
  S.maiVLuo = Math.max(0, Math.floor(+S.maiVLuo || 0)); S.maiRLuo = Math.max(0, Math.floor(+S.maiRLuo || 0));
  S.maiVMai = Math.max(0, Math.floor(+S.maiVMai || 0)); S.maiRMai = Math.max(0, Math.floor(+S.maiRMai || 0));
  if (!Array.isArray(S.shenzang) || S.shenzang.length !== 13) { // v993 神藏迁移：按旧星图亮数折算各座进度
    const _sz = new Array(13).fill(0); let _pool = Math.max(0, Math.min(361, Math.round(((S.realm|0) * 10 + ((S.level|0) - 1)) * 361 / 129)));
    const _cnt = [9, 9, 11, 14, 19, 20, 21, 23, 27, 44, 45, 67, 52];
    for (let _i = 0; _i < 13 && _pool > 0; _i++) { const _take = Math.min(_cnt[_i], _pool); _sz[_i] = Math.round(_take / _cnt[_i] * 10); _pool -= _take; }
    S.shenzang = _sz;
  }
  S.shenzang = S.shenzang.map(x => Math.max(0, Math.min(10, Math.floor(+x || 0))));
  if (typeof szSyncMai === 'function') szSyncMai(S);
  S.maiShu = S.maiShu ? 1 : 0; S.maiShuXp = Math.max(0, Math.floor(+S.maiShuXp || 0));
  if (!Array.isArray(S.battlePlan) || S.battlePlan.length !== 5) S.battlePlan = ['attack','attack','attack','attack','attack'];
  if (!S.beastPills || typeof S.beastPills !== 'object' || Array.isArray(S.beastPills)) S.beastPills = {}; for (const k in S.beastPills) if (!/^bp[123]$/.test(k) || !(S.beastPills[k] > 0)) delete S.beastPills[k]; else S.beastPills[k] = Math.floor(S.beastPills[k]); /* v11 灵兽丹 */
  S.v = 11; // v11 灵兽丹
  for (const k in d) if (S[k] === undefined) S[k] = d[k];
  ATTRS.forEach(k => { S.attrs[k] = Math.max(K.ATTR_MIN, Math.floor(+S.attrs[k] || K.OLD_START_ATTR)); });
  if (S.dead && typeof S.dead === 'object') { S.dead.lost = Array.isArray(S.dead.lost) ? S.dead.lost : S.dead.lost ? [S.dead.lost] : []; S.dead.base = Math.max(1, Math.floor(+S.dead.base || K.START_ATTR)); S.attrs.vit = 0; S.stamina = 0; } else S.dead = null; // 死亡中：生命 0、体力 0
  S.stats = Object.assign(d.stats, S.stats);
  return S;
}
const xpNeed = lv => Math.round(K.XP_PER_LEVEL * Math.pow(lv, K.XP_EXP)); // 升级所需经验 = 50 × 等级^XP_EXP
const alcNeed = lv => lv * K.ALC_XP_PER_LEVEL;
// 境界：凡人→练气→筑基→金丹→元婴→化神→大乘→渡劫→仙人→金仙→合体→尊者→主宰；每境10级，10级为大圆满，需突破/轮回
const REALMS = ['凡人','练气','筑基','金丹','元婴','化神','大乘','渡劫','仙人','金仙','合体','尊者','主宰'];
const FAIL_STATES = { 0: ['凡胎','燃尽'], 1: ['虚气','伪气'], 2: ['虚基','残基'], 3: ['虚丹','假丹'], 4: ['虚婴','假婴'], 5: ['虚神','散神'], 6: ['伪乘','残乘'], 7: ['怯劫','避劫'], 8: ['劫余','残仙'], 9: ['散仙','游仙'], 10: ['虚合','假合'], 11: ['伪尊','空尊'] }; // v589 突破失败状态
const DEGRADE_CHAIN = ['凡胎','虚气','虚基','虚丹','虚婴','虚神','伪乘','怯劫','劫余','散仙','虚合','伪尊']; 
const DEGRADE_FAIL2 = {'凡胎':'燃尽','虚气':'伪气','虚基':'残基','虚丹':'假丹','虚婴':'假婴','虚神':'散神','伪乘':'残乘','怯劫':'避劫','劫余':'残仙','散仙':'游仙','虚合':'假合','伪尊':'空尊'}; // v592

const REALM_LIFESPAN = [100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600, 51200, 102400, 204800, 409600];
const BT_MULT = [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1]; // 突破倍率（按突破前境界）：凡人→练气×1无加成，之后每境+0.1
const CHAT_NAMES = ['清风道人','剑心','丹霞子','墨白','紫烟仙子','铁牛','凌波','玄机子','白眉老祖','小青','狂刀','妙音','石破天','云游僧','赤焰','寒月','老顽童','青衫客','丹青','夜雨'];
const CHAT_MSGS = ['有人组队刷噩梦吗？','刚突破到金丹，哈哈！','求问筑基突破有啥技巧','收中品灵石，价格好商量','今天运气不错，挖到两块灵石','卡在渡劫大圆满一个月了，哭','萌新求带，有大佬吗','刚孵出青龙，开心！','这游戏真上头，不知不觉玩了一年','有人出极品丹药吗','冒险遇到王阶怪，被秒了……','分享个技巧：饱食80以上再修炼','准备轮回了，紧张','道友们早啊','今晚通宵冲境界','灵宠反咬我一口，心态崩了','锻造出传说了！截图留念','PK连赢三场，舒服','中毒了，求解毒丹','大佬们仙人境都怎么玩的'];
function chatPush(S, name, text, sys, announce) { if (!Array.isArray(S.chatLog)) S.chatLog = []; S.chatLog.push({ n: name, t: String(text).slice(0, 100), sys: !!sys, announce: !!announce, time: Date.now() }); if (S.chatLog.length > 50) S.chatLog = S.chatLog.slice(-50); try { if (window._chatTab === 'world' && document.getElementById('chatFloat') && document.getElementById('chatFloat').classList.contains('on') && typeof window.renderChatFloat === 'function') { const _inp = document.getElementById('cfInput'); const _v = _inp ? _inp.value : ''; const _f = document.activeElement === _inp; window.renderChatFloat(); const _ni = document.getElementById('cfInput'); if (_ni && _f) { _ni.value = _v; _ni.focus(); } } } catch(_) {} return true; } // v445 悬浮聊天窗新消息自动刷新（保留输入框焦点）
function chatNpc(S) { /* v1000 NPC 假消息已停用（Ye 令：世界频道只接真人消息） */ }
function getChatPerson(S, name) {
  if (window._personCache[name]) return window._personCache[name];
  const _r = Math.random;
  const _ri = (a, b) => Math.min(b, a + Math.floor(_r() * (b - a + 1)));
  const _rnd = (a, b) => a + (b - a) * _r();
  const realm = Math.max(0, Math.min(12, (S.realm|0) + _ri(-1, 1)));
  const level = _ri(1, 10);
  const base = Math.max(5, (realm + 1) * level * 3);
  const attrs = {}; ATTRS.forEach(k => attrs[k] = Math.max(1, Math.round(base * _rnd(0.15, 0.25))));
  const e = { name, realm, level, attrs, lifespan: REALM_LIFESPAN[Math.min(12, realm)] || 100, meridians: _ri(0, 5) };
  window._personCache[name] = e; return e;
}
window.getChatPerson = getChatPerson;
function npcAvatar(name) {
  try {
    const pool = AVATARS ? AVATARS.m.concat(AVATARS.f) : [];
    if (!pool.length) return '';
    let h = 0; const nm = name || 'x';
    for (let i = 0; i < nm.length; i++) h = (h * 31 + nm.charCodeAt(i)) | 0;
    return pool[Math.abs(h) % pool.length];
  } catch (_) { return ''; }
}
window.npcAvatar = npcAvatar;
const CONSIGN_FEE = 0.05; // 寄售手续费5%
function consignPrice(kind, key) { if (kind === 'xianyu') return 5000; if (kind === 'petegg') return 500; if (kind === 'inv') { if (key === 'detox') return 60; if (key.indexOf('mut_') === 0) { const md = MUT_PILLS[key.slice(4)]; return md && md.jue ? 2000 : 500; } const pm = key.match(/^(str|agi|def|vit|int)_([1-5])$/); if (pm) return [0, 20, 40, 80, 160, 320][+pm[2]]; } const it = kind === 'ore' ? ORES[key] : kind === 'mat' ? (MATS[key] || LU[key]) : kind === 'med' ? MEDS[key] : POTIONS[key]; return (it && it.price) || 10; }
function consignName(kind, key) { if (kind === 'xianyu') return '仙玉'; if (kind === 'petegg') return '灵宠蛋'; if (kind === 'inv' && key === 'sha') return '👹 煞气'; if (kind === 'inv' && key === 'mai') return '🌀 开脉丹';
  if (kind === 'inv' && key === 'detox') return '🍃 化无丹'; // v999
  if (kind === 'inv' && key.indexOf('mut_') === 0) { const md = MUT_PILLS[key.slice(4)]; if (md) return '🌀 ' + md.name; }
  if (kind === 'inv') { const pm = key.match(/^(str|agi|def|vit|int)_([1-5])$/); if (pm) return GRADES[pm[2]] + AN[pm[1]] + '丹'; } const it = kind === 'ore' ? ORES[key] : kind === 'mat' ? (MATS[key] || LU[key]) : kind === 'med' ? MEDS[key] : kind === 'egg' ? (typeof EGGS !== 'undefined' ? EGGS[key] : null) : POTIONS[key]; return (it && it.name) || key; }
function consignStore(S, kind) { if (kind === 'xianyu') return { get xianyu() { return S.xianyu || 0; }, set xianyu(v) { S.xianyu = Math.max(0, Math.floor(v)); } }; if (kind === 'petegg') return { get petEgg() { return S.petEggs || 0; }, set petEgg(v) { S.petEggs = Math.max(0, Math.floor(v)); } }; if (kind === 'inv') { if (!S.inv) S.inv = {}; return S.inv; } if (kind === 'egg') { if (!S.eggs) S.eggs = {}; return S.eggs; } return kind === 'ore' ? S.ores : kind === 'mat' ? S.mats : kind === 'med' ? S.meds : S.elixirs; }
// v960 寄售行转线上：本地 consignList/consignCancel 已删除，上架/下架走 /api/market/*
// v960 寄售行转线上：NPC 购买（consignTick）已删除
// v960 寄售行转线上：NPC 市场生成（genMarket）已删除
// v960 寄售行转线上：本地购买（consignBuy）已删除，购买走 /api/market/buy
function chatSend(S, text) { text = String(text || '').trim().slice(0, 100); if (!text) return { err: 'empty' }; chatPush(S, '我', text, false); return { ok: true }; } // 玩家发言，35%概率有人接话
const REALM_MAX_LV = 10, REINC_CAP = 10; // 每境轮回加成上限10次
const reincBonus = S => (S.reinc || []).reduce((a, n, i) => a + (i === 0 ? 0 : Math.min(REINC_CAP, Math.max(0, +n || 0))), 0); // 轮回加成：练气起各境min(10,次数)累加；凡人轮回不计；立即生效
const realmTxt = S => { if (S.degraded) return S.degraded; const _ri = S.realm|0; let rn = _ri === 0 ? '引气' : REALMS[_ri]; if (_ri === 3 && S.danGrade) rn = S.danGrade; else if (_ri === 4 && S.yingGrade) rn = S.yingGrade; else if (S.realmGrades && S.realmGrades[_ri]) rn = S.realmGrades[_ri]; if (S.level >= REALM_MAX_LV) return rn + '·大圆满'; return rn + (S.level <= 3 ? '初期' : S.level <= 6 ? '中期' : '后期'); }; // v566 凡人叫引气期；1-3初期/4-6中期/7-9后期；v589 降级显示降级名；v730 金丹/元婴显示品质；v856 所有境界显示品级
const MANA_COST_LQ = [0, 100, 200, 300, 500, 600, 700, 900, 1100, 1500]; // 练气1-9级升级法力费
const MANA_COST_ZJ = [0, 3000, 3300, 3600, 3900, 4500, 4800, 5100, 5500, 6000]; // 筑基1-9级升级法力费
const MANA_COST_JD = [0, 7350, 8090, 9510, 10500, 11600, 13600, 15000, 16500, 19400]; // 金丹1-9级升级法力费
const MANA_COST_YY = [0, 25000, 27500, 30500, 33500, 37000, 41000, 45000, 49500, 54500]; // 元婴
const MANA_COST_HS = [0, 70000, 77000, 85000, 93500, 103000, 113000, 124000, 137000, 150000]; // 化神
const MANA_COST_DC = [0, 195000, 215000, 236000, 260000, 286000, 315000, 346000, 381000, 419000]; // 大乘
const MANA_COST_DJ = [0, 545000, 600000, 660000, 726000, 799000, 879000, 967000, 1064000, 1170000]; // 渡劫
const MANA_COST_XR = [0, 1520000, 1672000, 1840000, 2024000, 2226000, 2449000, 2694000, 2963000, 3260000]; // 仙人
const MANA_COST_JX = [0, 4240000, 4664000, 5130000, 5643000, 6208000, 6829000, 7511000, 8263000, 9089000]; // 金仙
const MANA_COST_HT = [0, 11816000, 13000000, 14300000, 15730000, 17300000, 19030000, 20930000, 23030000, 25330000]; // 合体
const MANA_COST_ZZ = [0, 32930000, 36220000, 39840000, 43830000, 48210000, 53030000, 58330000, 64170000, 70580000]; // 尊者
const MANA_COST_ZZ2 = [0, 91750000, 100930000, 111020000, 122120000, 134330000, 147770000, 162540000, 178800000, 196680000]; // 主宰
const MANA_COST_TABLES = { 1: MANA_COST_LQ, 2: MANA_COST_ZJ, 3: MANA_COST_JD, 4: MANA_COST_YY, 5: MANA_COST_HS, 6: MANA_COST_DC, 7: MANA_COST_DJ, 8: MANA_COST_XR, 9: MANA_COST_JX, 10: MANA_COST_HT, 11: MANA_COST_ZZ, 12: MANA_COST_ZZ2 };
const XIAN_NEED = { 8: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18], 9: [0, 36, 44, 52, 63, 75, 90, 108, 129, 155], 10: [0, 171, 180, 189, 198, 208, 219, 230, 241, 253], 11: [0, 279, 285, 291, 297, 302, 309, 315, 321, 327], 12: [0, 360, 368, 375, 383, 390, 398, 406, 414, 422] }; // v1122 Ye 定仙力升级表：仙人 2 起 +2/级；金仙 36 起 ×1.2；合体 171 起 ×1.05；尊者 279 起 ×1.02；主宰 360 起 ×1.02；衔接：合体 155×1.1、尊者 253×1.1、主宰 327×1.1，取整进位
const manaNeed = (S, lv) => { if ((S.realm|0) >= 8) { const t = XIAN_NEED[S.realm|0]; return Math.max(1, t ? (t[lv] || 0) : 0); } const t = MANA_COST_TABLES[S.realm|0]; const v = t ? (t[lv] || 0) : xpNeed(lv); return v; }; // 练气以上用法力表，凡人用经验表；仙人以上用 Ye 定仙力表（旧 100 万:1 已废）
function canLevelUp(S) { if (S.dead || S.level >= REALM_MAX_LV) return false; if (C.isPermanentlyDegraded(S) && S.level >= 9) return false; return C.useFali(S) ? S.mana >= manaNeed(S, S.level) : S.xp >= xpNeed(S.level); } // v590 第二次失败才卡9级
function doManualLevelUp(S) {
  if (S.dead) return { err: 'dead' };
  if (S.level >= REALM_MAX_LV) return { err: 'max' };
  let fullMana = false;
  if (C.useFali(S)) {
    const cost = manaNeed(S, S.level);
    if (S.mana < cost) return { err: 'mana' };
    fullMana = S.mana >= manaMax(S); // 扣费前是否满法力
    S.mana -= cost;
  } else {
    if (S.xp < xpNeed(S.level)) return { err: 'xp' };
    S.xp -= xpNeed(S.level);
  }
  const ups = levelUp(S, 1);
  if (ups > 0) bumpPeak(S); // 升级生命恢复满状态
  if (fullMana && ups > 0) { if ((S.realm|0) >= 8) S.xianCap = Math.max(1, Math.floor(S.xianCap * 1.1)); S.mana = Math.min(manaCapEff(S), Math.floor(S.mana * 1.1)); return { ok: true, ups, manaBoost: true }; } // 满法力/仙力升级：当前×1.1，仙人以上上限也×1.1
  return { ok: true, ups };
}
function levelUp(S, n) { S.level = S.level|0; n = Math.min(n|0, REALM_MAX_LV - S.level); if (!(n > 0)) return 0; const g = n * ((S.realm|0) + 1 + reincBonus(S)); S.level += n; ATTRS.forEach(k => S.attrs[k] = (S.attrs[k]|0) + g); S.shenshi = (S.shenshi|0) + n; S.qixi = (S.qixi|0) + n * 2;  try { if (typeof claimFlowerSS === 'function') { const _g = claimFlowerSS(S); if (_g > 0) { try { log('good', `🌸 花开加神识+${_g}`); } catch(_){} } } } catch(_){} return n; } // v944 轮回清零，无永久累积 神识+1/级，气息+2/级 神识+2/级，轮回清零，与气息对称 // 每升1级：全属性 +(境界+1+轮回加成)：凡人1、练气2、筑基3…；v932 神识+5/级不清零（花可跨世累积）；v928 气息+2/级，轮回清零
function gainXp(S, n) { if (C.useFali(S)) { S.mana = Math.min(C.manaCapEff(S), S.mana + n); } else { S.xp += n; } return 0; } // 练气后经验转法力；只积累，不自动升级
const breakthroughRate = S => { let r = Math.min(0.95, (0.60 - 0.05 * (S.realm|0)) * luck(S) + 0.01 * Math.min(20, S.btTotal || 0) - K.CURSE_BT * (S.curseN|0)); if ((S.realm|0) === 11) r = Math.min(0.95, r + faZeBtBonus(S)); if ((S.realm|0) >= 6 && (S.merit|0) >= 100) r = Math.min(0.95, r + 0.05); r = Math.min(0.95, Math.max(0.01, r * (1 + fateMod(S, 'break')))); if (S.tabooAwake) r = Math.min(0.95, r + 0.05); if (S.race === 'human') r = Math.min(0.95, r + 0.05); return r; }; // v1013 禁忌苏醒；v1088 人族悟道 // 突破成功率：（60%-境界×5%）×气运 + 历次成功每次+1%（上限+20%）- 诅咒层数×1%，总上限95%（凡人60%/练气55%/…/尊者→主宰5%）；v867法则圆满加成，v869按灵根数分档；v893功德≥100+5%
const THUNDER_NUM = ['一','二','三','四','五','六','七','八','九'];
const TRIB_Q_MECH = [ // v174 心魔问心题库：仙人以下考游戏机制 {q, opts, ans}
  { q: '新入仙途的道友，初始有几点体力？', opts: ['3 点', '5 点', '10 点', '20 点'], ans: 1 },
  { q: '新入仙途的道友，初始有几枚金元？', opts: ['0 枚', '1 枚', '10 枚', '100 枚'], ans: 0 },
  { q: '饱食归零后若继续劳作，会发生什么？', opts: ['扣除寿元', '扣除体力', '行动变慢', '毫无影响'], ans: 0 },
  { q: '一场战斗最多打多少回合？超过则判你落败。', opts: ['50 回合', '100 回合', '200 回合', '不限回合'], ans: 2 },
  { q: '战斗中选择"逃跑"，成功的概率是？', opts: ['必定成功', '25%', '50%', '看敏捷高低'], ans: 2 },
  { q: '突破失败会怎样？', opts: ['直接死亡', '退 1~9 级', '清空全部属性', '寿元清零'], ans: 1 },
  { q: '雷劫共有几道天雷？', opts: ['三道', '六道', '九道', '十二道'], ans: 2 },
  { q: '心魔的属性约为你自身战斗属性的几成？', opts: ['十成', '九成', '五成', '三成'], ans: 1 },
  { q: '渡劫失败会折寿多少？', opts: ['不折寿', '折寿一半', '折寿 10%', '寿元清零'], ans: 2 },
  { q: '凡人突破至练气的基础成功率是？', opts: ['90%', '60%', '30%', '10%'], ans: 1 },
  { q: '突破需要凝气积攒到几缕？', opts: ['5 缕', '10 缕', '20 缕', '50 缕'], ans: 1 },
  { q: '轮回转世时，进行中的冒险会怎样？', opts: ['强制结束', '继续进行', '暂停保留', '奖励翻倍'], ans: 0 },
,
  { q: '灵宠出战需要什么生活技能？', opts: ['炼药', '驯兽', '锻造', '烹饪'], ans: 1 },
  { q: '开脉丹一次最多能开几条经脉？', opts: ['1 条', '3 条', '5 条', '10 条'], ans: 0 },
  { q: '寄售行上架物品需要支付什么？', opts: ['金元手续费', '灵石', '仙玉', '免费上架'], ans: 0 },
  { q: '赌石开出仙玉的概率大约是？', opts: ['十分之一', '百分之一', '千分之一', '万分之一'], ans: 2 },
  { q: '洞府令和仙府令分别增加多少灵气？', opts: ['1/3', '2/5', '5/10', '10/20'], ans: 1 },
  { q: '缩地术在冒险中一次可移动几格？', opts: ['1 格', '2 格', '3 格', '4 格'], ans: 1 },
  { q: '大挪移在冒险中一次可移动几格？', opts: ['1 格', '2 格', '3 格', '5 格'], ans: 2 },
  { q: '金身符在战斗中有什么效果？', opts: ['增加攻击', '抵挡一次伤害', '恢复生命', '提升速度'], ans: 1 },
  { q: '突破至金丹期需要先结成什么品级的金丹？', opts: ['下品即可', '中品以上', '上品以上', '完美以上'], ans: 0 },
  { q: '降级状态下突破成功，属性翻倍吗？', opts: ['翻倍', '不翻倍', '翻三倍', '属性清零'], ans: 1 },
  { q: '轮回转世后，降级状态会怎样？', opts: ['保留', '清除', '加重', '随机'], ans: 1 },
  { q: '养殖园自动收获时，先收什么？', opts: ['先收蛋', '先收肉', '随机', '同时收'], ans: 1 },
  { q: '雷云判定需要什么条件？', opts: ['任意境界', '大圆满Lv.10+筑基以上', '仙人以上', '渡劫以上'], ans: 1 },,
  { q: '体力每小时自然恢复几点？', opts: ['1 点', '2 点', '5 点', '10 点'], ans: 0 },
  { q: '饱食度低于多少时，劳作会扣寿元？', opts: ['50', '30', '10', '0'], ans: 3 },
  { q: '炼药、烹饪、锻造、炼金、驯兽，最多能学几种？', opts: ['1 种', '2 种', '3 种', '5 种'], ans: 0 },
  { q: '灵宠蛋从哪里获得？', opts: ['商店购买', '冒险掉落', '任务奖励', '以上皆是'], ans: 3 },
  { q: '装备有几个部位？', opts: ['4 个', '6 个', '8 个', '10 个'], ans: 1 },
  { q: '同一部位能装备两件同名装备吗？', opts: ['能', '不能', '看品级', '看境界'], ans: 1 },
  { q: '闭关修炼每秒消耗多少灵气？', opts: ['1 点', '10 点', '100 点', '不消耗'], ans: 0 },
  { q: '田药园自动收获的条件是什么？', opts: ['无条件', '2-5秒随机', '手动才收', '雷劫后才收'], ans: 1 },
  { q: '突破时，凝气不足10缕会怎样？', opts: ['突破失败', '无法突破', '自动补充', '扣寿元强突'], ans: 1 },
  { q: '心魔战失败会怎样？', opts: ['直接死亡', '突破失败进降级', '无惩罚', '扣一半寿元'], ans: 1 },
  { q: '问心答题答错会怎样？', opts: ['直接失败', '显示正解并继续', '扣体力', '重新答题'], ans: 1 },
  { q: '雷云有几种品级图标？', opts: ['3 种', '4 种', '6 种', '8 种'], ans: 2 },
  { q: '击溃雷云（KO）与扛过10回合，哪个能加品？', opts: ['都能', '只有KO', '只有扛过', '都不加'], ans: 1 },
  { q: '下品雷云的仙力/压条阈值是？', opts: ['500%以下', '1100%', '2400%', '2900%'], ans: 0 },
  { q: '圆满极限雷云的阈值是？', opts: ['1100%', '1700%', '2400%', '2900%'], ans: 3 },
  { q: '交易成功会触发雷劫判定吗？', opts: ['会', '不会', '看金额', '看境界'], ans: 0 },
  { q: '赌场获胜会触发雷劫判定吗？', opts: ['20%概率', '必定触发', '不会', '看赌注'], ans: 0 },
  { q: '赌石开出极品灵石，公告几次？', opts: ['1 次', '2 次', '3 次', '不公告'], ans: 2 },
  { q: '寄售行寄售需要多少手续费？', opts: ['1%', '5%', '10%', '免费'], ans: 2 },
  { q: '主城移动无技能时一次走几格？', opts: ['1 格', '2 格', '3 格', '随意'], ans: 0 },
  { q: '有缩地时主城斜走几格？', opts: ['1 格', '2 格', '3 格', '不能斜走'], ans: 0 },
  { q: '有大挪移时主城斜走几格？', opts: ['1 格', '2 格', '3 格', '不能斜走'], ans: 1 },
  { q: '主城移动触发雷劫判定的概率，无技能时是？', opts: ['5%', '10%', '20%', '30%'], ans: 1 },
  { q: '用缩地在主城移动，雷劫判定是几倍？', opts: ['1 倍', '2 倍', '3 倍', '5 倍'], ans: 1 },
];
const TRIB_Q_DAO = [ // v174 心魔问心题库：仙人以上问道
  { q: '修行之道，首在何字？', opts: ['争——逆天争命，不争则亡', '忍——顺天应命，不争不抢', '藏——韬光养晦，避世不出', '等——机缘天定，守株待兔'], ans: 0 },
  { q: '心魔由何而生？', opts: ['天雷淬体', '执念不散', '丹毒入脑', '灵气驳杂'], ans: 1 },
  { q: '何谓道心？', opts: ['杀伐果断', '向道之心，不移不惑', '慈悲为怀', '心死道成'], ans: 1 },
  { q: '渡劫时最忌什么？', opts: ['心存侥幸', '准备充分', '道友护法', '法宝众多'], ans: 0 },
  { q: '长生路上，最大的敌人是谁？', opts: ['天道', '仇家', '自己', '寿元'], ans: 2 },
  { q: '种何因，得何果，皆有代价，说的是什么？', opts: ['因果', '气运', '实力', '人脉'], ans: 0 },
  { q: '仙人抚我顶，结发受长生。长生可得，代价是什么？', opts: ['寿元无尽，再无烦恼', '舍却凡缘，孤道独行', '法力通天，为所欲为', '立地成圣，超脱因果'], ans: 1 },
  { q: '"我命由我不由天"，这"由我"的"我"是指？', opts: ['肉身', '神魂', '道心', '气运'], ans: 2 },
  { q: '大道三千，殊途同归，归于何处？', opts: ['长生', '力量', '本心', '虚无'], ans: 2 },
  { q: '若天要亡你，你当如何？', opts: ['跪地求饶', '逆天一战', '转世重修', '躲入凡尘'], ans: 1 },
  { q: '何为真正的"逍遥"？', opts: ['无拘无束，为所欲为', '无挂无碍，本心自在', '法力无边，横行无忌', '寿元无限，坐看沧海'], ans: 1 },
  { q: '问道者，问的是谁的道？', opts: ['天道的道', '师尊的道', '自己的道', '古圣的道'], ans: 2 },
,
  { q: '一花一世界，一叶一菩提，说的是什么？', opts: ['神通广大', '微观亦有大道', '灵气浓郁', '寿元悠长'], ans: 1 },
  { q: '"朝闻道，夕死可矣"，求的是什么？', opts: ['长生不老', '悟道之喜', '飞升成仙', '法力无边'], ans: 1 },
  { q: '上善若水，水善利万物而不争，修士当学什么？', opts: ['争强好胜', '不争之德', '趋炎附势', '明哲保身'], ans: 1 },
  { q: '"知人者智，自知者明"，修行先修什么？', opts: ['神通', '法宝', '自心', '丹药'], ans: 2 },
  { q: '大音希声，大象无形，大道是什么？', opts: ['有形有相', '无形无相', '玄之又玄', '不可言说'], ans: 1 },
  { q: '"不积跬步，无以至千里"，修行靠什么？', opts: ['顿悟', '积累', '机缘', '血脉'], ans: 1 },
  { q: '"塞翁失马，焉知非福"，说的是什么心境？', opts: ['患得患失', '宠辱不惊', '急功近利', '怨天尤人'], ans: 1 },
  { q: '"三人行，必有我师"，道在何处？', opts: ['名山大川', '师门典籍', '处处皆是', '天上仙界'], ans: 2 },
  { q: '"水至清则无鱼"，处世当如何？', opts: ['嫉恶如仇', '难得糊涂', '同流合污', '独善其身'], ans: 1 },
  { q: '"欲速则不达"，修行最忌什么？', opts: ['勤奋', '急躁', '谨慎', '机缘'], ans: 1 },
  { q: '"君子和而不同"，道友相处贵在什么？', opts: ['一味迎合', '求同存异', '争个高下', '老死不往来'], ans: 1 },
  { q: '"穷则变，变则通，通则久"，修行遇瓶颈当如何？', opts: ['死磕到底', '变通求索', '放弃转世', '怨天尤人'], ans: 1 },
  { q: '"天行健，君子以自强不息"，修士当如何？', opts: ['顺天应命', '自强不息', '听天由命', '逆天而行'], ans: 1 },
];
// 异象母题全链文案（muse1 v985）
const TRIB_OMEN = {"2":[{"name":"枯井","o1":"后山那口枯井，今夜有水声。很轻，像错觉。","o2":"井口浮起白雾，雾里带着丹香。四下无人，井水自涨。","o3":"井水满至井沿，水面映出的不是月亮，是一颗未成的丹。","open":"雷未落，井先沸了。这一丹，天道要亲自验看。","quiz":"井底传来你的声音：「丹未成，你先说说，你是谁。」","dIn":"井水里站起一个你，浑身滴水，怀里抱着一颗碎丹。","dWin":"你俯身掬起井水，水清见底，碎丹在掌心重新圆满。","dLose":"井水骤退，连你的倒影一并拖回井底，只剩一圈涟漪。","win":"后来路过的人都说，那口枯井一夜复活，井水甜得像蜜。","fail":"井又枯了。井壁上多了一道抓痕，从井口一直到井底。","layer":"井水翻上井台，水里全是电光。"},{"name":"逆旅","o1":"投宿的客栈里，今夜多摆了一副碗筷。掌柜说，没客人。","o2":"长明灯无风自摇，走廊尽头有脚步声，来回踱着，始终不近前。","o3":"那副碗筷自己动了。筷子指向你，像在点名。","open":"客栈的门无风自开，门外不是夜路，是翻滚的劫云。","quiz":"楼上传来你的笑声：「客官，住店，还是住命？」","dIn":"楼梯上走下一个你，提着一盏灯，灯芯里烧的是你的影子。","dWin":"你吹熄那盏灯。天亮时，客栈少了一间房，也少了一个你。","dLose":"灯还亮着。掌柜说，楼上那位客官，退房时没有影子。","win":"后来夜行的人都说，那家客栈有一间房，住进去的人出来时，眼里有金光。","fail":"客栈还在，只是多了一间空房，门虚掩着，谁也不敢推。","layer":"二楼的脚步声，踩着雷点下来了。"},{"name":"丹炉","o1":"丹炉冷了多日。今晨，炉口飘出一缕不属于任何药材的香。","o2":"炉身微微发烫，炉盖轻响，像里面有什么，在叩门。","o3":"满炉无火自燃，火焰是金色的，烧得没有一丝烟。","open":"雷声未至，丹炉先开。九天之火，借了你这口炉。","quiz":"炉中传来你的声音，闷闷的：「火候到了。你敢掀盖吗？」","dIn":"炉盖掀开，站起一个你，通体是火，眉心一点金光未熄。","dWin":"你伸手入炉，火焰绕指而灭，掌心躺着一颗滚烫的丹。","dLose":"炉火反扑，丹香变作焦糊。成丹的时辰，错过了。","win":"此后炼丹的人都说，那口炉炼出的丹，颗颗带着一圈金边。","fail":"丹炉裂了一道缝。再炼的丹，总差一味。差的那味，是道心。","layer":"炉火窜起三尺，炉盖上的雷纹亮了。"}],"3":[{"name":"空摇篮","o1":"识海深处，不知何时多了一只摇篮。空的，自己在晃。","o2":"摇篮晃得急了，夜里能听见细细的哭声，似有若无，绕梁不散。","o3":"哭声停了。摇篮里躺着一团金光，睁着眼睛，看你。","open":"雷落识海，摇篮先倾。这一婴，天道要听他第一声哭。","quiz":"摇篮里的声音奶声奶气，却是你的嗓子：「你是我爹，还是我？」","dIn":"金光落地，化作婴孩模样的你，脐带那头，连着你的丹田。","dWin":"你伸手抱起他，他在怀里安静下来，化作一缕清气归腹。","dLose":"脐带断了。哭声越来越远，像被什么抱着，退回黑暗里。","win":"后来同道都说，那日他闭关处隐隐有婴儿笑声传出，闻者心安。","fail":"摇篮还在识海里晃着。空的。晃一下，道基就疼一下。","layer":"摇篮晃成了影子，哭声混进了雷声。"},{"name":"双生影","o1":"今晨打坐，你的影子比你晚了一息，才坐下。","o2":"影子开始不合拍。你收功起身，它还盘坐着，纹丝不动。","o3":"月上中天，你的影子站了起来，与你面对面，无声对视。","open":"雷云压顶时，影子先你一步，抬头迎向了天。","quiz":"影子开口，用的是你的声音：「两个你，天道只留一个。」","dIn":"影子自地面剥离，立成一个你，通体漆黑，唯独丹田处透着金光。","dWin":"你与影子同时出手，又同时收手。它退后一步，重新躺回你脚下。","dLose":"影子散了，可你的影子从此缺了一角，照在墙上，是残的。","win":"后来有人问他的影子为何有金边，他笑而不答，影子也笑。","fail":"自那以后，他的影子再没跟上过他。总慢一拍，像在犹豫要不要跟。","layer":"影子又分出一重，两重影子一起抬头。"},{"name":"腹中鼓","o1":"丹田里，金丹无故跳了一下，像谁在里面，轻轻叩了一记。","o2":"叩声成鼓，咚，咚，咚。与你心跳错开，各敲各的。","o3":"鼓声密如骤雨，金丹表面裂纹蛛网般蔓延，里面有光透出来。","open":"雷未落，丹先鸣。这一声鼓，天道在九天之上侧耳。","quiz":"鼓声里裹着你的声音，隔着一层丹壳：「放我出去，还是留我做丹？」","dIn":"金丹碎开，站起一个小小的你，浑身金光，手里还攥着一片丹壳。","dWin":"你摊开手掌，他踏着丹壳碎片走出来，一步一长，站成元婴。","dLose":"裂纹合拢了。鼓声闷回丹里，一下比一下弱，终至无声。","win":"后来近他三尺的人都说，他腹中金光流转，如有一轮小日初升。","fail":"金丹还在，只是再敲不出声了。像一颗哑了的、完好的丹。","layer":"鼓声与雷声合上了拍，一记比一记重。"}],"4":[{"name":"无主之梦","o1":"昨夜入梦，梦里无人，只有你走过的脚印。","o2":"梦中脚印越来越多，最后一步，停在你的床前。","o3":"今夜不必睡了。那个梦，自己推门进来了。","open":"雷落入梦。这一劫，要在神魂里挨。","quiz":"梦里那个背影转过身，用你的声音说：「坐下，问心。」","dIn":"梦里走出另一个你，发梢还沾着梦里的灰。","dWin":"你睁开眼，梦碎成灰。灰里再没有第二个脚印。","dLose":"你醒了，梦没醒。它披着你的模样，替你活了下去。","win":"自那夜起，偶有修士梦见一位无主之客，醒来皆道心澄明。","fail":"他的梦从此没了主人。夜夜有人在梦里走动，却再不肯醒来。","layer":"梦又深了一层，梦里也开始落雷。"},{"name":"失影","o1":"日头正好，你忽然发现，影子比平日淡了一分。","o2":"影子开始迟到——你走出三步，它才跟上来。","o3":"今夜没有月。你的影子，先你一步，站在了雷光里。","open":"雷劈下来的地方，正是影子站的位置。这一劫，它替你挡不住。","quiz":"它借你影子的嘴开口：「我陪你走了这么久，该问问你了。」","dIn":"影子从地上站起来，眉眼与你一般无二，只是没有脸上的光。","dWin":"你伸手按住它的肩，影子重新贴回脚下，安分如初。","dLose":"影子挣脱了你，独立于光外。从此你走的每一步，都轻了一分，也空了一分。","win":"破境那日，他的影子比人先一步踏出门去，又回头等他。","fail":"影子留在了那一夜。此后他行于世间，阳光下，总是缺了一块。","layer":"影子被雷光拉长，长到够着了天。"},{"name":"神龛","o1":"路过的废庙里，那尊空龛，今晨多了一炷冷香。","o2":"冷香夜夜自燃，烟却笔直向上，不散，也不飘。","o3":"龛中无神，香火却旺。今夜，连你的名字都有人低声供着了。","open":"雷从龛顶落下。空了多年的位置，今夜要有人坐上去，或碎在那里。","quiz":"龛后传来你自己的诵经声：「香已上，问未答。」","dIn":"龛里坐着的，是你。垂目，含笑，手里捏着你断掉的那炷香。","dWin":"你吹灭冷香，龛归于空。有些位置，空着，才对。","dLose":"它先你一步坐了上去。香火从此认它，不认你。","win":"那座废庙的空龛，后来无人敢上香——路人说，龛里坐过真神，又走了。","fail":"龛还是空龛。那炷冷香却再没断过，烟，永远是凉的。","layer":"冷香烧到第二炷，烟柱粗如人臂。"}],"5":[{"name":"逆流河","o1":"河面漂来一片枯叶，捞起一看，是今年新发的芽。","o2":"整条河开始倒流。鱼逆水而上，往它们出生之前游去。","o3":"河水漫过源头，天地间的水声都停了——只剩劫云，在上游等你。","open":"雷顺着河逆流而上。这一劫，从你的来路打来。","quiz":"河心升起一个苍老的声音，用你少年时的语气说：「问心。」","dIn":"逆流里走上岸的你，比现在年轻，也比现在狠。","dWin":"你放它顺流而下。河水复向东，带走了该带走的。","dLose":"它逆流回了你的过去。从那天起，你的来路，一年比一年陌生。","win":"那条河自此十年丰水。沿岸的人说，河底沉着一场没人认领的雷。","fail":"河从此半流半止。喝过这水的人，都说尝到了小时候的眼泪。","layer":"河水倒卷上天，又砸回河床。"},{"name":"残局","o1":"对弈多年的老友告辞后，棋盘上多了一子，不知是谁落的。","o2":"那局残棋夜夜自变，黑白易位，像有两只看不见的手在对弈。","o3":"今夜，残局只剩一手未落。对面的空位上，劫云先坐了下来。","open":"雷落在棋盘正中。这一劫，是收官。","quiz":"对面的空位传来你的声音：「落子前，先问心。」","dIn":"对面坐下的，是你。指间夹着那枚多年未落的子。","dWin":"你替它落下最后一手。残局终了，棋盘空空荡荡，干净。","dLose":"它先落了子。这一局，你输给了没走完的那部分自己。","win":"那副残棋后来被人收进阁中，谁也复不了盘——局眼处，有雷击的焦痕。","fail":"棋盘一直摆在那里，谁也不敢收。那一子，至今悬在半空，未曾落下。","layer":"棋盘上的子，自己挪了一步。"},{"name":"缺页经","o1":"常诵的那卷经，今晨翻到中间，纸声比往日轻了一页。","o2":"缺的那页找不回来。更怪的是，你想不起那页写的是什么了。","o3":"今夜风起，满卷经页齐翻，独独缺页处，垂下一线雷光。","open":"雷补上了缺页的位置。这一劫，写在你没读过的那一页上。","quiz":"缺页处传来诵经声，是你的嗓子：「未写的，先问心。」","dIn":"缺页里走出的你，通身经文，唯独心口，空着一页。","dWin":"你在它心口写下自己的名字。那一页，从此有了主人。","dLose":"它撕走了你心口的那页。从此你诵经至此处，总要停一停，想不起下文。","win":"那卷经后来补全了。抄经人说，补上的那页，字迹是雷纹，千年不褪。","fail":"补经的人换了一茬又一茬，那页始终空着——空得像一句没说完的话。","layer":"经页哗哗自翻，缺页处雷光大盛。"}],"6":[{"name":"自备棺","o1":"门外空地上，不知何时多了一口未上漆的棺。","o2":"棺盖自己合上了。盖下传出敲击声，节拍和你的心跳一样。","o3":"棺中人坐了起来，是寿元耗尽的你。他招招手：位置留好了。","open":"第一道雷落在棺上。这一劫，先葬后渡——活着出来，才算数。","quiz":"棺里的人用你的声音说：「躺进来之前，先答我几句。」","dIn":"心魔从棺中站起，白发覆面，老态龙钟——是没能渡过此劫的你。","dWin":"你合上棺盖。盖下去的，是那条已经到头的命。","dLose":"棺盖合拢，夹住了你的衣角。你退出这一劫时，命也短了一截。","win":"后来有人问起那口棺。棺还在，空着——它的主人，最终没用上。","fail":"棺没有白备。修为退去那夜，你把旧日的自己亲手放了进去。","layer":"棺盖上的雷纹，烧穿了第一层漆。"},{"name":"空席宴","o1":"宴席摆好了。多出一副碗筷，席上却没有人。","o2":"空席上的酒杯，满了又空，空了又满——像有人一直在喝。","o3":"空席不知何时移到了主位。名牌背面，写着你的忌日。","open":"雷声如开席的锣鼓。这一宴，敬的是你这一生的寿数。","quiz":"空席那边，传来你自己的笑声：「客都齐了，主人先答话。」","dIn":"空席上渐渐坐出一个人形，眉眼与你一般无二——它替你赴了宴。","dWin":"你端起那杯酒，一饮而尽。空席散了，宴未散，你还坐在席上。","dLose":"你起身离席，空席上的人却坐直了。它替你，把这场宴吃完。","win":"此后有人问起渡劫，老人只说：那夜的宴，有人吃着吃着，就不在人间了。","fail":"宴散了。空席还在，只是下一次开席，坐上去的不会是你。","layer":"空席上的杯子，一只接一只裂开。"},{"name":"无人送葬","o1":"山道上飘来纸钱。方圆百里，今日无人出殡。","o2":"纸钱落在你必经的路上，一张接一张，像在给谁引路。","o3":"队伍到了。抬棺的、举幡的，全是纸人。棺上写着你的名字。","open":"雷云如挽帐垂下。这一场送行，天地是唯一的送葬人。","quiz":"纸人们齐齐回头，用你的声音说：「送人之前，先问几句。」","dIn":"队伍散开，走出一个披麻戴孝的你——它哭的，正是你。","dWin":"你接过引魂幡，调转了方向。这一程，送的是旧命，不是你。","dLose":"队伍继续前行，你落在最后。可你的名字，留在了棺上。","win":"那支送葬队成了山里的传说：抬出去的是棺，抬回来的，是人。","fail":"队伍没走远。降了修为的你跟在队尾，送的正是刚才的自己。","layer":"纸人抬棺的脚步，重了一倍。"}],"7":[{"name":"天梯回声","o1":"深夜，云层之上传来脚步声。一步，又一步，却没人下来。","o2":"天梯垂落云海，梯级上全是脚印——上去的很多，下来的没有。","o3":"梯顶有人探身向下，是登仙之后的你。它说：就差你这一步。","open":"满天雷声，是天梯的回响。走完这一劫，脚下就没有人间了。","quiz":"梯顶的声音顺着梯子传下来：「先问心，再登天。」","dIn":"心魔顺着天梯爬下来，周身缠满没断的尘缘——是舍不得走的你。","dWin":"你斩断最后一缕尘缘。梯还在，而你，已经不必回头。","dLose":"它把你推下梯级。你坠回人间，怀里抱着半截断梯。","win":"后来登梯的人都说，最高那一级有个脚印，至今还是热的。","fail":"天梯收回了云海。那一夜，凡间多了一个总望着天的人。","layer":"梯级一级级亮起，脚步声近了。"},{"name":"故乡灯火","o1":"远望故乡，那个方向多了一盏灯。那个位置，早已无人居住。","o2":"每夜，故乡的灯都亮着。灯下有人影走动，是记忆里的人。","o3":"满城灯火齐明。故人立在灯下招手，还和你离开那天一样年轻。","open":"雷落之时，灯火一盏盏灭去。渡过此劫，你与故乡只剩回望。","quiz":"灯下的人影抬起头，是故人的声音：「走之前，先答我。」","dIn":"心魔从灯火里走出，穿着故乡的旧衣——是死活不肯走的你。","dWin":"你吹熄最后一盏灯。暗下去的地方，从此只住在你心里。","dLose":"你跟着灯火往回走。走回故乡时，天上的门已经关了。","win":"后来故乡的老人说，自那夜起，村口的灯总比别家亮得久些。","fail":"灯还亮着。你回到灯下坐下，故人给你添了茶，像你从未离开。","layer":"灭了的灯，又被雷光点亮一盏。"},{"name":"脱壳","o1":"静坐时，身后传来轻响——像有什么，正从你的影子里剥离。","o2":"晨起，榻边多了一张蜕下的皮，薄如蝉翼，眉眼俱全。","o3":"蜕壳坐在你的位置上，替你呼吸，替你心跳。它睁开眼：该换我了。","open":"雷落在壳上，壳纹丝不动。这一劫，劈的是壳里面的人。","quiz":"壳里传出闷闷的声音：「出来之前，先答话。」","dIn":"心魔是那具活过来的空壳，举手投足比你还像你——它想替你成仙。","dWin":"你迈出旧壳，回头看它倒下。仙凡之别，原来就这一层皮。","dLose":"它穿着你的一切走了出去。你留在壳里，听它用你的名字答话。","win":"后来，那具空壳被人拾去供进山庙，成了无名的神像。","fail":"壳又合上了。你在里面一天天变轻，修为从指缝里漏出去。","layer":"壳上的裂纹，又深了一道。"}],"8":[{"name":"金锈","o1":"你擦拭仙器时，指腹沾了一点锈。仙金，是不该锈的。","o2":"锈痕夜夜蔓延，爬上剑脊，像枯藤爬满了不朽。","o3":"满宫仙器一同泛锈，连你影子里的金光，也锈了。","open":"雷还未落，锈皮簌簌自剥——这一劫，先验金，后验人。","quiz":"锈里有声音，用你的嗓音说：「先回答我，你还剩几分是金？」","dIn":"锈甲剥尽，走出另一个你——通体赤金，无一丝锈。它说，它才是没锈过的。","dWin":"你一剑斩落，锈与金同坠。剑身重光，原来锈的只是怕。","dLose":"心魔踏锈而去，你的金身从指尖开始，一寸寸暗下去。","win":"那一日，仙界有人传说：有个仙人的器物，锈尽之后，比新铸的还亮。","fail":"降级的仙器再拭不亮，锈住进了骨头里，逢雷雨夜便隐隐作响。","layer":"锈皮大片剥落，露出底下的雷光。"},{"name":"阙前雪","o1":"仙宫无四季。今晨，你的阙前落了一层薄雪。","o2":"雪不化，越积越厚，只落在你一家门前——像在等谁回来。","o3":"阙前雪没至膝，抬头，九重宫阙都在落雪，唯天无声。","open":"雷从雪里滚出来，所过之处，积雪无声地烧成了白汽。","quiz":"雪底下埋着一句话，是你自己的声气：「门后那一位，真是你吗？」","dIn":"雪人立起，眉眼与你一般无二，唯独望你的眼神，像望一座空阙。","dWin":"你踏雪而过，阙门自开。身后雪化清流，洗去了门槛上的旧尘。","dLose":"你退回门内，雪却跟了进来，从此你的宫阙，四季只剩一冬。","win":"后来仙人们说，那座阙前的雪化得最迟——化完那日，主人已是金仙。","fail":"残阙雪深，无人扫。仙人们绕道时说：这家的冬天，退不回去了。","layer":"雪被雷气掀起，满阙飞白。"},{"name":"仙籍","o1":"仙籍千年无改动。昨夜，你的名字旁，多了一点淡墨。","o2":"淡墨夜夜洇开，洇到籍页边缘，像有人在另一头，慢慢描你的名。","o3":"整页仙籍的墨都活了，独你的名字悬在半空，一笔未落，一笔未收。","open":"雷落如笔，悬天而书。这一劫，是天道亲自来落你名字的最后一笔。","quiz":"籍页深处，你的声音轻轻问：「若把你划去，天下可有人记得？」","dIn":"它从籍页里走出来，通身是墨，眉眼是你——它是籍上那个你，来替你赴劫。","dWin":"你夺笔自书，墨落籍成。它退回页中，从此只是名字，不再是人。","dLose":"它把你按回籍页里，墨一层层漫上来——你成了名字，它成了你。","win":"金仙录成那日，守籍的老仙翻了又翻，说：这笔墨，是自己站稳的。","fail":"残籍上那个名字，墨迹终年不干。凑近看，一笔之差，写的不是他。","layer":"籍页无风自翻，你的名字又亮了一分。"}],"9":[{"name":"归途众影","o1":"你闭关时听见门外有脚步声，不止一双，步子都像你的。","o2":"影子先回来了。墙上、地上、水里，都是往回走的你。","o3":"万影临门，齐齐抬手叩关，每一张脸，都是你。","open":"雷落时，万影齐齐仰头。这一劫，要从千百个你里，认出哪一个是真。","quiz":"众影之中，一个声音贴着你耳朵说：「他们都回来了，你还回得去吗？」","dIn":"最前面的影子跨出队列，面目渐清——是你，只是眼神先老了。","dWin":"你张开双臂，万影归身，如百川回海。自此你开口，声里有回响。","dLose":"众影散去，独留你在原地——后来才知，走掉的那个，才是本体。","win":"合体之后，有人见他独坐，满室人声——细看，只有他一个。","fail":"分出去的再没回来全。他说话时，总有一句，要等影子替他说。","layer":"又有一批影子赶回，站到了你身后。"},{"name":"碎镜","o1":"你的镜子今早多了一道细纹，从镜中你的眉心，裂向镜外。","o2":"细纹夜夜分叉，镜中人开始比你先动——你抬手时，他已经放下了。","o3":"满室镜面尽碎，每一片里，都有一个你在看着这一片外的你。","open":"雷落在镜上，万片齐鸣。这一劫，碎的是镜，验的是哪一面是人。","quiz":"最近的一片镜里，它贴着你问：「你碎过那么多次，哪次是真的你？」","dIn":"碎片悬空拼成人形，每一片都映着你一世的脸，齐齐转头看你。","dWin":"你伸手按住最大的一片，万镜归一。镜面重圆，镜中人终于与你同笑。","dLose":"它先你一步走出镜子。你退回镜中，看它用你的脸，过你的人生。","win":"合体功成，他的镜中再无旁人。擦镜的老仆说：如今，只剩一位了。","fail":"镜子拼回去了，裂纹却留在他脸上。笑时，那道纹先于他动。","layer":"碎片一片片立起，齐齐对准了天。"},{"name":"借名者","o1":"远方传来消息：有人用你的名字，在千里之外，收了一名弟子。","o2":"借名者行事愈烈，善举恶行都记在你名下——连天道，都开始看他。","o3":"今夜叩关的不是雷，是他。他在门外说：名字用惯了，来取人。","open":"雷悬在两人头顶，迟迟不落——天道一时，也分不清该劈哪一个。","quiz":"他用你的嗓音、你的名义问你：「你行过的善，凭什么算你的？」","dIn":"他推门而入，面目与你无分毫差，连掌心的旧纹，都长在同一处。","dWin":"你不争辩，只报了一遍自己的名。满天雷声里，他先散了。","dLose":"它赢了心，天道认它。你退回无名之身，连影子都不知该跟谁。","win":"合体之后，借名的传闻自绝。有人问起，他说：名字，我自己收回来了。","fail":"残名归了别人，他只好另起一名。旧友见他，叫的还是那个借走的名。","layer":"门外的叩声，变成了砸门。"}],"10":[{"name":"泥像","o1":"某座山庙里，泥像的眉眼，夜里悄悄变了几分。","o2":"十里八乡的庙祝都说：供桌上的像，一夜之间都成了你的模样。","o3":"所有庙门今夜自开。泥像坐在暗处，抬起头，用你的眼睛看你。","open":"雷未落，香先断。万千供桌同时一颤——天道来收这尊像了。","quiz":"泥像借你的嗓子开口：「受了这么多香火，你配坐这个位置吗？」","dIn":"泥像自供桌走下，每走一步，脸上就多一分你的神情。","dWin":"你亲手把泥像的脸抹平。坐上去的，从来不是泥。","dLose":"泥像的脸彻底成了你。而你站在供桌下，一时分不清谁在受香。","win":"后来庙里的像，眉眼都淡了回去。只一个老庙祝记得，那像曾像过谁。","fail":"那尊像留在了供桌上，脸还是你的。只是再没人敢给它上香。","layer":"又一座庙的香，断在了这一层。"},{"name":"万庙同梦","o1":"昨夜，有个守庙人做了个怪梦，梦里有人站在云上看他。","o2":"不止一人。千里之内的庙祝，同夜梦见同一道身影，立在天边。","o3":"今夜众生抬头入梦，梦里没有神佛——只有你，坐在最高处等他们。","open":"雷从梦里劈下来。醒着的人听见天响，睡着的人看见天裂。","quiz":"梦里那个你转过身：「众生梦你，是敬你，还是怕你？」","dIn":"千万梦境同时碎开，碎片里走出同一个你——他们梦到的，原来都是它。","dWin":"它散时，千万梦境同时天亮。众生醒来，只记得做过一个好梦。","dLose":"你斩不尽它。它躲进众生的梦里，每夜借一张脸，望你一眼。","win":"从那以后，守庙人偶尔还梦见天边有人影。醒来时，香正燃着。","fail":"众生还是会做那个梦。只是梦里的人影背对着他们，再不回头。","layer":"梦里的人影，又近了一步。"},{"name":"香火灰","o1":"今晨扫庙的人发现，香炉里的灰，一夜厚了许多。","o2":"各庙的香灰开始逆风而起，不落屋瓦，专往一个方向飘。","o3":"灰积满天，落下来是冷的。整座人间的香火，一夜之间凉透。","open":"雷劈开灰云，灰里站着无数烧尽的愿——天道拿众生的灰，来烧你。","quiz":"灰里有个声音，用众生的嗓子问：「烧尽的愿，算谁的债？」","dIn":"灰聚成人形，眉眼是你的，身体是空的——风一吹，就要散。","dWin":"你一掌按散灰人。灰落回香炉，炉底重新透出一点红。","dLose":"灰人散开又聚拢，聚拢又散——它不死，它只是等下一炉香。","win":"此后每逢初一，香炉里的灰总是温的。扫庙的人说，那是神还没走远。","fail":"香还在烧，灰却再不热了。众生跪下去，只觉得膝盖下一片凉。","layer":"灰云压低一层，落灰如雪。"}],"11":[{"name":"残碑","o1":"三千界外，有碑无字。今夜，碑上多了一道新痕。","o2":"碑痕渐深，诸界灵光过碑皆暗一分——像有什么，在碑后翻身。","o3":"无字碑自行裂开一线，线内不是石，是俯瞰众生的眼。","open":"雷落之前，碑先动了。这一劫，天道要亲手写你的名字。","quiz":"碑后的声音借你的嗓子开口：「写名前，先问心。」","dIn":"碑影里走出的你，眉心有一道碑痕——它说，它才是被写下的那个。","dWin":"你提笔，在碑上写下自己的名字。碑，沉默地认了。","dLose":"碑痕合拢，你的名字被磨去一半——剩下的，道途另算。","win":"那一夜后，诸界修士都说，无字碑上多了一个名字。字迹张狂，不像天道的笔。","fail":"碑还是无字之碑。只有最靠近的人听见，碑里多了一声叹息。","layer":"碑上的裂痕，又深了一分。"},{"name":"群星让路","o1":"今夜观星的人发现，有一片星，位置和昨夜不太一样。","o2":"星辰在移动。整片星海无声地朝两边分开，像在让出一条路。","o3":"路让到了尽头，尽头漆黑——群星屏住光，等你先踏出那一步。","open":"你踏上星路的刹那，雷从路的尽头倒着烧回来——它在清道。","quiz":"星路尽头，你自己的声音传回来：「这条路，只容一人。你让谁留下？」","dIn":"让开的群星之间，走出另一个你——它站在路中央，说路是它让的。","dWin":"它碎成星尘，落回原位。群星重新合拢时，路还在——是你的了。","dLose":"它替你走完了那段路。你站在原地，看群星为它合拢。","win":"诸界的观星者从此在星图上留一处空白，注曰：此处曾有星让路。","fail":"星图上那条路被划掉了。划的人说：那夜之后，星再没让过谁。","layer":"让开的星路，又宽了一截。"},{"name":"界外书","o1":"闭目内视时，你听见很远的地方，有纸页翻动的声音。","o2":"翻页声近了。你这一生的事，正被界外什么人，一页一页往后翻。","o3":"翻到最后一页了。界外的人停住手——下一页是空的，笔悬在半空。","open":"笔落下之前，雷先至。这一劫，是写书的人要看看你配不配续页。","quiz":"翻页声里，你的嗓音读出一句：「你这一生，是你自己写的吗？」","dIn":"书页间站起一个你，浑身是字——它是被写下来的那个你，来讨原稿。","dWin":"你夺过笔，在新页上写下第一行。界外的手，轻轻把书推还给你。","dLose":"笔在它手里。你的后半生，被它当着你的面，改了几个字。","win":"诸界从此有个传说：命册写到某人时，写书的手，换了一只。","fail":"那本书合上了。合上前最后一页，你的名字被涂去了一笔。","layer":"翻页声停了——界外的人，站了起来。"},{"name":"无天之夜","o1":"这一夜抬头的人都愣住——天，好像比平时高了些。","o2":"天在退。云层、星光、天光，一层层往后退，退得诸界抬头皆空。","o3":"天彻底退到看不见了。三千世界头顶，只剩一片没有边的黑。","open":"没有天的夜里，雷无处落，便直接落在你神魂上——躲无可躲。","quiz":"黑暗里，你的声音贴耳问：「没了天看着，你还是不是你？」","dIn":"黑里浮出一张脸，是你的——没有天压着的东西，正在往大里长。","dWin":"它一碎，黑便落回你脚下，凝成影。从此你的影子，比天还高。","dLose":"那张脸还在长。你的天回来了一半——还有一半，压不回去。","win":"诸界史官记下那一夜，只写了四个字：天曾无主。","fail":"那一夜过后，天回来了。只是诸界的人再抬头，总觉得天矮了些。","layer":"黑，又厚了一层。"}]};
const TRIB_OMEN_EARLY = {"awaken":{"grade":{"tian":"灵气入体，如百川认主，自归一处。","shang":"两道清气并行入体，泾渭分明，互不相扰。","zhong":"灵气入体，三处亮起，缓缓漫开。","xia":"灵气四散入体，微光点点，勉强成形。","za":"五色灵气一齐涌入，驳杂纷乱——却无一缕逸散。"},"elem":{"金":"一缕锐气自天外来，所过之处，血肉如被薄刃轻轻刮过。","木":"温润之气漫入四肢，像早春的根，悄悄往深处探。","水":"清气无声，自足心起，凉意一寸寸漫上心头。","火":"一团热意在腹中骤然点亮，呼吸里带了炭火气。","土":"沉沉之气压进丹田，身子一坠，像落回了大地怀里。"},"fail":["灵气行至半途，倏然溃散，只余满身虚汗。","那一缕气终究没能留住，散在风里，像从未来过。"]},"foundation":{"open":{"金":"道基初凝，如炉中铸剑，雏形已现，锋芒未开。","木":"灵根之下，道基如老树盘根，一须一须往虚空里扎。","水":"道基不争形，如水就下，自寻其道，缓缓成渠。","火":"丹田燃起一炉不熄之火，道基在火心里慢慢烧红。","土":"道基如筑台，一层一层往上垒，沉得听不见声响。"},"done":{"tian":"基成一色，莹然无瑕——这一方道基，天地只给了一人。","shang":"双基并峙，气机流转无碍，已是上乘气象。","zhong":"道基稳固，中正平和，不惊不躁。","xia":"道基虽薄，根脚已立，往后的路要一步步垫。","za":"五基并立，驳杂而全——像是把整片天地，都打进了基里。"},"fail":["道基方成又裂，灵光如瓷纹般碎开，散了一地。","根基未稳，灵气倒灌，那座台在心里塌了半边。"],"reinc":"又一次站在基前，手不抖了，心却比第一世更静。"}};
// v985 异象母题 helpers（muse1）：只加文案，不动判定/概率/题目/数值
function tribOmenMotif(S, noCreate) {
  const r = S.realm | 0; if (r < 2) return null;
  const pool = TRIB_OMEN[r]; if (!pool || !pool.length) return null;
  let o = S._omen;
  if (!o || o.r !== r || typeof o.i !== 'number' || !pool[o.i]) { if (noCreate) return null; o = S._omen = { r: r, i: Math.floor(Math.random() * pool.length), s: 0 }; }
  return pool[o.i];
}
function tribOmenShow(S) { try {
  const m = tribOmenMotif(S); if (!m) return;
  const sf = S._succFail | 0; const st = sf <= 0 ? 1 : sf <= 2 ? 2 : 3;
  const o = S._omen; if ((o.s | 0) >= st) return; o.s = st;
  const line = st === 1 ? m.o1 : st === 2 ? m.o2 : m.o3;
  if (line) log('info', '<span style="color:#9a8fb0">' + line + '</span>');
} catch(_) {} }
function tribOmenText(S, beat) { try { const m = tribOmenMotif(S); return (m && m[beat]) || ''; } catch(_) { return ''; } }
function tribOmenBeat(S, beat) { try {
  const line = tribOmenText(S, beat); if (!line) return;
  log(beat === 'win' || beat === 'dWin' ? 'good' : beat === 'fail' || beat === 'dLose' ? 'bad' : 'warn', line);
} catch(_) {} }
const _LG_GRADE_KEY = [null, 'tian', 'shang', 'zhong', 'xia', 'za'];
function tribBtFlavor(S, fromRealm) { try {
  const fr = fromRealm | 0;
  if (fr === 0) { const g = S.lingGen || []; if (g.length) { const E = TRIB_OMEN_EARLY.awaken; const gl = E.grade[_LG_GRADE_KEY[g.length]], el = E.elem[g[0]]; if (gl) log('good', '🌟 ' + gl); if (el) log('good', '🌟 ' + el); } return; }
  if (fr === 1) { const g = S.lingGen || []; if (g.length) { const dl = TRIB_OMEN_EARLY.foundation.done[_LG_GRADE_KEY[g.length]]; if (dl) log('good', '🌟 ' + dl); } return; }
  tribOmenBeat(S, 'win');
} catch(_) {} }
function tribFailFlavor(S, fromRealm) { try {
  const fr = fromRealm | 0;
  if (fr === 0) { const f = TRIB_OMEN_EARLY.awaken.fail; log('bad', f[Math.floor(Math.random() * f.length)]); return; }
  if (fr === 1) { const f = TRIB_OMEN_EARLY.foundation.fail; log('bad', f[Math.floor(Math.random() * f.length)]); return; }
  const m = tribOmenMotif(S, true); if (m && m.fail) log('bad', m.fail);
} catch(_) {} }
function tribFoundationOpen(S) { try {
  if ((S.realm | 0) !== 1) return; const g = S.lingGen || []; if (!g.length) return;
  const F = TRIB_OMEN_EARLY.foundation;
  if ((S.sealLife | 0) >= 1 && F.reinc) { log('warn', F.reinc); return; }
  const ol = F.open[g[0]]; if (ol) log('warn', ol);
} catch(_) {} }
try { window.TRIB_OMEN = { show: tribOmenShow, beat: tribOmenBeat, text: tribOmenText, foundOpen: tribFoundationOpen }; } catch(_) {}

function pickTribQuiz(fromRealm) { // v174 心魔问心出题：仙人以下考游戏机制，仙人以上问道
  const bank = (fromRealm | 0) >= 8 ? TRIB_Q_DAO : TRIB_Q_MECH;
  const pool = bank.slice(), qs = [];
  while (qs.length < K.TRIB_QUIZ_N && pool.length) qs.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
  return { qs, fromRealm: fromRealm | 0 };
}
function tribFull(S) { // v175 灵气条/仙力充满度（压条可超出上限）；v1172 Ye 定最高 2900%
  const mm = manaMax(S);
  return mm > 0 ? Math.max(0, Math.min(29, (S.mana | 0) / mm)) : 0;
}
window.tribFull = tribFull; // v816 暴露给雷云战斗跨script块用
function tribPower(S) { // v175 渡劫强度系数：压条越高天劫越强；900%×2.0，1000%×2.5（v178 最强天劫）
  const f = tribFull(S);
  const _skyM = skyToday().key === 'blood' ? 1.05 : 1; // v1015 血月天威
  if (f >= 20) return K.TRIB_POWER_1000 * _skyM; // v285 2000%最强天劫
  return (1 + f / 9 * (K.TRIB_POWER_MAX - 1)) * _skyM;
}
function tribStrikes(S, trib) { // v988 雷劫分层（老板定版五档）：下品9/中品18/上品36/完美54/圆满极81
  try {
    const jg = trib && trib.jackpot;
    if (jg) return [81, 54, 36, 18, 9][gradeFromFull(jg.full).gi] || 9;
    return [81, 54, 36, 18, 9][tribGrade(S).gi] || 9;
  } catch(_) { return 9; }
}
try { window.tribStrikes = tribStrikes; } catch(_) {}
function thunderTrib(S, pwOverride) { // v628 雷劫改成和雷云战斗；v632 10回合制；v634 战胜雷云品质+1；v893 功德护体减伤
  const fa = fightAttrs(S, false);
  let pw = (pwOverride != null ? pwOverride : tribPower(S)) * (1 + fateMod(S, 'trib')) * (S.tabooAwake ? 0.95 : 1);
  const _meritCut = (S.realm|0) >= 6 ? Math.min(0.30, Math.floor((S.merit|0) / 10) * 0.01) : 0; // 每10功德减伤1%，上限30%
  if (_meritCut > 0) { pw = pw * (1 - _meritCut); try { log('good', `🙏 功德护体！雷劫威力 <span class="g">-${Math.round(_meritCut * 100)}%</span>（功德 ${S.merit}）`); } catch(_) {} }
  const tattrs = {}; ATTRS.forEach(k => tattrs[k] = Math.max(1, Math.round(fa[k] * 0.5 * pw))); // v635 普通品质1-3回合可战胜，圆满极最强
  const thunder = fighter('⚡雷云', tattrs, false, []);
  const b = new Battle(playerFighter(S, false), thunder);
  b.unlimited = true;
  let round = 0;
  while (!b.over && round < 10) {
    round++;
    const actA = aiChoose(b.A, b.B);
    b.playRound(actA, aiChoose(b.B, b.A));
  }
  const koWin = b.winner === b.A;
  const surviveWin = !koWin && b.A.hp > 0 && round >= 10;
  const win = koWin || surviveWin;
  const lines = [`⚡ 与雷云激战${koWin ? '，<span class="g">击溃雷云</span>' : (surviveWin ? '，<span class="g">扛过十回合，雷云散去</span>' : '，<span class="r">不敌雷云</span>')}`];
  const hpLeft = win ? Math.max(1, Math.floor(b.A.hp)) : 1;
  S.hpCur = hpLeft;
  return { ok: win, lines, hpLeft, pw, battle: b, koWin }; // v634 koWin用于品质+1
}
function demonTrib(S) { // v172 心魔劫：心魔属性为玩家战斗属性九成，无技能，打一场（v175：属性×渡劫强度；v178：压条 1000% 时天魔 2.5 倍属性；v179：诅咒层数增强心魔）
  const fa = fightAttrs(S, false);
  const pw = tribPower(S);
  const dbase = tribFull(S) >= 20 ? K.TRIB_DEMON_1000 : K.TRIB_DEMON_MULT * (1 + (pw - 1) * K.TRIB_POWER_DEMON); // v285 2000%天魔最强
  const dmult = dbase * (1 + (S.curseN | 0) * K.TRIB_CURSE_PER);
  const dattrs = {}; ATTRS.forEach(k => dattrs[k] = Math.max(1, Math.round(fa[k] * dmult)));
  const demon = fighter('👹心魔', dattrs, false, []);
  const b = new Battle(playerFighter(S, false), demon).auto();
  return { win: b.winner === b.A, battle: b, pw };
}
// v654 雷劫/心魔手动战斗
function startThunderBattle(S, trib, fromRealm, pwOverride) {
  const fa = fightAttrs(S, false);
  const pw = (pwOverride != null ? pwOverride : tribPower(S)) * (1 + fateMod(S, 'trib')) * (S.tabooAwake ? 0.95 : 1);
  const tattrs = {}; ATTRS.forEach(k => tattrs[k] = Math.max(1, Math.round(fa[k] * 0.5 * pw))); // v635 同thunderTrib
  const thunder = fighter('⚡雷云', tattrs, false, []);
  const b = new Battle(playerFighter(S, false), thunder);
  b.unlimited = true;
  b.tribStrikes = tribStrikes(S, trib); b.surviveRounds = b.tribStrikes + 1; // v985 雷劫分层
  pk = { battle: b, trib: 'thunder', tribData: { trib, fromRealm, pw }, target: 'foe' };
  try { closeSheet(); } catch(_){}
  if (trib.jackpot) { const _jg = C.gradeFromFull(trib.jackpot.full); log('warn', `⚡ <b>天现异象！</b>劫云翻涌——这竟是【<b class="y">${_jg.name}</b>】级别的天劫！扛过去便按【${_jg.name}】档结丹！`); }
  else if (pw >= 1.25) log('sys', '⚡ 天劫感应到你充盈的灵气，雷威大涨！');
  log('warn', `⚡ <b>雷劫降临！</b>劫云翻涌，天威浩荡——击溃<b class="x">⚡雷云</b>！<br><span style="color:#888">击溃雷云或存活${b.tribStrikes}回合即为渡劫成功，逃跑视为落败</span>`);
  tribOmenBeat(S, 'open');
  afterAct(); save(); render();
}
function startDemonBattle(S, trib, fromRealm) {
  try { if (typeof pk !== 'undefined') pk = null; } catch(_) {} // v821 开战前清掉旧pk，防止卡住的上个战斗干扰
  try { const _G0 = (typeof G !== 'undefined' ? G : window); _G0.pk = null; } catch(_) {}
  try { window.pk = null; } catch(_) {}
  try { window._demonDeadT = 0; } catch(_) {}
  const fa = fightAttrs(S, false);
  const pw = tribPower(S);
  const dbase = tribFull(S) >= 20 ? K.TRIB_DEMON_1000 : K.TRIB_DEMON_MULT * (1 + (pw - 1) * K.TRIB_POWER_DEMON);
  const dmult = dbase * (1 + (S.curseN | 0) * K.TRIB_CURSE_PER);
  const dattrs = {}; ATTRS.forEach(k => dattrs[k] = Math.max(1, Math.round(fa[k] * dmult)));
  const demon = fighter('👹心魔', dattrs, false, []);
  const b = new Battle(playerFighter(S, false), demon);
  try { window._pkSeq = Date.now(); } catch(_) {} // v829 新战斗序号，旧pk失效
  try { const _pkObj = { battle: b, trib: 'demon', tribData: { trib, fromRealm }, target: 'foe', _seq: window._pkSeq }; if (typeof G !== 'undefined' && G) G.pk = _pkObj; window.pk = _pkObj; try { if (typeof log === 'function') log('sys', `[诊断]开战: seq=${window._pkSeq}, B.hp=${b.B.hp}`); } catch(_) {} } catch(_) {} // v757 严格模式下pk需挂window；v829 加序号；v830 双写G.pk和window.pk，跨块同步；v834 诊断
  try { closeSheet(); } catch(_){}
  const _cu = (S.curseN|0) > 0 ? `（👻诅咒×${S.curseN}，心魔增强）` : '';
  try { const _e = { c: 'warn', h: `👹 <b>心魔来袭！</b>${_cu}直指道心——与<b class="x">👹心魔</b>一战！<br><span style="color:#888">斩灭心魔方能继续突破，逃跑视为落败</span>`, t: (typeof timeStr === 'function' ? timeStr() : '') }; S.log.push(_e); if (typeof renderEntry === 'function') renderEntry(_e, true); } catch(_) {}
  tribOmenBeat(S, 'dIn'); // v781 不直接调log避免DOM遮蔽
  try { if (typeof afterAct === 'function') afterAct(); } catch(_) {}
  try { if (typeof save === 'function') save(); } catch(_) {}
  try { if (typeof renderCombat === 'function') renderCombat(); else if (typeof render === 'function') render(); } catch(_) {} // v786 优先调renderCombat直接开战斗UI
}
window.startDemonBattle = startDemonBattle; // v754 暴露给doTribQuizAnswer跨块调用
window.startSanShiBattle = function(idx) { // v812 斩三尸战斗；v862 分段调试
  try {
    try { if (typeof pk !== 'undefined') pk = null; } catch(_) {} // v821 开战前清旧pk
    try { const _G0 = (typeof G !== 'undefined' ? G : window); _G0.pk = null; } catch(_) {}
    try { window.pk = null; } catch(_) {}
    try { window._demonDeadT = 0; } catch(_) {}
    const _names = ['上尸·彭倨', '中尸·彭质', '下尸·彭矫'];
    const _name = _names[idx] || '三尸';
    const fa = fightAttrs(S, false);
    const dattrs = {}; ATTRS.forEach(k => dattrs[k] = Math.max(1, Math.round(fa[k] * 1.5))); // 三尸1.5倍属性
    const foe = fighter('💀' + _name, dattrs, false, []);
    const b = new Battle(playerFighter(S, false), foe);
    const _G = (typeof G !== 'undefined' ? G : window);
    try { window._pkSeq = Date.now(); } catch(_) {}
    const _pkS = { battle: b, trib: 'sanshi', tribData: { sanShiIdx: idx }, target: 'foe', _seq: window._pkSeq };
    _G.pk = _pkS; try { window.pk = _pkS; } catch(_) {} // v830 双写，跨块同步
    try { closeSheet(); } catch(_){}
    log('warn', `💀 <b>${_name}现形！</b>——斩去三尸方能突破尊者！<br><span style="color:#888">此战凶险，败则折寿10%</span>`);
    try { if (typeof afterAct === 'function') afterAct(); } catch(_) {}
    try { if (typeof save === 'function') save(); } catch(_) {}
    try { if (typeof renderCombat === 'function') renderCombat(); else if (typeof render === 'function') render(); } catch(_) {}
  } catch(_e) { try { log('sys', '斩三尸启动失败:' + (_e.message||_e)); } catch(_) {} }
};
// v953 后台tick已移至界面script块（本行删除：core块取不到S/arrayTick/save）
if (!window._demonWatchdog) { window._demonWatchdog = setInterval(() => { // v807 心魔战看门狗：每秒检查，死了一定结算；v812 覆盖斩三尸；v815 5秒强制清场；v829 序号检查，旧pk直接忽略
  try {
    const _G = (typeof G !== 'undefined' ? G : window);
    const _pk = (typeof pk !== 'undefined' && pk) ? pk : (_G.pk ? _G.pk : null);
    if (_pk && _pk.trib === 'demon' && _pk.battle && _pk.battle.B && _pk.battle.B.hp < 1) { try { if (typeof log === 'function') log('sys', `[诊断]看门狗见0血: seq=${_pk._seq||'无'}, windowSeq=${window._pkSeq||'无'}, 相同=${_pk._seq===window._pkSeq}`); } catch(_) {} } // v834 诊断
    if (_pk && window._pkSeq && (!_pk._seq || _pk._seq !== window._pkSeq)) return; // v829 旧战斗的pk（无序号或序号不对），直接忽略
    if (_pk && (_pk.trib === 'demon' || _pk.trib === 'sanshi') && _pk.battle && _pk.battle.B && _pk.battle.B.hp < 1) {
      window._demonDeadT = window._demonDeadT || 0;
      window._demonDeadT++;
      if (typeof pkHandleOver === 'function') { try { pkHandleOver(); } catch(_) {} }
      if (window._demonDeadT >= 5) { // 5秒还没结算完，强制清场
        try { if (typeof pk !== 'undefined') pk = null; } catch(_) {}
        try { _G.pk = null; } catch(_) {}
        try { window.pk = null; } catch(_) {}
        try { const _cb = document.getElementById('combatBox'); if (_cb) _cb.style.display = 'none'; } catch(_) {}
        try { if (typeof log === 'function') log('sys', '[系统]心魔战强制关闭（超时）'); } catch(_) {}
        try { if (typeof render === 'function') render(); } catch(_) {}
        window._demonDeadT = 0;
      }
    } else {
      window._demonDeadT = 0;
    }
  } catch(_) {}
}, 1000); }
function tribBattleSuccessLog(S, r) {
  if (r.ok) { S.yinQi = 0; const _gs = r.grade ? `结成【<b class="y">${r.grade}</b>】，全属性 <span class="y">×${r.mult}</span>！` : `全属性 <span class="y">×${r.mult||'?'}</span>`; log('good', `⚡ <b>突破成功！</b>踏入【${r.realm}】，${_gs}法力上限 <span class="g">×2</span>！${S.realm === 1 ? '引气入体' : '凝气'}已耗尽（0/10缕）。`); try { sealAwakenCheck(); } catch(_){} try { if (typeof addMerit === 'function') addMerit(10, '突破成功'); } catch(_){}
    try { if (typeof addFame === 'function') addFame(8, '突破成功'); } catch(_){} }
}
function finishThunderBattle() {
  const b = pk.battle;
  const _td = pk.tribData, trib = _td.trib, fromRealm = _td.fromRealm, pw = _td.pw;
  const koWin = b.winner === b.A;
  const surviveWin = !koWin && b.A.hp > 0 && (b._tribSurvive || b.round >= (b.tribStrikes ? b.tribStrikes + 1 : 10));
  const win = koWin || surviveWin;
  const hpLeft = win ? Math.max(1, Math.floor(b.A.hp)) : 1;
  S.hpCur = hpLeft;
  const _bl = `⚡ 与雷云激战${koWin ? '，<span class="g">击溃雷云</span>' : (surviveWin ? '，<span class="g">扛过${b.tribStrikes || 9}道天雷，雷云散去</span>' : '，<span class="r">不敌雷云</span>')}`;
  log('sys', _bl);
  if (win) log('good', '⚡ ' + (b.tribStrikes || 9) + '道天雷，尽数扛下！');
  trib.thunder = { ok: win, lines: [_bl], hpLeft, pw, battle: b, koWin };
  pk = null;
  if (!win) {
    S.thunderOk = false;
    const _ds = applyFailState(S, fromRealm);
    const lifeLost = Math.max(1, Math.floor((S.lifespan|0) * (S.race === 'ming' ? 0.05 : 0.10))); // v1088 冥族阴体：渡劫失败折寿减半
    S.lifespan = Math.max(1, (S.lifespan|0) - lifeLost);
    log('bad', `⚡ 倒在天雷之下，突破失败……道途已断，沦为【${_ds || S.degraded}】（卡9级后期），折寿 <span class="r">${lifeLost}</span> 年。`);
    afterAct(); commit(); render();
    return;
  }
  if (R() < K.TRIB_DEMON_P) {
    trib.demonMet = true;
    if (R() < K.TRIB_QUIZ_P) {
      trib.quiz = pickTribQuiz(fromRealm);
      trib.quiz.jackpot = trib.jackpot || null;
      trib.quiz.koWin = koWin; // v739 击溃雷云标记，用于答题后战斗概率加成
      commit(); render();
      sheetTribQuiz(trib.quiz);
      return;
    }
    startDemonBattle(S, trib, fromRealm);
    return;
  }
  S.thunderOk = false;
  const r = applyBtSuccess(S, fromRealm, trib);
  tribBattleSuccessLog(S, r);
  afterAct(); commit(); render();
}
function finishDemonBattle(_S) { // v814 S跨script块取不到，改传参
  const _G2 = (typeof G !== 'undefined' ? G : window);
  const S = _S || _G2.S || window.S || (typeof S !== 'undefined' ? S : null);
  if (!S) { try { _G2.pk = null; } catch(_) {} try { if (typeof render === 'function') render(); } catch(_) {} return; }
  const _pk = _G2.pk;
  if (!_pk || !_pk.battle) { try { _G2.pk = null; } catch(_) {} try { if (typeof render === 'function') render(); } catch(_) {} return; } // v792 防御：pk已清空时直接关界面
  const b = _pk.battle;
  const _td = _pk.tribData || {}, trib = _td.trib || {}, fromRealm = _td.fromRealm;
  const win = (b.winner === b.A) || (b.B && b.B.hp < 1); // v848 看门狗调pkHandleOver时winner可能没设置，B.hp<1也算赢
  const _dr = b.round | 0;
  const _cu = (S.curseN|0) > 0 ? `（👻诅咒×${S.curseN}，心魔增强）` : '';
  try { log(win ? 'good' : 'bad', `👹 心魔来袭${_cu}，激战 ${_dr} 回合，${win ? '<b>斩灭心魔，道心稳固！</b>' : '<b class="r">不敌心魔，道心受损……</b>'}`); } catch(_) {}
      tribOmenBeat(S, win ? 'dWin' : 'dLose');
  try { trib.demon = { win, battle: b, pw: (typeof tribPower === 'function' ? tribPower(S) : 1) }; } catch(_) {}
  try { _G2.pk = null; } catch(_) { try { window.pk = null; } catch(_) {} }
  try { if (typeof pk !== 'undefined') pk = null; } catch(_) {} // v792 同步清主作用域pk
  if (!win) {
    try {
      S.thunderOk = false;
      const _ds = applyFailState(S, fromRealm);
      const lifeLost = Math.max(1, Math.floor((S.lifespan|0) * (S.race === 'ming' ? 0.05 : 0.10))); // v1088 冥族阴体：渡劫失败折寿减半
      S.lifespan = Math.max(1, (S.lifespan|0) - lifeLost);
      log('bad', `👹 心魔难斩，突破失败……道途已断，沦为【${_ds || S.degraded}】（卡9级后期），折寿 <span class="r">${lifeLost}</span> 年。`);
    } catch(_) {}
    try { afterAct(); } catch(_) {} try { commit(); } catch(_) {} try { render(); } catch(_) {}
    return;
  }
  try {
    S.thunderOk = false;
    const r = applyBtSuccess(S, fromRealm, trib);
    tribBattleSuccessLog(S, r);
  } catch(_e) { try { log('sys', '心魔胜利结算异常:' + (_e.message || _e)); } catch(_) {} }
  try { afterAct(); } catch(_) {} try { commit(); } catch(_) {} try { render(); } catch(_) {} // v792 确保界面一定关闭
}
window.finishDemonBattle = finishDemonBattle; // v808 暴露给Script1的pkHandleOver调用
function applyFailState(S, fromRealm) { // v589 突破失败进降级状态；v592 降级链中失败进第二个状态；v612 失败等级退1-9
  const _dchain = (typeof DEGRADE_CHAIN !== 'undefined') ? DEGRADE_CHAIN : null;
  const _dfail2 = (typeof DEGRADE_FAIL2 !== 'undefined') ? DEGRADE_FAIL2 : null;
  const back = 1 + Math.floor(Math.random() * 9);
  S.level = Math.max(1, (S.level|0) - back);
  S._failBack = back;
  if (_dchain && _dfail2 && S.degraded && _dchain.indexOf(S.degraded) >= 0) {
    S.degraded = _dfail2[S.degraded] || S.degraded;
    if (!S.failNum) S.failNum = {};
    S.failNum['chain'] = 2;
    if ((S.level|0) > 9) S.level = 9;
    return S.degraded;
  }
  if (!S.failNum) S.failNum = {};
  const n = Math.min(2, (S.failNum[fromRealm]|0) + 1);
  S.failNum[fromRealm] = n;
  const st = FAIL_STATES[fromRealm];
  S.degraded = st ? st[n-1] : null;
  if (n >= 2 && (S.level|0) > 9) S.level = 9;
  tribFailFlavor(S, fromRealm); return S.degraded;
}
function isPermanentlyDegraded(S) { //v590
  if (S.failNum && (S.failNum['chain']|0) >= 2) return true;
  return !!(S.failNum && (S.failNum[S.realm|0]|0) >= 2);
}
function useRepair(S,i){const c=DEGRADE_CHAIN[i];if(!c)return'无此物';const c2=DEGRADE_FAIL2[c],fx=[c,c2],tr=i,k='repair'+i;if((S.inv[k]|0)<=0)return'数量不足';if(!S.degraded||fx.indexOf(S.degraded)<0){try{if(typeof log==='function')log('sys',`[诊断]修复失败: degraded=${S.degraded}, 期望=${fx.join('/')}, i=${i}`);}catch(_){}return'状态不对';}S.inv[k]--;const f=S.degraded;if(f===c2){S.degraded=c;if(S.failNum){S.failNum['chain']=1;delete S.failNum[S.realm|0];}return'ok|'+f+'|'+c;}S.realm=tr;S.degraded=null;if(S.failNum){delete S.failNum[S.realm|0];delete S.failNum['chain'];}return'ok|'+f+'|'+REALMS[tr];}
function gradeFromFull(full) { // v176 按充满度定档（供 tribGrade / 天劫异变共用）
  let gi = K.TRIB_GRADES.length - 1;
  for (let i = 0; i < K.TRIB_GRADE_FULL.length; i++) if (full >= K.TRIB_GRADE_FULL[i]) { gi = i; break; }
  return { gi, name: K.TRIB_GRADES[gi], mult: K.TRIB_GRADE_MULT[gi], full };
}
function tribGrade(S) { // v175 金丹/元婴品质：按突破前灵气条/仙力充满度定档（压条 900% 圆满）；v1088 神族神血：压条结算 +100%（full 单位：1 = 100%，故 +1）
  return gradeFromFull(tribFull(S) + (S.race === 'shen' ? 1 : 0));
}
/* ---------- v867 灵根/法则 ---------- */
const LINGGEN_ELEMS = ['金','木','水','火','土'];
const LINGGEN_ATTR = {金:'str', 木:'vit', 水:'agi', 火:'int', 土:'def'};
const LINGGEN_ELE_ICON = {金:'⚙️', 木:'🌿', 水:'💧', 火:'🔥', 土:'🪨', 雷:'⚡', 冰:'❄️', 风:'🌪️', 光:'☀️', 暗:'🌑', 毒:'☣️'}; // v1139 毒：丹毒 5000 觉醒的特殊异灵根
const ROOT_MUT = { '金': '雷', '水': '冰', '木': '风', '火': '光', '土': '暗' }; // v1130 变异出满 5 种（Ye 定光/暗补火/土）
const ROOT_BASE = { '雷': '金', '冰': '水', '风': '木', '光': '火', '暗': '土' }; // 变异根的来源行
function rootBaseL(e) { return ROOT_BASE[e] || e; }
function mutRootL(e) { const m = ROOT_MUT[e]; return (m && Math.random() < 0.05) ? m : e; } // 5% 变异掷（抽根/灵物定行共用）
function hasRootEleL(S, baseEle) { return (S.lingGen || []).some(r => rootBaseL(r) === baseEle); } // 是否拥有某行（变异根算来源行）
function eleFactorL(S, e) { // v1130 吃丹倍率（Ye 定）：同种 100%；同系 80%（异灵根吃来源行丹 / 来源根吃变异丹）；变异根+来源根俱全吃变异丹 130%（双根共鸣）；完全不对行 50%
  const g = S.lingGen || [], has = x => g.indexOf(x) >= 0;
  if (has(e)) return (ROOT_BASE[e] && has(ROOT_BASE[e])) ? 1.3 : 1;
  if (ROOT_BASE[e]) return has(ROOT_BASE[e]) ? 0.8 : 0.5;
  for (const r of g) if (ROOT_BASE[r] === e) return 0.8;
  return 0.5;
}
function eleNoteL(f) { return f >= 1.3 ? '双根共鸣+30%' : f >= 1 ? '' : f >= 0.8 ? '同系80%' : '不对行50%'; }
function tryAwakenRoot(S, base) { // v1134 灵根觉醒：必须现有基础灵根（基础形态在册），5% 觉醒为对应异灵根；成功返回异灵根名
  const g = S.lingGen || [], i = g.indexOf(base), m = ROOT_MUT[base];
  if (i < 0 || !m || Math.random() >= 0.05) return null;
  g[i] = m;
  return m;
}
function awakenRollAll(S) { // v1134 突破觉醒：每条现有基础灵根各判一次
  const out = [];
  for (const base of LINGGEN_ELEMS) { const m = tryAwakenRoot(S, base); if (m) out.push(base + '→' + m); }
  return out;
}
const HERB_ELE = { h_str: '金', h_vit: '木', h_agi: '水', h_int: '火', h_def: '土' }; // v1136 属性草对应行（LINGGEN_ATTR 反查）
function herbEatenToday(S) { const d = new Date().toISOString().slice(0, 10); return (S.herbEat && S.herbEat.d === d) ? (S.herbEat.n | 0) : 0; }
function eatHerb(S, key) { // v1136 Ye 定：属性草每天可吃 5 棵——饱食 +20、对应属性 +1、丹毒 +20；带 v1134 觉醒 / v1135 领悟判定
  const e = HERB_ELE[key]; if (!e) return null;
  if (!S.mats || (S.mats[key] | 0) <= 0) return { err: 'none' };
  const d = new Date().toISOString().slice(0, 10);
  if (!S.herbEat || S.herbEat.d !== d) S.herbEat = { d, n: 0 };
  if ((S.herbEat.n | 0) >= 5) return { err: 'daily' };
  S.mats[key]--; if (S.mats[key] <= 0) delete S.mats[key];
  S.herbEat.n++;
  S.hunger = Math.min(100, (S.hunger | 0) + 20);
  const attr = LINGGEN_ATTR[e];
  if (!S.attrs) S.attrs = {};
  S.attrs[attr] = (S.attrs[attr] | 0) + 1;
  addDanDu(S, 20);
  const awakened = tryAwakenRoot(S, e);
  const comprehended = awakened ? null : tryComprehendRoot(S, e);
  return { ok: 1, e, attr, n: S.herbEat.n, awakened, comprehended };
}
function tryToxRoot(S) { // v1141 Ye 定：只在突破成功时掷一次觉醒异灵根【毒】——丹毒 ≥5000 起判，基础概率 5%，丹毒每多 10 点 +0.1%（6000→15%，10000→55%）；额外灵根不占五行，须已有灵根承载
  if ((S.danDu | 0) < 5000) return null;
  const g = S.lingGen || [];
  if (g.indexOf('毒') >= 0) return null;
  if (!g.some(e => e !== '毒')) return null;
  const p = 0.05 + Math.floor(((S.danDu | 0) - 5000) / 10) * 0.001;
  if (Math.random() >= p) return null;
  g.push('毒');
  S.faZeDone = 0; // 灵根变化，本命圆满需重判
  return '毒';
}
function tryComprehendRoot(S, e) { // v1135 Ye 定：吃不相对应的灵物/丹药，极稀有概率（0.1%）领悟从未拥有的灵根（得基础根，灵根未满 5 条时）
  const base = rootBaseL(e);
  if (hasRootEleL(S, base)) return null;
  if (!Array.isArray(S.lingGen)) S.lingGen = [];
  if (S.lingGen.filter(e => e !== '毒').length >= 5) return null; // v1139 毒根不占常规灵根数
  if (Math.random() >= 0.001) return null;
  S.lingGen.push(base);
  S.faZeDone = 0; // 灵根变化，本命圆满需重判（与补天丹同规）
  return base;
}
function assignLingGen(S) { // 练气突破随机灵根：1-5条加权
  if (S.lingGen && S.lingGen.length) return S.lingGen;
  const r = Math.random();
  const n = r < 0.10 ? 1 : r < 0.30 ? 2 : r < 0.60 ? 3 : r < 0.85 ? 4 : 5;
  const pool = LINGGEN_ELEMS.slice(), gen = [];
  for (let i = 0; i < n; i++) gen.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]); // v1134 只出基础灵根，变异靠后天觉醒
  S.lingGen = gen;
  return gen;
}
function lingGenName(S) {
  const g = S.lingGen || [];
  if (!g.length) return '未觉醒';
  const t = g.length === 1 ? '天灵根' : g.length === 2 ? '上品灵根' : g.length === 3 ? '中品灵根' : g.length === 4 ? '下品灵根' : '杂灵根'; // v876 品级显示
  return t + '·' + g.map(e => LINGGEN_ELE_ICON[e] || e).join(''); // v876 元素用图标显示
}
function ensureLingGen(S) { // 老存档补抽
  if (S && (S.realm|0) >= 1 && !(S.lingGen && S.lingGen.length)) {
    assignLingGen(S);
    try { log('good', `🌟 灵根觉醒：<b>${lingGenName(S)}</b>！`); } catch(_) {}
  }
}
function lingGenTrainBonus(S) { // 修炼加成概率
  const n = (S.lingGen && S.lingGen.length) || 0;
  return n === 1 ? 0.25 : n === 2 ? 0.15 : n === 3 ? 0.08 : n === 4 ? 0.03 : 0;
}
function lingGenAfkMult(S) { // 闭关收益系数：五档齐全；v1133 Ye 定方案二：异灵根每条扣 10 个百分点，带满 5 条收益对半（10 变 5，非归零）
  const g = S.lingGen || [], n = g.length;
  const base = n === 1 ? 0.30 : n === 2 ? 0.15 : n === 3 ? 0.05 : n === 4 ? -0.10 : n >= 5 ? -0.20 : 0;
  const k = g.filter(r => ROOT_BASE[r] || r === '毒').length; // v1139 毒根也是异灵根，计入闭关扣点
  return (1 + base) * (1 - 0.1 * k) - 1;
}
function lingGenAfkTxt(S) { // 闭关加成显示
  const m = lingGenAfkMult(S);
  return (m > 0 ? '+' : '') + Math.round(m * 100) + '%';
}
function lingGenTrainTxt(S) { // 修炼加成显示
  return Math.round(lingGenTrainBonus(S) * 100) + '%';
}
function faZeBonus(S) { // 法则战斗加成：{attr: mult}；v871本命只加对应灵根属性统一+5%；v872五行圆满各属性+5%
  const out = {};
  try {
    const fz = S.faZe || {}, lg = S.lingGen || [], n = lg.length;
    for (const el of LINGGEN_ELEMS) if ((fz[el]|0) >= 100) out[LINGGEN_ATTR[el]] = 0.15;
    const allFive = LINGGEN_ELEMS.every(e => (fz[e]|0) >= 100);
    const lgF = lg.filter(e => e !== '毒'); // v1139 毒根无法则，不计本命
    const allMine = lgF.length > 0 && lgF.every(e => (fz[rootBaseL(e)]|0) >= 100); // v1129 变异根按来源行判本命
    if (allFive) ATTRS.forEach(k => out[k] = (out[k]||0) + 0.05);
    else if (allMine) lgF.forEach(el => { const k = LINGGEN_ATTR[rootBaseL(el)]; out[k] = (out[k]||0) + 0.05; });
  } catch(_) {}
  return out;
}
function faZeBtBonus(S) { // v873 法则主宰突破加成：本命圆满+5%×灵根数，五行圆满+25%
  try {
    const fz = S.faZe || {}, lg = S.lingGen || [], n = lg.length;
    if (LINGGEN_ELEMS.every(e => (fz[e]|0) >= 100)) return 0.25;
    const lgF = lg.filter(e => e !== '毒'); // v1139 毒根不计本命
    if (lgF.length > 0 && lgF.every(e => (fz[rootBaseL(e)]|0) >= 100)) return 0.05 * lgF.length; // v1129 变异根按来源行
  } catch(_) {}
  return 0;
}
function faZeBenMingTxt(S) { // v873 本命圆满加成显示
  const n = (S.lingGen||[]).filter(e => e !== '毒').length; // v1139 毒根不计
  return `对应灵根属性各+5%，突破主宰成功率+${5 * n}%`;
}
try { window.LG = { ELES: LINGGEN_ELEMS, ATTR: LINGGEN_ATTR, ICON: LINGGEN_ELE_ICON, assign: assignLingGen, name: lingGenName, ensure: ensureLingGen, trainBonus: lingGenTrainBonus, afkMult: lingGenAfkMult, afkTxt: lingGenAfkTxt, trainTxt: lingGenTrainTxt, faZeBonus: faZeBonus, faZeBtBonus: faZeBtBonus, benMingTxt: faZeBenMingTxt, base: rootBaseL, hasEle: hasRootEleL, factor: eleFactorL, mut: mutRootL, MUT: ROOT_MUT, tryAwaken: tryAwakenRoot, awakenAll: awakenRollAll, comprehend: tryComprehendRoot }; } catch(_) {} // v1129 变异助手 // v867 跨script块用window.LG
function applyBtSuccess(S, fromRealm, trib) { // v174 突破成功进境（供 breakthrough / finishTribQuiz 共用）
  S.thunderOk = false; S._trigFail = 0; S._succFail = 0; // v659 突破后重置雷云判定
  const _dchain = (typeof DEGRADE_CHAIN !== 'undefined') ? DEGRADE_CHAIN : null;
  if (_dchain && S.degraded && _dchain.indexOf(S.degraded) >= 0) {
    // v592 降级链中突破成功：进下一个链状态，属性不翻倍
    const _idx = _dchain.indexOf(S.degraded);
    if (_idx < _dchain.length - 1) {
      S.degraded = _dchain[_idx + 1];
      S.level = 1; S.xp = 0;
      S.btTotal = (S.btTotal || 0) + 1;
      chatPush(S, '', `🎉 ${S.name || '道友'}突破至【${S.degraded}】！`, true, true);
      return { ok: true, realm: S.degraded, manaDoubled: false, trib, grade: null, mult: 1 };
    } else {
      S.degraded = null; // 链尾则清除（理论上不应发生）
    }
  } else {
    S.degraded = null; // v591 正常突破成功清除降级状态
  }
  let _btm = BT_MULT[Math.min(11, fromRealm | 0)] || 1, gradeName = null;
  if (fromRealm >= 2) { // v175 筑基→金丹结金丹、金丹→元婴结元婴：品质替代原突破倍率；v284 元婴以上也有品质（v176：天劫异变按异变档位；v180：压条 1000% 为极）
    let g = trib && trib.jackpot ? gradeFromFull(trib.jackpot.full) : tribGrade(S);
    const isJi = !(trib && trib.jackpot) && tribFull(S) >= 29; // v1172 Ye 定：2900% 为圆满极限
    // v750 三条件加品：击溃雷云 + 问心全对 + 心魔战打赢（若触发）→ 按完成数给概率；v755 非击溃不加品
    const _koWin = trib && trib.thunder && trib.thunder.koWin;
    if (!_koWin) {
      // 扛过雷云：无品级加成，直接按基础品质突破
    } else {
    const _quizPerfect = trib && trib.quizMet && (trib.quizCorrect|0) >= 3;
    const _demonOk = !trib.demonAfterQuiz || (trib.demon && trib.demon.win);
    const _doneCount = (_koWin ? 1 : 0) + (_quizPerfect ? 1 : 0) + (_demonOk ? 1 : 0);
    const _upP = _doneCount / 3; // 1个33.33%，2个66.67%，3个100%
    const _rollUp = Math.random() < _upP;
    if (!isJi && _rollUp && _doneCount > 0 && g.gi > 0 && g.gi <= 3) { // v634/v732
      g = { gi: g.gi - 1, name: K.TRIB_GRADES[g.gi - 1], mult: K.TRIB_GRADE_MULT[g.gi - 1], full: g.full };
      try { (typeof log === 'function' ? log : window.__log || function(){})('good', `⚡ 天道嘉奖（${_doneCount}/3），品质 <span class="g">+1</span>！`); } catch(_) {}
    }
    if (!isJi && _rollUp && _doneCount > 0 && g.gi === 4) { // v731 保底中品
      g = { gi: 3, name: K.TRIB_GRADES[3], mult: K.TRIB_GRADE_MULT[3], full: g.full };
      try { (typeof log === 'function' ? log : window.__log || function(){})('good', `⚡ 天道嘉奖（${_doneCount}/3），保底 <span class="g">中品</span>！`); } catch(_) {}
    }
    }
    _btm = isJi ? K.TRIB_GRADE_JI_MULT : g.mult;
    gradeName = g.name + REALMS[fromRealm + 1] + (isJi ? '极限' : ''); // v1172 Ye 定名：圆满极限
    if (fromRealm === 2) S.danGrade = gradeName; else if (fromRealm === 3) S.yingGrade = gradeName;
  }
  if (fromRealm === 0 && S.xp > 0) S.savedXp = (S.savedXp || 0) + S.xp; S.realm++; S.lifespan = Math.max((S.lifespan|0) * 2, REALM_LIFESPAN[Math.min(12, S.realm|0)] || 100); S.level = 1; S.xp = 0; S.btTotal = (S.btTotal || 0) + 1;
  if (fromRealm === 0) { assignLingGen(S); try { log('good', `🌟 踏入练气，灵根觉醒：<b>${lingGenName(S)}</b>！`); } catch(_) {} } // v867 练气突破随机灵根
  else { const _aw = awakenRollAll(S); if (_aw.length) try { log('good', `🌟 <b>突破之机，灵根觉醒！</b>${_aw.join('、')}`); } catch(_) {} } // v1134 突破觉醒：须现有基础灵根，每条 5%
  const _toxR = tryToxRoot(S); if (_toxR) try { log('gold', `☣️ <b>丹毒淬体，突破之机觉醒异灵根【毒】！</b>`); } catch(_) {} // v1141 突破也掷一次毒根觉醒（丹毒 ≥5000，概率随丹毒涨）
  const _toxD = tryToxDan(S, fromRealm); if (_toxD) try { log('gold', `☣️ <b>丹毒凝聚成丹——结出【毒丹】！</b>自此丹毒溢出将入累积池`); } catch(_) {} // v1145 结毒丹（仅金丹突破判）
  if (gradeName) { S.realmGrades = S.realmGrades || {}; S.realmGrades[S.realm] = gradeName; } // v857 修v856：realm++后存到新境界索引 chatPush(S, '', (gradeName ? `🎉 ${S.name || '道友'}结成【${gradeName}】，突破至【${REALMS[S.realm]}】！` : `🎉 ${S.name || '道友'}突破至【${REALMS[S.realm]}】！`), true, true); if (/散仙|游仙|虚气|伪气|虚基|残基|虚丹|假丹|虚婴|假婴|虚神|散神|伪乘|残乘|怯劫|避劫|劫余|残仙|虚合|假合|伪尊|空尊|凡胎|燃尽/.test(REALMS[S.realm]||'')) _btm = 1.2; // v811 降级状态突破倍率1.2
  ATTRS.forEach(k => S.attrs[k] = Math.max(1, Math.round(S.attrs[k] * _btm))); if (S.realm === 8) { const _mm = manaMax(S); S.mana = Math.floor(Math.max(S.mana, _mm) / 1000000); S.xianCap = Math.max(10, S.mana); } tribBtFlavor(S, fromRealm); return { ok: true, realm: REALMS[S.realm], manaDoubled: true, trib, grade: gradeName, mult: _btm };
} // 突破全属性×倍率表；渡劫→仙人时100万法力=1仙力转换，上限=转换后值
function finishTribQuiz(S, quiz, answers) { // v174 心魔问心结算：答对 TRIB_QUIZ_NEED 道即过；v739 答题后50%遇心魔战斗；v746 补thunder.koWin
  const qs = (quiz && quiz.qs) || []; let correct = 0; const detail = qs.map((qq, i) => { const hit = (answers[i] | 0) === (qq.ans | 0); if (hit) correct++; return hit; });
  const trib = { quizMet: true, quizCorrect: correct, quizDetail: detail, jackpot: (quiz && quiz.jackpot) || null, thunder: { koWin: !!(quiz && quiz.koWin) } };
  if (correct < K.TRIB_QUIZ_NEED) { const _fr = (S.realm|0); const _ds = applyFailState(S, _fr); const lifeLost = Math.max(1, Math.floor((S.lifespan|0) * (S.race === 'ming' ? 0.05 : 0.10))); S.lifespan = Math.max(1, (S.lifespan|0) - lifeLost); return { ok: false, back: 0, tribFail: 'demon-quiz', trib, lifeLost, degraded: _ds }; } // v589 失败进降级状态；v1088 冥族阴体：渡劫失败折寿减半
  const _demonP = quiz.koWin ? 0.7 : 0.5; // v739 答题后遇心魔战斗：击溃雷云70%，否则50%
  if (Math.random() < _demonP) { trib.demonAfterQuiz = true; return { ok: null, pending: 'demon', trib, fromRealm: quiz.fromRealm | 0 }; }
  return applyBtSuccess(S, quiz.fromRealm | 0, trib);
}
function breakthrough(S) { // 突破：成功进下境1级，全属性×突破倍率表（凡人→练气×1，练气→筑基×1.1…每境+0.1）；失败不清空退1-9级
  if (S.dead) return { err: 'dead' };
  if (S.forceReinc || (S.lifespan|0) <= 0) return { err: 'nolife' }; // v182 寿元耗尽未死（强制轮回）：不再误报已死亡
  if (S.level < REALM_MAX_LV || S.realm >= REALMS.length - 1) return { err: 'cond' };
  if ((S.realm|0) === 10) { S.sanShi = S.sanShi || [0,0,0]; if (S.sanShi.filter(x=>x).length < 3) return { err: 'sanshi' }; } // v818 合体突破需先斩三尸
  const _hpForBt = S.hpCur != null ? (S.hpCur|0) : 1; if ((_hpForBt + (S.advVit|0) * 5) <= 0) return { err: 'nohp' }; // 0血无法突破（黄条也算；hpCur=null为满血）
  if ((S.realm|0) >= 1) { const _mmBt = manaMax(S); if (_mmBt > 0 && (S.mana|0) < _mmBt) return { err: 'nomana' }; } // v177 法力未满 100/100 不能突破（凡人用经验，不限）
  if (S.thunderOk && (S.realm|0) >= 2) { const fromRealm = S.realm; let trib = {}; return { ok: null, pending: 'thunder', trib, fromRealm, thunderPw: null }; } // v681 thunderOk直接进战斗
  if (R() < breakthroughRate(S)) { const fromRealm = S.realm;
    let trib = null;
    if ((fromRealm|0) >= 2) { // v172 筑基→金丹起：判定成功后先渡雷劫，雷劫后概率遇心魔劫
      trib = {};
      if ((fromRealm === 2 || fromRealm === 3) && tribFull(S) <= 2 && R() < K.TRIB_JACKPOT_P) { // v176 天劫异变：压条≤200% 时 1% 撞上高阶雷劫；v638 中品/上品基础最高到完美
        const _baseGi = tribGrade(S).gi; // 0圆满1完美2上品3中品4下品（v1088 神族神血走有效压条）
        const _pool = [3, 2, 1].filter(gi => gi < _baseGi); // 只取比基础高的中品/上品/完美，不含圆满
        if (_pool.length > 0) {
          const _gi = _pool[Math.floor(Math.random() * _pool.length)];
          const _fullMap = {3: 2, 2: 5, 1: 7}; // gi->full
          const _jt = _fullMap[_gi];
          trib.jackpot = { full: _jt, pw: 1 + _jt / 9 * (K.TRIB_POWER_MAX - 1) };
        }
      }
      return { ok: null, pending: 'thunder', trib, fromRealm, thunderPw: trib.jackpot ? trib.jackpot.pw : null }; // v654 雷劫改手动战斗
    }
    S.thunderOk = false; return applyBtSuccess(S, fromRealm, trib); }
  S.thunderOk = false; const _ds4 = applyFailState(S, S.realm); return { ok: false, back: 0, degraded: _ds4 };
} // v589 失败进降级状态
// v136 前世遗物过期：练气遗物3世未觉醒消散，每高一境多1世（筑基4/金丹5/…/主宰14）
function sealMaxLives(seal) { return (seal.realm | 0) + 2; }
function sealRemainLives(seal, curLife) { return Math.max(0, sealMaxLives(seal) - ((curLife | 0) - (seal.life | 0))); }
C.sealMaxLives = sealMaxLives; C.sealRemainLives = sealRemainLives;
function reincarnate(S, keepAttr, sealInfo) { // 轮回：回到凡人1级，选定属性封存为物品（需突破觉醒胎中之谜+灵魂印记才能继承）；主宰轮回则前面各境池+1，否则次数记在轮回前所在境界（任何时候可用）
  if (S.dead) return { err: 'dead' };
  const _outStar = (() => { try { return destinyStar(S).n; } catch(_) { return ''; } })(); // v1013 前世谱：记录将逝一世
  const _outFate = (() => { const f = fateSignOf(S); return f ? f.n : ''; })();
  const _outFrom = REALMS[S.realm | 0] || '';
  // 百世书：轮回前全属性快照，必须在下方任何重置之前取（realm/level/attrs/lifespan 都会被清）
  const _outDetail = (() => {
    try {
      const _a = S.attrs || {};
      return {
        name: S.name || '', gender: S.gender || '', race: S.race || '',
        realm: S.realm | 0, level: S.level | 0,
        attrs: { str: Number(_a.str) || 0, agi: Number(_a.agi) || 0, def: Number(_a.def) || 0, vit: Number(_a.vit) || 0, int: Number(_a.int) || 0 },
        life: (S.sealLife | 0) + 1,
        lifespan: Number(S.lifespan) || 0, lifespanMax: REALM_LIFESPAN[S.realm | 0] || 0,
        roots: Array.isArray(S.lingGen) ? S.lingGen.slice() : [],
        gold: Number(S.gold) || 0,
        ts: Date.now()
      };
    } catch(_) { return null; }
  })();
  let n, from;
  if (!Array.isArray(S.reinc)) S.reinc = new Array(13).fill(0);
  const isPerfect = S.level >= REALM_MAX_LV;
  // 走过的低境界（练气起至当前境界-1）必已大圆满突破，各池+1；当前境界只有大圆满才+1
  // 如金丹大圆满轮回：练气/筑基/金丹各+1=3；金丹未大圆满：练气/筑基各+1=2
  const upTo = isPerfect ? S.realm : S.realm - 1;
  let maiGain = 0;
  if (upTo >= 1) {
    for (let i = 1; i <= upTo; i++) S.reinc[i] = (S.reinc[i] || 0) + 1;
    n = S.reinc[Math.min(S.realm, upTo)]; from = REALMS[S.realm] + (isPerfect ? '' : '（未大圆满）');
    maiGain = upTo; // 每个池子奖励1个开脉丹
    if (!S.inv) S.inv = {}; S.inv['mai'] = (S.inv['mai'] || 0) + maiGain;
  } else { n = 0; from = REALMS[S.realm] + '（未大圆满）'; }
  const keepVal = keepAttr && S.attrs ? S.attrs[keepAttr] : null;
  const backXp = S.savedXp || 0; S.savedXp = 0; // 只返还凡人突破存的经验
  const _sealLife = (S.sealLife | 0) + 1; S.sealLife = _sealLife; // 第几世
  // v136 轮回时清除过期遗物（未在限定世数内觉醒）
  let _expired = [];
  if (Array.isArray(S.sealed) && S.sealed.length) {
    _expired = S.sealed.filter(x => sealRemainLives(x, _sealLife) <= 0);
    if (_expired.length) S.sealed = S.sealed.filter(x => sealRemainLives(x, _sealLife) > 0);
  }
  const _fromRealm = S.realm | 0; const _fromLevel = S.level | 0; // 轮回前境界/等级（禁忌判主宰大圆满用）
  S.realm = 0; S.level = 1; S.xp = backXp; S.lifespan = 100; S.qixi = 0; S.shenshi = 1; S.flowerSetsClaimed = 0; // v938 轮回神识气息都清零
  // 轮回：选定属性封存为物品（不再直接继承），其他重置为1；不选则全重置为1
  let _seal = null;
  if (keepAttr) {
    if (!S.sealed) S.sealed = [];
    _seal = { id: Date.now() + '_' + Math.floor(Math.random() * 1000), name: ('前世' + _sealLife), playerName: S.name || '', attr: keepAttr, value: Math.max(1, Math.floor(+keepVal || 1)), realm: _fromRealm, life: _sealLife, seal: (sealInfo && sealInfo.seal) || '', sealTheme: (sealInfo && sealInfo.sealTheme) || '', sealTpl: (sealInfo && sealInfo.sealTpl) || '', sealHint: (sealInfo && sealInfo.sealHint) || '', sealAns: (sealInfo && sealInfo.sealAns) || '', sealName: (sealInfo && sealInfo.sealName) || '', gender: S.gender || null, avatar: (S.avatar|0) || 0 }; // v135 保存上一世头像；v206 印记主题；v209 存玩家名；v216 求名模板；v219 提示句；v220 下半句答案
    S.sealed.push(_seal);
  }
  ATTRS.forEach(k => S.attrs[k] = 1);
  S.vitPeak = S.attrs.str + S.attrs.def + S.attrs.vit; S.manaMult = 1; // 轮回重置血量峰值与法力上限倍率
  S.mana = Math.max(0, Math.min(manaCapEff(S), S.mana | 0)); // v1091 轮回法力钳制：高境轮回后法力不得超新上限（此前 500 法力对 30 上限挂着）
  if (S.status) { S.status.bleed = false; S.status.poison = false; S.status.bleedBase = 0; S.status.poisonBase = 0; S.status.bleedFrac = 0; S.status.poisonFrac = 0; S.status.curse = false; S.status.depress = false; } // 轮回清除所有负面状态：流血/中毒/诅咒/抑郁
  S.shenzangDan = new Array(13).fill(0); S.danDu = 0; szSyncMai(S); // v998 轮回丹毒全清；v1037 轮回只清丹开的穴，气旋进度保留不清；v1058 Ye 定：规则/显示/闭关统一跟虚实模型走，清丹后当场重算虚络/虚脉
  if (S.achv) delete S.achv['baidu']; if (S.titleAch === 'baidu') S.titleAch = ''; // v1140 百毒不侵称号轮回消失
  S.toxDan = 0; S.toxPool = 0; // v1145 毒丹与累积池随轮回消散
  // v1037 轮回：气旋保留不清，只清丹开的穴；实络/实脉/开脉术保留
  S.degraded = null; if (S.failNum) S.failNum = {}; // v613 轮回清零降级状态
  S.butianTaken = {}; // v867 轮回：补天丹每境界计数清零（新一世重算），灵根/法则进度保留
  S.faZe = {}; S.faZeDone = 0; S.faZeDone5 = 0; // v875 轮回：参悟法则进度清空（灵根保留）
  S.yinQi = 0; // v116 轮回清零引气入体
  S.skills = []; // 轮回后技能消失，需用技能书重学（技能书/残页保留）
  S.hpCur = null; // 轮回回满血
  S.afk = null; // 轮回强制结束闭关
  S.adv = null; // 轮回强制结束冒险
  S.stamina = Math.max(5, S.stamina|0); // 轮回保底5点体力
  S.lifeChoice = null; // v98 轮回：生活技能重选（各技能等级/经验全保留）
  S.lifeChoices = []; // v98 轮回：清空生活技能选择，重选（各技能等级/经验全保留）
  if (S.stats) { S.stats.afkSecs = 0; S.stats.adv = 0; S.stats.advWin = 0; S.stats.pk = 0; S.stats.pkWin = 0; S.stats.checkins = 0; } // 轮回清零本世战绩/签到/闭关，历世累计保留
  const _fate = drawFateSign(S); // v1012 宿命签：入新一世抽一签
  S.pastLives = Array.isArray(S.pastLives) ? S.pastLives : []; S.pastLives.push({ n, from: _outFrom, star: _outStar, fate: _outFate, seal: _seal ? String(_seal.value || _seal.name || '').slice(0, 30) : '', detail: _outDetail }); if (S.pastLives.length > 50) S.pastLives = S.pastLives.slice(-50); // v1013 前世谱
  try { // v1165 百世书服务端登记：轮回当场往服务端记一笔（只追加不可改）；离线/失败不拦轮回，登录后 tail.baishiSync 补登
    if (window.MHXY && window.MHXY.api && window.MHXY.loggedIn && window.MHXY.loggedIn()) {
      const _bsE = S.pastLives[S.pastLives.length - 1];
      if (_bsE && _bsE.detail) window.MHXY.api('/api/baishi/register', { method: 'POST', body: { entry: _bsE } }).then(r => { if (r && r.ok && r.json && r.json.ok) _bsE.detail.reg = 1; }).catch(() => {});
    }
  } catch(_) {}
  if (_fromRealm >= 12 && _fromLevel >= 10) S.taboo = Math.min(100, (S.taboo | 0) + 10); const _tabooAwoke = !S.tabooAwake && (S.taboo | 0) >= 100; if (_tabooAwoke) S.tabooAwake = true; // v1013 禁忌苏醒度：仅主宰大圆满轮回才 +10（Ye 定）
  return { ok: true, n, from, keepAttr, maiGain, seal: _seal, expired: _expired, fate: _fate, taboo: S.taboo | 0, tabooAwoke: _tabooAwoke };
}
/* ---------- 榜单 ---------- */
const RANK_PLAYER_NAMES = ['剑啸江湖','一叶知秋','夜雨声烦','君莫笑','逍遥散人','青衫仗剑','月下独酌','风清扬','令狐冲','小龙女','杨过','郭靖','黄蓉','张无忌','赵敏','韦小宝','虚竹','段誉','王语嫣','乔峰','阿朱','西门吹雪','叶孤城','陆小凤','花满楼','楚留香','李寻欢','阿飞','沈浪','萧十一郎','傅红雪','叶开','陆小凤','花满楼','司空摘星','朱七七','沈珊姑','白飞飞','林诗音','孙小红','老实和尚','古松居士','木道人','石鹤','严独鹤','高立','金七两','丁鹏','柳若松','谢晓峰','燕十三','慕容秋荻','小丽','孙小蝶','林仙儿','白飞飞','朱七七','沈珊姑','赵香灵','丁白云','花寡妇','屠娇娇','燕南天','邀月','怜星','江小鱼','花无缺','铁心兰','苏樱','张菁','顾人玉','黑蜘蛛','萧咪咪','哈哈儿','杜杀','李大嘴','阴九幽','轩辕三光','欧阳丁','白开心','黄鸡大师','恶通天','慕容九','江玉郎','江别鹤','花月奴','夜帝','南宫协','王云梦','柴玉关','独孤一鹤','阎铁珊','霍天青','霍休','上官飞燕','柳余恨','金九龄','公孙大娘','欧阳情','孙秀青','石秀雪','马秀真','叶秀珠'];
function genRankNPCs() {
  // 模拟100个真人玩家：不同投入度（休闲/活跃/肝帝），进度按真实玩家分布
  const npcs = [];
  const names = RANK_PLAYER_NAMES.slice().sort(() => R() - 0.5).slice(0, 100);
  for (const name of names) {
    const r = R(), type = r < 0.6 ? 0 : r < 0.9 ? 1 : 2; // 0休闲 1活跃 2肝帝
    const days = type === 0 ? 1 + Math.floor(R() * 7) : type === 1 ? 7 + Math.floor(R() * 23) : 20 + Math.floor(R() * 40);
    let realm = Math.min(12, Math.floor(days / 3 + R() * 2));
    if (type === 2) realm = Math.min(12, realm + 2);
    const level = 1 + Math.floor(R() * 10);
    const base = Math.pow(2.1, realm) * (1 + level * 0.12);
    const focus = ['str','agi','def','vit','int'][Math.floor(R() * 5)];
    const attrs = {};
    for (const k of ['str','agi','def','vit','int']) attrs[k] = Math.max(1, Math.floor(base * (k === focus ? 1.5 : 0.8 + R() * 0.4)));
    const checkins = type === 0 ? 1 + Math.floor(R() * 10) : type === 1 ? 10 + Math.floor(R() * 30) : 30 + Math.floor(R() * 100);
    const afkSecs = Math.floor(checkins * (2 + R() * 6) * 3600 * (type === 2 ? 1.5 : 1));
    const meridians = type === 2 ? Math.floor(R() * 20) : Math.floor(R() * 8);
    const lifespan = Math.max(1, Math.floor(REALM_LIFESPAN[Math.min(12, realm)] * (0.3 + R() * 0.7)));
    let pet = null;
    if (R() < (type === 2 ? 0.8 : type === 1 ? 0.5 : 0.2)) { const pk = ['fox','turtle','zhuque','qinglong','baihu'][Math.floor(R() * 5)]; pet = { k: pk, lv: 1 + Math.floor(R() * 30) }; }
    npcs.push({ name, realm, level, attrs, checkins, afkSecs, meridians, lifespan, pet });
  }
  return npcs;
}
function rankScore(e, key) { // key: 'level' 或属性名或 'checkin'
  if (key === 'level') return e.realm * 100 + e.level;
  if (key === 'checkin') return e.checkins || 0;
  if (key === 'afk') return e.afkSecs || 0;
  return e.attrs[key] || 0;
}
function getRankList(S, key) {
  const npcs = genRankNPCs();
  const _ap = activePet(S);
  const me = { name: '你', realm: S.realm, level: S.level, attrs: Object.assign({}, S.attrs), checkins: (S.stats && S.stats.checkins) || 0, afkSecs: (S.stats && S.stats.afkSecs) || 0, meridians: C.maiLuo(S) + C.maiMai(S), maiPerm: (S.maiRLuo|0) + (S.maiRMai|0), lifespan: (S.lifespan|0), pet: _ap ? { k: _ap.k, lv: _ap.lv } : null, isMe: true };
  const all = npcs.concat([me]);
  all.sort((a, b) => rankScore(b, key) - rankScore(a, key));
  return all.slice(0, 20).map((e, i) => ({ rank: i + 1, ...e }));
}
// 砸开极品灵石：每块得 SMASH_N 块一~上品灵石，按基础掉落权重（sp1~sp4 重新归一）逐块独立掷骰
const SMASH_N = 10, SMASH_KEYS = ['sp1', 'sp2', 'sp3', 'sp4'];
const smashProbs = () => { const t = SMASH_KEYS.reduce((a, k) => a + ORES[k].p, 0), o = {}; SMASH_KEYS.forEach(k => o[k] = ORES[k].p / t); return o; };
function smashSpirit(S, n) {
  n = Math.min(Math.floor(n || 1), S.ores.sp5 || 0); if (n <= 0) return null;
  S.ores.sp5 -= n; if (!S.ores.sp5) delete S.ores.sp5;
  const pr = smashProbs(), got = {};
  for (let i = 0; i < n * SMASH_N; i++) { let r = R(), k = SMASH_KEYS[SMASH_KEYS.length - 1]; for (const kk of SMASH_KEYS) { if (r < pr[kk]) { k = kk; break; } r -= pr[kk]; } got[k] = (got[k] || 0) + 1; }
  SMASH_KEYS.forEach(k => { if (got[k]) S.ores[k] = (S.ores[k] || 0) + got[k]; });
  return { n, got };
}
function useSpirit(S, k, n) {
  const it = ORES[k]; if (!it || !it.extra) return null;
  n = Math.min(n || 1, S.ores[k] || 0); if (n <= 0) return null;
  S.ores[k] -= n; if (!S.ores[k]) delete S.ores[k];
  if (it.lvl) return { n, xp: 0, ups: levelUp(S, it.lvl * n) };
  return { n, xp: it.xp * n, ups: gainXp(S, it.xp * n) };
}
function useLu(S, k, n) { // 服用凝露：每点随机加到一项属性
  const it = LU[k]; if (!it) return null;
  n = Math.min(n || 1, S.mats[k] || 0); if (n <= 0) return null;
  S.mats[k] -= n; if (!S.mats[k]) delete S.mats[k];
  const gains = randomGains(it.pts * n); for (const a in gains) S.attrs[a] += gains[a];
  return { n, pts: it.pts * n, gains };
}

function canCheckin(S) { return S.lastCheckin !== todayStr(); }
const vigorGain = S => K.VIGOR_BASE + Math.floor(S.level / 2), vigorCap = S => 10;
function checkinAmount(S) { const totalLv = (S.realm|0) * 10 + (S.level|0); const base = K.CHECKIN_STAMINA + (totalLv - 1) * K.CHECKIN_PER_LV; return S.race === 'mech' ? Math.floor(base * 1.2) : base; } // 按累计总等级（突破不重置）；v1088 机械不知疲倦：签到体力 +20%
function checkin(S, force) {
  if (!force && !canCheckin(S)) return { ok: false };
  if (S.afk) S.afk = null; // AFK由doCheckin处理结算，Core只清空标记
  let revived = null; // 次日签到复活：流血致死 → 生命 1、流血清除；毒发致死 → 生命 = 中毒基数一半（向上取整），中毒仍在（基数不变）
  if (S.dead) {
    const cause = S.dead.cause || 'bleed'; revived = { base: S.dead.base, cause };
    if (cause === 'poison') { S.attrs.vit = Math.max(K.ATTR_MIN, Math.ceil(S.dead.base / 2)); S.status.poison = true; S.status.poisonBase = S.dead.base; S.status.poisonFrac = 0; }
    else { S.attrs.vit = K.ATTR_MIN; cureStatus(S, 'bleed'); cureStatus(S, 'poison'); }
    revived.vit = S.attrs.vit; S.dead = null;
  }
  const gain = staGain(S, checkinAmount(S));
  const today = todayStr(), yesterday = todayStr(new Date(Date.now() - 86400000));
  if (S.lastCheckin === yesterday) S.consecDays = (S.consecDays || 0) + 1;
  else if (S.lastCheckin !== today) S.consecDays = 1;
  let ringReward = false;
  const cd = S.consecDays || 0;
  if (cd === 7 && !S.signPouchDone && (S.pouch || 0) < 10) { S.pouch = (S.pouch || 0) + 1; S.signPouchDone = 1; ringReward = true; } // v882 签到送小型储物袋：一个号限1次
  S.lastCheckin = today; S.stamina += gain; S.stats.checkins++; S.stats.checkinsTotal = (S.stats.checkinsTotal || 0) + 1;
  // v432 中毒复活不回满，按复活后生命属性折算
  if (revived && revived.cause === 'poison') {
    const _maxHp = C.bumpPeak(S) * 5;
    S.hpCur = Math.max(1, Math.floor(_maxHp * 0.5));
  } else {
    S.hpCur = (S.realm|0) === 0 ? C.bumpPeak(S) * 5 : null; // 凡人签到回满血到上限，其他境界回满当前
  }
  if (!(S.lifespan > 0)) S.lifespan = REALM_LIFESPAN[Math.min(12, Math.max(0, S.realm|0))] || 100;
  if (typeof S.danDu !== 'number' || !(S.danDu >= 0)) S.danDu = 0; S.danDu = Math.min(danDuCap(S), S.danDu | 0); // v998 danDu；v1140 上限随百毒不侵佩戴
  S.lifespan = Math.max(0, S.lifespan - 1);
  const toxLoss = (!S.dead && (S.danDu | 0) > 1000) ? Math.floor((S.danDu | 0) / 1000) : 0; // v1138 Ye 定：丹毒超过 1000 自动掉寿元（签到日结，每满千点扣 1 年）
  if (toxLoss > 0) S.lifespan = Math.max(0, S.lifespan - toxLoss);
  let bled = 0, died = null, forceReinc = false;
  if (S.lifespan <= 0 && !S.dead) { forceReinc = true; S.forceReinc = true; } // 寿元耗尽：强制轮回，不再坐化
  const vigor = Math.max(0, Math.min(vigorGain(S), vigorCap(S) - S.vigor)); S.vigor += vigor; /* 活力可结转，最多 3 天量；死亡不清空活力 */
  const mana = 0; /* 签到不回法力 */
  if (S.status.bleed) { // 流血不止：每次签到扣流血时生命上限的 20%，扣到 0 即死亡
    bled = Math.max(1, Math.ceil(S.attrs.vit * K.BLEED_CHECKIN)); S.attrs.vit = Math.max(0, S.attrs.vit - bled);
    if (S.attrs.vit <= 0) died = die(S, 'bleed');
  }
  return { ok: true, gain, vigor, mana, bled, died, revived, forceReinc, ringReward, consecDays: S.consecDays || 0, toxLoss };
}
function train(S, attr, n) {
  if (S.dead) return 0;
  n = Math.min(n || 1, Math.floor(S.stamina / K.COST_TRAIN));
  if (n <= 0 || !AN[attr]) return 0;
  let done = 0; for (; done < n && !S.dead; done++) { spend(S, K.COST_TRAIN); if (hasSt(S, 'poison') && !S.dead) { const hpMax2 = C.bumpPeak(S) * 5, hpFull2 = (S.attrs.str + S.attrs.def + S.attrs.vit) * 5;
      const hpCur2 = S.hpCur != null ? S.hpCur : hpFull2;
      const pl = Math.max(1, Math.ceil(hpMax2 * K.POISON_TRAIN));
      S.hpCur = Math.max(0, hpCur2 - pl); poisonAcc += pl; if (S.hpCur <= 0) { C.die(S, 'poison'); break; } } } // 逐点扣体力；中毒时每次修炼扣2%（可能中途毒发）
  const ok = S.dead ? done - 1 : done; hungerDown(S, done * K.HUNGER_ACT, done); /* 毒发的那一点体力不算修炼成果 */
  let fail = 0; if (hasSt(S, 'depress')) for (let i = 0; i < ok; i++) if (R() < K.DEPRESS_FAIL) fail++; // 抑郁：修炼偶尔失败
  if (!S.dead) { let _lgb = 0; const _lgp = lingGenTrainBonus(S); for (let _i = 0; _i < ok - fail; _i++) if (Math.random() < _lgp) _lgb++; S.attrs[attr] += ok - fail + _lgb; if (S.realm === 0) S.xp += (ok - fail) * 10; train._lgb = _lgb; } train.fail = fail; train.gain = S.dead ? 0 : ok - fail + (train._lgb||0); return done; // 凡人每次成功锻炼+10经验（抑郁失手不算），练气以上不加；v867 灵根修炼加成
}
// —— 饥饿 / 气运 / 状态 / 灵宠忠诚 ——
const hasSt = (S, k) => !!S.status && (k === 'poison' && toxImmune(S) ? false : (k === 'bleed' || k === 'poison' ? !!S.status[k] : S.status[k] > C.now())); // v1140 百毒不侵：中毒视为未中
function bumpPeak(S) { const t = S.attrs.str + S.attrs.def + S.attrs.vit; S.vitPeak = Math.max(Math.floor(+S.vitPeak || 0), t); return S.vitPeak; }
const resLbl = S => (S.realm|0) >= 8 ? '仙力' : (C.useFali(S) ? '法力' : '经验');
const fmtN = n => { n = Math.floor(+n || 0); return n >= 100000000 ? (n / 100000000).toFixed(2).replace(/\.00$/, '') + 'b' : n >= 1000000 ? (n / 1000000).toFixed(2).replace(/\.00$/, '') + 'm' : n >= 10000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : String(n); }; // v794 上亿b/百万m/上万k缩写，防战斗条数字溢出
const manaMax = S => (S.realm|0) >= 8 ? Math.max(1, Math.floor(S.xianCap || 0)) : Math.floor((S.attrs.int * 3 + S.attrs.vit * 5 + S.attrs.str * 1 + S.attrs.def * 2 + S.attrs.agi * 4) * (S.manaMult || 1)); // 仙人以上仙力上限固定为转换时值 // 法力基础上限（练气后启用）
const manaCap = S => manaMax(S) * maiMult(S); // v91：法力可存至上限maiMult倍：基础2 + 虚脉（最多8条）+ 实脉（不封顶）
const manaCapEff = S => manaCap(S) + Math.max(0, S.shaExcess || 0); // 煞气超额无视上限倍数规则
function useManaPotion(S, k) { const P = potOf(k); if (!P || P.t !== 'mp') return { err: 'bad' }; if (S.dead) return { err: 'dead' }; if (!(S.elixirs[k] > 0)) return { err: 'none' }; const mx = manaMax(S); if (S.mana >= mx) return { err: 'full' }; const g = Math.min(mx - S.mana, Math.max(1, Math.round(mx * P.pct))); S.mana += g; if (!--S.elixirs[k]) delete S.elixirs[k]; return { ok: true, gain: g, mana: S.mana, max: mx }; }
const useFali = S => (S.realm|0) >= 1; // 练气起法力取代活力/经验
const lifeManaCost = S => Math.max(1, Math.ceil(manaMax(S) * 0.01)); // 生活技能耗基础法力上限1%，向上取整，最少1
const lifeCost = S => S.dead ? 'dead' : (S.realm|0) >= 8 ? '' : useFali(S) ? (S.mana < lifeManaCost(S) ? 'mana' : '') : (S.vigor < K.COST_LIFE ? 'vigor' : ''); // 仙人境免费；10 级前 1 活力，10 级后 2 法力
const payLife = S => { if ((S.realm|0) >= 8) return; if (useFali(S)) S.mana -= lifeManaCost(S); else S.vigor -= K.COST_LIFE; try { if ((S.level|0) >= C.REALM_MAX_LV && !S.thunderOk && (S.realm|0) >= 2) { S._trigFail=S._trigFail|0; S._succFail=S._succFail|0; const _trigP=Math.min(1,0.10+0.10*S._trigFail); if (Math.random()<_trigP) { S._trigFail=0; const _scenes=[['微风忽起，落叶打旋','天色微暗','远处闷雷一声'],['灵气躁动，飞鸟惊散','乌云聚顶，云层压得很低','雷声滚滚，由远及近'],['草木低伏，虫鸣骤止','劫云翻涌，云中有电光游走','雷声震耳，地面微颤'],['空气粘稠，呼吸不畅','金色雷纹在云中若隐若现','雷声如鼓，声声催心'],['灵气倒卷，阵法纹路浮现','云层裂开，白光倾泻','虚空嗡鸣，如大道低语'],['十里之内，鸟兽绝迹','雷光如瀑，倾天而下','威压先至，骨骼作响'],['天地灵气一空','云开一线，天眼似开','万籁俱寂，只闻心跳'],['凡尘涤荡，浊气尽散','雷柱接天，直贯九霄','天道之音，响彻神魂'],['仙器共鸣，嗡嗡作响','九彩劫云，遮天蔽日','法则碎片，四散飞溅'],['小世界灵气被抽空','虚空裂缝，蔓延天际','空间涟漪，层层荡开'],['数个小世界震动','劫云蔽星，日月无光','法则碰撞，星火四溅'],['三千世界战栗','灭世洪流，席卷星海','雷威吞声，万物噤声']]; const _sc=_scenes[Math.min(11,S.realm|0)]||_scenes[0]; tribOmenShow(S); log('warn', '🌩️ '+_sc[0]+'。'+_sc[1]+'。'+_sc[2]+'……<br>雷云判定中……'); const _succP=Math.min(1,0.01+0.01*S._succFail); if (Math.random()<_succP) { S.thunderOk=true; S._succFail=0; S._trigFail=0; log('good', '⚡ <b class="r">天道已将你锁定</b>——雷劫将至，生死只在一线之间！<br>速速调整状态，迎接天威洗礼！<br>⚡ 突破契机已到，随时可破'); commit(); } else { S._succFail++; log('info', '<span style="filter:brightness(0)">🌫️</span> 雷云缓缓散去，天威渐消……<br><span style="color:#888">看来火候未到，天道还未注意到你。继续修炼吧。</span>'); } } else { S._trigFail++; } } } catch(_){} }; // v661 生活技能内联雷云判定
window.thunderRanch = function() { // v809 养殖园收获触发雷云判定（无消耗版）
  try {
    if ((S.level|0) >= C.REALM_MAX_LV && !S.thunderOk && (S.realm|0) >= 2) {
      S._trigFail=S._trigFail|0; S._succFail=S._succFail|0;
      const _trigP=Math.min(1,0.10+0.10*S._trigFail);
      if (Math.random()<_trigP) {
        S._trigFail=0;
        tribOmenShow(S); log('warn', '🌩️ 雷云判定中……');
        const _succP=Math.min(1,0.01+0.01*S._succFail);
        if (Math.random()<_succP) {
          S.thunderOk=true; S._succFail=0; S._trigFail=0;
          log('good', '⚡ <b class="r">天道已将你锁定</b>——雷劫将至！<br>⚡ 突破契机已到，随时可破');
          commit();
        } else {
          S._succFail++;
          log('info', '🌫️ 雷云缓缓散去……');
        }
      } else { S._trigFail++; }
    }
  } catch(_){}
};
function useHpPotion(S, k) { // 场外：回复 生命上限（最高生命）的 30/40/50%，不超过上限；不提高上限；不解流血/中毒
  const P = potOf(k); if (!P || P.t !== 'hp') return { err: 'bad' }; if (S.dead) return { err: 'dead' }; if (!(S.elixirs[k] > 0)) return { err: 'none' };
  const cap = Math.floor(+S.vitPeak || (S.attrs.str + S.attrs.def + S.attrs.vit)); if (S.attrs.vit >= cap) return { err: 'full' };
  const g = Math.min(cap - S.attrs.vit, Math.max(1, Math.ceil(cap * P.pct))); S.attrs.vit += g; if (!--S.elixirs[k]) delete S.elixirs[k]; return { ok: true, gain: g, vit: S.attrs.vit, cap };
}
const bestPot = (el, t) => [3, 2, 1].map(q => t + q).find(k => el && el[k] > 0) || null; // 战斗中优先用最好的
function addStatus(S, k) { // 流血/中毒记录染上时的生命上限（作为扣减基数）
  bumpPeak(S);
  if (k === 'bleed') { if (!S.status.bleed) { S.status.bleedBase = S.attrs.vit; S.status.bleedFrac = 0; } S.status.bleed = true; }
  else if (k === 'poison') { if (toxImmune(S)) { S.status.poison = false; } else { if (!S.status.poison) { S.status.poisonBase = S.attrs.vit; S.status.poisonFrac = 0; } S.status.poison = true; } } // v1140 百毒不侵不中毒
  else S.status[k] = C.now() + K.DEPRESS_HOURS * 3600000;
  return k;
}
function drainVit(S, key, amt, floor) { // 按上限比例累积小数，满整数才扣；死亡判定时 floor 传 0
  floor = floor === undefined ? K.ATTR_MIN : floor;
  const f = S.status[key + 'Frac'] + amt, whole = Math.floor(f + 1e-9); S.status[key + 'Frac'] = Math.max(0, f - whole);
  const lost = Math.max(0, Math.min(whole, S.attrs.vit - floor)); S.attrs.vit -= lost; return lost;
}
// —— 死亡：失去全部体力、当天无法行动、背包随机丢失 5~10 件物品（按数量加权，可跨多种；被路过玩家顺手牵羊）；次日签到复活 ——
const DEATH_STORES = ['inv', 'mats', 'ores', 'prey', 'eggs', 'food', 'meds', 'pages', 'expBooks', 'skillPages', 'skillBooks', 'dishes', 'elixirs'];
function die(S, cause) {
  const pool = [];
  for (const st of DEATH_STORES) for (const k in S[st] || {}) if (S[st][k] > 0) pool.push({ store: st, k, n: S[st][k] });
  if (S.petEggs > 0) pool.push({ store: 'petEggs', k: 'petEgg', n: S.petEggs });
  if ((S.maiPages | 0) > 0) pool.push({ store: 'maiPages', k: '*', n: S.maiPages });
  let want = K.DEATH_LOSE_MIN + Math.floor(R() * (K.DEATH_LOSE_MAX - K.DEATH_LOSE_MIN + 1)); const got = {};
  while (want-- > 0) { /* 逐件抽取，按剩余数量加权 */
    const tot = pool.reduce((a, x) => a + x.n, 0); if (!tot) break;
    let r = R() * tot, it = pool[pool.length - 1]; for (const x of pool) { if (r < x.n) { it = x; break; } r -= x.n; }
    it.n--; const key = it.store + ':' + it.k; got[key] = got[key] || { store: it.store, k: it.k, n: 0 }; got[key].n++;
    if (it.store === 'petEggs') S.petEggs--; else if (it.store === 'maiPages') S.maiPages--; else if (--S[it.store][it.k] <= 0) delete S[it.store][it.k];
  }
  const lost = Object.values(got);
  const lostSta = S.stamina, lostVit = S.attrs.vit;
  if ((S.protect | 0) > 0) { // 🛡️新人保护：免除本次死亡全部惩罚（不掉落物品、体力不清零、生命不归零）
    for (const key in got) { const g = got[key]; if (g.store === 'petEggs') S.petEggs += g.n; else if (g.store === 'maiPages') S.maiPages = (S.maiPages | 0) + g.n; else S[g.store][g.k] = (S[g.store][g.k] || 0) + g.n; } // 返还抽走的物品
    S.protect--;
    S.attrs.vit = Math.max(K.ATTR_MIN, 1); // 命悬一线：保留 1 点生命
    cureStatus(S, cause === 'poison' ? 'poison' : 'bleed'); // 致死状态一并清除，避免连锁触发
    poisonAcc = 0;
    const ev = { protected: true, cause: cause || 'bleed', left: S.protect, lost, lostSta, lostVit };
    S.protEvt = ev; // UI 在 afterAct 中消费并显示（签到流血致死走同一通道）
    return ev;
  }
  S.stamina = 0; S.attrs.vit = 0; S.vigor = 0; S.lifespan = Math.max(0, Math.floor((S.lifespan|0) * 0.999)); // 死亡：活力清空、寿元-0.1%
  cause = cause || 'bleed'; S.dead = { day: todayStr(), cause, base: Math.max(1, S.status[cause + 'Base'] || 1), lost, lostSta, logged: false };
  return S.dead;
}
function cureStatus(S, k) { if (k === 'bleed' || k === 'poison') { S.status[k] = false; S.status[k + 'Base'] = S.status[k + 'Frac'] = 0; } else S.status[k] = 0; }
const activeStatus = S => Object.keys(STATUS).filter(k => hasSt(S, k));
function luck(S) { return (S.hunger >= K.WELL_FED ? K.LUCK_FED : 1) * (hasSt(S, 'depress') ? K.DEPRESS_LUCK : 1) * (S.buff && S.buff.k === 'luck' ? S.buff.v : 1) * (1 + (activeSets(S).luck || 0)); }
function hungerDown(S, n, ops) { ops = ops|0; const _realm = S.realm|0; if (_realm < 8 && ops > 0 && !S.dead) { if ((S.hunger|0) <= 0) { S._hungerOps = (S._hungerOps|0) + ops; const _th = (S.race === 'ming' ? 2 : 1) * ([1, 2, 3, 4, 10, 20, 40, 80][_realm] || 1); /* v1088 冥族阴体：饥饿劳作折寿减半（阈值翻倍） */ const _yr = [1, 2, 4, 8, 20, 40, 80, 160][_realm] || 1; if (S._hungerOps >= _th) { const _c = Math.floor(S._hungerOps / _th); S._hungerOps -= _c * _th; const _lp = _c * _yr; S.lifespan = Math.max(0, (S.lifespan|0) - _lp); if (S.lifespan <= 0 && !S.dead) S.forceReinc = true; try{log('warn', `🍗 饱食为0！饥饿劳作扣 <span class="r">${_lp}年寿元</span>（剩余${S.lifespan|0}年）`);}catch(e){} } } else S._hungerOps = 0; } S.hunger = Math.max(0, S.hunger - n); }
function loyalUp(p, chance, lo, hi) { if (R() < chance) { const g = ri(lo, hi); p.loyal = Math.min(100, p.loyal + g); return g; } return 0; }
const staGain = (S, n) => n;
let poisonAcc = 0; // 中毒期间消耗体力损失的生命（UI 读取后清零）
// —— 挂机修炼：体力耗尽时二选一，直接累积法力（凡人累积经验）——
function afkStart(S, type) { S.afk = { type, start: Date.now() }; }
function doAfkChoose(type) {
  // 如果type没指定，弹窗让用户选
  if (!type) {
    const _luo = C.maiLuo(S);
    const _lgT = window.LG ? `\\n🌟灵根${window.LG.name(S)}：闭关收益 ${window.LG.afkTxt(S)}` : '';
    const _isXian = (S.realm|0) >= 8, _gainTxt = _isXian ? '仙力' : '法力';
    const isVein = confirm(`🧘 选择闭关地点：\\n\\n🌀络 ${_luo} 条（虚${S.maiVLuo|0}/实${S.maiRLuo|0}）（闭关每秒 +${_luo}）${_lgT}\\n\\n确定 = ⛰️ 灵脉闭关（每秒+${2 + _luo}${_gainTxt}，入关1小时后会被真人PK匹配）\\n取消 = 🏔️ 洞府闭关（安全，每秒+${1 + _luo}${_gainTxt}）`);
    type = isVein ? 'vein' : 'cave';
  }
  // 开关：如果已在该闭关中则出关，否则进入（切换时先结算）
  if (S.afk && S.afk.type === type) {
    let gain = 0;
    try { gain = afkExit(S, 'manual'); } catch(e) {}
    S.afk = null;
    try { const lbl = C.resLbl(S); log('good', gain > 0 ? `🛌 出关，获得 <span class="g">${lbl} +${gain}</span>` : `🛌 出关（无收益）`); } catch(e) {}
    afterAct();
  } else {
    if (S.afk) { try { afkExit(S, 'switch'); } catch(e) {} S.afk = null; }
    afkStart(S, type);
    log('good', '🧘 开始' + (type === 'vein' ? '灵脉' : '洞府') + '闭关挂机…');
  }
  closeSheet(); save(); render();
}
window.doAfkChoose = doAfkChoose; // v436
function afkMinutes(S) { if (!S.afk) return 0; return Math.floor((Date.now() - S.afk.start) / 60000); }
/* ---------- v999 世界灵气 ---------- */
const WORLD_KEY = 'fushengwendao_world_v1';
function worldState() { let w = null; try { w = JSON.parse(localStorage.getItem(WORLD_KEY) || 'null'); } catch(_) {} if (!w || typeof w.qi !== 'number') w = { qi: 50, ts: Date.now() }; const now = Date.now(); const hrs = Math.floor((now - (w.ts || now)) / 3600000); if (hrs > 0) { for (let i = 0; i < Math.min(hrs, 72); i++) { w.qi += (Math.random() * 5 - 3) + (45 - w.qi) * 0.02; } w.ts = now; w.qi = Math.max(0, Math.min(100, w.qi)); saveWorld(w); } return w; }
function saveWorld(w) { try { localStorage.setItem(WORLD_KEY, JSON.stringify(w)); } catch(_) {} }
function qiNow() { return worldState().qi; }
function qiFactor() { return 0.6 + qiNow() / 100 * 0.8; }
function qiTierName(q) { q = +q || 0; return q <= 15 ? '末法' : q <= 35 ? '稀薄' : q <= 65 ? '平常' : q <= 85 ? '浓郁' : '潮汐'; }
function qiTierIdx(q) { q = +q || 0; return q <= 15 ? 0 : q <= 35 ? 1 : q <= 65 ? 2 : q <= 85 ? 3 : 4; }
function qiAdd(n, S) { const w = worldState(); const b = qiTierIdx(w.qi); w.qi = Math.max(0, Math.min(100, w.qi + n)); const a = qiTierIdx(w.qi); saveWorld(w); if (S && a !== b) { S.bc = S.bc || []; S.bc.push(a > b ? '🌫️ 天地灵气渐盛——【' + qiTierName(w.qi) + '】之象初显，闭关凝气皆受益。' : '🌫️ 天地灵气转衰——【' + qiTierName(w.qi) + '】之象蔓延，修行愈发艰难。'); } return w.qi; }
function afkHourly(S) { // v626 凝气每小时自动结算
  if (!S.afk || S.afk.type !== 'ningqi') return;
  const hrs = Math.floor((Date.now() - S.afk.start) / 3600000);
  const done = S.afk.hr || 0;
  if (hrs <= done) return;
  const hc = ((C.setCounts(S).heal || 0)), hi = hc >= 2 ? Math.min(5, hc) - 2 : -1;
  const nqBonus = hi >= 0 ? GEAR_SETS.heal.ningqi[hi] : 0, nqAgain = hi >= 0 ? GEAR_SETS.heal.ningqiAgain[hi] : 0;
  const nqRate = Math.min(0.95, (0.30 + nqBonus) * qiFactor());
  let g = 0, yq = 0;
  for (let i = done; i < hrs; i++) { if (Math.random() < nqRate) { g += 150; yq++; S.yinQi = (S.yinQi|0) + 1; if (nqAgain > 0 && Math.random() < nqAgain) { g += 150; yq++; S.yinQi = (S.yinQi|0) + 1; } } }
  S.afk.hr = hrs;
  if (g > 0) { g = Math.floor(g * qiFactor()); S.xp += g; log('good', `🌀 凝气每小时结算：经验 <span class="g">+${g}</span>${yq>0?`，引气入体 <span class="g">+${yq}</span>`:''}`); commit(); }
}
function afkExit(S, reason) { window._afkShown = false; // 出关结算
  if (!S.afk) return 0;
  const type = S.afk.type, isMana = C.useFali(S), isVein = type === 'vein';
  let gain = 0;
  const dbgMs = (S.afk && S.afk.dbgAdd) || 0; // 测试追加时长
  if (type === 'wushu') { // 凡人习武：每分钟+1经验；力量套（致命）隐藏属性翻倍
    const mins = Math.floor((Date.now() - S.afk.start + dbgMs) / 60000);
    const w2x = ((C.setCounts(S).fatal || 0) >= 2) ? 2 : 1;
    gain = mins * 1 * w2x;
  } else if (type === 'ningqi') { // 凡人凝气：每小时判定1次，基础30%成功得150经验；治愈套隐藏：成功率提升+再判定
    const hours = Math.floor((Date.now() - S.afk.start + dbgMs) / 3600000);
    const _done = S.afk.hr || 0; // v626 已每小时结算的不重复
    const hc = ((C.setCounts(S).heal || 0)), hi = hc >= 2 ? Math.min(5, hc) - 2 : -1;
    const nqBonus = hi >= 0 ? GEAR_SETS.heal.ningqi[hi] : 0, nqAgain = hi >= 0 ? GEAR_SETS.heal.ningqiAgain[hi] : 0;
    const nqRate = Math.min(0.95, (0.30 + nqBonus) * qiFactor());
    for (let i = _done; i < hours; i++) { if (Math.random() < nqRate) { gain += 150; S.yinQi = (S.yinQi|0) + 1; if (nqAgain > 0 && Math.random() < nqAgain) gain += 150; } } // v116 凝气成功引气入体+1；v626 跳过已结算
  } else { // 洞府/灵脉：按秒累积法力；防御套隐藏属性加法力；灵脉每分钟1%被系统匹配PK
    const secs = Math.floor((Date.now() - S.afk.start + dbgMs) / 1000);
    const dc = (C.setCounts(S).def || 0), di = dc >= 1 ? Math.min(5, dc) - 1 : -1;
    const afkMult = di >= 0 ? GEAR_SETS.def.afkMult[di] : 0;
    const _lgAfk = 1 + lingGenAfkMult(S); // v867 灵根闭关加成：天灵根快，五灵根慢
    for (let i = 0; i < secs; i++) {
      gain += ((isVein ? 2 : 1) + C.maiLuo(S) + ((S.realm|0) >= 8 ? (S.xianfuEnergy|0) : (S.dongfuEnergy|0))) * (1 + afkMult) * _lgAfk; // v89：每条络+1；v1059 Ye 定：开脉术经验不加闭关（只升级、给实脉）；v799 洞府灵气加成；v957 洞府灵气加法力、仙府灵气加仙力，按境界分开算
    }
    if (isVein) { // v202 灵脉闭关：每小时判定凝气（练气以上突破需10缕凝气）；治愈套加成与凡人凝气一致
      const hours = Math.floor((Date.now() - S.afk.start + dbgMs) / 3600000);
      const hc = ((C.setCounts(S).heal || 0)), hi = hc >= 2 ? Math.min(5, hc) - 2 : -1;
      const nqBonus = hi >= 0 ? GEAR_SETS.heal.ningqi[hi] : 0, nqAgain = hi >= 0 ? GEAR_SETS.heal.ningqiAgain[hi] : 0;
      const nqRate = Math.min(0.95, (0.30 + nqBonus) * qiFactor());
      let nqN = 0;
      for (let i = 0; i < hours; i++) { if (Math.random() < nqRate) { nqN++; S.yinQi = (S.yinQi|0) + 1; if (nqAgain > 0 && Math.random() < nqAgain) { nqN++; S.yinQi = (S.yinQi|0) + 1; } } }
      if (nqN > 0) log('good', (S.realm|0) >= 8 ? `⚖️ 参悟法则，法则之力 <span class="g">+${nqN}缕</span>（${S.yinQi|0}/10）` : `🌀 灵脉凝气，凝气 <span class="g">+${nqN}缕</span>（${S.yinQi|0}/10）`);
    }
  }
  const afkSecs = Math.floor((Date.now() - S.afk.start + dbgMs) / 1000);
  S.afk = null;
  if (type === 'vein') qiAdd(Math.floor(afkSecs / 3600) * 0.3, S); // v999 灵脉闭关养气
  if (afkSecs > 0) { S.stats = S.stats || {}; S.stats.afkSecs = (S.stats.afkSecs || 0) + afkSecs; S.stats.afkSecsTotal = (S.stats.afkSecsTotal || 0) + afkSecs; } // 本世闭关（轮回清零）+ 历世累计（不清零）
  // v978 X 验证用户闭关 1.1 倍
  if (gain > 0) gain = Math.floor(gain * qiFactor()); // v999 世界灵气加成
  try { if (typeof isXVerified === 'function' && isXVerified() && gain > 0) gain = Math.floor(gain * 1.1); } catch(_) {}
  if (gain > 0) { if (isMana) S.mana = Math.min(C.manaCapEff(S), S.mana + gain); else S.xp += gain; }
  if (afkSecs > 0) { // v187 闭关调息：每秒恢复 10% 生命上限；v1161 hpCur 为空按当前属性满血算（与主界面 1764 同口径）——此前为空直接跳过：属性被夺低于巅峰时上限更高、空值永远回不满
    const hpMaxR = C.bumpPeak(S) * 5, curR = S.hpCur != null ? Math.floor(S.hpCur) : (S.attrs.str + S.attrs.def + S.attrs.vit) * 5;
    if (curR < hpMaxR) { const regen = Math.min(hpMaxR - curR, Math.floor(hpMaxR * 0.10 * afkSecs)); if (regen > 0) { S.hpCur = curR + regen; log('good', `🧘 闭关调息，生命 <span class="g">+${regen}</span>`); } }
  }
  try { // v1094 梦境回溯：灵脉闭关出关时必出一场（只设标记，横幅入梦；一天最多一场）
    if (reason === 'manual' && type === 'vein' && afkSecs > 0 && !S.dreamPending && S.dreamDay !== todayStr()) {
      S.dreamPending = { tier: afkSecs >= 43200 ? 2 : afkSecs >= 21600 ? 1 : 0, seed: (Date.now() % 1000000) * 1000 + Math.floor(Math.random() * 1000), createdAt: Date.now() };
    }
  } catch(_) {}
  return gain;
}
function thunderAdv() { try { if ((S.level|0) >= C.REALM_MAX_LV && !S.thunderOk && (S.realm|0) >= 2) { S._trigFail=S._trigFail|0; const _trigP=Math.min(1,0.10+0.10*S._trigFail); if (Math.random()<_trigP) { S._trigFail=0; const _scenes=[['微风忽起，落叶打旋','天色微暗','远处闷雷一声'],['灵气躁动，飞鸟惊散','乌云聚顶，云层压得很低','雷声滚滚，由远及近'],['草木低伏，虫鸣骤止','劫云翻涌，云中有电光游走','雷声震耳，地面微颤'],['空气粘稠，呼吸不畅','金色雷纹在云中若隐若现','雷声如鼓，声声催心'],['灵气倒卷，阵法纹路浮现','云层裂开，白光倾泻','虚空嗡鸣，如大道低语'],['十里之内，鸟兽绝迹','雷光如瀑，倾天而下','威压先至，骨骼作响'],['天地灵气一空','云开一线，天眼似开','万籁俱寂，只闻心跳'],['凡尘涤荡，浊气尽散','雷柱接天，直贯九霄','天道之音，响彻神魂'],['仙器共鸣，嗡嗡作响','九彩劫云，遮天蔽日','法则碎片，四散飞溅'],['小世界灵气被抽空','虚空裂缝，蔓延天际','空间涟漪，层层荡开'],['数个小世界震动','劫云蔽星，日月无光','法则碰撞，星火四溅'],['三千世界战栗','灭世洪流，席卷星海','雷威吞声，万物噤声']]; const _sc=_scenes[Math.min(11,S.realm|0)]||_scenes[0]; tribOmenShow(S); log('warn', '🌩️ '+_sc[0]+'。'+_sc[1]+'。'+_sc[2]+'……<br>雷云判定中……'); if (Math.random()<0.01) { S.thunderOk=true; S._trigFail=0; log('good', '⚡ <b class="r">天道已将你锁定</b>——雷劫将至！<br>⚡ 突破契机已到，随时可破'); commit(); } else { log('info', '<span style="filter:brightness(0)">🌫️</span> 雷云缓缓散去……'); } } else { S._trigFail++; } } } catch(_){} } // v662 冒险用（成功率不叠加）
function thunderCheck(n) { // v629 雷云判定：每点体力10%引动，1%成功才显示突破按钮；v639 按点数；v640 筑基起
  if ((S.level|0) < C.REALM_MAX_LV || S.thunderOk || (S.realm|0) < 2) return;
  n = Math.max(1, n|0 || 1);
  let triggered = false;
  for (let i = 0; i < n; i++) { if (Math.random() < 0.10) { triggered = true; break; } }
  if (triggered) {
    const _scenes = [
      ['微风忽起，落叶打旋','天色微暗','远处闷雷一声'],
      ['灵气躁动，飞鸟惊散','乌云聚顶，云层压得很低','雷声滚滚，由远及近'],
      ['草木低伏，虫鸣骤止','劫云翻涌，云中有电光游走','雷声震耳，地面微颤'],
      ['空气粘稠，呼吸不畅','天色如墨，劫云中隐现金色雷纹','雷声如鼓点，一声比一声近'],
      ['灵气倒卷，阵法隐隐有崩散之感','云层裂开缝隙，透出刺目白光','虚空震颤，耳边有嗡鸣'],
      ['方圆十里鸟兽绝迹','劫云如山岳倾覆，雷光如瀑','雷声未至，威压先到，膝盖发软'],
      ['天地灵气为之一空','天裂一线，似有天眼睁开','万籁俱寂，唯闻自己心跳'],
      ['凡尘气息被尽数涤荡','九天之上垂下雷柱，接天连地','雷声即天道之音，振聋发聩'],
      ['仙灵之气紊乱，仙器共鸣','劫云呈九彩，雷光中蕴法则碎片','雷声中夹杂大道之音，似诵经文'],
      ['一方小世界灵气被抽空','虚空生裂缝，裂缝中雷蛇狂舞','雷声过处，空间泛起涟漪'],
      ['数个小世界同时震动','劫云遮蔽星辰，日月无光','雷声即法则碰撞，听者道心动摇'],
      ['三千世界齐齐战栗','虚空彻底撕裂，雷劫如灭世洪流','无声——声音已被雷威吞没，唯剩天威压顶']
    ];
    const _sc = _scenes[Math.min(11, S.realm|0)] || _scenes[0];
    tribOmenShow(S); log('warn', `🌩️ ${_sc[0]}。${_sc[1]}。${_sc[2]}……<br>雷云判定中……`); // v631 按境界显示雷云异象
    if (Math.random() < 0.01) {
      S.thunderOk = true;
      log('good', '⚡ <b class="r">天道已将你锁定</b>——雷劫将至，生死只在一线之间！<br>速速调整状态，迎接天威洗礼！<br>⚡ 突破契机已到，随时可破');
      commit();
    } else {
      log('info', '<span style="filter:brightness(0)">🌫️</span> 雷云缓缓散去，天威渐消……<br><span style="color:#888">看来火候未到，天道还未注意到你。继续修炼吧。</span>');
    }
  }
}
function spend(S, n) { // 统一扣体力
  S.stamina -= n; bumpPeak(S);
  if (S.stamina < 0) S.stamina = 0;
  if (S.buff && S.buff.k === 'luck' && (S.buff.left -= n) <= 0) S.buff = null;
  try { if ((S.level|0) >= C.REALM_MAX_LV && !S.thunderOk && (S.realm|0) >= 2) { S._trigFail=S._trigFail|0; S._succFail=S._succFail|0; const _n=Math.max(1,(n||1)|0); const _trigP=Math.min(1,0.10+0.10*S._trigFail); let _tr=false; for (let _i=0;_i<_n;_i++) { if (Math.random()<_trigP) { _tr=true; break; } } if (!_tr) { S._trigFail++; } else { S._trigFail=0; tribOmenShow(S); log('warn','<span style="filter:brightness(0)">🌩️</span> 雷云判定中……'); const _succP=Math.min(1,0.01+0.01*S._succFail); if (Math.random()<_succP) { S.thunderOk=true; S._succFail=0; S._trigFail=0; log('good','⚡ <b class="r">天道已将你锁定</b>！'); commit(); } else { S._succFail++; log('info','🌫️ 雷云散去……'); } } } } catch(_){} } // v665 统一体力入口内联
function leftBeforeDeath(S, k) { // 距离死亡还剩几次（中毒：进冒险次数；流血：签到次数）
  if (!hasSt(S, k)) return Infinity; const hpMax = C.bumpPeak(S) * 5, hpFull = (S.attrs.str + S.attrs.def + S.attrs.vit) * 5, hpCur = S.hpCur != null ? S.hpCur : hpFull, d = Math.max(1, hpMax * (k === 'poison' ? K.POISON_VIT : K.BLEED_CHECKIN)); if (d <= 0) return Infinity; return Math.max(1, Math.ceil(hpCur / d));
  return d > 0 ? Math.max(1, Math.ceil((S.attrs.vit - S.status[k + 'Frac']) / d - 1e-9)) : Infinity;
}
function takePoisonLoss() { const v = poisonAcc; poisonAcc = 0; return v; }
function addPoisonAcc(n) { poisonAcc += n; }
function petBite(S, p) { // 场外咬主人
  const dmg = Math.max(1, Math.round(p.attrs.str * K.BITE_VIT)), lost = Math.max(0, Math.min(dmg, S.attrs.vit - K.ATTR_MIN));
  S.attrs.vit -= lost; p.hunger = Math.min(100, p.hunger + K.BITE_HUNGER); p.loyal = Math.max(0, p.loyal - K.BITE_LOYAL);
  const st = []; if (R() < K.BITE_BLEED && !S.status.bleed) st.push(addStatus(S, 'bleed')); if (R() < K.BITE_DEPRESS) st.push(addStatus(S, 'depress'));
  return { pet: p, lost, st };
}
function afterAction(S) { // 每次行动 / 上线：灵宠饥饿按真实时间衰减；饥饿灵宠可能咬主人
  const t = C.now(), days = Math.max(0, (t - (S.lastTick || t)) / 86400000); S.lastTick = t;
  if (days > 0) S.pets.forEach(p => p.hunger = Math.max(0, p.hunger - days * K.PET_HUNGER_DAY));
  const bites = []; for (const p of S.pets) if (p.hunger < K.PET_HUNGRY && R() < K.PET_BITE_OUT * tameBiteMult(S)) bites.push(petBite(S, p));
  return { bites };
}
function petBiteChance(p) { return (p.biteMult === undefined ? 1 : p.biteMult) * clamp(Math.max(0, 50 - p.loyal) * K.PK_BITE_LOYAL_K + (p.hunger < K.PET_HUNGRY ? K.PK_BITE_HUNGRY + (K.PET_HUNGRY - p.hunger) * K.PK_BITE_HUNGRY_K : 0), 0, K.PK_BITE_MAX); }
function eatFood(S, kind, k, n, petId) { // 吃肉/蛋：恢复饱食度（肉给自己吃还回体力）；可喂给灵宠
  const store = kind === 'egg' ? S.eggs : S.food, it = kind === 'egg' ? EGGS[k] : MEATS[k]; if (!it) return null;
  const pet = petId ? S.pets.find(p => p.id === petId) : null; if (petId && !pet) return null;
  n = Math.min(n || 1, store[k] || 0); if (n <= 0) return null;
  store[k] -= n; if (!store[k]) delete store[k];
  const res = { n, hunger: it.hunger * n, sta: 0, pet, loyal: 0, cured: false };
  if (pet) { pet.hunger = Math.min(100, pet.hunger + res.hunger); for (let i = 0; i < n; i++) res.loyal += loyalUp(pet, K.FEED_LOYAL_P, 2, 4); if (hasSt(S, 'depress') && R() < K.DEPRESS_PET_CURE) { cureStatus(S, 'depress'); res.cured = true; } }
  else { S.hunger = Math.min(100, S.hunger + res.hunger); if (kind === 'meat' && !S.dead) { res.sta = S.race === 'mech' ? Math.floor(n * it.sta * 1.2) : staGain(S, n * it.sta); /* v1088 机械不知疲倦：吃肉回体力 +20% */ S.stamina += res.sta; if (S.afk && res.sta > 0 && S.stamina >= 1) { const gain = afkExit(S, 'eat'); log('good', gain > 0 ? `🧘 进食出关，获得 <span class="g">${resLbl(S)} +${gain}</span>。` : `🧘 进食出关（不足1分钟，无收益）。`); } } /* 死亡中吃肉不回体力 */ if (hasSt(S, 'depress') && R() < K.DEPRESS_FOOD_CURE) { cureStatus(S, 'depress'); res.cured = true; } }
  return res;
}
function useMed(S, k) { const m = MEDS[k]; if (!m || !(S.meds[k] > 0)) return { ok: false, why: 'none' }; if (m.cure === 'curse') { if (!((S.curseN|0) > 0)) return { ok: false, why: 'healthy' }; S.meds[k]--; if (!S.meds[k]) delete S.meds[k]; S.curseN = (S.curseN|0) - 1; return { ok: true, cure: 'curse' }; } if (!hasSt(S, m.cure)) return { ok: false, why: 'healthy' }; S.meds[k]--; if (!S.meds[k]) delete S.meds[k]; cureStatus(S, m.cure); return { ok: true, cure: m.cure }; }
function fightAttrs(S, adv) { const a = adv ? battleAttrs(S) : Object.assign({}, S.attrs); gearAdd(S, a); if (S.buff && AN[S.buff.k]) a[S.buff.k] = Math.round(a[S.buff.k] * (1 + S.buff.v)); if (hasSt(S, 'depress')) ATTRS.forEach(k => a[k] = Math.max(1, Math.round(a[k] * K.DEPRESS_ATTR))); const _shaN = S.inv.sha|0; if (_shaN > 0) { if (S.shaMode === 'def') a.def = Math.max(1, Math.round(a.def * (1 + _shaN / 100))); else a.str = Math.max(1, Math.round(a.str * (1 + _shaN / 100))); } try { const _fzb = faZeBonus(S); for (const k in _fzb) a[k] = Math.max(1, Math.round(a[k] * (1 + _fzb[k]))); } catch(_) {} try { const _swb = swordBonus(S); for (const k in _swb) a[k] = Math.max(1, Math.round(a[k] * (1 + _swb[k]))); } catch(_) {} if (S.race === 'mo') a.str = Math.max(1, Math.round(a.str * 1.03)); return a; } // v867 法则圆满加成；v1088 魔族煞体：攻击 +3%
const AURA_SETS = ['def', 'heal']; // 防御套 / 治愈（生命）套：同时作用于队友（目前为出战灵宠，将来组队的队友也传入 allies）
const setDefBoost = (def, v) => v ? Math.round(def * v) : 0; // 防御套：按各自的防御提升百分比
function applySetDef(f) { if (!f || f.defBoost != null) return; const v = f.sets && f.sets.def; f.defBase = f.a.def; f.defBoost = setDefBoost(f.a.def, v); f.a.def += f.defBoost; } // 只加一次；f.a 是副本，不改存档
function shareAura(owner, allies) {
  owner.allies = allies.filter(Boolean); const aura = {}; AURA_SETS.forEach(k => { if (owner.sets && owner.sets[k]) aura[k] = owner.sets[k]; });
  owner.allies.forEach(a => { a.sets = Object.assign({}, a.sets || {}, aura);
    if (a.isPet && a.psk) for (const sk of a.psk) if (sk !== 'luck' && !a.pset[sk] && owner.sets && owner.sets[sk]) a.sets[sk] = owner.sets[sk]; // 灵宠有自身套装用自己的，否则与主人同套装一致
    a.auraFrom = owner; applySetDef(a); });
}
function playerFighter(S, adv) { const f = fighter('你', fightAttrs(S, adv), true, S.skills, activePets(S)); const _peakHp = Math.max(1, Math.floor(C.bumpPeak(S) * 5)); if (f.maxHp < _peakHp) { f.maxHp = _peakHp; f.hp = Math.max(f.hp, Math.min(_peakHp, f.hp)); } if (S.race === 'yi') { const _om = f.maxHp; f.maxHp = Math.floor(_om * 1.05); if (f.hp >= _om) f.hp = f.maxHp; } /* v1088 异族强健：生命上限 +5% */ if (C.useFali(S)) { f.maxMp = Math.max(1, Math.floor(C.manaMax(S))); f.mp = Math.max(0, Math.floor(S.mana)); } if (S.hpCur != null) f.hp = Math.max(0, Math.min(f.maxHp, Math.floor(S.hpCur))); f.xbOn = (S.xianBurstOn|0); f.xbPts = (S.xianBurst|0); if (f.xbOn && f.xbPts > 0) { f._xb = 1 + f.xbPts * 0.2; f._xbDef = 1 + f.xbPts * 0.2; } if (adv && (S.advVit|0) > 0) { const _av = S.advVit|0, _avHp = _av * 5; f.a.vit += _av; f.maxHp += _avHp; f.hp = Math.min(f.maxHp, f.hp + _avHp); } f.burnBloodTier = Math.min(10, S.burnBloodTier|0) || (S.burnBlood ? 1 : 0); f.burnTier = Math.min(10, S.burnTier|0) || (S.burnSpirit ? 1 : 0); f.burnLife = 0; f.S = S; f.toxAtk = toxImmune(S) ? 1 : 0; for (const _pp of (f.pets || [])) { _pp.biteMult = tameBiteMult(S); _pp.toxAtk = f.toxAtk; } f.sets = activeSets(S); f.elixirs = adv ? null : S.elixirs; f.wxPow = S.wxPow; f.wxRes = S.wxRes; applySetDef(f); shareAura(f, f.pets || []); if (S.buff && AN[S.buff.k] && --S.buff.left <= 0) S.buff = null; try { const _rl6 = equipRules(S); f.ruleBumie = _rl6.includes('bumie'); f.ruleShiling = _rl6.includes('shiling'); f.ruleLianzhu = _rl6.includes('lianzhu'); f.ruleBeishui = _rl6.includes('beishui'); } catch(_) {} // v1006 法宝规则
  f.bleed = !!S.status.bleed; f.poison = hasSt(S, 'poison') ? 999 : 0; f.pre = { bleed: f.bleed, poison: f.poison > 0 }; return f; }
function carryOut(S, f, res) { // 战斗中新得的流血/中毒：胜利不带，战败100%带出
  if (res.win) return;
  if (f.bleed && !f.pre.bleed && !S.status.bleed) res.newSt.push(addStatus(S, 'bleed'));
  if (f.poison > 0 && !f.pre.poison && !hasSt(S, 'poison')) res.newSt.push(addStatus(S, 'poison'));
}

function gatherProbs(S, kind) {
  const g = GATHER[kind], ks = Object.keys(g.items).filter(k => !g.items[k].extra), v = S.attrs[g.attr];
  const b = Math.min(K.ORE_BONUS_MAX, v * K.ORE_STR_BONUS) * luck(S), out = {};
  ks.forEach((k, i) => out[k] = g.items[k].p + (g.even ? 0 : i === 0 ? -(ks.length - 2) * b : i >= 2 ? b : 0)); // 药草等概率，不受属性影响；第 3 档起每档 +b，从第 1 档扣除
  return out;
}
function gatherCrit(S, kind) { return Math.min(K.MINE_CRIT_MAX, S.attrs[GATHER[kind].attr] * K.MINE_CRIT_PER_STR) * luck(S) + (S.race === 'ling' ? 0.05 : 0); } // v1088 灵族草木亲和：采集成功率 +5%
function gatherCount(S, kind) { // 每次得 1 件；暴击时 2~5 件（看书每次固定 1 张）
  if (GATHER[kind].single || R() >= gatherCrit(S, kind)) return 1;
  const q = Math.min(K.MINE_MORE_MAX, K.MINE_MORE_BASE + S.attrs[GATHER[kind].attr] * K.MINE_MORE_PER_STR);
  let c = 2; while (c < 5 && R() < q) c++; return c;
}
function gather(S, kind, n) { // 返回每次的物品列表，如 [['iron'], ['copper','iron','silver']]
  const g = GATHER[kind]; if (!g || S.dead) return [];
  n = Math.min(n || 1, Math.floor(S.stamina / K.COST_TRAIN));
  const out = []; // v433 移除未使用的st（额外掉落已改走gainItem）
  for (let i = 0; i < n; i++) {
    if (S.dead) break;
    if (hasSt(S, 'depress') && R() < K.DEPRESS_FAIL) { spend(S, K.COST_TRAIN); hungerDown(S, K.HUNGER_ACT, 1); const f = []; f.fail = true; out.push(f); out.fails = (out.fails || 0) + 1; continue; } // 抑郁：心不在焉，一无所获
    const cnt = gatherCount(S, kind), pr = gatherProbs(S, kind), got = [];
    for (let j = 0; j < cnt; j++) { const k = wpick(Object.keys(pr), x => pr[x]); const added = gainItem(S, g.store, k, 1); if (added > 0) got.push(k); else got.lost = (got.lost || 0) + 1; }
    spend(S, K.COST_TRAIN); if (hasSt(S, 'poison') && !S.dead) {
      const hpMax = C.bumpPeak(S) * 5, hpFull = (S.attrs.str + S.attrs.def + S.attrs.vit) * 5;
      const hpCur = S.hpCur != null ? S.hpCur : hpFull;
      const pl = Math.max(1, Math.ceil(hpMax * K.POISON_TRAIN));
      S.hpCur = Math.max(0, hpCur - pl); poisonAcc += pl;
      if (S.hpCur <= 0) { C.die(S, 'poison'); out.died = true; break; } } if (S.dead) { out.died = true; break; } S.attrs[g.attr] += 1; hungerDown(S, K.HUNGER_ACT, 1);
    if (kind === 'hunt' && R() < meatChance(S)) { const m = got[0]; if (m && gainItem(S, 'food', m, 1) > 0) { got.meat = m; (out.meat = out.meat || {})[m] = (out.meat[m] || 0) + 1; } }
    if (kind === 'farm' && R() < premiumChance(S)) { const m = rollTier(LU, S.attrs.def * luck(S)); if (gainItem(S, g.store, m, 1) > 0) { got.premium = m; (out.premium = out.premium || {})[m] = (out.premium[m] || 0) + 1; } else got.lost = (got.lost || 0) + 1; } // v433 额外掉落同样受背包上限限制
    if (kind === 'egg' && R() < K.PET_EGG_CHANCE * luck(S) + (S.race === 'yao' ? 0.05 : 0)) { S.petEggs++; got.petEgg = 1; out.petEgg = (out.petEgg || 0) + 1; } // v1088 妖族灵觉：掏到灵宠蛋概率 +5%
    if (kind === 'mine' && R() < spiritChance(S)) { const sp = rollTier(spTiers(), S.attrs.str * luck(S)); if (gainItem(S, g.store, sp, 1) > 0) { got.spirit = sp; (out.spirit = out.spirit || {})[sp] = (out.spirit[sp] || 0) + 1; } else got.lost = (got.lost || 0) + 1; } // v433 额外掉落同样受背包上限限制
    if (kind === 'read' && R() < skillPageChance(S)) { const sk = pick(Object.keys(SKILLS)); if (gainItem(S, 'skillPages', sk, 1) > 0) { got.skillPage = sk; (out.skillPage = out.skillPage || {})[sk] = (out.skillPage[sk] || 0) + 1; } else got.lost = (got.lost || 0) + 1; } // v433 额外掉落同样受背包上限限制
    out.push(got);
  }
  return out;
}
const skillPageChance = S => Math.min(K.SKILLPAGE_MAX, K.SKILLPAGE_BASE + S.attrs.int * K.SKILLPAGE_PER_INT) * luck(S);
function combinePages(S, pg, n) { // 残页合成经验书
  const bk = Object.keys(EXP_BOOKS).find(b => EXP_BOOKS[b].page === pg); if (!bk) return { ok: false };
  n = Math.min(n || 1, Math.floor((S.pages[pg] || 0) / K.PAGES_PER_BOOK)); if (n <= 0) return { ok: false, why: 'pages' };
  S.pages[pg] -= n * K.PAGES_PER_BOOK; if (!S.pages[pg]) delete S.pages[pg]; S.expBooks[bk] = (S.expBooks[bk] || 0) + n; return { ok: true, n, book: bk };
}
function useExpBook(S, bk, n, target) { // 经验书 → 生活技能经验
  target = target || 'alc'; if (!EXP_BOOKS[bk] || !LIFE_SKILLS[target]) return { ok: false };
  n = Math.min(n || 1, S.expBooks[bk] || 0); if (n <= 0) return { ok: false, why: 'none' };
  S.expBooks[bk] -= n; if (!S.expBooks[bk]) delete S.expBooks[bk];
  const xp = n * EXP_BOOKS[bk].xp, lvUp = gainLifeXp(S, target, xp);
  return { ok: true, n, xp, lvUp, target };
}
function combineSkillPages(S, sk) {
  if (!SKILLS[sk] || (S.skillPages[sk] || 0) < K.SKILL_PAGES_PER_BOOK) return { ok: false };
  S.skillPages[sk] -= K.SKILL_PAGES_PER_BOOK; if (!S.skillPages[sk]) delete S.skillPages[sk]; S.skillBooks[sk] = (S.skillBooks[sk] || 0) + 1; return { ok: true };
}
function useSkillBook(S, sk) { // 与商店购买技能书效果相同：直接习得
  if (!(S.skillBooks[sk] > 0)) return { ok: false }; if (S.skills.includes(sk)) return { ok: false, why: 'learned' };
  if (!--S.skillBooks[sk]) delete S.skillBooks[sk]; S.skills.push(sk); return { ok: true };
}
const skillBookPrice = sk => Math.floor(SKILLS[sk].price * K.SKILLBOOK_SELL);
function sellSkillBook(S, sk) {
  if (!(S.skillBooks[sk] > 0)) return { ok: false }; if (!--S.skillBooks[sk]) delete S.skillBooks[sk];
  const g = skillBookPrice(sk); S.gold += g; return { ok: true, gold: g };
}
const spTiers = () => { const o = {}; Object.keys(ORES).filter(k => ORES[k].extra).forEach(k => o[k] = ORES[k]); return o; };
function tierProbs(items, v) { // 五品概率，属性越高一品越少、高品越多
  const ks = Object.keys(items), b = Math.min(K.TIER_SHIFT_MAX, v * K.TIER_SHIFT_PER), share = [-1, 0.4, 0.3, 0.2, 0.1], out = {};
  ks.forEach((k, i) => out[k] = items[k].p + b * share[i]); return out;
}
function rollTier(items, v) { const pr = tierProbs(items, v); return wpick(Object.keys(pr), k => pr[k]); }
const spiritProbs = S => tierProbs(spTiers(), S.attrs.str), luProbs = S => tierProbs(LU, S.attrs.def);
// 灵宠：孵化 / 出战 / 战斗属性加成
function rollPet(S, k) { return { id: S ? ++S.petSeq : 0, k, q: wpick([0, 1, 2, 3, 4, 5, 6, 7], i => PQLT[i].w), lv: 1, xp: 0, pts: 0, hunger: 100, loyal: K.PET_LOYAL_START, life: K.PET_LIFE_MAX, talent: false, skills: [], attrs: { agi: 1, str: 1, def: 1, vit: 1, int: 1 } }; } // 初始五项全 1；品质独立随机
function hatchPet(S) {
  if (!(S.petEggs > 0) || S.level < K.HATCH_LV) return null;
  S.petEggs--; const hw = hatchWeights(S), k = wpick(Object.keys(PETS), x => hw[x]), dup = S.pets.some(p => p.k === k);
  const pet = rollPet(S, k); S.pets.push(pet); const auto = !S.pet; if (auto) S.pet = pet.id;
  if (pet.q >= 5) { const Q = petQ(pet); announce(S, `📢 全服通告：【<span style="color:${Q.color}">${Q.name}·${PETS[k].name}</span>】出世，恭喜道友！`); }
  return { pet, k, dup, auto };
}
const activePets = S => { const ids = (Array.isArray(S.pet) ? S.pet : (S.pet != null ? [S.pet] : [])).map(x => +x); return ids.map(id => (S.pets || []).find(p => p.id === id)).filter(Boolean).slice(0, 4); };
const activePet = S => activePets(S)[0] || null;
function setPet(S, id) { id = +id; if (!S.pets.some(p => p.id === id)) return false; let arr = (Array.isArray(S.pet) ? S.pet : (S.pet != null ? [S.pet] : [])).map(x => +x); const i = arr.indexOf(id); if (i >= 0) arr.splice(i, 1); else { if (arr.length >= 4) return false; arr.push(id); } S.pet = arr; return true; }
const petXpNeed = lv => lv * K.PET_XP_PER_LV;
function petEffLvMax(pet) { const base = (PQLT[(pet.q | 0)] || PQLT[0]).lvMax || 100; return base + ((pet.breakCount | 0) * 10); } // 突破每次+10级上限
function petGainXp(pet, n) { pet.xp += n; let ups = 0; const sks = [], tls = []; const sk = PET_SET[pet.k]; const lvMax = petEffLvMax(pet); while (pet.xp >= petXpNeed(pet.lv) && pet.lv < lvMax) { pet.xp -= petXpNeed(pet.lv); pet.lv++; pet.pts += K.PET_LV_PTS; const g = petQ(pet).grow; for (const a of ATTRS) pet.attrs[a] += g; ups++; if (sk && !(pet.skills || []).includes(sk) && R() < K.PET_SKILL_P) { (pet.skills = pet.skills || []).push(sk); sks.push(sk); } if (!pet.talent && pet.q === 7 && PET_TALENT[pet.k] && R() < K.TALENT_LEARN_P) { pet.talent = true; tls.push(PET_TALENT[pet.k].name); } } return { ups, sks, tls }; } // 每级 5 点自由属性点 + 按品质全属性成长 + 概率领悟本系套装技能；神级宠物升级 10% 领悟天赋神通
function petAssign(S, id, attr, n) { // 分配灵宠自由属性点
  const pet = S.pets.find(p => p.id === id); if (!pet || !AN[attr]) return 0;
  n = Math.min(Math.max(1, Math.floor(n || 1)), pet.pts); if (n <= 0) return 0;
  pet.pts -= n; pet.attrs[attr] += n; return n;
}
function devourPet(S, eaterId, foodId) { // 吞噬：吞噬者获得被吞噬灵宠的全部五项属性，被吞噬者永久移除；同品种同品质15%概率品质进阶1级；每只限吞5次
  if (eaterId === foodId) return null;
  const eater = S.pets.find(p => p.id === eaterId), food = S.pets.find(p => p.id === foodId); if (!eater || !food) return null;
  if ((eater.devourCount | 0) >= 5) return { err: '此灵宠已吞噬5次，达到上限' };
  const gains = {}; ATTRS.forEach(a => { gains[a] = food.attrs[a]; eater.attrs[a] += food.attrs[a]; });
  const _foodXp = food.xp | 0;
  S.pets = S.pets.filter(p => p.id !== foodId);
  const moved = S.pet === foodId; if (moved) S.pet = eaterId;
  const sks = []; for (const sk of (food.skills || [])) if (!(eater.skills || []).includes(sk) && R() < K.PET_DEVOUR_P) { (eater.skills = eater.skills || []).push(sk); sks.push(sk); }
  let qup = false; const eq = (eater.q | 0);
  if (eq < PQLT.length - 1 && eater.k === food.k && (food.q | 0) === eq && R() < K.PET_DEVOUR_QUP) { eater.q = eq + 1; qup = true; }
  let _xpUp = null; if (_foodXp > 0) _xpUp = petGainXp(eater, _foodXp);
  eater.devourCount = (eater.devourCount | 0) + 1;
  return { eater, food, gains, moved, sks, qup, xpGain: _foodXp, xpUp: _xpUp };
}
function battleAttrs(S) { // 冒险：出战灵宠的小额被动加成（不改变存档属性）
  const ap = activePet(S), p = ap && PETS[ap.k], a = Object.assign({}, S.attrs); if (!p) return a;
  for (const k in p.bonus) a[k] = Math.round(a[k] * (1 + p.bonus[k])); return a;
}
const petBonusTxt = k => { const b = PETS[k].bonus, ks = Object.keys(b); return ks.length === ATTRS.length ? '全属性 +' + pct(b[ks[0]]) : ks.map(a => AN[a] + ' +' + pct(b[a])).join(' '); };
function premiumChance(S) { return Math.min(K.PREMIUM_MAX, K.PREMIUM_BASE + S.attrs.def * K.PREMIUM_PER_DEF) * luck(S); }
function spiritChance(S) { return Math.min(K.SPIRIT_MAX, K.SPIRIT_BASE + S.attrs.str * K.SPIRIT_PER_STR) * luck(S); }
function meatChance(S) { return Math.min(K.MEAT_MAX, K.MEAT_BASE + S.attrs.agi * K.MEAT_PER_AGI) * luck(S); }
function meatPerHunt(S) { const pr = gatherProbs(S, 'hunt'); return meatChance(S) * Object.keys(pr).reduce((a, k) => a + pr[k] * MEATS[k].sta, 0); } // 每次打猎期望回复体力
function eatMeat(S, k, n) {
  const r = eatFood(S, 'meat', k, n); return r ? r.sta : 0;
}
function sellItem(S, kind, k, n) {
  const g = GATHER[kind]; if (!g || !g.items[k] || !g.items[k].price) return { ok: false }; // 灵石不可出售
  const st = S[g.store], have = st[k] || 0; n = Math.min(n || 1, have);
  if (n <= 0) return { ok: false };
  st[k] = have - n; if (!st[k]) delete st[k];
  const gold = n * g.items[k].price; S.gold += gold; return { ok: true, n, gold };
}
const oreProbs = S => gatherProbs(S, 'mine'), mineCritChance = S => gatherCrit(S, 'mine');
const mine = (S, n) => gather(S, 'mine', n), sellOre = (S, k, n) => sellItem(S, 'mine', k, n);

/* ---------- 生活技能：烹饪 / 锻造 / 炼金 / 驯兽（炼药见下） ---------- */
const lifeOf = (S, k) => { if (k === 'alc') return S.alc; const _v = S.life[k]; return _v ? _v : { lv: 0, xp: 0 }; }; // v905 未学习返回0级
// v98 生活技能可选数量：筑基大圆满2、元婴大圆满3、仙人4、主宰5，其余1
function lifeChoiceMax(S) { const r = S.realm | 0, lv = S.level | 0; if (r >= 12) return 5; if (r >= 8) return 4; if (r > 4 || (r === 4 && lv >= 10)) return 3; if (r > 2 || (r === 2 && lv >= 10)) return 2; return 1; }
const lifeAttrRate = (S, k) => Math.min(K.LIFE_ATTR_RATE_MAX, S.attrs[LIFE_SKILLS[k].attr] * K.LIFE_ATTR_RATE);
const lifeAttrQ = (S, k) => Math.min(K.LIFE_ATTR_Q_MAX, S.attrs[LIFE_SKILLS[k].attr] * K.LIFE_ATTR_Q);
function gainLifeXp(S, k, xp) { const L = lifeOf(S, k); L.xp += xp; let up = 0; while (L.xp >= alcNeed(L.lv)) { L.xp -= alcNeed(L.lv); L.lv++; up++; } return up; }
function lifeRate(S, k) { return k === 'alc' ? alcRate(S) : clamp(K.LIFE_BASE_RATE + (lifeOf(S, k).lv - 1) * K.LIFE_RATE_PER_LV + lifeAttrRate(S, k) + (k === 'tame' && S.race === 'yao' ? 0.05 : 0), 0, K.LIFE_RATE_MAX); } // v1088 妖族灵觉：驯兽成功率 +5%
function lifeQProbs(S, k) { const q3 = Math.min(K.LIFE_Q3_MAX, K.LIFE_Q3_BASE + lifeOf(S, k).lv * K.LIFE_Q3_PER_LV + lifeAttrQ(S, k)) * luck(S), q2 = Math.min(K.LIFE_Q2, 1 - q3); return { q3, q2, q1: Math.max(0, 1 - q3 - q2) }; }
function rollQ(S, k) { const p = lifeQProbs(S, k), x = R(); return x < p.q3 ? 3 : x < p.q3 + p.q2 ? 2 : 1; }
const haveNeed = (S, need, times) => need.every(([st, k, n]) => (S[st][k] || 0) >= n * (times || 1));
const takeItem = (S, st, k, n) => { S[st][k] -= n; if (S[st][k] <= 0) delete S[st][k]; };
const dishKey = (d, q) => d + '_' + q, dishOf = key => { const m = /^(d_[a-z]+)_(\d)$/.exec(key); return m && DISHES[m[1]] ? { d: m[1], q: +m[2], ...DISHES[m[1]] } : null; };
const dishSta = (d, q) => Math.round(DISHES[d].sta * [0, 1, 1.25, 1.5][q]);
const refineDouble = S => Math.min(K.REFINE_DOUBLE_MAX, lifeOf(S, 'refine').lv * K.REFINE_DOUBLE_PER_LV + lifeAttrQ(S, 'refine')) * luck(S);
function craft(S, skill, key, opt) { // 烹饪 / 锻造 / 炼金：1 活力；失败只损耗第一种材料 1 份；锻造可指定套装 opt.set
  const rc = RECIPES[skill] && RECIPES[skill][key]; if (!rc) return null;
  { const e = lifeCost(S); if (e) return { err: e }; }
  { if (skill !== 'alc' && !(S.life && S.life[skill])) return { err: 'noskill' }; const _lo = lifeOf(S, skill); if (_lo.lv < rc.lv) return { err: 'lv' }; } if (!haveNeed(S, rc.need)) return { err: 'mat' }; // v911 没学技能判noskill
  payLife(S); hungerDown(S, K.HUNGER_ACT, 1);
  const rate = skill === 'forge' ? forgeRate(S, key) : lifeRate(S, skill), ok = R() < rate, res = { ok, skill, key, rate };
  if (!ok) { const [st, k] = rc.need[0]; takeItem(S, st, k, 1); }
  else {
    rc.need.forEach(([st, k, n]) => takeItem(S, st, k, n));
    if (skill === 'cook') { const d = DISHES[key];
      if (d.zx) { S.zx = S.zx || {}; S.zx[key] = (S.zx[key] || 0) + 1; res.item = key; res.zx = true; } // 珍馐：无品质，存入 S.zx
      else { const q = rollQ(S, skill), dk = dishKey(key, q); S.dishes[dk] = (S.dishes[dk] || 0) + 1; res.q = q; res.item = dk;
      if (q >= 3) announce(S, `📢 全服通告：恭喜道友烹出【<span class="q3">极品${DISHES[key].name}</span>】！`); } }
    else if (skill === 'forge') { const q = rollForgeQ(S, key), g = { id: ++S.gearSeq, k: key, q, v: gearVal(key, q), set: opt && GEAR_SETS[opt.set] ? opt.set : pick(Object.keys(GEAR_SETS)), pet: !!rc.pet }; res.q = q; res.gear = g;
      if (q >= 5) announce(S, `📢 全服通告：恭喜道友锻造出${g.pet ? '灵宠' : ''}【<span class="gq5">传说</span>】<span class="gq5">${gearItemName(key, g.set)}</span>！`);
      if (g.pet) { S.petBag = S.petBag || []; S.petBag.push(g); }
      else if (!S.equip[rc.slot]) { S.equip[rc.slot] = g; res.equipped = true; } else if (S.gearBag.length < bagCap(S)) S.gearBag.push(g); else res.bagFull = true; }
    else if (rc.pot) { const q = rollQ(S, skill), n = 1 + (R() < refineDouble(S) ? 1 : 0), pk = potKey(rc.pot, q); S.elixirs[pk] = (S.elixirs[pk] || 0) + n; res.q = q; res.n = n; res.pot = pk;
      if (q >= 3) announce(S, `📢 全服通告：恭喜道友炼出【<span class="q3">极品${POTIONS[rc.pot].name}</span>】！`); }
    else if (skill === 'formation') { S.formations = S.formations || {}; S.formations[key] = (S.formations[key] || 0) + 1; res.n = 1; res.item = key; } // v788 阵法存入S.formations
    else if (skill === 'talisman') { S.talismans = S.talismans || {}; S.talismans[key] = (S.talismans[key] || 0) + 1; res.n = 1; res.item = key; } // v788 符箓存入S.talismans
    else { const n = 1 + (R() < refineDouble(S) ? 1 : 0), [st, k] = rc.out; S[st][k] = (S[st][k] || 0) + n; res.n = n; }
  }
  res.xp = ok ? K.LIFE_XP_OK : K.LIFE_XP_FAIL; res.lvUp = gainLifeXp(S, skill, res.xp); return res;
}
function eatDish(S, key, n) { // 吃菜：饱食 + 体力（死亡中不回体力）；精良/极品附带增益（覆盖旧增益）
  const d = dishOf(key); if (!d) return null; n = Math.min(n || 1, S.dishes[key] || 0); if (n <= 0) return null;
  S.dishes[key] -= n; if (!S.dishes[key]) delete S.dishes[key];
  S.hunger = Math.min(100, S.hunger + d.hunger * n); const sta = S.dead ? 0 : Math.floor(dishSta(d.d, d.q) * n * (S.race === 'mech' ? 1.2 : 1)); /* v1088 机械不知疲倦：吃菜回体力 +20% */ S.stamina += sta; if (S.afk && sta > 0 && S.stamina >= 1) { const gain = afkExit(S, 'eat'); log('good', gain > 0 ? `🧘 进食出关，获得 <span class="g">${resLbl(S)} +${gain}</span>。` : `🧘 进食出关（不足1分钟，无收益）。`); }
  let buff = null; if (d.q >= 2) { buff = d.buff === 'luck' ? { k: 'luck', v: K.BUFF_LUCK[d.q], left: K.BUFF_ACTS, src: d.name } : { k: d.buff, v: K.BUFF_ATTR[d.q], left: K.BUFF_FIGHTS, src: d.name }; S.buff = buff; }
  return { n, hunger: d.hunger * n, sta, buff, d };
}
const GQNAME = ['', '普通', '优秀', '精良', '史诗', '传说']; // 装备品质 5 档（名字颜色：白/绿/蓝/紫/橙）
const GQ_SET = [0, 1, 1.1, 1.25, 1.4, 1.6];
const GQ_LV1 = [50, 30, 14, 5, 1], GQ_LV10 = [25, 30, 25, 14, 6];
const GQ_ORE = [[1, 1, 1, 1, 1], [1, 1.05, 1.12, 1.35, 1.35], [1, 1.15, 1.3, 1.8, 1.8], [1, 1.3, 1.5, 2.5, 2.5]]; // 铁 / 铜 / 银 / 金：放大优秀及以上权重（金约让史诗、传说翻倍）
const ORE_RATE = [0, 0.05, 0.10, 0.15], FORGE_RATE_MAX = 0.98; // 铁 / 铜 / 银 / 金：锻造成功率加成，上限 98%
const oreTier = k => (k && (GEAR[k] || PET_GEAR[k])) ? (GEAR[k] || PET_GEAR[k]).tier : 1;
function forgeRate(S, k) { const base = clamp(K.LIFE_BASE_RATE + (lifeOf(S, 'forge').lv - 1) * K.LIFE_RATE_PER_LV + lifeAttrRate(S, 'forge'), 0, K.LIFE_RATE_MAX); return Math.min(FORGE_RATE_MAX, base + ORE_RATE[oreTier(k) - 1]); } // 等级+力量的基础成功率 + 矿石加成
function forgeQProbs(S, k) { const om = GQ_ORE[oreTier(k) - 1]; const lvE = lifeOf(S, 'forge').lv + lifeAttrQ(S, 'forge') / K.LIFE_Q3_PER_LV, t = Math.max(0, Math.min(1.8, (lvE - 1) / 9)), lu = luck(S);
  const w = GQ_LV1.map((a, i) => Math.max(0, a + (GQ_LV10[i] - a) * t) * (i >= 2 ? lu : 1) * om[i]), sum = w.reduce((a, b) => a + b, 0); return w.map(x => x / sum); } /* [普通, 优秀, 精良, 史诗, 传说]；力量换算成额外等级，气运放大精良及以上，矿石放大优秀及以上 */
function rollForgeQ(S, k) { const p = forgeQProbs(S, k); let x = R(); for (let i = 0; i < 5; i++) { if (x < p[i]) return i + 1; x -= p[i]; } return 5; }
const gearVal = (k, q) => q + (GEAR[k] ? GEAR[k].tier - 1 : 0); /* 装备属性 = 品质 + 档位 - 1：铁 1~5 / 铜 2~6 / 银 3~7 / 金 4~9（灵宠装备单档，按 1~5）；矿石档位同时影响成功率与品质概率 */
const setCounts = S => { const c = {}; for (const sl in SLOTS) { const g = S.equip && S.equip[sl]; if (g && g.set) c[g.set] = (c[g.set] || 0) + 1; } return c; };
const SET_QMULT = GQ_SET; // 套装效果 × 同套装备的平均品质系数（普通 1 / 优秀 1.1 / 精良 1.25 / 史诗 1.4 / 传说 1.6）
const setQuality = S => { const q = {}; for (const sl in SLOTS) { const g = S.equip && S.equip[sl]; if (g && g.set) (q[g.set] = q[g.set] || []).push(SET_QMULT[g.q] || 1); } for (const k in q) q[k] = q[k].reduce((a, b) => a + b, 0) / q[k].length; return q; };
const activeSets = S => { const c = setCounts(S), qm = setQuality(S), o = {}; for (const k in c) if (c[k] >= 2) o[k] = GEAR_SETS[k].v[Math.min(5, c[k]) - 2] * qm[k]; return o; }; /* {套装: 实际数值 = 件数档位 × 平均品质系数}；致命套只放大触发率 */
const petActiveSets = pet => { const c = {}, q = {}; for (const sl in SLOTS) { const g = pet.peq && pet.peq[sl]; if (g && g.set) { c[g.set] = (c[g.set] || 0) + 1; (q[g.set] = q[g.set] || []).push(SET_QMULT[g.q] || 1); } } const o = {}; for (const k in c) if (c[k] >= 2) o[k] = GEAR_SETS[k].v[Math.min(5, c[k]) - 2] * (q[k].reduce((x, y) => x + y, 0) / q[k].length); return o; }; // 灵宠自身套装：与人物同规则（2/3/4/5 件档 × 平均品质系数）
function gearAdd(S, a) { for (const sl in SLOTS) { const g = S.equip && S.equip[sl]; if (g && GEAR_SETS[g.set]) a[GEAR_SETS[g.set].attr] += g.v * refineMult(g); } return a; } // v1013 炼灵倍率
function equipGear(S, id) { const i = S.gearBag.findIndex(g => g.id === id); if (i < 0) return false; const g = S.gearBag[i], sl = GEAR[g.k] && GEAR[g.k].slot; if (!sl || !SLOTS[sl]) return false; S.gearBag.splice(i, 1); if (S.equip[sl]) S.gearBag.push(S.equip[sl]); for (const k in S.equip) { if (k !== sl && S.equip[k] && GEAR[S.equip[k].k] && GEAR[S.equip[k].k].slot === sl) { S.gearBag.push(S.equip[k]); delete S.equip[k]; } } S.equip[sl] = g; return true; } // v714 同部位唯一性强制校验
function unequipGear(S, sl) { if (!S.equip[sl]) return false; if (S.gearBag.length >= bagCap(S)) return 'full'; S.gearBag.push(S.equip[sl]); S.equip[sl] = null; return true; }
const gearPrice = g => g.v * K.GEAR_SELL_PER_PT;
function sellGear(S, id) { const i = S.gearBag.findIndex(g => g.id === id); if (i < 0) return 0; const p = gearPrice(S.gearBag[i]); S.gearBag.splice(i, 1); S.gold += p; return p; }
function equipPetGear(S, petId, id) { const i = (S.petBag || []).findIndex(g => g.id === id); if (i < 0) return false; const pet = S.pets.find(p => p.id === petId); if (!pet) return false; const g = S.petBag[i]; if (!PET_GEAR[g.k]) return false; const sl = PET_GEAR[g.k].slot; S.petBag.splice(i, 1); pet.peq = pet.peq || {}; if (pet.peq[sl]) S.petBag.push(pet.peq[sl]); pet.peq[sl] = g; return true; } // 灵宠穿装备
function unequipPetGear(S, petId, sl) { const pet = S.pets.find(p => p.id === petId); if (!pet || !pet.peq || !pet.peq[sl]) return false; (S.petBag = S.petBag || []).push(pet.peq[sl]); delete pet.peq[sl]; return true; } // 灵宠卸装备
function sellPetGear(S, id) { const i = (S.petBag || []).findIndex(g => g.id === id); if (i < 0) return 0; const p = gearPrice(S.petBag[i]); S.petBag.splice(i, 1); S.gold += p; return p; } // 出售灵宠装备
const tameBiteMult = S => 1 - Math.min(K.TAME_BITE_CUT_MAX, (lifeOf(S, 'tame').lv - 1) * K.TAME_BITE_CUT_PER_LV);
const tamePetXpChance = S => Math.min(0.5, K.TAME_XP_P + lifeOf(S, 'tame').lv * K.TAME_XP_P_PER_LV) * luck(S);
function hatchWeights(S) { const m = 1 + Math.min(K.TAME_RARE_MAX, (lifeOf(S, 'tame').lv - 1) * K.TAME_RARE_PER_LV), o = {}; for (const k in PETS) o[k] = PETS[k].w * (k === 'qinglong' || k === 'baihu' ? m : 1); return o; }
function hatchProbs(S) { const w = hatchWeights(S), t = Object.values(w).reduce((a, b) => a + b, 0), o = {}; for (const k in w) o[k] = w[k] / t; return o; }
function tame(S, attr, petId) { // 驯兽：1 活力，训练指定灵宠的一项属性（普通 +1 / 精良 +2 / 极品 +3），忠诚 +3（每 3 级 +1），并有概率获得灵宠经验；成仙后每次耗10年寿元，仙级以上灵宠双倍
  { const e = lifeCost(S); if (e) return { err: e }; } const p = petId ? (S.pets || []).find(x => x.id === petId) : activePet(S); if (!p) return { err: 'pet' };
  const _lifeCost = (S.realm | 0) >= 8 ? (((p.q | 0) >= 6 ? 20 : 10)) : 0;
  if (_lifeCost > 0 && (S.lifespan | 0) < _lifeCost) return { err: 'lifespan' };
  payLife(S); hungerDown(S, K.HUNGER_ACT, 1);
  if (_lifeCost > 0) S.lifespan -= _lifeCost;
  attr = AN[attr] ? attr : 'str';
  const ok = R() < lifeRate(S, 'tame'), res = { ok, pet: p, attr, gain: 0, q: 0, loyal: 0, petXp: 0, petUp: 0, lifeCost: _lifeCost };
  if (ok) { res.q = rollQ(S, 'tame'); res.gain = res.q; p.attrs[attr] += res.gain; res.loyal = Math.min(100 - p.loyal, K.TAME_LOYAL + Math.floor(lifeOf(S, 'tame').lv / 3)); p.loyal += res.loyal;
    if (R() < tamePetXpChance(S)) { res.petXp = K.TAME_PET_XP; const pg = petGainXp(p, K.TAME_PET_XP); res.petUp = pg.ups; res.petSks = (res.petSks || []).concat(pg.sks); if (pg.tls.length) res.petTls = (res.petTls || []).concat(pg.tls); } }
  res.xp = ok ? K.LIFE_XP_OK : K.LIFE_XP_FAIL; res.lvUp = gainLifeXp(S, 'tame', res.xp); return res;
}
const EGG_ORDER = ['chicken', 'duck', 'goose', 'ostrich']; // 蛋按低级→高级
const eggTotal = S => EGG_ORDER.reduce((a, k) => a + (((S.eggs || {})[k]) || 0), 0);
function takeEgg(S, n) { let left = n; for (const k of EGG_ORDER) { while (left > 0 && (S.eggs[k] || 0) > 0) { S.eggs[k]--; if (!S.eggs[k]) delete S.eggs[k]; left--; } } return left === 0; } // 优先消耗低级蛋
const MEAT_ORDER = ['rabbit', 'deer', 'wolf', 'tiger']; // 肉按低级→高级
const meatTotal = S => MEAT_ORDER.reduce((a, k) => a + (((S.food || {})[k]) || 0), 0);
function takeMeat(S, n) { // 优先消耗低级肉；调用前已确认总量足够
  let left = n; for (const k of MEAT_ORDER) { while (left > 0 && (S.food[k] || 0) > 0) { S.food[k]--; if (!S.food[k]) delete S.food[k]; left--; } }
}
function tamePill(S) { // 驯兽炼制灵兽丹：1 活力，肉×2（优先低级）+ 1 张普通残页（驯兽诀）；成功率=驯兽成功率，品质普通/精良/极品；失败只耗 1 份肉，残页不损耗
  { const e = lifeCost(S); if (e) return { err: e }; }
  if (meatTotal(S) < 2) return { err: 'mat' };
  if ((S.pages.pg1 || 0) < 1) return { err: 'mat' };
  payLife(S); hungerDown(S, K.HUNGER_ACT, 1);
  const ok = R() < lifeRate(S, 'tame'), res = { ok, q: 0 };
  takeMeat(S, ok ? 2 : 1);
  if (ok) { res.q = rollQ(S, 'tame'); S.beastPills = S.beastPills || {}; const k = 'bp' + res.q; S.beastPills[k] = (S.beastPills[k] || 0) + 1;
    S.pages.pg1--; if (!S.pages.pg1) delete S.pages.pg1;
    if (res.q >= 3) announce(S, `📢 全服通告：恭喜道友炼出【<span class="q3">极品灵兽丹</span>】！`); }
  res.xp = ok ? K.LIFE_XP_OK : K.LIFE_XP_FAIL; res.lvUp = gainLifeXp(S, 'tame', res.xp); return res;
}
function feedBeastPill(S, q) { // 喂食灵兽丹：出战灵宠得经验（可升级/领悟技能/天赋）
  const p = activePet(S); if (!p) return { err: 'pet' };
  S.beastPills = S.beastPills || {}; const k = 'bp' + q;
  if (!(S.beastPills[k] > 0)) return { err: 'mat' };
  S.beastPills[k]--; if (!S.beastPills[k]) delete S.beastPills[k];
  const g = petGainXp(p, K.BEASTPILL_XP[q] || 0);
  return { ok: true, q, pet: p, xp: K.BEASTPILL_XP[q] || 0, ups: g.ups, sks: g.sks, tls: g.tls };
}

/* ---------- 炼药 ---------- */
const boostOf = (lu, sp) => ((lu && LU[lu] && LU[lu].alc) || 0) + ((sp && ORES[sp] && ORES[sp].alc) || 0);
function alcRate(S, lu, sp) { let base = clamp(clamp(K.ALC_BASE_RATE + (S.alc.lv - 1) * K.ALC_RATE_PER_LV + lifeAttrRate(S, 'alc'), 0, K.ALC_RATE_MAX) * (1 + fateMod(S, 'brew')) * (skyToday().key === 'tide' ? 1.05 : 1) /* v1015 潮汐 */, 0, K.ALC_RATE_MAX), b = boostOf(lu, sp); if (S.race === 'ling') base = Math.min(K.ALC_RATE_MAX, base + 0.05); return b ? Math.min(K.ALC_BOOST_RATE_MAX, base + b) : base; } // v1088 灵族草木亲和：炼丹成功率 +5%
function potCountProbs(S) { return null; } // 已改为1-10枚随机，不再用概率表
function gradeProbs(S, lu, sp) { const q5 = Math.min(K.Q5_MAX, K.Q5_BASE + S.alc.lv * K.Q5_PER_LV); const q4 = Math.min(K.Q4_MAX, K.Q4_BASE + S.alc.lv * K.Q4_PER_LV); const q3 = Math.min(K.ALC_BOOST_Q3_MAX, Math.min(K.Q3_MAX, K.Q3_BASE + S.alc.lv * K.Q3_PER_LV + lifeAttrQ(S, 'alc')) + boostOf(lu, sp)); const q2 = Math.min(K.Q2, Math.max(0, 1 - q5 - q4 - q3)); return { q5, q4, q3, q2, q1: Math.max(0, 1 - q5 - q4 - q3 - q2) }; }
/* ---------- v998 丹毒 / 变异丹 ---------- */
const TOX_BY_GRADE = { 1: 10, 2: 8, 3: 5, 4: 3, 5: 1 };
function toxFactor(S) { const t = S.danDu | 0; if (t <= 20) return 1; return Math.max(0.2, 1 - Math.ceil((t - 20) / 10) * 0.1); }
function danDuCap(S) { return (S && S.titleAch === 'baidu' && S.achv && S.achv['baidu']) ? 10000 : 5000; } // v1140 佩戴成就称号【百毒不侵】时丹毒上限 10000
function toxImmune(S) { return !!(S && S.titleAch === 'baidu' && S.achv && S.achv['baidu']); } // v1140 佩戴【百毒不侵】时不中【中毒】
function addDanDu(S, n) { // v1149 Ye 定：有毒丹后双计数——本体丹毒每涨一笔，累积池同步加全额；本体到上限不涨了，池照样加（池初始 0、上限 10000）
  S.danDu = Math.min(danDuCap(S), (S.danDu | 0) + n);
  if (S.toxDan) S.toxPool = Math.min(10000, (S.toxPool | 0) + n);
}
function toxEff(S) { return (S.danDu | 0) * 2 + (S.toxDan ? (S.toxPool | 0) : 0); } // v1146 Ye 定：毒修对战相克值 = 丹毒×2 + 毒丹累积池，看谁高
function tryToxDan(S, fromRealm) { // v1145 Ye 定：只在筑基→金丹突破时判结毒丹——丹毒 >1000 后，每多 100 点 +1%（2000→10%，5000→40%，10000→90%）；v1147 有毒灵根再 +10%
  if ((fromRealm | 0) !== 2 || S.toxDan) return null;
  const d = S.danDu | 0;
  if (d <= 1000) return null;
  const p = Math.floor((d - 1000) / 100) * 0.01 + ((S.lingGen || []).includes('毒') ? 0.10 : 0);
  if (Math.random() >= p) return null;
  S.toxDan = 1; S.toxPool = S.toxPool | 0;
  return 1;
}
function toxTier(t) { t = t | 0; return t <= 0 ? '清' : t <= 20 ? '微毒' : t <= 60 ? '积毒' : '毒深'; }
const MUT_PILLS = {
  kuang: { name: '狂暴丹', desc: '丹纹如血丝，药力躁动难驯。', tox: 25 },
  chuan_str: { name: '串味·虎力丹', desc: '串了味的丹，力大无穷。', tox: 25 },
  chuan_agi: { name: '串味·疾风丹', desc: '丹香里裹着一股风。', tox: 25 },
  tiegu: { name: '铁骨丹', desc: '丹身沉坠，硬如铁石。', tox: 25 },
  feixue: { name: '沸血丹', desc: '入喉如吞火炭，血沸三息。', tox: 40 },
  zuixian: { name: '醉仙丹', desc: '未服先闻三分醉。', tox: 25 },
  changsheng: { name: '长生变异丹', desc: '丹成那夜，炉边草木一齐返青。', tox: 30, jue: 1 },
  xisui: { name: '洗髓丹', desc: '伐毛洗髓，旧毒尽去。', tox: 0, jue: 1 },
  pojing: { name: '破境变异丹', desc: '丹中隐隐有雷声。', tox: 30, jue: 1 }
};
const MUT_COMBOS = {
  '*|dw1+h_int': 'kuang',
  'str|h_agi': 'chuan_agi',
  'agi|h_str': 'chuan_str',
  'vit|h_def+h_def': 'tiegu',
  'def|dw2': 'feixue',
  'int|dw1+h_vit': 'zuixian',
  '*|h_agi+h_def+h_str': 'changsheng',
  '*|dw3+dw3': 'xisui',
  'int|dw2+h_str+h_vit': 'pojing'
};
function mutComboFor(attr, extras) { const sig = extras.slice().sort().join('+'); return MUT_COMBOS[attr + '|' + sig] || MUT_COMBOS['*|' + sig] || null; }
function brewDetox(S) {
  if (S.dead) return { err: 'dead' };
  if (useFali(S)) { if (S.mana < lifeManaCost(S)) return { err: 'mana' }; } else if (S.vigor < K.COST_LIFE) return { err: 'vigor' };
  if ((S.mats['h_vit'] || 0) <= 0 || (S.mats['dw1'] || 0) <= 0) return { err: 'mat' };
  useMat(S, 'h_vit'); useMat(S, 'dw1');
  payLife(S); S.stats.brew++; hungerDown(S, K.HUNGER_ACT, 1);
  const rate = alcRate(S), ok = R() < rate; let n = 0;
  if (ok) { S.stats.brewOk++; n = 1 + Math.floor(R() * 3); S.inv['detox'] = (S.inv['detox'] || 0) + n; }
  const xp = ok ? K.ALC_XP_OK : K.ALC_XP_FAIL; S.alc.xp += xp;
  let lvUp = 0; while (S.alc.xp >= alcNeed(S.alc.lv)) { S.alc.xp -= alcNeed(S.alc.lv); S.alc.lv++; lvUp++; }
  return { ok, rate, n, xp, lvUp };
}
function brewAntidote(S) { // v1163 解毒丹自炼（Ye 定：商店 1000 金/颗，也能自己炼）：敏捷草 + 一品凝露，成丹 1-3 颗（与化无丹同口径）
  if (S.dead) return { err: 'dead' };
  if (useFali(S)) { if (S.mana < lifeManaCost(S)) return { err: 'mana' }; } else if (S.vigor < K.COST_LIFE) return { err: 'vigor' };
  if ((S.mats['h_agi'] || 0) <= 0 || (S.mats['dw1'] || 0) <= 0) return { err: 'mat' };
  useMat(S, 'h_agi'); useMat(S, 'dw1');
  payLife(S); S.stats.brew++; hungerDown(S, K.HUNGER_ACT, 1);
  const rate = alcRate(S), ok = R() < rate; let n = 0;
  if (ok) { S.stats.brewOk++; n = 1 + Math.floor(R() * 3); if (!S.meds) S.meds = {}; S.meds['antidote'] = (S.meds['antidote'] || 0) + n; }
  const xp = ok ? K.ALC_XP_OK : K.ALC_XP_FAIL; S.alc.xp += xp;
  let lvUp = 0; while (S.alc.xp >= alcNeed(S.alc.lv)) { S.alc.xp -= alcNeed(S.alc.lv); S.alc.lv++; lvUp++; }
  return { ok, rate, n, xp, lvUp };
}
const DANWAN = { // v1096 炼药阶梯：辟谷丸/气力丸（丸非丹，不积丹毒；成品走 S.dan 透传，如菜肴）
  bigu: { name: '辟谷丸', icon: '🍘', lv: 3, herb: 'h_vit', desc: '饱食 +20', fx: 'hunger', val: 20 },
  qili: { name: '气力丸', icon: '💪', lv: 5, herb: 'h_str', desc: '体力 +3', fx: 'sta', val: 3 },
};
function brewDan(S, key) { // v1096 炼丸（本地判定，照抄化无丹）
  const def = DANWAN[key]; if (!def) return null;
  if (S.dead) return { err: 'dead' };
  if (useFali(S)) { if (S.mana < lifeManaCost(S)) return { err: 'mana' }; } else if (S.vigor < K.COST_LIFE) return { err: 'vigor' };
  if ((S.alc.lv|0) < def.lv) return { err: 'lv' };
  if ((S.mats[def.herb] || 0) <= 0 || eggTotal(S) < 1) return { err: 'mat' };
  useMat(S, def.herb); takeEgg(S, 1);
  payLife(S); S.stats.brew++; hungerDown(S, K.HUNGER_ACT, 1);
  const rate = alcRate(S), ok = R() < rate; let n = 0;
  if (ok) { S.stats.brewOk++; n = 1; if (!S.dan) S.dan = {}; S.dan[key] = (S.dan[key] || 0) + n; }
  const xp = ok ? K.ALC_XP_OK : K.ALC_XP_FAIL; S.alc.xp += xp;
  let lvUp = 0; while (S.alc.xp >= alcNeed(S.alc.lv)) { S.alc.xp -= alcNeed(S.alc.lv); S.alc.lv++; lvUp++; }
  return { ok, rate, n, xp, lvUp };
}
function lwCritP(years) { return Math.min(0.40, String(Math.max(1, years | 0)).length * 0.05); } // v1129 年份暴击率：年份位数 × 5%，封顶 40%
function brewSyd(S, idx) { // v1129 寿元丹：指定灵物×1 + 生命草×3 + 兽蛋×1（炼药 地6/天8/仙10）；成丹带灵物五行，寿元 = 年份×50%；年份暴击出 2~10 颗；材料先扣、失败不返（与化无丹/炼丸同规）
  const w = (S.lingwu || [])[idx | 0]; if (!w) return null;
  if (S.dead) return { err: 'dead' };
  if (useFali(S)) { if (S.mana < lifeManaCost(S)) return { err: 'mana' }; } else if (S.vigor < K.COST_LIFE) return { err: 'vigor' };
  const needLv = [6, 8, 10][w.g - 1];
  if ((S.alc.lv | 0) < needLv) return { err: 'lv' };
  if ((S.mats['h_vit'] || 0) < 3 || eggTotal(S) < 1) return { err: 'mat' };
  S.lingwu.splice(idx | 0, 1);
  useMat(S, 'h_vit'); useMat(S, 'h_vit'); useMat(S, 'h_vit'); takeEgg(S, 1);
  payLife(S); S.stats.brew++; hungerDown(S, K.HUNGER_ACT, 1);
  const rate = alcRate(S), ok = R() < rate; let n = 0, crit = 0;
  const val = Math.max(1, Math.floor(w.y * 0.5));
  if (ok) { S.stats.brewOk++; n = 1; if (R() < lwCritP(w.y)) { crit = 2 + Math.floor(R() * 9); n = crit; } if (!Array.isArray(S.syd)) S.syd = []; for (let i = 0; i < n; i++) S.syd.push({ e: w.e, val }); }
  const xp = ok ? K.ALC_XP_OK : K.ALC_XP_FAIL; S.alc.xp += xp;
  let lvUp = 0; while (S.alc.xp >= alcNeed(S.alc.lv)) { S.alc.xp -= alcNeed(S.alc.lv); S.alc.lv++; lvUp++; }
  return { ok, rate, n, crit, xp, lvUp, e: w.e, val };
}
function brewKm(S) { // v1129 开脉丹：地+天+仙灵物各 1 株（自动年份最低）+ 兽蛋×1，炼药 Lv.10；不分五行、不暴击
  if (S.dead) return { err: 'dead' };
  if (useFali(S)) { if (S.mana < lifeManaCost(S)) return { err: 'mana' }; } else if (S.vigor < K.COST_LIFE) return { err: 'vigor' };
  if ((S.alc.lv | 0) < 10) return { err: 'lv' };
  const picks = [];
  for (let g = 1; g <= 3; g++) { let bi = -1; (S.lingwu || []).forEach((w, i) => { if (w.g === g && (bi < 0 || w.y < S.lingwu[bi].y)) bi = i; }); if (bi < 0) return { err: 'mat' }; picks.push(bi); }
  if (eggTotal(S) < 1) return { err: 'mat' };
  picks.sort((a, b) => b - a).forEach(i => S.lingwu.splice(i, 1));
  takeEgg(S, 1);
  payLife(S); S.stats.brew++; hungerDown(S, K.HUNGER_ACT, 1);
  const rate = alcRate(S), ok = R() < rate; let n = 0;
  if (ok) { S.stats.brewOk++; n = 1; if (!S.inv) S.inv = {}; S.inv['mai'] = (S.inv['mai'] || 0) + 1; }
  const xp = ok ? K.ALC_XP_OK : K.ALC_XP_FAIL; S.alc.xp += xp;
  let lvUp = 0; while (S.alc.xp >= alcNeed(S.alc.lv)) { S.alc.xp -= alcNeed(S.alc.lv); S.alc.lv++; lvUp++; }
  return { ok, rate, n, xp, lvUp };
}
function eatSyd(S, idx) { // v1129 服寿元丹：灵根对应全效，否则减半；积丹毒 +1
  if (!Array.isArray(S.syd)) return null;
  const p = S.syd[idx | 0]; if (!p) return null;
  S.syd.splice(idx | 0, 1);
  const f = eleFactorL(S, p.e);
  const gain = Math.floor(p.val * f);
  S.lifespan = (S.lifespan || 100) + gain;
  addDanDu(S, 1);
  const awakened = tryAwakenRoot(S, rootBaseL(p.e)); // v1134 吃对应行丹觉醒：须有该基础灵根
  const comprehended = awakened ? null : tryComprehendRoot(S, p.e); // v1135 吃不相对应丹：极稀有领悟新灵根
  return { gain, f, e: p.e, val: p.val, awakened, comprehended };
}
Object.assign(C, { lwCritP, brewSyd, brewKm, eatSyd });
function useDanwan(S, key, n) { // v1096 服丸
  const def = DANWAN[key]; if (!def) return 0;
  if (!S.dan) S.dan = {};
  const have = S.dan[key] || 0; n = Math.min(n || 1, have); if (n <= 0) return 0;
  S.dan[key] = have - n; if (!S.dan[key]) delete S.dan[key];
  if (def.fx === 'hunger') S.hunger = Math.min(100, (S.hunger|0) + def.val * n);
  else if (def.fx === 'sta') S.stamina = (S.stamina|0) + def.val * n;
  return n;
}
function useMutPill(S, id) {
  const def = MUT_PILLS[id]; if (!def) return null;
  const key = 'mut_' + id; if ((S.inv[key] || 0) <= 0) return null;
  S.inv[key]--; if (!S.inv[key]) delete S.inv[key];
  const f = toxFactor(S); const gains = {}; let txt = '';
  const add = (a, v) => { const g = Math.round(v * f); if (g > 0) { S.attrs[a] += g; gains[a] = g; } };
  if (id === 'kuang') { add(ATTRS[Math.floor(R() * 5)], 6); }
  else if (id === 'chuan_str') add('str', 8);
  else if (id === 'chuan_agi') add('agi', 8);
  else if (id === 'tiegu') { add('def', 8); add('vit', 8); }
  else if (id === 'feixue') { add('str', 6); add('agi', 6); }
  else if (id === 'zuixian') { add('int', 8); add('vit', 8); }
  else if (id === 'changsheng') { const ly = Math.round(200 * f); S.lifespan = (S.lifespan || 100) + ly; txt = '寿元 +' + ly + ' 年'; }
  else if (id === 'xisui') { ATTRS.forEach(a => add(a, 5)); S.danDu = 0; txt = '丹毒尽去'; }
  else if (id === 'pojing') { if ((S.realm | 0) <= 0) { const x = Math.round(400 * f); S.xp = (S.xp || 0) + x; txt = '经验 +' + x; } else { S.mana = manaMax(S); txt = '法力回满'; } }
  if (id !== 'xisui' && def.tox) addDanDu(S, def.tox);
  return { gains, txt, f };
}
function useDetoxPill(S, n) {
  const have = S.inv['detox'] || 0; n = Math.min(n || 1, have); if (n <= 0) return 0;
  S.inv['detox'] = have - n; if (!S.inv['detox']) delete S.inv['detox'];
  const before = S.danDu || 0; S.danDu = Math.max(0, before - 20 * n); return before - S.danDu; // 累积池是双计数攒下的，只涨不随解毒减（v1149）
}
function brew(S, attr, opt) {
  if (!AN[attr]) return null;
  if (S.dead) return { err: 'dead' };
  if (useFali(S)) { if (S.mana < lifeManaCost(S)) return { err: 'mana' }; } else if (S.vigor < K.COST_LIFE) return { err: 'vigor' };
  if ((S.mats['h_' + attr] || 0) <= 0 || eggTotal(S) < 1) return { err: 'mat' }; // 需 1 株对应药草 + 1 枚兽蛋（药引，优先低级）
  useMat(S, 'h_' + attr);
  opt = opt || {};
  // v998 加料判定：变异优先；未中搭配按加料数掷炸炉（基础料只损药草、药引未动、加料全损）
  const extras = [];
  if (Array.isArray(opt.extras)) { for (const ek of opt.extras.slice(0, 3)) { if ((ek.startsWith('h_') || ek.startsWith('dw')) && useMat(S, ek)) extras.push(ek); } }
  const _alcXp = () => { let u = 0; while (S.alc.xp >= alcNeed(S.alc.lv)) { S.alc.xp -= alcNeed(S.alc.lv); S.alc.lv++; u++; } return u; };
  if (extras.length) {
    const combo = mutComboFor(attr, extras);
    if (combo) {
      takeEgg(S, 1); payLife(S); S.stats.brew++; S.stats.brewOk++; hungerDown(S, K.HUNGER_ACT, 1);
      S.inv['mut_' + combo] = (S.inv['mut_' + combo] || 0) + 1;
      if (MUT_PILLS[combo].jue) announce(S, '📢 全服通告：有道友炼丹时炉火冲霄，成此绝世变异【' + MUT_PILLS[combo].name + '】！');
      S.alc.xp += K.ALC_XP_OK;
      return { ok: true, mut: combo, rate: 1, attr, potions: [], xp: K.ALC_XP_OK, lvUp: _alcXp(), lu: null, sp: null, extras };
    }
    if (R() < [0, 0.15, 0.30, 0.50][extras.length]) {
      payLife(S); S.stats.brew++; hungerDown(S, K.HUNGER_ACT, 1);
      S.alc.xp += K.ALC_XP_FAIL;
      return { ok: false, bomb: true, rate: 0, attr, potions: [], xp: K.ALC_XP_FAIL, lvUp: _alcXp(), lu: null, sp: null, extras };
    }
  }
  takeEgg(S, 1);
  payLife(S); S.stats.brew++; hungerDown(S, K.HUNGER_ACT, 1); /* 炼药消耗活力/法力，不再消耗体力 */
  opt = opt || {};
  const lu = (opt.lu && LU[opt.lu] && useMat(S, opt.lu)) ? opt.lu : null; // 可选投入 1 瓶凝露
  let sp = null; if (opt.spirit && ORES[opt.spirit] && ORES[opt.spirit].alc && (S.ores[opt.spirit] || 0) > 0) { sp = opt.spirit; S.ores[sp]--; if (!S.ores[sp]) delete S.ores[sp]; } // 可选投入 1 块灵石
  const rate = alcRate(S, lu, sp), ok = R() < rate, potions = [];
  const duilu = extras.length > 0 && extras.every(e => e === 'h_' + attr); // v998 对路
  if (ok) {
    S.stats.brewOk++;
    const cnt = 1 + Math.floor(R() * 10); // 1-10枚随机
    const gp = gradeProbs(S, lu, sp);
    for (let i = 0; i < cnt; i++) {
      const y = R(); let g = y < gp.q5 ? 5 : y < gp.q5 + gp.q4 ? 4 : y < gp.q5 + gp.q4 + gp.q3 ? 3 : y < gp.q5 + gp.q4 + gp.q3 + gp.q2 ? 2 : 1; if (duilu && i === 0 && g < 5) g += 1; // v998 对路首丹+1品
      potions.push(g); const key = attr + '_' + g; S.inv[key] = (S.inv[key] || 0) + 1;
      if (g >= 5) announce(S, `📢 全服通告：恭喜道友炼出【<span class="q3">完美${AN[attr]}丹</span>】！`);
      else if (g >= 4) announce(S, `📢 全服通告：恭喜道友炼出【<span class="q2">丹纹${AN[attr]}丹</span>】！`);
      else if (g >= 3) announce(S, `📢 全服通告：恭喜道友炼出【<span class="q3">极品${AN[attr]}丹</span>】！`);
    }
  }
  const xp = ok ? K.ALC_XP_OK : K.ALC_XP_FAIL; S.alc.xp += xp;
  let lvUp = 0; while (S.alc.xp >= alcNeed(S.alc.lv)) { S.alc.xp -= alcNeed(S.alc.lv); S.alc.lv++; lvUp++; }
  return { ok, rate, attr, potions, xp, lvUp, lu, sp, extras, duilu };
}
function useMat(S, k) { if ((S.mats[k] || 0) <= 0) return false; S.mats[k]--; if (!S.mats[k]) delete S.mats[k]; return true; }

/* ---------- 商店 ---------- */
function buy(S, kind, key, n) {
  n = Math.max(1, n || 1);
  const _gp = p => S.race === 'traveler' ? Math.ceil(p * 0.95) : p; // v1088 穿越者见多识广：商会买东西 −5%
  if (kind === 'med') {
    const m = MEDS[key]; if (!m) return { ok: false };
    n = Math.min(n, Math.floor(S.gold / _gp(m.price))); if (n <= 0) return { ok: false, why: 'gold' };
    S.gold -= _gp(m.price) * n; S.meds[key] = (S.meds[key] || 0) + n; return { ok: true, n, cost: _gp(m.price) * n };
  }
  if (kind === 'mat') {
    const m = MATS[key]; if (!m) return { ok: false };
    n = Math.min(n, Math.floor(S.gold / _gp(m.price))); if (n <= 0) return { ok: false, why: 'gold' };
    S.gold -= _gp(m.price) * n; S.mats[key] = (S.mats[key] || 0) + n; return { ok: true, n, cost: _gp(m.price) * n };
  }
  if (kind === 'ring') {
    if ((S.pouch || 0) >= 10) return { ok: false, why: 'max' };
    if (S.ringBought) return { ok: false, why: 'once' }; // v881 一个号限购1只
    if (S.gold < _gp(1000)) return { ok: false, why: 'gold' };
    S.gold -= _gp(1000); S.pouch = (S.pouch || 0) + 1; S.ringBought = 1; return { ok: true, n: 1, cost: _gp(1000) }; // v882 商店卖小型储物袋1000金
  }
  if (kind === 'ring_stone') { // v883 灵石买储物戒指：下/中/上品各限1枚
    const flag = 'ringBought_' + k;
    if (S[flag]) return { ok: false, why: 'once' };
    if ((S.ores[k] || 0) < 1) return { ok: false, why: 'stone' };
    S.ores[k]--; S[flag] = 1; S.rings = (S.rings || 0) + 1; return { ok: true, n: 1, cost: 0 };
  }
  if (kind === 'space_s') { // v883 极品灵石买储物空间(小)×3，每号限1
    if (S.spaceSBought) return { ok: false, why: 'once' };
    if ((S.ores.sp5 || 0) < 1) return { ok: false, why: 'stone' };
    S.ores.sp5--; S.spaceSBought = 1; S.spaceS = (S.spaceS || 0) + 1; return { ok: true, n: 1, cost: 0 };
  }
  if (kind === 'space_l') { // v883 1仙玉买储物空间(大)×4，每号限1；v884 改1仙玉
    if (S.spaceLBought) return { ok: false, why: 'once' };
    if ((S.xianyu || 0) < 1) return { ok: false, why: 'xianyu' };
    S.xianyu -= 1; S.spaceLBought = 1; S.spaceL = (S.spaceL || 0) + 1; return { ok: true, n: 1, cost: 0 };
  }
  if (kind === 'spirit') {
    const price = _gp(100); // v759 一品灵石售价100金
    n = Math.min(n, Math.floor(S.gold / price)); if (n <= 0) return { ok: false, why: 'gold' };
    S.gold -= price * n; S.ores.sp1 = (S.ores.sp1 || 0) + n; return { ok: true, n, cost: price * n };
  }

  const sk = SKILLS[key]; if (!sk) return { ok: false };
  if (S.skills.includes(key)) return { ok: false, why: 'learned' };
  if (S.gold < _gp(sk.price)) return { ok: false, why: 'gold' };
  S.gold -= _gp(sk.price); S.skills.push(key); return { ok: true, n: 1, cost: _gp(sk.price) };
}
function invList(S) {
  const out = [];
  ATTRS.forEach(a => [5, 4, 3, 2, 1].forEach(g => { const c = S.inv[a + '_' + g] || 0; if (c > 0) out.push({ attr: a, grade: g, count: c }); }));
  return out;
}
const invCount = S => Object.values(S.inv).reduce((s, c) => s + c, 0);
function drink(S, attr, grade, n) {
  const key = attr + '_' + grade, have = S.inv[key] || 0; n = Math.min(n || 1, have);
  if (n <= 0) return 0;
  S.inv[key] = have - n; if (!S.inv[key]) delete S.inv[key];
  const _f998 = toxFactor(S); const _gain998 = Math.round(grade * n * _f998);
  S.attrs[attr] += _gain998;
  const _tox998 = (TOX_BY_GRADE[grade] || 5) * n; addDanDu(S, _tox998);
  S._drinkFx = { f: _f998, tox: _tox998 };
  return _gain998; // v998 丹毒打折+积毒
}
/* ---------- 脉络系统 v89：虚络/实络/虚脉/实脉 ---------- */
const maiLuo = S => (S.maiVLuo|0) + (S.maiRLuo|0); // 络总数（虚+实）：每条闭关+1
const maiMai = S => (S.maiVMai|0) + (S.maiRMai|0); // 脉总数（虚+实）：仅计数用
const maiMult = S => 2 + szVMaiPress(S) + maiRMaiEff(S); // 溢出倍数：基础2 + 虚脉压条（szVMaiPress：左右成对+任督，上限14）+ 实脉（maiRMaiEff 封顶13）
const maiShuLv = S => Math.floor((S.maiShuXp|0) / 10); // 开脉术等级（10经验1级，无额外加成）
const MAI_RATE = () => 0.10; // 旧：每条脉络闭关法力加成（v89已废，仅留兼容）
const SZ_SEATS = [ // v993 神藏：座序=境界名序；mer=STAR_NMER 经序（任0督1肺2大肠3胃4脾5心6小肠7膀胱8肾9心包10三焦11胆12肝13）
  { name: '凡人神藏', short: '凡人', mer: [6], merName: '心经', cnt: 9 },
  { name: '练气神藏', short: '练气', mer: [10], merName: '心包经', cnt: 9 },
  { name: '筑基神藏', short: '筑基', mer: [2], merName: '肺经', cnt: 11 },
  { name: '金丹神藏', short: '金丹', mer: [13], merName: '肝经', cnt: 14 },
  { name: '元婴神藏', short: '元婴', mer: [7], merName: '小肠经', cnt: 19 },
  { name: '化神神藏', short: '化神', mer: [3], merName: '大肠经', cnt: 20 },
  { name: '大乘神藏', short: '大乘', mer: [5], merName: '脾经', cnt: 21 },
  { name: '渡劫神藏', short: '渡劫', mer: [11], merName: '三焦经', cnt: 23 },
  { name: '仙人神藏', short: '仙人', mer: [9], merName: '肾经', cnt: 27 },
  { name: '金仙神藏', short: '金仙', mer: [12], merName: '胆经', cnt: 44 },
  { name: '合体神藏', short: '合体', mer: [4], merName: '胃经', cnt: 45 },
  { name: '尊者神藏', short: '尊者', mer: [8], merName: '膀胱经', cnt: 67 },
  { name: '主宰大圆满神藏', short: '主宰', mer: [0, 1], merName: '任督二脉', cnt: 52 },
];
const SZ_MER_ORDER = (() => { const s1 = SZ_SEATS.map((st, i) => i).filter(i => SZ_SEATS[i].mer.length === 1).sort((a, b) => SZ_SEATS[a].cnt - SZ_SEATS[b].cnt || a - b); const s2 = SZ_SEATS.map((st, i) => i).filter(i => SZ_SEATS[i].mer.length > 1); return s1.concat(s2); })(); // v1120 Ye 定：经络顺序按穴位数从少到多，任督二脉最后（不是座序；现数据下为心 心包 肺 肝 小肠 大肠 脾 三焦 肾 胆 胃 膀胱 任督）
const szProg = (S, i) => { const a = Array.isArray(S.shenzang) ? S.shenzang : []; return Math.max(0, Math.min(10, Math.floor(+a[i] || 0))); };
const szSetProg = (S, i, v) => { if (!Array.isArray(S.shenzang) || S.shenzang.length !== 13) S.shenzang = new Array(13).fill(0); S.shenzang[i] = Math.max(0, Math.min(10, Math.floor(v))); };
const szDanArr = S => { if (!Array.isArray(S.shenzangDan) || S.shenzangDan.length !== 13) S.shenzangDan = new Array(13).fill(0); return S.shenzangDan; };
const szDan = (S, i) => Math.max(0, Math.floor(szDanArr(S)[i] || 0));
const szLitCnt = (S, i) => Math.min(szDanCap(i), szDan(S, i)); // v1100 亮穴数只认丹穴（双侧：封顶双侧容量，合计 670；气旋另显，不点亮穴位）
const szDanCap = i => SZ_SEATS[i].mer.length > 1 ? SZ_SEATS[i].cnt : SZ_SEATS[i].cnt * 2; // v1050 丹线容量：双侧经左右各点一遍=2×穴数；任督座任24+督28共52不翻倍
const szVMaiCount = S => SZ_SEATS.reduce((n, st, i) => { const d = szDan(S, i); if (st.mer.length > 1) return n + (d >= 24 ? 1 : 0) + (d >= st.cnt ? 1 : 0); return n + (d >= st.cnt * 2 ? 2 : 0); }, 0); // v1100 Ye 定：双侧经两条线同时开（满 2×cnt 才 +2，半满 0 条）；任督各一条（24/52）
const szVMaiPress = S => SZ_SEATS.reduce((n, st, i) => { const d = szDan(S, i); if (st.mer.length > 1) return n + (d >= 24 ? 1 : 0) + (d >= st.cnt ? 1 : 0); return n + (d >= st.cnt * 2 ? 1 : 0); }, 0); // v1050 Ye 定：虚脉压条——左右成对+1、任督各+1，上限14
const szBigCount = S => SZ_SEATS.reduce((n, _, i) => n + (szProg(S, i) >= 10 ? 1 : 0), 0); // 大气旋数＝气旋吃满的座
const szFirstDanOpen = S => { for (const i of SZ_MER_ORDER) if (szDan(S, i) < szDanCap(i)) return i; return -1; }; // v1118 按经络顺序首个丹未满经
const maiRMaiEff = S => Math.min(13, (S.maiRMai|0) + szBigCount(S)); // v1050 Ye 定：一个大气旋算作一个实脉（多压一条、轮回不重置）；实脉封顶13
const szOpenCount = S => SZ_SEATS.reduce((n, _, i) => n + ((szProg(S, i) >= 10 || szDan(S, i) >= szDanCap(i)) ? 1 : 0), 0); // v1100 全开座：气旋满或丹穴满座（双侧满）即算
const szSmallCount = S => SZ_SEATS.reduce((n, _, i) => { const p = szProg(S, i); return n + (p > 0 && p < 10 ? p : 0); }, 0);
function szSyncMai(S) { // v1050 Ye 定：虚实分开——虚络只算开脉丹开穴数（气旋是实、归实络/大气旋，不混进虚络）；虚脉=丹点满座数
  let tot = 0; for (let i = 0; i < 13; i++) tot += szDan(S, i);
  S.maiVLuo = tot; S.maiVMai = szVMaiCount(S); // v1050：虚脉条数由丹线按经络派生（szVMaiCount，上限26）
}
const szSeatLitNames = (S, i) => szLitCnt(S, i); // v1100 只认丹（双侧）
function useSha(S) { // 吞噬煞气：需吞魔技能；每次+1个法力上限的法力，无视上限无限叠加（攻击/防御加成改为携带被动）
  if (!(S.inv['sha'] > 0)) return { ok: false, why: 'none' };
  if (!S.skills.includes('tunmo')) return { ok: false, why: 'noskill' };
  S.inv['sha']--; if (!S.inv['sha']) delete S.inv['sha'];
  let manaGained = 0;
  if (C.useFali(S)) { const add = manaMax(S); S.mana = Math.floor(S.mana + add); manaGained = add; const nc = C.manaCap(S); S.shaExcess = Math.max(0, S.mana - nc); }
  return { ok: true, manaGained };
}
function drinkMai(S, n, seatIdx) { // v1033：服用开脉丹：每颗开一穴（点亮一个未亮穴位，不加气旋；v1118 优先指定经，其次经络顺序）
  const have = S.inv['mai'] || 0; n = Math.min(n || 1, have);
  if (n <= 0) return 0;
  const dan = szDanArr(S);
  let used = 0; const order = [];
  if (seatIdx !== undefined && seatIdx !== null) order.push(seatIdx);
  for (const i of SZ_MER_ORDER) if (!order.includes(i)) order.push(i);
  for (const i of order) { while (used < n && szDan(S, i) < szDanCap(i)) { dan[i]++; used++; } if (used >= n) break; }
  if (used > 0) { S.inv['mai'] = have - used; if (!S.inv['mai']) delete S.inv['mai']; szSyncMai(S); }
  return used;
}
function useMaiPages(S, n, seatIdx) { // v993：残页喂神藏气旋（每张+1/10座进度）+旧效（实络+1、开脉术经验+1）；v1119 恢复按座（v1118 全局计数作废）
  const have = S.maiPages | 0; n = Math.min(n || 1, have);
  if (n <= 0) return { n: 0, lvUp: 0, filled: [] };
  let left = n; const filled = [];
  const order = (seatIdx !== undefined && seatIdx !== null) ? [seatIdx] : SZ_SEATS.map((_, i) => i);
  for (const i of order) {
    while (left > 0 && szProg(S, i) < 10) { szSetProg(S, i, szProg(S, i) + 1); left--; if (szProg(S, i) >= 10) filled.push(SZ_SEATS[i].merName); }
    if (left <= 0) break;
  }
  const used = n - left;
  if (used <= 0) return { n: 0, lvUp: 0, filled: [] };
  S.maiPages = have - used;
  S.maiRLuo = (S.maiRLuo | 0) + used;
  const oldLv = Math.floor((S.maiShuXp | 0) / 10);
  S.maiShuXp = (S.maiShuXp | 0) + used;
  const lvUp = Math.floor((S.maiShuXp | 0) / 10) - oldLv;
  if (lvUp > 0) S.maiRMai = (S.maiRMai | 0) + lvUp;
  szSyncMai(S);
  return { n: used, lvUp, filled };
}
function synthVMai(S) { szSyncMai(S); return 0; } // v993：虚脉由神藏全开座数派生，不再手动合成
function synthXPS(S) { // v95：10灵气石合成1下品灵石
  if ((S.ores.sp1|0) < 10) return 0;
  S.ores.sp1 -= 10; S.ores.xps = (S.ores.xps | 0) + 1; return 1;
}
function synthZPS(S) { // v96：10下品灵石合成1中品灵石
  if ((S.ores.xps|0) < 10) return 0;
  S.ores.xps -= 10; S.ores.zps = (S.ores.zps | 0) + 1; return 1;
}
function synthSPS(S) { // v96：100中品灵石合成1上品灵石
  if ((S.ores.zps|0) < 100) return 0;
  S.ores.zps -= 100; S.ores.sps = (S.ores.sps | 0) + 1; return 1;
}
function synthJPS(S) { // v96：1000上品灵石合成1极品灵石
  if ((S.ores.sps|0) < 1000) return 0;
  S.ores.sps -= 1000; S.ores.jps = (S.ores.jps | 0) + 1; return 1;
}

/* ---------- 战斗 ---------- */
function fighter(name, attrs, isPlayer, skills, pet) {
  const a = Object.assign({}, attrs);
  const f = { name, a, isPlayer: !!isPlayer, skills: (skills || []).filter(k => SKILLS[k]), maxHp: (a.str + a.def + a.vit) * 5, maxMp: a.int * K.MP_PER_INT, shield: 0, mdef: 0, defending: false, pets: [] };
  f.hp = f.maxHp; f.mp = f.maxMp;
  const pets = Array.isArray(pet) ? pet : (pet ? [pet] : []);
  for (const p of pets) { if (p && PETS[p.k]) f.pets.push(petFighter(p, f)); }
  Object.defineProperty(f, 'pet', { get() { return this.pets[0] || null; }, configurable: true });
  return f;
}
function petFighter(pet, owner) { // 灵宠：用自身五项属性、与玩家相同的公式（生命×10 等）；已领悟技能 = 对应套装 2 件效果（幸运为闪避 +10%）
  const P = PETS[pet.k], f = fighter(P.icon + (owner.isPlayer ? '' : '对方') + P.name, pet.attrs, owner.isPlayer, []);
  const psk = (pet.skills || []).filter(sk => GEAR_SETS[sk]);
  const pset = petActiveSets(pet);
  const sets = {}; for (const sk of psk) sets[sk] = sk === 'luck' ? K.PET_LUCK_DODGE : (pset[sk] || GEAR_SETS[sk].v[0]); // 灵宠自身套装优先，否则 2 件基础；shareAura 中再看主人套装
  Object.assign(f, { key: pet.k, isPet: true, owner, talent: !!pet.talent, loyal: pet.loyal, hunger: pet.hunger, bites: 0, sets, psk, pset });
  return f; // 防御加成由后续 shareAura 中的 applySetDef 统一处理（主人光环优先）
}
const petAlive = f => (f.pets || []).some(p => p.hp > 0 && !p.ko);
function hurtMods(tgt, d) { if (tgt.defending) d *= K.DEFEND_REDUCE; if (tgt.guard) d *= 1 - tgt.guard; if (tgt.ruleBeishui && tgt.maxHp && tgt.hp > 0 && tgt.hp < tgt.maxHp * 0.3) d *= 0.75; return d; } // v1006 规则·背水
const modTxt = t => (t.defending ? '（防御中）' : '') + (t.guard ? '（玄龟护体）' : '');
function petMagic(pet, tgt, strong, verb, L) { // 与玩家法术同公式
  const raw = (strong ? pet.a.int * 3.5 + pet.a.str : pet.a.int * 2 + pet.a.str) * rnd(0.9, 1.1);
  let d = Math.max(raw * K.MIN_DMG_PCT, raw - (tgt.a.def * (tgt._xbDef || 1) * 0.5 + (tgt.mdef|0)) * K.DEF_MULT);
  d = Math.max(1, Math.round(hurtMods(tgt, d)));
  const r = applyDamage(tgt, d);
  L.push(`${nm(pet)}${verb}，${nm(tgt)}受到 <span class="r">${r.dealt}</span> 点伤害${absTxt(r)}${modTxt(tgt)}`);
  toxOnHit(pet, tgt, L); // v1143 灵宠带毒（法术）
  return r.dealt + r.abs;
}
function petAct(pet, owner, foe, L) {
  switch (pet.key) {
    case 'fox': physical(pet, foe, 1, '扑上撕咬', L); if (foe.hp > 0 && pet.hp > 0 && R() < 0.35) physical(pet, foe, 1, '身形一闪，<span class="y">再咬一口</span>', L);
      if (pet.talent && foe.hp > 0 && R() < K.TALENT_FOX_P) { for (const x of [foe, foe.pet]) if (x && x.hp > 0) x.sealed = 1; L.push(`${nm(pet)}<span class="pu">天赋神通·魅惑</span>💕！${nm(foe)}${foe.pet && foe.pet.hp > 0 ? '主仆' : ''}心神恍惚，<span class="r">下回合无法行动</span>`); } break; // 灵狐魅惑：敌方全体 10% 封行动 1 回合（含吃药）
    case 'turtle': owner.guard = 0.35; L.push(`${nm(pet)}缩身挡在${nm(owner)}身前🛡，<span class="y">受到伤害 -35%</span>`); if (R() < 0.4) physical(pet, foe, 1, '甩头撞击', L);
      if (pet.talent && foe.hp > 0 && R() < K.TALENT_TURTLE_P) { for (const x of [foe, foe.pet]) if (x && x.hp > 0) x.taunt = { by: pet, n: K.TALENT_TURTLE_ROUNDS }; L.push(`${nm(pet)}<span class="y">天赋神通·嘲讽</span>📯！${nm(foe)}${foe.pet && foe.pet.hp > 0 ? '主仆' : ''}被激怒，${K.TALENT_TURTLE_ROUNDS} 回合内只能攻击${nm(pet)}`); } break; // 玄龟嘲讽
    case 'zhuque': { const d = petMagic(pet, foe, false, '喷吐<span class="pu">烈焰</span>🔥', L); if (d > 0 && foe.hp > 0 && R() < 0.4) { foe.burn = { n: 2, d: Math.max(1, Math.round(pet.a.int * 0.8 + 1)) }; L.push(`${nm(foe)}<span class="r">被点燃</span>，将灼烧 2 回合`); } break; } // 朱雀重生在 koCheck
    case 'qinglong': if (pet.talent && R() < K.TALENT_QINGLONG_P) { // 青龙沐浴：代替攻击，主仆恢复
        const parts = []; for (const x of [owner, pet]) if (x.hp > 0 && x.hp < x.maxHp) { const h = Math.min(x.maxHp - x.hp, Math.max(1, Math.round(x.maxHp * K.TALENT_QINGLONG_HEAL))); x.hp += h; parts.push(`${nm(x)}恢复 <span class="g">${h}</span>`); }
        L.push(`${nm(pet)}<span class="pu">天赋神通·沐浴</span>🌧️，甘霖洒落${parts.length ? '，' + parts.join('、') : '，主仆气血已满'}！`);
      } else { const d = petMagic(pet, foe, true, '吐出<span class="pu">龙息</span>🐉', L); if (d > 0 && owner.hp > 0 && owner.hp < owner.maxHp) { const h = Math.min(owner.maxHp - owner.hp, Math.max(1, Math.round(d * 0.3))); owner.hp += h; L.push(`${nm(owner)}沐浴龙息，恢复 <span class="g">${h}</span> 点生命`); } } break;
    case 'baihu': physical(pet, foe, 1.3, '挥爪撕裂', L); if (foe.hp > 0 && R() < 0.4) inflict(foe, 'bleed', L);
      if (pet.talent && foe.hp > 0) { let n = 1; for (const p of K.TALENT_BAIHU_CHAIN) { if (foe.hp <= 0 || R() >= p) break; n++; physical(pet, foe, 1.3, `狂性大发·<span class="y">天赋神通狂袭第${n}击</span>`, L); } if (n > 1) L.push(`${nm(pet)}<span class="y">天赋神通·狂袭</span>，一连打出 ${n} 击！`); } break; // 白虎狂袭：40%/30%/20%/10% 连击，最多 5 连
  }
}
const nm = f => `<b class="${f.isPlayer ? 'p' : 'x'}">${f.name}</b>`;
function applyDamage(t, d) {
  let abs = 0;
  if (t.shield > 0) { abs = Math.min(t.shield, d); t.shield -= abs; d -= abs; }
  if (t.ruleBumie && !t._bumieUsed && d > 0 && d >= t.hp && t.hp > 0) { d = Math.max(0, t.hp - 1); t._bumieUsed = 1; t._bumieProc = 1; } // v1006 规则·不灭
  t._prevHp = t.hp; t._hitDmg = d; // 失血拖影用
  t.hp = Math.max(0, t.hp - d);
  if (t.hp <= 0 && t.soulpact) { t.soulpact = false; t.hp = Math.max(1, Math.round(t.maxHp * 0.5)); t._revived = true; t._revivedHp = t.hp; } // 回魂珍馐：首次倒下复活
  return { dealt: d, abs };
}
const absTxt = r => r.abs ? `（护盾吸收 ${r.abs}）` : '';
function dodgeChance(att, tgt) { return clamp(K.DODGE_BASE + (tgt.a.agi - att.a.agi) * K.DODGE_PER_AGI + ((tgt.isPet && tgt.sets && tgt.sets.luck) || 0), 0, K.DODGE_MAX); } // 灵宠幸运技能：闪避 +10%
function critChance(att) { return clamp(K.CRIT_BASE + att.a.agi * K.CRIT_PER_AGI, 0, K.CRIT_MAX) + ((att.sets && att.sets.crit) || 0); }
function reflects(att, tgt) { const eff = att.a.str * (att._xb || 1) * (att._bb || 1); return tgt.a.def * (tgt._xbDef || 1) >= eff * K.REFLECT_RATIO; }
function inflict(f, k, L) {
  if (k === 'bleed') { if (f.bleed) return; f.bleed = true; L.push(`${nm(f)}<span class="r">🩸 开始流血</span>`); }
  else if (k === 'poison') { if (f.S && toxImmune(f.S)) return; if (f.poison >= K.POISON_ROUNDS) return; f.poison = K.POISON_ROUNDS; L.push(`${nm(f)}<span class="r">☠️ 中毒了</span>`); } // v1143 百毒不侵：战中亦不中毒
}
function addPoisonStack(f, L) { // v1143 百毒不侵叠毒：给目标 +1 层毒（上限 10 层）；每层每回合毒发 1% 最大生命，每 3 回合消退 1 层、最后一层不消退（须解毒药清）；能否毒到由 toxOnHit 的 canPoison 先判
  f.pStacks = Math.min(10, (f.pStacks | 0) + 1);
  f.poison = 1;
  L.push(`${nm(f)}<span class="r">☠️ 毒层叠加（${f.pStacks}层）</span>`);
}
function toxSaveOf(f) { return f.S || (f.owner && f.owner.S) || null; } // 灵宠按主人的存档算
function canPoison(src, dst, L) { // v1144 Ye 定：百毒不侵战斗内外都挡毒；但佩戴者互遇时比丹毒——来源丹毒更高才毒得到，平/低都被挡
  const dS = toxSaveOf(dst);
  if (!(dS && toxImmune(dS))) return true;
  const sS = toxSaveOf(src);
  if (!(sS && toxImmune(sS))) return false;
  if (toxEff(sS) > toxEff(dS)) return true;
  if (L && !dst._duelLog) { dst._duelLog = 1; L.push(`${nm(dst)}<span class="g">☣️ 百毒相克：对方丹毒 ${toxEff(sS)} 不敌自身 ${toxEff(dS)}，毒被挡下</span>`); }
  return false;
}
function toxOnHit(att, tgt, L) { // v1142 百毒不侵双向带毒：佩戴者打中目标→目标叠毒；佩戴者被打中→攻击者叠毒
  if (tgt.hp <= 0) return;
  if (att.toxAtk && canPoison(att, tgt, L)) addPoisonStack(tgt, L);
  if (tgt.toxAtk && att.hp > 0 && att !== tgt && canPoison(tgt, att, L)) addPoisonStack(att, L);
}
function wuxingHit(att, tgt, baseDmg, L) { // 五行：力附加属性伤害（每件+10%）；有对应抗则免除属性伤害，并按(抗-力)件数反弹10%/件
  const pow = att.wxPow; if (!pow || !(baseDmg > 0) || tgt.hp <= 0) return;
  for (const e of WUXING) {
    const n = pow[e.k] | 0; if (n <= 0) continue;
    const ed = Math.max(1, Math.round(baseDmg * 0.10 * n)); // 本次属性伤害
    const m = (tgt.wxRes && tgt.wxRes[e.k] | 0) || 0;
    if (m > 0) {
      L.push(`${nm(tgt)}<span style="color:${e.color}">【${e.name}之抗】×${m}</span>抵挡了${e.name}属性伤害`);
      const ex = m - n;
      if (ex > 0 && att.hp > 0) {
        const rd = Math.max(1, Math.round(ed * 0.10 * ex));
        const rr = applyDamage(att, rd);
        L.push(`<span style="color:${e.color}">【${e.name}之抗】</span>反弹 <span style="color:${e.color}">${rr.dealt}</span> 点${e.name}属性伤害${absTxt(rr)}`);
      }
    } else {
      const r = applyDamage(tgt, ed);
      L.push(`${nm(att)}<span style="color:${e.color}">【${e.name}之力】</span>附带 <span style="color:${e.color}">${r.dealt}</span> 点${e.name}属性伤害${absTxt(r)}`);
    }
    if (tgt.hp <= 0 || att.hp <= 0) break;
  }
}
function physical(att, tgt, mult, verb, L) {
  att._lunge = att.isPlayer ? 'up' : 'down';
  if (R() < dodgeChance(att, tgt)) {
    tgt._float = {t:'dodge', txt:'💨闪避！'}; tgt._dodged = 1;
    L.push(`${nm(att)}${verb}，被${nm(tgt)}灵巧闪开！`);
    // 五行之力：属性伤害无法闪避（无对应抗性则必中），按未闪避时的应有伤害结算
    const atk0 = att.a.str * 1 * mult * rnd(0.85, 1.15) * (att._bb || 1) * (att._xb || 1) * (1 + 0.3 * (att.burnLife|0));
    let wd = Math.max(atk0 * K.MIN_DMG_PCT, atk0 - tgt.a.def * (tgt._xbDef || 1) * (tgt._bbDef || 1) * K.DEF_MULT);
    if (R() < critChance(att)) wd *= K.CRIT_MULT;
    wd = Math.max(1, Math.round(hurtMods(tgt, wd)));
    if (tgt.hp > 0) wuxingHit(att, tgt, wd, L);
    return 0;
  }
  const atk = att.a.str * 1 * mult * rnd(0.85, 1.15) * (att._bb || 1) * (att._xb || 1) * (1 + 0.3 * (att.burnLife|0)); // 普通攻击统一力量×1
  if (reflects(att, tgt)) {
    const rf = Math.max(1, Math.round(atk * K.REFLECT_PCT)); const r = applyDamage(att, rf);
    tgt._float = {t:'block', txt:'🛡️反震！'}; L.push(`${nm(att)}${verb}，但${nm(tgt)}防御坚不可摧，<span class="y">伤害为 0</span>！反震 <span class="r">${r.dealt}</span> 点伤害${absTxt(r)}`);
    toxOnHit(att, tgt, L); // v1143 Ye 定：被反震也叠毒，只有闪避不叠
    return 0;
  }
  let d = Math.max(atk * K.MIN_DMG_PCT, atk - tgt.a.def * (tgt._xbDef || 1) * (tgt._bbDef || 1) * K.DEF_MULT);
  let crit = false; if (R() < critChance(att)) { d *= K.CRIT_MULT; crit = true; }
  d = Math.max(1, Math.round(hurtMods(tgt, d)));
  const r = applyDamage(tgt, d);
  if (tgt.hp <= 0 && att.ruleShiling && att.hp > 0 && att.hp < att.maxHp) { const _sh6 = Math.min(att.maxHp - att.hp, Math.max(1, Math.round(att.maxHp * 0.10))); att.hp += _sh6; L.push(`${nm(att)}法宝<span class="y">【规则·噬灵】</span>吞吐灵气，恢复 <span class="g">${_sh6}</span> 点生命`); }
  if (crit && att.ruleLianzhu && !att._lzIn && tgt.hp > 0) { att._lzIn = 1; L.push(`${nm(att)}法宝<span class="y">【规则·连珠】</span>剑光未绝，第二剑已至！`); physical(att, tgt, 0.5, '连珠再斩', L); att._lzIn = 0; }
  att._lunge = att.isPlayer ? 'up' : 'down';
  if (crit) { tgt._float = {t:'crit', txt:'💥暴击！'}; try { window._lastCritT = Date.now(); } catch (_) {} tgt._wasHit = 1; } else { tgt._wasHit = 1; }
  L.push(`${nm(att)}${verb}，${crit ? '<span class="y">💥暴击！</span>' : ''}${nm(tgt)}受到 ${crit ? `<span class="critdmg">${r.dealt}</span>` : `<span class="r">${r.dealt}</span>`} 点伤害${absTxt(r)}${modTxt(tgt)}`);
  if (tgt._bbDef && r.dealt > 0 && att.hp > 0) { const rr = applyDamage(att, r.dealt); L.push(`${nm(tgt)}<span class="r">🔥燃血反弹</span>！${nm(att)}受到 <span class="r">${rr.dealt}</span> 点反弹伤害${absTxt(rr)}`); } // 燃血御守：物理攻击全额反弹
  if (tgt.hp > 0) wuxingHit(att, tgt, r.dealt, L); // 五行之力附加属性伤害
  if (att.inflict && tgt.hp > 0 && R() < K.STATUS_HIT) inflict(tgt, att.inflict, L); // 野兽/毒物攻击
  toxOnHit(att, tgt, L); // v1142 百毒不侵带毒
  fatalStrike(att, tgt, L);
  return r.dealt + r.abs;
}
function fatalStrike(att, tgt, L) { // 致命套：按件数触发，5件+燃血/燃寿加成
  let rate = att.sets && att.sets.fatal || 0;
  if (rate >= 0.20) {
    if ((att.burnBloodTier|0) > 0 || att.burnBlood) rate += 0.10; // 5件+燃血：20%→30%
    rate += 0.10 * (att.burnLife|0); // 5件+燃寿：每层+10%
  }
  if (!rate || tgt.hp <= 0 || R() >= rate) return;
  const n = tgt.fatalN = (tgt.fatalN || 0) + 1, t = nm(tgt);
  if (n === 1) { const d = Math.round(tgt.maxHp * 0.5); tgt.hp = Math.max(0, tgt.hp - d); L.push(`<span class="r">💀致命一击！</span>第1次，${t}损失 <span class="r">${d}</span> 点生命（50% 最大生命）${tgt.hp <= 0 ? '，当场倒下' : ''}`); }
  else if (n === 2) { tgt.hp = 1; L.push(`<span class="r">💀致命一击！</span>第2次，${t}<span class="r">只剩 1 点生命</span>`); }
  else if (n === 3) { if (tgt.hp <= 1) { tgt.hp = 0; L.push(`<span class="r">💀致命一击！</span>第3次，${t}<span class="r">气绝身亡</span>`); } else { tgt.hp = 1; L.push(`<span class="r">💀致命一击！</span>第3次，${t}虽已回复，又被打回 <span class="r">1 点生命</span>`); } }
  else { tgt.hp = 0; L.push(`<span class="r">💀绝杀！</span>第${n}次致命一击，${t}<span class="r">一击毙命</span>`); }
}
function magic(att, tgt, L, strong) {
  const raw = (strong ? att.a.int * 3.5 + att.a.str : att.a.int * 2 + att.a.str) * rnd(0.9, 1.1) * (att._bs || 1) * (att._xb || 1);
  let d = Math.max(raw * K.MIN_DMG_PCT, raw - (tgt.a.def * (tgt._xbDef || 1) * 0.5 + (tgt.mdef|0)) * K.DEF_MULT);
  d = Math.max(1, Math.round(hurtMods(tgt, d)));
  let _msAbs = 0; // 🔰💧燃法灵盾：法术伤害先扣法力，蓝空则扣血
  if (tgt._manaShield && d > 0 && tgt.mp > 0) { _msAbs = Math.min(Math.floor(tgt.mp), d); tgt.mp -= _msAbs; d -= _msAbs; }
  const r = applyDamage(tgt, d);
  att._lunge = att.isPlayer ? 'up' : 'down';
  tgt._wasHit = 1;
  L.push(strong ? `${nm(att)}引动<span class="pu">【雷击】</span>⚡，${nm(tgt)}受到 <span class="r">${r.dealt}</span> 点雷电伤害${absTxt(r)}` : `${nm(att)}施放<span class="pu">【火球术】</span>🔥，${nm(tgt)}受到 <span class="r">${r.dealt}</span> 点灼烧伤害${absTxt(r)}`);
  if (_msAbs > 0) {
    L.push(`${nm(tgt)}<span class="pu">🔰灵盾</span>以法力抵挡 <span class="pu">${_msAbs}</span> 点法术伤害`);
    if (att.hp > 0) { const _rr = applyDamage(att, _msAbs * 10); L.push(`${nm(tgt)}<span class="pu">💧法力回击</span>！反弹 <span class="r">${_rr.dealt}</span> 点法术伤害${absTxt(_rr)}`); } // 被秒回击依然有效，可同归于尽
  }
  toxOnHit(att, tgt, L); // v1142 百毒不侵带毒（法术同样触发）
  fatalStrike(att, tgt, L);
}
const OFFENSIVE = ['attack', 'smash', 'fireball', 'thunder', 'vamp', 'xian_attack'];
function execAction(me, foe, act, L) {
  if (SKILLS[act]) me.mp -= SKILLS[act].mp;
  if (OFFENSIVE.includes(act) && petAlive(foe)) {
    if (me._targetChoice === 'pet') foe = foe.pet; // 玩家指定先打灵宠
    else if (R() < K.PET_TARGET && foe.pets && foe.pets.length) { const _alive = foe.pets.filter(x => x.hp > 0 && !x.ko); if (_alive.length) foe = pick(_alive); } // 否则30%随机落到一只灵宠
  }
  if (act.startsWith('pot:')) { const t = act.slice(4), k = bestPot(me.elixirs, t), P = potOf(k); if (P && t === 'mp') { if (me.mp >= me.maxMp) { L.push(`${nm(me)}法力已满，收起了药水`); return; } if (!--me.elixirs[k]) delete me.elixirs[k]; const g = Math.min(me.maxMp - me.mp, Math.max(1, Math.round(me.maxMp * P.pct))); me.mp += g; L.push(`${nm(me)}饮下<span class="${['', '', 'q2', 'q3'][P.q]}">${QNAME[P.q]}法力药水</span>💧，回复 <span class="pu">${g}</span> 点法力`); return; } if (P && me.hp >= me.maxHp) { L.push(`${nm(me)}生命已满，收起了药水`); return; } if (P) { if (!--me.elixirs[k]) delete me.elixirs[k];
      const g = Math.min(me.maxHp - me.hp, Math.max(1, Math.round(me.maxHp * P.pct))); me.hp += g; L.push(`${nm(me)}饮下<span class="${['', '', 'q2', 'q3'][P.q]}">${QNAME[P.q]}生命药水</span>❤️，回复 <span class="g">${g}</span> 点生命`); } return; }
  if (act.startsWith('med:')) { const k = act.slice(4), m = MEDS[k]; if (m && me.isPlayer && (S.meds[k] > 0)) { S.meds[k]--; if (!S.meds[k]) delete S.meds[k]; cureStatus(S, m.cure); if (m.cure === 'bleed') me.bleed = false; if (m.cure === 'poison') { me.poison = 0; me.pStacks = 0; me.pDecay = 0; } L.push(`${nm(me)}使用💊<b>${m.name}</b>，${STATUS[m.cure].icon}${STATUS[m.cure].name}<span class="g">已解除</span>`); } else { L.push(`${nm(me)}想使用疗伤药，但没有可用的`); } return; }
  switch (act) {
    case 'defend': { L.push(`${nm(me)}摆出防御姿态🛡，本回合减伤`); break; }
    case 'smash': physical(me, foe, 1.6, '施展<span class="pu">【重击】</span>', L); break;
    case 'fireball': magic(me, foe, L); break;
    case 'thunder': magic(me, foe, L, true); break;
    case 'vamp': {
      const d = physical(me, foe, 1.2, '施展<span class="pu">【吸血斩】</span>', L);
      if (d > 0 && foe.hp > 0 && R() < K.VAMP_BLEED) inflict(foe, 'bleed', L);
      const h = Math.min(me.maxHp - me.hp, Math.round(d * K.VAMP_PCT));
      if (h > 0 && me.hp > 0) { me.hp += h; L.push(`${nm(me)}吸取气血，恢复 <span class="g">${h}</span> 点生命`); }
      break;
    }
    case 'heal': { const h = Math.min(me.maxHp - me.hp, Math.round(me.a.int * 3 + 5)); me.hp += h; L.push(`${nm(me)}施放<span class="pu">【治疗术】</span>，恢复 <span class="g">${h}</span> 点生命`); break; }
    case 'shield': { const s = Math.round(me.a.int * 3); me.shield = Math.max(me.shield, s); L.push(`${nm(me)}施放<span class="pu">【护盾】</span>，获得 <span class="y">${s}</span> 点护盾`); break; }
    case 'xian_attack': { // v87：AI仙力攻击（直接伤害无视防御）；仙力防御只反弹这个
      const _amt = Math.max(1, Math.min(Math.floor(me.mp), 5 + Math.floor(R() * 16))); // 耗5-20仙力
      me.mp = Math.max(0, Math.floor(me.mp) - _amt);
      const _dmg = Math.max(1, Math.round(_amt * 1000000 * (me._xb || 1)));
      const _r = applyDamage(foe, _dmg);
      L.push(`${nm(me)}施展<span class="pu">⚡仙力攻击</span>！消耗 <span class="pu">${_amt}</span> 点仙力，${nm(foe)}受到 <span class="r">${_r.dealt}</span> 点伤害${absTxt(_r)}`);
      if (foe._xianDefOn && _r.dealt > 0 && me.hp > 0) { const _rr = applyDamage(me, _r.dealt); L.push(`${nm(foe)}<span class="y">🛡️仙力反弹</span>！${nm(me)}受到 <span class="r">${_rr.dealt}</span> 点反弹伤害${absTxt(_rr)}`); }
      if (foe._manaShield && _r.dealt > 0 && me.hp > 0) { const _rb = _r.dealt + _amt * 10, _rr2 = applyDamage(me, _rb); L.push(`${nm(foe)}<span class="pu">💧燃法灵盾</span>！反弹 <span class="r">${_rr2.dealt}</span> 点伤害（仙术伤害+${_amt}×10）${absTxt(_rr2)}`); } // v88：燃法反弹仙力攻击
      break;
    }
    default:
      physical(me, foe, 1, '发起攻击', L);
      if (me.hp > 0 && foe.hp > 0 && R() < clamp((me.a.agi - foe.a.agi) * K.COMBO_PER_AGI, 0, K.COMBO_MAX)) physical(me, foe, 1, '身形一闪，<span class="y">连击</span>', L);
  }
}
const knows = (f, k) => f.skills.includes(k);
const canUse = (f, k) => knows(f, k) && f.mp >= SKILLS[k].mp;
function aiChoose(me, foe) {
  const can = k => canUse(me, k);
  const defStreak = me._lastAct === 'defend' ? (me._defStreak | 0) + 1 : 0; // 连续防御计数：最多2回合
  let ret;
  if (me.hp / me.maxHp < 0.35 && can('heal') && R() < 0.7) ret = 'heal';
  else if (reflects(me, foe)) { const t = can('thunder') ? 'thunder' : can('fireball') ? 'fireball' : null; ret = t || (defStreak >= 2 ? 'attack' : (R() < 0.3 ? 'defend' : 'attack')); } // 打不动时：有法术用法术，否则70%继续攻击、30%防御
  else if (me.shield <= 0 && can('shield') && R() < 0.15) ret = 'shield';
  else if (can('thunder') && R() < 0.6) ret = 'thunder';
  else {
    const fireGood = (me.a.int * 2 + me.a.str - foe.a.def * 0.75) > (me.a.str * 1 - foe.a.def * K.DEF_MULT);
    if (can('fireball') && R() < (fireGood ? 0.7 : 0.25)) ret = 'fireball';
    else if (can('vamp') && me.hp / me.maxHp < 0.8 && R() < 0.4) ret = 'vamp';
    else if (can('smash') && R() < 0.25) ret = 'smash';
    else if ((me.realm|0) >= 8 && (me.mp|0) >= 10 && R() < 0.18) ret = 'xian_attack'; // v87：仙人境以上18%用仙力攻击
    else if (defStreak < 2 && R() < 0.06) ret = 'defend';
    else ret = 'attack';
  }
  me._lastAct = ret; me._defStreak = ret === 'defend' ? defStreak : 0; return ret;
}
function Battle(A, B) { this.A = A; this.B = B; this.round = 0; this.over = false; this.winner = null; this.draw = false; this.lines = []; this.opLines = []; }
Battle.prototype.prepRound = function (actA, actB) {
  if (this.over) return null;
  const A = this.A, B = this.B, L = [];
  if (!this.defLogged) { this.defLogged = true; for (const f of [A, ...(A.allies || []), B, ...(B.allies || [])]) if (f.defBoost > 0) L.push(`<div class="bl">${nm(f)}【防御套${f.auraFrom ? '·共享' : ''}】防御 ${f.defBase} → <span class="g">${f.a.def}</span>（+${f.defBoost}）</div>`); }
  this.round++; L.push(`<div class="bl rd">— 第 ${this.round} 回合 —</div>`);
  for (const f of [A, B]) { f._bb = 0; f._bs = 0; f._bbDef = 0; if ((f.burnBloodTier|0) > 0 && f.hp > 0) { const _btb = Math.min(10, f.burnBloodTier|0); const c = Math.max(1, Math.round(f.maxHp * 0.05 * _btb)); f.hp = Math.max(0, f.hp - c); const _avH = (f.isPlayer && f.S) ? (f.S.advVit|0) * 5 : 0; const _hasY = _avH > 0 && f.hp > (f.maxHp - _avH); const _bby = [0,20,45,70,100,130,165,205,250,300,355][_btb], _bbn = Math.round(_bby * 0.4); const _bval = _hasY ? _bby : _bbn; f._bb = 1 + _bval / 100; const _cnn = ['','一','二','三','四','五','六','七','八','九','十'][_btb]; L.push(`${nm(f)}<span class="r">🔥${_cnn}倍燃血</span>！消耗 <span class="r">${c}</span> 点生命，攻击力 +${_bval}%`); } if ((f.burnTier|0) > 0 && f.hp > 0 && f.mp > 0) { const _bt = Math.min(10, f.burnTier|0); const c = Math.max(1, Math.round(f.maxMp * 0.05 * _bt)); f.mp = Math.max(0, f.mp - c); const _hasP = f.mp > f.maxMp; const _bb = [0,20,45,70,100,130,165,205,250,300,355][_bt], _bf = Math.round(_bb * 0.4); f._bs = 1 + (_hasP ? _bb : _bf) / 100; const _cn = ['','一','二','三','四','五','六','七','八','九','十'][_bt]; L.push(`${nm(f)}<span class="pu">💧${_cn}倍燃法</span>！消耗 <span class="pu">${c}</span> 点法力，法术攻击 +${_hasP ? _bb : _bf}%`); } if (f._bb && f._bs) { f._bb = 2; f._bs = 2; L.push(`${nm(f)}<span class="y">🔥💧双燃</span>！物法攻击提升 <span class="y">100%</span>`); } }
  const fix = (f, a) => (SKILLS[a] && !canUse(f, a)) ? 'attack' : (SKILLS[a] || a === 'defend') ? a : (a === 'pot:hp' && f.elixirs && bestPot(f.elixirs, a.slice(4))) ? a : 'attack';
  actA = fix(A, actA || 'attack'); actB = fix(B, actB || 'attack');
  A.defending = actA === 'defend'; B.defending = actB === 'defend';
  for (const f of [A, B]) if (f.defending && f._bb > 1) { f._bbDef = f._bb; const _bpct = Math.round((f._bb - 1) * 100); L.push(`${nm(f)}<span class="r">🔥燃血御守</span>！防御 <span class="y">+${_bpct}%</span>，物理攻击<span class="y">全额反弹</span>（法术攻击无效）`); }
  let order;
  const _agiA = A.defending ? 999999999 : A.a.agi, _agiB = B.defending ? 999999999 : B.a.agi; // v839 防御无视先手：选防御直接先摆姿态
  if (_agiA !== _agiB) order = _agiA > _agiB ? [[A, B, actA], [B, A, actB]] : [[B, A, actB], [A, B, actA]];
  else order = R() < 0.5 ? [[A, B, actA], [B, A, actB]] : [[B, A, actB], [A, B, actA]];
  this._order = order;
  this._out = [];
  const A2 = A, B2 = B, out = this._out;
  this._koCheck = () => [A2, B2].forEach(f => {
    for (const x of [f, f.pet]) if (x && x._revived) { const rh = x._revivedHp; x._revived = false; x._revivedHp = 0; out.push(`${nm(x)}<span class="y">✨回魂</span>！起死回生，生命恢复至 <span class="g">${rh}</span>`); }
    for (const x of [f, f.pet]) if (x && x._bumieProc) { x._bumieProc = 0; out.push(`${nm(x)}身上法宝华光一闪，<span class="y">【规则·不灭】</span>硬生生留住一线生机！`); } // v1006
    if (f.pet && f.pet.hp <= 0) { f.pet._wasHit = 0; f.pet._float = null; f.pet._dodged = 0; f.pet._lunge = null; f.pet._hitDmg = 0; }
    if (f.pet && f.pet.hp <= 0 && !f.pet.ko) { const pp = f.pet; if (pp.talent && pp.key === 'zhuque' && R() < K.TALENT_ZHUQUE_P) { pp.hp = Math.max(1, Math.round(pp.maxHp * K.TALENT_ZHUQUE_HEAL)); out.push(`${nm(pp)}<span class="r">🔥浴火重生</span>！<span class="pu">天赋神通·重生</span>，生命恢复至 <span class="g">${pp.hp}</span>`); } else { pp.ko = true; out.push(`${nm(pp)}<span class="r">力竭倒下</span>，本场无法再战`); if (!pp.isPlayerPet) this._enemyPetKo = (this._enemyPetKo|0) + 1; } }
  });
  return L;
};
Battle.prototype.playHalf = function (me, foe, act) {
  const out = this._out, koCheck = this._koCheck;
  if (me.hp <= 0 || foe.hp <= 0) return [];
  me.guard = 0;
  if (me.sealed > 0) { me.sealed--; out.push(`${nm(me)}<span class="pu">被魅惑</span>，心神恍惚无法行动！`); }
  else {
    let tgt = foe;
    if (me.confuse > 0 && OFFENSIVE.includes(act)) {
      me.confuse--;
      const al = me.isPet ? (me.owner && me.owner.hp > 0 ? [me.owner] : []) : (me.pet && me.pet.hp > 0 && !me.pet.ko ? [me.pet] : []);
      if (al.length && R() < K.ZX_CONFUSE_P) { tgt = pick(al); out.push(`${nm(me)}<span class="pu">神志混乱</span>，反而攻向${nm(tgt)}！`); }
    }
    if (me.taunt && me.taunt.n > 0 && me.taunt.by.hp > 0 && OFFENSIVE.includes(act)) { tgt = me.taunt.by; if (!me.taunt.logged) { me.taunt.logged = true; out.push(`${nm(me)}<span class="y">被嘲讽</span>，怒火中烧攻向${nm(me.taunt.by)}！`); } }
    execAction(me, tgt, act, out);
  }
  koCheck();
  for (const pt of (me.pets || [])) {
    if (!(pt.hp > 0 && !pt.ko) || me.hp <= 0 || foe.hp <= 0) continue;
    if (pt.sealed > 0) { pt.sealed--; out.push(`${nm(pt)}<span class="pu">被魅惑</span>，心神恍惚无法行动！`); }
    else if (R() < petBiteChance(pt)) {
      const d = Math.max(1, Math.round(pt.a.str * 1 * rnd(0.85, 1.15) - me.a.def * K.DEF_MULT * 0.5)), r = applyDamage(me, d); pt.bites++;
      out.push(`${nm(pt)}<span class="r">${pt.hunger < K.PET_HUNGRY ? '饿急了' : '不听使唤'}，反咬主人</span>！${nm(me)}受到 <span class="r">${r.dealt}</span> 点伤害${absTxt(r)}`);
      if (me.hp > 0 && R() < K.BITE_BLEED) inflict(me, 'bleed', out);
    } else { let pfoe = foe; if (pt.confuse > 0) { pt.confuse--; if (me.hp > 0 && R() < K.ZX_CONFUSE_P) { pfoe = me; out.push(`${nm(pt)}<span class="pu">神志混乱</span>，反而攻向${nm(me)}！`); } } if (pt.taunt && pt.taunt.n > 0 && pt.taunt.by.hp > 0) { pfoe = pt.taunt.by; if (!pt.taunt.logged) { pt.taunt.logged = true; out.push(`${nm(pt)}<span class="y">被嘲讽</span>，怒火中烧攻向${nm(pt.taunt.by)}！`); } } const _ord = pt._order || 'auto'; if (_ord === 'defend') { pt.defending = true; out.push(`${nm(pt)}<span class="b">🛡️ 防御姿态</span>，受到伤害降低`); } else if (_ord === 'magic') { petMagic(pt, pfoe, false, '释放<span class="pu">法术</span>✨', out); } else if (_ord === 'attack') { physical(pt, pfoe, 1, '发起攻击', out); } else { petAct(pt, me, pfoe, out); } }
    koCheck();
  }
  const L = out.splice(0).map(s => `<div class="bl">${s}</div>`);
  this.lines.push(...L);
  return L;
};
Battle.prototype.finishRound = function () {
  const A = this.A, B = this.B, out = this._out, koCheck = this._koCheck, L = [];
  for (const f of [A, B]) if (f.burn && f.hp > 0 && A.hp > 0 && B.hp > 0) { const r = applyDamage(f, f.burn.d); out.push(`${nm(f)}灼烧中🔥，受到 <span class="r">${r.dealt}</span> 点伤害${absTxt(r)}`); if (--f.burn.n <= 0) f.burn = null; }
  for (const f of [A, A.pet, B, B.pet]) {
    if (!f || f.hp <= 0 || A.hp <= 0 || B.hp <= 0) continue;
    if (f.bleed) { f.hp = Math.max(0, f.hp - Math.max(1, Math.round(f.maxHp * K.BLEED_RND))); out.push(`${nm(f)}🩸 流血不止，生命 <span class="r">-${Math.max(1, Math.round(f.maxHp * K.BLEED_RND))}</span>`); }
    if (f.poison > 0 && f.hp > 0) {
      if ((f.pStacks | 0) > 0) { // v1143 层毒：每层 1% 最大生命/回合；每 3 回合消退 1 层，最后一层不消退
        const _stk = f.pStacks | 0;
        const d = Math.max(1, Math.round(f.maxHp * 0.01 * _stk));
        f.hp = Math.max(0, f.hp - d);
        f.pDecay = (f.pDecay | 0) + 1;
        let _drop = '';
        if (f.pDecay >= 3) { f.pDecay = 0; if (_stk > 1) { f.pStacks = _stk - 1; _drop = `，毒层消退（剩 ${f.pStacks} 层）`; } }
        out.push(`${nm(f)}☠️ 毒发（${_stk}层），生命 <span class="r">-${d}</span>${_drop}`);
      } else { const d = Math.max(1, Math.round(f.maxHp * K.POISON_RND)); f.hp = Math.max(0, f.hp - d); f.poison--; out.push(`${nm(f)}☠️ 毒发，生命 <span class="r">-${d}</span>`); }
    }
  }
  for (const f of [A, ...(A.allies || []), B, ...(B.allies || [])]) if (f.sets && f.sets.heal && f.hp > 0 && f.hp < f.maxHp && A.hp > 0 && B.hp > 0) { const h = Math.min(f.maxHp - f.hp, Math.max(1, Math.round(f.maxHp * f.sets.heal))); f.hp += h; out.push(`${nm(f)}【治愈套${f.auraFrom ? '·共享' : ''}】回复 <span class="g">${h}</span> 点生命`); }
  for (const f of [A, A.pet, B, B.pet]) {
    if (!f) continue;
    if (f.zxStr && --f.zxStr.n <= 0) { f.a.str -= f.zxStr.boost; out.push(`${nm(f)}的<span class="y">珍馐力</span>效果消退`); f.zxStr = null; }
    if (f.zxWeak && --f.zxWeak.n <= 0) { for (const a of ATTRS) f.a[a] += f.zxWeak.cut[a]; out.push(`${nm(f)}的<span class="b">珍馐衰</span>效果消退`); f.zxWeak = null; }
    if (f.taunt && --f.taunt.n <= 0) f.taunt = null;
  }
  koCheck();
  out.splice(0).forEach(s => L.push(`<div class="bl">${s}</div>`));
  A.defending = B.defending = false;
  for (const _pf of [...(A.pets||[]), ...(B.pets||[])]) _pf.defending = false;
  const _isThunderB = B && B.name && B.name.indexOf('雷云') >= 0; // v723 雷云小数血量击杀判定
  const _bDead = _isThunderB ? (B.hp < 1) : (B.hp <= 0);
  if (A.hp <= 0 || _bDead) {
    this.over = true;
    this.draw = (A.hp <= 0 && _bDead);
    this.winner = A.hp > 0 ? A : B;
    if (this.draw) L.push(`<div class="bl y">☠️<span class="r">同归于尽</span>！双方同时倒下，各自承受死亡惩罚</div>`);
  } else {
    [A, B].forEach(f => { const mCap = f.maxMp * (f.S ? maiMult(f.S) : 2); f.mp = Math.min(mCap, f.mp + K.MP_REGEN); });
    if (this.tribStrikes && this.round % 9 === 0 && this.round < this.tribStrikes) { // v985 分层：每满9雷进一层，雷威+10%，母题回响
      B.a.str = Math.max(1, Math.round(B.a.str * 1.1));
      if (B.a.int) B.a.int = Math.max(1, Math.round(B.a.int * 1.1));
      let _lt = ''; try { _lt = (A.S && typeof tribOmenText === 'function') ? tribOmenText(A.S, 'layer') : ''; } catch(_) {}
      L.push(`<div class="bl y">⚡ 第${this.round / 9 + 1}层劫云翻卷压下${_lt ? '——' + _lt : '，雷威更盛'}</div>`);
    }
    if (this.surviveRounds && this.round >= this.surviveRounds && A.hp > 0) { // v685 雷劫存活判胜
      this.over = true; this.winner = A;
      L.push(`<div class="bl g">⚡ 扛过${this.surviveRounds}回合，雷云散去！</div>`);
    } else if (!this.unlimited && this.round >= K.MAX_ROUNDS) {
      this.over = true; this.winner = B;
      L.push(`<div class="bl y">200回合已尽，未能取胜，判${nm(B)}胜出！</div>`);
    }
  }
  this.lines.push(...L); return L;
};
Battle.prototype.playRound = function (actA, actB) {
  const L0 = this.prepRound(actA, actB);
  if (!L0) return [];
  const L = [...L0];
  for (const [me, foe, act] of this._order) {
    L.push(...this.playHalf(me, foe, act));
    if (this.over) break;
  }
  // 注意：原逻辑中 over 在 finishRound 才判定，这里保持兼容
  L.push(...this.finishRound());
  return L;
};;
Battle.prototype.auto = function () { const plan = (typeof S !== 'undefined' && Array.isArray(S.battlePlan)) ? S.battlePlan : null; let round = 0; while (!this.over) { round++; let actA = aiChoose(this.A, this.B); if (plan && round <= 5 && plan[round-1]) { const p = plan[round-1]; if (p === 'attack' || p === 'defend' || (SKILLS[p] && canUse(this.A, p))) actA = p; } this.playRound(actA, aiChoose(this.B, this.A)); } return this; };

function distribute(tot, w, jitter) {
  const out = {}; ATTRS.forEach(k => out[k] = 1);
  let rest = Math.max(0, Math.round(tot) - 5);
  const ww = w.map(x => Math.max(0.05, x * rnd(1 - jitter, 1 + jitter))); const ws = ww.reduce((a, b) => a + b, 0);
  const alloc = ww.map(x => Math.floor(rest * x / ws));
  ATTRS.forEach((k, i) => out[k] += alloc[i]);
  let left = rest - alloc.reduce((a, b) => a + b, 0);
  const idx = [0, 1, 2, 3, 4];
  while (left-- > 0) out[ATTRS[wpick(idx, i => ww[i])]]++;
  return out;
}
function genMonster(S, dk) {
  const diff = DIFFS[dk] || DIFFS.easy, m = pick(MONSTERS);
  const pt = total(S.attrs);
  const tot = Math.max(dk === 'easy' ? 4 : 8, Math.max(monTotal(pt, diff), dk === 'easy' ? 0 : monTotal(diff.recTot, diff)) * rnd(0.9, 1.1)); // 总属性低于建议值时，怪物按建议值强度生成
  const attrs = {};
  const _ws = ATTRS.map(() => rnd(0.8, 1.2)), _wSum = _ws.reduce((a, b) => a + b, 0); // 五维平均分配，±20% 波动，不偏科
  ATTRS.forEach((k, i) => { attrs[k] = Math.max(1, Math.round(tot * _ws[i] / _wSum)); });
  const lv = Math.max(1, Math.floor((total(attrs) - 25) / 5) + 1);
  const skills = []; // 冒险怪物不带技能
  return { name: diff.pre + m.n, diff: dk, dname: diff.name, attrs, lv, skills, st: m.st || null };
}
function genOpponent(S) {
  const st = pick(STYLES);
  const tot = total(S.attrs) * rnd(K.PK_RANGE_LO, K.PK_RANGE_HI);
  const attrs = distribute(tot, st.w, 0.3);
  const prefer = st.prefer || ATTRS.slice().sort((a, b) => attrs[b] - attrs[a])[0];
  const name = pick(SURN) + pick(GIVEN);
  const lv = Math.max(1, S.level + ri(-2, 2));
  const skills = Object.keys(SKILLS).filter(k => lv >= SKILLS[k].lv && R() < 0.8); // 按等级习得技能
  let pet = null; if (R() < K.AI_PET_CHANCE) { pet = rollPet(null, wpick(Object.keys(PETS), x => PETS[x].w)); const g = randomGains(ri(0, Math.round(lv * K.AI_PET_EXTRA_LV))); for (const a in g) pet.attrs[a] += g[a]; } // 部分对手携带灵宠
  const inv = {}; const _nInv = ri(1, 3); for (let i = 0; i < _nInv; i++) { const _k = R() < 0.3 ? 'mai' : `${pick(ATTRS)}_${ri(1, 3)}`; inv[_k] = (inv[_k] || 0) + 1; } // v88：对手背包（同归于尽时互夺）
  return { name, style: st.n, attrs, prefer, lv, skills, pet, inv };
}
function randomGains(n) { const g = {}; for (let i = 0; i < n; i++) { const a = pick(ATTRS); g[a] = (g[a] || 0) + 1; } return g; }
function adventure(S, dk) {
  const diff = DIFFS[dk]; if (!diff || S.dead || S.stamina < diff.cost) return null;
  spend(S, diff.cost); if (S.dead) return null; S.stats.adv++; S.stats.advTotal = (S.stats.advTotal || 0) + 1; hungerDown(S, K.HUNGER_FIGHT, 1);
  const m = genMonster(S, dk);
  const mf = fighter(m.name, m.attrs, false, m.skills); mf.inflict = m.st || null; mf.realm = S.realm|0; // v87：AI仙力攻击用
  const b = new Battle(playerFighter(S, true), mf).auto();
  const win = b.winner === b.A, res = { m, diff, battle: b, win, newSt: [] };
  carryOut(S, b.A, res);
  if (!win && !((S.protect | 0) > 0) && R() < diff.st) { const k = m.st && R() < 0.6 ? m.st : pick(['bleed', 'poison', 'depress']); if (!hasSt(S, k)) res.newSt.push(addStatus(S, k)); } // 惨败可能留下伤病（新人保护期内免除；此处保护次数尚未扣除，直接看 S.protect）
  if (win) {
    S.stats.advWin++; S.stats.advWinTotal = (S.stats.advWinTotal || 0) + 1;
    const n = ri(diff.win[0], diff.win[1]);
    res.gains = randomGains(n); if (res.gains.vit) { delete res.gains.vit; } res.points = n;
    for (const k in res.gains) S.attrs[k] += res.gains[k];
    res.gold = ri(diff.gold[0], diff.gold[1]); S.gold += res.gold;
    res.xp = 0;
  } else {
    res.lost = {}; res.lostN = 0;
    res.lostStamina = S.stamina; res.lostGold = Math.floor(S.gold * K.DEATH_GOLD_PCT);
    if ((S.protect | 0) > 0) { // 🛡️新人保护：免除战败惩罚（不扣属性、体力不清零、不扣金元）
      S.protect--; res.protected = true; res.protectLeft = S.protect; res.wouldLose = diff.lose;
    } else {
      for (let i = 0; i < diff.lose; i++) {
        const cands = ATTRS.filter(k => S.attrs[k] > K.ATTR_MIN);
        if (!cands.length) break;
        const a = pick(cands); S.attrs[a]--; if (a === 'vit' && S.vitPeak) S.vitPeak--; /* 被夺走的生命不能用药水补回 */ res.lost[a] = (res.lost[a] || 0) + 1; res.lostN++;
      }
      S.stamina = 0; S.gold -= res.lostGold;
    }
    res.xp = diff.xpL;
  }
  res.lvUp = gainXp(S, res.xp);
  return res;
}
// ======== 文字冒险：选难度 → 3~6 步事件（遇怪 / 奇遇 / 宝箱 / 陷阱 / 休息点），每步 2~4 个选择 ========
const ADV_STEPS = { easy: 3, mid: 3, hard: 4, brutal: 4, hell: 5, abyss: 5, nightmare: 6, mijing: 5, wx_jin: 10, wx_mu: 10, wx_shui: 10, wx_huo: 10, wx_tu: 10 };
const RANKS = [ // 怪物阶级：强度倍率 / 奖励倍率 / 额外技能 / 掉落品质加成
  { name: '普通', cls: 'rk1', mult: 1.00, rew: 1.0, ms: 0 },
  { name: '精英', cls: 'rk2', mult: 1.06, rew: 1.5, ms: 1 },
  { name: '变异', cls: 'rk3', mult: 1.12, rew: 2.0, ms: 1 },
  { name: '领主', cls: 'rk4', mult: 1.20, rew: 3.0, ms: 2 },
  { name: '王',   cls: 'rk5', mult: 1.30, rew: 4.5, ms: 3 }
];
const RANK_W = { easy: [70, 22, 6, 2, 0], mid: [55, 28, 12, 4, 1], hard: [45, 30, 16, 7, 2], brutal: [35, 32, 20, 10, 3], hell: [25, 32, 24, 14, 5], abyss: [15, 30, 28, 20, 7], nightmare: [10, 25, 28, 25, 12], mijing: [5, 20, 30, 30, 15], wx_jin: [5, 20, 30, 30, 15], wx_mu: [5, 20, 30, 30, 15], wx_shui: [5, 20, 30, 30, 15], wx_huo: [5, 20, 30, 30, 15], wx_tu: [5, 20, 30, 30, 15] };
const EV_TYPES = { fight: { name: '遇怪', w: 38 }, fortune: { name: '奇遇', w: 24 }, chest: { name: '宝箱', w: 12 }, trap: { name: '陷阱', w: 14 }, rest: { name: '休息点', w: 12 } };
const ADV_FIGHT_U = 0.6;
const ADV_RF = { easy: 0.6, mid: 0.54, hard: 0.46, brutal: 0.41, hell: 0.36, abyss: 0.27, nightmare: 0.245, mijing: 0.4, wx_jin: 0.4, wx_mu: 0.4, wx_shui: 0.4, wx_huo: 0.4, wx_tu: 0.4 }; // 各档奖励缩放：一轮多场战斗+高阶怪，使每点体力收益只比低档略高 // 每场胜利奖励 = 该难度旧版单场奖励 × 0.6 × 阶级倍率
const tierIdx = dk => Object.keys(DIFFS).indexOf(dk);
const randRound = x => Math.floor(x) + (R() < x - Math.floor(x) ? 1 : 0);
const advDC = dk => Math.max(2, Math.round(DIFFS[dk].recTot / 5)); // 属性检定难度 ≈ 建议总属性的单项均值
function advCheckP(S, dk, attr) { const a = fightAttrs(S, false)[attr]; return clamp(0.25 + 0.5 * a / advDC(dk), 0.05, 0.95); }
function fleeP(S, mon) { return clamp(0.2 + 0.4 * fightAttrs(S, false).agi / Math.max(1, mon.attrs.agi), 0.1, 0.9); } // 敏捷相同 60%
const itemLabel0 = (st, k) => st === 'skillPages' ? SKILLS[k].name + '技能残页' : (({ mats: MATS, ores: ORES, pages: PAGES, meds: MEDS, food: MEATS })[st] || {})[k] ? ({ mats: MATS, ores: ORES, pages: PAGES, meds: MEDS, food: MEATS })[st][k].name : k;
function rollRank(dk, bump) { let r = wpick([0, 1, 2, 3, 4], i => RANK_W[dk][i]); return Math.min(4, r + (bump || 0)); }
function advMonster(S, dk, bump) {
  const rk = rollRank(dk, bump), R_ = RANKS[rk], m = genMonster(S, dk);
  ATTRS.forEach(k => m.attrs[k] = Math.max(1, Math.round(m.attrs[k] * R_.mult * K.ADV_MON_MULT)));
  m.skills = []; // 冒险怪物不带技能
  const dwx = (DIFFS[dk] || {}).wx; if (dwx) m.wx = dwx; // 五行怪：带对应属性
  m.name = m.name.replace(/^[^·]*·/, ''); m.rank = rk; m.lv = Math.max(1, Math.floor((total(m.attrs) - 25) / 5) + 1); return m;
}
// 事件池：t = 场景文字（可为函数）；ch = 选项 { l 文字, a 检定属性, cost 金元, need 物品, f(X, ok) 结果 }
const ADV_EVENTS = {
  // —— 奇遇 ——
  hermit:   { type: 'fortune', t: '路边坐着一位白发老者', ch: [
    { l: '行礼请教', a: 'int', f: (X, ok) => ok ? (R() < 0.5 ? X.item('skillPages', pick(Object.keys(SKILLS)), 1, '老者赠你一张技能残页') : X.xp(0.6, '老者指点迷津，你茅塞顿开')) : X.xp(0.15, '老者说的玄之又玄，你只听懂了一点') },
    { l: '奉上金元', cost: 0.4, f: X => X.item('mats', X.lu(), 1 + (R() < 0.3 ? 1 : 0), '老者收下金元，回赠凝露') },
    { l: '默默离开', f: X => X.say('你拱手作别，继续赶路。') }] },
  cave:     { type: 'fortune', t: '前方有一个幽深山洞', ch: [
    { l: '探查洞口', a: 'int', f: (X, ok) => ok ? X.gain(0.5, '你看破洞中机关，取走了前人遗留的宝物') : X.hurt('poison', '洞中瘴气弥漫，你吸入了毒气') },
    { l: '径直闯入', f: X => R() < 0.5 ? X.gain(0.7, '洞底竟是一处小宝库！') : X.ambush(1, '洞中沉睡的怪物被你惊醒了！') },
    { l: '绕开洞口', f: X => X.say('你没有冒险，绕道而行。') }] },
  merchant: { type: 'fortune', t: '遇到一位行脚商人', ch: [
    { l: '买一瓶凝露', cost: 0.5, f: X => X.item('mats', X.lu(), 1, '商人递来一瓶凝露') },
    { l: '买解毒丹与止血药', cost: 0.5, f: X => { X.item('meds', 'antidote', 1, '买到解毒丹'); return X.item('meds', 'bandage', 1, '买到止血药'); } },
    { l: '讨价还价', a: 'int', f: (X, ok) => ok ? X.item('meds', pick(['antidote', 'bandage', 'incense']), 1, '你口若悬河，商人忍痛送你一瓶药') : X.say('商人翻了个白眼，挑着担子走了。') },
    { l: '摆手离开', f: X => X.say('你谢过商人，继续前行。') }] },
  mushroom: { type: 'fortune', t: '路边长着一簇彩色蘑菇', ch: [
    { l: '摘来尝尝', a: 'vit', f: (X, ok) => ok ? X.attr('vit', 1 + (R() < 0.3 ? 1 : 0), '蘑菇入口即化，一股暖流涌遍全身') : X.hurt('poison', '腹中绞痛——是毒蘑菇！') },
    { l: '采来入药', f: X => X.item('mats', pick(['h_agi', 'h_str', 'h_def', 'h_vit', 'h_int']), 2, '你小心采下，蘑菇旁还长着药草') },
    { l: '不去碰它', f: X => X.say('越美的东西越危险，你转身离开。') }] },
  spring:   { type: 'fortune', t: '前方有一汪灵泉', ch: [
    { l: '掬水而饮', f: X => { const l = X.heal(0.3, '泉水清冽，伤势好转'); return R() < 0.25 ? l + '；' + X.attr(pick(ATTRS), 1, '灵气入体') : l; } },
    { l: '装一壶带走', f: X => X.item('mats', X.lu(), 1, '你装了一壶泉水，竟凝成了凝露') },
    { l: '捞取灵石', a: 'agi', f: (X, ok) => ok ? X.item('ores', X.sp(), 1, '你身手敏捷地捞起一块灵石') : X.say('泉底湿滑，你差点跌进水里，一无所获。') }] },
  bones:    { type: 'fortune', t: '路边有一具古修骸骨', ch: [
    { l: '翻找遗物', f: X => R() < 0.6 ? X.gain(0.4, '你在骸骨旁找到了一些值钱的东西') : X.hurt('depress', '一缕冤魂缠上了你，心头阴霾不散') },
    { l: '将其安葬', f: X => X.item('pages', pick(['pg1', 'pg2', 'pg3']), 1, '埋骨时，你发现一本残破的手札') },
    { l: '不打扰亡者', f: X => X.say('你默哀片刻，悄然离去。') }] },
  fox:      { type: 'fortune', t: '路边有一只受伤的灵狐', ch: [
    { l: '用止血药包扎', need: ['meds', 'bandage', 1], f: X => { X.take('meds', 'bandage', 1); return X.gain(0.5, '小狐狸伤愈后衔来一只小布袋，里面装着宝物') + '；' + X.item('mats', X.lu(), 1, '还有一瓶凝露'); } },
    { l: '轻声安抚', a: 'vit', f: (X, ok) => ok ? X.xp(0.4, '小狐狸蹭了蹭你的手，你心生暖意') : X.say('小狐狸受了惊吓，一溜烟跑了。') },
    { l: '继续赶路', f: X => X.say('你叹了口气，继续前行。') }] },
  stele:    { type: 'fortune', t: '前方有一块刻着谜语的石碑', ch: [
    { l: '冥思解谜', a: 'int', f: (X, ok) => ok ? X.item('pages', pick(['pg2', 'pg3', 'pg4']), 1 + (R() < 0.3 ? 1 : 0), '"天上之雨！"暗格应声而开') + '；' + X.xp(0.3, '') : X.say('你苦思良久，不得其解。') },
    { l: '以力破之', a: 'str', f: (X, ok) => ok ? X.gain(0.4, '你一掌拍碎石碑，暗格里的金元洒落一地') : X.loseAttr(1, '石碑反震，你受了内伤') },
    { l: '转身离开', f: X => X.say('你没有多做停留。') }] },
  boulder:  { type: 'fortune', t: '一块巨石挡住去路', ch: [
    { l: '推开巨石', a: 'str', f: (X, ok) => ok ? X.gain(0.6, '巨石轰然滚开，后面藏着一只宝匣') : X.hurt('bleed', '巨石纹丝不动，你反被碎石划伤') },
    { l: '从石缝钻过', a: 'agi', f: (X, ok) => ok ? X.gain(0.4, '你侧身钻过石缝，捡到了一些财物') : X.say('石缝太窄，你只好作罢。') },
    { l: '绕路而行', f: X => X.say('你绕了远路，平安无事。') }] },
  gambler:  { type: 'fortune', t: '路边有人邀你赌骰子', ch: [
    { l: '下注', cost: 0.4, f: X => R() < 0.5 * luck(X.S) ? X.gold(0.8, '骰子开出豹子，你大获全胜') : X.say('你输了，赌徒笑嘻嘻地收走了金元。') },
    { l: '识破他出千', a: 'int', f: (X, ok) => ok ? X.gold(0.4, '你当场拆穿骗局，赌徒赔钱了事') : X.say('你没看出破绽，悻悻离开。') },
    { l: '不赌', f: X => X.say('十赌九输，你摇头离去。') }] },
  meteor:   { type: 'fortune', t: '一颗流星坠落在附近', ch: [
    { l: '前去查看', f: X => X.item('ores', X.sp(), 1 + (R() < 0.3 ? 1 : 0), '坑中是一块尚有余温的灵石') },
    { l: '对星许愿', f: X => R() < 0.5 ? X.xp(0.5, '冥冥中似有感应，你心境通明') : X.say('流星一闪而逝，什么也没发生。') }] },
  // —— 更多奇遇：NPC / 修士 / 灵兽 / 天象 / 遗迹 / 道德抉择 / 趣事 ——
  swordsman:{ type: 'fortune', t: '一名剑客要与你切磋', ch: [
    { l: '以力相拼', a: 'str', f: (X, ok) => ok ? X.xp(0.5, '你一招险胜，青年心服口服') + '；' + X.gold(0.2, '他留下一袋金元作彩头') : X.xp(0.15, '你落了下风，但也有所领悟') },
    { l: '以巧破招', a: 'agi', f: (X, ok) => ok ? X.item('skillPages', pick(Object.keys(SKILLS)), 1, '青年赞叹你身法，赠你一页剑谱残页') : X.say('你的身法被他看穿，只好认输。') },
    { l: '婉言谢绝', f: X => X.say('青年有些失望，拱手离去。') }] },
  alchemist:{ type: 'fortune', t: '路边有位丹士在试药', ch: [
    { l: '尝一口', a: 'vit', f: (X, ok) => ok ? X.attr(pick(ATTRS), 1 + (R() < 0.3 ? 1 : 0), '药力化开，你只觉通体舒泰') : X.hurt('poison', '一口下去，你脸都绿了') },
    { l: '替他看火候', a: 'int', f: (X, ok) => ok ? X.item('mats', X.lu(), 1, '丹成之时，丹士分你一瓶凝露') : X.say('锅炸了，你们俩都被熏成了黑炭。') },
    { l: '敬谢不敏', f: X => X.say('你捂着鼻子快步走开。') }] },
  beggar:   { type: 'fortune', t: '路边有个老乞丐', ch: [
    { l: '施舍金元', cost: 0.2, f: X => R() < 0.4 ? X.item('pages', pick(['pg3', 'pg4']), 1, '乞丐忽然目露精光，塞给你一卷残页，转眼消失不见') : X.xp(0.2, '乞丐连声道谢，你心中欢喜') },
    { l: '分他一块肉', need: ['food', 'rabbit', 1], f: X => { X.take('food', 'rabbit', 1); return X.xp(0.3, '乞丐狼吞虎咽，临走前指点了你一句心法'); } },
    { l: '径直走过', f: X => X.say('你装作没看见，匆匆走过。') }] },
  bandits:  { type: 'fortune', t: '三个山贼拦路', ch: [
    { l: '交钱消灾', cost: 0.3, f: X => X.say('山贼掂了掂钱袋，嘿嘿笑着放你过去。') },
    { l: '拔剑迎战', f: X => X.ambush(0, '山贼头目提刀冲了上来！') },
    { l: '虚张声势', a: 'int', f: (X, ok) => ok ? X.gold(0.3, '"我师父是青云宗长老！"山贼吓得扔下赃物就跑') : X.ambush(1, '山贼根本不信，一拥而上！') }] },
  lostkid:  { type: 'fortune', t: '路边有个迷路的小童', ch: [
    { l: '送他回村', f: X => X.gold(0.3, '村民们感激不尽，凑了些盘缠给你') + '；' + X.xp(0.2, '') },
    { l: '指明方向', f: X => X.xp(0.1, '小童破涕为笑，蹦蹦跳跳地走了') },
    { l: '无暇理会', f: X => X.hurt('depress', '小童的哭声一路在你耳边回荡') }] },
  fishing:  { type: 'fortune', t: '溪边有位老翁在钓鱼', ch: [
    { l: '静坐陪钓', a: 'int', f: (X, ok) => ok ? X.xp(0.6, '你看着直钩出神，忽有所悟') : X.say('你坐不住，没一会儿就走了。') },
    { l: '下水摸鱼', a: 'agi', f: (X, ok) => ok ? X.item('food', 'deer', 1, '你摸到一条大鱼，老翁笑着换给你一块鹿肉') : X.say('你湿透了，一条鱼也没摸到。') },
    { l: '告辞', f: X => X.say('老翁头也不回："去吧。"') }] },
  herbfield:{ type: 'fortune', t: '前方有一片野生药田', ch: [
    { l: '仔细采摘', a: 'int', f: (X, ok) => X.item('mats', pick(['h_agi', 'h_str', 'h_def', 'h_vit', 'h_int']), ok ? 4 : 2, ok ? '你识得药性，挑最好的采' : '你胡乱采了一些') },
    { l: '寻找灵草', a: 'agi', f: (X, ok) => ok ? X.item('mats', X.lu(), 1, '悬崖边的灵草凝着露珠') : X.hurt('bleed', '你攀崖时失手滑落，擦伤了手臂') },
    { l: '继续赶路', f: X => X.say('你记下了这个地方。') }] },
  thunder:  { type: 'trap', t: '突遇雷暴', ch: [
    { l: '寻找掩体', a: 'agi', f: (X, ok) => ok ? X.say('你躲进岩洞，雷暴很快过去了。') : X.loseAttr(1, '一道闪电擦身而过，你被电得浑身发麻') },
    { l: '引雷淬体', a: 'vit', f: (X, ok) => ok ? X.attr('vit', 1, '雷光入体，你的肉身更加坚韧') : X.hurt('bleed', '雷电灼伤了你') }] },
  blizzard: { type: 'trap', t: '突遇暴风雪', ch: [
    { l: '顶风前行', a: 'vit', f: (X, ok) => ok ? X.say('你咬牙走出了风雪。') : X.loseAttr(1, '寒气侵体，你冻伤了') },
    { l: '原地挖雪洞', a: 'int', f: (X, ok) => ok ? X.heal(0.1, '雪洞里意外暖和，你还小睡了一会儿') : X.hurt('depress', '漫长的风雪夜让你心情低落') }] },
  rainbow:  { type: 'fortune', t: '前方出现一道虹桥', ch: [
    { l: '踏上虹桥', a: 'agi', f: (X, ok) => ok ? X.gain(0.5, '桥中央悬着一只锦囊') : X.say('虹桥在你脚下消散，你摔了个屁股墩。') },
    { l: '对虹许愿', f: X => X.buff('luck', '你的心愿似乎被听见了') },
    { l: '欣赏片刻', f: X => X.xp(0.1, '美景当前，心旷神怡') }] },
  ruins:    { type: 'fortune', t: '前方有一座古修洞府', ch: [
    { l: '参悟符文', a: 'int', f: (X, ok) => ok ? X.item('pages', pick(['pg3', 'pg4', 'pg5']), 1, '符文化作一页金光残页落入你手') : X.hurt('depress', '符文反噬，你头痛欲裂') },
    { l: '推门而入', a: 'str', f: (X, ok) => ok ? X.gain(0.6, '洞府中尚有遗宝') : X.ambush(1, '守府傀儡睁开了眼睛！') },
    { l: '不惊扰前辈', f: X => X.xp(0.1, '你对着洞府行了一礼') }] },
  shrine:   { type: 'rest', t: '路边有一座土地庙', ch: [
    { l: '虔诚祈福', f: X => X.buff('luck', '一阵清风拂过，你感觉运气变好了') },
    { l: '偷吃供果', f: X => R() < 0.5 ? X.heal(0.2, '供果清甜可口') : X.hurt('depress', '你总觉得土地公在瞪你') },
    { l: '继续赶路', f: X => X.say('你拱了拱手，继续赶路。') }] },
  sword_tomb:{ type: 'fortune', t: '前方是一片剑冢', ch: [
    { l: '感悟剑意', a: 'str', f: (X, ok) => ok ? X.buff('str', '剑意入体，你的力量暂时暴涨') : X.hurt('bleed', '剑气割伤了你') },
    { l: '拔一柄残剑', a: 'agi', f: (X, ok) => ok ? X.item('ores', pick(['silver', 'gold']), 2, '残剑化作一团精金') : X.loseAttr(1, '剑冢震怒，将你震飞') },
    { l: '绕道', f: X => X.say('你不敢轻举妄动，远远绕开。') }] },
  spirit_deer:{ type: 'fortune', t: '林中有一头灵鹿', ch: [
    { l: '悄悄接近', a: 'agi', f: (X, ok) => ok ? X.item('mats', X.lu(), 1, '灵鹿低头，让你摘下一颗灵果') : X.say('灵鹿一跃而去，消失在林中。') },
    { l: '伸手喂食', need: ['mats', 'h_vit', 1], f: X => { X.take('mats', 'h_vit', 1); return X.xp(0.4, '灵鹿亲昵地舔了舔你的手') + '；' + X.heal(0.2, '你感到一阵温暖'); } },
    { l: '远远观赏', f: X => X.xp(0.1, '你屏息看着它离去') }] },
  monkey:   { type: 'fortune', t: '一只灵猴抢走了你的钱袋', ch: [
    { l: '追上去', a: 'agi', f: (X, ok) => ok ? X.gold(0.3, '你抓住了灵猴，它把偷来的东西全吐了出来') : X.loseGold(0.05, '灵猴溜得无影无踪') },
    { l: '拿果子引诱', f: X => R() < 0.6 ? X.gold(0.15, '灵猴用钱袋换了果子，还多送了几枚金元') : X.loseGold(0.05, '灵猴拿了果子也没还钱袋') },
    { l: '算了', f: X => X.loseGold(0.03, '你自认倒霉') }] },
  toad:     { type: 'fortune', t: '石头上蹲着一只金蟾', ch: [
    { l: '摸摸它的头', f: X => R() < 0.5 ? X.gold(0.5, '金蟾吐出一堆金元！') : X.hurt('poison', '金蟾喷了你一脸毒液') },
    { l: '跟它讲道理', a: 'int', f: (X, ok) => ok ? X.gold(0.3, '金蟾似乎听懂了，把铜钱吐给你——竟是一枚金锭') : X.say('金蟾打了个哈欠，跳走了。') },
    { l: '不理它', f: X => X.say('你与金蟾大眼瞪小眼片刻，各走各路。') }] },
  cultists: { type: 'fortune', t: '一群邪修正在献祭村民', ch: [
    { l: '出手救人', f: X => X.ambush(1, '黑袍首领怒喝一声，化作怪物扑来！') },
    { l: '偷袭祭坛', a: 'agi', f: (X, ok) => ok ? X.gold(0.4, '你打翻祭坛救下村姑，村民们重重答谢') + '；' + X.xp(0.3, '') : X.ambush(2, '你被发现了，邪物被提前唤醒！') },
    { l: '悄悄离开', f: X => X.hurt('depress', '你背过身去，心中久久不能平静') }] },
  peddler_fake:{ type: 'fortune', t: '小贩兜售"祖传仙丹"', ch: [
    { l: '买一颗', cost: 0.3, f: X => R() < 0.2 ? X.attr(pick(ATTRS), 2, '居然是真的！') : X.say('你吃下去，只尝出了一股面粉味。') },
    { l: '拆穿他', a: 'int', f: (X, ok) => ok ? X.gold(0.2, '小贩吓得赔钱求饶') : X.say('小贩巧舌如簧，你竟无言以对。') },
    { l: '不理', f: X => X.say('你翻了个白眼走开了。') }] },
  pond_duck:{ type: 'fortune', t: '池塘里一只鸭子叼着亮晶晶的东西', ch: [
    { l: '扑过去抓', a: 'agi', f: (X, ok) => ok ? X.item('ores', X.sp(), 1, '鸭子嘴里是一块灵石') : X.say('你扑进池塘，满身是泥，鸭子嘲笑地游走了。') },
    { l: '学鸭子叫', f: X => R() < 0.5 ? X.item('ores', pick(['copper', 'silver']), 2, '鸭子把东西放在了你脚边') : X.say('鸭子看你的眼神像看傻子。') },
    { l: '走开', f: X => X.say('你继续赶路，身后传来一阵呱呱声。') }] },
  riddle_bridge:{ type: 'fortune', t: '桥头石像要你答题才能过桥', ch: [
    { l: '"水！"', a: 'int', f: (X, ok) => ok ? X.item('pages', pick(['pg2', 'pg3', 'pg4']), 1, '石像点头让路，桥下浮起一卷残页') + '；' + X.xp(0.2, '') : X.say('"答错了。"你只好涉水过河。') },
    { l: '直接走过去', a: 'str', f: (X, ok) => ok ? X.say('你一把推开石像，扬长而去。') : X.loseAttr(1, '石像一掌把你拍进了河里') },
    { l: '另寻他路', f: X => X.say('你绕了很远的路。') }] },
  inn:      { type: 'rest', t: '路边有一家客栈', ch: [
    { l: '住店歇息', cost: 0.2, f: X => { const l = X.heal(0.4, '一夜好眠'); X.cure('depress'); return l; } },
    { l: '点一桌好菜', cost: 0.3, f: X => { X.S.hunger = Math.min(100, X.S.hunger + 40); return X.buff(pick(['str', 'agi', 'def']), '酒足饭饱，浑身是劲'); } },
    { l: '打听消息', f: X => X.xp(0.15, '你从食客口中听到不少江湖传闻') }] },
  hot_spring:{ type: 'rest', t: '前方有一处温泉', ch: [
    { l: '泡个澡', f: X => { const l = X.heal(0.35, '温泉洗去一身疲惫'); return X.cure('bleed') ? l + '；流血止住' : l; } },
    { l: '在泉边打坐', a: 'int', f: (X, ok) => ok ? X.xp(0.4, '地脉灵气充沛，你修为精进') : X.heal(0.1, '你睡着了，醒来时精神不错') },
    { l: '继续赶路', f: X => X.say('你没有停留。') }] },
  tea_house:{ type: 'rest', t: '山顶茶寮有道姑煮茶', ch: [
    { l: '品茶论道', a: 'int', f: (X, ok) => ok ? X.xp(0.5, '道姑对你的见解颇为赞赏') + '；' + X.heal(0.2, '') : X.heal(0.2, '茶香沁脾') },
    { l: '讨教剑法', a: 'agi', f: (X, ok) => ok ? X.buff('agi', '道姑传你一式身法') : X.say('道姑笑而不语。') },
    { l: '道谢离开', f: X => X.say('你谢过道姑，下山而去。') }] },
  graveyard:{ type: 'trap', t: '误入乱葬岗', ch: [
    { l: '壮胆快走', a: 'vit', f: (X, ok) => ok ? X.say('你一口气冲出了乱葬岗。') : X.hurt('depress', '阴气侵体，你浑身发冷') },
    { l: '念清心咒', a: 'int', f: (X, ok) => ok ? X.xp(0.2, '磷火渐渐散去') : X.hurt('depress', '咒念错了，四周鬼哭狼嚎') }] },
  swamp:    { type: 'trap', t: '前方是一片毒沼', ch: [
    { l: '屏息穿过', a: 'vit', f: (X, ok) => ok ? X.say('你憋着气走出了沼泽。') : X.hurt('poison', '你吸进了沼气') },
    { l: '踩着树根跳过', a: 'agi', f: (X, ok) => ok ? X.say('你身轻如燕，几步就跳了过去。') : X.loseGold(0.08, '你一脚踩空，钱袋掉进了泥里') }] },
  spider_web:{ type: 'trap', t: '踩上了一张巨大的蛛网', ch: [
    { l: '用力挣开', a: 'str', f: (X, ok) => ok ? X.item('mats', X.lu(), 1, '蛛网中还缠着一瓶别人遗落的凝露') : X.hurt('poison', '巨蛛从天而降咬了你一口') },
    { l: '冷静割断', a: 'agi', f: (X, ok) => ok ? X.say('你小心割断蛛丝，悄然脱身。') : X.ambush(0, '巨蛛被惊动了！') }] },
  pitfall:  { type: 'trap', t: '踩中了猎人的陷坑', ch: [
    { l: '空中借力', a: 'agi', f: (X, ok) => ok ? X.say('你在坑壁一点，翻身跃出。') : X.hurt('bleed', '你摔进坑里，被竹签扎伤') },
    { l: '护住要害', a: 'def', f: (X, ok) => ok ? X.item('food', 'rabbit', 1, '你稳稳落地，坑里还有一只被困的野兔') : X.loseAttr(1, '你摔得七荤八素') }] },
  fire_trap:{ type: 'trap', t: '石像喷出烈焰', ch: [
    { l: '疾冲过去', a: 'agi', f: (X, ok) => ok ? X.say('你在火舌合拢前冲了过去。') : X.hurt('bleed', '你被烧伤了') },
    { l: '运功抵御', a: 'def', f: (X, ok) => ok ? X.xp(0.15, '烈焰在你护体真气上化为青烟') : X.loseAttr(1, '火焰灼伤了你的经脉') }] },
  mirror:   { type: 'trap', t: '一面古镜想把你拉进去', ch: [
    { l: '守住本心', a: 'int', f: (X, ok) => ok ? X.xp(0.4, '镜中心魔烟消云散，你道心更坚') : X.hurt('depress', '心魔缠身') },
    { l: '击碎古镜', a: 'str', f: (X, ok) => ok ? X.item('ores', X.sp(), 1, '镜片化作一块灵石') : X.loseAttr(1, '镜片反弹划伤了你') }] },
  chest_gold:{ type: 'chest', t: '前方有一个贴着封条的金箱', ch: [
    { l: '撕开封条', f: X => R() < 0.6 ? X.gain(0.7, '你果然是有缘人') : X.hurt('depress', '封条化作一道咒印打在你身上') },
    { l: '研究封条', a: 'int', f: (X, ok) => ok ? X.gain(0.6, '你解开了封印') + '；' + X.item('pages', pick(['pg2', 'pg3']), 1, '') : X.say('封条上的字你一个也不认识。') },
    { l: '放弃', f: X => X.say('你犹豫再三，还是没有打开。') }] },
  chest_ice:{ type: 'chest', t: '前方有一个冰封的宝箱', ch: [
    { l: '砸开冰层', a: 'str', f: (X, ok) => ok ? X.gain(0.6, '冰层碎裂，宝箱完好无损') : X.loseAttr(1, '反震之力震得你虎口发麻') },
    { l: '以体温慢慢融化', a: 'vit', f: (X, ok) => ok ? X.gain(0.5, '你盘坐了一个时辰，终于融开了冰层') : X.hurt('depress', '冻得你直打哆嗦，心情很差') },
    { l: '离开', f: X => X.say('你放弃了这只宝箱。') }] },
  chest_tree:{ type: 'chest', t: '树洞里有一个小木盒', ch: [
    { l: '伸手去拿', f: X => R() < 0.7 ? X.item('mats', X.lu(), 1, '盒子里是一瓶凝露和一张纸条："送给路过的你"') : X.hurt('poison', '树洞里有一窝毒蜂！') },
    { l: '放点东西进去', cost: 0.1, f: X => X.xp(0.3, '你也留下一份心意，心中莫名欢喜') },
    { l: '不动它', f: X => X.say('你笑了笑，走开了。') }] },
  chest_bandit:{ type: 'chest', t: '发现山贼的藏宝点', ch: [
    { l: '悄悄搬走', a: 'agi', f: (X, ok) => ok ? X.gain(0.8, '你满载而归') : X.ambush(1, '看守惊醒，大喊着扑了过来！') },
    { l: '打晕看守', a: 'str', f: (X, ok) => ok ? X.gain(0.6, '看守被你一拳放倒') : X.ambush(0, '看守挨了一下，更加愤怒了！') },
    { l: '溜走', f: X => X.say('你决定不蹚这趟浑水。') }] },
  rival:    { type: 'fortune', t: '迎面遇到一位不善的师兄', ch: [
    { l: '谦虚应对', a: 'int', f: (X, ok) => ok ? X.xp(0.3, '师兄脸色缓和，与你把酒言欢') : X.hurt('depress', '师兄冷嘲热讽，你憋了一肚子气') },
    { l: '比试一场', a: 'str', f: (X, ok) => ok ? X.gold(0.4, '师兄输了，只好履行赌约') : X.loseGold(0.05, '你输了，只好履行赌约') },
    { l: '避而不见', f: X => X.say('你装作没看见，绕路离开。') }] },
  wandering_monk:{ type: 'fortune', t: '遇到一位云游僧人', ch: [
    { l: '请大师化解', cost: 0.2, f: X => { const c = X.cure('poison') || X.cure('bleed') || X.cure('depress'); return c ? '伤病痊愈' : X.buff('def'); } },
    { l: '与他论禅', a: 'int', f: (X, ok) => ok ? X.xp(0.5, '一番机锋，你若有所悟') : X.say('你听得昏昏欲睡。') },
    { l: '一笑置之', f: X => X.say('"信则有，不信则无。"你大步离去。') }] },
  lotus:    { type: 'fortune', t: '湖心开着一朵青莲', ch: [
    { l: '踏水取莲', a: 'agi', f: (X, ok) => ok ? X.attr('int', 1 + (R() < 0.3 ? 1 : 0), '莲子入口，灵台清明') : X.say('你踩水失败，落入湖中。') },
    { l: '以石击落', a: 'str', f: (X, ok) => ok ? X.item('mats', X.lu(), 1, '莲心坠落，化作凝露') : X.say('石子太重，把青莲砸碎了……') },
    { l: '欣赏', f: X => X.xp(0.15, '你静静看着青莲，心境平和') }] },
  cat:      { type: 'fortune', t: '一只黑猫挡在岔路口', ch: [
    { l: '跟着黑猫走', f: X => R() < 0.5 ? X.gain(0.4, '黑猫把你带到一处无人的宝地') : X.hurt('depress', '黑猫把你带进了死胡同，然后跑了') },
    { l: '撸猫', f: X => X.heal(0.1, '黑猫呼噜呼噜，你心情大好') },
    { l: '走左边', f: X => X.say('你选了左边的路，平平无奇。') }] },
  drunk_immortal:{ type: 'fortune', t: '路边躺着一个醉道人', ch: [
    { l: '请他喝酒', cost: 0.3, f: X => R() < 0.5 ? X.item('skillPages', pick(Object.keys(SKILLS)), 1, '道人大笑，随手甩给你一页残卷') : X.xp(0.3, '道人与你称兄道弟，酒后吐真言') },
    { l: '偷他的葫芦', a: 'agi', f: (X, ok) => ok ? X.item('mats', X.lu(), 2, '葫芦里装的竟是凝露') : X.loseAttr(1, '道人翻身一脚把你踢飞') },
    { l: '绕过去', f: X => X.say('道人的鼾声震天响。') }] },
  // —— 深渊 / 噩梦 专属稀有事件 ——
  abyss_gate:{ type: 'fortune', min: 5, t: '【深渊】虚空中浮现一座上古祭坛', ch: [
    { l: '取走晶石', a: 'int', f: (X, ok) => ok ? X.item(R() < 0.5 ? 'mats' : 'ores', R() < 0.5 ? 'dw3' : 'sp5', 1, '你破开禁制，取得一枚五品至宝') : X.ambush(2, '祭坛守卫苏醒了！') },
    { l: '以血祭坛', f: X => X.loseAttr(1, '你割破手掌献祭') + '；' + X.gain(1.0, '祭坛回赠了丰厚的宝藏') },
    { l: '速速离开', f: X => X.say('深渊凶险，你不敢久留。') }] },
  demon_whisper:{ type: 'fortune', min: 5, t: '【深渊】魔音要与你立约', ch: [
    { l: '接受契约', f: X => R() < 0.5 ? X.attr(pick(ATTRS), 3, '一股狂暴的力量涌入你体内') : X.hurt('depress', '契约反噬，心魔丛生') + '；' + X.loseAttr(2, '') },
    { l: '以正破邪', a: 'int', f: (X, ok) => ok ? X.xp(1.0, '你的道心斩碎了魔音，修为大进') : X.hurt('depress', '魔音侵入识海') },
    { l: '捂耳疾走', f: X => X.say('你头也不回地冲出了黑暗。') }] },
  dragon_bones:{ type: 'chest', min: 5, t: '【深渊】前方有一具龙骨与宝库', ch: [
    { l: '搬取宝藏', a: 'str', f: (X, ok) => ok ? X.gain(1.2, '你扛走了一大箱珍宝') : X.ambush(3, '龙魂不散，化作骨龙腾空而起！') },
    { l: '拾取龙鳞', a: 'agi', f: (X, ok) => ok ? X.item('ores', 'sp5', 1, '一片龙鳞在你掌中化作极品灵石') : X.hurt('bleed', '龙鳞边缘锋利如刀') },
    { l: '叩拜离去', f: X => X.xp(0.3, '你对真龙遗骸恭敬叩拜') }] },
  nightmare_mirror:{ type: 'trap', min: 6, t: '【噩梦】你陷入了梦境循环', ch: [
    { l: '看破梦境', a: 'int', f: (X, ok) => ok ? X.xp(1.0, '梦境碎裂，你从噩梦中领悟了真意') : X.hurt('depress', '你在梦中迷失了许久') + '；' + X.loseAttr(1, '') },
    { l: '以力破梦', a: 'str', f: (X, ok) => ok ? X.gain(0.8, '你撕开梦境，梦中的宝物随你一同回到现实') : X.loseAttr(2, '梦境反噬') }] },
  fallen_star:{ type: 'fortune', min: 6, t: '【噩梦】陨落仙人的残魂要传你衣钵', ch: [
    { l: '跪接传承', a: 'vit', f: (X, ok) => ok ? X.attr(pick(ATTRS), 3, '仙人残魂融入你体内') + '；' + X.item('skillPages', pick(Object.keys(SKILLS)), 2, '') : X.loseAttr(2, '你的肉身承受不住传承之力') },
    { l: '只求一问', a: 'int', f: (X, ok) => ok ? X.item('pages', 'pg5', 2, '仙人为你解惑，留下两页大悟残页') : X.xp(0.5, '仙人的话你只听懂了一半') },
    { l: '恭送仙人', f: X => X.xp(0.4, '残魂微笑着消散了') }] },
  nightmare_king:{ type: 'fortune', min: 6, t: '【噩梦】噩梦之王坐在王座上', ch: [
    { l: '拔剑挑战', f: X => X.ambush(4, '噩梦之王从王座上站了起来！') },
    { l: '献上贡品', cost: 1.0, f: X => X.gain(1.2, '王冷笑一声，扔给你一箱战利品') },
    { l: '转身就跑', a: 'agi', f: (X, ok) => ok ? X.say('你拼尽全力逃出了王殿。') : X.ambush(3, '王座两侧的骷髅卫士拦住了你！') }] },
  // —— 宝箱 ——
  woodbox:  { type: 'chest', t: '路边有一个旧木箱', ch: [
    { l: '直接打开', f: X => R() < 0.8 ? X.gain(0.4, '箱中是些散碎财物') : X.hurt('poison', '箱中喷出一股毒烟') },
    { l: '检查机关再开', a: 'agi', f: (X, ok) => ok ? X.gain(0.5, '你拆掉机关，稳稳当当地打开了箱子') + '；' + X.item('ores', pick(['iron', 'copper', 'silver']), 2, '') : X.hurt('bleed', '机关弹出暗刃，划伤了你的手') },
    { l: '不碰为妙', f: X => X.say('你没有理会木箱。') }] },
  mimic:    { type: 'chest', t: '石台上有一个可疑的金宝箱', ch: [
    { l: '打开宝箱', f: X => R() < 0.5 ? X.gain(0.8, '宝箱里金光闪闪！') + '；' + X.item('mats', X.lu(), 1, '') : X.ambush(1, '宝箱张开血盆大口——是宝箱怪！') },
    { l: '拔剑戳一戳', a: 'str', f: (X, ok) => ok ? X.gain(0.5, '宝箱怪被你一剑刺穿，吐出了肚里的财宝') : X.ambush(0, '宝箱怪被激怒了！') },
    { l: '敬而远之', f: X => X.say('太过完美的东西，往往是陷阱。') }] },
  ironbox:  { type: 'chest', t: '树根间卡着一个铁箱', ch: [
    { l: '撬锁', a: 'agi', f: (X, ok) => ok ? X.gain(0.6, '咔嗒一声，锁开了') + '；' + X.item('ores', X.sp(), 1, '') : X.say('锁芯锈死了，撬了半天也打不开。') },
    { l: '砸开', a: 'str', f: (X, ok) => ok ? X.gain(0.4, '铁箱被你砸得变了形，里面的东西倒还完好') : X.loseAttr(1, '你用力过猛，扭伤了筋骨') },
    { l: '放弃', f: X => X.say('你拍拍手上的锈，继续赶路。') }] },
  // —— 陷阱 ——
  rockfall: { type: 'trap', t: '头顶落石', ch: [
    { l: '闪身躲避', a: 'agi', f: (X, ok) => ok ? X.xp(0.1, '你一个翻滚躲开了落石') : X.hurt('bleed', '碎石砸中了你，血流不止') },
    { l: '运气硬扛', a: 'def', f: (X, ok) => ok ? X.xp(0.1, '石块在你身上碎成齑粉') : X.loseAttr(1, '你被砸得头晕眼花') }] },
  arrows:   { type: 'trap', t: '墙缝射出毒箭', ch: [
    { l: '闪避', a: 'agi', f: (X, ok) => ok ? X.say('箭矢擦着衣角飞过，有惊无险。') : X.hurt('poison', '一支毒箭射中了你') },
    { l: '举臂格挡', a: 'def', f: (X, ok) => ok ? X.say('你硬生生挡下了箭雨。') : X.hurt('poison', '箭头划破皮肤，毒素渗入') }] },
  fog:      { type: 'trap', t: '四周升起紫色迷雾', ch: [
    { l: '静心破阵', a: 'int', f: (X, ok) => ok ? X.xp(0.3, '你看破幻阵，心境更上一层') : X.hurt('depress', '幻象侵入心神，你心情低落') },
    { l: '强行冲出', a: 'vit', f: (X, ok) => ok ? X.say('你凭着一口气冲出了迷雾。') : X.loseGold(0.1, '慌乱中你的钱袋掉了一半在雾里') }] },
  quicksand:{ type: 'trap', t: '陷入流沙', ch: [
    { l: '奋力挣脱', a: 'str', f: (X, ok) => ok ? X.say('你硬是从流沙中拔出身来。') : X.loseAttr(1, '挣扎中你耗尽了力气') },
    { l: '轻身跃出', a: 'agi', f: (X, ok) => ok ? X.say('你足尖一点，轻巧地跃出了流沙。') : X.loseGold(0.1, '你狼狈爬出，钱袋却陷进了沙里') }] },
  // —— 休息点 ——
  temple:   { type: 'rest', t: '前方有一座破庙', ch: [
    { l: '打坐休息', f: X => { const l = X.heal(0.3, '你调息片刻，伤势好转'); return X.cure('depress') ? l + '；抑郁消除' : l; } },
    { l: '上香参拜', f: X => R() < 0.5 ? X.xp(0.3, '神像似乎对你微微一笑') : X.gold(0.2, '香炉底下压着几枚金元') },
    { l: '继续赶路', f: X => X.say('你没有停留。') }] },
  campfire: { type: 'rest', t: '前方有一堆篝火', ch: [
    { l: '烤火歇息', f: X => X.heal(0.25, '暖意驱散了疲惫') },
    { l: '搜索营地', f: X => R() < 0.7 ? X.item('food', pick(['rabbit', 'deer', 'wolf']), 1, '你找到了一块烤好的肉') : X.ambush(0, '营地的主人回来了，而且不太友好！') },
    { l: '继续赶路', f: X => X.say('你踩灭篝火，继续前行。') }] },
  woodcutter:{ type: 'rest', t: '山腰有一间樵夫小屋', ch: [
    { l: '喝茶歇脚', f: X => X.heal(0.2, '热茶下肚，精神一振') + '；' + X.xp(0.1, '') },
    { l: '帮他劈柴', a: 'str', f: (X, ok) => ok ? X.gold(0.3, '樵夫硬塞给你一些酬劳') : X.say('你劈得满头大汗，樵夫哈哈大笑。') },
    { l: '谢过离开', f: X => X.say('你谢过樵夫，继续上路。') }] }
};
// —— 掉落表：游戏中所有物品都可能从冒险中获得（r 稀有度 0~4：越稀有越少，高难度越常见） ——
const ELIXIR_KEYS = ['hp1', 'hp2', 'hp3', 'mp1', 'mp2', 'mp3'];
function lootTable() {
  const L = [], add = (st, k, w, r, n, mj) => L.push({ st, k, w, r, n: n || 1, mj: !!mj });
  ['iron', 'copper', 'silver', 'gold'].forEach((k, i) => add('ores', k, [30, 18, 9, 4][i], i, [3, 2, 2, 1][i]));
  ['sp1', 'sp2', 'sp3', 'sp4', 'sp5'].forEach((k, i) => add('ores', k, [12, 6, 3, 1.2, 0.3][i], i));
  ['dw1', 'dw2', 'dw3'].forEach((k, i) => add('mats', k, [12, 3, 0.3][i], [0, 2, 4][i])); // v1128 凝露三品
  Object.keys(MATS).filter(k => MATS[k].basic).forEach(k => add('mats', k, 8, 0, 2));
  Object.keys(PREY).forEach((k, i) => add('prey', k, [10, 6, 3, 1.2][i], i));
  Object.keys(MEATS).forEach((k, i) => add('food', k, [8, 5, 3, 1.2][i], i));
  Object.keys(EGGS).forEach((k, i) => add('eggs', k, [8, 5, 3, 1.2][i], i));
  Object.keys(PAGES).forEach((k, i) => add('pages', k, [8, 5, 2.5, 1, 0.3][i], i));
  Object.keys(EXP_BOOKS).forEach((k, i) => add('expBooks', k, [1.5, 0.8, 0.4, 0.15, 0.05][i], i + 1 > 4 ? 4 : i + 1));
  Object.keys(SKILLS).forEach(k => { add('skillPages', k, 0.8, 2); add('skillBooks', k, 0.08, 4); });
  ELIXIR_KEYS.forEach(k => add('elixirs', k, [3, 1.5, 0.5][+k[2] - 1], +k[2] - 1));
  Object.keys(MEDS).forEach(k => add('meds', k, 3, 1));
  ATTRS.forEach(a => [1, 2, 3].forEach(g => add('inv', a + '_' + g, [1.2, 0.5, 0.15][g - 1], g)));
  add('inv', 'mai', 0.3, 4); // 开脉丹：冒险低概率掉落（稀有度4）
  add('maiPages', '*', 2.5, 2, 1, true); // 脉络残页：秘境专属掉落
  Object.keys(DISHES).filter(d => !DISHES[d].zx).forEach(d => [1, 2, 3].forEach(q => add('dishes', dishKey(d, q), [1, 0.4, 0.12][q - 1], q)));
  Object.keys(DISHES).filter(d => DISHES[d].zx).forEach(d => add('zx', d, 0.25, 4)); // 珍馐：无品质，直接进 S.zx
  add('gear', '*', 3, 2); add('petEggs', '*', 0.35, 4);
  return L;
}
let LOOT = null;
const lootW = (e, t) => e.w * Math.pow(1 + t * 0.6, e.r * 0.45); // 高难度放大稀有物
function announce(S, html) { (S.bc = S.bc || []).push(html); } // 全服通告队列：橙色以上物品产出时推送，UI 渲染时弹横幅
function rollGear(S, t) { // 任意套装 / 部位 / 矿石 / 5 档品质；难度越高矿石与品质越好
  const sl = pick(Object.keys(SLOTS)), tier = Math.min(4, 1 + Math.floor(R() * (1 + t * 0.6))), k = sl + tier;
  const qw = GQ_LV1.map((a, i) => Math.max(0, a + (GQ_LV10[i] - a) * Math.min(1.8, t / 3)) * GQ_ORE[tier - 1][i]); const q = 1 + wpick([0, 1, 2, 3, 4], i => qw[i]);
  const g = { id: ++S.gearSeq, k, q, v: gearVal(k, q), set: pick(Object.keys(GEAR_SETS)) }; if (q >= 5) g.rule = pick(Object.keys(GEAR_RULES)); // v1006 传说法宝规则词条
  if (q >= 5) announce(S, `📢 全服通告：恭喜道友喜提【<span class="gq5">传说</span>】<span class="gq5">${gearItemName(k, g.set)}</span>！`);
  return g;
}
function lootRoll(S, t, dk) { LOOT = LOOT || lootTable(); const pool = LOOT.filter(x => !x.mj || dk === 'mijing'); const e = wpick(pool, x => lootW(x, t)); return e; }
const itemLabel = (st, k) => lootLabel(st, k);
const lootLabel = (st, k) => st === 'xianyu' ? '仙玉' : st === 'veins' ? (['💎小型灵脉', '💎中型灵脉', '💎巨型灵脉'][+k] || '💎灵脉') : st === 'maiPages' ? '🌀脉络残页' : st === 'wxFrag' ? wxFragName(k) : st === 'gear' ? (([gk, set, q]) => `${GQNAME[+q]}·${gearItemName(gk, set)}`)(k.split('|')) : st === 'petEggs' ? '灵宠蛋' : st === 'expBooks' ? EXP_BOOKS[k].name : st === 'skillBooks' ? SKILLS[k].name + '技能书' : st === 'elixirs' ? (potOf(k) ? QNAME[potOf(k).q] + potOf(k).name : k) : st === 'inv' ? (k === 'mai' ? '🌀开脉丹' : k === 'chestN' ? '🎀精致盲盒' : k === 'chestB' ? '🎲盲盒' : k === 'chestR' ? '🎁稀有宝箱' : k === 'chestA' ? '💎高级宝箱' : (([a, g]) => `${GRADES[+g]}${AN[a]}丹`)(k.split('_'))) : st === 'dishes' ? (dishOf(k) ? QNAME[dishOf(k).q] + dishOf(k).name : k) : st === 'zx' ? (DISHES[k] ? DISHES[k].name : k) : st === 'prey' ? PREY[k].name : st === 'eggs' ? EGGS[k].name : itemLabel0(st, k);
// —— 批量生成的简短事件（场景 × 对象 × 选项）——
const G_PLACES = ['山道上', '竹林里', '古渡口', '荒村里', '瀑布下', '断桥边', '集市角落', '古井旁', '松林中', '雪岭上', '沙丘间', '桃林里'];
const G_NPCS = [ // 名称 / 帮忙检定属性 / 帮忙文字
  ['采药老人', 'int', '帮他辨药'], ['落魄书生', 'int', '替他解题'], ['江湖郎中', 'vit', '帮他试药'], ['独臂剑客', 'str', '与他过招'], ['卖艺少女', 'agi', '帮她搭台'], ['游方道士', 'int', '听他论道'],
  ['猎户', 'agi', '帮他追猎'], ['小沙弥', 'def', '护送他'], ['说书人', 'int', '给他出题'], ['镖师', 'str', '帮他推车'], ['商队', 'def', '帮他们守夜'], ['受伤的修士', 'vit', '为他疗伤']];
const G_FINDS = [ // 发现物 / 掉落倾向 / 检定属性
  ['一株灵草', ['mats'], 'int'], ['一条矿脉', ['ores'], 'str'], ['一个兽窝', ['prey', 'food'], 'agi'], ['一个鸟巢', ['eggs'], 'agi'], ['一个遗落的包裹', null, 'int'],
  ['一具修士遗骸', ['pages', 'skillPages', 'expBooks'], 'int'], ['一处灵眼', ['ores', 'mats'], 'vit'], ['一只翻倒的药篓', ['elixirs', 'meds', 'inv'], 'int'], ['一座废弃丹炉', ['inv', 'elixirs'], 'int'], ['一件半埋的装备', ['gear'], 'str']];
const G_BOXES = [['一个朽木箱', 'str'], ['一个青铜匣', 'int'], ['一个玉盒', 'int'], ['一口石棺', 'str'], ['一个藤篓', 'agi'], ['一个铁皮柜', 'str'], ['一只古瓮', 'vit'], ['一个锦囊', 'agi'], ['一个沉船残箱', 'str'], ['一个佛龛暗格', 'int']];
const G_BOX_AT = ['瀑布后', '古树下', '废矿洞里', '荒坟旁', '崖壁上', '浅滩里', '神像后', '废营地里'];
const G_TRAPS = [ // 机关 / 两个检定属性 / 失败后果
  ['毒雾', 'vit', 'int', 'poison'], ['暗箭', 'agi', 'def', 'poison'], ['落石', 'agi', 'def', 'attr'], ['地刺', 'agi', 'def', 'bleed'], ['幻阵', 'int', 'vit', 'depress'], ['寒冰符', 'vit', 'def', 'attr'], ['雷符', 'agi', 'vit', 'attr'], ['捕兽夹', 'str', 'agi', 'bleed']];
const G_TRAP_AT = ['山路上', '石窟里', '古墓中', '林间', '桥上', '洞口'];
const G_RESTS = ['山洞', '凉亭', '废驿站', '古刹', '溪边', '猎人小屋'], G_REST_ADD = ['', '（有篝火）', '（有清泉）', '（有干草铺）', '（有前人留下的干粮）'];
G_PLACES.forEach((pl, i) => G_NPCS.forEach(([nm, a, act], j) => { ADV_EVENTS[`n${i}_${j}`] = { type: 'fortune', t: `${pl}遇到一位${nm}`, ch: [
  { l: act, a, f: async (X, ok) => ok ? await X.loot(1 + (R() < 0.3 ? 1 : 0), null) + '；' + X.xp(0.2) : X.say() },
  { l: '花钱买东西', cost: 0.35, f: async X => await X.loot(1, null, 1) },
  { l: '离开', f: X => X.say() }] }; }));
G_PLACES.forEach((pl, i) => G_FINDS.forEach(([nm, cats, a], j) => { ADV_EVENTS[`f${i}_${j}`] = { type: 'fortune', t: `${pl}发现${nm}`, ch: [
  { l: '拿走', f: async X => R() < 0.85 ? await X.loot(1, cats) : X.hurt(pick(['poison', 'bleed']), '') },
  { l: '仔细搜', a, f: async (X, ok) => ok ? await X.loot(2, cats) : X.say() },
  { l: '离开', f: X => X.say() }] }; }));
G_BOX_AT.forEach((at, i) => G_BOXES.forEach(([nm, a], j) => { ADV_EVENTS[`b${i}_${j}`] = { type: 'chest', t: `${at}有${nm}`, ch: [
  { l: '打开', f: async X => R() < 0.7 ? await X.loot(2, null) : R() < 0.5 ? X.hurt(pick(['poison', 'bleed']), '') : X.ambush(0, '宝箱怪！') },
  { l: '小心开', a, f: async (X, ok) => ok ? await X.loot(2, null, 1) + '；' + X.gold(0.2) : X.say() },
  { l: '离开', f: X => X.say() }] }; }));
G_TRAP_AT.forEach((at, i) => G_TRAPS.forEach(([nm, a1, a2, bad], j) => { const fail = X => bad === 'attr' ? X.loseAttr(1) : X.hurt(bad); ADV_EVENTS[`t${i}_${j}`] = { type: 'trap', t: `${at}触发了${nm}`, ch: [
  { l: `${AN[a1]}应对`, a: a1, f: async (X, ok) => ok ? (R() < 0.3 ? await X.loot(1, ['ores', 'mats']) : X.say()) : fail(X) },
  { l: `${AN[a2]}应对`, a: a2, f: (X, ok) => ok ? X.say() : fail(X) }] }; }));
G_RESTS.forEach((sp, i) => G_REST_ADD.forEach((ad, j) => { ADV_EVENTS[`r${i}_${j}`] = { type: 'rest', t: `前方有一处${sp}可以歇脚${ad}`, ch: [
  { l: '休息', f: X => X.heal(j === 2 ? 0.35 : 0.25) + (j === 1 && X.cure('depress') ? '；抑郁消除' : '') },
  { l: '搜索', f: async X => R() < 0.75 ? await X.loot(1, j === 4 ? ['food', 'eggs', 'dishes'] : null) : X.ambush(0, '有怪物！') },
  { l: '离开', f: X => X.say() }] }; }));
const HAND_EVENTS = Object.keys(ADV_EVENTS).filter(id => !/^[nfbtr]\d/.test(id));
const EV_BY_TYPE = {}; for (const id in ADV_EVENTS) (EV_BY_TYPE[ADV_EVENTS[id].type] = EV_BY_TYPE[ADV_EVENTS[id].type] || []).push(id);
const FIGHT_TEXT = ['前方传来低沉的吼声，', '草丛一阵晃动，', '一股腥风扑面而来，', '你刚转过山角，', '夜色中亮起一双幽绿的眼睛，', '地面微微震动，'];
function advNewEvent(S, run, forceFight, bump, text) {
  const last = run.step >= run.steps; let type = forceFight || last ? 'fight' : wpick(Object.keys(EV_TYPES), k => EV_TYPES[k].w);
  if (!forceFight && !last && S.race === 'traveler' && type !== 'fortune' && R() < 0.05) type = 'fortune'; // v1088 穿越者见多识广：奇遇概率 +5%
  if (type !== 'fight') { const t = tierIdx(run.dk), okT = id => !(ADV_EVENTS[id].min > t); let ids = EV_BY_TYPE[type].filter(id => okT(id) && !run.seen.includes(id)); const hand = ids.filter(id => HAND_EVENTS.includes(id)); if (hand.length && R() < 0.4) ids = hand; if (!ids.length) ids = Object.keys(ADV_EVENTS).filter(id => ADV_EVENTS[id].type !== 'trap' && okT(id) && !run.seen.includes(id)); const id = pick(ids.length ? ids : EV_BY_TYPE[type].filter(okT)); type = ADV_EVENTS[id].type; run.seen.push(id); run.ev = { type, id }; return; }
  const m = advMonster(S, run.dk, (bump || 0) + (last && !forceFight ? (run.dk === 'mijing' || run.dk.startsWith('wx_') ? 4 : 1) : 0)); run.ev = { type: 'fight', mon: m, text: text || null, boss: last && !forceFight };
}
// ======== v182 格子冒险：6×6 地图，上/下/左/右移动探索 ========
const ADV_GW = 6, ADV_GH = 6;
const ADV_MAP_SHAPES = { // v1151 异形地图（与服务端 advmap.js 同图）：X 虚空 / . 可行走 / S 起点
  easy: { s: [2, 5], r: ['XX..XX', 'X....X', 'XX..XX', 'X....X', '......', '..S...'] },
  mid: { s: [1, 5], r: ['.....X', '......', 'X....X', 'XX..XX', 'X....X', '.S..XX'] },
  hard: { s: [0, 5], r: ['.....X', 'X....X', '......', '......', '......', 'SX..X.'] },
  brutal: { s: [2, 5], r: ['XX.XXX', 'X....X', 'X....X', '.....X', '......', '..S...'] },
  hell: { s: [1, 5], r: ['XX.XXX', 'X..X.X', 'X....X', '......', '......', '.S....'] },
  abyss: { s: [0, 5], r: ['X...XX', '....XX', '....XX', '.....X', 'X....X', 'S....X'] },
  nightmare: { s: [2, 5], r: ['XX..XX', 'X....X', '..XX..', '..XX..', 'X....X', 'XXS..X'] },
  mijing: { s: [1, 5], r: ['X....X', 'X....X', 'XX.XXX', '.....X', '......', '.S...X'] }
};
function advShapeFor(dk) { return ADV_MAP_SHAPES[dk] || ADV_MAP_SHAPES.easy; }
function advGenGrid(dk) { // v1151 异形地图（与服务端同图）：虚空格不可站；事件格撒在可行走格上
  const shp = advShapeFor(dk || 'easy');
  const tiles = [], pos = [];
  for (let y = 0; y < ADV_GH; y++) { const row = []; for (let x = 0; x < ADV_GW; x++) {
    if (shp.r[y][x] === 'X') row.push({ t: 'void', seen: 1 });
    else { row.push({ t: 'empty', seen: 0 }); if (!(x === shp.s[0] && y === shp.s[1])) pos.push([x, y]); }
  } tiles.push(row); }
  const sx = shp.s[0], sy = shp.s[1];
  tiles[sy][sx] = { t: 'start', seen: 1 };
  const bag = ['fight', 'fight', 'fight', 'fight', 'fight', 'fortune', 'trap', 'rest', 'rest', 'gchest']; // v1154 事件袋（与服务端一致）
  for (let i = pos.length - 1; i > 0; i--) { const j = Math.floor(R() * (i + 1)); const tmp = pos[i]; pos[i] = pos[j]; pos[j] = tmp; }
  bag.forEach((t, i) => { const p = pos[i]; if (!p) return; tiles[p[1]][p[0]].t = t; });
  const _nowG = Date.now(); // v1154：其余格全是资源格（矿石/灵脉/草药丛，带存量与怪）
  pos.slice(bag.length).forEach(p => { Object.assign(tiles[p[1]][p[0]], advFreshResTileL(_nowG)); });
  return { w: ADV_GW, h: ADV_GH, tiles, px: sx, py: sy, ex: ADV_GW - 1, ey: 0, moves: 0 };
}
function advTileEvent(S, run, type) { // 在格子上生成指定类型的事件（复用事件库）
  if (type === 'fight') { const m = advMonster(S, run.dk, 0); run.ev = { type: 'fight', mon: m, text: null, boss: false }; return; }
  if (type === 'gchest' || type === 'gherb') { // v185 守宝：怪守着宝箱/草药，可潜行获取，被发现则战斗
    const m = advMonster(S, run.dk, 0);
    run.ev = { type: 'guarded', mon: m, loot: type === 'gchest' ? 'chest' : 'herb', text: type === 'gchest' ? '宝箱旁盘踞着一只守怪' : '灵草丛旁卧着一只守怪' };
    return;
  }
  const t = tierIdx(run.dk), okT = id => !(ADV_EVENTS[id].min > t);
  let ids = EV_BY_TYPE[type].filter(id => okT(id) && !run.seen.includes(id));
  const hand = ids.filter(id => HAND_EVENTS.includes(id)); if (hand.length && R() < 0.4) ids = hand;
  if (!ids.length) ids = Object.keys(ADV_EVENTS).filter(id => ADV_EVENTS[id].type !== 'trap' && okT(id) && !run.seen.includes(id));
  const id = pick(ids.length ? ids : EV_BY_TYPE[type].filter(okT));
  type = ADV_EVENTS[id].type; run.seen.push(id); run.ev = { type, id };
}
try { window.advTileEvent = advTileEvent; } catch(_) {} // v765 传送卷跨块调用
function sneakP(S, mon) { return clamp(0.2 + 0.4 * fightAttrs(S, false).agi / Math.max(1, mon.attrs.agi), 0.1, 0.9); } // v185 潜行成功率：敏捷相同 60%
function guardedLoot(S, run, loot) { // v185 守宝战利品（已发放，返回描述）
  const X = advCtx(S, run);
  if (loot === 'herb') { const hk = pick(['h_agi', 'h_str', 'h_def', 'h_vit', 'h_int']), n = 2 + Math.floor(R() * 3); return X.item('mats', hk, n) + '（悄悄采走了灵草）'; }
  let s = X.gain(0.7) + '（宝箱开启）';
  if (R() < 0.3) s += '；' + X.item('mats', X.lu(), 1) + '（箱底还藏着一份材料）';
  return s;
}
// v1125 资源格产出（与服务端同池同规：草药=5 种属性草等概率；矿石=铁475/铜285/银142/金48/灵气石35/下品15，权重千分）
const ADV_RES_HERBS = ['h_str', 'h_agi', 'h_def', 'h_vit', 'h_int'];
const ADV_RES_ORES = [['iron', 475], ['copper', 285], ['silver', 142], ['gold', 48], ['sp1', 35], ['sp2', 15]];
function advResOreKey() { let r = Math.random() * 1000; for (const [k, w] of ADV_RES_ORES) { r -= w; if (r < 0) return k; } return 'iron'; }
// ===== v1128 器具/灵物（与服务端 lw.js 同规；本地图、灵田、背包/锻造 UI 共用）=====
const TOOL_NAMES = { pick: ['普通矿镐', '法器矿镐', '仙品矿镐'], hoe: ['普通药锄', '法器药锄', '仙品药锄'] };
const TOOL_TIER_COLORS = ['#f2f2f2', '#ff9f43', '#ff5f57']; // 器具名按档位：普通白/法器橙/仙品红
const TOOL_LVL_COLORS = ['#f2f2f2', '#4ade80', '#6db3ff', '#22d3ee', '#c084fc', '#ff7eb6', '#ff9f43', '#ffd94d', '#e8f6ff', '#ff3b30']; // 等级数字按百级分段 0/100/.../900；1000 级七彩单独处理
const LW_GRADE_NAMES = ['地品灵物', '天品灵物', '仙品灵物'];
const LW_ELES = ['金', '木', '水', '火', '土']; // v1129 灵物五行（变异：金→雷/水→冰/木→风，与灵根共用 mutRootL）
const LW_ELE_COLORS = { '金': '#ffd94d', '木': '#6bcb77', '水': '#4d96ff', '火': '#ff5f57', '土': '#d29a5b', '雷': '#b77cff', '冰': '#7fe7f2', '风': '#8ef0c8', '光': '#ffe97a', '暗': '#7c6fd0', '毒': '#a3e635' };
function rollLwEleL() { return mutRootL(LW_ELES[(Math.random() * LW_ELES.length) | 0]); } // 定行：五选一 + 5% 变异
const LW_SEED_NAMES = ['地品灵物种子', '天品灵物种子', '仙品灵物种子'];
const GRADE_COLORS = ['#6db3ff', '#ff7eb6', '#ff9f43']; // 资源等级色（地图显示）：一级蓝/二级粉红/三级橙
function toolNeedL(lvl) { return 10 * (lvl + 1); }
function toolCritMultL(tool) { if (!tool) return 1; const p = Math.min(1, (tool.lvl | 0) * 0.001); return Math.random() < p ? 1 + Math.floor(Math.random() * 10) : 1; }
function toolUseL(tool) { tool.dur = (tool.dur | 0) - 1; tool.uses = (tool.uses | 0) + 1; while (tool.uses >= toolNeedL(tool.lvl | 0)) { tool.uses -= toolNeedL(tool.lvl | 0); tool.lvl = (tool.lvl | 0) + 1; } return tool.dur <= 0; }
const LW_EPOCH_L = Date.UTC(2026, 9, 30, 0, 0, 0); // 灵物年份阶梯起点（与服务端一致）
function lwYearCapL(now) { const n = Math.floor(((now || Date.now()) - LW_EPOCH_L) / (182.5 * 24 * 3600 * 1000)); if (n <= 0) return 10000; if (n === 1) return 100000; return Math.min(10000000, 1000000 * (n - 1)); }
function rollLwYearsL() { return 1 + Math.floor(Math.random() * lwYearCapL()); }
function herbBonusL(grade) { const out = { lw: [], seeds: { 1: 0, 2: 0, 3: 0 }, dew: { 1: 0, 2: 0, 3: 0 } }; for (let g = 1; g <= grade; g++) { const st = grade - g; if (Math.random() < 0.05 + 0.05 * st) out.lw.push({ g, y: rollLwYearsL(), e: rollLwEleL() }); if (Math.random() < 0.005 + 0.005 * st) out.seeds[g] += 1; if (Math.random() < 0.05 + 0.05 * st) out.dew[g] += 1; } return out; } // v1130 种子不带行（收割才定行），灵物带行
function veinStoneL(grade) { if (grade >= 3) { const x = Math.random(); return x < 0.45 ? 'sp4' : x < 0.8 ? 'sp5' : 'xy'; } const pool = grade === 2 ? ['sp3', 'sp4', 'sp5'] : ['sp1', 'sp2', 'sp3']; return pool[Math.floor(Math.random() * 3)]; }
function rollResGradeL() { const r = Math.random(); return r < 0.7 ? 1 : r < 0.9 ? 2 : 3; }
function toolGateL(S, kind, grade) { // 采集门槛：草药用药锄、矿石/灵脉用矿镐；矿石任意档，草药/灵脉需器具档 ≥ 资源等级
  const which = kind === 'herb' ? 'hoe' : 'pick';
  const tool = S.tools && S.tools[which];
  if (!tool) return { err: which === 'hoe' ? '没有药锄，采不了草药（商店有售）' : '没有矿镐，采不了（商店有售）', which };
  if (kind !== 'ore' && (tool.tier | 0) + 1 < (grade || 1)) return { err: (which === 'hoe' ? '药锄' : '矿镐') + '档位不足', which };
  return { tool, which };
}
// v1128 资源格产出（本地图；调用前先过 toolGateL）：属性草 5×等级株、灵脉按格档位出石，器具暴击乘倍，附加掷灵物/种子/凝露
function advResGrant(S, run, kind, grade) {
  const X = advCtx(S, run);
  grade = grade || 1;
  const which = kind === 'herb' ? 'hoe' : 'pick';
  const tool = S.tools && S.tools[which];
  const crit = toolCritMultL(tool);
  const parts = [];
  if (crit > 1) parts.push(`<b class="y">💥 暴击×${crit}</b>`);
  if (kind === 'herb') {
    const cnt = {}; const n = 5 * grade * crit;
    for (let i = 0; i < n; i++) { const k = ADV_RES_HERBS[Math.floor(Math.random() * ADV_RES_HERBS.length)]; cnt[k] = (cnt[k] || 0) + 1; }
    for (const k in cnt) parts.push(X.item('mats', k, cnt[k]));
    const b = herbBonusL(grade);
    for (const it of b.lw) { if (!Array.isArray(S.lingwu)) S.lingwu = []; S.lingwu.push(it); parts.push(`获得 <span class="y">${LW_GRADE_NAMES[it.g - 1]}·${it.e}（${it.y} 年）</span>`); }
    for (let g = 1; g <= 3; g++) { if (b.seeds[g] > 0) { if (!S.lwseeds || typeof S.lwseeds !== 'object') S.lwseeds = { 1: 0, 2: 0, 3: 0 }; S.lwseeds[g] = (S.lwseeds[g] | 0) + b.seeds[g]; parts.push(`获得 <span class="y">${LW_SEED_NAMES[g - 1]}×${b.seeds[g]}</span>`); } }
    for (let g = 1; g <= 3; g++) { if (b.dew[g] > 0) parts.push(X.item('mats', 'dw' + g, b.dew[g])); }
  } else if (kind === 'ore') {
    const cnt = {};
    for (let i = 0; i < crit; i++) { const k = advResOreKey(); cnt[k] = (cnt[k] || 0) + 1; }
    for (const k in cnt) parts.push(X.item('ores', k, cnt[k]));
  } else {
    const k = veinStoneL(grade);
    if (k === 'xy') { S.xianyu = (S.xianyu | 0) + crit; if (run && run.rew) run.rew.items['xianyu:xianyu'] = (run.rew.items['xianyu:xianyu'] || 0) + crit; parts.push(`获得 <span class="y">仙玉×${crit}</span>`); }
    else parts.push(X.item('ores', k, crit));
  }
  if (tool) { const _tn = TOOL_NAMES[which][tool.tier | 0]; if (toolUseL(tool)) { S.tools[which] = null; parts.push(`<span class="r">${_tn}持久耗尽，碎了</span>`); } }
  return parts.join('；');
}
// ===== v1154 资源格（本地图镜像，与服务端同规）=====
function advTierKeyL() { if (R() < 0.6) return 'w'; return R() < 0.75 ? 'm' : 's'; } // 弱60/中30/强10（与服务端同规）
function advFreshResTileL(now) {
  const r = R(); const kind = r < 0.4 ? 'herb' : r < 0.8 ? 'ore' : 'vein';
  const t = { t: kind, lv: kind === 'ore' ? 1 : rollResGradeL(), amt: 1 + Math.floor(R() * 3), mons: { w: 0, m: 0, s: 0 }, resAt: now, monAt: now };
  if (R() < 0.3) t.mons[advTierKeyL()]++;
  return t;
}
function advResSettleGrid(run) {
  if (!run || !run.grid) return;
  const now = Date.now();
  for (const row of run.grid.tiles) for (const t of row) {
    if (t.t !== 'herb' && t.t !== 'ore' && t.t !== 'vein') continue;
    if (!t.mons) t.mons = { w: 0, m: 0, s: 0 };
    if (!t.resAt) t.resAt = now;
    if (!t.monAt) t.monAt = now;
    const iv = t.t === 'ore' ? 60000 : [60000, 600000, 1800000][(t.lv | 0) - 1] || 60000;
    const units = Math.floor((now - t.resAt) / iv);
    if (units > 0) { t.amt = (t.amt | 0) + units; t.resAt += units * iv; }
    let ticks = Math.floor((now - t.monAt) / 600000);
    if (ticks > 0) { if (ticks > 200) t.monAt = now; else { for (let i = 0; i < ticks; i++) { const tot = (t.mons.w | 0) + (t.mons.m | 0) + (t.mons.s | 0); if (tot < 5 && R() < 0.2) t.mons[advTierKeyL()]++; } t.monAt += ticks * 600000; } }
  }
}
function advLocalGather(S, run) { // 本地图手采：门槛 → 惊扰(10%) → 扣 1 份发放
  const g = run.grid, t = g.tiles[g.py][g.px];
  advResSettleGrid(run);
  if (!t || (t.t !== 'herb' && t.t !== 'ore' && t.t !== 'vein')) return { err: '这里没有可采的资源' };
  if ((t.amt | 0) <= 0) return { err: '这格的资源还没长出来' };
  const gate = toolGateL(S, t.t, t.lv || 1);
  if (gate.err) return { err: gate.err };
  const tot = (t.mons.w | 0) + (t.mons.m | 0) + (t.mons.s | 0);
  if (tot > 0 && !(Number(S.stealthUntil || 0) > Date.now()) && R() < 0.10) { // v1162 隐身符：隐身中不惊扰
    let r = R() * tot, tier = 's';
    for (const k of ['w', 'm', 's']) { r -= (t.mons[k] | 0); if (r < 0) { tier = k; break; } }
    return { disturbed: tier };
  }
  t.amt--;
  return { msg: advResGrant(S, run, t.t, t.lv || 1) };
}
function advMonTileEv(S, run, tier) { // 资源格怪物战斗事件：弱=属性×0.7；强=rank+1 且属性×1.3（rollRank 无下限钳制，弱档不降 rank）
  const mon = advMonster(S, run.dk, tier === 's' ? 1 : 0);
  const mult = tier === 'w' ? 0.7 : tier === 's' ? 1.3 : 1;
  if (mult !== 1) ATTRS.forEach(k => mon.attrs[k] = Math.max(1, Math.round(mon.attrs[k] * mult)));
  return { type: 'fight', mon, text: tier === 'w' ? '一只弱怪' : tier === 's' ? '一只强怪' : '一只怪物', monTile: { tier, x: run.grid.px, y: run.grid.py } };
}
Object.assign(C, { TOOL_NAMES, TOOL_TIER_COLORS, TOOL_LVL_COLORS, LW_GRADE_NAMES, LW_SEED_NAMES, GRADE_COLORS, toolNeedL, toolCritMultL, toolUseL, lwYearCapL, rollLwYearsL, herbBonusL, veinStoneL, rollResGradeL, toolGateL, LW_ELES, LW_ELE_COLORS, rollLwEleL, rootBaseL, hasRootEleL, eleFactorL, eleNoteL, mutRootL, tryAwakenRoot, tryComprehendRoot, HERB_ELE, herbEatenToday, eatHerb, danDuCap, toxImmune, tryToxRoot, addDanDu, toxEff, tryToxDan, advFreshResTileL, advResSettleGrid, advLocalGather, advMonTileEv, afkHourly }); // v1129 五行导出；v1154 资源格导出；v1161 afkHourly 导出（供 main 的 tick 经 C 调用）
function advMove(S, dir) { // 格子移动：up/down/left/right（v184：事件未解决也可走开，事件留在格子上）
  const run = S.run; if (!run || !run.grid || S.dead) return null;
  advResSettleGrid(run); // v1154 资源格懒结算
  const g = run.grid, d = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] }[dir];
  if (!d) return { err: 'bad' };
  const nx = g.px + d[0], ny = g.py + d[1];
  if (nx < 0 || ny < 0 || nx >= g.w || ny >= g.h) return { err: 'edge' };
  if (g.tiles[ny][nx].t === 'void') return { err: 'void' }; // v1151 虚空格不可站
  g.px = nx; g.py = ny; g.moves++;
  const t = g.tiles[ny][nx];
  run.ev = null;
  if (t.t === 'exit' && !t.done) { // 终点守关 BOSS（存格子上，走开再回来还是同一只）
    if (!t.ev) { const m = advMonster(S, run.dk, (run.dk === 'mijing' || run.dk.startsWith('wx_')) ? 4 : 1); t.ev = { type: 'fight', mon: m, boss: true, exitBoss: true, text: '终点守关' }; run.evCount = (run.evCount | 0) + 1; }
    run.ev = t.ev; return { moved: true, ev: run.ev };
  }
  if (t.ev && !t.evDone) { run.ev = t.ev; return { moved: true, ev: run.ev }; } // 回到未解决的事件格
  if (!t.seen && t.t !== 'empty' && t.t !== 'start' && t.t !== 'herb' && t.t !== 'ore' && t.t !== 'vein' && t.t !== 'rherb' && t.t !== 'rore' && t.t !== 'rvein') { t.seen = 1; run.evCount = (run.evCount | 0) + 1; advTileEvent(S, run, t.t); t.ev = run.ev; return { moved: true, ev: run.ev }; } // v1154 资源格不触发事件（站在格上用按钮采集/攻击）
  t.seen = 1; return { moved: true };
}
function advRetreat(S) { const run = S.run; if (!run || !run.grid) return null; return { lines: ['撤退'], end: advEnd(S, 'retreat') }; }
// ======== v971 全服共享冒险地图 ========
// 共享地图：固定布局，tile 状态全服共享，先到先得。未登录时走本地随机地图。
async function advSharedInit(S) {
  if (!MHXY.loggedIn || !MHXY.loggedIn()) return false;
  const dk = (S.run && S.run.dk) || 'easy';
  try {
    var hb = await MHXY.api('/api/advmap/heartbeat?dk=' + encodeURIComponent(dk), { method: 'POST', body: {} });
    if (!hb.ok || !hb.json || !hb.json.ok) return false;
    var st = await MHXY.api('/api/advmap/state?dk=' + encodeURIComponent(dk));
    if (!st.ok || !st.json || !st.json.ok) return false;
    S.run.shared = {
      dk: dk,
      tiles: st.json.tiles,           // 6x6 [{t, state, respawn_in, res}]
      players: st.json.players || [], // 其他玩家 [{username, player_no, x, y}]
      arrays: st.json.arrays || [],   // v1125 采集阵 [{x, y, username, mine, fueled, h?, o?, fuel_ms?}]
      on: true
    };
    // 同步本地位置到服务端位置
    if (S.run.grid && st.json.my_pos) { S.run.grid.px = st.json.my_pos.x; S.run.grid.py = st.json.my_pos.y; }
    // v971 共享模式：本地 tile 类型以服务端为准（事件触发用）
    if (S.run.grid && S.run.grid.tiles) {
      for (let _y = 0; _y < 6; _y++) for (let _x = 0; _x < 6; _x++) {
        if (st.json.tiles[_y] && st.json.tiles[_y][_x]) {
          S.run.grid.tiles[_y][_x].t = st.json.tiles[_y][_x].t;
        }
      }
    }
    advSharedPoll(S);
    return true;
  } catch (_) { return false; }
}
function advSharedStop() {
  if (window._advPoll) { clearInterval(window._advPoll); window._advPoll = null; }
  try {
    if (MHXY.loggedIn && MHXY.loggedIn()) {
      const dk = (S.run && S.run.shared && S.run.shared.dk) || 'easy';
      MHXY.api('/api/advmap/leave?dk=' + encodeURIComponent(dk), { method: 'POST', body: {} });
    }
  } catch (_) {}
}
function advSharedPoll(S) {
  if (window._advPoll) clearInterval(window._advPoll);
  window._advPoll = setInterval(async function() {
    try {
      if (!S.run || !S.run.shared || !S.run.shared.on) { clearInterval(window._advPoll); window._advPoll = null; return; }
      const dk = S.run.shared.dk || 'easy';
      var st = await MHXY.api('/api/advmap/state?dk=' + encodeURIComponent(dk));
      if (st.ok && st.json && st.json.ok) {
        S.run.shared.tiles = st.json.tiles;
        S.run.shared.players = st.json.players || [];
        S.run.shared.arrays = st.json.arrays || []; // v1125 采集阵同步
        // v971 轮询时也同步 tile 类型
        if (S.run.grid && S.run.grid.tiles) {
          for (let _y = 0; _y < 6; _y++) for (let _x = 0; _x < 6; _x++) {
            if (st.json.tiles[_y] && st.json.tiles[_y][_x]) {
              S.run.grid.tiles[_y][_x].t = st.json.tiles[_y][_x].t;
            }
          }
        }
        try { if (S.run.grid) advSharedHeartbeat(S.run.grid.px, S.run.grid.py); } catch (_) {} // v1168 轮询顺带心跳保活 DO 玩家记录（5 分钟 TTL），防站太久记录过期、战斗格 claim not_there
        // 如果冒险面板开着，刷新显示
        if (typeof sheetRun === 'function' && S.run && S.run.grid) {
          try { sheetRun(); } catch (_) {}
        }
      }
    } catch (_) {}
  }, 5000);
}
// ======== v1125 冒险图资源与采集阵（共享图） ========
async function advSharedRefresh() {
  try {
    if (!S.run || !S.run.shared || !S.run.shared.on) return;
    const dk = S.run.shared.dk || 'easy';
    const st = await MHXY.api('/api/advmap/state?dk=' + encodeURIComponent(dk));
    if (st.ok && st.json && st.json.ok) {
      S.run.shared.tiles = st.json.tiles;
      S.run.shared.players = st.json.players || [];
      S.run.shared.arrays = st.json.arrays || [];
      if (S.run.grid && S.run.grid.tiles) {
        for (let _y = 0; _y < 6; _y++) for (let _x = 0; _x < 6; _x++) {
          if (st.json.tiles[_y] && st.json.tiles[_y][_x]) S.run.grid.tiles[_y][_x].t = st.json.tiles[_y][_x].t;
        }
      }
    }
  } catch (_) {}
}
function advApplyGains(j) { // 把服务端 gains 同步进本地存档（与 collectArray 同口径）
  const got = [];
  for (const gg of (j.gains || [])) {
    if (gg.st === 'lw') { if (!Array.isArray(S.lingwu)) S.lingwu = []; S.lingwu.push({ g: gg.g | 0, y: gg.y | 0, e: gg.e || C.rollLwEleL() }); got.push(`${C.LW_GRADE_NAMES[(gg.g | 0) - 1] || '灵物'}·${gg.e || ''}（${gg.y}年）`); continue; } // v1129 灵物带五行
    if (gg.st === 'lwseeds') { if (!S.lwseeds || typeof S.lwseeds !== 'object') S.lwseeds = { 1: 0, 2: 0, 3: 0 }; const _gk = String(gg.k).split('_')[0]; S.lwseeds[_gk] = (S.lwseeds[_gk] | 0) + (gg.n | 0); got.push(`${C.LW_SEED_NAMES[(+_gk || 1) - 1]}×${gg.n}`); continue; } // v1130 种子品级键
    if (gg.st === 'xianyu') { S.xianyu = (S.xianyu | 0) + (gg.n | 0); got.push(`仙玉×${gg.n}`); continue; }
    if (!S[gg.st] || (gg.st === 'veins' && !Array.isArray(S[gg.st]))) S[gg.st] = gg.st === 'veins' ? [0, 0, 0] : {};
    S[gg.st][gg.k] = (S[gg.st][gg.k] | 0) + (gg.n | 0);
    got.push(`${(typeof lootLabel === 'function' ? lootLabel(gg.st, gg.k) : gg.k)}×${gg.n}`);
  }
  if (typeof j.rev === 'number' && window.MHXY) MHXY.setBaseRev(j.rev);
  return got;
}
window.advGatherRes = async function() {
  try {
    if (!S.run || !S.run.shared || !S.run.shared.on || !S.run.grid) return;
    const dk = S.run.shared.dk || S.run.dk, gx = S.run.grid.px, gy = S.run.grid.py;
    let resp = await MHXY.api('/api/roll/adv_gather', { method: 'POST', body: { dk, x: gx, y: gy } });
    let j = resp && resp.json;
    if (!resp.ok && j && j.error === 'not_there') {
      // v1170 位置记录过期：补心跳后重试一次采集（与 claim/monkills 同一自愈口径）
      try { advSharedHeartbeat(gx, gy); } catch (_) {}
      await new Promise(res => setTimeout(res, 600));
      resp = await MHXY.api('/api/roll/adv_gather', { method: 'POST', body: { dk, x: gx, y: gy } });
      j = resp && resp.json;
    }
    if (resp.ok && j && j.ok && j.disturbed) { // v1154 惊扰：资源未采到，先打怪
      log('bad', '😱 采集时惊扰了怪物，它扑了过来！');
      S.run.ev = C.advMonTileEv(S, S.run, j.disturbed);
      try { sheetRun(); } catch (_) {}
      return;
    }
    if (resp.ok && j && j.ok) {
      const got = advApplyGains(j);
      if (j.which) { if (!S.tools) S.tools = { pick: null, hoe: null }; S.tools[j.which] = j.tool || null; } // v1128 器具状态以服务端为准
      try { const _t = S.run.shared.tiles[gy] && S.run.shared.tiles[gy][gx]; if (_t) _t.amt = Math.max(0, (_t.amt | 0) - 1); } catch (_) {} // v1154 本地镜像存量 -1
      if (got.length) log('good', `✨ 采集${(j.crit | 0) > 1 ? `（<b class="y">💥暴击×${j.crit}</b>）` : ''}：${got.join('、')}${j.broke ? `；<span class="r">${j.which === 'hoe' ? '药锄' : '矿镐'}持久耗尽，碎了</span>` : ''}`);
      commit();
    } else {
      const _e = (j || {}).error, _wn = (j || {}).which === 'hoe' ? '药锄' : '矿镐';
      log('bad', _e === 'no_res' ? '资源刚被采走了' : _e === 'not_there' ? '位置已变化，采不到' : _e === 'no_tool' ? `没有${_wn}，采不了（商会有售）` : _e === 'tool_broke' ? `${_wn}持久耗尽了` : _e === 'tool_tier' ? `${_wn}档位不足（资源等级高于器具档）` : '采集失败');
      await advSharedRefresh();
    }
  } catch (e) {}
  try { sheetRun(); } catch (_) {}
};
window.advLocalGatherUI = function() { // v1154 本地图当前格采集
  try {
    if (!S.run || !S.run.grid) return;
    const r = C.advLocalGather(S, S.run);
    if (!r) return;
    if (r.err) log('bad', r.err);
    else if (r.disturbed) { log('bad', '😱 采集时惊扰了怪物，它扑了过来！'); S.run.ev = C.advMonTileEv(S, S.run, r.disturbed); }
    else if (r.msg) log('good', `✨ 采集：${r.msg}`);
    afterAct(); commit(); sheetRun();
  } catch (e) {}
};
window.advAttackMon = function(tier) { // v1154 主动攻击当前格指定档位的怪
  try {
    if (!S.run || !S.run.grid || S.run.ev) return;
    S.run.ev = C.advMonTileEv(S, S.run, tier);
    sheetRun();
  } catch (e) {}
};
async function advMonKillShared(mt) { // v1154 共享图击杀登记（服务端减一只）
  try {
    const dk = (S.run.shared && S.run.shared.dk) || S.run.dk;
    const _post = () => MHXY.api('/api/advmap/' + 'monkill' + '?dk=' + encodeURIComponent(dk), { method: 'POST', body: { x: mt.x, y: mt.y, tier: mt.tier } });
    let r = await _post();
    if (!(r && r.ok) && r && r.json && r.json.error === 'not_there' && S.run && S.run.grid) {
      // v1170 DO 玩家记录过期/位置漂移时 monkill 报 not_there，旧版静默吞掉→打赢了怪也不消失（Ye 报）：补心跳后重试一次
      try { advSharedHeartbeat(S.run.grid.px, S.run.grid.py); } catch (_) {}
      await new Promise(res => setTimeout(res, 600));
      r = await _post();
    }
    if (!(r && r.ok && r.json && r.json.ok)) { try { log('bad', '⚔️ 击杀未登记上（怪物还在）'); } catch (_) {} }
    await advSharedRefresh();
  } catch (_) {}
}
window.advPlaceArray = async function() {
  try {
    if (!S.run || !S.run.shared || !S.run.shared.on || !S.run.grid) return;
    const fm = S.formations || {};
    const owned = [1, 2, 3].filter(t => ((t === 1 ? fm.f_gather : t === 2 ? fm.f_gather2 : fm.f_gather3) | 0) > 0);
    if (owned.length > 1) { // v1128 多档可选时先选档
      openSheet(`<h2>🧭 选择采集阵档位</h2><div class="hint">阵档决定能收的资源等级（小型收一级、中型收到二级、大型全收）；阵不收矿石。</div>` + owned.map(t => `<div class="row"><div class="lab"><b style="color:${C.GRADE_COLORS[t - 1]}">${['', '小型', '中型', '大型'][t]}采集阵</b><small>拥有 ${(t === 1 ? fm.f_gather : t === 2 ? fm.f_gather2 : fm.f_gather3) | 0}</small></div><button class="btn gold" onclick="window.advPlaceArrayTier(${t})">布此阵</button></div>`).join('') + `<button class="btn full" data-a2back>返回地图</button>`);
      return;
    }
    await window.advPlaceArrayTier(owned[0] || 1);
  } catch (e) {}
};
window.advPlaceArrayTier = async function(tier) {
  try {
    if (!S.run || !S.run.shared || !S.run.shared.on || !S.run.grid) return;
    const dk = S.run.shared.dk || S.run.dk, gx = S.run.grid.px, gy = S.run.grid.py;
    const resp = await MHXY.api('/api/array2/place', { method: 'POST', body: { dk, x: gx, y: gy, tier } });
    const j = resp && resp.json;
    if (resp.ok && j && j.ok) {
      log('good', `🧭 采集阵已布于(${gx},${gy})，加灵石后自动采集这格刷新的资源`);
    } else {
      const _e = (j || {}).error;
      log('bad', _e === 'no_formation' ? '没有采集阵（阵法台用阵棋合成）' : _e === 'array_limit' ? '采集阵已布满（不超过持有数）' : _e === 'already_in_map' ? '这张图已布过一阵' : _e === 'not_empty_tile' || _e === 'not_resource_tile' ? '只能布在资源格上' : _e === 'tile_taken' ? '这格已有采集阵' : '布阵失败');
    }
  } catch (e) {}
  await advSharedRefresh();
  try { sheetRun(); } catch (_) {}
};
window.advArrayPanel = function() {
  try {
    if (!S.run || !S.run.shared) return;
    const a = (S.run.shared.arrays || []).find(v => v.mine);
    if (!a) { log('bad', '这张图上没有你的采集阵'); return; }
    const fuelH = a.fuel_ms ? (a.fuel_ms / 3600000).toFixed(1) : '0';
    const stoneCount = (S.ores && S.ores.sp4) | 0;
    const inv = a.inv || { mats: {}, ores: {}, xy: 0, lw: [], seeds: {} };
    const _sum = o => Object.values(o || {}).reduce((s, v) => s + (v | 0), 0);
    const invTxt = `材料 ×${_sum(inv.mats) + _sum(inv.ores)} · 灵物 ×${(inv.lw || []).length} · 种子 ×${_sum(inv.seeds)}${(inv.xy | 0) > 0 ? ` · 仙玉 ×${inv.xy}` : ''}`;
    const tierNm = ['', '小型', '中型', '大型'][Math.min(3, Math.max(1, a.tier | 0 || 1))];
    openSheet(`<h2>🧭 <span style="color:${C.GRADE_COLORS[(a.tier | 0 || 1) - 1]}">${tierNm}采集阵</span> (${a.x},${a.y})</h2><div class="hint">燃料剩余：<b class="y">${fuelH}</b> 小时${a.fueled ? '' : '（已停工，加灵石恢复）'}<br>你的上品灵石：${stoneCount} 颗（1 颗 = 1 小时）<br>阵内库存：${invTxt}<br>阵只收草药与灵脉（按阵档），矿石留格上等手挖；阵收取无暴击。</div><div class="grid2"><button class="btn gold" data-a2fuel>💎 加灵石</button><button class="btn" data-a2collect>📦 收取</button><button class="btn danger" data-a2remove>💥 拆除</button><button class="btn" data-a2back>返回地图</button></div>`);
  } catch (e) {}
};
window.advArrayFuel = async function() {
  try {
    const dk = (S.run.shared && S.run.shared.dk) || S.run.dk;
    const resp = await MHXY.api('/api/array2/fuel', { method: 'POST', body: { dk } });
    const j = resp && resp.json;
    if (resp.ok && j && j.ok) {
      S.ores = S.ores || {}; S.ores.sp4 = Math.max(0, (S.ores.sp4 | 0) - 1);
      if (typeof j.rev === 'number') MHXY.setBaseRev(j.rev);
      log('good', '💎 采集阵燃料 +1 小时');
      commit();
    } else {
      log('bad', (j || {}).error === 'no_sp4' ? '没有上品灵石' : (j || {}).error === 'no_array' ? '这张图上没有你的采集阵' : '加灵石失败');
    }
  } catch (e) {}
  await advSharedRefresh();
  window.advArrayPanel();
};
window.advArrayTake = async function(remove) {
  try {
    if (remove && !confirm('确定拆除这张图的采集阵？库存将自动收取。')) return;
    const dk = (S.run.shared && S.run.shared.dk) || S.run.dk;
    const resp = await MHXY.api(remove ? '/api/array2/remove' : '/api/array2/collect', { method: 'POST', body: { dk } });
    const j = resp && resp.json;
    if (resp.ok && j && j.ok) {
      const got = advApplyGains(j);
      if (got.length) log('good', `📦 从采集阵收取：${got.join('、')}`);
      else log('sys', '阵内空空如也');
      if (remove) log('good', '💥 采集阵已拆除，库存已收取');
      commit();
    } else {
      log('bad', (j || {}).error === 'no_array' ? '这张图上没有你的采集阵' : '收取失败');
    }
  } catch (e) {}
  await advSharedRefresh();
  if (remove) { try { sheetRun(); } catch (_) {} } else window.advArrayPanel();
};
// 移动时同步位置到服务端（心跳）
function advSharedHeartbeat(x, y) {
  try {
    if (MHXY.loggedIn && MHXY.loggedIn() && S.run && S.run.shared && S.run.shared.on) {
      const dk = S.run.shared.dk || 'easy';
      MHXY.api('/api/advmap/heartbeat?dk=' + encodeURIComponent(dk), { method: 'POST', body: { x: x, y: y } });
    }
  } catch (_) {}
}
function advStart(S, dk) {
  const diff = DIFFS[dk]; if (!diff || S.dead || S.run || S.stamina < diff.cost) return null;
  const isWx = dk.startsWith('wx_');
  if (isWx) { // 五行：仙人以上可进，10仙力+5体力，按境界每日限次；v874 需对应法则圆满
    if ((S.realm | 0) < 8 || (S.mana | 0) < WX_COST_XIAN) return null;
    const _wxEl = (wxByK(dk.slice(3)) || {}).name;
    if (!_wxEl || (((S.faZe || {})[_wxEl] | 0) < 100)) return null;
    const t = todayStr(); if (S.wxD !== t) { S.wxD = t; S.wxN = 0; }
    if ((S.wxN | 0) >= (WX_DAILY[S.realm | 0] || 0)) return null;
  }
  if (dk === 'mijing') { const t = todayStr(); if (S.mijingD !== t) { S.mijingD = t; S.mijingN = 0; } if ((S.mijingN | 0) >= MIJING_DAILY) return null; }
  spend(S, diff.cost); if (S.dead) return null; S.stats.adv++; S.stats.advTotal = (S.stats.advTotal || 0) + 1; hungerDown(S, K.HUNGER_FIGHT, 1);
  if (dk === 'mijing') S.mijingN = (S.mijingN | 0) + 1;
  if (isWx) { S.mana = Math.max(0, (S.mana | 0) - WX_COST_XIAN); S.wxN = (S.wxN | 0) + 1; }
  const steps = dk === 'mijing' ? 10 + Math.floor(R() * 6) : ADV_STEPS[dk]; // 秘境：每次10-15步随机（v182 格子模式仅作展示）
  S.run = { dk, step: 1, steps, seen: [], rew: { pts: 0, gains: {}, gold: 0, xp: 0, items: {}, lvUp: 0, wins: 0 }, last: [], grid: advGenGrid(dk), evCount: 0, ev: null }; // v182 格子冒险：起点安全，无初始事件
  return S.run;
}
function advChoices(S) { // 当前可选项（含成功率提示）
  const run = S.run; if (!run) return []; const ev = run.ev;
  if (ev.type === 'fight') return [{ l: '战斗', hint: '' }, { l: '逃跑', hint: `敏捷 ${pct(fleeP(S, ev.mon))}` }];
  if (ev.type === 'guarded') return [{ l: '🤫 悄悄获取', hint: `敏捷 ${pct(sneakP(S, ev.mon))}` }, { l: '⚔️ 斩杀守怪', hint: '' }]; // v185 守宝：潜行或开打
  const E = ADV_EVENTS[ev.id], uGold = advUnitGold(run.dk);
  return E.ch.map(c => { const o = { l: c.l, hint: '' };
    if (c.a) o.hint = `${AN[c.a]} ${pct(advCheckP(S, run.dk, c.a))}`;
    if (c.cost) { const g = Math.max(1, Math.round(uGold * c.cost)); o.hint = `${g} 金元`; o.dis = S.gold < g; }
    if (c.need) { o.hint = `需 ${itemLabel(c.need[0], c.need[1])}`; o.dis = !((S[c.need[0]] || {})[c.need[1]] >= c.need[2]); }
    return o; }).concat(ev.type === 'trap' ? [] : [{ l: '撤退', hint: '结束冒险', retreat: true }]);
}
const advUnitGold = dk => (DIFFS[dk].gold[0] + DIFFS[dk].gold[1]) / 2;
function advCtx(S, run, lines) { // 事件结果工具
  const diff = DIFFS[run.dk], t = tierIdx(run.dk), rw = run.rew, avgPts = (diff.win[0] + diff.win[1]) / 2, rf = ADV_RF[run.dk];
  const addItem = (st, k, n) => { S[st] = S[st] || {}; S[st][k] = (S[st][k] || 0) + n; const key = st + ':' + k; rw.items[key] = (rw.items[key] || 0) + n; };
  const X = { S, run, diff, t,
    say: () => '无事发生',
    lu: () => 'dw' + Math.min(4, 1 + Math.floor(t / 2) + (R() < 0.2 ? 1 : 0)), sp: () => 'sp' + Math.min(4, 1 + Math.floor(t / 2) + (R() < 0.2 ? 1 : 0)),
    gold: u => { const g = Math.max(1, Math.round(advUnitGold(run.dk) * u * rf * rnd(0.85, 1.15) * luck(S))); S.gold += g; rw.gold += g; return `金元 <span class="y">+${g}</span>`; },
    xp: u => { return ''; }, // v62 冒险不再奖励仙力/法力/经验
    pts: u => { const n = randRound(avgPts * u * rf * luck(S)); if (!n) return ''; const g = randomGains(n); if (g.vit) delete g.vit; for (const a in g) { S.attrs[a] += g[a]; rw.gains[a] = (rw.gains[a] || 0) + g[a]; } rw.pts += n; const _keys = Object.keys(g); if (!_keys.length) return ''; return `<span class="g">${_keys.map(a => AN[a] + '+' + g[a]).join(' ')}</span>`; },
    gain: u => { const p = X.pts(u), g = X.gold(u); return p ? p + '，' + g : g; },
    attr: (a, n) => { S.attrs[a] += n; rw.gains[a] = (rw.gains[a] || 0) + n; rw.pts += n; return `${AN[a]} <span class="g">+${n}</span>`; },
    item: (st, k, n) => { X.put(st, k, n); return `获得 <span class="y">${lootLabel(st, k)}×${n}</span>`; },
    put: (st, k, n) => { if (st === 'petEggs') S.petEggs += n; else if (st === 'maiPages') S.maiPages = (S.maiPages | 0) + n; else { S[st] = S[st] || {}; S[st][k] = (S[st][k] || 0) + n; } const key = st + ':' + k; rw.items[key] = (rw.items[key] || 0) + n; },
    loot: async (rolls, cats, bonus) => { const got = [];
        // v967 服务端版（在线才走）
        if (typeof MHXY !== 'undefined' && MHXY.loggedIn && MHXY.loggedIn()) {
          try {
            const r = await MHXY.api('/api/roll/adv_loot', 'POST', { rolls, cats, bonus: bonus||0, tier: t, dk: run.dk });
            if (r.ok && r.json && r.json.ok) {
              if (typeof MHXY.setBaseRev === 'function' && r.json.rev) MHXY.setBaseRev(r.json.rev);
              for (const d of (r.json.drops || [])) {
                if (d.skip) { // gear 走本地
                  const gr = rollGear(S, t + (bonus || 0)); const key = `${gr.k}|${gr.set}|${gr.q}`;
                  if (S.gearBag.length < bagCap(S)) { S.gearBag.push(gr); rw.items['gear:' + key] = (rw.items['gear:' + key] || 0) + 1; got.push(`<span class="gq${gr.q}">${lootLabel('gear', key)}</span>`); }
                  else { const price = gearPrice(gr); S.gold += price; got.push(`<span class="gq${gr.q}">${lootLabel('gear', key)}</span><small>（包满自动卖+${price}金）</small>`); }
                } else {
                  // 服务端已发放到 D1，本地同步
                  X.put(d.st, d.k, d.n);
                  got.push(`${lootLabel(d.st, d.k)}×${d.n}`);
                }
              }
              commit();
              return `获得 <span class="y">${got.join(' ')}</span>`;
            }
          } catch(e) {}
        }
        // 离线回落：原本地逻辑
        for (let i = 0; i < rolls; i++) { let e, g = 0; do { e = lootRoll(S, Math.min(8, t + (bonus || 0) + (run.dk === 'mijing' ? 2 : 0)), run.dk); } while (cats && !cats.includes(e.st) && ++g < 60);
          if (e.st === 'gear') { const gr = rollGear(S, t + (bonus || 0)); const key = `${gr.k}|${gr.set}|${gr.q}`; if (S.gearBag.length < bagCap(S)) { S.gearBag.push(gr); rw.items['gear:' + key] = (rw.items['gear:' + key] || 0) + 1; got.push(`<span class="gq${gr.q}">${lootLabel('gear', key)}</span>`); } else { const price = gearPrice(gr); S.gold += price; got.push(`<span class="gq${gr.q}">${lootLabel('gear', key)}</span><small>（包满自动卖+${price}金）</small>`); } }
          else { const n = e.n > 1 ? ri(1, e.n) : 1; X.put(e.st, e.k, n); got.push(`${lootLabel(e.st, e.k)}×${n}`); } }
        return `获得 <span class="y">${got.join(' ')}</span>`; },
    take: (st, k, n) => { if ((S[st][k] -= n) <= 0) delete S[st][k]; },
    hurt: k => { if (k === 'poison' && C.toxImmune(S)) return '（百毒不侵，毒奈何不了你）'; if (hasSt(S, k)) return `（已${STATUS[k].name}）`; addStatus(S, k); run.newSt = (run.newSt || []).concat(k); return `<span class="r">${STATUS[k].icon}${STATUS[k].name}</span>`; }, // v1140 百毒不侵：冒险中毒被挡
    cure: k => { if (!hasSt(S, k)) return false; cureStatus(S, k); return true; },
    heal: p => { const cap = Math.floor(+S.vitPeak || (S.attrs.str + S.attrs.def + S.attrs.vit)), g = Math.ceil(cap * p); let msg = ''; if (g > 0) { const hpMax = Math.floor(C.bumpPeak(S) * 5); const hpCur = S.hpCur != null ? Math.floor(S.hpCur) : (S.attrs.str + S.attrs.def + S.attrs.vit) * 5; const healHp = g * 5; const need = Math.max(0, hpMax - hpCur); const toHp = Math.min(healHp, need); const toVit = Math.ceil(Math.max(0, healHp - toHp) / 5); if (toHp > 0) { S.hpCur = Math.min(hpMax, hpCur + toHp); msg += `生命 <span class="y">+${fmtN(toHp)}</span>`; } if (toVit > 0) { S.advVit = Math.floor(S.advVit || 0) + toVit; msg += `${msg ? '，' : ''}<span class="y">+${fmtN(toVit * 5)}</span> 溢出进黄条`; } } try { save(); } catch(e) {} return msg || '生命已满'; },
    loseAttr: n => { n = Math.max(1, Math.ceil(diff.lose / 3)) * n; const lost = {}; for (let i = 0; i < n; i++) { const c = ATTRS.filter(k => S.attrs[k] > K.ATTR_MIN); if (!c.length) break; const a = pick(c); S.attrs[a]--; if (a === 'vit' && S.vitPeak) S.vitPeak--; lost[a] = (lost[a] || 0) + 1; } return `<span class="r">${Object.keys(lost).map(a => AN[a] + '-' + lost[a]).join(' ') || '无损'}</span>`; },
    loseGold: p => { const g = Math.floor(S.gold * p); S.gold -= g; return `金元 <span class="r">-${g}</span>`; },
    buff: k => { S.buff = k === 'luck' ? { k: 'luck', v: K.BUFF_LUCK[2], left: K.BUFF_ACTS, src: '奇遇' } : { k, v: K.BUFF_ATTR[2], left: K.BUFF_FIGHTS, src: '奇遇' }; return `增益 <span class="y">${k === 'luck' ? '气运 ×' + K.BUFF_LUCK[2] + '（' + K.BUFF_ACTS + ' 点体力）' : AN[k] + ' +' + K.BUFF_ATTR[2] * 100 + '%（' + K.BUFF_FIGHTS + ' 场战斗）'}</span>`; },
    ambush: (bump, s) => { run.pending = { bump, text: s }; return `<span class="r">${s || '遇袭！'}</span>`; }
  };
  return X;
}
function advBattleSetup(S, run) { try { if ((S.level|0) >= C.REALM_MAX_LV && !S.thunderOk && (S.realm|0) >= 2) { S._trigFail=S._trigFail|0; S._succFail=S._succFail|0; const _tp2=Math.min(1,0.10+0.10*S._trigFail); if (Math.random()<_tp2) { S._trigFail=0; const _sc=[['微风忽起，落叶打旋','天色微暗','远处闷雷一声'],['灵气躁动，飞鸟惊散','乌云聚顶，云层压得很低','雷声滚滚，由远及近'],['草木低伏，虫鸣骤止','劫云翻涌，云中有电光游走','雷声震耳，地面微颤'],['空气粘稠，呼吸不畅','金色雷纹在云中若隐若现','雷声如鼓，声声催心'],['灵气倒卷，阵法纹路浮现','云层裂开，白光倾泻','虚空嗡鸣，如大道低语'],['十里之内，鸟兽绝迹','雷光如瀑，倾天而下','威压先至，骨骼作响'],['天地灵气一空','云开一线，天眼似开','万籁俱寂，只闻心跳'],['凡尘涤荡，浊气尽散','雷柱接天，直贯九霄','天道之音，响彻神魂'],['仙器共鸣，嗡嗡作响','九彩劫云，遮天蔽日','法则碎片，四散飞溅'],['小世界灵气被抽空','虚空裂缝，蔓延天际','空间涟漪，层层荡开'],['数个小世界震动','劫云蔽星，日月无光','法则碰撞，星火四溅'],['三千世界战栗','灭世洪流，席卷星海','雷威吞声，万物噤声']]; const _s=_sc[Math.min(11,S.realm|0)]||_sc[0]; tribOmenShow(S); log('warn',C.thunderCloud(S)+' '+_s[0]+'。'+_s[1]+'。'+_s[2]+'……<br>雷云判定中……'); const _sp2=Math.min(1,0.01+0.01*S._succFail); if(Math.random()<_sp2){S.thunderOk=true;S._succFail=0;S._trigFail=0;log('good','⚡ <b class="r">天道已将你锁定</b>——雷劫将至，生死只在一线之间！<br>速速调整状态，迎接天威洗礼！<br>⚡ 突破契机已到，随时可破');commit();} else {S._succFail++;log('info','<span style="filter:brightness(0)">🌫️</span> 雷云缓缓散去，天威渐消……<br><span style="color:#888">看来火候未到，天道还未注意到你。继续修炼吧。</span>');} } else { S._trigFail++; } } } catch(_){} // v668 冒险战斗叠加
  const m = run.ev.mon;
  const mf = fighter(m.name, m.attrs, false, m.skills); mf.inflict = m.st || null; mf.realm = S.realm|0; // v87：AI仙力攻击用
  const b = new Battle(playerFighter(S, true), mf); b.unlimited = true; return b; // 打怪回合无限，直到分胜负
}
async function advBattleSettle(S, run, b) { // 冒险战斗结算
  const diff = DIFFS[run.dk], m = run.ev.mon, rk = RANKS[m.rank];
  const win = b.winner === b.A, res = { battle: b, win, newSt: [] };
  carryOut(S, b.A, res);
  // 战斗掉血同步到主界面（黄条部分在战斗中优先扣除，S.advVit 保持不变直到冒险结束）
  const _avHp = (S.advVit|0) * 5, _baseMax = b.A.maxHp - _avHp;
  if ((S.advVit|0) > 0 && _baseMax > 0) {
    S.hpCur = Math.max(0, Math.floor(Math.min(b.A.hp, _baseMax)));
  } else {
    S.hpCur = Math.max(0, Math.floor(b.A.hp));
  }
  // 法力同步：战斗中用法术先扣紫条（溢出部分）
  if (C.useFali(S)) S.mana = Math.max(0, Math.min(C.manaCapEff(S), Math.floor(b.A.mp)));
  run.newSt = (run.newSt || []).concat(res.newSt);
  const X = advCtx(S, run), lines = [];
  if (win) { S.stats.advWin++; S.stats.advWinTotal = (S.stats.advWinTotal || 0) + 1;
    const _shaP = (m.rank >= 4) ? 0.3 : 0.1; if (R() < _shaP) { S.inv['sha'] = (S.inv['sha'] || 0) + 1; lines.push(`👹 击杀获得 <b class="y">煞气 ×1</b>`); } run.rew.wins++; lines.push(`战胜 <span class="${rk.cls}">【${rk.name}】${m.name}</span>：` + X.gain(ADV_FIGHT_U * rk.rew) + '，' + X.xp(ADV_FIGHT_U * rk.rew));
    const dwx = (DIFFS[run.dk] || {}).wx, _we = dwx ? wxByK(dwx) : null;
    if (_we) { // 五行：王必掉1对应残物；其他怪基础2%，每次不出+1%，出了清零（王不影响保底）
      if (m.rank >= 4) {
        S.wxFrag[dwx] = (S.wxFrag[dwx] | 0) + 1; const _wk = 'wxFrag:' + dwx; run.rew.items[_wk] = (run.rew.items[_wk] | 0) + 1;
        lines.push(`获得 <b style="color:${_we.color}">【${_we.name}残物】×1</b>`);
      } else {
        if (!S.wxPity || typeof S.wxPity !== 'object') S.wxPity = {};
        const _pity = Math.max(0, Math.min(1, +(S.wxPity[dwx] || 0)));
        if (R() < WX_FRAG_DROP + _pity) {
          S.wxFrag[dwx] = (S.wxFrag[dwx] | 0) + 1; const _wk = 'wxFrag:' + dwx; run.rew.items[_wk] = (run.rew.items[_wk] | 0) + 1;
          S.wxPity[dwx] = 0;
          lines.push(`获得 <b style="color:${_we.color}">【${_we.name}残物】×1</b>`);
        } else {
          S.wxPity[dwx] = Math.min(1, _pity + 0.01);
        }
      }
    }
    const rolls = randRound([0.35, 0.6, 1, 1.5, 2.5][m.rank]); if (rolls) lines.push(await X.loot(rolls, null, m.rank >= 3 ? 1 : 0));
  } else { // 战败：沿用冒险战败规则
    const lostSta = S.stamina, lostGold = Math.floor(S.gold * K.DEATH_GOLD_PCT), x = diff.xpL;
    if ((S.protect | 0) > 0) { // 🛡️新人保护：免除战败惩罚（不扣属性、体力不清零、不扣金元、不染伤病）
      S.protect--;
      run.rew.xp += x; run.rew.lvUp += gainXp(S, x);
      lines.push(`${b.draw ? '<span class="r">☠️同归于尽</span>' : `<span class="r">败给【${rk.name}】${m.name}</span>`}：<span class="y">🛡️新人保护（余 ${S.protect} 次）</span>，本次免除：属性 -${diff.lose}、体力清零（${lostSta}）、金元 -${lostGold}；${C.useFali(S) ? ((S.realm|0) >= 8 ? '仙力' : '法力') : '经验'} +${x}`);
    } else {
      const lost = {}; for (let i = 0; i < diff.lose; i++) { const c = ATTRS.filter(k => S.attrs[k] > K.ATTR_MIN); if (!c.length) break; const a = pick(c); S.attrs[a]--; if (a === 'vit' && S.vitPeak) S.vitPeak--; lost[a] = (lost[a] || 0) + 1; }
      S.stamina = 0; S.gold -= lostGold;
      S.lifespan = Math.max(0, (S.lifespan|0) - 1); // 战败扣1年寿元
      if (R() < diff.st) { const k = m.st && R() < 0.6 ? m.st : pick(['bleed', 'poison', 'depress']); if (!hasSt(S, k)) { addStatus(S, k); run.newSt.push(k); } }
      run.rew.xp += x; run.rew.lvUp += gainXp(S, x);
      lines.push(`${b.draw ? '<span class="r">☠️同归于尽</span>' : `<span class="r">败给【${rk.name}】${m.name}</span>`}：属性 ${Object.keys(lost).map(a => AN[a] + '-' + lost[a]).join(' ') || '无'}，体力清零（-${lostSta}），金元 -${lostGold}，<span class="r">寿元 -1年</span>，${resLbl(S)} +${x}`);
    }
    run.defeat = true;
  }
  return { battle: b, win, lines: lines.filter(Boolean) };
}
async function advFight(S, run) { const b = advBattleSetup(S, run).auto(); return await advBattleSettle(S, run, b); }
function advEnd(S, why) { const run = S.run; try { if (typeof advSharedStop === 'function') advSharedStop(); } catch(_) {} S.run = null; S.advVit = 0; const g = run.grid; return { dk: run.dk, why, rew: run.rew, steps: g ? g.moves : run.step, total: g ? (run.evCount | 0) : run.steps, grid: !!g, defeat: !!run.defeat, newSt: run.newSt || [] }; } // v182 格子：steps=走格数，total=触发事件数
async function advChoose(S, i) { try { if ((S.level|0) >= C.REALM_MAX_LV && !S.thunderOk && (S.realm|0) >= 2) { S._trigFail=S._trigFail|0; S._succFail=S._succFail|0; const _tp=Math.min(1,0.10+0.10*S._trigFail); if (Math.random()<_tp) { S._trigFail=0; const _sc=[['微风忽起，落叶打旋','天色微暗','远处闷雷一声'],['灵气躁动，飞鸟惊散','乌云聚顶，云层压得很低','雷声滚滚，由远及近'],['草木低伏，虫鸣骤止','劫云翻涌，云中有电光游走','雷声震耳，地面微颤'],['空气粘稠，呼吸不畅','金色雷纹在云中若隐若现','雷声如鼓，声声催心'],['灵气倒卷，阵法纹路浮现','云层裂开，白光倾泻','虚空嗡鸣，如大道低语'],['十里之内，鸟兽绝迹','雷光如瀑，倾天而下','威压先至，骨骼作响'],['天地灵气一空','云开一线，天眼似开','万籁俱寂，只闻心跳'],['凡尘涤荡，浊气尽散','雷柱接天，直贯九霄','天道之音，响彻神魂'],['仙器共鸣，嗡嗡作响','九彩劫云，遮天蔽日','法则碎片，四散飞溅'],['小世界灵气被抽空','虚空裂缝，蔓延天际','空间涟漪，层层荡开'],['数个小世界震动','劫云蔽星，日月无光','法则碰撞，星火四溅'],['三千世界战栗','灭世洪流，席卷星海','雷威吞声，万物噤声']]; const _s=_sc[Math.min(11,S.realm|0)]||_sc[0]; tribOmenShow(S); log('warn',C.thunderCloud(S)+' '+_s[0]+'。'+_s[1]+'。'+_s[2]+'……<br>雷云判定中……'); const _sp=Math.min(1,0.01+0.01*S._succFail); if(Math.random()<_sp){S.thunderOk=true;S._succFail=0;S._trigFail=0;log('good','⚡ <b class="r">天道已将你锁定</b>——雷劫将至，生死只在一线之间！<br>速速调整状态，迎接天威洗礼！<br>⚡ 突破契机已到，随时可破');commit();} else {S._succFail++;log('info','<span style="filter:brightness(0)">🌫️</span> 雷云缓缓散去，天威渐消……<br><span style="color:#888">看来火候未到，天道还未注意到你。继续修炼吧。</span>');} } else { S._trigFail++; } } } catch(_){} // v674 冒险移动完整文案
  const run = S.run; if (!run) return null; if (S.dead) return { end: advEnd(S, 'dead') };
  const chs = advChoices(S), c = chs[i]; if (!c || c.dis) return { err: 'bad' };
  const out = { lines: [], ev: run.ev };
  if (c.retreat) { out.lines.push('撤退'); out.end = advEnd(S, 'retreat'); return out; }
  if (run.ev.type === 'fight' && run.ev.monTile) { // v1154 资源格怪物（惊扰/主动攻击）：胜则减一只，不占事件格
    const mt = run.ev.monTile;
    if (i === 1) { const p = fleeP(S, run.ev.mon); if (R() < p) { out.lines.push('逃跑成功'); run.ev = null; run.last = out.lines; return out; } out.lines.push('<span class="r">逃跑失败</span>'); }
    const f = await advFight(S, run); out.battle = f.battle; out.lines.push(...f.lines);
    if (run.defeat || S.dead) { out.end = advEnd(S, 'defeat'); return out; }
    if (f.win) {
      if (run.shared && run.shared.on) run.monKillPending = { x: mt.x, y: mt.y, tier: mt.tier };
      else if (run.grid) { const gt = run.grid.tiles[mt.y][mt.x]; if (gt && gt.mons) gt.mons[mt.tier] = Math.max(0, (gt.mons[mt.tier] | 0) - 1); }
      run.ev = null;
    }
    run.last = out.lines; return out;
  }
  if (run.ev.type === 'fight') {
    if (i === 1) { const p = fleeP(S, run.ev.mon); if (R() < p) { out.lines.push('逃跑成功'); const _t = run.grid.tiles[run.grid.py][run.grid.px]; _t.evDone = 1; _t.ev = null; run.ev = null; run.last = out.lines; return out; } else { out.lines.push('<span class="r">逃跑失败</span>'); const f = await advFight(S, run); out.battle = f.battle; out.lines.push(...f.lines); } }
    else { const f = await advFight(S, run); out.battle = f.battle; out.lines.push(...f.lines); }
    if (run.defeat || S.dead) { out.end = advEnd(S, 'defeat'); return out; }
  } else if (run.ev.type === 'guarded') { // v185 守宝：潜行获取，被发现则转战斗
    const mon = run.ev.mon, loot = run.ev.loot, tile = () => run.grid.tiles[run.grid.py][run.grid.px];
    const toFight = why => { out.lines.push(why); run.ev = { type: 'fight', mon, text: '守怪被激怒了', boss: false, guardedFrom: true, loot }; tile().ev = run.ev; run.last = out.lines; };
    if (i === 1) { toFight('你拔剑而起，杀向守怪！'); return out; }
    const p = sneakP(S, mon), ok = R() < p;
    out.lines.push(`🤫 敏捷检定${ok ? '<span class="g">成功</span>' : '<span class="r">失败</span>'}`);
    if (ok) {
      out.lines.push('🤫 你屏住呼吸，悄无声息地取走了宝物，守怪毫无察觉');
      out.lines.push(guardedLoot(S, run, loot));
      tile().evDone = 1; tile().ev = null; run.ev = null; run.last = out.lines; return out;
    }
    toFight('<span class="r">👁️ 被守怪发现了！</span>它咆哮着扑了过来！'); return out;
  } else {
    const E = ADV_EVENTS[run.ev.id], ch = E.ch[i], X = advCtx(S, run);
    if (ch.cost) { const g = Math.max(1, Math.round(advUnitGold(run.dk) * ch.cost)); S.gold -= g; out.lines.push(`金元 -${g}`); }
    const ok = ch.a ? R() < advCheckP(S, run.dk, ch.a) : true; if (ch.a) out.lines.push(`${AN[ch.a]}检定${ok ? '<span class="g">成功</span>' : '<span class="r">失败</span>'}`);
    out.lines.push(await ch.f(X, ok));
    if (run.pending) { const pd = run.pending; run.pending = null; advNewEvent(S, run, true, pd.bump, pd.text); if (run.grid) { const _t = run.grid.tiles[run.grid.py][run.grid.px]; _t.ev = run.ev; } run.last = out.lines; return out; } // 伏击：本步变为战斗
  }
  if (run.grid) { // v182 格子模式：事件解决后继续走格子；终点 BOSS 打赢即通关（v184：事件存格子上，解决后标记完成）
    const g = run.grid, t = g.tiles[g.py][g.px], wasExit = run.ev && run.ev.exitBoss, won = !!(out.battle && out.battle.winner && out.battle.winner.isPlayer);
    const wasGuarded = run.ev && run.ev.guardedFrom;
    if (wasExit && won) { t.done = 1; t.ev = null; out.lines.push('击败守关者，抵达终点'); out.end = advEnd(S, 'done'); return out; }
    if (won && wasGuarded) out.lines.push('⚔️ 守怪已除；' + guardedLoot(S, run, run.ev.loot));
    t.evDone = 1; t.ev = null; run.ev = null; run.last = out.lines; return out;
  }
  if (run.step >= run.steps) { out.lines.push('抵达终点'); out.end = advEnd(S, 'done'); return out; }
  run.step++; advNewEvent(S, run); run.last = out.lines; return out;
}
async function advAuto(S, dk, policy) { // 模拟用：自动走完一轮（默认：打怪、选成功率最高的检定、不撤退）
  if (!advStart(S, dk)) return null; let r, guard = 0;
  const dirs = ['up', 'down', 'left', 'right'];
  while (S.run && guard++ < 300) {
    if (S.run.grid && !S.run.ev) { const m = advMove(S, dirs[Math.floor(R() * 4)]); if (m && m.end) return m.end; continue; } // v182 格子：随机走
    const chs = advChoices(S); const i = policy ? policy(S, chs) : (S.run.ev.type === 'fight' ? 0 : chs.map((c, j) => ({ j, p: c.retreat || c.dis ? -1 : c.hint.includes('%') ? parseFloat(c.hint.split(' ')[1]) / 100 : c.l.match(/离开|赶路|作罢|放弃|不/) ? 0.3 : 0.6 })).sort((a, b) => b.p - a.p)[0].j); r = await advChoose(S, i); if (r && r.end) return r.end; }
  return S.run ? advEnd(S, 'stuck') : null;
}
function pkStart(S, oppRealm) {
  if (S.dead || S.stamina < K.COST_PK) return null;
  spend(S, K.COST_PK); if (S.dead) return null; S.stats.pk++; S.stats.pkTotal = (S.stats.pkTotal || 0) + 1; hungerDown(S, K.HUNGER_FIGHT, 1);
  const opp = genOpponent(S);
  if (oppRealm === undefined || !(oppRealm >= 0)) oppRealm = S.realm|0;
  oppRealm = Math.max(0, Math.min(12, oppRealm|0));
  const _rdiff = oppRealm - (S.realm|0);
  if (_rdiff !== 0) { const _mult = Math.pow(2, Math.abs(_rdiff)); for (const k of ATTRS) opp.attrs[k] = Math.max(1, Math.round(opp.attrs[k] * _mult)); }
  opp.realm = oppRealm;
  if (!(opp.lifespan > 0)) opp.lifespan = REALM_LIFESPAN[Math.min(12, opp.realm|0)] || 100;
  _personCache[opp.name] = opp;
  const _obf = fighter(opp.name, opp.attrs, false, opp.skills, opp.pet); _obf.realm = oppRealm; // v87：AI仙力攻击用
  return { opp, battle: new Battle(playerFighter(S, false), _obf) };
}
function pkSurrender(pk) { pk.battle.over = true; pk.battle.winner = pk.battle.B; pk.surrender = true; }
function applyZhenxiu(S, pk, key) { // PK 战前使用珍馐：最先手，无视敏捷；每场战斗限用 1 次
  const d = DISHES[key];
  if (!d || !d.zx || !(S.zx && S.zx[key] > 0) || !pk || pk.zxDone) return null;
  S.zx[key]--; if (S.zx[key] <= 0) delete S.zx[key];
  pk.zxDone = true;
  const b = pk.battle, L = [], tmp = [];
  L.push(`<div class="bl">🍲 你使用了<span class="y">【${d.name}】</span>，先手生效！</div>`);
  if (d.zx === 'poison') { for (const f of [b.B, b.B.pet]) if (f && f.hp > 0) inflict(f, 'poison', tmp); }
  else if (d.zx === 'li') { for (const f of [b.B, b.B.pet]) if (f && f.hp > 0) { f.confuse = K.ZX_CONFUSE_ROUNDS; tmp.push(`${nm(f)}<span class="pu">神志混乱</span>，${K.ZX_CONFUSE_ROUNDS} 回合内可能转头互砍`); } }
  else if (d.zx === 'str') { for (const f of [b.A, b.A.pet]) if (f && f.hp > 0) { const boost = Math.max(1, Math.round(f.a.str * K.ZX_STR_PCT)); f.a.str += boost; f.zxStr = { boost, n: K.ZX_ROUNDS }; tmp.push(`${nm(f)}<span class="y">力量 +${boost}</span>，持续 ${K.ZX_ROUNDS} 回合`); } }
  else if (d.zx === 'weak') { for (const f of [b.B, b.B.pet]) if (f && f.hp > 0) { const cut = {}; for (const a of ATTRS) { cut[a] = Math.floor(f.a[a] * K.ZX_WEAK_PCT); f.a[a] -= cut[a]; } f.zxWeak = { cut, n: K.ZX_ROUNDS }; tmp.push(`${nm(f)}<span class="b">全属性 -${Math.round(K.ZX_WEAK_PCT * 100)}%</span>，持续 ${K.ZX_ROUNDS} 回合`); } }
  else if (d.zx === 'soul') { b.A.soulpact = true; if (b.A.pet) b.A.pet.soulpact = true; tmp.push(`本场战斗中你或灵宠<span class="y">首次倒下时将复活</span>（恢复 50% 生命）`); }
  tmp.forEach(s => L.push(`<div class="bl">${s}</div>`));
  return L;
}
function pkTakeByRealm(wR, lR) { // v88：按境界算夺取点数：基数=对方境界每级属性点（凡人1…主宰13）；同境×1；高打低差1/2/3/4境×0.5/0.3/0.2/0.1，差5+无；低打高差1/2/3境×2/3/5，差4+×10封顶
  const base = (lR|0) + 1, d = (wR|0) - (lR|0); let m;
  if (d === 0) m = 1; else if (d === 1) m = 0.5; else if (d === 2) m = 0.3; else if (d === 3) m = 0.2; else if (d === 4) m = 0.1; else if (d >= 5) m = 0;
  else if (d === -1) m = 2; else if (d === -2) m = 3; else if (d === -3) m = 5; else m = 10;
  return Math.floor(base * m);
}
function pkSettle(S, pk, chosen) {
  if (pk.trib === 'thunder') { // v684 雷劫结算
    try {
      const b = pk.battle;
      const _td = pk.tribData || {};
      const fromRealm = _td.fromRealm | 0;
      const koWin = b.winner === b.A;
      const surviveWin = !koWin && b.A.hp > 0 && b.round >= (b.tribStrikes || 9);
      // v755 扛过雷云（非击溃）：33.33%突破成功，不加品级
      let win = koWin || surviveWin;
      let _survivePass = false;
      if (surviveWin) {
        _survivePass = Math.random() < 0.3333;
        if (!_survivePass) win = false;
      }
      const _bl = '⚡ 与雷云激战' + (koWin ? '，<span class="g">击溃雷云</span>' : (surviveWin ? (_survivePass ? '，<span class="g">扛过' + (b.tribStrikes || 9) + '道天雷，雷云散去</span>' : '，<span class="r">扛过雷云但道基不稳</span>') : '，<span class="r">不敌雷云</span>'));
      pk = null;
      S._trigFail = 0; S._succFail = 0; // v982 thunderOk 不在这里清，移到问心展示成功后（修 Bug#35）
      if (!win) {
        S.thunderOk = false; // 失败才清按钮
        try { const _ds = C.applyFailState(S, fromRealm); log('bad', _bl + '<br>⚡ 倒在天雷之下，突破失败……沦为【' + (_ds || S.degraded) + '】。'); } catch(_){ log('bad', _bl + '<br>⚡ 突破失败。'); }
      } else {
        try {
          const _trib = _td.trib || {};
          try { _trib.thunder = _trib.thunder || {}; _trib.thunder.koWin = koWin; } catch(_){}
          // v745 雷劫胜利后必定问心（原直接applyBtSuccess）
          _trib.demonMet = true;
          const _quiz = (typeof pickTribQuiz === 'function' ? pickTribQuiz(fromRealm) : (C.pickTribQuiz ? C.pickTribQuiz(fromRealm) : null));
          if (_quiz) {
            _quiz.jackpot = _trib.jackpot || null;
            _quiz.koWin = koWin;
            _quiz.fromRealm = fromRealm;
            _trib.quiz = _quiz;
            // 保存trib供后续使用
            try { S._pendingTrib = _trib; S._pendingFromRealm = fromRealm; } catch(_){}
            // v982 修 Bug#35：问心展示失败给可见报错，不再静默吞；成功才清 thunderOk，失败回滚保留按钮
            let _quizShown = false, _quizErr = '';
            try {
              if (typeof sheetTribQuiz === 'function') sheetTribQuiz(_quiz);
              else if (typeof window.sheetTribQuiz === 'function') window.sheetTribQuiz(_quiz);
              else throw new Error('sheetTribQuiz 未定义');
              _quizShown = true;
            } catch(_qe){ _quizErr = (_qe && _qe.message) || String(_qe); }
            if (_quizShown) {
              S.thunderOk = false;
            } else {
              S.thunderOk = true; // 回滚：按钮保留，玩家可重试
              try { log('bad', '⚡ 问心展示失败：' + (_quizErr || '未知错误') + '<br>突破按钮已保留，请截图联系管理或重进游戏重试。'); } catch(_){}
            }
            try { commit(); } catch(_){}
            return;
          }
          // 兜底：直接突破
          S.thunderOk = false;
          const r = C.applyBtSuccess(S, fromRealm, _trib);
          const _gs = r.grade ? `结成【<b class="y">${r.grade}</b>】，全属性 <span class="y">×${r.mult}</span>！` : '';
          log('good', _bl + '<br>⚡ <b>突破成功！</b>踏入【' + (r.realm || '') + '】！' + _gs);
        } catch(_){ log('good', _bl + '<br>⚡ 突破成功！'); }
      }
      try { afterAct(); } catch(_){}
      try { commit(); } catch(_){}
      render();
    } catch(_e){ try{ log('bad','雷劫结算失败:'+(_e.message||_e)); }catch(_){} try{ pk=null; render(); }catch(_){} }
    return;
  }
  const b = pk.battle, res = { win: b.winner === b.A, draw: !!b.draw };
  if (pk.isArena) { // v245 擂台结算：积分制，不夺/不掉属性；v246 积分同步到日/周/月/年榜；v247 胜者为擂主，按守擂时间算
    const a = arenaData();
    if (res.win) {
      a.win++; a.streak++; a.best = Math.max(a.best, a.streak); arenaAddScore(a, 10);
      // 成为擂主
      if (!a.champion || !a.champion.isPlayer) {
        a.champion = { name: S.name || '你', since: Date.now(), isPlayer: true, claimedHrs: 0 };
        res.becameChampion = true;
      }
      res.gold = ri(K.PK_GOLD_MIN, K.PK_GOLD_MAX) + Math.min(50, a.streak * 5); S.gold += res.gold;
      Object.assign(res, { arenaScore: 10, arenaStreak: a.streak, xp: K.PK_XP_WIN });
    } else {
      a.lose++; a.streak = 0; arenaAddScore(a, 1); // v269 战败不扣分，+1
      Object.assign(res, { arenaScore: 1, xp: K.PK_XP_LOSE });
    }
    res.lvUp = gainXp(S, res.xp);
    res.newSt = []; S.hpCur = Math.max(0, Math.floor(b.A.hp)); if (C.useFali(S)) S.mana = Math.max(0, Math.min(C.manaCapEff(S), Math.floor(b.A.mp))); carryOut(S, b.A, res);
    const ap = activePet(S), bp = b.A.pet;
    if (ap && bp) {
      res.pet = ap; ap.hunger = Math.max(0, ap.hunger - K.PET_HUNGER_FIGHT); res.bites = bp.bites;
      if (bp.bites) { ap.loyal = Math.max(0, ap.loyal - 2 * bp.bites); ap.hunger = Math.min(100, ap.hunger + 5 * bp.bites); }
      res.loyal = pk.surrender ? 0 : loyalUp(ap, K.FIGHT_LOYAL_P, 1, 2);
      if (bp.ko) {
        ap.life = Math.max(0, (typeof ap.life === 'number' ? ap.life : K.PET_LIFE_MAX) - K.PET_DEATH_LIFE);
        ap.loyal = Math.max(0, ap.loyal - K.PET_DEATH_LOYAL);
        res.petDead = true;
        if (ap.life <= 0) { S.pets = (S.pets || []).filter(p => p.id !== ap.id); if (S.pet === ap.id) S.pet = null; res.petGone = true; }
      }
      if (!pk.surrender && !res.petGone) { res.petXp = res.win ? K.PET_XP_WIN : K.PET_XP_LOSE; const pg = petGainXp(ap, res.petXp); res.petUps = pg.ups; res.petSks = pg.sks; res.petTls = pg.tls; for (let i = 0; i < res.petUps; i++) res.loyal += loyalUp(ap, K.LVUP_LOYAL_P, 3, 5); }
    }
    return res;
  }
  if (res.win) {
    S.stats.pkWin++; S.stats.pkWinTotal = (S.stats.pkWinTotal || 0) + 1;
    const _epk = b._enemyPetKo|0; for (let _i = 0; _i < _epk; _i++) if (R() < 0.3) { S.inv['sha'] = (S.inv['sha'] || 0) + 1; res.shaPet = (res.shaPet|0) + 1; }
    const attr = AN[chosen] ? chosen : pick(ATTRS);
    const take = Math.max(0, Math.min(pkTakeByRealm(S.realm|0, pk.opp.realm|0), pk.opp.attrs[attr] - K.ATTR_MIN)); // v88：按境界算
    pk.opp.attrs[attr] -= take; S.attrs[attr] += take;
    res.gold = ri(K.PK_GOLD_MIN, K.PK_GOLD_MAX); S.gold += res.gold;
    const _rr = R();
    if (_rr < 0.3) { S.inv['sha'] = (S.inv['sha'] || 0) + 1; res.sha = 1; }
    else if (_rr < 0.9) { S.curseN = (S.curseN|0) + 1; res.curse = S.curseN; } // 诅咒永久叠加层数
    try { if (typeof addMerit === 'function') addMerit(-5, 'PK杀孽'); } catch(_) {} // v893
    Object.assign(res, { attr, take, xp: K.PK_XP_WIN });
  } else {
    let attr = pk.opp.prefer;
    if (S.attrs[attr] <= K.ATTR_MIN) attr = ATTRS.slice().sort((a, b2) => S.attrs[b2] - S.attrs[a])[0];
    const take = Math.max(0, Math.min(pkTakeByRealm(pk.opp.realm|0, S.realm|0), S.attrs[attr] - K.ATTR_MIN)); // v88：按境界算
    if ((S.protect|0) > 0) { // 🛡️新人保护：免除PK战败属性损失
      S.protect--; Object.assign(res, { attr, take: 0, xp: K.PK_XP_LOSE, protected: true, protectLeft: S.protect, wouldTake: take });
    } else {
      S.attrs[attr] -= take; if (attr === 'vit' && S.vitPeak) S.vitPeak = Math.max(S.attrs.vit, S.vitPeak - take);
      S.lifespan = Math.max(0, (S.lifespan|0) - 1); // PK战败扣1年寿元
      Object.assign(res, { attr, take, xp: K.PK_XP_LOSE, lifeLost: 1 });
    }
  }
  if (res.draw) { // v88：同归于尽互夺：双方从对方背包各拿1件；属性转移+各自全属性消散1%
    const _pK = Object.keys(S.inv || {}).filter(k => (S.inv[k]|0) > 0);
    if (_pK.length) { const _lk = _pK[Math.floor(Math.random() * _pK.length)]; if (--S.inv[_lk] <= 0) delete S.inv[_lk]; res.drawLost = _lk; }
    const _oInv = pk.opp.inv || {}, _oK = Object.keys(_oInv).filter(k => (_oInv[k]|0) > 0);
    if (_oK.length) { const _gk = _oK[Math.floor(Math.random() * _oK.length)]; if (--_oInv[_gk] <= 0) delete _oInv[_gk]; C.gainItem(S, 'inv', _gk, 1); res.drawGot = { st: 'inv', k: _gk }; }
    const _dAttr = AN[chosen] ? chosen : pick(ATTRS); // 玩家夺取（转移，按境界）
    const _dTake = Math.max(0, Math.min(pkTakeByRealm(S.realm|0, pk.opp.realm|0), pk.opp.attrs[_dAttr] - K.ATTR_MIN));
    if (_dTake > 0) { pk.opp.attrs[_dAttr] -= _dTake; S.attrs[_dAttr] += _dTake; }
    Object.assign(res, { drawTakeAttr: _dAttr, drawTake: _dTake });
    if (!res.protected) { const _pl = {}; for (const _a of ATTRS) { const _l = Math.floor(S.attrs[_a] * 0.01); if (_l > 0) { S.attrs[_a] = Math.max(K.ATTR_MIN, S.attrs[_a] - _l); _pl[_a] = _l; } } res.drawPctLoss = _pl; } // 各自全属性消散1%（新人保护免除）
  }
  res.lvUp = gainXp(S, res.xp);
  res.newSt = []; S.hpCur = Math.max(0, Math.floor(b.A.hp)); if (C.useFali(S)) S.mana = Math.max(0, Math.min(C.manaCapEff(S), Math.floor(b.A.mp))); carryOut(S, b.A, res);
  if (!res.win && !hasSt(S, 'depress') && R() < K.PK_LOSS_DEPRESS) res.newSt.push(addStatus(S, 'depress'));
  const ap = activePet(S), bp = b.A.pet;
  if (ap && bp) { // 参战灵宠：饥饿、反咬、忠诚、经验
    res.pet = ap; ap.hunger = Math.max(0, ap.hunger - K.PET_HUNGER_FIGHT); res.bites = bp.bites;
    if (bp.bites) { ap.loyal = Math.max(0, ap.loyal - 2 * bp.bites); ap.hunger = Math.min(100, ap.hunger + 5 * bp.bites); }
    res.loyal = pk.surrender ? 0 : loyalUp(ap, K.FIGHT_LOYAL_P, 1, 2);
    if (bp.ko) { // 灵宠本场阵亡：寿命 -20、忠诚 -10；寿命归零则永久死亡
      ap.life = Math.max(0, (typeof ap.life === 'number' ? ap.life : K.PET_LIFE_MAX) - K.PET_DEATH_LIFE);
      ap.loyal = Math.max(0, ap.loyal - K.PET_DEATH_LOYAL);
      res.petDead = true;
      if (ap.life <= 0) { S.pets = (S.pets || []).filter(p => p.id !== ap.id); if (S.pet === ap.id) S.pet = null; res.petGone = true; }
    }
    if (!pk.surrender && !res.petGone) { res.petXp = res.win ? K.PET_XP_WIN : K.PET_XP_LOSE; const pg = petGainXp(ap, res.petXp); res.petUps = pg.ups; res.petSks = pg.sks; res.petTls = pg.tls; for (let i = 0; i < res.petUps; i++) res.loyal += loyalUp(ap, K.LVUP_LOYAL_P, 3, 5); }
  }
  return res;
}
try { (typeof window !== 'undefined' ? window : globalThis).pkSettle = pkSettle; } catch(_) {} // v727 顶层导出pkSettle给script#2用

// v960：本地寄售函数（consignList/consignCancel/consignBuy/consignTick/genMarket）已删除，转线上
Object.assign(C, { fmtN, resLbl, grantStarter, bagCap, itemCap, itemCount, gainItem, rnd, ri, pick, total, pct, todayStr, newState, normalize, announce, MAI_RATE, maiLuo, maiMai, maiMult, maiShuLv, SZ_SEATS, SZ_MER_ORDER, szProg, szSetProg, szVMaiCount, szVMaiPress, szDanCap, szBigCount, maiRMaiEff, szOpenCount, szSmallCount, szFirstDanOpen, szSyncMai, szSeatLitNames, szDan, szLitCnt, drinkMai, synthVMai, synthXPS, synthZPS, synthSPS, synthJPS, useSha, manaCapEff, useMaiPages, MIJING_DAILY, WUXING, wxByK, WX_COST_XIAN, WX_COST_STA, WX_DAILY, WX_FRAG_DROP, wxDailyLeft, wxFragName, wxPowName, wxResName, synthWx, PET_SET, petMatchTxt, petSkillTxt, PET_GEAR, PET_SLOT_NAMES, petActiveSets, equipPetGear, unequipPetGear, sellPetGear, xpNeed, alcNeed, gainXp, levelUp, canLevelUp, doManualLevelUp, manaNeed, useSpirit, smashSpirit, PQLT, petQ, hatchPet, setPet, battleAttrs, petBonusTxt, petFighter, rollPet, activePet, activePets, QNAME, DISHES, GEAR, SLOTS, REFINES, FORMATIONS, TALISMANS, RECIPES, vigorGain, vigorCap, lifeOf, lifeChoiceMax, lifeAttrRate, lifeAttrQ, gainLifeXp, lifeRate, lifeQProbs, craft, eatDish, dishOf, dishSta, refineDouble, gearAdd, gearVal, GEAR_SETS, SET_ITEMS, gearItemName, setCounts, setQuality, SET_QMULT, monTotal, ADV_STEPS, RANKS, RANK_W, EV_TYPES, ADV_EVENTS, advStart, advSharedInit, advSharedHeartbeat, advChoices, advChoose, advAuto, advCtx, advResGrant, advNewEvent, lootTable, lootRoll, lootLabel, rollGear, HAND_EVENTS, advCheckP, fleeP, itemLabel, advDC, manaMax, manaCap, lifeManaCost, useManaPotion, useFali, lifeCost, POTIONS, POT_PCT, potOf, useHpPotion, bestPot, bumpPeak, GQNAME, GQ_SET, GQ_ORE, ORE_RATE, forgeRate, forgeQProbs, setDefBoost, hurtMods, activeSets, fatalStrike, shareAura, playerFighter, equipGear, unequipGear, gearPrice, sellGear, tameBiteMult, tamePetXpChance, hatchProbs, tame, tamePill, feedBeastPill, fightAttrs, PAGES, EXP_BOOKS, LIFE_SKILLS, ADV_LIFE, canAdvLife, skillPageChance, combinePages, useExpBook, combineSkillPages, useSkillBook, sellSkillBook, skillBookPrice, die, leftBeforeDeath, hasSt, addStatus, takePoisonLoss, addPoisonAcc, drainVit, cureStatus, activeStatus, luck, afterAction, petBiteChance, eatFood, useMed, petXpNeed, petGainXp, petAssign, devourPet, smashProbs, SMASH_N, useLu, tierProbs, luProbs, canCheckin, checkinAmount, checkin, train, mine, oreProbs, mineCritChance, sellOre, gather, gatherProbs, gatherCrit, sellItem, eatMeat, spiritChance, spiritProbs, premiumChance, meatChance, meatPerHunt, eggTotal, REALMS, REALM_LIFESPAN, BT_MULT, CHAT_NAMES, CHAT_MSGS, chatPush, chatNpc, chatSend, consignPrice, consignName, REALM_MAX_LV, REINC_CAP, reincBonus, realmTxt, breakthroughRate, breakthrough, thunderTrib, demonTrib, tribPower, tribFull, tribGrade, gradeFromFull, pickTribQuiz, finishTribQuiz, applyFailState, FAIL_STATES, isPermanentlyDegraded, DEGRADE_CHAIN, DEGRADE_FAIL2, useRepair, reincarnate, genRankNPCs, getRankList,
  alcRate, potCountProbs, gradeProbs, brew, brewDetox, brewAntidote, DANWAN, brewDan, useDanwan, useMutPill, useDetoxPill, toxFactor, toxTier, MUT_PILLS, qiNow, qiFactor, qiTierName, qiAdd, buy, invList, invCount, drink, fighter, Battle, aiChoose, canUse, reflects,
  genMonster, genOpponent, adventure, advBattleSetup, advBattleSettle, advEnd, advMove, advRetreat, sneakP, guardedLoot, pkStart, pkSurrender, pkSettle, applyZhenxiu, applyBtSuccess, applyFailState }); // v688 导出突破函数
G.Core = C;
// v1091 跨块导出：块1裸调用的块0函数/表（全游审计 P0+P1：出关 afkExit/afkStart、寄售 consignName/consignStore、寄售列表 MEDS、灵宠突破 petEffLvMax/PET_BREAK_MAX；此前未导出致 ReferenceError）
G.afkExit = afkExit; G.afkStart = afkStart; G.consignName = consignName; G.consignStore = consignStore; G.MEDS = MEDS; G.petEffLvMax = petEffLvMax; G.PET_BREAK_MAX = PET_BREAK_MAX;

// ===== v1006 P1 三件套：定命星 / 本命飞剑 / 法宝规则词条 =====
const DESTINY_STARS = [ {k:'ziwei',n:'紫微星',w:2,t:'命宫主星，气象自华'}, {k:'tanlang',n:'贪狼星',w:10,t:'桃花逢机，欲望生道'}, {k:'pojun',n:'破军星',w:10,t:'开疆破阵，先破后立'}, {k:'qisha',n:'七杀星',w:10,t:'杀伐果断，乱世称雄'}, {k:'tianji',n:'天机星',w:12,t:'机杼在胸，算无遗策'}, {k:'taiyang',n:'太阳星',w:12,t:'光华万丈，坦荡磊落'}, {k:'taiyin',n:'太阴星',w:12,t:'月华内敛，静水流深'}, {k:'jumen',n:'巨门星',w:10,t:'口纳乾坤，是非分明'}, {k:'fanxing',n:'凡星',w:22,t:'命星平平，大道靠走'} ];
function destinyStar(S) { // 定命星：只论命格不论强弱，无任何数值效果
  if (!S.destinyStar) { let tw = 0; for (const d of DESTINY_STARS) tw += d.w; let x = Math.random() * tw, done = false; for (const d of DESTINY_STARS) { x -= d.w; if (x <= 0) { S.destinyStar = d.k; done = true; break; } } if (!done) S.destinyStar = 'fanxing'; }
  return DESTINY_STARS.find(d => d.k === S.destinyStar) || DESTINY_STARS[DESTINY_STARS.length - 1];
}
const SWORD_TAGS = { lei: { n: '雷意', sword: '惊雷', attr: 'str', desc: '剑出如雷，势大力沉' }, he: { n: '河意', sword: '沧浪', attr: 'agi', desc: '剑势如河，连绵不绝' }, shan: { n: '山意', sword: '镇岳', attr: 'def', desc: '剑守如山，不动如钟' } };
function swordBonus(S) { // 本命飞剑战斗加成：每级全属性+1%，剑意主属性另+2%/级
  const b = {}; if (!S.sword || !S.sword.tag) return b; const lv = Math.min(10, S.sword.lv|0); if (lv <= 0) return b;
  for (const k of ATTRS) b[k] = 0.01 * lv; const tg = SWORD_TAGS[S.sword.tag]; if (tg) b[tg.attr] = (b[tg.attr] || 0) + 0.02 * lv; return b;
}
const GEAR_RULES = { bumie: { n: '不灭', d: '每场战斗首次受到致命伤害时，保留 1 点生命' }, shiling: { n: '噬灵', d: '普通攻击击杀敌人时，回复 10% 最大生命' }, lianzhu: { n: '连珠', d: '普通攻击暴击时，追加一击 50% 伤害' }, beishui: { n: '背水', d: '生命低于 30% 时，受到的伤害降低 25%' } };
function equipRules(S) { const out = []; try { for (const sl in (S.equip || {})) { const g = S.equip[sl]; if (g && g.rule && GEAR_RULES[g.rule]) out.push(g.rule); } } catch(_) {} return out; }
Object.assign(C, { DESTINY_STARS, destinyStar, SWORD_TAGS, swordBonus, GEAR_RULES, equipRules });
// ===== v1012 P1 宿命签：轮回随机一签，一正一负，随世生效；轮回次数越高签档越高 =====
const FATE_SIGNS = [
  { k:'danxin', tier:0, n:'丹心命', t:'丹道顺遂，劫火亦盛', mods:{ brew:0.12, trib:0.06 } },
  { k:'dunfeng', tier:0, n:'钝锋命', t:'劫难迟钝，破境亦钝', mods:{ trib:-0.10, break:-0.05 } },
  { k:'wendao', tier:0, n:'稳道命', t:'道心稳固，丹火难驭', mods:{ break:0.06, brew:-0.08 } },
  { k:'jiehuo', tier:1, n:'劫火命', t:'劫火淬体，丹炉易炸', mods:{ trib:-0.15, brew:-0.12 } },
  { k:'pojun2', tier:1, n:'破军命', t:'破境如竹，天威亦重', mods:{ break:0.10, trib:0.10 } },
  { k:'lingquan', tier:1, n:'灵泉命', t:'丹泉涌流，境关迟滞', mods:{ brew:0.18, break:-0.06 } },
  { k:'tiandu', tier:2, n:'天妒命', t:'天资遭妒，破境如飞', mods:{ break:0.15, trib:0.18 } },
  { k:'dansheng', tier:2, n:'丹圣命', t:'丹道通圣，劫数加身', mods:{ brew:0.25, trib:0.12 } },
  { k:'panshi', tier:2, n:'磐石命', t:'劫下磐石，关前迟步', mods:{ trib:-0.22, break:-0.08 } }
];
function fateSignOf(S) { return (S && S.fateSign) ? (FATE_SIGNS.find(f => f.k === S.fateSign) || null) : null; }
function fateMod(S, key) { const f = fateSignOf(S); return (f && f.mods && typeof f.mods[key] === 'number') ? f.mods[key] : 0; }
function fateModText(f) { if (!f || !f.mods) return ''; const L = { brew:'炼丹成功率', trib:'雷劫威力', break:'突破成功率' }; return Object.keys(f.mods).map(k => L[k] + (f.mods[k] > 0 ? ' +' : ' ') + Math.round(f.mods[k] * 100) + '%').join(' · '); }
function drawFateSign(S) { const cnt = (S.sealLife|0); const tier = cnt >= 6 ? 2 : cnt >= 3 ? 1 : 0; const pool = FATE_SIGNS.filter(f => f.tier === tier); const f = pool[Math.floor(Math.random() * pool.length)] || pool[0]; S.fateSign = f.k; return f; }
Object.assign(C, { FATE_SIGNS, fateSignOf, fateMod, fateModText, drawFateSign });
// ===== v1013 炼灵（一念永恒）：装备炼灵耗寿元，每层属性 +5%，10 层满（银纹5/金纹8/紫纹10） =====
function refineMult(g) { return 1 + 0.05 * Math.min(10, (g && g.rl) | 0); }
function refineTierName(rl) { rl |= 0; return rl >= 10 ? '紫纹' : rl >= 8 ? '金纹' : rl >= 5 ? '银纹' : ''; }
function refineCost(S, g) { return 10 * (((g && g.rl) | 0) + 1) * Math.pow(2, S.realm | 0); }
function refineGear(S, loc, key) {
  let g = null;
  if (loc === 'equip') g = S.equip && S.equip[key];
  else g = (S.gearBag || []).find(x => x.id === key) || null;
  if (!g) return { ok: false, err: '无此装备' };
  const rl = g.rl | 0;
  if (rl >= 10) return { ok: false, err: '炼灵已满（紫纹）' };
  const cost = refineCost(S, g);
  if ((S.lifespan || 0) <= cost) return { ok: false, err: '寿元不足（需 ' + cost + ' 年）' };
  S.lifespan -= cost; g.rl = rl + 1;
  return { ok: true, rl: g.rl, cost, tier: refineTierName(g.rl) };
}
Object.assign(C, { refineMult, refineTierName, refineCost, refineGear });
// ===== v1013 全域奇遇：任何行动都可能触发，好坏相半，一环扣一环（加新奇遇=往表里加一行） =====
// sc 场景池（any 通用 / train 修炼 / life 生活 / move 行路 / brew 炼丹 / retreat 闭关 / chain 链中段不直roll）
// fx 词表：gold xianyu lifespan stamina mana danDu curseN maiPages petEggs sp1 sp2 sp3 herb repair
const ENCOUNTERS = [
// ---------- 通用 ----------
{ id:'e_stone', sc:'any', text:'路边一块石头，形状像个元宝。', opts:[
  { t:'搬回家', fx:[['gold',30]], msg:'搬开石头，底下压着 30 金元。' },
  { t:'绕开走', fx:[], msg:'绕开了。走出十步，身后传来石头滚落的声音。' } ]},
{ id:'e_oldwell', sc:'any', text:'一口枯井，井底隐隐有光。', opts:[
  { t:'探头看', fx:[['sp1',2]], msg:'井底卡着 2 块下品灵石，够到了。' },
  { t:'丢块石头', fx:[], msg:'咚的一声，深不见底，你默默离开。', next:'well2' } ]},
{ id:'well2', sc:'chain', end:true, text:'石头落底前，你听见井下有人咳了一声。', opts:[
  { t:'喊一声', fx:[['lifespan',10]], msg:'井底飘上一缕清气入体，寿元 +10 年。原来是位坐枯禅的前辈在借井修行。' },
  { t:'悄悄离开', fx:[], msg:'你放轻脚步离开，不敢打扰。' } ]},
{ id:'e_rain', sc:'any', text:'骤雨忽至，屋檐下挤满了躲雨的人。', opts:[
  { t:'和老者拼伞', fx:[['gold',50]], msg:'老者是退隐的账房，临走塞给你 50 金元的伞钱。' },
  { t:'冒雨赶路', fx:[['stamina',-2]], msg:'淋了个透，体力 -2，但雨里的灵气格外清新。', bad:true } ]},
{ id:'e_beggar', sc:'any', text:'一个老乞丐伸手：行行好，赏口饭吃。', opts:[
  { t:'给 20 金元', fx:[['gold',-20]], msg:'老乞丐千恩万谢，一瘸一拐走了。', next:'beggar2' },
  { t:'不理会', fx:[], msg:'你绕开他，身后传来一声叹息。' } ]},
{ id:'beggar2', sc:'chain', text:'又是那个老乞丐，这次他脚边放着个破碗，碗底有字。', opts:[
  { t:'再给 50', fx:[['gold',-50]], msg:'他接过钱，把破碗推给你：碗底刻着半篇吐纳诀，你默记于心。', next:'beggar3' },
  { t:'蹲下看字', fx:[['curseN',1]], msg:'字看一半，老乞丐收了碗：偷看，要沾因果。诅咒 +1 层。', bad:true } ]},
{ id:'beggar3', sc:'chain', end:true, text:'城外破庙，老乞丐盘坐在蒲团上，气度俨然。', opts:[
  { t:'执弟子礼', fx:[['lifespan',30],['xianyu',1]], msg:'老乞丐拂袖而起：三试皆过。此乃红尘炼心，赠你仙玉 1、寿元 30 年。' },
  { t:'问他是谁', fx:[['gold',200]], msg:'他笑而不答，袖中滑出 200 金元落在你脚边，人已不见。' } ]},
{ id:'e_sword1', sc:'any', text:'草丛里半截断剑，剑身锈迹下有寒光。', opts:[
  { t:'拔出来', fx:[], msg:'断剑入手冰凉，夜里似乎听见它在响。', next:'sword2' },
  { t:'埋了它', fx:[['gold',15]], msg:'刨坑时翻出前人埋的 15 金元。' } ]},
{ id:'sword2', sc:'chain', text:'子时，断剑在匣中轻鸣，像有人在说话。', opts:[
  { t:'以血饲剑', fx:[['lifespan',-5]], msg:'血渗入剑身，剑鸣止。剑中残灵记住了你的气息。', next:'sword3', bad:true },
  { t:'镇纸压住', fx:[], msg:'压了一夜，第二天剑安静如初，只是匣上多了道刻痕。' } ]},
{ id:'sword3', sc:'chain', end:true, text:'满月夜，断剑浮空三寸，残灵显形三息。', opts:[
  { t:'许它新生', fx:[['repair',1]], msg:'残灵散前指向你的丹田：赠你一枚修复灵物，并说：剑虽断，道未断。' },
  { t:'送它往生', fx:[['lifespan',20]], msg:'残灵化光而去，余辉入体，寿元 +20 年。' } ]},
{ id:'e_cat', sc:'any', text:'一只黑猫蹲在墙头，脖子上挂着小铃铛。', opts:[
  { t:'逗它', fx:[['stamina',1]], msg:'黑猫蹭了蹭你的手，心情大好，体力 +1。' },
  { t:'看铃铛', fx:[['danDu',3]], msg:'铃铛是颗化掉的丹，你手上沾了丹毒 +3。', bad:true } ]},
{ id:'e_cart', sc:'any', text:'一辆货车陷进泥里，车夫急得团团转。', opts:[
  { t:'搭把手', fx:[['gold',40],['stamina',-1]], msg:'车推出来了，车夫硬塞 40 金元，你也出了一身汗。' },
  { t:'围观', fx:[], msg:'看了一会儿，车夫自己把车推出来了。' } ]},
{ id:'e_dream', sc:'any', text:'昨夜梦见一条大鱼，醒时枕边有水渍。', opts:[
  { t:'去河边看看', fx:[['sp2',1]], msg:'河滩上搁浅着一块中品灵石，像是鱼吐出来的。' },
  { t:'当个怪梦', fx:[['curseN',1]], msg:'一整天心神不宁，像被什么惦记上了。诅咒 +1 层。', bad:true } ]},
{ id:'e_fox1', sc:'any', text:'灌木丛里一只白狐前腿被捕兽夹夹住，眼里含泪。', opts:[
  { t:'救它', fx:[['stamina',-1]], msg:'你掰开夹子，白狐回头看了你三眼，窜入林中。', next:'fox2' },
  { t:'离开', fx:[], msg:'你绕开了。有些缘分，错过就错过了。' } ]},
{ id:'fox2', sc:'chain', text:'夜里窗外有轻叩声，一只白狐衔着个果子蹲在窗台。', opts:[
  { t:'接过果子', fx:[['lifespan',15]], msg:'朱果入腹，暖流遍体，寿元 +15 年。白狐点头而去。', next:'fox3' },
  { t:'挥手赶它', fx:[], msg:'白狐放下果子走了。果子三天后烂了，你有点后悔。' } ]},
{ id:'fox3', sc:'chain', end:true, text:'月圆之夜，白狐在你门口放了三样东西：一颗丹、一封信、一根簪。', opts:[
  { t:'取丹', fx:[['petEggs',1]], msg:'不是丹，是颗温热的灵宠蛋。狐仙的谢礼，向来出人意料。' },
  { t:'读信', fx:[['maiPages',1]], msg:'信上只有一张脉络残页和一句话：恩已还，勿念。' } ]},
{ id:'e_monk', sc:'any', text:'游方僧化缘，钵里只有半块干饼。', opts:[
  { t:'分他干粮', fx:[['lifespan',8]], msg:'僧人合十：施主有善根。说完你的肩头轻了些，寿元 +8 年。' },
  { t:'问路', fx:[], msg:'僧人指了路，又赠你四个字：慢即是快。' } ]},
{ id:'e_chess', sc:'any', text:'茶摊上有盘残局，摊主说：破了这局，茶水免费。', opts:[
  { t:'试一手', fx:[['gold',60]], msg:'你落子如飞，摊主拍案：等了三年了！赏金 60 元。' },
  { t:'喝茶看棋', fx:[['stamina',-1]], msg:'看入了迷，回过神茶钱翻倍。体力 -1。', bad:true } ]},
{ id:'e_paper', sc:'any', text:'风卷来一张黄纸，贴在你的腿上揭不下来。', opts:[
  { t:'撕下来看', fx:[['curseN',1]], msg:'是张过期的悬赏令，撕下时沾了晦气。诅咒 +1 层。', bad:true },
  { t:'带着走', fx:[['gold',45]], msg:'走到市集，纸自己掉了，有人捡去兑了赏金，分你一半 45 元。' } ]},
{ id:'e_inn', sc:'any', text:'客栈只剩一间房，另一个赶考的书生也在等。', opts:[
  { t:'让给他', fx:[['lifespan',12]], msg:'书生感激不尽，说他日高中必报。这一夜你睡在柴房，却睡得格外安稳，寿元 +12 年。' },
  { t:'先到先得', fx:[['stamina',2]], msg:'你住了上房，一觉到天亮，体力 +2。' } ]},
{ id:'e_child', sc:'any', text:'一个孩童蹲在路边哭，说他的风筝挂树上了。', opts:[
  { t:'帮他取', fx:[['gold',25]], msg:'孩童的娘赶来，硬塞了 25 金元的谢礼。' },
  { t:'给他买个新的', fx:[['gold',-15]], msg:'孩童破涕为笑，笑声传出去很远。你觉得值。' } ]},
{ id:'e_omen', sc:'any', text:'乌鸦在头顶盘旋三圈，叫了四声。', opts:[
  { t:'改道', fx:[], msg:'改道多走了一刻钟，一路无话。' },
  { t:'照常走', fx:[['gold',-40]], msg:'踩塌了猎户的陷阱盖，赔了 40 金元修陷阱。', bad:true } ]},
{ id:'e_scroll', sc:'any', text:'旧书摊上，一本无名册子被压在最底下。', opts:[
  { t:'买下', fx:[['gold',-30],['maiPages',1]], msg:'册子里夹着一张脉络残页，摊主没发现。' },
  { t:'翻两页', fx:[], msg:'全是账本流水，你放下了。' } ]},
{ id:'e_drunk', sc:'any', text:'醉汉抱着酒坛睡在路中间，酒香里有药香。', opts:[
  { t:'闻一闻', fx:[['danDu',4]], msg:'是药酒蒸汽，闻多了头晕，丹毒 +4。', bad:true },
  { t:'扶他到路边', fx:[['sp1',3]], msg:'醉汉怀里掉出 3 块下品灵石，你捡起来放回他兜里——他摆摆手说赏你了。' } ]},
{ id:'e_bee', sc:'any', text:'一窝野蜂在你必经的树洞里，蜂蜜晶莹。', opts:[
  { t:'掏一把', fx:[['stamina',-3],['gold',35]], msg:'被蛰了三口，但这把蜜卖了 35 金元。体力 -3。', bad:true },
  { t:'绕路', fx:[], msg:'绕开蜂窝，多走二里地。' } ]},
{ id:'e_bell', sc:'any', text:'远山有钟声，数了数，十三下。', opts:[
  { t:'凝神听完', fx:[['mana',20]], msg:'钟声涤荡心神，法力 +20。' },
  { t:'捂住耳朵', fx:[], msg:'钟声停了，你总觉得错过了什么。' } ]},
// ---------- 修炼 ----------
{ id:'t_bottleneck', sc:'train', text:'修炼到滞涩处，耳边似有水声。', opts:[
  { t:'顺水推舟', fx:[['mana',30]], msg:'滞涩忽通，法力 +30。' },
  { t:'强行冲关', fx:[['danDu',5]], msg:'经脉一阵刺痛，丹毒 +5。今日不宜。', bad:true } ]},
{ id:'t_butterfly', sc:'train', text:'一只蝶落在你膝头，翅上有字纹。', opts:[
  { t:'静观', fx:[['lifespan',6]], msg:'蝶去时，你的呼吸慢了下来，寿元 +6 年。' },
  { t:'伸手捉', fx:[], msg:'蝶飞了，字纹没看清。' } ]},
{ id:'t_oldpine', sc:'train', text:'古松下打坐，松针落了你满身。', opts:[
  { t:'收几根松针', fx:[['herb',2]], msg:'松针入药正好，得药草 2 株。' },
  { t:'继续入定', fx:[['mana',15]], msg:'入定三寸，法力 +15。' } ]},
{ id:'t_stoneinsc', sc:'train', text:'崖壁上有前人刻的半行字：道在……', opts:[
  { t:'猜下半句', fx:[['curseN',1]], msg:'猜了一夜没睡，神思恍惚。诅咒 +1 层。', bad:true },
  { t:'刻个印记离开', fx:[['gold',20]], msg:'后来有人悬赏这处刻字的位置，你的印记卖了 20 金元。' } ]},
{ id:'t_twobirds', sc:'train', text:'两只灵雀在你头顶打架，掉下根羽毛。', opts:[
  { t:'拾羽', fx:[['sp1',1]], msg:'羽毛里裹着 1 块下品灵石，不知哪只的私房。' },
  { t:'劝架', fx:[['stamina',-1]], msg:'被啄了两口。体力 -1。', bad:true } ]},
{ id:'t_fog', sc:'train', text:'雾起时，雾里有人影盘坐，与你相对。', opts:[
  { t:'对坐', fx:[['mana',40]], msg:'雾散时对面无人，你的法力涨了 40。' },
  { t:'出声问', fx:[], msg:'雾立刻散了。有些机缘，出声就破。' } ]},
{ id:'t_ant', sc:'train', text:'一队蚂蚁绕着你打坐的地方排成个圆。', opts:[
  { t:'看它们走完', fx:[['lifespan',5]], msg:'圆闭合时你心有所感，寿元 +5 年。' },
  { t:'起身', fx:[], msg:'圆散了，蚂蚁各忙各的。' } ]},
{ id:'t_heartdemon', sc:'train', text:'入定中，听见另一个自己在耳边说话。', opts:[
  { t:'不理它', fx:[['mana',25]], msg:'声音渐消，法力 +25。心魔这一局，没赢你。' },
  { t:'跟它聊聊', fx:[['curseN',1]], msg:'聊到天亮，它说：下次见。诅咒 +1 层。', bad:true } ]},
// ---------- 生活 ----------
{ id:'l_herbfind', sc:'life', text:'收拾药篓时，篓底压着株没见过的草。', opts:[
  { t:'收起来', fx:[['herb',3]], msg:'是味偏门药草，得 3 株。' },
  { t:'扔了', fx:[], msg:'扔完想起来，好像挺值钱。算了。' } ]},
{ id:'l_merchant', sc:'life', text:'收摊的货郎问你：有一批急货，接不接？', opts:[
  { t:'接', fx:[['gold',80],['stamina',-2]], msg:'忙到半夜，净赚 80 金元，体力 -2。' },
  { t:'不接', fx:[], msg:'货郎摇头走了，说你错过了行情。' } ]},
{ id:'l_spill', sc:'life', text:'手一滑，一瓢水泼在材料上。', opts:[
  { t:'抢救', fx:[['gold',-25]], msg:'救回大半，还是损了 25 金元的材料。', bad:true },
  { t:'将错就错', fx:[['sp1',2]], msg:'水里泡出了灵性，凝出 2 块下品灵石。祸兮福所倚。' } ]},
{ id:'l_apprentice', sc:'life', text:'一个少年来拜师，眼睛亮得惊人。', opts:[
  { t:'收下打杂', fx:[['gold',55]], msg:'少年手脚麻利，摊子多卖了 55 金元。' },
  { t:'指点两句打发', fx:[['lifespan',7]], msg:'少年跪谢而去。你忽然觉得，传道也是修行，寿元 +7 年。' } ]},
{ id:'l_rust', sc:'life', text:'工具上一层锈，锈的形状像地图。', opts:[
  { t:'按图找找', fx:[['sp2',1]], msg:'在后院老井边挖出 1 块中品灵石。' },
  { t:'磨掉', fx:[['stamina',-1]], msg:'磨了半天，工具锃亮，手也酸了。体力 -1。', bad:true } ]},
{ id:'l_neighbor', sc:'life', text:'邻摊的老板娘送来一碗汤，说你脸色不好。', opts:[
  { t:'喝了', fx:[['stamina',3]], msg:'汤里有人参须，体力 +3。' },
  { t:'回赠灵石', fx:[['sp1',-1],['gold',40]], msg:'老板娘回赠一包她炒的灵豆，卖了 40 金元。' } ]},
{ id:'l_wronggoods', sc:'life', text:'客人拿错了货，回来时多提了一兜东西。', opts:[
  { t:'收下', fx:[['herb',2]], msg:'是一兜新鲜药草，2 株。客人说拿错是缘分。' },
  { t:'追还回去', fx:[['gold',30]], msg:'客人感激，给了 30 金元的跑腿费。' } ]},
{ id:'l_daydream', sc:'life', text:'忙里偷闲，你望着云发了会儿呆。', opts:[
  { t:'继续呆', fx:[['mana',18]], msg:'云卷云舒，法力 +18。' },
  { t:'干活', fx:[['gold',35]], msg:'一下午没停手，多赚 35 金元。' } ]},
// ---------- 行路 ----------
{ id:'m_fork', sc:'move', text:'岔路口有块界碑，一面写着近，一面写着静。', opts:[
  { t:'走近路', fx:[['gold',-20]], msg:'近路有收费的关卡，交了 20 金元。', bad:true },
  { t:'走静路', fx:[['lifespan',9]], msg:'静路上鸟鸣啾啾，走完神清气爽，寿元 +9 年。' } ]},
{ id:'m_bridge', sc:'move', text:'独木桥中央坐着位老者，在钓鱼。', opts:[
  { t:'等他收竿', fx:[['sp2',1]], msg:'老者钓起条银鱼，顺手赠你 1 块中品灵石压竿。' },
  { t:'侧身挤过去', fx:[['stamina',-2]], msg:'差点掉河里，体力 -2。', bad:true } ]},
{ id:'m_footprint', sc:'move', text:'雪地上一串脚印，到一棵树下忽然没了。', opts:[
  { t:'上树看看', fx:[['petEggs',1]], msg:'树杈上有个窝，窝里一颗灵宠蛋还温着。' },
  { t:'绕树三匝', fx:[['curseN',1]], msg:'绕完头晕，像被什么标记了。诅咒 +1 层。', bad:true } ]},
{ id:'m_tea', sc:'move', text:'山道茶棚，瞎眼婆婆说：茶钱随喜。', opts:[
  { t:'给 10 元', fx:[['gold',-10],['stamina',3]], msg:'茶极香，体力 +3。婆婆说：你印堂亮，要走运了。' },
  { t:'喝白水', fx:[], msg:'白水也解渴。婆婆笑而不语。' } ]},
{ id:'m_storm', sc:'move', text:'山风骤起，飞沙里有什么在闪。', opts:[
  { t:'迎风去捡', fx:[['sp3',1],['stamina',-2]], msg:'是块上品灵石！也被沙打了满脸，体力 -2。' },
  { t:'背风躲避', fx:[], msg:'风停后，闪光的东西已经不见了。' } ]},
{ id:'m_injured', sc:'move', text:'路边躺着个受伤的散修，伤口发黑。', opts:[
  { t:'救他', fx:[['herb',-2],['repair',1]], msg:'耗了 2 株药草。他醒后留下一枚修复灵物：渡劫失败的人，最懂这东西的贵重。' },
  { t:'留药离开', fx:[['herb',-1]], msg:'你留下 1 株药草，成不成看他造化。' } ]},
{ id:'m_lost', sc:'move', text:'雾里走岔了，来到一处从没见过的山谷。', opts:[
  { t:'逛逛', fx:[['sp1',3]], msg:'谷里灵石裸露，捡了 3 块下品。' },
  { t:'原路返回', fx:[['stamina',-2]], msg:'摸黑走回大路，体力 -2。', bad:true } ]},
{ id:'m_shrine', sc:'move', text:'路边小庙，神像的眼睛是活的。', opts:[
  { t:'上柱香', fx:[['lifespan',11]], msg:'香烟笔直上升，寿元 +11 年。' },
  { t:'盯回去', fx:[['curseN',1]], msg:'对视三息，你先败下阵来。诅咒 +1 层。', bad:true } ]},
// ---------- 炼丹 ----------
{ id:'b_smell', sc:'brew', text:'丹炉里飘出的香气不对，甜里带苦。', opts:[
  { t:'开炉看', fx:[['danDu',4]], msg:'火候过了，吸入丹毒 +4。这一炉废了半炉。', bad:true },
  { t:'压火候', fx:[['sp1',1]], msg:'压住了。炉底凝出 1 块下品灵石，是药渣里的灵气。' } ]},
{ id:'b_oldrecipe', sc:'brew', text:'垫炉脚的砖上，刻着半张古丹方。', opts:[
  { t:'记下来', fx:[['maiPages',1]], msg:'丹方残篇的笔法，竟与脉络残页同源。收录 1 张。' },
  { t:'垫回去', fx:[], msg:'砖归原位。有些东西，看见即是缘，拿走即是债。' } ]},
{ id:'b_mouse', sc:'brew', text:'一只灵鼠蹲在药柜上，抱着你的药草啃。', opts:[
  { t:'赶它', fx:[['herb',-2]], msg:'它叼走 2 株药草跑了。', bad:true },
  { t:'喂它', fx:[['herb',-1],['petEggs',1]], msg:'灵鼠吃饱，从柜顶推下一颗灵宠蛋谢你。' } ]},
{ id:'b_thunder', sc:'brew', text:'炼丹到一半，远处有雷声滚过。', opts:[
  { t:'借雷炼丹', fx:[['danDu',-3]], msg:'雷意涤荡丹毒，丹毒 -3。这一炉丹香三里。' },
  { t:'停火避雷', fx:[['stamina',-1]], msg:'等雷过去，丹也凉透了。体力 -1。', bad:true } ]},
{ id:'b_visitor', sc:'brew', text:'有人敲门求丹，说他家老爷子等着救命。', opts:[
  { t:'赠一颗', fx:[['lifespan',13]], msg:'三日后家属来谢，说老爷子醒了。你觉着寿元都长了些，+13 年。' },
  { t:'按市价卖', fx:[['gold',90]], msg:'对方倾囊而出，90 金元。临走深深一揖。' } ]},
{ id:'b_ash', sc:'brew', text:'炉灰里扒出一颗没化尽的丹，乌黑发亮。', opts:[
  { t:'收起来', fx:[['danDu',2],['gold',65]], msg:'黑丹卖了 65 金元，就是手上丹毒 +2 搓不掉。', bad:true },
  { t:'埋了', fx:[], msg:'埋进土里，来年那处草长得格外旺。' } ]},
// ---------- 闭关 ----------
{ id:'r_tick', sc:'retreat', text:'闭关中，听见洞外有幼兽呜咽。', opts:[
  { t:'出洞看看', fx:[['petEggs',1]], msg:'一只被弃的幼兽蜷在洞口，你收下了它的蛋——它把蛋推给了你，转身跑了。' },
  { t:'不理', fx:[['mana',20]], msg:'呜咽渐远，你的心境反而沉了下来，法力 +20。' } ]},
{ id:'r_wall', sc:'retreat', text:'洞壁渗水，水痕像个小人盘坐。', opts:[
  { t:'对痕打坐', fx:[['lifespan',14]], msg:'水痕干了又湿，你的寿元 +14 年。' },
  { t:'堵住渗水', fx:[['stamina',-1]], msg:'堵了半日，道袍湿透。体力 -1。', bad:true } ]},
{ id:'r_echo', sc:'retreat', text:'你在洞里咳了一声，回声咳了两声。', opts:[
  { t:'再咳一声', fx:[['curseN',1]], msg:'回声笑了。诅咒 +1 层。这一关，闭得不安生。', bad:true },
  { t:'闭目塞听', fx:[['mana',22]], msg:'到出关，回声再没出现。法力 +22。' } ]},
{ id:'r_herb2', sc:'retreat', text:'出关时，洞口石缝里长出一株没见过的草。', opts:[
  { t:'采了', fx:[['herb',2]], msg:'守关草，得 2 株。' },
  { t:'留着', fx:[['lifespan',6]], msg:'留它继续长。你的心境，也像留了根，寿元 +6 年。' } ]},
{ id:'r_snr', sc:'retreat', text:'隔壁洞府的呼噜声穿墙而来，极有韵律。', opts:[
  { t:'和着韵律吐纳', fx:[['mana',35]], msg:'一夜吐纳抵三日，法力 +35。' },
  { t:'敲墙', fx:[], msg:'呼噜停了，又起了。你叹了口气。' } ]},
{ id:'r_time', sc:'retreat', text:'这一关，你总觉得时间比外面慢。', opts:[
  { t:'顺势深修', fx:[['lifespan',18]], msg:'出关时须发长了一截，寿元 +18 年。' },
  { t:'提前出关', fx:[['gold',30]], msg:'省下的时间拿去摆了半日摊，赚 30 金元。' } ]}
];
const ENC_EXTRA = {}; // v1094 玩家奇遇：服务端已通过投稿（运行时注册，供 encById/chooseEncOpt 复用）
function encById(id) { return ENCOUNTERS.find(e => e.id === id) || ENC_EXTRA[id] || null; }
function encToday() { const d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
function rollEncounter(S) {
  if (!S || S.dead || S.encPending) return null;
  const today = encToday();
  if (!S.encDay || S.encDay.d !== today) S.encDay = { d: today, n: 0 };
  if (S.encDay.n >= 3) return null;
  const _skyK = skyToday().key; const _rate = _skyK === 'meteor' ? 0.06 : _skyK === 'gale' ? 0.045 : 0.03; // v1015 天象
  if (Math.random() >= _rate) return null;
  const pool = ENCOUNTERS.filter(e => e.sc !== 'chain');
  if (!pool.length) return null;
  let tw = 0; for (const e of pool) tw += e.w || 1;
  let x = Math.random() * tw, pick = pool[0];
  for (const e of pool) { x -= e.w || 1; if (x <= 0) { pick = e; break; } }
  S.encPending = pick.id; S.encDay.n++; S.encDepth = 0;
  return pick;
}
function applyEncFx(S, fx) {
  for (const pair of (fx || [])) {
    const k = pair[0], v = pair[1] | 0;
    if (k === 'gold') S.gold = Math.max(0, (S.gold | 0) + v);
    else if (k === 'xianyu') S.xianyu = Math.max(0, (S.xianyu | 0) + v);
    else if (k === 'lifespan') S.lifespan = Math.max(1, (S.lifespan || 0) + v);
    else if (k === 'stamina') S.stamina = Math.max(0, (S.stamina || 0) + v);
    else if (k === 'mana') S.mana = Math.max(0, (S.mana || 0) + v);
    else if (k === 'danDu') S.danDu = Math.max(0, (S.danDu | 0) + v);
    else if (k === 'curseN') S.curseN = Math.max(0, (S.curseN | 0) + v);
    else if (k === 'maiPages') S.maiPages = Math.max(0, (S.maiPages | 0) + v);
    else if (k === 'petEggs') S.petEggs = Math.max(0, (S.petEggs | 0) + v);
    else if (k === 'sp1' || k === 'sp2' || k === 'sp3') { S.ores = S.ores || {}; S.ores[k] = Math.max(0, (S.ores[k] | 0) + v); }
    else if (k === 'herb') { S.mats = S.mats || {}; const _hks = ['h_str', 'h_agi', 'h_def', 'h_vit', 'h_int']; if (v >= 0) { const hk = _hks[Math.floor(Math.random() * 5)]; S.mats[hk] = (S.mats[hk] | 0) + v; } else { let _need = -v; for (const hk of _hks) { if (!_need) break; const _take = Math.min(S.mats[hk] | 0, _need); S.mats[hk] = (S.mats[hk] | 0) - _take; _need -= _take; } } }
    else if (k === 'repair') { S.inv = S.inv || {}; const rk = 'repair' + Math.min(11, Math.max(0, S.realm | 0)); S.inv[rk] = (S.inv[rk] | 0) + v; }
  }
}
function chooseEncOpt(S, i) {
  const e = encById(S.encPending);
  if (!e) { S.encPending = null; return null; }
  const o = e.opts[i] || e.opts[0];
  if (!o) { S.encPending = null; return null; }
  applyEncFx(S, o.fx);
  S.encTotal = (S.encTotal | 0) + 1;
  if (o.bad) S.encBad = (S.encBad | 0) + 1;
  S.encSeen = S.encSeen || {}; S.encSeen[e.id] = 1;
  let next = null;
  if (o.next && encById(o.next)) { S.encPending = o.next; S.encDepth = (S.encDepth | 0) + 1; next = encById(o.next); }
  else { if (e.end && (S.encDepth | 0) >= 1) { S.encChain = (S.encChain | 0) + 1; try { if (typeof addFame === 'function') addFame(5, '走完奇遇链'); if (typeof addMerit === 'function') addMerit(3, '奇遇行善'); } catch(_){} } else { try { if (typeof addFame === 'function') addFame(1, '历奇遇'); } catch(_){} } S.encPending = null; S.encDepth = 0; }
  return { msg: o.msg || '', bad: !!o.bad, next };
}
Object.assign(C, { ENCOUNTERS, encById, rollEncounter, chooseEncOpt, encRegister: e => { if (e && e.id) ENC_EXTRA[e.id] = e; } });
// ===== v1015 天象：按日期种子全服一致，只显现象、数值藏起 =====
const SKY_KINDS = [
  { key: 'calm', w: 50, name: '天清地宁', desc: '寻常一日' },
  { key: 'tide', w: 16, name: '灵气潮汐', desc: '灵气涌动，丹炉格外听话' },
  { key: 'blood', w: 10, name: '血月当空', desc: '月色如血，天威更盛' },
  { key: 'meteor', w: 14, name: '流星如雨', desc: '星雨之夜，奇遇频生' },
  { key: 'gale', w: 10, name: '罡风过境', desc: '罡风猎猎，路上不太平' }
];
function skyToday() {
  const d = new Date(); const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  let x = seed % 2147483647; if (x <= 0) x += 2147483646;
  x = (x * 16807) % 2147483647; x = (x * 16807) % 2147483647;
  let tw = 0; for (const k of SKY_KINDS) tw += k.w;
  let r = (x % 10000) / 10000 * tw;
  for (const k of SKY_KINDS) { r -= k.w; if (r < 0) return k; }
  return SKY_KINDS[0];
}
Object.assign(C, { skyToday, SKY_KINDS });


try { G._bx = { Battle: Battle, fighter: fighter, playerFighter: playerFighter, fightAttrs: fightAttrs, tribPower: tribPower, ATTRS: ATTRS }; } catch(_){}
C.thunderCloud = function(S) { // v687 6档黑云
  try {
    const _f = (typeof tribFull === 'function' ? tribFull(S) : 0) || 0;
    const _b = (e) => '<span style="filter:brightness(0)">' + e + '</span>';
    if (_f >= 29) return _b('🫯'); // v1172 圆满极限（门槛随新压条阶梯）
    if (_f >= 24) return _b('⛈️'); // 圆满
    if (_f >= 17) return _b('🌩️'); // 完美
    if (_f >= 11) return _b('🌫️'); // 上品
    if (_f >= 5) return _b('🌧️'); // 中品
    return _b('☁️'); // 下品
  } catch(_) { return '<span style="filter:brightness(0)">🌩️</span>'; }
};
C.startThunderBattle = function(S, trib, fromRealm, pwOverride) {
  const fa = fightAttrs(S, false);
  const pw = (pwOverride != null ? pwOverride : tribPower(S)) * (1 + fateMod(S, 'trib')) * (S.tabooAwake ? 0.95 : 1);
  const tattrs = {}; ATTRS.forEach(k => tattrs[k] = Math.max(1, Math.round(fa[k] * 0.5 * pw)));
  const thunder = fighter('⚡雷云', tattrs, false, []);
  const b = new Battle(playerFighter(S, false), thunder);
  b.unlimited = true;
  const _G = (typeof G!=='undefined'?G:window);
  _G.pk = { battle: b, adv: true, trib: 'thunder', tribData: { trib: trib, fromRealm: fromRealm, pw: pw } };
  try { _G.closeSheet(); } catch(_){}
  try { _G.afterAct(); } catch(_){}
  try { _G.save(); } catch(_){}
  try { _G.render(); } catch(_){}
  try { (typeof window !== 'undefined' ? window : globalThis).pkSettle = pkSettle; } catch(_){} // v713 导出pkSettle给script#2用
}; // v682 用G调全局函数
})(typeof window !== 'undefined' ? window : globalThis);
window.__ok_core=1;
