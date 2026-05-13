window.createPlayPageModule = function createPlayPageModule(ctx) {
  const {
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
  } = ctx;

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

  function renderGreenDepthPanel() {
    elements.greenDepthPanel.classList.toggle("hidden", !state.isGreenDepthOpen);
    elements.toggleGreenDepthButton.setAttribute("aria-expanded", String(state.isGreenDepthOpen));
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

  function bindEvents() {
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
  }

  return {
    refreshEstimate,
    renderHoleTabs,
    renderHoleList,
    renderShotList,
    renderSaveHoleBar,
    renderHoleEditor,
    renderGreenDepthPanel,
    handleConfirmShot,
    handleSaveHoleRecord,
    bindEvents
  };
};
