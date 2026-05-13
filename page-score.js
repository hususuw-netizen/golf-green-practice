window.createScorePageModule = function createScorePageModule(ctx) {
  const {
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
  } = ctx;

  let selectedPresetShots = null;
  let isCustomShotsOpen = false;

  function resetShotEntryState() {
    selectedPresetShots = null;
    isCustomShotsOpen = false;
  }

  function validateShotsInput() {
    const value = isCustomShotsOpen
      ? sanitizeNumber(elements.scoreShotsInput.value)
      : selectedPresetShots;
    if (!Number.isFinite(value) || value <= 0) {
      return "請輸入大於 0 的桿數。";
    }
    if (value > 20) {
      return "單洞桿數不能超過 20。";
    }
    return "";
  }

  function currentSelectedShots() {
    return isCustomShotsOpen
      ? sanitizeNumber(elements.scoreShotsInput.value)
      : selectedPresetShots;
  }

  function renderTabs() {
    elements.scoreTabs.forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.scorePage === state.scorePage);
    });
  }

  function renderHoleList() {
    const start = state.scorePage === "front" ? 0 : 9;
    const holes = currentScoreHoles().slice(start, start + 9);
    elements.scoreHoleList.innerHTML = holes.map((hole, index) => {
      const actualIndex = start + index;
      const activeClass = actualIndex === state.scoreSelectedHoleIndex ? "active" : "";
      const savedClass = hole.savedRecord ? "saved" : "";
      return `
        <button class="hole-chip ${activeClass} ${savedClass}" type="button" data-score-index="${actualIndex}">
          <strong>${hole.hole}</strong>
        </button>
      `;
    }).join("");
  }

  function renderEditor() {
    const hole = currentScoreHole();
    elements.scoreHoleSelectorSubtitle.textContent = "純記桿數模式";
    elements.scoreEditorTitle.textContent = `第 ${hole.hole} 洞`;
    elements.scoreParValue.textContent = String(hole.par);
    elements.scoreShotPresetButtons.forEach((button) => {
      button.classList.toggle("active", !isCustomShotsOpen && Number(button.dataset.scoreShot) === selectedPresetShots);
    });
    elements.scoreMoreShotsButton.classList.toggle("active", isCustomShotsOpen);
    elements.scoreCustomShotsField.classList.toggle("hidden", !isCustomShotsOpen);
    if (!isCustomShotsOpen) {
      elements.scoreShotsInput.value = "";
    }
    elements.scoreHoleNote.textContent = hole.savedRecord
      ? `已儲存 ${hole.savedRecord.shots} 桿`
      : "尚未儲存本洞桿數。";
    elements.scoreHoleNote.classList.toggle("empty-note", !hole.savedRecord);
    elements.scoreSaveHoleHint.textContent = hole.savedRecord
      ? `此洞已儲存，桿數 ${hole.savedRecord.shots} 桿。`
      : "輸入本洞桿數後即可儲存，系統會自動切換下一洞。";
    elements.scoreSaveHoleNextHint.textContent = state.scoreSaveHoleNextHint;
    elements.scoreSaveHoleNextHint.classList.toggle("hidden", !state.scoreSaveHoleNextHint);
  }

  function renderPlay() {
    renderTabs();
    renderHoleList();
    renderEditor();
  }

  function renderOverview() {
    const config = getScoreRoundSaveConfig();
    const holes = currentScoreHoles().slice(config.start, config.end);
    elements.scoreOverviewTitle.textContent = `${config.label}紀錄`;
    elements.scoreTotalShotsValue.textContent = `${getTotalShotsForHoles(holes)} / ${getRoundTotalPar(holes)}`;
    elements.scoreOverviewList.innerHTML = holes.map((hole) => `
      <div class="overview-row ${hole.savedRecord ? "saved" : ""}">
        <strong>第 ${hole.hole} 洞</strong>
        <span>Par ${hole.par}</span>
        <span>${hole.savedRecord ? `${hole.savedRecord.shots} 桿` : "尚無紀錄"}</span>
        <div class="overview-shots">${hole.savedRecord ? `${hole.savedRecord.shots} 桿` : "-"}</div>
      </div>
    `).join("");
  }

  function renderSavePanel() {
    const config = getScoreRoundSaveConfig();
    const holes = getScoreRoundSaveHoles();
    const savedCount = getSavedHoleCountForHoles(holes);
    elements.scoreRoundSaveModeTabs.forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.scoreRoundSaveMode === state.scoreRoundSaveMode);
    });
    elements.scoreRoundSaveStatusValue.textContent = `${savedCount} / ${config.targetCount}`;
    elements.scoreSaveRoundButton.disabled = !canSaveScoreRoundHistory();
    elements.scoreSaveRoundButton.setAttribute("aria-disabled", String(!canSaveScoreRoundHistory()));

    if (canSaveScoreRoundHistory()) {
      showMessage(elements.scoreSaveRoundMessage, `${config.label}已完成，可儲存本次 round。`, "is-info");
    } else {
      showMessage(elements.scoreSaveRoundMessage, `尚未完成${config.label}的洞數，完成後才能儲存本次 round。`, "is-warn");
    }
  }

  function renderSummary() {
    renderOverview();
    renderSavePanel();
  }

  function saveHoleShots() {
    const error = validateShotsInput();
    if (error) {
      setFieldError(elements.scoreShotsError, error);
      return;
    }
    setFieldError(elements.scoreShotsError);
    const hole = currentScoreHole();
    const shots = Number(currentSelectedShots());
    hole.savedRecord = {
      shots,
      resultText: `${shots} 桿`
    };

    const pageEndIndex = state.scorePage === "front" ? 8 : 17;
    if (state.scoreSelectedHoleIndex < pageEndIndex) {
      state.scoreSelectedHoleIndex += 1;
      state.scoreSaveHoleNextHint = `已切換至第 ${state.scoreSelectedHoleIndex + 1} 洞`;
    } else {
      state.scoreSaveHoleNextHint = "";
    }

    resetShotEntryState();
    saveCurrentUserData();
    renderAll();
  }

  function resetHole() {
    if (!window.confirm("確定要清除此洞的紀錄嗎？")) {
      return;
    }
    currentScoreHoles()[state.scoreSelectedHoleIndex] = makeScoreHoleState(state.scoreSelectedHoleIndex + 1);
    state.scoreSaveHoleNextHint = "";
    resetShotEntryState();
    saveCurrentUserData();
    renderAll();
  }

  function saveRound() {
    if (!canSaveScoreRoundHistory()) {
      return;
    }
    const config = getScoreRoundSaveConfig();
    if (!window.confirm(`確定要儲存${config.label}本次紀錄嗎？`)) {
      return;
    }

    const holes = getScoreRoundSaveHoles().map(cloneScoreHoleState);
    const round = {
      id: createRoundId(),
      date: new Date().toISOString(),
      courseId: "score-only",
      courseName: "純記桿數",
      teeName: "",
      roundMode: config.mode,
      roundLabel: config.label,
      totalShots: getTotalShotsForHoles(holes),
      holes,
      modeType: "score"
    };
    state.rounds = [round, ...state.rounds].slice(0, 50);

    for (let index = config.start; index < config.end; index += 1) {
      currentScoreHoles()[index] = makeScoreHoleState(index + 1);
    }
    state.scorePage = config.mode === "back" ? "back" : "front";
    state.scoreSelectedHoleIndex = config.start;
    state.scoreSaveHoleNextHint = "";
    state.selectedRoundId = "";
    state.historyNotice = `已儲存純記桿數${config.label} round。`;
    saveCurrentUserData();
    setActiveAppPage("history");
  }

  function bindEvents() {
    elements.scoreTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        state.scorePage = tab.dataset.scorePage;
        state.scoreSelectedHoleIndex = state.scorePage === "front"
          ? Math.min(state.scoreSelectedHoleIndex, 8)
          : Math.max(state.scoreSelectedHoleIndex, 9);
        state.scoreSaveHoleNextHint = "";
        resetShotEntryState();
        renderPlay();
      });
    });

    elements.scoreHoleList.addEventListener("click", (event) => {
      const button = event.target.closest("[data-score-index]");
      if (!button) {
        return;
      }
      state.scoreSelectedHoleIndex = Number(button.dataset.scoreIndex);
      state.scoreSaveHoleNextHint = "";
      resetShotEntryState();
      renderPlay();
    });

    elements.scoreShotPresetButtons.forEach((button) => {
      button.addEventListener("click", () => {
        selectedPresetShots = Number(button.dataset.scoreShot);
        isCustomShotsOpen = false;
        elements.scoreShotsInput.value = "";
        setFieldError(elements.scoreShotsError);
        renderEditor();
      });
    });

    elements.scoreMoreShotsButton.addEventListener("click", () => {
      isCustomShotsOpen = !isCustomShotsOpen;
      if (isCustomShotsOpen) {
        selectedPresetShots = null;
      } else {
        elements.scoreShotsInput.value = "";
      }
      setFieldError(elements.scoreShotsError);
      renderEditor();
    });

    elements.scoreShotsInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        saveHoleShots();
      }
    });

    elements.scoreShotsInput.addEventListener("input", () => {
      setFieldError(elements.scoreShotsError);
    });

    elements.scoreSaveHoleButton.addEventListener("click", saveHoleShots);
    elements.scoreResetHoleButton.addEventListener("click", resetHole);
    elements.scoreGoSummaryButton.addEventListener("click", () => setActiveAppPage("score-summary"));

    elements.scoreRoundSaveModeTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        state.scoreRoundSaveMode = tab.dataset.scoreRoundSaveMode || "full";
        renderSummary();
      });
    });

    elements.scoreSaveRoundButton.addEventListener("click", saveRound);
  }

  return {
    renderPlay,
    renderSummary,
    bindEvents
  };
};
