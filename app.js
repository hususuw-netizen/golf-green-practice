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
  }
];

const DEFAULT_COURSE_ID = COURSES[0].id;
const USER_INDEX_KEY = "golf-users-index";
const CURRENT_USER_KEY = "golf-current-user";
const LEGACY_STORAGE_KEY = "golf-green-estimator";

const state = {
  page: "front",
  selectedHoleIndex: 0,
  isStatsOpen: false,
  isGreenDepthOpen: false,
  isShotListExpanded: false,
  profile: {
    username: "",
    selectedCourseId: DEFAULT_COURSE_ID
  },
  courses: {}
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
  exportCsvButton: document.getElementById("exportCsvButton"),
  exportResult: document.getElementById("exportResult"),
  savedHolesValue: document.getElementById("savedHolesValue"),
  toggleStatsButton: document.getElementById("toggleStatsButton"),
  statsDetailPanel: document.getElementById("statsDetailPanel"),
  frontNineShotsValue: document.getElementById("frontNineShotsValue"),
  backNineShotsValue: document.getElementById("backNineShotsValue"),
  allShotsValue: document.getElementById("allShotsValue"),
  courseSelect: document.getElementById("courseSelect"),
  holeList: document.getElementById("holeList"),
  tabs: Array.from(document.querySelectorAll(".range-tab")),
  editorTitle: document.getElementById("editorTitle"),
  holeSubtitle: document.getElementById("holeSubtitle"),
  parValue: document.getElementById("parValue"),
  distanceValue: document.getElementById("distanceValue"),
  toggleGreenDepthButton: document.getElementById("toggleGreenDepthButton"),
  greenDepthPanel: document.getElementById("greenDepthPanel"),
  toggleShotListButton: document.getElementById("toggleShotListButton"),
  greenDepthInput: document.getElementById("greenDepthInput"),
  shotDistanceInput: document.getElementById("shotDistanceInput"),
  confirmShotButton: document.getElementById("confirmShotButton"),
  resetHoleButton: document.getElementById("resetHoleButton"),
  shotList: document.getElementById("shotList"),
  emptyShotNote: document.getElementById("emptyShotNote"),
  calcMessage: document.getElementById("calcMessage"),
  saveHoleBar: document.getElementById("saveHoleBar"),
  saveHoleRecordButton: document.getElementById("saveHoleRecordButton"),
  saveHoleHint: document.getElementById("saveHoleHint"),
  overviewTitle: document.getElementById("overviewTitle"),
  overviewList: document.getElementById("overviewList"),
  totalShotsValue: document.getElementById("totalShotsValue")
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
  const hasActivity = Array.isArray(savedHole.shotDistances) && savedHole.shotDistances.length > 0;
  const hasSavedRecord = Boolean(savedHole.savedRecord);

  if (numeric === "") {
    return 20;
  }

  if (numeric === 28 && !hasActivity && !hasSavedRecord) {
    return 20;
  }

  return numeric || 20;
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

function isLoggedIn() {
  return state.profile.username.length > 0;
}

function readJsonStorage(key, fallback) {
  const raw = localStorage.getItem(key);
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
  localStorage.setItem(key, JSON.stringify(value));
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
  localStorage.setItem(CURRENT_USER_KEY, state.profile.username);
  writeJsonStorage(getUserStorageKey(state.profile.username), {
    username: state.profile.username,
    selectedCourseId: currentCourseId(),
    courses: state.courses,
    updatedAt: new Date().toISOString()
  });
}

function applyUserData(userData) {
  state.profile.username = userData.username;
  state.profile.selectedCourseId = userData.selectedCourseId || DEFAULT_COURSE_ID;
  state.page = "front";
  state.selectedHoleIndex = 0;
  state.courses = userData.courses || createDefaultCourseMap();
}

function loadSession() {
  const currentUsername = normalizeUsername(localStorage.getItem(CURRENT_USER_KEY) || "");
  if (!currentUsername) {
    state.profile.username = "";
    state.profile.selectedCourseId = DEFAULT_COURSE_ID;
    state.courses = createDefaultCourseMap();
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

    if (shotDistance > 600) {
      return `第 ${index + 1} 桿的擊球距離不能超過 600 碼。`;
    }
  }

  return "";
}

function getTrajectory(hole) {
  let zone = "front";
  let value = hole.distance;

  return hole.shotDistances.map((shotDistance, index) => {
    const shotNumber = index + 1;
    let outcome = "";
    let completed = false;

    if (zone === "front") {
      const nextValue = value - shotDistance;
      if (nextValue >= 0) {
        value = nextValue;
        if (value <= hole.greenDepth) {
          outcome = value === 0 ? "進入果嶺，距離球洞 0 碼" : `進入果嶺，剩餘 ${value} 碼`;
          completed = true;
        } else {
          outcome = `剩餘 ${value} 碼`;
        }
      } else {
        const overshootFromFront = Math.abs(nextValue);
        if (overshootFromFront <= hole.greenDepth) {
          value = overshootFromFront;
          outcome = `進入果嶺，距離球洞 ${overshootFromFront} 碼`;
          completed = true;
        } else {
          zone = "back";
          value = overshootFromFront - hole.greenDepth;
          outcome = `超出果嶺 ${value} 碼`;
        }
      }
    } else {
      const nextValue = value - shotDistance;
      if (nextValue >= 0) {
        value = nextValue;
        outcome = `仍超出果嶺 ${value} 碼`;
      } else {
        const travelPastBackEdge = Math.abs(nextValue);
        if (travelPastBackEdge <= hole.greenDepth) {
          value = travelPastBackEdge;
          zone = "green";
          outcome = `回到果嶺，距離球洞 ${travelPastBackEdge} 碼`;
          completed = true;
        } else {
          zone = "front";
          value = travelPastBackEdge - hole.greenDepth;
          outcome = `打回果嶺前，剩餘 ${value} 碼`;
        }
      }
    }

    return {
      shotNumber,
      shotDistance,
      zone,
      value,
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
      : `目前剩餘 ${lastStep.value} 碼，尚未進入果嶺。`
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
    showMessage(elements.calcMessage, errorMessage, "is-error");
    renderHoleList();
    renderOverview();
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
  renderStats();
  saveCurrentUserData();
  showMessage(elements.calcMessage, estimate.detail, estimate.estimatedShotsToGreen ? "is-info" : "is-warn");
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
    let statusText = `Par ${hole.par}`;
    if (hole.savedRecord) {
      statusText = "已儲存";
    } else if (hole.lastEstimate) {
      statusText = "已完成";
    }

    return `
      <button class="hole-chip ${actualIndex === state.selectedHoleIndex ? "active" : ""}" type="button" data-index="${actualIndex}">
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
    ["洞別", "Par", "球洞長度(碼)", "果嶺深度(碼)", "是否已儲存", "揮桿次數", "結果", "逐桿距離(碼)"]
  ];

  holes.forEach((hole) => {
    rows.push([
      String(hole.hole),
      String(hole.par),
      String(hole.distance),
      String(hole.greenDepth),
      hole.savedRecord ? "是" : "否",
      hole.savedRecord ? String(hole.savedRecord.shots) : "",
      hole.savedRecord ? hole.savedRecord.resultText : "",
      hole.shotDistances.join(" / ")
    ]);
  });

  return rows
    .map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(","))
    .join("\r\n");
}

function handleExportCsv() {
  const csvContent = buildCsvContent();
  const safeUsername = state.profile.username.replace(/[\\/:*?"<>|]/g, "_");
  const safeCourseName = currentCourseName().replace(/[\\/:*?"<>|]/g, "_");
  const filename = `${safeUsername}-${safeCourseName}-golf-summary.csv`;
  const url = downloadCsvFile(filename, csvContent);
  elements.exportResult.innerHTML = `CSV 已建立：<a href="${url}" download="${filename}">${filename}</a>。如果剛剛沒看到下載，請點這個檔名再下載一次。`;
  elements.exportResult.className = "message is-info";
  elements.exportResult.classList.remove("hidden");
  showMessage(elements.profileMessage, `已匯出 ${state.profile.username} 的 ${currentCourseName()} Excel CSV。`, "is-info");
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
  localStorage.setItem(CURRENT_USER_KEY, username);
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
    showMessage(elements.calcMessage, "請先輸入有效的果嶺深度。", "is-error");
    return;
  }

  if (!Number.isFinite(shotDistance) || shotDistance <= 0) {
    showMessage(elements.calcMessage, "請輸入大於 0 的擊球距離。", "is-error");
    return;
  }

  if (shotDistance > 600) {
    showMessage(elements.calcMessage, "單桿擊球距離不能超過 600 碼。", "is-error");
    return;
  }

  hole.shotDistances.push(shotDistance);
  hole.savedRecord = null;
  state.isShotListExpanded = false;
  elements.shotDistanceInput.value = "";
  refreshEstimate();
}

function handleSaveHoleRecord() {
  const hole = currentHole();
  if (!hole.lastEstimate || !hole.lastEstimate.estimatedShotsToGreen) {
    showMessage(elements.calcMessage, "尚未進入果嶺，不能儲存此洞紀錄。", "is-error");
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
  renderStats();
  showMessage(elements.calcMessage, `已儲存 ${state.profile.username} 在 ${currentCourseName()} 的第 ${hole.hole} 洞紀錄。`, "is-info");
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

  hideMessage(elements.calcMessage);
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
    localStorage.removeItem(CURRENT_USER_KEY);
    hideMessage(elements.profileMessage);
    hideMessage(elements.exportResult);
    hideMessage(elements.calcMessage);
    renderAll();
  });

  elements.exportCsvButton.addEventListener("click", handleExportCsv);
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
      hideMessage(elements.calcMessage);
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
    hideMessage(elements.calcMessage);
  });

  elements.confirmShotButton.addEventListener("click", handleConfirmShot);
  elements.saveHoleRecordButton.addEventListener("click", handleSaveHoleRecord);

  elements.shotDistanceInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleConfirmShot();
    }
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
    hideMessage(elements.calcMessage);
    saveCurrentUserData();
    renderHoleEditor();
    renderHoleList();
    renderOverview();
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

  elements.greenDepthInput.addEventListener("input", refreshEstimate);
}

loadSession();
bindEvents();
renderAll();
