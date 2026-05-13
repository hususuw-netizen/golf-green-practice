window.createCoursePageModule = function createCoursePageModule(ctx) {
  const {
    state,
    elements,
    COURSES,
    getCourseDefinition,
    getTeeDefinition,
    saveCurrentUserData,
    setActiveAppPage
  } = ctx;

  function isScoreMode() {
    return state.pendingMode === "score";
  }

  function renderModeSwitch() {
    const scoreMode = isScoreMode();
    const courseField = elements.courseSelect.closest(".field");
    const teeSwitch = document.getElementById("teeSwitch");

    elements.modeTabs.forEach((button) => {
      button.classList.toggle("active", button.dataset.mode === state.pendingMode);
    });

    if (courseField) {
      courseField.classList.toggle("hidden", scoreMode);
    }
    if (teeSwitch) {
      teeSwitch.classList.toggle("hidden", scoreMode);
    }

    elements.courseDetailsButton.classList.toggle("hidden", scoreMode);
    if (scoreMode) {
      elements.courseDetailsPanel.classList.add("hidden");
      elements.courseDetailsButton.setAttribute("aria-expanded", "false");
    }
  }

  function renderCourseSelect() {
    elements.courseSelect.innerHTML = COURSES.map((course) => `
      <option value="${course.id}">${course.name}</option>
    `).join("");
    elements.courseSelect.value = state.pendingCourseId;
    elements.teeTabs.forEach((button) => {
      button.classList.toggle("active", button.dataset.tee === state.pendingTeeId);
    });
    renderModeSwitch();
  }

  function renderCourseDetails() {
    if (isScoreMode()) {
      elements.courseDetailsPanel.classList.add("hidden");
      elements.courseDetailsButton.setAttribute("aria-expanded", "false");
      return;
    }

    const tee = getTeeDefinition(state.pendingCourseId, state.pendingTeeId);
    elements.courseDetailsButton.setAttribute("aria-expanded", String(state.isCourseDetailsOpen));
    elements.courseDetailsPanel.classList.toggle("hidden", !state.isCourseDetailsOpen);
    elements.courseDetailsList.innerHTML = state.isCourseDetailsOpen
      ? tee.holes.map((hole) => `
          <div class="course-detail-item">
            <strong>第 ${hole.hole} 洞</strong>
            <span>Par ${hole.par}</span>
            <span>${hole.distance} 碼</span>
          </div>
        `).join("")
      : "";
  }

  function bindEvents() {
    elements.modeTabs.forEach((button) => {
      button.addEventListener("click", () => {
        state.pendingMode = button.dataset.mode || "simulation";
        state.isCourseDetailsOpen = false;
        renderCourseSelect();
        renderCourseDetails();
      });
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
      state.profile.selectedMode = state.pendingMode;
      if (state.pendingMode === "simulation") {
        state.profile.selectedCourseId = state.pendingCourseId;
        state.profile.selectedTeeId = state.pendingTeeId;
        state.page = "front";
        state.selectedHoleIndex = 0;
      } else {
        state.scorePage = "front";
        state.scoreSelectedHoleIndex = 0;
      }

      saveCurrentUserData();
      setActiveAppPage(state.pendingMode === "score" ? "score-play" : "play");
    });
  }

  return {
    renderCourseSelect,
    renderCourseDetails,
    bindEvents
  };
};
