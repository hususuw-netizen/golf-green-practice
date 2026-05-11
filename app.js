const APP_PAGES = [
  { id: "course", label: "\u7403\u5834", panelId: "coursePage" },
  { id: "play", label: "\u7d00\u9304\u687f\u6578", panelId: "playPage" },
  { id: "summary", label: "\u7e3d\u8868", panelId: "summaryPage" },
  { id: "history", label: "\u6b77\u53f2", panelId: "historyPage" }
];

const COURSES = [
  {
    id: "palm-lake",
    name: "\u68d5\u68a0\u6e56\u7403\u5834",
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
    name: "\u5317\u6d77\u7403\u5834",
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
const USER_INDEX_KEY = "golf-users-index";
const CURRENT_USER_KEY = "golf-current-user";

const state = {
  activeAppPage: "course",
  isMenuOpen: false,
  pendingCourseId: DEFAULT_COURSE_ID,
  pendingTeeId: DEFAULT_TEE_ID,
  page: "front",
  selectedHoleIndex: 0,
  selectedRoundId: "",
  roundSaveMode: "full",
  isCourseDetailsOpen: false,
  isGreenDepthOpen: false,
  isShotListExpanded: false,
  isRoundHistoryExpanded: false,
  saveHoleNextHint: "",
  profile: {
    username: "",
    selectedCourseId: DEFAULT_COURSE_ID,
    selectedTeeId: DEFAULT_TEE_ID
  },
  courses: {},
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
  recentRoundsEmpty: document.getElementById("recentRoundsEmpty")
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

function initStaticText() {
  document.title = "\u9ad8\u723e\u592b\u4e0a\u679c\u5dba\u7d00\u9304\u5de5\u5177";
  setText(".hero h1", "\u9ad8\u723e\u592b\u4e0a\u679c\u5dba\u7d00\u9304\u5de5\u5177");
  setText(".hero-text", "\u4f9d\u5e33\u865f\u3001\u7403\u5834\u8207 tee \u5206\u958b\u5132\u5b58\u7d00\u9304\uff0c\u652f\u63f4 18 \u6d1e\u9010\u687f\u7d00\u9304\u3001\u7e3d\u8868\u8207\u6b77\u53f2\u532f\u51fa\u3002");
  setText("#loginPanel h2", "\u4f9d\u5e33\u865f\u540d\u7a31\u5206\u958b\u5132\u5b58\u8cc7\u6599");
  setText("label[for='usernameInput']", "\u4f7f\u7528\u8005\u540d\u7a31");
  setAttr("#usernameInput", "placeholder", "\u4f8b\u5982\uff1aEric");
  setText("#loginPanel small", "\u540c\u4e00\u500b\u5e33\u865f\u6703\u4fdd\u7559\u500b\u4eba\u7403\u5834\u8207 round \u7d00\u9304\u3002");
  setText("#loginButton", "\u767b\u5165");
  setAttr("#backButton", "aria-label", "\u8fd4\u56de\u4e0a\u4e00\u9801");
  setAttr("#menuButton", "aria-label", "\u958b\u555f\u9078\u55ae");
  setText(".section-kicker", "\u4f7f\u7528\u8005");
  setAttr("#closeMenuButton", "aria-label", "\u95dc\u9589\u9078\u55ae");
  setText("#closeMenuButton", "\u00d7");
  setAttr("#appTabs", "aria-label", "\u4e3b\u9078\u55ae");
  setText("#logoutButton", "\u767b\u51fa");
  setText("#coursePage h2", "\u9078\u64c7\u7403\u5834");
  setAttr("#teeSwitch", "aria-label", "\u9078\u64c7\u767c\u7403\u53f0");
  setText("#courseDetailsButton", "\u8a73\u7d30\u8cc7\u6599");
  setText("#confirmCourseButton", "\u78ba\u8a8d\u9078\u64c7");
  setText("[data-page='front']", "\u524d 9");
  setText("[data-page='back']", "\u5f8c 9");
  setText("#toggleGreenDepthButton .settings-glyph", "\u2699");
  setAttr("#toggleGreenDepthButton", "aria-label", "\u8a2d\u5b9a\u679c\u5dba\u6df1\u5ea6");
  setText("label[for='greenDepthInput']", "\u679c\u5dba\u6df1\u5ea6\uff08\u78bc\uff09");
  setAttr("#greenDepthInput", "placeholder", "20");
  setAttr("#shotDistanceInput", "placeholder", "\u4f8b\u5982\uff1a170");
  setText("#confirmShotButton", "\u78ba\u5b9a\u9019\u4e00\u687f");
  setText(".shot-record-card h2", "\u9010\u687f\u7d00\u9304");
  setText("#resetHoleButton", "\u6e05\u9664\u6b64\u6d1e");
  setAttr("#toggleShotListButton", "aria-label", "\u5c55\u958b\u9010\u687f\u7d00\u9304");
  setText("#toggleShotListButton .toggle-arrow", "\u25be");
  setText("#emptyShotNote", "\u9084\u6c92\u6709\u63ee\u687f\u8cc7\u6599\u3002");
  setText("#saveHoleRecordButton", "\u5132\u5b58\u6b64\u6d1e\u7d00\u9304");
  setText("#goSummaryButton", "\u524d\u5f80\u7e3d\u8868");
  setText("#saveRoundButton", "\u5132\u5b58\u672c\u6b21 Round");
  setText(".round-save-panel h2", "\u5132\u5b58\u672c\u6b21 Round");
  setText("[data-round-save-mode='front']", "\u524d 9");
  setText("[data-round-save-mode='back']", "\u5f8c 9");
  setText("[data-round-save-mode='full']", "18 \u6d1e");
  setText(".round-save-grid .stat-card span", "\u5b8c\u6210\u72c0\u614b");
  setText(".overview-total span", "\u7e3d\u63ee\u687f");
  setText("#historyPage h2", "\u6b77\u53f2\u7d00\u9304");
  setAttr("#toggleRoundHistoryButton", "aria-label", "\u5c55\u958b\u6b77\u53f2\u7d00\u9304");
  setText("#toggleRoundHistoryButton .toggle-arrow", "\u25be");
  setText("#recentRoundsEmpty", "\u9084\u6c92\u6709 round \u6b77\u53f2\u7d00\u9304\u3002");
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

function validateUsername(username) {
  if (!normalizeUsername(username)) {
    return "\u8acb\u8f38\u5165\u5e33\u865f\u540d\u7a31\u3002";
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
    return { mode: "front", label: "\u524d 9", start: 0, end: 9, targetCount: 9 };
  }
  if (state.roundSaveMode === "back") {
    return { mode: "back", label: "\u5f8c 9", start: 9, end: 18, targetCount: 9 };
  }
  return { mode: "full", label: "18 \u6d1e", start: 0, end: 18, targetCount: 18 };
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
  return shotDistances.length ? shotDistances.join(" / ") : "-";
}

function formatRoundRangeText(round) {
  if (round.roundMode === "front") {
    return "\u524d 9\uff0c\u5b8c\u6210 1~9";
  }
  if (round.roundMode === "back") {
    return "\u5f8c 9\uff0c\u5b8c\u6210 10~18";
  }
  return "18 \u6d1e\uff0c\u5b8c\u6210 1~18";
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
    // Ignore localStorage write failures.
  }
}

function removeStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    // Ignore localStorage removal failures.
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
    selectedCourseId: DEFAULT_COURSE_ID,
    selectedTeeId: DEFAULT_TEE_ID,
    courses: createEmptyCourseMap(),
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

function loadUserData(username) {
  const normalized = normalizeUsername(username);
  const stored = readStorage(getUserStorageKey(normalized), null);
  if (!stored) {
    return createEmptyUserData(normalized);
  }

  const data = createEmptyUserData(normalized);
  data.selectedCourseId = stored.selectedCourseId || DEFAULT_COURSE_ID;
  data.selectedTeeId = stored.selectedTeeId || DEFAULT_TEE_ID;
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
    selectedCourseId: state.profile.selectedCourseId,
    selectedTeeId: state.profile.selectedTeeId,
    courses: state.courses,
    rounds: state.rounds
  });
}

function applyUserData(userData) {
  state.profile.username = userData.username;
  state.profile.selectedCourseId = userData.selectedCourseId;
  state.profile.selectedTeeId = userData.selectedTeeId;
  state.pendingCourseId = userData.selectedCourseId;
  state.pendingTeeId = userData.selectedTeeId;
  state.courses = userData.courses;
  state.rounds = userData.rounds;
  state.page = "front";
  state.selectedHoleIndex = 0;
  state.selectedRoundId = "";
  state.isRoundHistoryExpanded = false;
  state.isShotListExpanded = false;
  state.saveHoleNextHint = "";
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

function previousAppPageId() {
  const index = APP_PAGES.findIndex((page) => page.id === state.activeAppPage);
  return index > 0 ? APP_PAGES[index - 1].id : "";
}

function scrollAppToTop() {
  window.scrollTo({ top: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function setActiveAppPage(pageId) {
  state.activeAppPage = APP_PAGES.some((page) => page.id === pageId) ? pageId : "course";
  if (state.activeAppPage === "course") {
    state.pendingCourseId = state.profile.selectedCourseId;
    state.pendingTeeId = state.profile.selectedTeeId;
    state.isCourseDetailsOpen = false;
  }
  state.isMenuOpen = false;
  renderAll();
  scrollAppToTop();
}

function validateShotInput() {
  const value = sanitizeNumber(elements.shotDistanceInput.value);
  if (!Number.isFinite(value) || value <= 0) {
    return "\u8acb\u8f38\u5165\u5927\u65bc 0 \u7684\u64ca\u7403\u8ddd\u96e2\u3002";
  }
  if (value > 500) {
    return "\u55ae\u687f\u64ca\u7403\u8ddd\u96e2\u4e0d\u80fd\u8d85\u904e 500 \u78bc\u3002";
  }
  return "";
}

function calculateTrajectory(hole) {
  let relativeToCup = hole.distance;
  let previousZone = "front";
  const greenRadius = hole.greenDepth / 2;

  return hole.shotDistances.map((shotDistance, index) => {
    relativeToCup = relativeToCup >= 0 ? relativeToCup - shotDistance : relativeToCup + shotDistance;

    let zone = "front";
    let outcome = "";
    let completed = false;

    if (relativeToCup > greenRadius) {
      zone = "front";
      const distanceToGreen = relativeToCup - greenRadius;
      outcome = previousZone === "back" || previousZone === "green"
        ? `\u56de\u5230\u679c\u5dba\u524d\uff0c\u8ddd\u96e2\u679c\u5dba ${distanceToGreen} \u78bc`
        : `\u8ddd\u96e2\u679c\u5dba ${distanceToGreen} \u78bc`;
    } else if (Math.abs(relativeToCup) <= greenRadius) {
      zone = "green";
      completed = true;
      const distanceToHole = Math.abs(relativeToCup);
      outcome = previousZone === "back"
        ? `\u56de\u5230\u679c\u5dba\uff0c\u8ddd\u96e2\u7403\u6d1e ${distanceToHole} \u78bc`
        : `\u9032\u5165\u679c\u5dba\uff0c\u8ddd\u96e2\u7403\u6d1e ${distanceToHole} \u78bc`;
    } else {
      zone = "back";
      const distanceToHole = Math.max(Math.abs(relativeToCup) - greenRadius, 0);
      outcome = previousZone === "back"
        ? `\u4ecd\u8d85\u51fa\u679c\u5dba ${distanceToHole} \u78bc`
        : `\u8d85\u51fa\u679c\u5dba ${distanceToHole} \u78bc`;
    }

    previousZone = zone;

    return {
      shotNumber: index + 1,
      shotDistance,
      completed,
      outcome
    };
  });
}

function refreshEstimate() {
  const hole = currentHole();
  const greenDepth = sanitizeNumber(elements.greenDepthInput.value);
  hole.greenDepth = Number.isFinite(greenDepth) && greenDepth > 0 ? greenDepth : 20;
  const trajectory = calculateTrajectory(hole);
  const lastStep = trajectory[trajectory.length - 1] || null;
  hole.lastEstimate = lastStep
    ? { estimatedShotsToGreen: lastStep.completed ? lastStep.shotNumber : null }
    : null;

  renderHoleList();
  renderHoleEditor();
  renderOverview();
  renderRoundSavePanel();
  saveCurrentUserData();
}

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
  elements.appTabs.innerHTML = APP_PAGES.map((page) => `
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

function renderCourseSelect() {
  elements.courseSelect.innerHTML = COURSES.map((course) => `
    <option value="${course.id}">${course.name}</option>
  `).join("");
  elements.courseSelect.value = state.pendingCourseId;
  elements.teeTabs.forEach((button) => {
    button.classList.toggle("active", button.dataset.tee === state.pendingTeeId);
  });
}

function renderCourseDetails() {
  const tee = getTeeDefinition(state.pendingCourseId, state.pendingTeeId);
  elements.courseDetailsButton.setAttribute("aria-expanded", String(state.isCourseDetailsOpen));
  elements.courseDetailsPanel.classList.toggle("hidden", !state.isCourseDetailsOpen);
  elements.courseDetailsList.innerHTML = state.isCourseDetailsOpen
    ? tee.holes.map((hole) => `
        <div class="course-detail-item">
          <strong>\u7b2c ${hole.hole} \u6d1e</strong>
          <span>Par ${hole.par}</span>
          <span>${hole.distance} \u78bc</span>
        </div>
      `).join("")
    : "";
}

function renderHoleTabs() {
  elements.tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.page === state.page);
  });
}

function renderHoleList() {
  const start = state.page === "front" ? 0 : 9;
  const holes = currentCourseHoles().slice(start, start + 9);
  elements.holeList.innerHTML = holes.map((hole, index) => {
    const actualIndex = start + index;
    const activeClass = actualIndex === state.selectedHoleIndex ? "active" : "";
    const savedClass = hole.savedRecord ? "saved" : "";
    return `
      <button class="hole-chip ${activeClass} ${savedClass}" type="button" data-index="${actualIndex}">
        <strong>${hole.hole}</strong>
      </button>
    `;
  }).join("");
}

function renderShotList() {
  const hole = currentHole();
  const trajectory = calculateTrajectory(hole);
  const visibleTrajectory = !state.isShotListExpanded && trajectory.length > 1
    ? trajectory.slice(-1)
    : trajectory;

  elements.emptyShotNote.classList.toggle("hidden", trajectory.length > 0);
  elements.toggleShotListButton.classList.toggle("hidden", trajectory.length <= 1);
  elements.toggleShotListButton.setAttribute("aria-expanded", String(state.isShotListExpanded));
  elements.toggleShotListButton.querySelector(".toggle-arrow").textContent = "\u25be";
  elements.shotList.classList.toggle("is-expanded", state.isShotListExpanded);

  elements.shotList.innerHTML = visibleTrajectory.map((step) => `
    <div class="shot-row">
      <div class="shot-row-main">
        <div class="shot-label">\u7b2c ${step.shotNumber} \u687f</div>
        <div class="shot-result-line">
          <div class="shot-distance-value">${step.shotDistance} \u78bc</div>
          <div class="shot-remainder ${step.completed ? "is-success" : ""}">${step.outcome}</div>
        </div>
      </div>
      ${state.isShotListExpanded ? `<button class="icon-button remove-shot" type="button" data-shot-index="${step.shotNumber - 1}" aria-label="\u522a\u9664\u9019\u4e00\u687f">\u00d7</button>` : ""}
    </div>
  `).join("");
}

function renderSaveHoleBar() {
  const hole = currentHole();
  const canSaveHole = Boolean(hole.lastEstimate && hole.lastEstimate.estimatedShotsToGreen);
  const nextHint = ensureSaveHoleNextHint();
  elements.saveHoleRecordButton.disabled = !canSaveHole;
  elements.saveHoleRecordButton.setAttribute("aria-disabled", String(!canSaveHole));
  nextHint.textContent = state.saveHoleNextHint;
  nextHint.classList.toggle("hidden", !state.saveHoleNextHint);

  if (hole.savedRecord) {
    elements.saveHoleHint.textContent = `\u6b64\u6d1e\u5df2\u5132\u5b58\uff0c\u63ee\u687f ${hole.savedRecord.shots} \u6b21\u3002`;
    return;
  }

  elements.saveHoleHint.textContent = canSaveHole
    ? "\u6b64\u6d1e\u5df2\u9032\u5165\u679c\u5dba\uff0c\u53ef\u5132\u5b58\u6b64\u6d1e\u7d00\u9304\u3002"
    : "\u5c1a\u672a\u9032\u5165\u679c\u5dba\uff0c\u5b8c\u6210\u5f8c\u624d\u80fd\u5132\u5b58\u6b64\u6d1e\u7d00\u9304\u3002";
}

function renderHoleEditor() {
  const hole = currentHole();
  elements.editorTitle.textContent = `\u7b2c ${hole.hole} \u6d1e`;
  elements.holeSelectorSubtitle.textContent = `${currentCourseName()} ${currentTeeName()}`;
  elements.parValue.textContent = String(hole.par);
  elements.distanceValue.textContent = `${hole.distance} \u78bc`;
  elements.greenDepthInput.value = String(hole.greenDepth);
  elements.shotDistanceInput.value = "";
  renderShotList();
  renderSaveHoleBar();
}

function renderOverview() {
  const config = getRoundSaveConfig();
  const holes = currentCourseHoles().slice(config.start, config.end);
  elements.overviewTitle.textContent = `${config.label}\u7d00\u9304`;
  elements.totalShotsValue.textContent = `${getTotalShotsForHoles(holes)} / ${getRoundTotalPar(holes)}`;
  elements.overviewList.innerHTML = holes.map((hole) => `
    <div class="overview-row ${hole.savedRecord ? "saved" : ""}">
      <strong>\u7b2c ${hole.hole} \u6d1e</strong>
      <span>Par ${hole.par}</span>
      <span>${hole.savedRecord ? hole.savedRecord.resultText : "\u5c1a\u7121\u7d00\u9304"}</span>
      <div class="overview-shots">${hole.savedRecord ? `${hole.savedRecord.shots} \u687f` : "-"}</div>
    </div>
  `).join("");
}

function renderRoundSavePanel() {
  const config = getRoundSaveConfig();
  const holes = getRoundSaveHoles();
  const savedCount = getSavedHoleCountForHoles(holes);
  elements.roundSaveModeTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.roundSaveMode === state.roundSaveMode);
  });
  elements.roundSaveStatusValue.textContent = `${savedCount} / ${config.targetCount}`;
  elements.roundSaveCourseValue.textContent = `${currentCourseName()} ${currentTeeName()}`;
  elements.saveRoundButton.disabled = !canSaveRoundHistory();
  elements.saveRoundButton.setAttribute("aria-disabled", String(!canSaveRoundHistory()));

  if (canSaveRoundHistory()) {
    showMessage(elements.saveRoundMessage, `${config.label}\u5df2\u5b8c\u6210\uff0c\u53ef\u5132\u5b58\u672c\u6b21 round\u3002`, "is-info");
  } else {
    showMessage(elements.saveRoundMessage, `\u5c1a\u672a\u5b8c\u6210${config.label}\u7684\u6d1e\u6578\uff0c\u5b8c\u6210\u5f8c\u624d\u80fd\u5132\u5b58\u672c\u6b21 round\u3002`, "is-warn");
  }
}

function renderRoundDetail(roundId = state.selectedRoundId) {
  const round = getRoundHistoryById(roundId);
  if (!round || round.id !== state.selectedRoundId) {
    return "";
  }
  return `
    <div class="round-inline-detail">
      <div class="round-detail-summary">
        <div class="stat-card">
          <span>\u65e5\u671f</span>
          <strong>${formatRoundDate(round.date)}</strong>
        </div>
        <div class="stat-card">
          <span>\u7403\u5834</span>
          <strong>${round.courseName} ${round.teeName}</strong>
        </div>
        <div class="stat-card">
          <span>\u7bc4\u570d</span>
          <strong>${round.roundLabel}</strong>
        </div>
        <div class="stat-card">
          <span>\u7e3d\u687f</span>
          <strong>${formatRoundShotsWithPar(round)}</strong>
        </div>
      </div>
      <div class="round-detail-hole-list">
        ${round.holes.map((hole) => `
          <div class="round-detail-hole-item">
            <div class="round-detail-hole-top">
              <strong>\u7b2c ${hole.hole} \u6d1e</strong>
              <span>Par ${hole.par}</span>
              <span>${hole.distance} \u78bc</span>
            </div>
            <span>\u679c\u5dba\u6df1\u5ea6 ${hole.greenDepth} \u78bc</span>
            <span>${hole.savedRecord ? `${hole.savedRecord.shots} \u687f` : "-"}</span>
            <span>${hole.savedRecord ? hole.savedRecord.resultText : "\u5c1a\u7121\u7d00\u9304"}</span>
            <span>\u9010\u687f\u8ddd\u96e2\uff1a${formatShotDistances(hole.shotDistances)}</span>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function renderRecentRounds() {
  const allRounds = getCurrentUserRounds();
  const rounds = state.isRoundHistoryExpanded ? allRounds : allRounds.slice(0, 1);
  elements.recentRoundsEmpty.classList.toggle("hidden", rounds.length > 0);
  elements.toggleRoundHistoryButton.classList.toggle("hidden", allRounds.length <= 1);
  elements.toggleRoundHistoryButton.setAttribute("aria-expanded", String(state.isRoundHistoryExpanded));
  elements.toggleRoundHistoryButton.querySelector(".toggle-arrow").textContent = "\u25be";

  elements.recentRoundsList.innerHTML = rounds.map((round) => `
    <div class="round-history-item ${round.id === state.selectedRoundId ? "active" : ""}">
      <button class="round-delete-button" type="button" data-round-delete="${round.id}" aria-label="\u522a\u9664\u9019\u7b46 round">\u00d7</button>
      <div class="round-history-meta">
        <strong>${formatRoundDate(round.date)}</strong>
        <span>${round.courseName} ${round.teeName}</span>
        <span>${formatRoundRangeText(round)}</span>
        <span>\u7e3d\u687f ${formatRoundShotsWithPar(round)}</span>
      </div>
      <div class="round-history-actions">
        <button class="btn btn-accent round-action-button" type="button" data-round-export="${round.id}">\u532f\u51fa CSV</button>
        <button class="btn btn-soft round-action-button" type="button" data-round-view="${round.id}" aria-expanded="${round.id === state.selectedRoundId ? "true" : "false"}">
          \u7d30\u9805 ${round.id === state.selectedRoundId ? "\u25b4" : "\u25be"}
        </button>
      </div>
      ${renderRoundDetail(round.id)}
    </div>
  `).join("");
}

function renderGreenDepthPanel() {
  elements.greenDepthPanel.classList.toggle("hidden", !state.isGreenDepthOpen);
  elements.toggleGreenDepthButton.setAttribute("aria-expanded", String(state.isGreenDepthOpen));
}

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
  state.pendingCourseId = state.profile.selectedCourseId;
  state.pendingTeeId = state.profile.selectedTeeId;
  state.isMenuOpen = false;
  state.isCourseDetailsOpen = false;
  saveCurrentUserData();
  renderAll();
  showMessage(elements.profileMessage, `\u5df2\u767b\u5165 ${username}\u3002`, "is-info");
}

function handleConfirmShot() {
  const hole = currentHole();
  state.saveHoleNextHint = "";
  if (hole.lastEstimate && hole.lastEstimate.estimatedShotsToGreen) {
    setFieldError(elements.shotDistanceError, "\u5df2\u9032\u5165\u679c\u5dba\uff0c\u4e0d\u7528\u518d\u8f38\u5165\u8ddd\u96e2\u3002");
    return;
  }
  const error = validateShotInput();
  if (error) {
    setFieldError(elements.shotDistanceError, error);
    return;
  }
  setFieldError(elements.shotDistanceError);
  hole.shotDistances.push(Number(elements.shotDistanceInput.value));
  hole.savedRecord = null;
  state.isShotListExpanded = false;
  refreshEstimate();
}

function handleSaveHoleRecord() {
  const hole = currentHole();
  const trajectory = calculateTrajectory(hole);
  const lastStep = trajectory[trajectory.length - 1];
  if (!lastStep || !lastStep.completed) {
    return;
  }
  hole.savedRecord = {
    shots: lastStep.shotNumber,
    resultText: lastStep.outcome
  };

  const pageEndIndex = state.page === "front" ? 8 : 17;
  if (state.selectedHoleIndex < pageEndIndex) {
    state.selectedHoleIndex += 1;
    state.saveHoleNextHint = `\u5df2\u5207\u63db\u81f3\u7b2c ${state.selectedHoleIndex + 1} \u6d1e`;
  } else {
    state.saveHoleNextHint = "";
  }
  state.isShotListExpanded = false;

  saveCurrentUserData();
  renderAll();
}

function saveCurrentRoundHistory() {
  const config = getRoundSaveConfig();
  const holes = getRoundSaveHoles().map(cloneHoleState);
  const round = {
    id: createRoundId(),
    date: new Date().toISOString(),
    courseId: currentCourseId(),
    courseName: currentCourseName(),
    teeName: currentTeeName(),
    roundMode: config.mode,
    roundLabel: config.label,
    totalShots: getTotalShotsForHoles(holes),
    holes
  };
  state.rounds = [round, ...state.rounds].slice(0, 50);
  state.selectedRoundId = "";
  saveCurrentUserData();
  return round;
}

function resetCurrentCourseProgress() {
  const tee = getTeeDefinition();
  const holes = currentCourseHoles();
  const config = getRoundSaveConfig();
  for (let index = config.start; index < config.end; index += 1) {
    holes[index] = makeHoleState(tee.holes[index]);
  }
  state.page = config.mode === "back" ? "back" : "front";
  state.selectedHoleIndex = config.start;
  state.isShotListExpanded = false;
}

function buildRoundCsvContent(round) {
  const rows = [
    ["\u5e33\u865f", state.profile.username],
    ["\u7403\u5834", round.courseName],
    ["Tee", round.teeName],
    ["\u7bc4\u570d", round.roundLabel],
    ["\u65e5\u671f", formatRoundDate(round.date)],
    ["\u7e3d\u687f", String(round.totalShots)],
    [],
    ["\u6d1e\u5225", "Par", "\u7403\u6d1e\u9577\u5ea6(\u78bc)", "\u679c\u5dba\u6df1\u5ea6(\u78bc)", "\u63ee\u687f\u6b21\u6578", "\u9010\u687f\u8ddd\u96e2(\u78bc)"]
  ];

  round.holes.forEach((hole) => {
    rows.push([
      String(hole.hole),
      String(hole.par),
      String(hole.distance),
      String(hole.greenDepth),
      hole.savedRecord ? String(hole.savedRecord.shots) : "",
      formatShotDistances(hole.shotDistances)
    ]);
  });

  return rows
    .map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, "\"\"")}"`).join(","))
    .join("\r\n");
}

function handleRoundExport(roundId) {
  const round = getRoundHistoryById(roundId);
  if (!round) {
    return;
  }
  const blob = new Blob(["\ufeff" + buildRoundCsvContent(round)], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${round.courseName}-${round.teeName}-${round.date.slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
  showMessage(elements.exportResult, "CSV \u5df2\u532f\u51fa\u3002", "is-info");
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
    state.profile.selectedCourseId = DEFAULT_COURSE_ID;
    state.profile.selectedTeeId = DEFAULT_TEE_ID;
    state.activeAppPage = "course";
    state.pendingCourseId = DEFAULT_COURSE_ID;
    state.pendingTeeId = DEFAULT_TEE_ID;
    state.courses = createEmptyCourseMap();
    state.rounds = [];
    state.selectedRoundId = "";
    state.isRoundHistoryExpanded = false;
    state.isMenuOpen = false;
    state.isCourseDetailsOpen = false;
    state.page = "front";
    state.selectedHoleIndex = 0;
    state.saveHoleNextHint = "";
    removeStorage(CURRENT_USER_KEY);
    renderAll();
  });

  elements.courseSelect.addEventListener("change", () => {
    state.pendingCourseId = elements.courseSelect.value;
    state.pendingTeeId = getCourseDefinition(state.pendingCourseId).tees[0].id;
    state.isCourseDetailsOpen = false;
    renderCourseSelect();
    renderCourseDetails();
  });
  elements.teeTabs.forEach((button) => {
    button.addEventListener("click", () => {
      state.pendingTeeId = button.dataset.tee;
      state.isCourseDetailsOpen = false;
      renderCourseSelect();
      renderCourseDetails();
    });
  });
  elements.courseDetailsButton.addEventListener("click", () => {
    state.isCourseDetailsOpen = !state.isCourseDetailsOpen;
    renderCourseDetails();
  });
  elements.confirmCourseButton.addEventListener("click", () => {
    state.profile.selectedCourseId = state.pendingCourseId;
    state.profile.selectedTeeId = state.pendingTeeId;
    state.page = "front";
    state.selectedHoleIndex = 0;
    saveCurrentUserData();
    setActiveAppPage("play");
  });

  elements.tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      state.page = tab.dataset.page;
      state.selectedHoleIndex = state.page === "front" ? Math.min(state.selectedHoleIndex, 8) : Math.max(state.selectedHoleIndex, 9);
      state.isShotListExpanded = false;
      renderAll();
    });
  });
  elements.holeList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-index]");
    if (button) {
      state.selectedHoleIndex = Number(button.dataset.index);
      state.isShotListExpanded = false;
      renderHoleEditor();
      renderHoleList();
    }
  });
  elements.toggleGreenDepthButton.addEventListener("click", () => {
    state.isGreenDepthOpen = !state.isGreenDepthOpen;
    renderGreenDepthPanel();
  });
  elements.greenDepthInput.addEventListener("input", refreshEstimate);
  elements.confirmShotButton.addEventListener("click", handleConfirmShot);
  elements.shotDistanceInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleConfirmShot();
    }
  });
  elements.shotDistanceInput.addEventListener("input", () => setFieldError(elements.shotDistanceError));
  elements.toggleShotListButton.addEventListener("click", () => {
    state.isShotListExpanded = !state.isShotListExpanded;
    renderShotList();
  });
  elements.shotList.addEventListener("click", (event) => {
    const button = event.target.closest(".remove-shot");
    if (!button) {
      return;
    }
    currentHole().shotDistances.splice(Number(button.dataset.shotIndex), 1);
    currentHole().savedRecord = null;
    refreshEstimate();
  });
  elements.resetHoleButton.addEventListener("click", () => {
    if (!window.confirm("\u78ba\u5b9a\u8981\u6e05\u9664\u9019\u6d1e\u7684\u7d00\u9304\u55ce\uff1f")) {
      return;
    }
    const tee = getTeeDefinition();
    currentCourseHoles()[state.selectedHoleIndex] = makeHoleState(tee.holes[state.selectedHoleIndex]);
    saveCurrentUserData();
    renderAll();
  });
  elements.saveHoleRecordButton.addEventListener("click", handleSaveHoleRecord);
  elements.goSummaryButton.addEventListener("click", () => setActiveAppPage("summary"));

  elements.roundSaveModeTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      state.roundSaveMode = tab.dataset.roundSaveMode || "full";
      renderOverview();
      renderRoundSavePanel();
    });
  });
  elements.saveRoundButton.addEventListener("click", () => {
    if (!canSaveRoundHistory()) {
      return;
    }
    const config = getRoundSaveConfig();
    if (!window.confirm(`確定要儲存${config.label}本次紀錄嗎？`)) {
      return;
    }
    saveCurrentRoundHistory();
    resetCurrentCourseProgress();
    saveCurrentUserData();
    setActiveAppPage("history");
  });

  elements.toggleRoundHistoryButton.addEventListener("click", () => {
    state.isRoundHistoryExpanded = !state.isRoundHistoryExpanded;
    renderRecentRounds();
  });
  elements.recentRoundsList.addEventListener("click", (event) => {
    const deleteButton = event.target.closest("[data-round-delete]");
    if (deleteButton) {
      const round = getRoundHistoryById(deleteButton.dataset.roundDelete);
      const roundLabel = round ? `${round.courseName} ${round.teeName} ${round.roundLabel}` : "\u9019\u7b46 round";
      if (!window.confirm(`\u78ba\u5b9a\u8981\u522a\u9664${roundLabel}\u55ce\uff1f`)) {
        return;
      }
      state.rounds = state.rounds.filter((round) => round.id !== deleteButton.dataset.roundDelete);
      if (state.selectedRoundId === deleteButton.dataset.roundDelete) {
        state.selectedRoundId = "";
      }
      saveCurrentUserData();
      renderRecentRounds();
      return;
    }
    const exportButton = event.target.closest("[data-round-export]");
    if (exportButton) {
      handleRoundExport(exportButton.dataset.roundExport);
      return;
    }
    const detailButton = event.target.closest("[data-round-view]");
    if (detailButton) {
      state.selectedRoundId = state.selectedRoundId === detailButton.dataset.roundView ? "" : detailButton.dataset.roundView;
      renderRecentRounds();
    }
  });
}

initStaticText();
loadSession();
bindEvents();
renderAll();
