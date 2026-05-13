window.createSummaryPageModule = function createSummaryPageModule(ctx) {
  const {
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
  } = ctx;

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

  function bindEvents() {
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
      if (!window.confirm(`\u78ba\u5b9a\u8981\u5132\u5b58${config.label}\u672c\u6b21\u7d00\u9304\u55ce\uff1f`)) {
        return;
      }
      saveCurrentRoundHistory();
      resetCurrentCourseProgress();
      state.historyNotice = `已儲存模擬球場${config.label} round。`;
      saveCurrentUserData();
      setActiveAppPage("history");
    });
  }

  return {
    renderOverview,
    renderRoundSavePanel,
    saveCurrentRoundHistory,
    resetCurrentCourseProgress,
    bindEvents
  };
};
