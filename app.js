const COURSES = [
  {
    id: "palm-lake",
    name: "棕梠湖球場",
    holes: [
      { hole: 1, par: 5, distance: 495 },
      { hole: 2, par: 4, distance: 390 },
      { hole: 3, par: 3, distance: 154 },
      { hole: 4, par: 4, distance: 314 },
      { hole: 5, par: 4, distance: 341 },
      { hole: 6, par: 3, distance: 180 },
      { hole: 7, par: 4, distance: 374 },
      { hole: 8, par: 5, distance: 485 },
      { hole: 9, par: 4, distance: 397 },
      { hole: 10, par: 4, distance: 359 },
      { hole: 11, par: 4, distance: 390 },
      { hole: 12, par: 4, distance: 408 },
      { hole: 13, par: 5, distance: 567 },
      { hole: 14, par: 3, distance: 173 },
      { hole: 15, par: 4, distance: 410 },
      { hole: 16, par: 4, distance: 363 },
      { hole: 17, par: 3, distance: 149 },
      { hole: 18, par: 5, distance: 478 }
    ]
  },
  {
    id: "hsinyi",
    name: "信誼球場",
    holes: [
      { hole: 1, par: 4, distance: 392 },
      { hole: 2, par: 4, distance: 448 },
      { hole: 3, par: 3, distance: 196 },
      { hole: 4, par: 5, distance: 531 },
      { hole: 5, par: 4, distance: 408 },
      { hole: 6, par: 3, distance: 220 },
      { hole: 7, par: 4, distance: 374 },
      { hole: 8, par: 5, distance: 627 },
      { hole: 9, par: 4, distance: 472 },
      { hole: 10, par: 4, distance: 418 },
      { hole: 11, par: 4, distance: 449 },
      { hole: 12, par: 4, distance: 449 },
      { hole: 13, par: 3, distance: 206 },
      { hole: 14, par: 4, distance: 406 },
      { hole: 15, par: 5, distance: 530 },
      { hole: 16, par: 4, distance: 407 },
      { hole: 17, par: 3, distance: 194 },
      { hole: 18, par: 5, distance: 495 }
    ]
  }
];

const DEFAULT_COURSE_ID = COURSES[0].id;
const USER_INDEX_KEY = "golf-users-index";
const CURRENT_USER_KEY = "golf-current-user";
const LEGACY_STORAGE_KEY = "golf-green-estimator";

const state = {
  page: "front",
  selectedHoleIndex: 0,
  selectedRoundId: "",
  roundSaveMode: "full",
  isStatsOpen: false,
  isGreenDepthOpen: false,
  isShotListExpanded: false,
  isRoundHistoryExpanded: false,
  profile: {
    username: "",
    selectedCourseId: DEFAULT_COURSE_ID
  },
  courses: {},
  rounds: []
};

const elements = {
  loginPanel: document.getElementById("loginPanel"),
  appPanel: document.getElementById("appPanel"),
  usernameInput: document.getElementById("usernameInput"),
  loginButton: document.getElementById("loginButton"),
  loginMessage: document.getElementById("loginMessage"),
  welcomeText: document.getElementById("welcomeText"),
  logoutButton: document.getElementById("logoutButton"),
  profileMessage: document.getElementById("profileMessage"),
  exportResult: document.getElementById("exportResult"),
  savedHolesValue: document.getElementById("savedHolesValue"),
  toggleStatsButton: document.getElementById("toggleStatsButton"),
  statsDetailPanel: document.getElementById("statsDetailPanel"),
  frontNineShotsValue: document.getElementById("frontNineShotsValue"),
  backNineShotsValue: document.getElementById("backNineShotsValue"),
  allShotsValue: document.getElementById("allShotsValue"),
  courseSelect: document.getElementById("courseSelect"),
  holeList: document.getElementById("holeList"),
  tabs: Array.from(document.querySelectorAll(".hole-page-tab")),
  editorTitle: document.getElementById("editorTitle"),
  holeSubtitle: document.getElementById("holeSubtitle"),
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
  saveHoleBar: document.getElementById("saveHoleBar"),
  saveHoleRecordButton: document.getElementById("saveHoleRecordButton"),
  saveHoleHint: document.getElementById("saveHoleHint"),
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

function makeDefaultHoleConfig(baseHole) {
  return {
    ...baseHole,
    greenDepth: 20,
    shotDistances: [],
    lastEstimate: null,
    savedRecord: null
  };
}

function resolveGreenDepth(savedHole) {
  const numeric = sanitizeNumber(savedHole.greenDepth);
  return numeric === "" ? 20 : numeric;
}

function createEmptyCourseState(course) {
  return course.holes.map(makeDefaultHoleConfig);
}

function createDefaultCourseMap() {
  return Object.fromEntries(
    COURSES.map((course) => [course.id, createEmptyCourseState(course)])
  );
}

function sanitizeNumber(value) {
  if (value === "" || value === null || value === undefined) {
    return "";
  }

  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : "";
}

function normalizeUsername(username) {
  return username.trim();
}

function getUserStorageKey(username) {
  return `golf-user-${normalizeUsername(username)}`;
}

function getCourseDefinition(courseId = state.profile.selectedCourseId) {
  return COURSES.find((course) => course.id === courseId) || COURSES[0];
}

function currentCourseId() {
  return state.profile.selectedCourseId || DEFAULT_COURSE_ID;
}

function currentCourseName() {
  return getCourseDefinition().name;
}

function currentCourseHoles() {
  if (!state.courses[currentCourseId()]) {
    state.courses[currentCourseId()] = createEmptyCourseState(getCourseDefinition());
  }
  return state.courses[currentCourseId()];
}

function currentPageRange() {
  return state.page === "front"
    ? { start: 0, end: 9, label: "前 9 洞" }
    : { start: 9, end: 18, label: "後 9 洞" };
}

function currentHole() {
  return currentCourseHoles()[state.selectedHoleIndex];
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

function getCurrentUserRounds() {
  return Array.isArray(state.rounds) ? state.rounds : [];
}

function getTotalShotsForHoles(holes) {
  return holes.reduce((sum, hole) => sum + (hole.savedRecord ? hole.savedRecord.shots : 0), 0);
}

function getSavedHoleCountForHoles(holes) {
  return holes.filter((hole) => hole.savedRecord).length;
}

function canSaveRoundHistory() {
  const holes = getRoundSaveHoles();
  const { targetCount } = getRoundSaveConfig();
  return holes.length === targetCount && getSavedHoleCountForHoles(holes) === targetCount;
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

function createRoundId() {
  return `round-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function cloneRoundHoles(holes) {
  return holes.map((hole) => ({
    hole: hole.hole,
    par: hole.par,
    distance: hole.distance,
    greenDepth: hole.greenDepth,
    shotDistances: [...hole.shotDistances],
    savedRecord: hole.savedRecord ? { ...hole.savedRecord } : null,
    lastEstimate: hole.lastEstimate ? { ...hole.lastEstimate } : null
  }));
}

function formatShotDistances(shotDistances) {
  if (!Array.isArray(shotDistances) || shotDistances.length === 0) {
    return "-";
  }

  return shotDistances.join(" / ");
}

function formatRoundRangeText(round) {
  if (round.roundMode === "front") {
    return "前9，完成1~9";
  }

  if (round.roundMode === "back") {
    return "後9，完成10~18";
  }

  return "18洞，完成1~18";
}

function getRoundHistoryById(roundId) {
  return getCurrentUserRounds().find((round) => round.id === roundId) || null;
}

function saveCurrentRoundHistory() {
  const config = getRoundSaveConfig();
  if (!canSaveRoundHistory()) {
    return {
      ok: false,
      message: `必須完成${config.label}後，才能儲存本次 round。`
    };
  }

  const holes = getRoundSaveHoles();
  const round = {
    id: createRoundId(),
    date: new Date().toISOString(),
    courseId: currentCourseId(),
    courseName: currentCourseName(),
    teeName: "White tee",
    roundMode: config.mode,
    roundLabel: config.label,
    holeTargetCount: config.targetCount,
    totalShots: getTotalShotsForHoles(holes),
    savedHoleCount: getSavedHoleCountForHoles(holes),
    holes: cloneRoundHoles(holes),
    createdAt: new Date().toISOString(),
    notes: ""
  };

  state.rounds = [round, ...getCurrentUserRounds()].slice(0, 50);
  state.selectedRoundId = "";
  saveCurrentUserData();
  return { ok: true, round };
}

function resetCurrentCourseProgress() {
  const course = getCourseDefinition();
  const holes = currentCourseHoles();
  const config = getRoundSaveConfig();

  for (let index = config.start; index < config.end; index += 1) {
    holes[index] = makeDefaultHoleConfig(course.holes[index]);
  }

  state.page = config.mode === "back" ? "back" : "front";
  state.selectedHoleIndex = config.start;
  state.isShotListExpanded = false;
}

function deleteRoundHistory(roundId) {
  const nextRounds = getCurrentUserRounds().filter((round) => round.id !== roundId);
  state.rounds = nextRounds;
  if (state.selectedRoundId === roundId) {
    state.selectedRoundId = nextRounds[0]?.id || "";
  }
  saveCurrentUserData();
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

function hideElement(element) {
  element.classList.add("hidden");
}

function setFieldError(element, text = "") {
  if (!element) {
    return;
  }

  if (!text) {
    element.textContent = "";
    element.classList.add("hidden");
    return;
  }

  element.textContent = text;
  element.classList.remove("hidden");
}

function isLoggedIn() {
  return state.profile.username.length > 0;
}

function getStorageItem(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function setStorageItem(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    return false;
  }
}

function removeStorageItem(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
}

function readJsonStorage(key, fallback) {
  const raw = getStorageItem(key);
  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    return fallback;
  }
}

function writeJsonStorage(key, value) {
  try {
    return setStorageItem(key, JSON.stringify(value));
  } catch (error) {
    return false;
  }
}

function getUserIndex() {
  const list = readJsonStorage(USER_INDEX_KEY, []);
  return Array.isArray(list) ? list : [];
}

function saveUserIndex(usernames) {
  writeJsonStorage(USER_INDEX_KEY, usernames);
}

function ensureUserInIndex(username) {
  const normalized = normalizeUsername(username);
  const list = getUserIndex();
  if (!list.includes(normalized)) {
    list.push(normalized);
    list.sort((a, b) => a.localeCompare(b, "zh-Hant"));
    saveUserIndex(list);
  }
}

function hydrateCourseHoles(courseId, storedHoles) {
  const course = getCourseDefinition(courseId);
  return course.holes.map((baseHole, index) => {
    const savedHole = storedHoles?.[index] || {};
    return {
      ...makeDefaultHoleConfig(baseHole),
      greenDepth: resolveGreenDepth(savedHole),
      shotDistances: Array.isArray(savedHole.shotDistances)
        ? savedHole.shotDistances.map((item) => sanitizeNumber(item)).filter((item) => item !== "")
        : [],
      lastEstimate: savedHole.lastEstimate || null,
      savedRecord: savedHole.savedRecord || null
    };
  });
}

function createEmptyUserData(username) {
  return {
    username,
    selectedCourseId: DEFAULT_COURSE_ID,
    courses: createDefaultCourseMap(),
    rounds: [],
    updatedAt: new Date().toISOString()
  };
}

function migrateLegacyDataToUser(username) {
  const legacy = readJsonStorage(LEGACY_STORAGE_KEY, null);
  if (!legacy || legacy?.profile?.username !== username) {
    return null;
  }

  const legacyCourse = getCourseDefinition(DEFAULT_COURSE_ID);
  const legacyHoles = legacyCourse.holes.map((baseHole, index) => {
    const savedHole = legacy?.holes?.[index] || {};
    let shotDistances = Array.isArray(savedHole.shotDistances) ? savedHole.shotDistances : [];

    if (shotDistances.length === 0) {
      const oldRemainders = Array.isArray(savedHole.shotRemainders)
        ? savedHole.shotRemainders.map((item) => sanitizeNumber(item)).filter((item) => item !== "")
        : [];
      const oldTeeShot = sanitizeNumber(savedHole.teeShotDistance);
      let previousRemainder = baseHole.distance;

      if (oldTeeShot !== "") {
        shotDistances.push(oldTeeShot);
        previousRemainder = Math.max(baseHole.distance - oldTeeShot, 0);
      }

      oldRemainders.forEach((remainder) => {
        const shotDistance = Math.max(previousRemainder - remainder, 0);
        if (shotDistance > 0) {
          shotDistances.push(shotDistance);
        }
        previousRemainder = remainder;
      });
    }

    return {
      ...makeDefaultHoleConfig(baseHole),
      greenDepth: resolveGreenDepth(savedHole),
      shotDistances: shotDistances.map((item) => sanitizeNumber(item)).filter((item) => item !== ""),
      lastEstimate: savedHole.lastEstimate || null,
      savedRecord: savedHole.savedRecord || null
    };
  });

  return {
    username,
    selectedCourseId: DEFAULT_COURSE_ID,
    courses: {
      ...createDefaultCourseMap(),
      [DEFAULT_COURSE_ID]: legacyHoles
    },
    rounds: [],
    updatedAt: new Date().toISOString()
  };
}

function loadUserData(username) {
  const normalized = normalizeUsername(username);
  const stored = readJsonStorage(getUserStorageKey(normalized), null);
  if (stored) {
    const hasCourseMap = stored.courses && typeof stored.courses === "object";
    const selectedCourseId = COURSES.some((course) => course.id === stored.selectedCourseId)
      ? stored.selectedCourseId
      : DEFAULT_COURSE_ID;
    const courses = Object.fromEntries(
      COURSES.map((course) => {
        const sourceHoles = hasCourseMap ? stored.courses?.[course.id] : course.id === DEFAULT_COURSE_ID ? stored.holes : null;
        return [course.id, hydrateCourseHoles(course.id, sourceHoles)];
      })
    );

    return {
      username: normalized,
      selectedCourseId,
      courses,
      rounds: Array.isArray(stored.rounds) ? stored.rounds : [],
      updatedAt: stored.updatedAt || ""
    };
  }

  const migrated = migrateLegacyDataToUser(normalized);
  return migrated || createEmptyUserData(normalized);
}

function saveCurrentUserData() {
  if (!isLoggedIn()) {
    return;
  }

  ensureUserInIndex(state.profile.username);
  setStorageItem(CURRENT_USER_KEY, state.profile.username);
  writeJsonStorage(getUserStorageKey(state.profile.username), {
    username: state.profile.username,
    selectedCourseId: currentCourseId(),
    courses: state.courses,
    rounds: getCurrentUserRounds(),
    updatedAt: new Date().toISOString()
  });
}

function applyUserData(userData) {
  state.profile.username = userData.username;
  state.profile.selectedCourseId = userData.selectedCourseId || DEFAULT_COURSE_ID;
  state.page = "front";
  state.selectedHoleIndex = 0;
  state.courses = userData.courses || createDefaultCourseMap();
  state.selectedRoundId = "";
  state.isRoundHistoryExpanded = false;
  state.rounds = Array.isArray(userData.rounds) ? userData.rounds : [];
}

function loadSession() {
  const currentUsername = normalizeUsername(getStorageItem(CURRENT_USER_KEY) || "");
  if (!currentUsername) {
    state.profile.username = "";
    state.profile.selectedCourseId = DEFAULT_COURSE_ID;
    state.courses = createDefaultCourseMap();
    state.rounds = [];
    state.selectedRoundId = "";
    state.isRoundHistoryExpanded = false;
    return;
  }

  ensureUserInIndex(currentUsername);
  applyUserData(loadUserData(currentUsername));
}

function validateUsername(username) {
  if (!normalizeUsername(username)) {
    return "請輸入帳號名稱。";
  }

  return "";
}

function validateHole(hole) {
  if (!Number.isFinite(hole.greenDepth) || hole.greenDepth <= 0) {
    return "請先輸入有效的果嶺深度。";
  }

  for (let index = 0; index < hole.shotDistances.length; index += 1) {
    const shotDistance = hole.shotDistances[index];
    if (!Number.isFinite(shotDistance) || shotDistance <= 0) {
      return `第 ${index + 1} 桿的擊球距離必須大於 0。`;
    }

    if (shotDistance > 500) {
      return `第 ${index + 1} 桿的擊球距離不能超過 500 碼。`;
    }
  }

  return "";
}

function getTrajectory(hole) {
  let x = hole.distance;
  let previousZone = "front";

  return hole.shotDistances.map((shotDistance, index) => {
    const shotNumber = index + 1;
    let outcome = "";
    let completed = false;
    let distanceToGreen = null;

    if (x >= 0) {
      x -= shotDistance;
    } else {
      x += shotDistance;
    }

    let currentZone = "";
    if (x > hole.greenDepth) {
      currentZone = "front";
      distanceToGreen = x - hole.greenDepth;
      if (previousZone === "back" || previousZone === "green") {
        outcome = `打回果嶺前，距離果嶺 ${distanceToGreen} 碼`;
      } else {
        outcome = `距離果嶺 ${distanceToGreen} 碼`;
      }
    } else if (x >= 0 && x <= hole.greenDepth) {
      currentZone = "green";
      completed = true;
      distanceToGreen = 0;
      if (previousZone === "back") {
        outcome = `回到果嶺，距離球洞 ${x} 碼`;
      } else {
        outcome = `進入果嶺，距離球洞 ${x} 碼`;
      }
    } else {
      currentZone = "back";
      const overshoot = Math.abs(x);
      if (previousZone === "back") {
        outcome = `仍超出果嶺 ${overshoot} 碼`;
      } else {
        outcome = `超出果嶺 ${overshoot} 碼`;
      }
    }

    previousZone = currentZone;

    return {
      shotNumber,
      shotDistance,
      zone: currentZone,
      value: Math.abs(x),
      distanceToGreen,
      completed,
      outcome
    };
  });
}

function calculateEstimate(hole) {
  if (hole.shotDistances.length === 0) {
    return {
      estimatedShotsToGreen: null,
      detail: "至少輸入一桿擊球距離，才能開始記錄。"
    };
  }

  const trajectory = getTrajectory(hole);
  const lastStep = trajectory[trajectory.length - 1];

  if (lastStep.completed) {
    return {
      estimatedShotsToGreen: lastStep.shotNumber,
      detail: `第 ${lastStep.shotNumber} 桿後，${lastStep.outcome}。`
    };
  }

  return {
    estimatedShotsToGreen: null,
    detail: lastStep.zone === "back"
      ? `目前超出果嶺 ${lastStep.value} 碼，請繼續輸入下一桿。`
      : `目前距離果嶺 ${lastStep.distanceToGreen ?? 0} 碼，尚未進入果嶺。`
  };
}

function syncGreenDepthToState() {
  currentHole().greenDepth = sanitizeNumber(elements.greenDepthInput.value);
}

function getSavedRecords() {
  return currentCourseHoles().filter((hole) => hole.savedRecord);
}

function getAverageGir() {
  const savedRecords = getSavedRecords();
  if (savedRecords.length === 0) {
    return "";
  }

  const totalShots = savedRecords.reduce((sum, hole) => sum + hole.savedRecord.shots, 0);
  return (totalShots / savedRecords.length).toFixed(2);
}

function refreshEstimate() {
  syncGreenDepthToState();
  const hole = currentHole();
  const errorMessage = validateHole(hole);

  if (errorMessage) {
    hole.lastEstimate = null;
    hideElement(elements.saveHoleBar);
    renderShotList();
    renderHoleList();
    renderOverview();
    renderRoundSavePanel();
    renderStats();
    saveCurrentUserData();
    return;
  }

  const estimate = calculateEstimate(hole);
  hole.lastEstimate = estimate.estimatedShotsToGreen ? estimate : null;
  renderShotList();
  renderHoleList();
  renderSaveHoleBar();
  renderOverview();
  renderRoundSavePanel();
  renderStats();
  saveCurrentUserData();
}

function renderAppVisibility() {
  elements.loginPanel.classList.toggle("hidden", isLoggedIn());
  elements.appPanel.classList.toggle("hidden", !isLoggedIn());
}

function renderProfile() {
  elements.welcomeText.textContent = state.profile.username;
}

function renderStats() {
  const holes = currentCourseHoles();
  const savedRecords = getSavedRecords();
  const holeCount = holes.length;
  const frontNineShots = holes.slice(0, 9).reduce((sum, hole) => sum + (hole.savedRecord ? hole.savedRecord.shots : 0), 0);
  const backNineShots = holes.slice(9, 18).reduce((sum, hole) => sum + (hole.savedRecord ? hole.savedRecord.shots : 0), 0);
  const allShots = frontNineShots + backNineShots;

  elements.savedHolesValue.textContent = `${savedRecords.length} / ${holeCount}`;
  elements.frontNineShotsValue.textContent = String(frontNineShots);
  elements.backNineShotsValue.textContent = String(backNineShots);
  elements.allShotsValue.textContent = String(allShots);
}

function renderStatsDetailPanel() {
  elements.statsDetailPanel.classList.toggle("hidden", !state.isStatsOpen);
  elements.toggleStatsButton.setAttribute("aria-expanded", String(state.isStatsOpen));
}

function renderCourseSelect() {
  elements.courseSelect.innerHTML = COURSES.map((course) => `
    <option value="${course.id}">${course.name}</option>
  `).join("");
  elements.courseSelect.value = currentCourseId();
}

function renderHoleTabs() {
  elements.tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.page === state.page);
  });
}

function renderHoleList() {
  const holes = currentCourseHoles();
  const start = state.page === "front" ? 0 : 9;
  const pageHoles = holes.slice(start, start + 9);
  elements.holeList.innerHTML = pageHoles.map((hole, index) => {
    const actualIndex = start + index;
    return `
      <button class="hole-chip ${hole.savedRecord ? "saved" : ""} ${actualIndex === state.selectedHoleIndex ? "active" : ""}" type="button" data-index="${actualIndex}">
        <strong>${hole.hole}</strong>
      </button>
    `;
  }).join("");
}

function renderShotList() {
  const hole = currentHole();
  const trajectory = getTrajectory(hole);
  const shouldCollapse = trajectory.length > 1 && !state.isShotListExpanded;
  const visibleSteps = shouldCollapse ? [trajectory[trajectory.length - 1]] : trajectory;
  elements.emptyShotNote.classList.toggle("hidden", hole.shotDistances.length > 0);
  elements.shotList.innerHTML = visibleSteps.map((step) => `
    <div class="shot-row">
      <div class="shot-label">第 ${step.shotNumber} 桿</div>
      <div class="field">
        <input type="number" value="${step.shotDistance}" readonly>
      </div>
      <div class="shot-remainder">${step.outcome}</div>
      <button class="icon-button remove-shot" type="button" data-shot-index="${step.shotNumber - 1}" aria-label="刪除這一桿">×</button>
    </div>
  `).join("");
  renderShotListToggle(trajectory.length);
}

function renderSaveHoleBar() {
  const hole = currentHole();
  const isCompleted = Boolean(hole.lastEstimate && hole.lastEstimate.estimatedShotsToGreen);
  elements.saveHoleBar.classList.toggle("hidden", !isCompleted);

  if (!isCompleted) {
    return;
  }

  elements.saveHoleHint.textContent = hole.savedRecord
    ? `此洞已儲存，揮桿 ${hole.savedRecord.shots} 次。`
    : "此洞已進入果嶺，可儲存本洞紀錄。";
}

function renderHoleEditor() {
  const hole = currentHole();
  elements.editorTitle.textContent = `第 ${hole.hole} 洞`;
  elements.holeSubtitle.textContent = `${currentCourseName()} White tee`;
  elements.parValue.textContent = hole.par;
  elements.distanceValue.textContent = `${hole.distance} 碼`;
  elements.greenDepthInput.value = hole.greenDepth;
  elements.shotDistanceInput.value = "";
  renderShotList();
  renderSaveHoleBar();
}

function renderOverview() {
  const holes = currentCourseHoles();
  const { start, end, label } = currentPageRange();
  const pageHoles = holes.slice(start, end);
  const totalShots = pageHoles.reduce((sum, hole) => sum + (hole.savedRecord ? hole.savedRecord.shots : 0), 0);
  elements.overviewTitle.textContent = `${label}紀錄與揮桿次數`;
  elements.totalShotsValue.textContent = String(totalShots);
  elements.overviewList.innerHTML = pageHoles.map((hole) => {
    const resultText = hole.savedRecord ? hole.savedRecord.resultText : "尚無紀錄";
    const shotsText = hole.savedRecord ? `${hole.savedRecord.shots} 桿` : "-";

    return `
      <div class="overview-row ${hole.savedRecord ? "saved" : ""}">
        <strong>第 ${hole.hole} 洞</strong>
        <span>Par ${hole.par}</span>
        <span>${resultText}</span>
        <div class="overview-shots">${shotsText}</div>
      </div>
    `;
  }).join("");
}

function renderRoundSavePanel() {
  const config = getRoundSaveConfig();
  const holes = getRoundSaveHoles();
  const savedHoleCount = getSavedHoleCountForHoles(holes);
  const canSave = canSaveRoundHistory();

  elements.roundSaveModeTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.roundSaveMode === state.roundSaveMode);
  });
  elements.roundSaveStatusValue.textContent = `${savedHoleCount} / ${config.targetCount}`;
  elements.roundSaveCourseValue.textContent = `${currentCourseName()} White tee ${config.label}`;
  elements.saveRoundButton.disabled = !canSave;
  elements.saveRoundButton.setAttribute("aria-disabled", String(!canSave));

  if (canSave) {
    showMessage(elements.saveRoundMessage, `${config.label}都已完成，可儲存本次 round。`, "is-info");
    return;
  }

  showMessage(elements.saveRoundMessage, `尚未完成${config.label}的 savedRecord，完成後才能儲存本次 round。`, "is-warn");
}

function renderRecentRounds() {
  const allRounds = getCurrentUserRounds().slice(0, 5);
  const rounds = state.isRoundHistoryExpanded ? allRounds : allRounds.slice(0, 1);
  elements.recentRoundsEmpty.classList.toggle("hidden", rounds.length > 0);
  elements.toggleRoundHistoryButton.classList.toggle("hidden", allRounds.length <= 1);
  elements.toggleRoundHistoryButton.setAttribute("aria-expanded", String(state.isRoundHistoryExpanded));
  elements.recentRoundsList.innerHTML = rounds.map((round) => `
    <div class="round-history-item ${round.id === state.selectedRoundId ? "active" : ""}">
      <button class="round-delete-button" type="button" data-round-delete="${round.id}" aria-label="刪除這筆 round">×</button>
      <div class="round-history-meta">
        <strong>${formatRoundDate(round.date)}</strong>
        <span>${round.courseName} ${round.teeName || "White tee"}</span>
        <span>${formatRoundRangeText(round)}</span>
        <span>總桿 ${round.totalShots}</span>
      </div>
      <div class="round-history-actions">
        <button class="btn btn-accent round-action-button" type="button" data-round-export="${round.id}">匯出 CSV</button>
        <button class="btn btn-soft round-action-button" type="button" data-round-view="${round.id}" aria-expanded="${round.id === state.selectedRoundId ? "true" : "false"}">細項 ▾</button>
      </div>
      ${renderRoundDetail(round.id)}
    </div>
  `).join("");
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
          <span>日期</span>
          <strong>${formatRoundDate(round.date)}</strong>
        </div>
        <div class="stat-card">
          <span>球場</span>
          <strong>${round.courseName} ${round.teeName || "White tee"}</strong>
        </div>
        <div class="stat-card">
          <span>範圍</span>
          <strong>${round.roundLabel || "18 洞"}</strong>
        </div>
        <div class="stat-card">
          <span>總桿</span>
          <strong>${round.totalShots}</strong>
        </div>
      </div>
      <div class="round-detail-hole-list">
        ${round.holes.map((hole) => `
          <div class="round-detail-hole-item">
            <div class="round-detail-hole-top">
              <strong>第 ${hole.hole} 洞</strong>
              <span>Par ${hole.par}</span>
              <span>${hole.distance} 碼</span>
            </div>
            <span>果嶺深度 ${hole.greenDepth} 碼</span>
            <span>${hole.savedRecord ? `${hole.savedRecord.shots} 桿` : "-"}</span>
            <span>${hole.savedRecord ? hole.savedRecord.resultText : "尚無紀錄"}</span>
            <span>逐桿距離：${formatShotDistances(hole.shotDistances)}</span>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function renderGreenDepthPanel() {
  elements.greenDepthPanel.classList.toggle("hidden", !state.isGreenDepthOpen);
  elements.toggleGreenDepthButton.setAttribute("aria-expanded", String(state.isGreenDepthOpen));
}

function renderShotListToggle(totalShots) {
  const showToggle = totalShots > 1;
  elements.toggleShotListButton.classList.toggle("hidden", !showToggle);
  elements.toggleShotListButton.setAttribute("aria-expanded", String(state.isShotListExpanded));
}

function renderAll() {
  renderAppVisibility();
  if (!isLoggedIn()) {
    elements.usernameInput.value = "";
    hideMessage(elements.exportResult);
    setFieldError(elements.shotDistanceError);
    return;
  }

  renderProfile();
  renderCourseSelect();
  renderStats();
  renderStatsDetailPanel();
  renderHoleTabs();
  renderHoleList();
  renderHoleEditor();
  renderGreenDepthPanel();
  renderOverview();
  renderRoundSavePanel();
  renderRecentRounds();
}

function downloadCsvFile(filename, content) {
  const blob = new Blob(["\ufeff" + content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
  return url;
}

function buildCsvContent() {
  const holes = currentCourseHoles();
  const rows = [
    ["帳號", state.profile.username],
    ["模擬球場", currentCourseName()],
    ["已完成洞數", String(getSavedRecords().length)],
    ["平均上果嶺", getAverageGir() ? `${getAverageGir()} 桿` : "-"],
    ["總揮桿", String(holes.reduce((sum, hole) => sum + (hole.savedRecord ? hole.savedRecord.shots : 0), 0))],
    [],
    ["洞別", "Par", "球洞長度(碼)", "果嶺深度(碼)", "揮桿次數", "逐桿距離(碼)"]
  ];

  holes.forEach((hole) => {
    rows.push([
      String(hole.hole),
      String(hole.par),
      String(hole.distance),
      String(hole.greenDepth),
      hole.savedRecord ? String(hole.savedRecord.shots) : "",
      hole.shotDistances.join(" / ")
    ]);
  });

  return rows
    .map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(","))
    .join("\r\n");
}

function buildRoundCsvContent(round) {
  const rows = [
    ["帳號", state.profile.username],
    ["模擬球場", round.courseName],
    ["Tee", round.teeName || "White tee"],
    ["範圍", round.roundLabel || "18 洞"],
    ["日期", formatRoundDate(round.date)],
    ["已完成洞數", String(round.savedHoleCount)],
    ["總揮桿", String(round.totalShots)],
    [],
    ["洞別", "Par", "球洞長度(碼)", "果嶺深度(碼)", "揮桿次數", "逐桿距離(碼)"]
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
    .map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(","))
    .join("\r\n");
}

function handleRoundExport(roundId) {
  const round = getRoundHistoryById(roundId);
  if (!round) {
    return;
  }

  const csvContent = buildRoundCsvContent(round);
  const safeUsername = state.profile.username.replace(/[\\/:*?"<>|]/g, "_");
  const safeCourseName = round.courseName.replace(/[\\/:*?"<>|]/g, "_");
  const safeDate = round.date.slice(0, 10);
  const filename = `${safeUsername}-${safeCourseName}-${safeDate}-round.csv`;
  const url = downloadCsvFile(filename, csvContent);
  elements.exportResult.innerHTML = `CSV 已建立：<a href="${url}" download="${filename}">${filename}</a>。如果剛剛沒看到下載，請點這個檔名再下載一次。`;
  elements.exportResult.className = "message is-info";
  elements.exportResult.classList.remove("hidden");
  
  const exportButton = document.querySelector(`[data-round-export="${roundId}"]`);
  if (exportButton) {
    const actionsContainer = exportButton.closest('.round-history-actions');
    if (actionsContainer) {
      actionsContainer.after(elements.exportResult);
    }
  }

  showMessage(elements.profileMessage, `已匯出 ${round.courseName} 的 round CSV。`, "is-info");
}

function handleLogin() {
  const username = normalizeUsername(elements.usernameInput.value);
  const errorMessage = validateUsername(username);
  if (errorMessage) {
    showMessage(elements.loginMessage, errorMessage, "is-error");
    return;
  }

  ensureUserInIndex(username);
  applyUserData(loadUserData(username));
  setStorageItem(CURRENT_USER_KEY, username);
  saveCurrentUserData();
  hideMessage(elements.loginMessage);
  hideMessage(elements.exportResult);
  renderAll();
  showMessage(elements.profileMessage, `已登入 ${username}，資料會依帳號與模擬球場分開儲存。`, "is-info");
}

function handleConfirmShot() {
  syncGreenDepthToState();
  const hole = currentHole();
  const shotDistance = sanitizeNumber(elements.shotDistanceInput.value);

  if (!Number.isFinite(hole.greenDepth) || hole.greenDepth <= 0) {
    setFieldError(elements.shotDistanceError, "請先設定有效的果嶺深度。");
    return;
  }

  if (!Number.isFinite(shotDistance) || shotDistance <= 0) {
    setFieldError(elements.shotDistanceError, "請輸入大於 0 的擊球距離。");
    return;
  }

  if (shotDistance > 500) {
    setFieldError(elements.shotDistanceError, "單桿擊球距離不能超過 500 碼。");
    return;
  }

  setFieldError(elements.shotDistanceError);
  hole.shotDistances.push(shotDistance);
  hole.savedRecord = null;
  state.isShotListExpanded = false;
  elements.shotDistanceInput.value = "";
  refreshEstimate();
}

function handleSaveHoleRecord() {
  const hole = currentHole();
  if (!hole.lastEstimate || !hole.lastEstimate.estimatedShotsToGreen) {
    return;
  }

  const trajectory = getTrajectory(hole);
  const lastStep = trajectory[trajectory.length - 1];
  hole.savedRecord = {
    shots: hole.lastEstimate.estimatedShotsToGreen,
    resultText: lastStep ? lastStep.outcome : "已完成",
    savedAt: new Date().toISOString()
  };

  saveCurrentUserData();
  renderHoleList();
  renderHoleEditor();
  renderOverview();
  renderRoundSavePanel();
  renderStats();
}

function handleCourseChange() {
  const nextCourseId = elements.courseSelect.value;
  if (!COURSES.some((course) => course.id === nextCourseId)) {
    return;
  }

  state.profile.selectedCourseId = nextCourseId;
  state.page = "front";
  state.selectedHoleIndex = 0;
  if (!state.courses[nextCourseId]) {
    state.courses[nextCourseId] = createEmptyCourseState(getCourseDefinition(nextCourseId));
  }

  hideMessage(elements.exportResult);
  saveCurrentUserData();
  renderAll();
  showMessage(elements.profileMessage, `目前模擬球場已切換為 ${currentCourseName()}。`, "is-info");
}

function bindEvents() {
  elements.loginButton.addEventListener("click", handleLogin);
  elements.logoutButton.addEventListener("click", () => {
    state.profile.username = "";
    state.profile.selectedCourseId = DEFAULT_COURSE_ID;
    state.courses = createDefaultCourseMap();
    state.rounds = [];
    state.selectedRoundId = "";
    state.isRoundHistoryExpanded = false;
    removeStorageItem(CURRENT_USER_KEY);
    hideMessage(elements.profileMessage);
    hideMessage(elements.exportResult);
    renderAll();
  });

  elements.saveRoundButton.addEventListener("click", () => {
    if (!canSaveRoundHistory()) {
      showMessage(elements.saveRoundMessage, `尚未完成${getRoundSaveConfig().label}的 savedRecord，完成後才能儲存本次 round。`, "is-warn");
      return;
    }

    const shouldSaveRound = window.confirm(`確認儲存 ${getRoundSaveConfig().label} 後，桿數就無法修改了。要儲存本次 Round 嗎？`);
    if (!shouldSaveRound) {
      return;
    }

    const savedRound = saveCurrentRoundHistory();
    if (!savedRound.ok) {
      showMessage(elements.saveRoundMessage, savedRound.message, "is-warn");
      return;
    }

    resetCurrentCourseProgress();
    saveCurrentUserData();
    renderRoundSavePanel();
    renderStats();
    renderHoleTabs();
    renderHoleList();
    renderHoleEditor();
    renderOverview();
    renderRecentRounds();
    showMessage(elements.saveRoundMessage, `已儲存${getRoundSaveConfig().label} round，並已重置該區紀錄。`, "is-info");
  });
  elements.courseSelect.addEventListener("change", handleCourseChange);
  elements.toggleStatsButton.addEventListener("click", () => {
    state.isStatsOpen = !state.isStatsOpen;
    renderStatsDetailPanel();
  });
  elements.toggleGreenDepthButton.addEventListener("click", () => {
    state.isGreenDepthOpen = !state.isGreenDepthOpen;
    renderGreenDepthPanel();
  });
  elements.toggleShotListButton.addEventListener("click", () => {
    state.isShotListExpanded = !state.isShotListExpanded;
    renderShotList();
  });
  elements.roundSaveModeTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      state.roundSaveMode = tab.dataset.roundSaveMode || "full";
      renderRoundSavePanel();
    });
  });
  elements.toggleRoundHistoryButton.addEventListener("click", () => {
    state.isRoundHistoryExpanded = !state.isRoundHistoryExpanded;
    renderRecentRounds();
  });

  elements.tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      state.page = tab.dataset.page;
      state.isShotListExpanded = false;
      if (state.page === "front" && state.selectedHoleIndex > 8) {
        state.selectedHoleIndex = 0;
      }
      if (state.page === "back" && state.selectedHoleIndex < 9) {
        state.selectedHoleIndex = 9;
      }
      renderHoleTabs();
      renderHoleList();
      renderHoleEditor();
      renderOverview();
    });
  });

  elements.holeList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-index]");
    if (!button) {
      return;
    }

    state.selectedHoleIndex = Number(button.dataset.index);
    state.isShotListExpanded = false;
    renderHoleList();
    renderHoleEditor();
  });

  elements.confirmShotButton.addEventListener("click", handleConfirmShot);
  elements.saveHoleRecordButton.addEventListener("click", handleSaveHoleRecord);

  elements.shotDistanceInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleConfirmShot();
    }
  });

  elements.shotDistanceInput.addEventListener("input", () => {
    const shotDistance = sanitizeNumber(elements.shotDistanceInput.value);
    if (shotDistance !== "" && shotDistance > 500) {
      setFieldError(elements.shotDistanceError, "單桿擊球距離不能超過 500 碼。");
      return;
    }

    setFieldError(elements.shotDistanceError);
  });

  elements.resetHoleButton.addEventListener("click", () => {
    const shouldReset = window.confirm("要清除此洞的所有擊球紀錄嗎？");
    if (!shouldReset) {
      return;
    }

    const course = getCourseDefinition();
    currentCourseHoles()[state.selectedHoleIndex] = makeDefaultHoleConfig(course.holes[state.selectedHoleIndex]);
    state.isShotListExpanded = false;
    elements.shotDistanceInput.value = "";
    saveCurrentUserData();
    renderHoleEditor();
    renderHoleList();
    renderOverview();
    renderRoundSavePanel();
    renderStats();
  });

  elements.shotList.addEventListener("click", (event) => {
    const removeButton = event.target.closest(".remove-shot");
    if (!removeButton) {
      return;
    }

    const shotIndex = Number(removeButton.dataset.shotIndex);
    currentHole().shotDistances.splice(shotIndex, 1);
    currentHole().savedRecord = null;
    if (currentHole().shotDistances.length <= 1) {
      state.isShotListExpanded = false;
    }
    refreshEstimate();
  });

  elements.recentRoundsList.addEventListener("click", (event) => {
    const deleteButton = event.target.closest("[data-round-delete]");
    if (deleteButton) {
      const roundId = deleteButton.dataset.roundDelete;
      const shouldDelete = window.confirm("要刪除這筆 round 歷史紀錄嗎？");
      if (!shouldDelete) {
        return;
      }

      deleteRoundHistory(roundId);
      renderRecentRounds();
      return;
    }

    const exportButton = event.target.closest("[data-round-export]");
    if (exportButton) {
      handleRoundExport(exportButton.dataset.roundExport);
      return;
    }

    const detailButton = event.target.closest("[data-round-view]");
    if (!detailButton) {
      return;
    }

    const roundId = detailButton.dataset.roundView;
    state.selectedRoundId = state.selectedRoundId === roundId ? "" : roundId;
    renderRecentRounds();
  });

  elements.greenDepthInput.addEventListener("input", refreshEstimate);
}

loadSession();
bindEvents();
renderAll();
