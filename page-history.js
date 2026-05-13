window.createHistoryPageModule = function createHistoryPageModule(ctx) {
  const {
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
  } = ctx;

  function formatRoundLocation(round) {
    return round.teeName ? `${round.courseName} ${round.teeName}` : round.courseName;
  }

  function groupRoundsByMode(rounds) {
    return {
      simulation: rounds.filter((round) => round.modeType !== "score"),
      score: rounds.filter((round) => round.modeType === "score")
    };
  }

  function visibleRoundsForGroup(rounds, expanded) {
    return expanded ? rounds : rounds.slice(0, 1);
  }

  function renderRoundCard(round) {
    return `
      <div class="round-history-item ${round.id === state.selectedRoundId ? "active" : ""}">
        <button class="round-delete-button" type="button" data-round-delete="${round.id}" aria-label="刪除此筆 round">×</button>
        <div class="round-history-meta">
          <strong>${formatRoundDate(round.date)}</strong>
          <span>${formatRoundLocation(round)}</span>
          <span>${formatRoundRangeText(round)}</span>
          <span>總桿 ${formatRoundShotsWithPar(round)}</span>
        </div>
        <div class="round-history-actions">
          <button class="btn btn-accent round-action-button" type="button" data-round-export="${round.id}">匯出 CSV</button>
          <button class="btn btn-soft round-action-button" type="button" data-round-view="${round.id}" aria-expanded="${round.id === state.selectedRoundId ? "true" : "false"}">
            細項 ${round.id === state.selectedRoundId ? "▴" : "▾"}
          </button>
        </div>
        ${renderRoundDetail(round.id)}
      </div>
    `;
  }

  function renderGroupSection(title, rounds, modeKey) {
    if (!rounds.length) {
      return "";
    }

    const expanded = modeKey === "score"
      ? state.isScoreHistoryExpanded
      : state.isSimulationHistoryExpanded;
    const visibleRounds = visibleRoundsForGroup(rounds, expanded);
    return `
      <section class="history-mode-group">
        <div class="history-mode-head">
          <h3 class="history-mode-title">${title}</h3>
          <button
            class="toggle-icon-button history-group-toggle ${rounds.length <= 1 ? "hidden" : ""}"
            type="button"
            data-history-group-toggle="${modeKey}"
            aria-expanded="${expanded ? "true" : "false"}"
            aria-label="展開${title}歷史紀錄"
          >
            <span class="toggle-arrow">▾</span>
          </button>
        </div>
        <div class="round-history-list">
          ${visibleRounds.map(renderRoundCard).join("")}
        </div>
      </section>
    `;
  }

  function renderRoundDetail(roundId = state.selectedRoundId) {
    const round = getRoundHistoryById(roundId);
    if (!round || round.id !== state.selectedRoundId) {
      return "";
    }

    const isScoreMode = round.modeType === "score";
    const holeItems = round.holes.map((hole) => {
      if (isScoreMode) {
        return `
          <div class="round-detail-hole-item">
            <div class="round-detail-hole-top">
              <strong>第 ${hole.hole} 洞</strong>
              <span>Par ${hole.par}</span>
            </div>
            <span>${hole.savedRecord ? `${hole.savedRecord.shots} 桿` : "未儲存"}</span>
          </div>
        `;
      }

      return `
        <div class="round-detail-hole-item">
          <div class="round-detail-hole-top">
            <strong>第 ${hole.hole} 洞</strong>
            <span>Par ${hole.par}</span>
            <span>${hole.distance} 碼</span>
          </div>
          <span>果嶺深度 ${hole.greenDepth} 碼</span>
          <span>${hole.savedRecord ? `${hole.savedRecord.shots} 桿` : "-"}</span>
          <span>${hole.savedRecord ? hole.savedRecord.resultText : "尚未完成紀錄"}</span>
          <span>逐桿距離 ${formatShotDistances(hole.shotDistances)}</span>
        </div>
      `;
    }).join("");

    return `
      <div class="round-inline-detail">
        <div class="round-detail-summary">
          <div class="stat-card">
            <span>日期</span>
            <strong>${formatRoundDate(round.date)}</strong>
          </div>
          <div class="stat-card">
            <span>球場</span>
            <strong>${formatRoundLocation(round)}</strong>
          </div>
          <div class="stat-card">
            <span>範圍</span>
            <strong>${round.roundLabel}</strong>
          </div>
          <div class="stat-card">
            <span>總桿</span>
            <strong>${formatRoundShotsWithPar(round)}</strong>
          </div>
        </div>
        <div class="round-detail-hole-list">${holeItems}</div>
      </div>
    `;
  }

  function renderRecentRounds() {
    const allRounds = getCurrentUserRounds();
    const groups = groupRoundsByMode(allRounds);
    const hasAnyRounds = allRounds.length > 0;

    elements.recentRoundsEmpty.classList.toggle("hidden", hasAnyRounds);
    elements.toggleRoundHistoryButton.classList.add("hidden");
    if (state.historyNotice) {
      showMessage(elements.exportResult, state.historyNotice, "is-info");
    }

    elements.recentRoundsList.innerHTML = [
      renderGroupSection("模擬球場", groups.simulation, "simulation"),
      renderGroupSection("純記桿數", groups.score, "score")
    ].join("");
  }

  function buildRoundCsvContent(round) {
    const isScoreMode = round.modeType === "score";
    const rows = [
      ["使用者", state.profile.username],
      ["球場", round.courseName],
      ["Tee", round.teeName || "-"],
      ["範圍", round.roundLabel],
      ["日期", formatRoundDate(round.date)],
      ["總桿", String(round.totalShots)],
      []
    ];

    if (isScoreMode) {
      rows.push(["洞號", "Par", "桿數"]);
      round.holes.forEach((hole) => {
        rows.push([
          String(hole.hole),
          String(hole.par),
          hole.savedRecord ? String(hole.savedRecord.shots) : ""
        ]);
      });
    } else {
      rows.push(["洞號", "Par", "距離(碼)", "果嶺深度(碼)", "總桿", "逐桿距離(碼)"]);
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
    }

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
    link.download = `${round.courseName}-${round.date.slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    showMessage(elements.exportResult, "CSV 匯出完成。", "is-info");
  }

  function bindEvents() {
    elements.toggleRoundHistoryButton.addEventListener("click", () => {
      state.isRoundHistoryExpanded = !state.isRoundHistoryExpanded;
      renderRecentRounds();
    });

    elements.recentRoundsList.addEventListener("click", (event) => {
      const deleteButton = event.target.closest("[data-round-delete]");
      if (deleteButton) {
        const round = getRoundHistoryById(deleteButton.dataset.roundDelete);
        const roundLabel = round ? `${formatRoundLocation(round)} ${round.roundLabel}` : "此筆 round";
        if (!window.confirm(`確定要刪除 ${roundLabel} 嗎？`)) {
          return;
        }

        state.rounds = state.rounds.filter((item) => item.id !== deleteButton.dataset.roundDelete);
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
        return;
      }

      const groupToggle = event.target.closest("[data-history-group-toggle]");
      if (groupToggle) {
        if (groupToggle.dataset.historyGroupToggle === "score") {
          state.isScoreHistoryExpanded = !state.isScoreHistoryExpanded;
        } else {
          state.isSimulationHistoryExpanded = !state.isSimulationHistoryExpanded;
        }
        renderRecentRounds();
      }
    });
  }

  return {
    renderRecentRounds,
    bindEvents
  };
};
