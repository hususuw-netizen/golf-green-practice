const APP_PAGES = [
  { id: "course", label: "球場", panelId: "coursePage" },
  { id: "play", label: "紀錄桿數", panelId: "playPage" },
  { id: "summary", label: "總表", panelId: "summaryPage" },
  { id: "score-play", label: "紀錄桿數", panelId: "scorePlayPage" },
  { id: "score-summary", label: "總表", panelId: "scoreSummaryPage" },
  { id: "history", label: "歷史紀錄", panelId: "historyPage" }
];

const COURSES = [
  {
    id: "palm-lake",
    name: "棕梠湖球場",
    tees: [
      {
        id: "white",
        name: "White tee",
        holes: [
          { hole: 1, distance: 495, par: 5 },
          { hole: 2, distance: 390, par: 4 },
          { hole: 3, distance: 154, par: 3 },
          { hole: 4, distance: 314, par: 4 },
          { hole: 5, distance: 341, par: 4 },
          { hole: 6, distance: 180, par: 3 },
          { hole: 7, distance: 374, par: 4 },
          { hole: 8, distance: 485, par: 5 },
          { hole: 9, distance: 397, par: 4 },
          { hole: 10, distance: 359, par: 4 },
          { hole: 11, distance: 390, par: 4 },
          { hole: 12, distance: 408, par: 4 },
          { hole: 13, distance: 567, par: 5 },
          { hole: 14, distance: 173, par: 3 },
          { hole: 15, distance: 410, par: 4 },
          { hole: 16, distance: 363, par: 4 },
          { hole: 17, distance: 149, par: 3 },
          { hole: 18, distance: 478, par: 5 }
        ]
      },
      {
        id: "red",
        name: "Red tee",
        holes: [
          { hole: 1, distance: 429, par: 5 },
          { hole: 2, distance: 357, par: 4 },
          { hole: 3, distance: 100, par: 3 },
          { hole: 4, distance: 253, par: 4 },
          { hole: 5, distance: 282, par: 4 },
          { hole: 6, distance: 126, par: 3 },
          { hole: 7, distance: 319, par: 4 },
          { hole: 8, distance: 425, par: 5 },
          { hole: 9, distance: 361, par: 4 },
          { hole: 10, distance: 306, par: 4 },
          { hole: 11, distance: 317, par: 4 },
          { hole: 12, distance: 360, par: 4 },
          { hole: 13, distance: 510, par: 5 },
          { hole: 14, distance: 141, par: 3 },
          { hole: 15, distance: 332, par: 4 },
          { hole: 16, distance: 302, par: 4 },
          { hole: 17, distance: 75, par: 3 },
          { hole: 18, distance: 426, par: 5 }
        ]
      }
    ]
  },
  {
    id: "north-bay",
    name: "北海球場",
    tees: [
      {
        id: "white",
        name: "White tee",
        holes: [
          { hole: 1, distance: 366, par: 4 },
          { hole: 2, distance: 391, par: 4 },
          { hole: 3, distance: 178, par: 3 },
          { hole: 4, distance: 353, par: 4 },
          { hole: 5, distance: 531, par: 5 },
          { hole: 6, distance: 187, par: 3 },
          { hole: 7, distance: 399, par: 4 },
          { hole: 8, distance: 501, par: 5 },
          { hole: 9, distance: 403, par: 4 },
          { hole: 10, distance: 533, par: 5 },
          { hole: 11, distance: 157, par: 3 },
          { hole: 12, distance: 413, par: 4 },
          { hole: 13, distance: 420, par: 4 },
          { hole: 14, distance: 399, par: 4 },
          { hole: 15, distance: 185, par: 3 },
          { hole: 16, distance: 291, par: 4 },
          { hole: 17, distance: 400, par: 4 },
          { hole: 18, distance: 525, par: 5 }
        ]
      },
      {
        id: "red",
        name: "Red tee",
        holes: [
          { hole: 1, distance: 316, par: 4 },
          { hole: 2, distance: 350, par: 4 },
          { hole: 3, distance: 136, par: 3 },
          { hole: 4, distance: 238, par: 4 },
          { hole: 5, distance: 481, par: 5 },
          { hole: 6, distance: 110, par: 3 },
          { hole: 7, distance: 333, par: 4 },
          { hole: 8, distance: 398, par: 5 },
          { hole: 9, distance: 384, par: 4 },
          { hole: 10, distance: 487, par: 5 },
          { hole: 11, distance: 138, par: 3 },
          { hole: 12, distance: 388, par: 4 },
          { hole: 13, distance: 323, par: 4 },
          { hole: 14, distance: 337, par: 4 },
          { hole: 15, distance: 150, par: 3 },
          { hole: 16, distance: 273, par: 4 },
          { hole: 17, distance: 331, par: 4 },
          { hole: 18, distance: 444, par: 5 }
        ]
      }
    ]
  }
];

const DEFAULT_COURSE_ID = COURSES[0].id;
const DEFAULT_TEE_ID = COURSES[0].tees[0].id;
const DEFAULT_MODE = "simulation";
const SCORE_MODE_COURSE_ID = "score-only";
const USER_INDEX_KEY = "golf-users-index";
const CURRENT_USER_KEY = "golf-current-user";

const state = {
  activeAppPage: "course",
  isMenuOpen: false,
  pendingMode: DEFAULT_MODE,
  pendingCourseId: DEFAULT_COURSE_ID,
  pendingTeeId: DEFAULT_TEE_ID,
  page: "front",
  selectedHoleIndex: 0,
  scorePage: "front",
  scoreSelectedHoleIndex: 0,
  selectedRoundId: "",
  roundSaveMode: "full",
  scoreRoundSaveMode: "full",
  isCourseDetailsOpen: false,
  isGreenDepthOpen: false,
  isShotListExpanded: false,
  isRoundHistoryExpanded: false,
  isSimulationHistoryExpanded: false,
  isScoreHistoryExpanded: false,
  saveHoleNextHint: "",
  scoreSaveHoleNextHint: "",
  historyNotice: "",
  profile: {
    username: "",
    selectedMode: DEFAULT_MODE,
    selectedCourseId: DEFAULT_COURSE_ID,
    selectedTeeId: DEFAULT_TEE_ID
  },
  courses: {},
  scoreHoles: [],
  rounds: []
};

const elements = {
  heroPanel: document.getElementById("heroPanel"),
  loginPanel: document.getElementById("loginPanel"),
  appPanel: document.getElementById("appPanel"),
  currentPageTitle: document.getElementById("currentPageTitle"),
  backButton: document.getElementById("backButton"),
  menuButton: document.getElementById("menuButton"),
  closeMenuButton: document.getElementById("closeMenuButton"),
  menuOverlay: document.getElementById("menuOverlay"),
  menuDrawer: document.getElementById("menuDrawer"),
  appTabs: document.getElementById("appTabs"),
  appPages: Array.from(document.querySelectorAll(".app-page")),
  usernameInput: document.getElementById("usernameInput"),
  loginButton: document.getElementById("loginButton"),
  loginMessage: document.getElementById("loginMessage"),
  welcomeText: document.getElementById("welcomeText"),
  logoutButton: document.getElementById("logoutButton"),
  profileMessage: document.getElementById("profileMessage"),
  exportResult: document.getElementById("exportResult"),
  modeTabs: Array.from(document.querySelectorAll(".mode-tab")),
  courseSelect: document.getElementById("courseSelect"),
  teeTabs: Array.from(document.querySelectorAll(".tee-tab")),
  courseDetailsButton: document.getElementById("courseDetailsButton"),
  confirmCourseButton: document.getElementById("confirmCourseButton"),
  courseDetailsPanel: document.getElementById("courseDetailsPanel"),
  courseDetailsList: document.getElementById("courseDetailsList"),
  holeList: document.getElementById("holeList"),
  holeSelectorSubtitle: document.getElementById("holeSelectorSubtitle"),
  tabs: Array.from(document.querySelectorAll(".hole-page-tab")),
  editorTitle: document.getElementById("editorTitle"),
  parValue: document.getElementById("parValue"),
  distanceValue: document.getElementById("distanceValue"),
  toggleGreenDepthButton: document.getElementById("toggleGreenDepthButton"),
  greenDepthPanel: document.getElementById("greenDepthPanel"),
  toggleShotListButton: document.getElementById("toggleShotListButton"),
  greenDepthInput: document.getElementById("greenDepthInput"),
  shotDistanceInput: document.getElementById("shotDistanceInput"),
  shotDistanceError: document.getElementById("shotDistanceError"),
  confirmShotButton: document.getElementById("confirmShotButton"),
  resetHoleButton: document.getElementById("resetHoleButton"),
  shotList: document.getElementById("shotList"),
  emptyShotNote: document.getElementById("emptyShotNote"),
  saveHoleRecordButton: document.getElementById("saveHoleRecordButton"),
  saveHoleHint: document.getElementById("saveHoleHint"),
  saveHoleNextHint: document.getElementById("saveHoleNextHint"),
  goSummaryButton: document.getElementById("goSummaryButton"),
  overviewTitle: document.getElementById("overviewTitle"),
  overviewList: document.getElementById("overviewList"),
  totalShotsValue: document.getElementById("totalShotsValue"),
  saveRoundButton: document.getElementById("saveRoundButton"),
  roundSaveModeTabs: Array.from(document.querySelectorAll(".round-mode-tab")),
  roundSaveStatusValue: document.getElementById("roundSaveStatusValue"),
  roundSaveCourseValue: document.getElementById("roundSaveCourseValue"),
  saveRoundMessage: document.getElementById("saveRoundMessage"),
  toggleRoundHistoryButton: document.getElementById("toggleRoundHistoryButton"),
  recentRoundsList: document.getElementById("recentRoundsList"),
  recentRoundsEmpty: document.getElementById("recentRoundsEmpty"),
  scoreTabs: Array.from(document.querySelectorAll(".score-hole-page-tab")),
  scoreHoleList: document.getElementById("scoreHoleList"),
  scoreHoleSelectorSubtitle: document.getElementById("scoreHoleSelectorSubtitle"),
  scoreEditorTitle: document.getElementById("scoreEditorTitle"),
  scoreParValue: document.getElementById("scoreParValue"),
  scoreShotPresetGrid: document.getElementById("scoreShotPresetGrid"),
  scoreShotPresetButtons: Array.from(document.querySelectorAll(".score-shot-preset[data-score-shot]")),
  scoreMoreShotsButton: document.getElementById("scoreMoreShotsButton"),
  scoreCustomShotsField: document.getElementById("scoreCustomShotsField"),
  scoreShotsInput: document.getElementById("scoreShotsInput"),
  scoreShotsError: document.getElementById("scoreShotsError"),
  scoreSaveHoleButton: document.getElementById("scoreSaveHoleButton"),
  scoreResetHoleButton: document.getElementById("scoreResetHoleButton"),
  scoreHoleNote: document.getElementById("scoreHoleNote"),
  scoreSaveHoleHint: document.getElementById("scoreSaveHoleHint"),
  scoreSaveHoleNextHint: document.getElementById("scoreSaveHoleNextHint"),
  scoreGoSummaryButton: document.getElementById("scoreGoSummaryButton"),
  scoreRoundSaveModeTabs: Array.from(document.querySelectorAll(".score-round-mode-tab")),
  scoreRoundSaveStatusValue: document.getElementById("scoreRoundSaveStatusValue"),
  scoreSaveRoundButton: document.getElementById("scoreSaveRoundButton"),
  scoreSaveRoundMessage: document.getElementById("scoreSaveRoundMessage"),
  scoreOverviewTitle: document.getElementById("scoreOverviewTitle"),
  scoreOverviewList: document.getElementById("scoreOverviewList"),
  scoreTotalShotsValue: document.getElementById("scoreTotalShotsValue")
};

function setText(selector, text) {
  const node = document.querySelector(selector);
  if (node) {
    node.textContent = text;
  }
}

function setAttr(selector, attr, value) {
  const node = document.querySelector(selector);
  if (node) {
    node.setAttribute(attr, value);
  }
}

function initStaticText() {
  document.title = "高爾夫上果嶺紀錄工具";
  setText(".hero h1", "高爾夫上果嶺紀錄工具");
  setText(".hero-text", "依帳號、球場與 tee 分開儲存紀錄，支援 18 洞逐桿紀錄、總表與歷史匯出。");
  setText("#loginPanel h2", "依帳號名稱分開儲存資料");
  setText("label[for='usernameInput']", "使用者名稱");
  setAttr("#usernameInput", "placeholder", "例如：Eric");
  setText("#loginPanel small", "同一個帳號會保留個人球場與 round 紀錄。");
  setText("#loginButton", "登入");
  setText(".section-kicker", "使用者");
  setText("#logoutButton", "登出");
  setText("#coursePage h2", "選擇球場");
  setText("#courseDetailsButton", "詳細資料");
  setText("#confirmCourseButton", "確認選擇");
  setText("[data-page='front']", "前 9");
  setText("[data-page='back']", "後 9");
  setText("[data-score-page='front']", "前 9");
  setText("[data-score-page='back']", "後 9");
  setText("[data-round-save-mode='front']", "前 9");
  setText("[data-round-save-mode='back']", "後 9");
  setText("[data-round-save-mode='full']", "18 洞");
  setText("[data-score-round-save-mode='front']", "前 9");
  setText("[data-score-round-save-mode='back']", "後 9");
  setText("[data-score-round-save-mode='full']", "18 洞");
}

function ensureSaveHoleNextHint() {
  if (elements.saveHoleNextHint) {
    return elements.saveHoleNextHint;
  }
  const hint = document.createElement("span");
  hint.id = "saveHoleNextHint";
  hint.className = "save-hole-next-hint hidden";
  elements.saveHoleHint.insertAdjacentElement("beforebegin", hint);
  elements.saveHoleNextHint = hint;
  return hint;
}

function normalizeUsername(username) {
  return username.trim();
}

function getUserStorageKey(username) {
  return `golf-user-${normalizeUsername(username)}`;
}

function makeHoleState(baseHole) {
  return {
    hole: baseHole.hole,
    par: baseHole.par,
    distance: baseHole.distance,
    greenDepth: 20,
    shotDistances: [],
    lastEstimate: null,
    savedRecord: null
  };
}

function cloneHoleState(hole) {
  return {
    hole: hole.hole,
    par: hole.par,
    distance: hole.distance,
    greenDepth: hole.greenDepth,
    shotDistances: [...hole.shotDistances],
    lastEstimate: hole.lastEstimate ? { ...hole.lastEstimate } : null,
    savedRecord: hole.savedRecord ? { ...hole.savedRecord } : null
  };
}

function makeScoreHoleState(holeNumber) {
  return {
    hole: holeNumber,
    par: 2,
    savedRecord: null
  };
}

function cloneScoreHoleState(hole) {
  return {
    hole: hole.hole,
    par: hole.par,
    savedRecord: hole.savedRecord ? { ...hole.savedRecord } : null
  };
}

function createEmptyCourseMap() {
  return Object.fromEntries(
    COURSES.flatMap((course) =>
      course.tees.map((tee) => [
        `${course.id}::${tee.id}`,
        tee.holes.map(makeHoleState)
      ])
    )
  );
}

function createEmptyScoreHoles() {
  return Array.from({ length: 18 }, (_, index) => makeScoreHoleState(index + 1));
}

function getCourseDefinition(courseId = state.profile.selectedCourseId) {
  return COURSES.find((course) => course.id === courseId) || COURSES[0];
}

function getTeeDefinition(courseId = state.profile.selectedCourseId, teeId = state.profile.selectedTeeId) {
  const course = getCourseDefinition(courseId);
  return course.tees.find((tee) => tee.id === teeId) || course.tees[0];
}

function currentCourseId() {
  return state.profile.selectedCourseId || DEFAULT_COURSE_ID;
}

function currentTeeId() {
  return state.profile.selectedTeeId || DEFAULT_TEE_ID;
}

function currentCourseName() {
  return getCourseDefinition().name;
}

function currentTeeName() {
  return getTeeDefinition().name;
}

function currentCourseKey(courseId = currentCourseId(), teeId = currentTeeId()) {
  return `${courseId}::${teeId}`;
}

function currentCourseHoles() {
  const key = currentCourseKey();
  if (!state.courses[key]) {
    state.courses[key] = getTeeDefinition().holes.map(makeHoleState);
  }
  return state.courses[key];
}

function currentHole() {
  return currentCourseHoles()[state.selectedHoleIndex];
}

function currentScoreHoles() {
  if (!Array.isArray(state.scoreHoles) || state.scoreHoles.length !== 18) {
    state.scoreHoles = createEmptyScoreHoles();
  }
  return state.scoreHoles;
}

function currentScoreHole() {
  return currentScoreHoles()[state.scoreSelectedHoleIndex];
}

function validateUsername(username) {
  if (!normalizeUsername(username)) {
    return "請輸入帳號名稱。";
  }
  return "";
}

function sanitizeNumber(value) {
  if (value === "" || value === null || value === undefined) {
    return "";
  }
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : "";
}

function getRoundSaveConfig() {
  if (state.roundSaveMode === "front") {
    return { mode: "front", label: "前 9", start: 0, end: 9, targetCount: 9 };
  }
  if (state.roundSaveMode === "back") {
    return { mode: "back", label: "後 9", start: 9, end: 18, targetCount: 9 };
  }
  return { mode: "full", label: "18 洞", start: 0, end: 18, targetCount: 18 };
}

function getRoundSaveHoles() {
  const { start, end } = getRoundSaveConfig();
  return currentCourseHoles().slice(start, end);
}

function getSavedHoleCountForHoles(holes) {
  return holes.filter((hole) => hole.savedRecord).length;
}

function getTotalShotsForHoles(holes) {
  return holes.reduce((sum, hole) => sum + (hole.savedRecord ? hole.savedRecord.shots : 0), 0);
}

function getRoundTotalPar(holes) {
  return holes.reduce((sum, hole) => sum + hole.par, 0);
}

function canSaveRoundHistory() {
  const holes = getRoundSaveHoles();
  const config = getRoundSaveConfig();
  return holes.length === config.targetCount && getSavedHoleCountForHoles(holes) === config.targetCount;
}

function getScoreRoundSaveConfig() {
  if (state.scoreRoundSaveMode === "front") {
    return { mode: "front", label: "前 9", start: 0, end: 9, targetCount: 9 };
  }
  if (state.scoreRoundSaveMode === "back") {
    return { mode: "back", label: "後 9", start: 9, end: 18, targetCount: 9 };
  }
  return { mode: "full", label: "18 洞", start: 0, end: 18, targetCount: 18 };
}

function getScoreRoundSaveHoles() {
  const { start, end } = getScoreRoundSaveConfig();
  return currentScoreHoles().slice(start, end);
}

function canSaveScoreRoundHistory() {
  const holes = getScoreRoundSaveHoles();
  const config = getScoreRoundSaveConfig();
  return holes.length === config.targetCount && getSavedHoleCountForHoles(holes) === config.targetCount;
}

function getCurrentUserRounds() {
  return Array.isArray(state.rounds) ? state.rounds : [];
}

function getRoundHistoryById(roundId) {
  return getCurrentUserRounds().find((round) => round.id === roundId) || null;
}

function createRoundId() {
  return `round-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function formatRoundDate(dateText) {
  if (!dateText) {
    return "-";
  }
  const parsed = new Date(dateText);
  if (Number.isNaN(parsed.getTime())) {
    return dateText;
  }
  return new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(parsed);
}

function formatShotDistances(shotDistances) {
  return Array.isArray(shotDistances) && shotDistances.length ? shotDistances.join(" / ") : "-";
}

function formatRoundRangeText(round) {
  if (round.roundMode === "front") {
    return "前 9，完成 1~9";
  }
  if (round.roundMode === "back") {
    return "後 9，完成 10~18";
  }
  return "18 洞，完成 1~18";
}

function formatRoundShotsWithPar(round) {
  const totalPar = round.holes.reduce((sum, hole) => sum + hole.par, 0);
  return `${round.totalShots} / ${totalPar}`;
}

function showMessage(target, text, className) {
  target.textContent = text;
  target.className = `message ${className}`;
  target.classList.remove("hidden");
}

function hideMessage(target) {
  target.textContent = "";
  target.classList.add("hidden");
}

function setFieldError(target, text = "") {
  if (!text) {
    target.textContent = "";
    target.classList.add("hidden");
    return;
  }
  target.textContent = text;
  target.classList.remove("hidden");
}

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Ignore localStorage failures.
  }
}

function removeStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    // Ignore localStorage failures.
  }
}

function getUserIndex() {
  const list = readStorage(USER_INDEX_KEY, []);
  return Array.isArray(list) ? list : [];
}

function ensureUserInIndex(username) {
  const normalized = normalizeUsername(username);
  const list = getUserIndex();
  if (!list.includes(normalized)) {
    list.push(normalized);
    list.sort((a, b) => a.localeCompare(b, "zh-Hant"));
    writeStorage(USER_INDEX_KEY, list);
  }
}

function createEmptyUserData(username) {
  return {
    username,
    selectedMode: DEFAULT_MODE,
    selectedCourseId: DEFAULT_COURSE_ID,
    selectedTeeId: DEFAULT_TEE_ID,
    lastAppPage: "course",
    courses: createEmptyCourseMap(),
    scoreHoles: createEmptyScoreHoles(),
    rounds: []
  };
}

function hydrateHoleState(baseHole, savedHole) {
  const hole = makeHoleState(baseHole);
  if (!savedHole) {
    return hole;
  }
  hole.greenDepth = Number(savedHole.greenDepth) > 0 ? Number(savedHole.greenDepth) : 20;
  hole.shotDistances = Array.isArray(savedHole.shotDistances)
    ? savedHole.shotDistances.map(Number).filter((value) => Number.isFinite(value) && value > 0)
    : [];
  hole.lastEstimate = savedHole.lastEstimate || null;
  hole.savedRecord = savedHole.savedRecord || null;
  return hole;
}

function hydrateScoreHoleState(savedHole, index) {
  const hole = makeScoreHoleState(index + 1);
  if (savedHole && savedHole.savedRecord) {
    hole.savedRecord = savedHole.savedRecord;
  }
  return hole;
}

function loadUserData(username) {
  const normalized = normalizeUsername(username);
  const stored = readStorage(getUserStorageKey(normalized), null);
  if (!stored) {
    return createEmptyUserData(normalized);
  }

  const data = createEmptyUserData(normalized);
  data.selectedMode = stored.selectedMode || DEFAULT_MODE;
  data.selectedCourseId = stored.selectedCourseId || DEFAULT_COURSE_ID;
  data.selectedTeeId = stored.selectedTeeId || DEFAULT_TEE_ID;
  data.lastAppPage = stored.lastAppPage || "course";
  data.rounds = Array.isArray(stored.rounds) ? stored.rounds : [];

  if (stored.courses && typeof stored.courses === "object") {
    COURSES.forEach((course) => {
      course.tees.forEach((tee) => {
        const key = `${course.id}::${tee.id}`;
        const savedHoles = stored.courses[key];
        if (Array.isArray(savedHoles)) {
          data.courses[key] = tee.holes.map((hole, index) => hydrateHoleState(hole, savedHoles[index]));
        }
      });
    });
  }

  if (Array.isArray(stored.scoreHoles) && stored.scoreHoles.length === 18) {
    data.scoreHoles = stored.scoreHoles.map(hydrateScoreHoleState);
  }

  return data;
}

function saveCurrentUserData() {
  if (!state.profile.username) {
    return;
  }
  ensureUserInIndex(state.profile.username);
  localStorage.setItem(CURRENT_USER_KEY, state.profile.username);
  writeStorage(getUserStorageKey(state.profile.username), {
    username: state.profile.username,
    selectedMode: state.profile.selectedMode,
    selectedCourseId: state.profile.selectedCourseId,
    selectedTeeId: state.profile.selectedTeeId,
    lastAppPage: state.activeAppPage,
    courses: state.courses,
    scoreHoles: state.scoreHoles,
    rounds: state.rounds
  });
}

function applyUserData(userData) {
  state.profile.username = userData.username;
  state.profile.selectedMode = userData.selectedMode || DEFAULT_MODE;
  state.profile.selectedCourseId = userData.selectedCourseId;
  state.profile.selectedTeeId = userData.selectedTeeId;
  state.pendingMode = state.profile.selectedMode;
  state.pendingCourseId = userData.selectedCourseId;
  state.pendingTeeId = userData.selectedTeeId;
  state.courses = userData.courses;
  state.scoreHoles = userData.scoreHoles;
  state.rounds = userData.rounds;
  state.page = "front";
  state.selectedHoleIndex = 0;
  state.scorePage = "front";
  state.scoreSelectedHoleIndex = 0;
  state.selectedRoundId = "";
  state.roundSaveMode = "full";
  state.scoreRoundSaveMode = "full";
  state.isRoundHistoryExpanded = false;
  state.isSimulationHistoryExpanded = false;
  state.isScoreHistoryExpanded = false;
  state.isShotListExpanded = false;
  state.saveHoleNextHint = "";
  state.scoreSaveHoleNextHint = "";
  state.historyNotice = "";
  state.activeAppPage = APP_PAGES.some((page) => page.id === userData.lastAppPage)
    ? userData.lastAppPage
    : "course";
}

function loadSession() {
  let username = "";
  try {
    username = localStorage.getItem(CURRENT_USER_KEY) || "";
  } catch (error) {
    username = "";
  }
  if (!username) {
    return;
  }
  applyUserData(loadUserData(username));
}

function isLoggedIn() {
  return Boolean(state.profile.username);
}

function currentAppPageDefinition() {
  return APP_PAGES.find((page) => page.id === state.activeAppPage) || APP_PAGES[0];
}

function visibleAppPages() {
  if (state.activeAppPage === "course" || state.activeAppPage === "history") {
    return APP_PAGES.filter((page) => page.id === "course" || page.id === "history");
  }
  const modePageIds = state.profile.selectedMode === "score"
    ? ["course", "score-play", "score-summary", "history"]
    : ["course", "play", "summary", "history"];
  return APP_PAGES.filter((page) => modePageIds.includes(page.id));
}

function previousAppPageId() {
  const pages = visibleAppPages();
  const index = pages.findIndex((page) => page.id === state.activeAppPage);
  return index > 0 ? pages[index - 1].id : "";
}

function scrollAppToTop() {
  window.scrollTo({ top: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function setActiveAppPage(pageId) {
  state.activeAppPage = APP_PAGES.some((page) => page.id === pageId) ? pageId : "course";
  if (state.activeAppPage === "course") {
    state.pendingMode = state.profile.selectedMode;
    state.pendingCourseId = state.profile.selectedCourseId;
    state.pendingTeeId = state.profile.selectedTeeId;
    state.isCourseDetailsOpen = false;
  }
  state.isMenuOpen = false;
  saveCurrentUserData();
  renderAll();
  scrollAppToTop();
}

const playPage = window.createPlayPageModule({
  state,
  elements,
  sanitizeNumber,
  currentHole,
  currentCourseHoles,
  currentCourseName,
  currentTeeName,
  ensureSaveHoleNextHint,
  saveCurrentUserData,
  getTeeDefinition,
  makeHoleState,
  renderOverview,
  renderRoundSavePanel,
  renderAll,
  setFieldError,
  setActiveAppPage
});

const coursePage = window.createCoursePageModule({
  state,
  elements,
  COURSES,
  getCourseDefinition,
  getTeeDefinition,
  saveCurrentUserData,
  setActiveAppPage
});

const summaryPage = window.createSummaryPageModule({
  state,
  elements,
  currentCourseHoles,
  currentCourseId,
  currentCourseName,
  currentTeeName,
  getRoundSaveConfig,
  getRoundSaveHoles,
  getSavedHoleCountForHoles,
  getTotalShotsForHoles,
  getRoundTotalPar,
  canSaveRoundHistory,
  cloneHoleState,
  createRoundId,
  saveCurrentUserData,
  getTeeDefinition,
  makeHoleState,
  setActiveAppPage,
  showMessage
});

const scorePage = window.createScorePageModule({
  state,
  elements,
  sanitizeNumber,
  currentScoreHoles,
  currentScoreHole,
  createEmptyScoreHoles,
  makeScoreHoleState,
  cloneScoreHoleState,
  createRoundId,
  saveCurrentUserData,
  getSavedHoleCountForHoles,
  getTotalShotsForHoles,
  getRoundTotalPar,
  getScoreRoundSaveConfig,
  getScoreRoundSaveHoles,
  canSaveScoreRoundHistory,
  setFieldError,
  setActiveAppPage,
  showMessage,
  renderAll
});

const historyPage = window.createHistoryPageModule({
  state,
  elements,
  getCurrentUserRounds,
  getRoundHistoryById,
  formatRoundDate,
  formatShotDistances,
  formatRoundRangeText,
  formatRoundShotsWithPar,
  saveCurrentUserData,
  showMessage
});

function renderAppVisibility() {
  elements.heroPanel.classList.toggle("hidden", isLoggedIn());
  elements.loginPanel.classList.toggle("hidden", isLoggedIn());
  elements.appPanel.classList.toggle("hidden", !isLoggedIn());
}

function renderCurrentPageTitle() {
  elements.currentPageTitle.textContent = currentAppPageDefinition().label;
  const previousId = previousAppPageId();
  elements.backButton.classList.toggle("hidden", !previousId || state.activeAppPage === "course");
  elements.backButton.disabled = !previousId || state.activeAppPage === "course";
}

function renderAppTabs() {
  elements.appTabs.innerHTML = visibleAppPages().map((page) => `
    <button class="app-tab ${page.id === state.activeAppPage ? "active" : ""}" type="button" data-app-page="${page.id}">
      ${page.label}
    </button>
  `).join("");
}

function renderAppPageVisibility() {
  elements.appPages.forEach((pageElement) => {
    const definition = APP_PAGES.find((page) => page.panelId === pageElement.id);
    pageElement.classList.toggle("hidden", !definition || definition.id !== state.activeAppPage);
  });
}

function renderMenuState() {
  elements.menuOverlay.classList.toggle("hidden", !state.isMenuOpen);
  elements.menuDrawer.classList.toggle("hidden", !state.isMenuOpen);
  elements.menuButton.setAttribute("aria-expanded", String(state.isMenuOpen));
  elements.menuDrawer.setAttribute("aria-hidden", String(!state.isMenuOpen));
}

function renderProfile() {
  elements.welcomeText.textContent = state.profile.username;
}

function renderCourseSelect() { return coursePage.renderCourseSelect(); }
function renderCourseDetails() { return coursePage.renderCourseDetails(); }
function renderHoleTabs() { return playPage.renderHoleTabs(); }
function renderHoleList() { return playPage.renderHoleList(); }
function renderHoleEditor() { return playPage.renderHoleEditor(); }
function renderGreenDepthPanel() { return playPage.renderGreenDepthPanel(); }
function renderOverview() { return summaryPage.renderOverview(); }
function renderRoundSavePanel() { return summaryPage.renderRoundSavePanel(); }
function renderScorePlay() { return scorePage.renderPlay(); }
function renderScoreSummary() { return scorePage.renderSummary(); }
function renderRecentRounds() { return historyPage.renderRecentRounds(); }

function renderAll() {
  renderAppVisibility();
  if (!isLoggedIn()) {
    renderMenuState();
    hideMessage(elements.profileMessage);
    hideMessage(elements.exportResult);
    return;
  }
  renderProfile();
  renderCurrentPageTitle();
  renderAppTabs();
  renderAppPageVisibility();
  renderMenuState();
  renderCourseSelect();
  renderCourseDetails();
  renderHoleTabs();
  renderHoleList();
  renderHoleEditor();
  renderGreenDepthPanel();
  renderOverview();
  renderRoundSavePanel();
  renderScorePlay();
  renderScoreSummary();
  renderRecentRounds();
}

function handleLogin() {
  const username = normalizeUsername(elements.usernameInput.value);
  const error = validateUsername(username);
  if (error) {
    showMessage(elements.loginMessage, error, "is-error");
    return;
  }
  hideMessage(elements.loginMessage);
  ensureUserInIndex(username);
  applyUserData(loadUserData(username));
  state.activeAppPage = "course";
  state.isMenuOpen = false;
  state.isCourseDetailsOpen = false;
  saveCurrentUserData();
  renderAll();
  showMessage(elements.profileMessage, `已登入 ${username}。`, "is-info");
}

function bindEvents() {
  elements.loginButton.addEventListener("click", handleLogin);
  elements.backButton.addEventListener("click", () => {
    const previous = previousAppPageId();
    if (previous) {
      setActiveAppPage(previous);
    }
  });
  elements.menuButton.addEventListener("click", () => {
    state.isMenuOpen = !state.isMenuOpen;
    renderMenuState();
  });
  elements.closeMenuButton.addEventListener("click", () => {
    state.isMenuOpen = false;
    renderMenuState();
  });
  elements.menuOverlay.addEventListener("click", () => {
    state.isMenuOpen = false;
    renderMenuState();
  });
  elements.appTabs.addEventListener("click", (event) => {
    const tab = event.target.closest("[data-app-page]");
    if (tab) {
      setActiveAppPage(tab.dataset.appPage);
    }
  });
  elements.logoutButton.addEventListener("click", () => {
    state.profile.username = "";
    state.profile.selectedMode = DEFAULT_MODE;
    state.profile.selectedCourseId = DEFAULT_COURSE_ID;
    state.profile.selectedTeeId = DEFAULT_TEE_ID;
    state.activeAppPage = "course";
    state.pendingMode = DEFAULT_MODE;
    state.pendingCourseId = DEFAULT_COURSE_ID;
    state.pendingTeeId = DEFAULT_TEE_ID;
    state.courses = createEmptyCourseMap();
    state.scoreHoles = createEmptyScoreHoles();
    state.rounds = [];
    state.page = "front";
    state.selectedHoleIndex = 0;
    state.scorePage = "front";
    state.scoreSelectedHoleIndex = 0;
    state.roundSaveMode = "full";
    state.scoreRoundSaveMode = "full";
    state.selectedRoundId = "";
    state.isRoundHistoryExpanded = false;
    state.isSimulationHistoryExpanded = false;
    state.isScoreHistoryExpanded = false;
    state.isMenuOpen = false;
    state.isCourseDetailsOpen = false;
    state.isShotListExpanded = false;
    state.saveHoleNextHint = "";
    state.scoreSaveHoleNextHint = "";
    state.historyNotice = "";
    removeStorage(CURRENT_USER_KEY);
    renderAll();
  });

  coursePage.bindEvents();
  playPage.bindEvents();
  summaryPage.bindEvents();
  scorePage.bindEvents();
  historyPage.bindEvents();
}

initStaticText();
loadSession();
if (!Array.isArray(state.scoreHoles) || state.scoreHoles.length !== 18) {
  state.scoreHoles = createEmptyScoreHoles();
}
bindEvents();
renderAll();
